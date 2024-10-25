import React from 'react';
import { technicalSkills } from '../constants/skillsData';
import karazhanLibrary from '../assets/karalibrary.jpg';

const WOW_CLASS_COLORS = [
  'text-[#ff7c0a]',   // Druid Orange
  'text-[#c41e3a]',   // DK Red
  'text-[#33937f]',   // Monk Green
  'text-[#f58cba]',   // Paladin Pink
  'text-[#3fc7eb]',   // Mage Blue
  'text-[#aad372]',   // Hunter Green
  'text-[#69ccf0]',   // Shaman Blue
  'text-[#9482c9]',   // Warlock Purple
  'text-[#00ff96]',   // Demon Hunter Green
  'text-[#fff569]',   // Rogue Yellow
  'text-[#f0ebe0]',   // Priest White
];

const getSkillColor = (level) => {
  if (level === 100) return 'from-[#E5CC80] to-[#E5CC80]/80'; // Perfect (Tan)
  if (level >= 99) return 'from-[#E268A8] to-[#E268A8]/80'; // Legendary
  if (level >= 95) return 'from-[#FF8000] to-[#FF8000]/80'; // Mythic
  if (level >= 75) return 'from-[#A335EE] to-[#A335EE]/80'; // Epic
  if (level >= 50) return 'from-[#0070dd] to-[#0070dd]/80'; // Rare
  if (level >= 25) return 'from-[#1eff00] to-[#1eff00]/80'; // Uncommon
  return 'from-[#666666] to-[#666666]/80'; // Common
};

const getTextColor = (level) => {
  if (level === 100) return 'text-[#E5CC80]'; // Perfect (Tan)
  if (level >= 99) return 'text-[#E268A8]'; // Legendary
  if (level >= 95) return 'text-[#FF8000]'; // Mythic
  if (level >= 75) return 'text-[#A335EE]'; // Epic
  if (level >= 50) return 'text-[#0070dd]'; // Rare
  if (level >= 25) return 'text-[#1eff00]'; // Uncommon
  return 'text-[#666666]'; // Common
};

const getRandomColor = () => {
  return WOW_CLASS_COLORS[Math.floor(Math.random() * WOW_CLASS_COLORS.length)];
};

const getOrdinalSuffix = (number) => {
  if (number === 100) return 'th';
  
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th';
  }
  
  switch (lastDigit) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const Skills = () => (
  <section id="skills" className="relative mb-12 rounded-lg border-2 border-wow-border group scroll-mt-24">
    <div 
      className="absolute inset-0 -z-10"
      style={{
        backgroundImage: `url(${karazhanLibrary})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/85 group-hover:bg-black/80 transition-colors duration-300" />
    </div>

    <div className="p-8">
      <h2 className="text-3xl font-bold text-wow-gold mb-6">Skill Tree</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {technicalSkills.map((category, idx) => (
          <div key={idx} className="bg-black/20 p-6 rounded-lg border border-wow-border">
            <h3 className="text-xl font-bold text-wow-gold mb-4">{category.name}</h3>
            <div className="space-y-4">
              {category.skills.map((skill, skillIdx) => (
                <div key={skillIdx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={`${getRandomColor()} font-bold hover:scale-105 transition-transform duration-300`}>
                      {skill.name}
                    </span>
                    <span className={`font-bold ${getTextColor(skill.level)}`}>
                      {skill.level}{getOrdinalSuffix(skill.level)} Percentile
                    </span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r ${getSkillColor(skill.level)} h-2.5 rounded-full transition-all duration-500`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;