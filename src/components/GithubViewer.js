import React, { useState, useEffect, useCallback } from 'react';
import { 
  Github, 
  ChevronRight, 
  ChevronDown, 
  Circle, 
  Folder,
  FileCode,
  GitBranch,
  Loader2,
  Image,
  Menu,
  X
} from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';

const LANGUAGE_CONFIG = {
  js: { name: 'javascript', color: '#f7df1e', backgroundColor: '#f7df1e10' },
  jsx: { name: 'jsx', color: '#61dafb', backgroundColor: '#61dafb10' },
  ts: { name: 'typescript', color: '#3178c6', backgroundColor: '#3178c610' },
  tsx: { name: 'typescript', color: '#3178c6', backgroundColor: '#3178c610' },
  css: { name: 'css', color: '#264de4', backgroundColor: '#264de410' },
  scss: { name: 'scss', color: '#cc6699', backgroundColor: '#cc669910' },
  html: { name: 'html', color: '#e34c26', backgroundColor: '#e34c2610' },
  json: { name: 'json', color: '#5b5b5b', backgroundColor: '#5b5b5b10' },
  md: { name: 'markdown', color: '#000000', backgroundColor: '#00000010' },
  py: { name: 'python', color: '#3572A5', backgroundColor: '#3572A510' },
  java: { name: 'java', color: '#b07219', backgroundColor: '#b0721910' },
  php: { name: 'php', color: '#4F5D95', backgroundColor: '#4F5D9510' },
  rb: { name: 'ruby', color: '#701516', backgroundColor: '#70151610' },
  go: { name: 'go', color: '#00ADD8', backgroundColor: '#00ADD810' },
  rs: { name: 'rust', color: '#dea584', backgroundColor: '#dea58410' },
  png: { name: 'image', color: '#fb923c', backgroundColor: '#fb923c10' },
  jpg: { name: 'image', color: '#fb923c', backgroundColor: '#fb923c10' },
  jpeg: { name: 'image', color: '#fb923c', backgroundColor: '#fb923c10' },
  gif: { name: 'image', color: '#fb923c', backgroundColor: '#fb923c10' },
  svg: { name: 'image', color: '#fb923c', backgroundColor: '#fb923c10' },
  webp: { name: 'image', color: '#fb923c', backgroundColor: '#fb923c10' },
};

const EXCLUDED_FILES = ['package-lock.json'];

const getFileLanguage = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  return LANGUAGE_CONFIG[ext] || { name: 'text', color: '#9e9e9e', backgroundColor: '#9e9e9e10' };
};

const FileIcon = ({ filename }) => {
  const { color, name } = getFileLanguage(filename);
  return (
    <div className="relative">
      {name === 'image' ? (
        <Image size={16} className="text-white/70" />
      ) : (
        <FileCode size={16} style={{ color }} />
      )}
    </div>
  );
};

const ImagePreview = ({ url, fileName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] bg-black/20 rounded-lg p-4">
      {isLoading && (
        <div className="flex items-center gap-2 text-wow-gold/50">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading image...</span>
        </div>
      )}
      {error ? (
        <div className="text-red-500 text-center">
          <p>Failed to load image</p>
          <p className="text-sm opacity-75">{error}</p>
        </div>
      ) : (
        <img
          src={url}
          alt={fileName}
          className={`max-w-full h-auto object-contain rounded-lg transition-opacity duration-300 
            ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError('Image failed to load');
          }}
        />
      )}
    </div>
  );
};

const FileTreeItem = React.memo(({ 
  name, 
  item, 
  path = '', 
  depth = 0, 
  expandedFolders,
  activeTab,
  onToggleFolder,
  onFileSelect 
}) => {
  const fullPath = path ? `${path}/${name}` : name;
  const isExpanded = expandedFolders[fullPath];
  const isActive = activeTab?.path === item.path;
  const { color, backgroundColor } = getFileLanguage(name);
  
  if (item.type === 'folder') {
    return (
      <div>
        <button
          onClick={() => onToggleFolder(fullPath)}
          className="flex items-center gap-2 w-full hover:bg-white/5 px-2 py-2 md:py-1.5 text-sm min-h-[40px] md:min-h-[32px] transition-colors duration-200"
          style={{ paddingLeft: `${depth * 1.25}rem` }}
        >
          {isExpanded ? (
            <ChevronDown size={16} className="text-wow-gold" />
          ) : (
            <ChevronRight size={16} className="text-wow-gold" />
          )}
          <Folder size={16} className="text-wow-gold" />
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
                expandedFolders={expandedFolders}
                activeTab={activeTab}
                onToggleFolder={onToggleFolder}
                onFileSelect={onFileSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => onFileSelect(item)}
      className={`flex items-center gap-2 w-full px-2 py-2 md:py-1.5 text-sm min-h-[40px] md:min-h-[32px] 
        transition-colors duration-200 group`}
      style={{ 
        paddingLeft: `${depth * 1.25}rem`,
        backgroundColor: isActive ? backgroundColor : 'transparent'
      }}
    >
      <FileIcon filename={name} />
      <span 
        className="text-white/90 group-hover:text-white transition-colors duration-200"
        style={{ color: isActive ? color : undefined }}
      >
        {name}
      </span>
    </button>
  );
});

FileTreeItem.displayName = 'FileTreeItem';

const GitHubViewer = ({ username = 'codyhinz', repo = 'portfolio' }) => {
  const [fileTree, setFileTree] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [showFileTree, setShowFileTree] = useState(true);

  const fetchFileContent = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      const content = await response.text();
      return content;
    } catch (err) {
      setError('Failed to fetch file content');
      return '';
    }
  }, []);

  const fetchRepoContents = useCallback(async (path = '') => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}/contents/${path}`
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        const tree = {};
        for (const item of data) {
          if (EXCLUDED_FILES.includes(item.name)) continue;
          
          if (item.type === 'dir') {
            const items = await fetchRepoContents(item.path);
            if (Object.keys(items || {}).length > 0) {
              tree[item.name] = {
                type: 'folder',
                path: item.path,
                items
              };
            }
          } else {
            tree[item.name] = {
              type: 'file',
              path: item.path,
              language: getFileLanguage(item.name).name,
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
  }, [username, repo]);

  useEffect(() => {
    const initRepo = async () => {
      setLoading(true);
      const tree = await fetchRepoContents();
      setFileTree(tree);
      setLoading(false);

      // Automatically expand src folder if it exists
      if (tree?.src) {
        setExpandedFolders(prev => ({ ...prev, src: true }));
      }
    };

    initRepo();
  }, [fetchRepoContents]);

  useEffect(() => {
    if (selectedFile && fileContent && getFileLanguage(selectedFile.path).name !== 'image') {
      Prism.highlightAll();
    }
  }, [selectedFile, fileContent]);

  const toggleFolder = useCallback((path) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  }, []);

  const handleFileSelect = useCallback(async (file) => {
    if (file.path === activeTab?.path) return;
    
    setSelectedFile(file);
    setActiveTab(file);
    
    if (file.url && getFileLanguage(file.path).name !== 'image') {
      const content = await fetchFileContent(file.url);
      setFileContent(content);
    }

    if (window.innerWidth < 768) {
      setShowFileTree(false);
    }
  }, [activeTab, fetchFileContent]);

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
      <div className="flex items-center justify-between px-4 py-2 bg-[#323233] border-b border-white/10">
        <div className="flex items-center gap-2">
          <button 
            className="md:hidden p-1 hover:bg-white/10 rounded transition-colors"
            onClick={() => setShowFileTree(!showFileTree)}
          >
            {showFileTree ? (
              <X size={16} className="text-wow-gold" />
            ) : (
              <Menu size={16} className="text-wow-gold" />
            )}
          </button>
          <Github size={16} className="text-wow-gold" />
          <span className="text-white/90 text-sm font-medium">{repo}</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle size={12} className="text-red-500 hover:brightness-110 transition-all cursor-pointer" />
          <Circle size={12} className="text-yellow-500 hover:brightness-110 transition-all cursor-pointer" />
          <Circle size={12} className="text-green-500 hover:brightness-110 transition-all cursor-pointer" />
        </div>
      </div>

      <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-white/10">
        <div className="flex items-center gap-2">
          <GitBranch size={16} className="text-wow-gold" />
          <span className="text-white/90 text-sm">main</span>
        </div>
      </div>

      <div className="flex flex-col h-[500px] md:h-[600px]">
        <div className="flex flex-col md:flex-row h-full relative">
          <div className={`
            absolute md:relative w-full md:w-64 md:border-r border-white/10 
            bg-[#1E1E1E] md:bg-transparent z-20 transition-transform duration-300
            ${showFileTree ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="h-48 md:h-full overflow-y-auto scrollbar-custom">
              {fileTree && Object.entries(fileTree).map(([name, item]) => (
                <FileTreeItem 
                  key={name}
                  name={name} 
                  item={item}
                  expandedFolders={expandedFolders}
                  activeTab={activeTab}
                  onToggleFolder={toggleFolder}
                  onFileSelect={handleFileSelect}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <div className="sticky top-0 bg-[#252526] border-b border-white/10 z-10">
              {activeTab ? (
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1E1E1E] border-r border-white/10">
                  <FileIcon filename={activeTab.path} />
                  <span 
                    className="text-white/90 text-sm"
                    style={{ color: getFileLanguage(activeTab.path).color }}
                  >
                    {activeTab.path.split('/').pop()}
                  </span>
                </div>
              ) : (
                <div className="px-4 py-3 text-white/50 text-sm">
                  No file selected
                </div>
              )}
            </div>

            <div className="flex-1 overflow-auto bg-[#1E1E1E] p-4 scrollbar-custom">
              {selectedFile ? (
                <>
                  {getFileLanguage(selectedFile.path).name === 'image' ? (
                    <ImagePreview 
                      url={selectedFile.url} 
                      fileName={selectedFile.path.split('/').pop()} 
                    />
                  ) : (
                    <pre className="text-white/90 text-xs md:text-sm font-mono overflow-x-auto whitespace-pre-wrap break-words">
                      <code className={`language-${getFileLanguage(selectedFile.path).name}`}>
                        {fileContent}
                      </code>
                    </pre>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-white/50">
                  Select a file to view its contents
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubViewer;