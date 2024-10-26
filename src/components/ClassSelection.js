import React from 'react';
import { classes } from '../constants/classData';
import warriorBg from '../assets/warriororderhall.png';
import deathknightBg from '../assets/deathknightorderhall.jpg';
import druidBg from '../assets/druidorderhall.jpg';
import warriorIcon from '../assets/warrior.png';
import deathknightIcon from '../assets/deathknight.png';
import druidIcon from '../assets/druid.png';

import mortalStrikeIcon from '../assets/arms.png';
import tacticalMasteryIcon from '../assets/tacticalmastery.png';
import battleShoutIcon from '../assets/battleshout.png';
import victoryRushIcon from '../assets/victoryrush.png';

import obliterateIcon from '../assets/obliterate.png';
import deathGripIcon from '../assets/deathgrip.png';
import pillarOfFrostIcon from '../assets/pillaroffrost.png';
import runicPowerIcon from '../assets/empoweredruneweapon.png';

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

export const ClassSelection = ({ selectedClass, setSelectedClass }) => (
  <div id="class-selection" className="relative mb-12 rounded-lg border-2 border-wow-border group scroll-mt-24">
    <div 
      className="absolute inset-0 -z-10 transition-opacity duration-500"
      style={{
        backgroundImage: `url(${classBackgrounds[selectedClass]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/85 group-hover:bg-black/80 transition-colors duration-300" />
    </div>

    <div className="p-8">
      <h2 className="text-3xl font-bold text-wow-gold mb-6">Development Specializations</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.entries(classes).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setSelectedClass(key)}
            style={{
              borderColor: selectedClass === key ? classColors[key] : undefined,
              backgroundColor: selectedClass === key ? `${classColors[key]}20` : undefined
            }}
            className={`px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 border-2 hover:border-opacity-100`}
          >
            <img 
              src={classIcons[key]} 
              alt={`${key} icon`} 
              className="w-11 h-11 inline-block mr-2"
            />
            <span style={{ color: classColors[key] }}>
              {key === 'deathknight' ? 'Death Knight' : key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </button>
        ))}
      </div>
      <ClassDetails 
        class={classes[selectedClass]} 
        classIcon={classIcons[selectedClass]}
        abilityIcons={abilityIcons[selectedClass]}
        classColor={classColors[selectedClass]}
      />
    </div>
  </div>
);

const ClassDetails = ({ class: selectedClass, classIcon, abilityIcons, classColor }) => (
  <div className="bg-black/20 p-6 rounded-lg border border-wow-border space-y-4">
    <div className="flex items-center gap-4">
      <img 
        src={classIcon} 
        alt={`${selectedClass.title} icon`} 
        className="w-12 h-12"
      />
      <h3 className="text-xl font-bold" style={{ color: classColor }}>{selectedClass.title}</h3>
    </div>
    <p className="text-white">{selectedClass.description}</p>
    <div className="mt-4">
      <h4 style={{ color: classColor }} className="mb-2">Core Abilities:</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedClass.abilities.map((ability, index) => {
          const abilityName = ability.split(':')[0];
          const abilityDescription = ability.split(':')[1];
          
          return (
            <div
              key={index}
              className="p-3 bg-black/30 rounded border border-wow-border hover:border-opacity-100 transition-colors duration-300"
              style={{ borderColor: `${classColor}40` }}
            >
              <div className="flex items-center gap-2">
                <img 
                  src={abilityIcons[abilityName]} 
                  alt={abilityName}
                  className="w-8 h-8"
                />
                <div>
                  <span style={{ color: classColor }} className="font-semibold">{abilityName}:</span>
                  <span className="text-white ml-2">{abilityDescription}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default ClassSelection;