import React, { useState, useEffect } from 'react';
import { parsePerformances } from '../constants/parseData';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import parseBg from '../assets/icc.jpg';

export const ParsePerformance = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#parse-performance') {
        setIsExpanded(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const getParseColor = (parse) => {
    if (parse === 100) return '#E5CC80';
    if (parse >= 99) return '#E268A8';
    if (parse >= 95) return '#FF8000';
    if (parse >= 75) return '#A335EE';
    if (parse >= 50) return '#0070dd';
    if (parse >= 25) return '#1eff00';
    return '#666666';
  };

  const getParseTextColor = (parse) => {
    if (parse === 100) return 'text-[#E5CC80]';
    if (parse >= 99) return 'text-[#E268A8]';
    if (parse >= 95) return 'text-[#FF8000]';
    if (parse >= 75) return 'text-[#A335EE]';
    if (parse >= 50) return 'text-[#0070dd]';
    if (parse >= 25) return 'text-[#1eff00]';
    return 'text-[#666666]';
  };

  return (
    <section id="parse-performance" className="relative mb-12 rounded-lg border-2 border-wow-border group scroll-mt-24">
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${parseBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/85 group-hover:bg-black/80 transition-colors duration-300" />
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 relative">
            <h2 className="text-3xl font-bold text-wow-gold">Parse Performance</h2>
            <div 
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <HelpCircle 
                size={20} 
                className="text-wow-gold hover:text-white transition-colors duration-300 cursor-help"
              />
              
              <div className={`
                absolute left-1/2 bottom-full mb-2 w-[28rem] transform -translate-x-1/2
                bg-black/95 border border-wow-gold rounded-lg p-4 z-50
                transition-all duration-300
                ${showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'}
              `}>
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
                  <div className="w-3 h-3 bg-black/95 border-r border-b border-wow-gold rotate-45 -mb-1.5" />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-wow-gold font-bold">What is Parsing in World of Warcraft?</p>
                    <p className="text-white">Parsing is a performance metric that compares your combat effectiveness against all other players of your class and specialization. Your parse percentile indicates how you rank against others - a 95th percentile means you performed better than 95% of players.</p>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-wow-gold to-transparent my-3" />
                  
                  <div>
                    <p className="text-wow-gold font-bold">Understanding iLvl (Item Level) Parsing</p>
                    <p className="text-white">Item Level parsing compares your performance only against players with similar gear levels. While regular parsing shows how you rank against everyone, iLvl parsing demonstrates your skill independent of gear advantages - proving you can maximize performance with the tools at hand.</p>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-wow-gold to-transparent my-3" />

                  <div>
                    <p className="text-wow-gold font-bold">How This Translates to Development</p>
                    <p className="text-white">Just as I consistently achieve high parse rankings in WoW across both metrics, I bring the same dedication to software development. My ability to perform exceptionally well regardless of circumstances demonstrates my:</p>
                    <ul className="mt-1 space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="text-wow-gold">⚔️</span>
                        <span className="text-white">Adaptability with different technologies and constraints</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-wow-gold">⚔️</span>
                        <span className="text-white">Ability to optimize code and maximize efficiency</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-wow-gold">⚔️</span>
                        <span className="text-white">Commitment to excellence regardless of project scope</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-wow-gold hover:text-white transition-colors duration-300"
            aria-label={isExpanded ? "Collapse parse performance section" : "Expand parse performance section"}
          >
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ${
          isExpanded ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0 overflow-hidden'
        }`}>
          {parsePerformances.map((char) => (
            <div
              key={char.id}
              className="bg-black/30 rounded-lg p-6 border-2 border-wow-border hover:border-wow-gold transition-colors duration-300 relative group"
            >
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-black/80 border-2 border-wow-gold flex items-center justify-center">
                <img
                  src={char.specIcon}
                  alt={`${char.spec} icon`}
                  className="w-8 h-8"
                />
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img
                    src={char.profilePicture}
                    alt={char.characterName}
                    className="w-16 h-16 rounded-lg border-2 object-cover"
                    style={{ borderColor: char.classColor }}
                  />
                </div>
                
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

              <div className="mt-4 pt-4 border-t border-wow-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: char.classColor }}>{char.tierName}</span>
                  <span className="text-sm" style={{ color: char.classColor }}>{char.kills} Kills</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-wow-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParsePerformance;