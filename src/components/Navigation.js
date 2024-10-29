import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  User, 
  Trophy, 
  Swords, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Shield, 
  BarChart2, 
  Contact2,
  Library
} from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#header', icon: User },
    { label: 'Achievements', href: '#achievements', icon: Trophy },
    { label: 'Contact', href: '#contact', icon: Contact2 },
    { label: 'Skills', href: '#skills', icon: Swords },
    { label: 'Education', href: '#education', icon: GraduationCap },
    { label: 'Experience', href: '#experience', icon: Briefcase },
    { label: 'Projects', href: '#projects', icon: Code2 },
    { label: 'Abilities', href: '#class-selection', icon: Shield },
    { label: 'Parse Performance', href: '#parse-performance', icon: BarChart2 },
    { label: 'Technologies', href: '#footer', icon: Library }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isOpen ? 'bg-wow-bg/95 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="hidden lg:flex justify-center items-center h-12 px-4 gap-4 xl:gap-6 max-w-7xl mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              className="text-white hover:text-wow-gold transition-colors duration-300 hover:scale-105 transform text-sm whitespace-nowrap 
                flex items-center gap-1.5 group"
            >
              <IconComponent 
                size={16} 
                className="group-hover:animate-float text-wow-gold/80 group-hover:text-wow-gold" 
              />
              {item.label}
            </a>
          );
        })}
      </div>

      <div className="lg:hidden">
        <div className="flex items-center px-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-wow-gold hover:text-white transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          className={`fixed left-0 right-0 bg-wow-bg/95 backdrop-blur-sm border-t border-wow-border shadow-lg transition-all duration-300 ${
            isOpen ? 'top-[40px] opacity-100 visible' : 'top-[40px] opacity-0 invisible'
          }`}
        >
          <div className="max-h-[calc(100vh-2.5rem)] overflow-y-auto">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-6 py-2 text-white hover:text-wow-gold hover:bg-wow-gold/10 
                    transition-colors duration-300 text-sm group"
                >
                  <IconComponent 
                    size={16} 
                    className="group-hover:animate-float text-wow-gold/80 group-hover:text-wow-gold" 
                  />
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden" 
          style={{ zIndex: -1 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navigation;