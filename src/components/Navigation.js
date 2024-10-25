import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
    { label: 'About', href: '#header' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Class Selection', href: '#class-selection' },
    { label: 'Skills', href: '#skills' },
    { label: 'Parse Performance', href: '#parse-performance' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isOpen ? 'bg-wow-bg/95 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex justify-center items-center h-16 px-4 gap-4 xl:gap-8 max-w-7xl mx-auto">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-wow-tan hover:text-wow-gold transition-colors duration-300 hover:scale-105 transform text-sm xl:text-base whitespace-nowrap"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center px-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-4 text-wow-gold hover:text-wow-tan transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="text-wow-gold py-4 text-sm ml-2">Cody Hinz Portfolio</span>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed left-0 right-0 bg-wow-bg/95 backdrop-blur-sm border-t border-wow-border shadow-lg transition-all duration-300 ${
            isOpen ? 'top-[56px] opacity-100 visible' : 'top-[56px] opacity-0 invisible'
          }`}
        >
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-6 py-3 text-wow-tan hover:text-wow-gold hover:bg-wow-gold/10 transition-colors duration-300 text-sm"
              >
                {item.label}
              </a>
            ))}
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