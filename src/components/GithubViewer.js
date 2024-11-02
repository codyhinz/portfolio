import React, { useState, useEffect } from 'react';
import { 
  FolderOpen, 
  File, 
  ChevronRight, 
  ChevronDown, 
  ExternalLink,
  Github,
  Code2,
  RefreshCw,
  Search
} from 'lucide-react';

const GithubViewer = () => {
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Replace these with your GitHub details
  const username = 'codyhinz';
  const repo = 'portfolio';
  const branch = 'main';

  const fetchRepoContents = async (path = '') => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=${branch}`
      );
      if (!response.ok) throw new Error('Failed to fetch repository contents');
      const data = await response.json();
      setRepoData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchFileContent = async (path) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=${branch}`
      );
      if (!response.ok) throw new Error('Failed to fetch file content');
      const data = await response.json();
      const content = atob(data.content); // Decode base64 content
      setFileContent(content);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRepoContents();
    const interval = setInterval(fetchRepoContents, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const toggleFolder = (path) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 text-wow-gold animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        Error: {error}
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
        <div className="p-4 max-h-[600px] overflow-y-auto">
          {repoData && filterItems(repoData).map((item) => (
            <div key={item.path} className="py-1">
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
                    <FolderOpen className="w-4 h-4 text-wow-gold" />
                    <span className="text-white">{item.name}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleFileClick(item)}
                  className={`flex items-center gap-2 w-full text-left hover:text-wow-gold transition-colors py-1 px-2 rounded hover:bg-wow-gold/10 ml-6 
                    ${selectedFile?.path === item.path ? 'bg-wow-gold/20 text-wow-gold' : 'text-white'}`}
                >
                  <File className="w-4 h-4 text-wow-gold" />
                  <span>{item.name}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* File Content */}
        <div className="p-4 max-h-[600px] overflow-y-auto">
          {selectedFile ? (
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-wow-border">
                <Code2 className="w-4 h-4 text-wow-gold" />
                <span className="text-wow-gold font-medium">{selectedFile.name}</span>
              </div>
              <pre className="text-white font-mono text-sm whitespace-pre-wrap">
                {fileContent}
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