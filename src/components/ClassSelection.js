import React from 'react';
import { classes } from '../constants/classData';

export const ClassSelection = ({ selectedClass, setSelectedClass }) => (
  <div className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-wow-border">
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
          <span className="text-2xl mr-2">{value.icon}</span>
          <span className="text-wow-gold">
            {key === 'deathknight' ? 'Death Knight' : key.charAt(0).toUpperCase() + key.slice(1)}
          </span>
        </button>
      ))}
    </div>
    <ClassDetails class={classes[selectedClass]} />
  </div>
);

const ClassDetails = ({ class: selectedClass }) => (
  <div className="bg-black/20 p-6 rounded-lg border border-wow-border space-y-4">
    <h3 className="text-xl font-bold text-wow-gold">{selectedClass.title}</h3>
    <p className="text-wow-tan">{selectedClass.description}</p>
    <div className="mt-4">
      <h4 className="text-wow-gold mb-2">Core Abilities:</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedClass.abilities.map((ability, index) => (
          <div
            key={index}
            className="p-2 bg-black/30 rounded border border-wow-border hover:border-wow-gold transition-colors duration-300"
          >
            {ability}
          </div>
        ))}
      </div>
    </div>
  </div>
);