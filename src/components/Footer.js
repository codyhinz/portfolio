import React from 'react';
import { Code2, Coffee } from 'lucide-react';

export const Footer = () => {
  const technologies = [
    {
      category: "Frontend",
      techs: ["React", "Tailwind CSS", "Lucide Icons"]
    },
    {
      category: "Animation",
      techs: ["Intersection Observer", "CSS Transitions", "Custom Hooks"]
    },
    {
      category: "State Management",
      techs: ["React Hooks", "Context API"]
    },
    {
      category: "Development Tools",
      techs: ["Vite", "ESLint", "Git"]
    }
  ];

  return (
    <footer id="footer" className="relative mt-12 rounded-lg border-2 border-wow-border bg-black/90 overflow-hidden">
      {/* Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wow-gold to-transparent opacity-50" />
      
      <div className="p-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Code2 className="w-6 h-6 text-wow-gold animate-float" />
          <h2 className="text-2xl font-bold text-wow-gold">Built With</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div 
              key={tech.category}
              className="bg-black/30 p-4 rounded-lg border border-wow-border hover:border-wow-gold transition-all duration-300"
            >
              <h3 className="text-wow-gold font-semibold mb-2">{tech.category}</h3>
              <ul className="space-y-1">
                {tech.techs.map((item, itemIndex) => (
                  <li 
                    key={item}
                    className="text-white/80 text-sm flex items-center gap-2"
                  >
                    <span className="text-wow-gold">⚔️</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
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