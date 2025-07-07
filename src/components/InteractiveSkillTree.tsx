import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import specific icons from react-icons
import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaVuejs, FaAngular, FaNodeJs, FaPython, FaJava, FaDocker, FaAws, FaGitAlt
} from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiNextdotjs, SiExpress, SiDjango, SiSpring, SiPostgresql, SiMongodb, SiJenkins, SiGooglecloud
} from 'react-icons/si';
import { VscAzure } from "react-icons/vsc";

import { VscTerminal } from 'react-icons/vsc';

// --- TYPE DEFINITIONS ---
interface Skill {
  id: string;
  name: string;
  level: number; // Proficiency level from 1 to 5
  description: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Cloud' | 'Core';
  prerequisites: string[];
  icon: string; // Key for the iconMap
  position: { x: number; y: number };
}

interface SkillNodeProps {
  skill: Skill;
  isUnlocked: boolean;
  canBeUnlocked: boolean;
  onClick: (skill: Skill) => void;
  onHover: (skill: Skill | null) => void;
}

interface SkillDetailPanelProps {
  skill: Skill | null;
  onClose: () => void;
  isUnlocked: boolean;
  canBeUnlocked: boolean;
  onUnlock: (skill: Skill) => void;
  skillMap: Map<string, Skill>; // Pass skillMap to resolve prerequisite names
}

// --- ICON MAPPING ---
// Map string keys to actual icon components for easy rendering
const iconMap: { [key: string]: React.ElementType } = {
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJsSquare,
  TypeScript: SiTypescript,
  React: FaReact,
  NextJS: SiNextdotjs,
  TailwindCSS: SiTailwindcss,
  Vue: FaVuejs,
  Angular: FaAngular,
  NodeJS: FaNodeJs,
  Express: SiExpress,
  Python: FaPython,
  Django: SiDjango,
  Java: FaJava,
  Spring: SiSpring,
  SQL: SiPostgresql,
  MongoDB: SiMongodb,
  Docker: FaDocker,
  CI_CD: SiJenkins,
  AWS: FaAws,
  GCP: SiGooglecloud,
  Azure: VscAzure,
  Git: FaGitAlt,
  CLI: VscTerminal,
};

// --- SKILLS DATA ---
const skillsData: Skill[] = [
  // Core & Foundational
  { id: 'git', name: 'Git', level: 5, description: 'Distributed version control system for tracking changes and collaborating on projects.', category: 'Core', prerequisites: [], icon: 'Git', position: { x: 50, y: 450 } },
  { id: 'cli', name: 'CLI', level: 4, description: 'Command-Line Interface proficiency for development, server management, and tooling.', category: 'Core', prerequisites: [], icon: 'CLI', position: { x: 170, y: 450 } },

  // Frontend
  { id: 'html', name: 'HTML', level: 5, description: 'Semantic markup for building accessible and structured web content.', category: 'Frontend', prerequisites: ['git'], icon: 'HTML', position: { x: 50, y: 50 } },
  { id: 'css', name: 'CSS', level: 5, description: 'Styling web pages with modern techniques like Flexbox, Grid, and animations.', category: 'Frontend', prerequisites: ['html'], icon: 'CSS', position: { x: 50, y: 150 } },
  { id: 'javascript', name: 'JavaScript', level: 5, description: 'Core programming language of the web, including ES6+ features and asynchronous patterns.', category: 'Frontend', prerequisites: ['html'], icon: 'JavaScript', position: { x: 170, y: 50 } },
  { id: 'typescript', name: 'TypeScript', level: 4, description: 'Statically typed superset of JavaScript that enhances code quality and maintainability.', category: 'Frontend', prerequisites: ['javascript'], icon: 'TypeScript', position: { x: 170, y: 150 } },
  { id: 'tailwind', name: 'Tailwind CSS', level: 4, description: 'A utility-first CSS framework for rapid UI development.', category: 'Frontend', prerequisites: ['css'], icon: 'TailwindCSS', position: { x: 50, y: 250 } },
  { id: 'react', name: 'React', level: 5, description: 'A declarative library for building user interfaces with a component-based architecture.', category: 'Frontend', prerequisites: ['javascript'], icon: 'React', position: { x: 290, y: 50 } },
  { id: 'nextjs', name: 'Next.js', level: 4, description: 'The React framework for production, offering server-side rendering, static site generation, and more.', category: 'Frontend', prerequisites: ['react'], icon: 'NextJS', position: { x: 290, y: 150 } },
  { id: 'vue', name: 'Vue.js', level: 3, description: 'A progressive framework for building user interfaces, known for its approachability.', category: 'Frontend', prerequisites: ['javascript'], icon: 'Vue', position: { x: 290, y: 250 } },


  // Backend
  { id: 'nodejs', name: 'Node.js', level: 4, description: 'JavaScript runtime for building scalable server-side applications.', category: 'Backend', prerequisites: ['javascript', 'cli'], icon: 'NodeJS', position: { x: 450, y: 50 } },
  { id: 'express', name: 'Express.js', level: 4, description: 'Minimalist web framework for Node.js, used for building APIs and web applications.', category: 'Backend', prerequisites: ['nodejs'], icon: 'Express', position: { x: 450, y: 150 } },
  { id: 'python', name: 'Python', level: 3, description: 'Versatile language popular in web development, data science, and automation.', category: 'Backend', prerequisites: ['cli'], icon: 'Python', position: { x: 450, y: 250 } },
  { id: 'django', name: 'Django', level: 3, description: 'High-level Python web framework that encourages rapid development and clean design.', category: 'Backend', prerequisites: ['python'], icon: 'Django', position: { x: 450, y: 350 } },
  { id: 'java', name: 'Java', level: 3, description: 'Object-oriented programming language, widely used for enterprise-level applications.', category: 'Backend', prerequisites: ['cli'], icon: 'Java', position: { x: 570, y: 50 } },
  { id: 'spring', name: 'Spring Boot', level: 3, description: 'Framework for building production-ready, stand-alone Spring applications.', category: 'Backend', prerequisites: ['java'], icon: 'Spring', position: { x: 570, y: 150 } },


  // Database
  { id: 'sql', name: 'SQL', level: 4, description: 'Standard language for managing and querying relational databases like PostgreSQL and MySQL.', category: 'Database', prerequisites: ['nodejs'], icon: 'SQL', position: { x: 750, y: 50 } },
  { id: 'mongodb', name: 'MongoDB', level: 3, description: 'A popular NoSQL database for storing data in flexible, JSON-like documents.', category: 'Database', prerequisites: ['nodejs'], icon: 'MongoDB', position: { x: 750, y: 150 } },

  // DevOps & Cloud
  { id: 'docker', name: 'Docker', level: 4, description: 'Platform for developing, shipping, and running applications in containers.', category: 'DevOps', prerequisites: ['cli'], icon: 'Docker', position: { x: 900, y: 50 } },
  { id: 'ci_cd', name: 'CI/CD', level: 4, description: 'Practices of Continuous Integration and Delivery using tools like Jenkins or GitHub Actions.', category: 'DevOps', prerequisites: ['git', 'docker'], icon: 'CI_CD', position: { x: 900, y: 150 } },
  { id: 'aws', name: 'AWS', level: 3, description: 'Amazon Web Services, a comprehensive cloud platform offering a wide range of services.', category: 'Cloud', prerequisites: ['docker'], icon: 'AWS', position: { x: 1050, y: 50 } },
  { id: 'gcp', name: 'GCP', level: 2, description: 'Google Cloud Platform, offering scalable infrastructure and development services.', category: 'Cloud', prerequisites: ['docker'], icon: 'GCP', position: { x: 1050, y: 150 } },
  { id: 'azure', name: 'Azure', level: 2, description: 'Microsoft Azure, a cloud computing service for building, testing, deploying, and managing applications.', category: 'Cloud', prerequisites: ['docker'], icon: 'Azure', position: { x: 1050, y: 250 } },
];


// --- COMPONENT: SkillNode ---
const SkillNode: React.FC<SkillNodeProps> = ({ skill, isUnlocked, canBeUnlocked, onClick, onHover }) => {
  const IconComponent = iconMap[skill.icon] || FaReact;

  const categoryStyles = {
    Frontend: { color: '#3b82f6', ring: 'ring-blue-500', text: 'text-blue-500' },
    Backend: { color: '#22c55e', ring: 'ring-green-500', text: 'text-green-500' },
    Database: { color: '#a855f7', ring: 'ring-purple-500', text: 'text-purple-500' },
    DevOps: { color: '#f97316', ring: 'ring-orange-500', text: 'text-orange-500' },
    Cloud: { color: '#f59e0b', ring: 'ring-amber-500', text: 'text-amber-500' },
    Core: { color: '#64748b', ring: 'ring-slate-500', text: 'text-slate-500' },
  };

  const style = categoryStyles[skill.category];
  const progress = (skill.level / 5) * 100;
  const circumference = 2 * Math.PI * 28; // 2 * pi * radius (radius is 28)
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{ left: skill.position.x, top: skill.position.y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
      whileHover={{ scale: 1.1, zIndex: 10, boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(skill)}
    >
      <div
        className={`relative w-20 h-20 flex items-center justify-center transition-all duration-300 rounded-full
                    ${isUnlocked
                      ? 'bg-white shadow-lg'
                      : canBeUnlocked
                        ? 'bg-yellow-50 shadow-md animate-pulse-slow' // A custom slower pulse
                        : 'bg-slate-200'
                    }
                    ${isUnlocked || canBeUnlocked ? style.ring : 'ring-1 ring-slate-300'} ring-2`}
      >
        {/* Progress Ring */}
        <svg className="absolute w-full h-full" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="28" fill="none" strokeWidth="4" className="stroke-slate-200" />
          <motion.circle
            cx="30" cy="30" r="28" fill="none" strokeWidth="4"
            className="transform -rotate-90 origin-center"
            stroke={isUnlocked ? style.color : '#cbd5e1'} // Grey out progress if not unlocked
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: isUnlocked ? strokeDashoffset : circumference }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </svg>

        {/* Icon */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
                        ${isUnlocked ? 'bg-white' : canBeUnlocked ? 'bg-yellow-50' : 'bg-slate-200'}`}>
           <IconComponent
              className="w-9 h-9 transition-colors duration-300"
              style={{ color: isUnlocked ? style.color : '#94a3b8' }}
           />
        </div>
      </div>
      {/* Skill Name appears on hover */}
      <motion.p
        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-center text-sm font-semibold whitespace-nowrap
                   transition-colors duration-300 ${isUnlocked ? style.text : 'text-slate-500'} opacity-0 group-hover:opacity-100`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }} // Default to hidden
        whileHover={{ opacity: 1 }} // Show on hover
        transition={{ duration: 0.2 }}
      >
        {skill.name}
      </motion.p>
    </motion.div>
  );
};


// --- COMPONENT: ConnectionLine ---
const ConnectionLine: React.FC<{ from: Skill, to: Skill, isUnlocked: boolean }> = ({ from, to, isUnlocked }) => {
  const categoryStyles = {
    Frontend: 'stroke-blue-400',
    Backend: 'stroke-green-400',
    Database: 'stroke-purple-400',
    DevOps: 'stroke-orange-400',
    Cloud: 'stroke-amber-400',
    Core: 'stroke-slate-400',
  };
  // Line color is determined by the 'to' skill's category if unlocked, otherwise a subtle gray
  const strokeColor = isUnlocked ? categoryStyles[to.category] : 'stroke-slate-300';

  return (
    <motion.line
      x1={from.position.x + 40} y1={from.position.y + 40}
      x2={to.position.x + 40} y2={to.position.y + 40}
      className={`${strokeColor}`}
      strokeWidth={2.5}
      markerEnd="url(#arrow)" // Add arrow marker
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isUnlocked ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
    />
  );
};

// --- COMPONENT: SkillDetailPanel ---
const SkillDetailPanel: React.FC<SkillDetailPanelProps> = ({ skill, onClose, isUnlocked, canBeUnlocked, onUnlock, skillMap }) => {
  if (!skill) return null;

  const IconComponent = iconMap[skill.icon] || FaReact;
  const categoryStyles = {
    Frontend: { text: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-500', barBg: 'bg-blue-500' },
    Backend: { text: 'text-green-600', bg: 'bg-green-100', border: 'border-green-500', barBg: 'bg-green-500' },
    Database: { text: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-500', barBg: 'bg-purple-500' },
    DevOps: { text: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-500', barBg: 'bg-orange-500' },
    Cloud: { text: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-500', barBg: 'bg-amber-500' },
    Core: { text: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-500', barBg: 'bg-slate-500' },
  };
  const style = categoryStyles[skill.category];

  const missingPrerequisites = skill.prerequisites.filter(prereqId => !isUnlocked && !skillMap.get(prereqId)?.isUnlocked); // Check if prerequisite skill is not unlocked

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur flex items-center justify-center p-4 z-50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`rounded-2xl p-6 max-w-sm w-full bg-white shadow-2xl border-t-4 ${style.border}`}
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.9 }}
          transition={{ ease: 'circOut', duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <IconComponent className={`w-10 h-10 ${style.text}`} />
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{skill.name}</h2>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${style.bg} ${style.text}`}>
                  {skill.category}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">×</button>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1 text-slate-600">
              <span>Proficiency Level</span>
              <span className="font-semibold">{skill.level}/5</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div className={`h-2.5 rounded-full ${style.barBg}`} style={{ width: `${skill.level * 20}%` }}/>
            </div>
          </div>

          <p className="text-slate-700 leading-relaxed mb-6 text-sm">{skill.description}</p>

          {!isUnlocked && (
            <>
              {skill.prerequisites.length > 0 && !canBeUnlocked && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  <p className="font-semibold mb-1">Missing Prerequisites:</p>
                  <ul className="list-disc list-inside">
                    {skill.prerequisites.map(prereqId => (
                      <li key={prereqId} className={`${skillMap.get(prereqId)?.isUnlocked ? 'line-through text-slate-500' : ''}`}>
                        {skillMap.get(prereqId)?.name || prereqId}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => onUnlock(skill)}
                disabled={!canBeUnlocked}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300
                           ${canBeUnlocked
                              ? 'bg-green-600 hover:bg-green-700 active:scale-98 shadow-md'
                              : 'bg-slate-400 cursor-not-allowed'
                           }`}
              >
                {canBeUnlocked ? 'Unlock Skill' : 'Prerequisites not met'}
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- MAIN COMPONENT: SkillTree ---
const SkillTree: React.FC = () => {
  const [unlockedSkills, setUnlockedSkills] = useState<Set<string>>(new Set());
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  // Memoize skillMap for efficient lookups
  const skillMap = useMemo(() => {
    const map = new Map<string, Skill>();
    skillsData.forEach(s => map.set(s.id, s));
    return map;
  }, []);

  useEffect(() => {
    // Automatically unlock skills with no prerequisites on initial load
    const initialUnlocked = skillsData.filter(s => s.prerequisites.length === 0).map(s => s.id);
    setUnlockedSkills(new Set(initialUnlocked));
  }, []);

  const canUnlockSkill = (skill: Skill): boolean => {
    return skill.prerequisites.every(prereqId => unlockedSkills.has(prereqId));
  };

  const handleUnlockSkill = (skill: Skill) => {
    if (canUnlockSkill(skill) && !unlockedSkills.has(skill.id)) {
      setUnlockedSkills(prev => new Set([...prev, skill.id]));
      setSelectedSkill(null); // Close panel after unlocking
    }
  };

  const handleNodeClick = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  const generateConnections = () => {
    const connections: JSX.Element[] = [];
    skillsData.forEach(skill => {
      skill.prerequisites.forEach(prereqId => {
        const prereqSkill = skillMap.get(prereqId);
        if (prereqSkill) {
          connections.push(
            <ConnectionLine
              key={`${prereqId}-${skill.id}`}
              from={prereqSkill}
              to={skill}
              isUnlocked={unlockedSkills.has(skill.id)}
            />
          );
        }
      });
    });
    return connections;
  };

  return (
    <div className="w-full min-h-screen  p-8 font-sans antialiased relative overflow-hidden">
      {/* Header and Skill Count */}
      <div className="flex justify-between items-start mb-6 relative z-20 max-w-6xl mx-auto">
        <div>
          <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">Developer Skill Tree</h1>
          <p className="text-slate-600 mt-2 text-lg">Map your learning journey and track your progress.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xl border border-slate-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{unlockedSkills.size}/{skillsData.length}</div>
            <div className="text-sm text-slate-700 font-semibold mt-1">Skills Unlocked</div>
          </div>
        </div>
      </div>

      {/* Skill Tree Canvas */}
      <div className="relative w-full flex justify-center items-center py-10">
        <div className="relative w-[1200px] h-[550px] "> {/* Adjusted width and height for more space */}
          <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none z-0">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(148, 163, 184, 0.8)" /> {/* slate-400 equivalent */}
              </marker>
            </defs>
            {generateConnections()}
          </svg>

          <div className="relative z-10">
            {skillsData.map(skill => (
              <SkillNode
                key={skill.id}
                skill={skill}
                isUnlocked={unlockedSkills.has(skill.id)}
                canBeUnlocked={canUnlockSkill(skill)}
                onClick={handleNodeClick}
                onHover={setHoveredSkill}
              />
            ))}
          </div>
        </div>
      </div>

      <SkillDetailPanel
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
        isUnlocked={selectedSkill ? unlockedSkills.has(selectedSkill.id) : false}
        canBeUnlocked={selectedSkill ? canUnlockSkill(selectedSkill) : false}
        onUnlock={handleUnlockSkill}
        skillMap={skillMap} // Pass the skillMap
      />

      {/* Custom Tailwind CSS for slower pulse animation */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.03);
            opacity: 0.8;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SkillTree;