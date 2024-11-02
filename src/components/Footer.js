import React, { useState, useCallback } from 'react';
import { 
  Code2, 
  Coffee,
  Boxes,
  Monitor,
  Palette,
  Component,
  Play,
  Move,
  Code,
  Database,
  GitBranch,
  Terminal,
  Wrench,
  Github,
  FileCode,
  ChevronRight,
  ChevronDown,
  Circle,
  Folder,
  Loader2
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import footerBg from '../assets/stormwindgates.png';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';

// Language configuration for syntax highlighting
const LANGUAGE_CONFIG = {
  js: { name: 'javascript', color: '#f7df1e' },
  jsx: { name: 'jsx', color: '#61dafb' },
  ts: { name: 'typescript', color: '#3178c6' },
  tsx: { name: 'typescript', color: '#3178c6' },
  css: { name: 'css', color: '#264de4' },
  scss: { name: 'scss', color: '#cc6699' },
  html: { name: 'html', color: '#e34c26' },
  json: { name: 'json', color: '#5b5b5b' },
  md: { name: 'markdown', color: '#000000' },
  py: { name: 'python', color: '#3572A5' },
  java: { name: 'java', color: '#b07219' },
  php: { name: 'php', color: '#4F5D95' },
  rb: { name: 'ruby', color: '#701516' },
  go: { name: 'go', color: '#00ADD8' },
  rs: { name: 'rust', color: '#dea584' }
};

const getFileLanguage = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  return LANGUAGE_CONFIG[ext] || { name: 'text', color: '#9e9e9e' };
};

const FileIcon = ({ filename }) => {
  const { color } = getFileLanguage(filename);
  return (
    <div className="relative">
      <FileCode size={16} className="text-white/70" />
      <div 
        className="absolute bottom-0 right-0 w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

const VSCodeGithubViewer = ({ username = 'codyhinz', repo = 'portfolio' }) => {
  const [fileTree, setFileTree] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  React.useEffect(() => {
    if (selectedFile && fileContent) {
      Prism.highlightAll();
    }
  }, [selectedFile, fileContent]);

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

  const fetchRepoContents = useCallback(async (path = '') => {
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

  React.useEffect(() => {
    const initRepo = async () => {
      setLoading(true);
      const tree = await fetchRepoContents();
      setFileTree(tree);
      setLoading(false);
    };

    initRepo();
  }, [fetchRepoContents]);

  const toggleFolder = useCallback((path) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  }, []);

  const handleFileSelect = useCallback(async (file) => {
    setSelectedFile(file);
    setFileContent('');
    setActiveTab(file);
    
    if (file.url) {
      const content = await fetchFileContent(file.url);
      setFileContent(content);
    }
  }, []);

  const FileTreeItem = React.memo(({ name, item, path = '', depth = 0 }) => {
    const fullPath = path ? `${path}/${name}` : name;
    const isExpanded = expandedFolders[fullPath];
    const isActive = activeTab?.path === item.path;
    
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
        className={`flex items-center gap-2 w-full px-2 py-0.5 text-sm transition-colors duration-200
          ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
        style={{ paddingLeft: `${depth * 1.25}rem` }}
      >
        <FileIcon filename={name} />
        <span className="text-white/90">{name}</span>
      </button>
    );
  });

  FileTreeItem.displayName = 'FileTreeItem';

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
          <Github size={16} className="text-wow-gold" />
          <span className="text-white/90 text-sm font-medium">{repo}</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle size={12} className="text-red-500 hover:brightness-110 transition-all cursor-pointer" />
          <Circle size={12} className="text-yellow-500 hover:brightness-110 transition-all cursor-pointer" />
          <Circle size={12} className="text-green-500 hover:brightness-110 transition-all cursor-pointer" />
        </div>
      </div>

      {/* Simplified Toolbar */}
      <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-white/10">
        <div className="flex items-center gap-2">
          <GitBranch size={16} className="text-wow-gold" />
          <span className="text-white/90 text-sm">main</span>
        </div>
      </div>

      {/* Main Content */}
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
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Tabs */}
          {activeTab && (
            <div className="flex items-center border-b border-white/10 bg-[#252526]">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#1E1E1E] border-r border-white/10">
                <FileIcon filename={activeTab.path.split('/').pop()} />
                <span className="text-white/90 text-sm">
                  {activeTab.path.split('/').pop()}
                </span>
              </div>
            </div>
          )}
          
          {/* Content Area */}
          <div className="flex-1 overflow-auto bg-[#1E1E1E] p-4">
            {selectedFile ? (
              <pre className="text-white/90 text-sm font-mono">
                <code className={`language-${getFileLanguage(selectedFile.path.split('/').pop()).name}`}>
                  {fileContent}
                </code>
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-white/50">
                Select a file to view its contents
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Footer = () => {
  const [footerRef, isVisible] = useScrollAnimation(0.1);
  
  const technologies = [
    {
      category: "Frontend",
      icon: Boxes,
      techs: [
        { name: "React", icon: Component },
        { name: "Tailwind CSS", icon: Palette },
        { name: "Lucide Icons", icon: Monitor }
      ]
    },
    {
      category: "Animation",
      icon: Play,
      techs: [
        { name: "Intersection Observer", icon: Code2 },  // Changed from Settings
        { name: "CSS Transitions", icon: Move },
        { name: "Custom Hooks", icon: Code }
      ]
    },
    {
      category: "State Management",
      icon: Database,
      techs: [
        { name: "React Hooks", icon: Code },
        { name: "Context API", icon: Database }
      ]
    },
    {
      category: "Development Tools",
      icon: Wrench,
      techs: [
        { name: "Vite", icon: Terminal },
        { name: "ESLint", icon: Code2 },
        { name: "Git", icon: GitBranch }
      ]
    }
  ];
  
  return (
    <footer 
      ref={footerRef}
      id="footer" 
      className="relative mb-12 rounded-lg border-2 border-wow-border group scroll-mt-24"
    >
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/85 group-hover:bg-black/80 transition-colors duration-300" />
      </div>
      
      <div className="p-8 space-y-8">
        {/* Technologies Section */}
        <div>
          <div className={`flex items-center justify-center gap-2 mb-6 animate-slide-right 
            ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}>
            <Code2 className="w-6 h-6 text-wow-gold animate-float" />
            <h2 className="text-2xl font-bold text-wow-gold">Built With</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div 
                key={tech.category}
                className={`bg-black/30 p-4 rounded-lg border border-wow-border hover:border-wow-gold 
                  transition-all duration-300 relative group/card animate-scale stagger-${index + 1} 
                  ${isVisible ? 'scale-end' : 'scale-start'}`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wow-gold to-transparent opacity-50" />
                
                <div className="flex items-center gap-2 mb-4">
                  <tech.icon className="w-5 h-5 text-wow-gold" />
                  <h3 className="text-wow-gold font-semibold">{tech.category}</h3>
                </div>

                <ul className="space-y-3">
                  {tech.techs.map((item, itemIndex) => (
                    <li 
                      key={item.name}
                      className={`animate-slide-right stagger-${itemIndex + 1} 
                        ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}
                    >
                      <div className="flex items-center gap-2 group/item">
                        <div className="bg-wow-gold/10 p-1.5 rounded transition-all duration-300 
                          group-hover/item:bg-wow-gold/20">
                          <item.icon className="w-4 h-4 text-wow-gold" />
                        </div>
                        <span className="text-white/80 text-sm">{item.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Viewer Section */}
        <div className={`animate-scale ${isVisible ? 'scale-end' : 'scale-start'}`}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <GitBranch className="w-6 h-6 text-wow-gold animate-float" />
            <h2 className="text-2xl font-bold text-wow-gold">Live Repository Explorer</h2>
          </div>
          <VSCodeGithubViewer 
            username="codyhinz"
            repo="portfolio"
          />
        </div>

        {/* Footer Credits */}
        <div className={`mt-8 text-center animate-fade ${isVisible ? 'fade-end' : 'fade-start'}`}>
          <p className="text-white/60 text-sm flex items-center justify-center gap-2">
            <Coffee className="w-4 h-4 text-wow-gold animate-float" />
            Crafted with passion by Cody Hinz
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;