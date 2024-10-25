import React from 'react';

export const Education = () => (
  <section className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-wow-border">
    <h2 className="text-3xl font-bold text-wow-gold mb-6">Education Journey</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Master's Program */}
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
      />
      
      {/* Bachelor's Degree */}
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
      />
    </div>
  </section>
);

const EducationCard = ({ icon, title, status, subtitle, points }) => (
  <div className="bg-black/20 p-6 rounded-lg border border-wow-border relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wow-gold/0 via-wow-gold to-wow-gold/0 group-hover:opacity-100 opacity-50" />
    <div className="flex items-start gap-4">
      <span className="text-4xl">{icon}</span>
      <div>
        <h3 className="text-xl font-bold text-wow-gold mb-2">{title}</h3>
        <p className="text-wow-tan">{status}</p>
        <p className="text-wow-gold/80 text-sm mb-4">{subtitle}</p>
        <div className="space-y-2 text-wow-tan">
          {points.map((point, index) => (
            <p key={index} className="flex items-center gap-2">
              <span className="text-wow-gold">{index === 0 ? '📍' : index === 1 ? '🎯' : '🌟'}</span>
              {point}
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
);