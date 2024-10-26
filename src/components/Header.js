import React, { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import pfp from '../assets/pfp.jpg';
import pfp2 from '../assets/pfp.png';
import headerBg from '../assets/orgthroneroom.jpg';

export const Header = () => {
  const [isMainPicture, setIsMainPicture] = useState(true);
  
  const handleImageClick = () => {
    setIsMainPicture(!isMainPicture);
  };

  return (
    <header className="relative overflow-hidden rounded-lg mb-12 border-2 border-wow-border transform hover:scale-[1.01] transition-transform duration-300 scroll-mt-24 mt-6">
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/80 transition-colors duration-300" />
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wow-gold to-transparent opacity-50" />
      
      {/* Social Links */}
      <div className="absolute top-4 right-4 flex gap-4">
        <a
          href="https://github.com/codyhinz"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-wow-bg/80 border border-wow-border rounded-lg hover:bg-wow-gold/20 transition-all duration-300 hover:scale-110"
        >
          <Github className="w-6 h-6 text-wow-gold" />
        </a>
        <a
          href="https://linkedin.com/in/cody-hinz"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-wow-bg/80 border border-wow-border rounded-lg hover:bg-wow-gold/20 transition-all duration-300 hover:scale-110"
        >
          <Linkedin className="w-6 h-6 text-wow-gold" />
        </a>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center p-4 md:p-8">
        <div className="relative group w-32 md:w-48">
          <div className="absolute -inset-1 bg-gradient-to-r from-wow-gold via-white to-wow-gold rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
          <div 
            className="relative h-44 md:h-64 border-4 border-wow-bg rounded-lg overflow-hidden bg-wow-bg cursor-pointer"
            onClick={handleImageClick}
          >
            <img 
              src={pfp} 
              alt="Profile" 
              className={`w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110 ${
                isMainPicture ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <img 
              src={pfp2} 
              alt="Alternative Profile" 
              className={`w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110 absolute top-0 left-0 ${
                isMainPicture ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-wow-gold text-xs bg-black/60 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click to toggle image
          </div>
        </div>
        
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-wow-gold animate-pulse">
            Cody Hinz
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mb-4">
            <span className="px-3 py-1 bg-wow-gold/20 rounded-full border border-wow-gold/50 text-white text-sm md:text-base">Level 28</span>
            <span className="px-3 py-1 bg-white/20 rounded-full border border-white/50 text-white text-sm md:text-base">Nicholasville, KY</span>
            <span className="px-3 py-1 bg-wow-gold/20 rounded-full border border-wow-gold/50 text-white text-sm md:text-base">Full-Stack Developer</span>
            <span className="px-3 py-1 bg-white/20 rounded-full border border-white/50 text-white text-sm md:text-base">Veteran Raider</span>
          </div>
          <p className="text-white text-base md:text-lg italic border-l-4 border-wow-border pl-4">
            Hardcore WoW raider turned developer, bringing the same dedication and precision from raiding to coding since 2010.
          </p>
          <p className="text-white text-base md:text-lg italic border-l-4 border-wow-border pl-4">
            Hard work always pays off.
          </p>
          <p className="text-white text-base md:text-lg italic border-l-4 border-wow-border pl-4">
            I am your new 10x developer. Hire me!
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;