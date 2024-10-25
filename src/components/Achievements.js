import React from 'react';

export const Achievements = ({ achievements }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
    {achievements.map((achievement) => (
      <div
        key={achievement.id}
        className="bg-black/30 p-6 rounded-lg border-2 border-wow-border transform hover:scale-105 transition-all duration-300 hover:border-wow-gold animate-fade-in"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">{achievement.icon}</span>
          <div>
            <h3 className="text-wow-gold font-bold">{achievement.title}</h3>
            <p className="text-wow-tan text-sm">{achievement.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);
