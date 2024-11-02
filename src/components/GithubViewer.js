import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

  const config = useMemo(() => ({
    username: 'codyhinz',
    repo: 'portfolio',
    branch: 'main',
    token: import.meta.env.REACT_APP_GITHUB_TOKEN || null
  }), []);

  const headers = useMemo(() => {
    const baseHeaders = {
      Accept: 'application/vnd.github.v3+json',
    };

    return config.token 
      ? { ...baseHeaders, Authorization: `token ${config.token}` }
      : baseHeaders;
  }, [config.token]);

  const fetchRepoContents = useCallback(async (path = '') => {
    try {
      setLoading(true);
      const url = `https://api.github.com/repos/${config.username}/${config.repo}/contents/${path}`;
      console.log('Fetching:', url);

      const response = await fetch(url, { headers });
      
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
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [config.username, config.repo, headers]);

  const fetchFileContent = useCallback(async (path) => {
    try {
      setFileContent('Loading...');
      const url = `https://api.github.com/repos/${config.username}/${config.repo}/contents/${path}`;
      
      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch file content');
      }
      
      const data = await response.json();
      try {
        const content = atob(data.content);
        setFileContent(content);
        setError(null);
      } catch (e) {
        throw new Error('Failed to decode file content');
      }
    } catch (err) {
      console.error('File fetch error:', err);
      setError(`Failed to load file: ${err.message}`);
      setFileContent('');
    }
  }, [config.username, config.repo, headers]);

  useEffect(() => {
    const initializeViewer = async () => {
      try {
        await fetchRepoContents();
      } catch (err) {
        console.error('Initialization error:', err);
      }
    };

    initializeViewer();

    const interval = setInterval(() => {
      if (selectedFile) {
        fetchFileContent(selectedFile.path);
      }
      fetchRepoContents();
    }, 30000);
    
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
      <div className="bg-black/30 rounded-lg border border-wow-border p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <RefreshCw className="w-8 h-8 text-wow-gold animate-spin" />
          <div className="text-wow-gold text-center">
            <p className="font-medium">Loading repository...</p>
            <p className="text-sm text-wow-gold/70 mt-2">
              Connecting to GitHub API
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !loading && !repoData) {
    return (
      <div className="bg-black/30 rounded-lg border border-wow-border p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
          <div className="text-center">
            <h3 className="text-wow-gold font-medium">Repository Not Available</h3>
            <p className="text-white/70 mt-2">
              {error}
            </p>
            <button 
              onClick={() => fetchRepoContents()}
              className="mt-4 px-4 py-2 bg-wow-gold/20 text-wow-gold border border-wow-gold rounded hover:bg-wow-gold/30 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/30 rounded-lg border border-wow-border">
      <div className="flex items-center justify-between p-4 border-b border-wow-border">
        <div className="flex items-center gap-2">
          <Github className="w-5 h-5 text-wow-gold" />
          <h3 className="text-wow-gold font-semibold">Repository Explorer</h3>
        </div>
        <a
          href={`https://github.com/${config.username}/${config.repo}`}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-wow-border">
        <div className="p-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-wow-gold/20 scrollbar-track-black/20">
          {repoData ? renderTree(repoData) : (
            <div className="text-white/50 text-center py-8">
              No files found
            </div>
          )}
        </div>

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