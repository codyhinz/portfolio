import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { classes } from '../constants/classData';
import { ChevronRight } from 'lucide-react';
// Warrior Icons 
import warriorIcon from '../assets/warrior.png';
import warriorBg from '../assets/warriororderhall.png';
import mortalStrikeIcon from '../assets/arms.png';
import tacticalMasteryIcon from '../assets/tacticalmastery.png';
import battleShoutIcon from '../assets/battleshout.png';
import victoryRushIcon from '../assets/victoryrush.png';
// Death Knight Icons
import deathknightIcon from '../assets/deathknight.png';
import deathknightBg from '../assets/deathknightorderhall.jpg';
import obliterateIcon from '../assets/obliterate.png';
import deathGripIcon from '../assets/deathgrip.png';
import pillarOfFrostIcon from '../assets/pillaroffrost.png';
import runicPowerIcon from '../assets/empoweredruneweapon.png';
// Druid Icons
import druidIcon from '../assets/druid.png';
import druidBg from '../assets/druidorderhall.jpg';
import rakeIcon from '../assets/rake.png';
import ripIcon from '../assets/rip.png';
import savageRoarIcon from '../assets/savageroar.png';
import berserkIcon from '../assets/berserk.png';

const classBackgrounds = {
  warrior: warriorBg,
  deathknight: deathknightBg,
  druid: druidBg,
};

const classIcons = {
  warrior: warriorIcon,
  deathknight: deathknightIcon,
  druid: druidIcon,
};

const abilityIcons = {
  warrior: {
    'Mortal Strike': mortalStrikeIcon,
    'Tactical Mastery': tacticalMasteryIcon,
    'Battle Shout': battleShoutIcon,
    'Victory Rush': victoryRushIcon,
  },
  deathknight: {
    'Obliterate': obliterateIcon,
    'Death Grip': deathGripIcon,
    'Pillar of Frost': pillarOfFrostIcon,
    'Runic Power': runicPowerIcon,
  },
  druid: {
    'Rake': rakeIcon,
    'Rip': ripIcon,
    'Savage Roar': savageRoarIcon,
    'Berserk': berserkIcon,
  },
};

const classColors = {
  warrior: '#C79C6E',
  deathknight: '#C41E3A',
  druid: '#FF7C0A',
};

export const ClassSelection = ({ selectedClass, setSelectedClass }) => {
  const [classRef, isVisible] = useScrollAnimation(0.1);

  return (
    <div ref={classRef} id="class-selection" className="relative mb-12 scroll-mt-24 rounded-lg overflow-hidden"
      style={{ 
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: selectedClass ? classColors[selectedClass] : '#4a3a22'
      }}>
      <div className="absolute inset-0 w-full h-full -z-10 transform-gpu overflow-hidden">
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${classBackgrounds[selectedClass]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(3px)',
            transform: 'scale(1.1)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/75" />
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wow-gold to-transparent opacity-50" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-1/3 space-y-4">
            <h2 className={`text-4xl font-bold text-wow-gold mb-8 animate-slide-right 
              ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}>
              Choose Your Path
            </h2>

            <div className="space-y-4">
              {Object.entries(classes).map(([key, value], index) => (
                <button
                  key={key}
                  onClick={() => setSelectedClass(key)}
                  className={`w-full group relative overflow-hidden rounded-lg transition-all duration-300 
                    animate-scale stagger-${index + 1} ${isVisible ? 'scale-end' : 'scale-start'}`}
                  style={{ 
                    color: classColors[key],
                    backgroundColor: selectedClass === key ? `${classColors[key]}20` : 'transparent',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: selectedClass === key ? classColors[key] : '#4a3a22'
                  }}
                >
                  <div className={`absolute inset-0 transition-all duration-300
                    ${selectedClass === key ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}
                    style={{
                      backgroundImage: `url(${classBackgrounds[key]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/90" />
                  </div>

                  <div className={`relative flex items-center p-4 transition-all duration-300`}>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-black/50 backdrop-blur-sm" />
                      <img 
                        src={classIcons[key]} 
                        alt={`${key} icon`} 
                        className={`w-14 h-14 animate-float transition-transform duration-300 
                          ${selectedClass === key ? 'scale-110' : 'group-hover:scale-110'}`}
                      />
                    </div>

                    <div className="ml-4 flex-1">
                      <span className="block text-xl font-bold">
                        {key === 'deathknight' ? 'Death Knight' : key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <span className="block text-base text-white/70">{value.spec}</span>
                    </div>

                    <ChevronRight className={`w-6 h-6 transition-transform duration-300
                      ${selectedClass === key ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 lg:sticky lg:top-4">
            <ClassDetails 
              selectedClassName={selectedClass}
              classData={classes[selectedClass]}
              isVisible={isVisible}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ClassDetails = ({ selectedClassName, classData, isVisible }) => {
  if (!selectedClassName || !classData) return null;

  return (
    <div className={`bg-black/40 backdrop-blur-sm rounded-lg p-6 space-y-6 transition-all duration-300`}
      style={{
        backgroundColor: `${classColors[selectedClassName]}10`,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: classColors[selectedClassName]
      }}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-black/50 backdrop-blur-sm" />
          <img 
            src={classIcons[selectedClassName]} 
            alt={`${classData.title} icon`} 
            className="w-20 h-20 animate-float"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-bold mb-2" style={{ color: classColors[selectedClassName] }}>
            {classData.title}
          </h3>
          <p className="text-white/70 text-lg">{classData.spec}</p>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="text-white/90 text-lg leading-relaxed space-y-4 whitespace-pre-line">
          {classData.description.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xl font-bold" style={{ color: classColors[selectedClassName] }}>
          Core Abilities
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classData.abilities.map((ability, index) => {
            const [abilityName, ...descParts] = ability.split(':');
            const abilityDescription = descParts.join(':').trim();
            
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg transition-all duration-300 bg-black/30"
                style={{ 
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: `${classColors[selectedClassName]}40`
                }}
              >
                <div className="relative p-4 flex gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-black/50 backdrop-blur-sm" />
                    <img 
                      src={abilityIcons[selectedClassName][abilityName]} 
                      alt={abilityName}
                      className="w-12 h-12 animate-float group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg mb-2" style={{ color: classColors[selectedClassName] }}>
                      {abilityName}
                    </h4>
                    <p className="text-white/80 leading-relaxed">{abilityDescription}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassSelection;