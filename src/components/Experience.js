import React from 'react';
import { workExperience } from '../constants/experienceData';

export const Experience = () => (
  <section className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-wow-border">
    <h2 className="text-3xl font-bold text-wow-gold mb-6">Work Experience</h2>
    <div className="grid grid-cols-1 gap-6">
      {workExperience.map((job) => (
        <div 
          key={job.id}
          className="bg-black/20 p-6 rounded-lg border border-wow-border relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wow-gold/0 via-wow-gold to-wow-gold/0 group-hover:opacity-100 opacity-50" />
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-wow-gold">{job.title}</h3>
                <p className="text-wow-tan">{job.company}</p>
              </div>
              <span className="text-wow-gold/80">{job.period}</span>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-wow-gold font-semibold">Key Achievements:</h4>
              <ul className="space-y-2">
                {job.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2 text-wow-tan">
                    <span className="text-wow-gold">⚔️</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-wow-gold font-semibold mb-2">Skills Developed:</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-wow-gold/20 rounded-full border border-wow-gold/50 text-wow-tan text-sm"
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
  </section>
);
