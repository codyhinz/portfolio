import React from 'react';
import pfp from '../assets/pfp.jpg';

export const Header = () => (
  <header className="relative overflow-hidden rounded-lg bg-black/50 p-8 mb-12 border-2 border-wow-border transform hover:scale-[1.01] transition-transform duration-300">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wow-gold to-transparent opacity-50" />
    <div className="flex gap-8 items-center">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-wow-gold via-wow-tan to-wow-gold rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <div className="relative w-48 h-68 border-4 border-wow-tan rounded-lg overflow-hidden bg-wow-bg">
          <img src={pfp} alt="Profile" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
        </div>
      </div>
      
      <div className="flex-1 space-y-4">
        <h1 className="text-6xl font-bold mb-4 text-wow-gold animate-pulse">
          Cody Hinz
        </h1>
        <div className="flex flex-wrap gap-4 mb-4">
          <span className="px-3 py-1 bg-wow-gold/20 rounded-full border border-wow-gold/50">Level 28</span>
          <span className="px-3 py-1 bg-wow-tan/20 rounded-full border border-wow-tan/50">Lexington, KY</span>
          <span className="px-3 py-1 bg-wow-gold/20 rounded-full border border-wow-gold/50">Full-Stack Developer</span>
          <span className="px-3 py-1 bg-wow-tan/20 rounded-full border border-wow-tan/50">Veteran Raider</span>
        </div>
        <p className="text-wow-tan text-lg italic border-l-4 border-wow-border pl-4">
          "Hardcore WoW raider turned developer, bringing the same dedication and precision from raiding to coding since 2010."
        </p>
      </div>
    </div>
  </header>
);

export default Header;