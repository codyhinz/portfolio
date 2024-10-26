// Experience.js
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { workExperience } from '../constants/experienceData';
import experienceBg from '../assets/stormwindwarroom.png';

export const Experience = () => {
  const [experienceRef, isVisible] = useScrollAnimation(0.1);

  return (
    <section ref={experienceRef} className="relative mb-12 rounded-lg border-2 border-wow-border group scroll-mt-24">
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${experienceBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/85 group-hover:bg-black/80 transition-colors duration-300" />
      </div>

      <div className="p-8">
        <h2 className={`text-3xl font-bold text-wow-gold mb-6 animate-slide-right ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}>
          Work Experience
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {workExperience.map((job, index) => (
            <div 
              key={job.id}
              className={`bg-black/20 p-6 rounded-lg border border-wow-border relative overflow-hidden group/job
                 animate-scale stagger-${index + 1} ${isVisible ? 'scale-end' : 'scale-start'}`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wow-gold/0 via-wow-gold to-wow-gold/0 group-hover/job:opacity-100 opacity-50" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-wow-gold">{job.title}</h3>
                    <p className="text-white">{job.company}</p>
                  </div>
                  <span className="text-wow-gold/80">{job.period}</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-wow-gold font-semibold">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, idx) => (
                      <li 
                        key={idx} 
                        className={`flex items-start gap-2 text-white
                          animate-slide-right stagger-${idx + 1} ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}
                      >
                        <span className="text-wow-gold mt-1">⚔️</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-wow-gold font-semibold mb-2">Skills Developed:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className={`px-3 py-1 bg-wow-gold/20 rounded-full border border-wow-gold/50 text-white text-sm
                          animate-scale stagger-${idx + 1} ${isVisible ? 'scale-end' : 'scale-start'}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;