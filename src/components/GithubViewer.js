import React, { useState, useEffect, useCallback } from 'react';
import { 
  FolderOpen, 
  File, 
  ChevronRight, 
  ChevronDown, 
  ExternalLink,
  Github,
  Code2,
  RefreshCw,
  Search,
  AlertTriangle,
  Folder
} from 'lucide-react';

const GithubViewer = () => {
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [folderContents, setFolderContents] = useState({});

  // GitHub configuration
  const username = 'codyhinz';
  const repo = 'portfolio';
  const branch = 'main';
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const headers = token ? {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
  } : {
    Accept: 'application/vnd.github.v3+json',
  };

  const fetchRepoContents = useCallback(async (path = '') => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=${branch}`,
        { headers }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch repository contents');
      }
      
      const data = await response.json();
      if (path === '') {
        setRepoData(data);
      } else {
        setFolderContents(prev => ({
          ...prev,
          [path]: data
        }));
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [username, repo, branch, headers]);

  const fetchFileContent = useCallback(async (path) => {
    try {
      setFileContent('Loading...');
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=${branch}`,
        { headers }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch file content');
      }
      
      const data = await response.json();
      const content = atob(data.content);
      setFileContent(content);
      setError(null);
    } catch (err) {
      setError(`Failed to load file: ${err.message}`);
      setFileContent('');
    }
  }, [username, repo, branch, headers]);

  useEffect(() => {
    fetchRepoContents();
    const interval = setInterval(() => {
      if (selectedFile) {
        fetchFileContent(selectedFile.path);
      }
      fetchRepoContents();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [selectedFile, fetchRepoContents, fetchFileContent]);

  const toggleFolder = async (path) => {
    if (expandedFolders.has(path)) {
      const newSet = new Set(expandedFolders);
      newSet.delete(path);
      setExpandedFolders(newSet);
    } else {
      if (!folderContents[path]) {
        await fetchRepoContents(path);
      }
      setExpandedFolders(new Set([...expandedFolders, path]));
    }
  };

  const handleFileClick = async (file) => {
    setSelectedFile(file);
    await fetchFileContent(file.path);
  };

  const filterItems = (items) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderTree = (items, level = 0) => {
    if (!items) return null;

    return filterItems(items).map((item) => (
      <div key={item.path} className={`py-1 ${level > 0 ? 'ml-4' : ''}`}>
        {item.type === 'dir' ? (
          <div>
            <button
              onClick={() => toggleFolder(item.path)}
              className="flex items-center gap-2 w-full text-left hover:text-wow-gold transition-colors py-1 px-2 rounded hover:bg-wow-gold/10"
            >
              {expandedFolders.has(item.path) ? (
                <ChevronDown className="w-4 h-4 text-wow-gold" />
              ) : (
                <ChevronRight className="w-4 h-4 text-wow-gold" />
              )}
              {expandedFolders.has(item.path) ? (
                <FolderOpen className="w-4 h-4 text-wow-gold" />
              ) : (
                <Folder className="w-4 h-4 text-wow-gold" />
              )}
              <span className="text-white">{item.name}</span>
            </button>
            {expandedFolders.has(item.path) && folderContents[item.path] && (
              renderTree(folderContents[item.path], level + 1)
            )}
          </div>
        ) : (
          <button
            onClick={() => handleFileClick(item)}
            className={`flex items-center gap-2 w-full text-left hover:text-wow-gold transition-colors py-1 px-2 rounded hover:bg-wow-gold/10
              ${selectedFile?.path === item.path ? 'bg-wow-gold/20 text-wow-gold' : 'text-white'}`}
          >
            <File className="w-4 h-4 text-wow-gold" />
            <span>{item.name}</span>
          </button>
        )}
      </div>
    ));
  };

  if (loading && !repoData) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 text-wow-gold animate-spin" />
        <span className="ml-2 text-wow-gold">Loading repository...</span>
      </div>
    );
  }

  return (
    <div className="bg-black/30 rounded-lg border border-wow-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-wow-border">
        <div className="flex items-center gap-2">
          <Github className="w-5 h-5 text-wow-gold" />
          <h3 className="text-wow-gold font-semibold">Repository Explorer</h3>
        </div>
        <a
          href={`https://github.com/${username}/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-white/70 hover:text-wow-gold transition-colors"
        >
          <span className="text-sm">View on GitHub</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {error && !loading && (
        <div className="p-4 bg-red-500/10 border-b border-red-500/20">
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="p-4 border-b border-wow-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-wow-border rounded text-white placeholder-white/30 focus:border-wow-gold focus:outline-none"
          />
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-wow-border">
        {/* File Tree */}
        <div className="p-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-wow-gold/20 scrollbar-track-black/20">
          {repoData ? renderTree(repoData) : (
            <div className="text-white/50 text-center py-8">
              No files found
            </div>
          )}
        </div>

        {/* File Content */}
        <div className="p-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-wow-gold/20 scrollbar-track-black/20">
          {selectedFile ? (
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-wow-border">
                <Code2 className="w-4 h-4 text-wow-gold" />
                <span className="text-wow-gold font-medium">{selectedFile.name}</span>
              </div>
              <pre className="text-white font-mono text-sm whitespace-pre-wrap">
                {fileContent || 'Loading...'}
              </pre>
            </div>
          ) : (
            <div className="text-white/50 text-center py-8">
              Select a file to view its contents
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GithubViewer;