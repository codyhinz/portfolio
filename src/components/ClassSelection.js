// First, import the icons at the top of your ClassSelection.js
import React from 'react';
import { classes } from '../constants/classData';
import warriorBg from '../assets/warriororderhall.png';
import deathknightBg from '../assets/deathknightorderhall.jpg';
import druidBg from '../assets/druidorderhall.jpg';
// Add your icon imports
import warriorIcon from '../assets/warrior.png';
import deathknightIcon from '../assets/deathknight.png';
import druidIcon from '../assets/druid.png';

// Update your classBackgrounds object
const classBackgrounds = {
  warrior: warriorBg,
  deathknight: deathknightBg,
  druid: druidBg,
};

// Add an icons mapping object
const classIcons = {
  warrior: warriorIcon,
  deathknight: deathknightIcon,
  druid: druidIcon,
};

export const ClassSelection = ({ selectedClass, setSelectedClass }) => (
  <div className="relative mb-12 rounded-lg border-2 border-wow-border group">
    {/* Background remains the same */}
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
            className={`px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              selectedClass === key 
                ? 'bg-gradient-to-b from-wow-gold/20 to-wow-bg border-2 border-wow-gold' 
                : 'bg-black/30 border-2 border-wow-border hover:border-wow-gold'
            }`}
          >
            <img 
              src={classIcons[key]} 
              alt={`${key} icon`} 
              className="w-11 h-11 inline-block mr-2"
            />
            <span className="text-wow-gold">
              {key === 'deathknight' ? 'Death Knight' : key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </button>
        ))}
      </div>
      <ClassDetails class={classes[selectedClass]} classIcon={classIcons[selectedClass]} />
    </div>
  </div>
);

const ClassDetails = ({ class: selectedClass, classIcon }) => (
  <div className="bg-black/20 p-6 rounded-lg border border-wow-border space-y-4">
    <div className="flex items-center gap-4">
      <img 
        src={classIcon} 
        alt={`${selectedClass.title} icon`} 
        className="w-12 h-12"
      />
      <h3 className="text-xl font-bold text-wow-gold">{selectedClass.title}</h3>
    </div>
    <p className="text-wow-tan">{selectedClass.description}</p>
    <div className="mt-4">
      <h4 className="text-wow-gold mb-2">Core Abilities:</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedClass.abilities.map((ability, index) => (
          <div
            key={index}
            className="p-2 bg-black/30 rounded border border-wow-border hover:border-wow-gold transition-colors duration-300 text-wow-gold"
          >
            {ability}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ClassSelection;
