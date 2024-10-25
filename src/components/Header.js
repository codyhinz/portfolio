import React, { useState } from 'react';
import pfp from '../assets/pfp.jpg';
import pfp2 from '../assets/pfp.png';
import headerBg from '../assets/orgthroneroom.jpg';

export const Header = () => {
  const [isMainPicture, setIsMainPicture] = useState(true);
  
  const handleImageClick = () => {
    setIsMainPicture(!isMainPicture);
  };

  return (
    <header className="relative overflow-hidden rounded-lg mb-12 border-2 border-wow-border transform hover:scale-[1.01] transition-transform duration-300">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80 transition-colors duration-300" />
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wow-gold to-transparent opacity-50" />
      
      <div className="flex gap-8 items-center p-8">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-wow-gold via-wow-tan to-wow-gold rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
          <div 
            className="relative w-48 h-68 border-4 border-wow-tan rounded-lg overflow-hidden bg-wow-bg cursor-pointer"
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
        
        <div className="flex-1 space-y-4">
          <h1 className="text-6xl font-bold mb-4 text-wow-gold animate-pulse">
            Cody Hinz
          </h1>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="px-3 py-1 bg-wow-gold/20 rounded-full border border-wow-gold/50 text-white">Level 28</span>
            <span className="px-3 py-1 bg-wow-tan/20 rounded-full border border-wow-tan/50 text-white">Nicholasville, KY</span>
            <span className="px-3 py-1 bg-wow-gold/20 rounded-full border border-wow-gold/50 text-white">Full-Stack Developer</span>
            <span className="px-3 py-1 bg-wow-tan/20 rounded-full border border-wow-tan/50 text-white">Veteran Raider</span>
          </div>
          <p className="text-wow-tan text-lg italic border-l-4 border-wow-border pl-4">
            Hardcore WoW raider turned developer, bringing the same dedication and precision from raiding to coding since 2010.
          </p>
          <p className="text-wow-tan text-lg italic border-l-4 border-wow-border pl-4">
            Hard work always pays off.
          </p>
          <p className="text-wow-tan text-lg italic border-l-4 border-wow-border pl-4">
            I am your new 10x developer. Hire me!
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;