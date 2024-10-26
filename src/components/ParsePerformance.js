import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { parsePerformances } from '../constants/parseData';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import parseBg from '../assets/icc.jpg';

export const ParsePerformance = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [parseRef, isVisible] = useScrollAnimation(0.1);
  
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
    <section 
      ref={parseRef} 
      id="parse-performance" 
      className={`relative mb-12 rounded-lg border-2 border-wow-border group scroll-mt-24 animate-fade ${isVisible ? 'fade-end' : 'fade-start'}`}
    >
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

      <div className="p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 relative">
            <h2 className={`text-2xl md:text-3xl font-bold text-wow-gold animate-slide-right ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}>
              Parse Performance
            </h2>
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
                absolute left-1/2 bottom-full mb-2 w-[16rem] md:w-[28rem] transform -translate-x-1/2
                bg-black/95 border border-wow-gold rounded-lg p-4 z-50
                transition-opacity duration-300
                ${showTooltip ? 'opacity-100 visible' : 'opacity-0 invisible'}
              `}>
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
                  <div className="w-3 h-3 bg-black/95 border-r border-b border-wow-gold rotate-45 -mb-1.5" />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-wow-gold font-bold">What is Parsing in World of Warcraft?</p>
                    <p className="text-white">Parsing is a performance metric that compares your combat effectiveness against all other players of your class and specialization.</p>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-wow-gold to-transparent my-3" />
                  
                  <div>
                    <p className="text-wow-gold font-bold">Understanding iLvl Parsing</p>
                    <p className="text-white">Item Level parsing compares your performance only against players with similar gear levels.</p>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-wow-gold to-transparent my-3" />

                  <div>
                    <p className="text-wow-gold font-bold">How This Translates to Development</p>
                    <ul className="mt-1 space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="text-wow-gold">⚔️</span>
                        <span className="text-white">Adaptability with different technologies</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-wow-gold">⚔️</span>
                        <span className="text-white">Ability to optimize code</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-wow-gold">⚔️</span>
                        <span className="text-white">Commitment to excellence</span>
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

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 overflow-hidden
          ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          {parsePerformances.map((char, index) => (
            <div
              key={char.id}
              className={`bg-black/30 rounded-lg p-4 md:p-6 border-2 border-wow-border hover:border-wow-gold 
                transition-colors duration-300 relative group animate-scale stagger-${index + 1} mt-6 
                ${isVisible ? 'scale-end' : 'scale-start'}`}
            >
              {/* Spec Icon - Positioned above the card */}
              <div className="absolute -top-6 -right-3 w-12 h-12 rounded-full bg-black/80 border-2 border-wow-gold 
                flex items-center justify-center z-10 overflow-visible">
                <img
                  src={char.specIcon}
                  alt={`${char.spec} icon`}
                  className="w-8 h-8 object-contain"
                />
              </div>

              <div className={`flex items-start gap-2 md:gap-4 mb-4 animate-slide-right stagger-${index + 1} 
                ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}>
                <div className="relative shrink-0">
                  <img
                    src={char.profilePicture}
                    alt={char.characterName}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-lg border-2 object-cover"
                    style={{ borderColor: char.classColor }}
                  />
                </div>
                
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 
                      className="text-lg md:text-xl font-bold truncate" 
                      style={{ color: char.classColor }}
                    >
                      {char.characterName}
                    </h3>
                    <span style={{ color: char.classColor }} className="shrink-0">
                      {char.level}
                    </span>
                  </div>
                  <p style={{ color: char.classColor }} className="text-xs md:text-sm truncate">
                    {char.spec} {char.class}
                  </p>
                  <p className="text-wow-gold text-xs md:text-sm truncate">
                    {char.realm}
                  </p>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                {[
                  { label: 'Overall Parse', value: char.overallParse },
                  { label: 'Best Parse', value: char.bestParse },
                  { label: 'iLvl Parse', value: char.ilvlParse }
                ].map((parse, parseIndex) => (
                  <div 
                    key={parse.label} 
                    className={`bg-black/20 p-2 md:p-3 rounded border border-wow-border
                      animate-slide-right stagger-${parseIndex + 1} 
                      ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs md:text-sm" style={{ color: char.classColor }}>{parse.label}</span>
                      <span className={`font-bold text-xs md:text-sm ${getParseTextColor(parse.value)}`}>
                        {parse.value}
                      </span>
                    </div>
                    <div className="w-full bg-black/40 rounded-full h-1.5 md:h-2">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${parse.value}%`,
                          backgroundColor: getParseColor(parse.value)
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mt-3 md:mt-4 pt-3 md:pt-4 border-t border-wow-border
                animate-fade stagger-${index + 1} ${isVisible ? 'fade-end' : 'fade-start'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm truncate" style={{ color: char.classColor }}>{char.tierName}</span>
                  <span className="text-xs md:text-sm shrink-0" style={{ color: char.classColor }}>{char.kills} Kills</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParsePerformance;