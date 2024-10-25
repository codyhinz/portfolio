import React, { useState, useEffect } from 'react';
import { SocialLinks } from './SocialLinks';
import { Achievements } from './Achievements';
import { ClassSelection } from './ClassSelection';
import { Contact } from './Contact';
import { Education } from './Education';
import { Experience } from './Experience';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { ParsePerformance } from './ParsePerformance';
import { Skills } from './Skills';

import backgroundImage from '../assets/bt.png';

const Portfolio = () => {
  const [selectedClass, setSelectedClass] = useState('warrior');
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const achievementsList = [
      { id: 1, title: "Veteran Raider", description: "95th percentile raider since age 14", icon: "🏆" },
      { id: 2, title: "Polyglot Developer", description: "Mastered 12+ programming languages", icon: "💻" },
      { id: 3, title: "Academic Excellence", description: "Pursuing graduate studies in CS", icon: "🎓" },
      { id: 4, title: "Full-Stack Champion", description: "Conquered all aspects of software engineering", icon: "⚔️" },
    ];

    setAchievements(achievementsList);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background Image Container */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-wow-bg/95 via-wow-bg/98 to-wow-bg opacity-95" />
      </div>

      <Navigation />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen px-4 sm:px-6 md:px-8 pt-16 sm:pt-20">
        <SocialLinks />
        <Header />
        <Achievements achievements={achievements} />
        <Education />
        <Experience />
        <ClassSelection 
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
        <Skills />
        <ParsePerformance />
        <Contact />
      </div>
    </div>
  );
};

export default Portfolio;