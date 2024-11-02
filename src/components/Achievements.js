import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Achievements = ({ achievements }) => {
  const [achievementsRef, isVisible] = useScrollAnimation(0.1);
  
  return (
    <div 
      ref={achievementsRef}
      id="achievements" 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 scroll-mt-24"
    >
      {achievements.map((achievement, index) => (
        <div
          key={achievement.id}
          className={`bg-black/30 p-6 rounded-lg border-2 border-wow-border transform hover:scale-105 
            transition-all duration-300 hover:border-wow-gold 
            animate-scale stagger-${index + 1} ${isVisible ? 'scale-end' : 'scale-start'}`}
        >
          <div className="flex items-center gap-4">
            <span className={`text-4xl animate-float`}>{achievement.icon}</span>
            <div>
              <h3 className={`text-wow-gold font-bold animate-slide-right stagger-${index + 1} 
                ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}>
                {achievement.title}
              </h3>
              <p className={`text-white text-sm animate-slide-right stagger-${index + 2} 
                ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}>
                {achievement.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Achievements;