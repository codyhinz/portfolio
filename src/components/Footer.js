import React from 'react';
import { 
  Code2, 
  Coffee,
  Boxes, // Frontend
  Monitor,
  Palette,
  Component,
  Play, // Animation
  Move,
  Code,
  Database, // State Management
  GitBranch,
  Terminal,
  Wrench,
  Settings
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import footerBg from '../assets/stormwindgates.png';

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
        { name: "Intersection Observer", icon: Settings },
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
      
      <div className="p-8">
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