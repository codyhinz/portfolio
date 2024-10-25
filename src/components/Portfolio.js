import React, { useState, useEffect } from 'react';
import { SocialLinks } from './SocialLinks';
import { Achievements } from './Achievements';
import { ClassSelection } from './ClassSelection';
import { Contact } from './Contact';
import { Education } from './Education';
import { Experience } from './Experience';
import { Header } from './Header';
import { ParsePerformance } from './ParsePerformance';
import { Skills } from './Skills';



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
    <div className="min-h-screen bg-gradient-to-b from-wow-bg via-wow-bg/95 to-wow-bg text-white p-8 relative">
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
  );
};

export default Portfolio;