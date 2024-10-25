import React from 'react';
import { parsePerformances } from '../constants/parseData';

export const ParsePerformance = () => {
  const getParseColor = (parse) => {
    if (parse === 100) return '#E5CC80'; // Perfect
    if (parse >= 99) return '#E268A8'; // Legendary
    if (parse >= 95) return '#FF8000'; // Mythic
    if (parse >= 75) return '#A335EE'; // Epic
    if (parse >= 50) return '#0070dd'; // Rare
    if (parse >= 25) return '#1eff00'; // Uncommon
    return '#666666'; // Common
  };

  const getParseTextColor = (parse) => {
    if (parse === 100) return 'text-[#E5CC80]'; // Perfect
    if (parse >= 99) return 'text-[#E268A8]'; // Legendary
    if (parse >= 95) return 'text-[#FF8000]'; // Mythic
    if (parse >= 75) return 'text-[#A335EE]'; // Epic
    if (parse >= 50) return 'text-[#0070dd]'; // Rare
    if (parse >= 25) return 'text-[#1eff00]'; // Uncommon
    return 'text-[#666666]'; // Common
  };

  return (
    <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {parsePerformances.map((char) => (
        <div
          key={char.id}
          className="bg-black/30 rounded-lg p-6 border-2 border-wow-border hover:border-wow-gold transition-colors duration-300 relative group"
        >
          {/* Spec Icon in Top Right Corner */}
          <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-black/80 border-2 border-wow-gold flex items-center justify-center">
            <img
              src={char.specIcon}
              alt={`${char.spec} icon`}
              className="w-8 h-8"
            />
          </div>

          {/* Character Profile Section */}
          <div className="flex items-start gap-4 mb-4">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={char.profilePicture}
                alt={char.characterName}
                className="w-16 h-16 rounded-lg border-2 object-cover"
                style={{ borderColor: char.classColor }}
              />
            </div>
            
            {/* Character Info */}
            <div>
              <div className="flex items-center gap-2">
                <h3 
                  className="text-xl font-bold" 
                  style={{ color: char.classColor }}
                >
                  {char.characterName}
                </h3>
                <span style={{ color: char.classColor }}>
                  {char.level}
                </span>
              </div>
              <p style={{ color: char.classColor }} className="text-sm">
                {char.spec} {char.class}
              </p>
              <p className="text-wow-gold text-sm">
                {char.realm}
              </p>
            </div>
          </div>

          {/* Parse Stats */}
          <div className="space-y-3">
            <div className="bg-black/20 p-3 rounded border border-wow-border">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm" style={{ color: char.classColor }}>Overall Parse</span>
                <span className={`font-bold ${getParseTextColor(char.overallParse)}`}>
                  {char.overallParse}
                </span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${char.overallParse}%`,
                    backgroundColor: getParseColor(char.overallParse)
                  }}
                />
              </div>
            </div>

            <div className="bg-black/20 p-3 rounded border border-wow-border">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm" style={{ color: char.classColor }}>Best Parse</span>
                <span className={`font-bold ${getParseTextColor(char.bestParse)}`}>
                  {char.bestParse}
                </span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${char.bestParse}%`,
                    backgroundColor: getParseColor(char.bestParse)
                  }}
                />
              </div>
            </div>

            <div className="bg-black/20 p-3 rounded border border-wow-border">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm" style={{ color: char.classColor }}>iLvl Parse</span>
                <span className={`font-bold ${getParseTextColor(char.ilvlParse)}`}>
                  {char.ilvlParse}
                </span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${char.ilvlParse}%`,
                    backgroundColor: getParseColor(char.ilvlParse)
                  }}
                />
              </div>
            </div>
          </div>

          {/* Raid Info */}
          <div className="mt-4 pt-4 border-t border-wow-border">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: char.classColor }}>{char.tierName}</span>
              <span className="text-sm" style={{ color: char.classColor }}>{char.kills} Kills</span>
            </div>
          </div>

          {/* Hover Effect Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-wow-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      ))}
    </div>
  );
};

export default ParsePerformance;