import React from 'react';
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
  Github
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import GitHubViewer from './GitHubViewer';
import footerBg from '../assets/stormwindgates.png';

export const Footer = () => {
  const [footerRef, isVisible] = useScrollAnimation(0.1);
  
  const technologies = [
    {
      category: "Frontend",
      icon: Boxes,
      techs: [
        { name: "React", icon: Component, color: "#61dafb" },
        { name: "Tailwind CSS", icon: Palette, color: "#38bdf8" },
        { name: "Lucide Icons", icon: Monitor, color: "#94a3b8" }
      ]
    },
    {
      category: "Animation",
      icon: Play,
      techs: [
        { name: "Intersection Observer", icon: Code2, color: "#a855f7" },
        { name: "CSS Transitions", icon: Move, color: "#f472b6" },
        { name: "Custom Hooks", icon: Code, color: "#22c55e" }
      ]
    },
    {
      category: "State Management",
      icon: Database,
      techs: [
        { name: "React Hooks", icon: Code, color: "#3b82f6" },
        { name: "Context API", icon: Database, color: "#f59e0b" }
      ]
    },
    {
      category: "Development Tools",
      icon: Wrench,
      techs: [
        { name: "Vite", icon: Terminal, color: "#8b5cf6" },
        { name: "ESLint", icon: Code2, color: "#4b5563" },
        { name: "Git", icon: GitBranch, color: "#f43f5e" }
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
      
      <div className="p-4 md:p-8 space-y-8">
        {/* Technologies Section */}
        <div>
          <div className={`flex items-center justify-center gap-2 mb-6 animate-slide-right 
            ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}>
            <Code2 className="w-6 h-6 text-wow-gold animate-float" />
            <h2 className="text-xl md:text-2xl font-bold text-wow-gold">Built With</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
                          <item.icon className="w-4 h-4" style={{ color: item.color }} />
                        </div>
                        <span className="text-white/80 text-sm group-hover/item:text-white 
                          transition-colors duration-300">{item.name}</span>
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
            <Github className="w-6 h-6 text-wow-gold animate-float" />
            <h2 className="text-xl md:text-2xl font-bold text-wow-gold">Live Repository Explorer</h2>
          </div>
          <GitHubViewer />
        </div>

        {/* Footer Credits */}
        <div className={`mt-8 text-center animate-fade ${isVisible ? 'fade-end' : 'fade-start'}`}>
          <p className="text-white/60 text-xs md:text-sm flex items-center justify-center gap-2">
            <Coffee className="w-4 h-4 text-wow-gold animate-float" />
            Crafted with passion by Cody Hinz
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;