import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import pfp from '../assets/pfp.png';

const Portfolio = () => {
  const [selectedClass, setSelectedClass] = useState('warrior');
  const [achievements, setAchievements] = useState([]);
  const [showTooltip, setShowTooltip] = useState('');

  // Animated achievements that appear over time
  useEffect(() => {
    const achievementsList = [
      { id: 1, title: "Veteran Raider", description: "95th percentile raider since age 14", icon: "🏆" },
      { id: 2, title: "Polyglot Developer", description: "Mastered 12+ programming languages", icon: "💻" },
      { id: 3, title: "Academic Excellence", description: "Pursuing graduate studies in CS", icon: "🎓" },
      { id: 4, title: "Full-Stack Champion", description: "Conquered all aspects of software engineering", icon: "⚔️" },
    ];

    const timer = setTimeout(() => {
      setAchievements(achievementsList);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const classes = {
    warrior: {
      title: 'Arms Warrior Developer',
      color: '#C79C6E',
      icon: '⚔️',
      description: 'A battle-hardened veteran who charges headfirst into complex coding challenges, wielding rage and determination to overcome any obstacle.',
      spec: 'Arms specialization focused on executing powerful solutions with precision and tactical mastery.',
      abilities: [
        'Mortal Strike: Critical problem-solving that cuts through complexity',
        'Tactical Mastery: Strategic approach to architecture design',
        'Battle Shout: Team motivation and leadership',
        'Victory Rush: Quick adaptation to new technologies'
      ],
      expertise: ['Frontend Architecture', 'Performance Optimization', 'Team Leadership', 'System Design']
    },
    deathknight: {
      title: 'Death Knight Engineer',
      color: '#C41E3A',
      icon: '❄️',
      description: 'A master of dark arts and powerful systems, bringing order to chaos through unwavering determination and precise execution.',
      spec: 'Frost specialization emphasizing controlled, methodical problem-solving and robust system design.',
      abilities: [
        'Obliterate: Crushing complex problems with powerful solutions',
        'Death Grip: Pulling together disparate system components',
        'Pillar of Frost: Unleashing maximum performance',
        'Runic Power: Managing system resources efficiently'
      ],
      expertise: ['Backend Development', 'Database Architecture', 'System Integration', 'Performance Tuning']
    },
    druid: {
      title: 'Feral Druid Developer',
      color: '#FF7C0A',
      icon: '🐱',
      description: 'An agile and adaptable developer who excels at finding elegant solutions through swift, precise execution and natural intuition.',
      spec: 'Feral Cat specialization with focus on agile development practices and swift problem resolution.',
      abilities: [
        'Rake: Initial problem assessment and planning',
        'Rip: Sustained solution implementation',
        'Savage Roar: Productivity enhancement',
        'Berserk: Rapid development sprints'
      ],
      expertise: ['Agile Methodologies', 'Full-Stack Development', 'Rapid Prototyping', 'Cross-functional Collaboration']
    }
  };

  const technicalSkills = [
    { name: 'Languages & Core Technologies', skills: [
      { name: 'JavaScript/TypeScript', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Java', level: 82 },
      { name: 'C++', level: 78 },
      { name: 'Ruby', level: 75 },
      { name: 'Go', level: 72 },
      { name: 'PHP', level: 80 },
      { name: 'SQL', level: 88 }
    ]},
    { name: 'Web Technologies', skills: [
      { name: 'HTML5/CSS3', level: 92 },
      { name: 'React/Angular', level: 88 },
      { name: 'Node.js', level: 85 },
      { name: 'RESTful APIs', level: 87 }
    ]},
    { name: 'Gaming Achievements', skills: [
      { name: 'Raid Leadership', level: 95 },
      { name: 'DPS Performance', level: 95 },
      { name: 'Mechanical Execution', level: 92 },
      { name: 'Strategic Planning', level: 90 }
    ]},
    { name: 'Additional Skills', skills: [
      { name: 'Japanese Language', level: 75 },
      { name: 'System Architecture', level: 85 },
      { name: 'Team Leadership', level: 88 },
      { name: 'Problem Solving', level: 92 }
    ]}
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-wow-bg via-wow-bg/95 to-wow-bg text-white p-8 relative">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iIzRhM2EyMiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wow-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wow-gold/20 to-transparent" />
      </div>

      {/* Social Links */}
      <div className="fixed top-4 right-4 flex gap-4 z-50">
        <a
          href="https://github.com/codyhinz"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-wow-bg/80 border border-wow-border rounded-lg hover:bg-wow-gold/20 transition-all duration-300 hover:scale-110"
        >
          <Github className="w-6 h-6 text-wow-gold" />
        </a>
        <a
          href="https://linkedin.com/in/cody-hinz"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-wow-bg/80 border border-wow-border rounded-lg hover:bg-wow-gold/20 transition-all duration-300 hover:scale-110"
        >
          <Linkedin className="w-6 h-6 text-wow-gold" />
        </a>
      </div>

      {/* Hero Section */}
      <header className="relative overflow-hidden rounded-lg bg-black/50 p-8 mb-12 border-2 border-wow-border transform hover:scale-[1.01] transition-transform duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wow-gold to-transparent opacity-50" />
        <div className="flex gap-8 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-wow-gold via-wow-tan to-wow-gold rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            <div className="relative w-48 h-68 border-4 border-wow-tan rounded-lg overflow-hidden bg-wow-bg">
              <img src={pfp} alt="Profile" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <h1 className="text-6xl font-bold mb-4 text-wow-gold animate-pulse">
              Cody Hinz
            </h1>
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="px-3 py-1 bg-wow-gold/20 rounded-full border border-wow-gold/50">Level 28</span>
              <span className="px-3 py-1 bg-wow-tan/20 rounded-full border border-wow-tan/50">Lexington, KY</span>
              <span className="px-3 py-1 bg-wow-gold/20 rounded-full border border-wow-gold/50">Full-Stack Developer</span>
              <span className="px-3 py-1 bg-wow-tan/20 rounded-full border border-wow-tan/50">Veteran Raider</span>
            </div>
            <p className="text-wow-tan text-lg italic border-l-4 border-wow-border pl-4">
              "Hardcore WoW raider turned developer, bringing the same dedication and precision from raiding to coding since 2010."
            </p>
          </div>
        </div>
      </header>

      {/* Achievements Section */}
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

      {/* Education Journey */}
  <section className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-wow-border">
    <h2 className="text-3xl font-bold text-wow-gold mb-6">Education Journey</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Master's Program */}
      <div className="bg-black/20 p-6 rounded-lg border border-wow-border relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wow-gold/0 via-wow-gold to-wow-gold/0 group-hover:opacity-100 opacity-50" />
        <div className="flex items-start gap-4">
          <span className="text-4xl">🎓</span>
          <div>
            <h3 className="text-xl font-bold text-wow-gold mb-2">Master of Computer Science</h3>
            <p className="text-wow-tan">Starting Next Semester</p>
            <p className="text-wow-gold/80 text-sm mb-4">Program Acceptance Achieved!</p>
            <div className="space-y-2 text-wow-tan">
              <p className="flex items-center gap-2">
                <span className="text-wow-gold">📍</span>
                Advanced studies in Software Engineering
              </p>
              <p className="flex items-center gap-2">
                <span className="text-wow-gold">🎯</span>
                Focus on cutting-edge technologies
              </p>
              <p className="flex items-center gap-2">
                <span className="text-wow-gold">🌟</span>
                Graduate-level research and development
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bachelor's Degree */}
      <div className="bg-black/20 p-6 rounded-lg border border-wow-border relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wow-gold/0 via-wow-gold to-wow-gold/0 group-hover:opacity-100 opacity-50" />
        <div className="flex items-start gap-4">
          <span className="text-4xl">📚</span>
          <div>
            <h3 className="text-xl font-bold text-wow-gold mb-2">Bachelor of Computer Science</h3>
            <p className="text-wow-tan">Fort Hays State University</p>
            <p className="text-wow-gold/80 text-sm mb-4">Graduating December 2024</p>
            <div className="text-wow-tan space-y-2">
              <p className="flex items-center gap-2">
                <span className="text-wow-gold">⭐</span>
                Strong academic performance
              </p>
              <p className="flex items-center gap-2">
                <span className="text-wow-gold">💻</span>
                Comprehensive CS curriculum
              </p>
              <p className="flex items-center gap-2">
                <span className="text-wow-gold">🔍</span>
                Focus on practical application
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Professional Experience */}
  <section className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-wow-border">
    <h2 className="text-3xl font-bold text-wow-gold mb-6">Professional Experience</h2>
    
    {/* Store Sales Manager */}
    <div className="bg-black/20 p-6 rounded-lg border border-wow-border mb-6 transform hover:scale-[1.01] transition-transform duration-300">
      <div className="flex items-start gap-4">
        <div className="text-4xl bg-wow-gold/10 p-3 rounded-lg">👑</div>
        <div className="flex-1">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <h3 className="text-xl font-bold text-wow-gold">Store Sales Manager</h3>
              <p className="text-wow-tan">Avail Vapor LLC</p>
            </div>
            <div className="text-wow-tan/80 text-sm">
              October 2015 - December 2020
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-wow-gold font-semibold">Leadership</h4>
              <ul className="space-y-2 text-wow-tan">
                <li className="flex items-start gap-2">
                  <span className="text-wow-gold mt-1">•</span>
                  Led a team of 5+ associates, maintaining high performance standards
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wow-gold mt-1">•</span>
                  Implemented comprehensive training programs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wow-gold mt-1">•</span>
                  Mentored new team members to excellence
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-wow-gold font-semibold">Achievements</h4>
              <ul className="space-y-2 text-wow-tan">
                <li className="flex items-start gap-2">
                  <span className="text-wow-gold mt-1">•</span>
                  Increased store revenue by 25% through strategic initiatives
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wow-gold mt-1">•</span>
                  Optimized inventory management systems
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-wow-gold mt-1">•</span>
                  Developed successful customer retention strategies
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 bg-black/20 rounded-lg">
            <h4 className="text-wow-gold font-semibold mb-2">Key Skills Developed</h4>
            <div className="flex flex-wrap gap-2">
              {['Team Leadership', 'Strategic Planning', 'Customer Relations', 'Inventory Management', 'Staff Training', 'Sales Strategy'].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-wow-gold/10 rounded-full border border-wow-gold/20 text-wow-tan text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Achievement Badges */}
  <section className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-wow-border">
    <h2 className="text-3xl font-bold text-wow-gold mb-6">Achievement Badges</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { title: "Master's Bound", description: "Accepted into Master's Program", icon: "🎓" },
        { title: "Tech Polyglot", description: "Mastered Multiple Programming Languages", icon: "💻" },
        { title: "Team Leader", description: "Successful Management Experience", icon: "👥" },
        { title: "Global Explorer", description: "Japanese Language Proficiency", icon: "🌏" }
      ].map((badge) => (
        <div key={badge.title} 
          className="bg-black/20 p-4 rounded-lg border border-wow-border hover:border-wow-gold 
                    transition-all duration-300 transform hover:scale-105 text-center group">
          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
            {badge.icon}
          </div>
          <h3 className="text-wow-gold font-bold mb-1">{badge.title}</h3>
          <p className="text-wow-tan text-sm">{badge.description}</p>
        </div>
      ))}
    </div>
  </section>

      {/* WoW Experience Section */}
      <section className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-wow-border">
        <h2 className="text-3xl font-bold text-wow-gold mb-6">Raiding Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/20 p-6 rounded-lg border border-wow-border">
            <h3 className="text-xl font-bold text-wow-tan mb-4">Raid Achievement Highlights</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-wow-gold">⚔️</span>
                <span>95th percentile DPS rankings since age 14</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-wow-gold">🏆</span>
                <span>Multiple Cutting Edge achievements</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-wow-gold">👥</span>
                <span>Experienced raid leader and strategy coordinator</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-wow-gold">📊</span>
                <span>Expert in raid optimization and performance analysis</span>
              </li>
            </ul>
          </div>
          <div className="bg-black/20 p-6 rounded-lg border border-wow-border">
            <h3 className="text-xl font-bold text-wow-tan mb-4">Main Characters</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-[#C79C6E]">⚔️</span>
                <span>Warrior - Arms/Fury specialist</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C41E3A]">❄️</span>
                <span>Death Knight - Frost mastery</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#FF7C0A]">🐱</span>
                <span>Druid - Feral DPS expert</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Class Selection */}
      <div className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-wow-border">
        <h2 className="text-3xl font-bold text-wow-gold mb-6">Development Specializations</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.entries(classes).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedClass(key)}
              onMouseEnter={() => setShowTooltip(key)}
              onMouseLeave={() => setShowTooltip('')}
              className={`relative px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                selectedClass === key 
                  ? 'bg-gradient-to-b from-wow-gold/20 to-wow-bg border-2 border-wow-gold' 
                  : 'bg-black/30 border-2 border-wow-border hover:border-wow-gold'
              }`}
            >
              <span className="text-2xl mr-2">{value.icon}</span>
              <span className="text-wow-gold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              
              {showTooltip === key && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-black/90 border border-wow-border rounded text-sm text-wow-tan">
                  {value.spec}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-black/20 p-6 rounded-lg border border-wow-border space-y-4">
          <h3 className="text-xl font-bold text-wow-gold">{classes[selectedClass].title}</h3>
          <p className="text-wow-tan">{classes[selectedClass].description}</p>
          <div className="mt-4">
            <h4 className="text-wow-gold mb-2">Core Abilities:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classes[selectedClass].abilities.map((ability, index) => (
                <div
                  key={index}
                  className="p-2 bg-black/30 rounded border border-wow-border hover:border-wow-gold transition-colors duration-300"
                >
                  {ability}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Skills Grid */}
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
                        className="bg-gradient-to-r from-wow-gold/50 to-wow-gold h-2.5 rounded-full transition-all duration-500"
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

      {/* Japanese Language Section */}
      <section className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-wow-border">
        <h2 className="text-3xl font-bold text-wow-gold mb-6">Language Proficiency</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/20 p-6 rounded-lg border border-wow-border">
            <h3 className="text-xl font-bold text-wow-tan mb-4">Japanese Language Skills</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-wow-tan">
                <span className="text-2xl">🗣️</span>
                <span>Semi-fluent in conversational Japanese</span>
              </div>
              <div className="flex items-center gap-4 text-wow-tan">
                <span className="text-2xl">📚</span>
                <span>Continuing studies and practice</span>
              </div>
              <div className="flex items-center gap-4 text-wow-tan">
                <span className="text-2xl">🎮</span>
                <span>Experience with Japanese gaming communities</span>
              </div>
            </div>
          </div>
          <div className="bg-black/20 p-6 rounded-lg border border-wow-border">
            <h3 className="text-xl font-bold text-wow-tan mb-4">Language Applications</h3>
            <ul className="space-y-3 text-wow-tan">
              <li className="flex items-center gap-2">
                <span className="text-wow-gold">🌏</span>
                <span>Cross-cultural software development</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-wow-gold">🤝</span>
                <span>International team collaboration</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-wow-gold">🎯</span>
                <span>Localization and internationalization expertise</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gaming Philosophy Section */}
      <section className="mb-12 bg-black/30 rounded-lg p-8 border-2 border-wow-border">
        <h2 className="text-3xl font-bold text-wow-gold mb-6">Gaming Philosophy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/20 p-6 rounded-lg border border-wow-border hover:border-wow-gold transition-colors duration-300">
            <h3 className="text-xl font-bold text-wow-tan mb-4">Progression Mindset</h3>
            <p className="text-wow-tan">
              "The same dedication that drives me to achieve 95th percentile parses fuels my pursuit of excellence in software development. Every challenge is an opportunity to optimize and improve."
            </p>
          </div>
          <div className="bg-black/20 p-6 rounded-lg border border-wow-border hover:border-wow-gold transition-colors duration-300">
            <h3 className="text-xl font-bold text-wow-tan mb-4">Team Synergy</h3>
            <p className="text-wow-tan">
              "Raiding has taught me the value of precise coordination and clear communication. These skills translate directly to successful software development teams."
            </p>
          </div>
          <div className="bg-black/20 p-6 rounded-lg border border-wow-border hover:border-wow-gold transition-colors duration-300">
            <h3 className="text-xl font-bold text-wow-tan mb-4">Adaptability</h3>
            <p className="text-wow-tan">
              "From learning new raid mechanics to mastering different programming languages, adaptability and quick learning have been key to my success in both gaming and development."
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-black/30 rounded-lg p-8 border-2 border-wow-border">
        <h2 className="text-3xl font-bold text-wow-gold mb-6">Contact Details</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <a
            href="mailto:codyhinz@gmail.com"
            className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-b from-wow-gold/20 to-transparent border border-wow-border hover:border-wow-gold transition-all duration-300 group"
          >
            <Mail className="w-5 h-5 text-wow-gold group-hover:scale-110 transition-transform duration-300" />
            <span className="text-wow-tan">codyhinz@gmail.com</span>
          </a>
          <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-b from-wow-gold/20 to-transparent border border-wow-border">
            <MapPin className="w-5 h-5 text-wow-gold" />
            <span className="text-wow-tan">Lexington, KY 40517</span>
          </div>
          <a
            href="tel:859-396-5590"
            className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-b from-wow-gold/20 to-transparent border border-wow-border hover:border-wow-gold transition-all duration-300 group"
          >
            <Phone className="w-5 h-5 text-wow-gold group-hover:scale-110 transition-transform duration-300" />
            <span className="text-wow-tan">859-396-5590</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;