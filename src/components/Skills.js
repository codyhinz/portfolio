import React from 'react';
import { PROGRESS_BAR_COLORS, technicalSkills } from '../constants/skillsData';

export const Skills = () => (
  <section className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-wow-border">
    <h2 className="text-3xl font-bold text-wow-gold mb-6">Skill Tree</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {technicalSkills.map((category, idx) => (
        <div key={idx} className="bg-black/20 p-6 rounded-lg border border-wow-border">
          <h3 className="text-xl font-bold text-wow-gold mb-4">{category.name}</h3>
          <div className="space-y-4">
            {category.skills.map((skill, skillIdx) => (
              <div key={skillIdx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-wow-tan">{skill.name}</span>
                  <span className="text-wow-gold">Level {skill.level}</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-2.5">
                  <div 
                    className={`bg-gradient-to-r ${PROGRESS_BAR_COLORS[Math.floor(Math.random() * PROGRESS_BAR_COLORS.length)]} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);