// Education.js
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import educationBg from '../assets/karalibrary.jpg';

export const Education = () => {
  const [educationRef, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="education" ref={educationRef} className={`relative mb-12 rounded-lg border-2 border-wow-border group scroll-mt-24 
      animate-fade ${isVisible ? 'fade-end' : 'fade-start'}`}>
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${educationBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/80 group-hover:from-black/85 group-hover:to-black/75 transition-colors duration-300" />
      </div>

      <div className="p-8">
        <h2 className={`text-3xl font-bold text-wow-gold mb-6 animate-slide-right ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}>
          Education Journey
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EducationCard
            icon="🎓"
            title="Master of Computer Science"
            status="Starting Next Semester"
            subtitle="Program Acceptance Achieved!"
            points={[
              'Advanced studies in Software Engineering',
              'Focus on cutting-edge technologies',
              'Graduate-level research and development'
            ]}
            isVisible={isVisible}
            delay={1}
          />
          
          <EducationCard
            icon="📚"
            title="Bachelor of Computer Science"
            status="Fort Hays State University"
            subtitle="Graduating December 2024"
            points={[
              'Strong academic performance',
              'Comprehensive CS curriculum',
              'Focus on practical application'
            ]}
            isVisible={isVisible}
            delay={2}
          />
        </div>
      </div>
    </section>
  );
};

const EducationCard = ({ icon, title, status, subtitle, points, isVisible, delay }) => (
  <div className={`bg-black/20 p-6 rounded-lg border border-wow-border relative overflow-hidden group/card
     animate-scale stagger-${delay} ${isVisible ? 'scale-end' : 'scale-start'}`}>
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wow-gold/0 via-wow-gold to-wow-gold/0 group-hover/card:opacity-100 opacity-50" />
    <div className="flex items-start gap-4">
      <span className="text-4xl animate-float">{icon}</span>
      <div>
        <h3 className="text-xl font-bold text-wow-gold mb-2">{title}</h3>
        <p className="text-white">{status}</p>
        <p className="text-wow-gold/80 text-sm mb-4">{subtitle}</p>
        <div className="space-y-2 text-white">
          {points.map((point, index) => (
            <p 
              key={index} 
              className={`flex items-center gap-2 animate-slide-right stagger-${index + 1} 
                ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}
            >
              <span className="text-wow-gold">{index === 0 ? '📍' : index === 1 ? '🎯' : '🌟'}</span>
              {point}
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Education;