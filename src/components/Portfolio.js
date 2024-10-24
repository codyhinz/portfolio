import React, { useState, useEffect } from 'react';
import pfp from '../assets/pfp.png';

const Portfolio = () => {
  const [selectedClass, setSelectedClass] = useState('mage');
  const [isGlowing, setIsGlowing] = useState(false);

  // Glow effect for achievements
  useEffect(() => {
    const glowInterval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 2000);
    return () => clearInterval(glowInterval);
  }, []);

  const classes = {
    mage: {
      title: 'Archmage Developer',
      color: '#69CCF0',
      icon: '🔮',
      description: 'A master of the arcane arts of Full-Stack Development, wielding both front-end and back-end magics with precision.',
      spec: 'Frost specialization with a focus on clean, efficient code that scales like ice.'
    },
    warlock: {
      title: 'Code Warlock',
      color: '#9482C9',
      icon: '🌟',
      description: 'Binding complex systems to my will through powerful database management and system architecture.',
      spec: 'Affliction spec focused on long-running processes and database optimization.'
    },
    paladin: {
      title: 'Code Crusader',
      color: '#F58CBA',
      icon: '⚔️',
      description: 'Defending clean code principles and best practices while leading teams to victory.',
      spec: 'Protection specialized in guarding against security vulnerabilities and technical debt.'
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      {/* Hero Section */}
      <header className="relative overflow-hidden rounded-lg bg-black/50 p-8 mb-12 border-2 border-[#4a3a22]">
        <div className="flex gap-8 items-center">
          {/* LinkedIn Photo Space */}
          <div className="w-48 h-70 border-4 border-[#c79c6e] rounded-lg overflow-hidden bg-[#2a2a2a] flex items-center justify-center">
          <img src={pfp} alt="Profile Picture" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1">
            <h1 className="text-6xl font-bold mb-4 font-warcraft text-[#ffd100]">
              Cody Hinz
            </h1>
            <div className="flex gap-4 mb-4">
              <span className="px-3 py-1 bg-[#2b4a22] rounded">Level 28</span>
              <span className="px-3 py-1 bg-[#4a3a22] rounded">Lexington, KY</span>
              <span className="px-3 py-1 bg-[#592d2d] rounded">Full-Stack Developer</span>
            </div>
            <p className="text-[#c79c6e] text-lg">
              "In the vast realm of technology, I forge solutions with the determination of a true champion."
            </p>
          </div>
        </div>
      </header>

      {/* Class Selection */}
      <div className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-[#4a3a22]">
        <h2 className="text-3xl font-warcraft text-[#ffd100] mb-6">Character Class</h2>
        <div className="flex justify-center gap-4 mb-8">
          {Object.entries(classes).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedClass(key)}
              className={`px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                selectedClass === key 
                  ? 'bg-gradient-to-b from-[#4a3a22] to-[#2b2416] border-2 border-[#c79c6e]' 
                  : 'bg-black/30 border-2 border-[#4a3a22] hover:border-[#c79c6e]'
              }`}
            >
              <span className="text-2xl mr-2">{value.icon}</span>
              <span className="text-[#ffd100]">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            </button>
          ))}
        </div>
        <div className="bg-black/20 p-6 rounded-lg border border-[#4a3a22]">
          <h3 className="text-xl font-bold mb-2 text-[#c79c6e]">{classes[selectedClass].title}</h3>
          <p className="text-gray-300 mb-4">{classes[selectedClass].description}</p>
          <p className="text-[#69CCF0]">{classes[selectedClass].spec}</p>
        </div>
      </div>

      {/* Quest Log */}
      <section className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-[#4a3a22]">
        <h2 className="text-3xl font-warcraft text-[#ffd100] mb-6">Current Quests</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className={`p-6 rounded-lg border-2 transition-all duration-500 ${
            isGlowing ? 'border-[#ffd100] shadow-lg shadow-[#ffd100]/20' : 'border-[#4a3a22]'
          }`}>
            <div className="flex items-start gap-4">
              <span className="text-3xl">📜</span>
              <div>
                <h3 className="text-xl font-bold text-[#ffd100] mb-2">
                  Epic Quest: Bachelor of Computer Science
                </h3>
                <p className="text-[#c79c6e]">Fort Hays State University</p>
                <p className="text-green-400">Progress: 90% Complete (Dec 2024)</p>
                <ul className="mt-4 space-y-2 text-gray-300">
                  <li>• Mastered fundamental programming principles</li>
                  <li>• Conquered advanced algorithms and data structures</li>
                  <li>• Developed expertise in software engineering practices</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-lg border-2 transition-all duration-500 ${
            isGlowing ? 'border-[#c79c6e] shadow-lg shadow-[#c79c6e]/20' : 'border-[#4a3a22]'
          }`}>
            <div className="flex items-start gap-4">
              <span className="text-3xl">🎯</span>
              <div>
                <h3 className="text-xl font-bold text-[#c79c6e] mb-2">
                  Legendary Quest: Master's Degree
                </h3>
                <p className="text-[#c79c6e]">Next Adventure</p>
                <p className="text-yellow-400">Status: Preparing for Journey</p>
                <ul className="mt-4 space-y-2 text-gray-300">
                  <li>• Advanced specialization in Software Engineering</li>
                  <li>• Research in cutting-edge technologies</li>
                  <li>• Leadership in technical project management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-[#4a3a22]">
        <h2 className="text-3xl font-warcraft text-[#ffd100] mb-6">Battle History</h2>
        <div className="bg-black/20 p-6 rounded-lg border border-[#4a3a22] mb-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl">⚔️</span>
            <div>
              <h3 className="text-xl font-bold text-[#c79c6e] mb-2">Store Sales Manager - Avail Vapor LLC</h3>
              <p className="text-[#69CCF0]">Territory: Lexington, Kentucky</p>
              <p className="text-gray-400 mb-4">October 2015 - December 2020</p>
              <ul className="space-y-3 text-gray-300">
                <li>• Led a team of 5+ associates, maintaining high performance standards</li>
                <li>• Increased store revenue by 25% through strategic sales initiatives</li>
                <li>• Implemented new training programs for team development</li>
                <li>• Managed inventory and supply chain operations</li>
                <li>• Developed customer retention strategies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-[#4a3a22]">
        <h2 className="text-3xl font-warcraft text-[#ffd100] mb-6">Combat Skills</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#c79c6e] mb-4">Technical Abilities</h3>
            <div className="space-y-3">
              {[
                { name: 'Full-Stack Development', level: 85 },
                { name: 'Database Management', level: 80 },
                { name: 'Problem Solving', level: 90 },
                { name: 'API Development', level: 82 }
              ].map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#c79c6e]">{skill.name}</span>
                    <span className="text-[#ffd100]">Level {skill.level}</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-[#4a3a22] to-[#c79c6e] h-2.5 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#c79c6e] mb-4">Secondary Skills</h3>
            <div className="space-y-3">
              {[
                { name: 'Team Leadership', level: 88 },
                { name: 'Project Management', level: 75 },
                { name: 'Japanese Language', level: 65 },
                { name: 'Customer Relations', level: 92 }
              ].map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#c79c6e]">{skill.name}</span>
                    <span className="text-[#ffd100]">Level {skill.level}</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-[#4a3a22] to-[#c79c6e] h-2.5 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-black/30 rounded-lg p-8 border-2 border-[#4a3a22]">
        <h2 className="text-3xl font-warcraft text-[#ffd100] mb-6">Contact Details</h2>
        <div className="grid gap-6 md:grid-cols-3 text-center">
          <div className="p-4 rounded-lg bg-gradient-to-b from-[#4a3a22]/20 to-transparent border border-[#4a3a22]">
            <p className="text-lg text-[#c79c6e]">📬 codyhinz@gmail.com</p>
          </div>
          <div className="p-4 rounded-lg bg-gradient-to-b from-[#4a3a22]/20 to-transparent border border-[#4a3a22]">
            <p className="text-lg text-[#c79c6e]">📍 Lexington, KY 40517</p>
          </div>
          <div className="p-4 rounded-lg bg-gradient-to-b from-[#4a3a22]/20 to-transparent border border-[#4a3a22]">
            <p className="text-lg text-[#c79c6e]">📱 859-396-5590</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;