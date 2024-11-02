import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Github,
  FileCode,
  ChevronRight,
  ChevronDown,
  Circle,
  Folder,
  Loader2
} from 'lucide-react';

const VSCodeGithubViewer = ({ username = 'codyhinz', repo = 'portfolio' }) => {
  const [fileTree, setFileTree] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch repository contents recursively
  const fetchRepoContents = async (path = '') => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}/contents/${path}`
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        const tree = {};
        for (const item of data) {
          if (item.type === 'dir') {
            tree[item.name] = {
              type: 'folder',
              path: item.path,
              items: await fetchRepoContents(item.path)
            };
          } else {
            tree[item.name] = {
              type: 'file',
              path: item.path,
              language: getFileLanguage(item.name),
              url: item.download_url
            };
          }
        }
        return tree;
      }
      return null;
    } catch (err) {
      setError('Failed to fetch repository contents');
      return null;
    }
  };

  // Function to fetch file content
  const fetchFileContent = async (url) => {
    try {
      const response = await fetch(url);
      const content = await response.text();
      return content;
    } catch (err) {
      setError('Failed to fetch file content');
      return '';
    }
  };

  // Initialize repository data
  useEffect(() => {
    const initRepo = async () => {
      setLoading(true);
      const tree = await fetchRepoContents();
      setFileTree(tree);
      setLoading(false);
    };

    initRepo();
  }, [username, repo, fetchRepoContents]);

  // Helper function to determine file language
  const getFileLanguage = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const languageMap = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      css: 'css',
      html: 'html',
      json: 'json',
      md: 'markdown'
    };
    return languageMap[ext] || 'text';
  };

  const toggleFolder = (path) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setFileContent('');
    
    if (file.url) {
      const content = await fetchFileContent(file.url);
      setFileContent(content);
    }
  };

  const FileTreeItem = ({ name, item, path = '', depth = 0 }) => {
    const fullPath = path ? `${path}/${name}` : name;
    const isExpanded = expandedFolders[fullPath];
    
    if (item.type === 'folder') {
      return (
        <div>
          <button
            onClick={() => toggleFolder(fullPath)}
            className="flex items-center gap-2 w-full hover:bg-white/5 px-2 py-0.5 text-sm"
            style={{ paddingLeft: `${depth * 1.25}rem` }}
          >
            {isExpanded ? (
              <ChevronDown size={16} className="text-white/70" />
            ) : (
              <ChevronRight size={16} className="text-white/70" />
            )}
            <Folder size={16} className="text-white/70" />
            <span className="text-white/90">{name}</span>
          </button>
          {isExpanded && (
            <div>
              {Object.entries(item.items || {}).map(([childName, childItem]) => (
                <FileTreeItem
                  key={childName}
                  name={childName}
                  item={childItem}
                  path={fullPath}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        onClick={() => handleFileSelect(item)}
        className={`flex items-center gap-2 w-full px-2 py-0.5 text-sm 
          ${selectedFile === item ? 'bg-white/10' : 'hover:bg-white/5'}`}
        style={{ paddingLeft: `${depth * 1.25}rem` }}
      >
        <FileCode size={16} className="text-white/70" />
        <span className="text-white/90">{name}</span>
      </button>
    );
  };

  if (loading) {
    return (
      <div className="bg-[#1E1E1E] rounded-lg overflow-hidden border border-white/10 h-96 flex items-center justify-center">
        <div className="flex items-center gap-2 text-white/70">
          <Loader2 size={20} className="animate-spin" />
          <span>Loading repository...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1E1E1E] rounded-lg overflow-hidden border border-white/10 h-96 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden border border-white/10">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#323233] border-b border-white/10">
        <div className="flex items-center gap-2">
          <Github size={16} className="text-white/70" />
          <span className="text-white/90 text-sm">{repo}</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle size={12} className="text-red-500" />
          <Circle size={12} className="text-yellow-500" />
          <Circle size={12} className="text-green-500" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-white/10">
        <div className="flex items-center gap-2">
          <GitBranch size={16} className="text-wow-gold" />
          <span className="text-white/90 text-sm">main</span>
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* File Explorer */}
        <div className="w-64 border-r border-white/10 overflow-y-auto">
          <div className="p-2">
            {fileTree && Object.entries(fileTree).map(([name, item]) => (
              <FileTreeItem key={name} name={name} item={item} />
            ))}
          </div>
        </div>

        {/* File Content */}
        <div className="flex-1 overflow-auto bg-[#1E1E1E] p-4">
          {selectedFile ? (
            <pre className="text-white/90 text-sm font-mono">
              <code>{fileContent}</code>
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-white/50">
              Select a file to view its contents
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VSCodeGithubViewer;