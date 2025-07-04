import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import specific icons from react-icons
import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaVuejs, FaAngular, FaNodeJs, FaPython, FaJava, FaDocker, FaAws, FaGitAlt
} from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiNextdotjs, SiExpress, SiDjango, SiSpring, SiPostgresql, SiMongodb, SiJenkins, SiGooglecloud
} from 'react-icons/si'; // Adjusted import path for Si (assuming it's local)
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
// Adjusted positions to group by category and arrange top-to-bottom
const skillsData: Skill[] = [
  // Core & Foundational - Y-coordinates adjusted to start lower
  { id: 'git', name: 'Git', level: 5, description: 'Distributed version control system for tracking changes and collaborating on projects.', category: 'Core', prerequisites: [], icon: 'Git', position: { x: 50, y: 350 } },
  { id: 'cli', name: 'CLI', level: 4, description: 'Command-Line Interface proficiency for development, server management, and tooling.', category: 'Core', prerequisites: [], icon: 'CLI', position: { x: 150, y: 350 } },

  // Frontend - Grouped together, starting from a higher Y-coordinate
  { id: 'html', name: 'HTML', level: 5, description: 'Semantic markup for building accessible and structured web content.', category: 'Frontend', prerequisites: ['git'], icon: 'HTML', position: { x: 50, y: 50 } },
  { id: 'css', name: 'CSS', level: 5, description: 'Styling web pages with modern techniques like Flexbox, Grid, and animations.', category: 'Frontend', prerequisites: ['html'], icon: 'CSS', position: { x: 50, y: 150 } },
  { id: 'javascript', name: 'JavaScript', level: 5, description: 'Core programming language of the web, including ES6+ features and asynchronous patterns.', category: 'Frontend', prerequisites: ['html'], icon: 'JavaScript', position: { x: 150, y: 50 } },
  { id: 'typescript', name: 'TypeScript', level: 4, description: 'Statically typed superset of JavaScript that enhances code quality and maintainability.', category: 'Frontend', prerequisites: ['javascript'], icon: 'TypeScript', position: { x: 150, y: 150 } },
  { id: 'tailwind', name: 'Tailwind CSS', level: 4, description: 'A utility-first CSS framework for rapid UI development.', category: 'Frontend', prerequisites: ['css'], icon: 'TailwindCSS', position: { x: 50, y: 250 } },
  { id: 'react', name: 'React', level: 5, description: 'A declarative library for building user interfaces with a component-based architecture.', category: 'Frontend', prerequisites: ['javascript'], icon: 'React', position: { x: 250, y: 50 } },
  { id: 'nextjs', name: 'Next.js', level: 4, description: 'The React framework for production, offering server-side rendering, static site generation, and more.', category: 'Frontend', prerequisites: ['react'], icon: 'NextJS', position: { x: 250, y: 150 } },

  // Backend - Grouped together
  { id: 'nodejs', name: 'Node.js', level: 4, description: 'JavaScript runtime for building scalable server-side applications.', category: 'Backend', prerequisites: ['javascript', 'cli'], icon: 'NodeJS', position: { x: 400, y: 50 } },
  { id: 'express', name: 'Express.js', level: 4, description: 'Minimalist web framework for Node.js, used for building APIs and web applications.', category: 'Backend', prerequisites: ['nodejs'], icon: 'Express', position: { x: 400, y: 150 } },
  { id: 'python', name: 'Python', level: 3, description: 'Versatile language popular in web development, data science, and automation.', category: 'Backend', prerequisites: ['cli'], icon: 'Python', position: { x: 400, y: 250 } },
  { id: 'django', name: 'Django', level: 3, description: 'High-level Python web framework that encourages rapid development and clean design.', category: 'Backend', prerequisites: ['python'], icon: 'Django', position: { x: 400, y: 350 } },

  // Database - Grouped together
  { id: 'sql', name: 'SQL', level: 4, description: 'Standard language for managing and querying relational databases like PostgreSQL and MySQL.', category: 'Database', prerequisites: ['nodejs'], icon: 'SQL', position: { x: 550, y: 50 } },
  { id: 'mongodb', name: 'MongoDB', level: 3, description: 'A popular NoSQL database for storing data in flexible, JSON-like documents.', category: 'Database', prerequisites: ['nodejs'], icon: 'MongoDB', position: { x: 550, y: 150 } },

  // DevOps & Cloud - Grouped together
  { id: 'docker', name: 'Docker', level: 4, description: 'Platform for developing, shipping, and running applications in containers.', category: 'DevOps', prerequisites: ['cli'], icon: 'Docker', position: { x: 700, y: 50 } },
  { id: 'ci_cd', name: 'CI/CD', level: 4, description: 'Practices of Continuous Integration and Delivery using tools like Jenkins or GitHub Actions.', category: 'DevOps', prerequisites: ['git', 'docker'], icon: 'CI_CD', position: { x: 700, y: 150  } },
  { id: 'aws', name: 'AWS', level: 3, description: 'Amazon Web Services, a comprehensive cloud platform offering a wide range of services.', category: 'Cloud', prerequisites: ['docker'], icon: 'AWS', position: { x: 850, y: 50 } },
];


// --- COMPONENT: SkillNode ---
const SkillNode: React.FC<SkillNodeProps> = ({ skill, isUnlocked, canBeUnlocked, onClick, onHover }) => {
  const IconComponent = iconMap[skill.icon] || FaReact;

  const categoryStyles = {
    Frontend: { color: '#3b82f6', ring: 'ring-blue-500' },
    Backend: { color: '#22c55e', ring: 'ring-green-500' },
    Database: { color: '#a855f7', ring: 'ring-purple-500' },
    DevOps: { color: '#f97316', ring: 'ring-orange-500' },
    Cloud: { color: '#f59e0b', ring: 'ring-amber-500' },
    Core: { color: '#64748b', ring: 'ring-slate-500' },
  };

  const style = categoryStyles[skill.category];
  const progress = (skill.level / 5) * 100;
  const circumference = 2 * Math.PI * 28; // 2 * pi * radius (radius is 28)
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{ left: skill.position.x, top: skill.position.y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.4 }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(skill)}
    >
      <div
        className={`relative w-20 h-20  flex items-center justify-center transition-all duration-300
                    ${isUnlocked ? 'bg-white shadow-lg' : 'bg-slate-200'}
                    ${canBeUnlocked && !isUnlocked ? 'animate-pulse' : ''}
                    rounded-full ${style.ring} ${isUnlocked || canBeUnlocked ? 'ring-2' : 'ring-1 ring-slate-300'}`}
      >
        {/* Progress Ring */}
        <svg className="absolute w-full h-full" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="28" fill="none" strokeWidth="4" className="stroke-slate-200 " />
          <motion.circle
            cx="30" cy="30" r="28" fill="none" strokeWidth="4"
            className="transform -rotate-90 origin-center "
            stroke={style.color}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: isUnlocked ? strokeDashoffset : circumference }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </svg>

        {/* Icon */}
        <div className={`w-16 h-16  rounded-full flex items-center justify-center transition-all duration-300 ${isUnlocked ? 'bg-white' : 'bg-slate-200'}`}>
           <IconComponent
              className="w-9 h-9 transition-colors duration-300"
              style={{ color: isUnlocked ? style.color : '#94a3b8' }}
           />
        </div>
      </div>
      {/* <p className={`text-center mt-2 text-sm font-semibold transition-colors duration-300
                   ${isUnlocked ? 'text-slate-700' : 'text-slate-400'}
                   group-hover:text-slate-800`}>
        {skill.name}
      </p> */}
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
  const strokeColor = isUnlocked ? categoryStyles[to.category] : 'stroke-slate-300';

  return (
    <motion.line
      x1={from.position.x + 40} y1={from.position.y + 40}
      x2={to.position.x + 40} y2={to.position.y + 40}
      className={`${strokeColor}`}
      strokeWidth={2.5}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isUnlocked ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
    />
  );
};

// --- COMPONENT: SkillDetailPanel ---
const SkillDetailPanel: React.FC<SkillDetailPanelProps> = ({ skill, onClose, isUnlocked, canBeUnlocked, onUnlock }) => {
  if (!skill) return null;

  const IconComponent = iconMap[skill.icon] || FaReact;
  const categoryStyles = {
    Frontend: { text: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-500' },
    Backend: { text: 'text-green-600', bg: 'bg-green-100', border: 'border-green-500' },
    Database: { text: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-500' },
    DevOps: { text: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-500' },
    Cloud: { text: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-500' },
    Core: { text: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-500' },
  };
  const style = categoryStyles[skill.category];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0  flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`rounded-2xl p-6 max-w-sm w-full bg-white shadow-2xl border-t-4 ${style.border}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ ease: 'circOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <IconComponent className={`w-10 h-10 ${style.text}`} />
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{skill.name}</h2>
                <span className={`text-sm font-semibold px-2 py-1 rounded-full ${style.bg} ${style.text}`}>
                  {skill.category}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">×</button>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1 text-slate-600">
              <span>Proficiency Level</span>
              <span className="font-semibold">{skill.level}/5</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div className="h-2.5 rounded-full" style={{ width: `${skill.level * 20}%`, backgroundColor: categoryStyles[skill.category].text.replace('text-','bg-').replace('-600','') }}/>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6">{skill.description}</p>

          {!isUnlocked && (
            <button
              onClick={() => onUnlock(skill)}
              disabled={!canBeUnlocked}
              className="w-full py-2 px-4 rounded-lg font-semibold text-white transition-colors
                         disabled:bg-slate-400 disabled:cursor-not-allowed
                         bg-green-500 hover:bg-green-600"
            >
              {canBeUnlocked ? 'Unlock Skill' : 'Prerequisites not met'}
            </button>
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

  useEffect(() => {
    // Automatically unlock skills with no prerequisites on initial load
    const initialUnlocked = skillsData.filter(s => s.prerequisites.length === 0).map(s => s.id);
    setUnlockedSkills(new Set(initialUnlocked));
  }, []);

  const skillMap = useMemo(() => new Map(skillsData.map(s => [s.id, s])), []);

  const canUnlockSkill = (skill: Skill): boolean => {
    return skill.prerequisites.every(prereqId => unlockedSkills.has(prereqId));
  };

  const handleUnlockSkill = (skill: Skill) => {
    if (canUnlockSkill(skill) && !unlockedSkills.has(skill.id)) {
      setUnlockedSkills(prev => new Set([...prev, skill.id]));
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
    <div className="w-full  bg-transparent p-8 font-sans relative overflow-hidden">
      {/* Adjusted top padding for the header to create more space */}
      <div className="absolute top-16 left-8 z-20"> {/* Changed top-8 to top-16 */}
        <h1 className="text-4xl font-bold text-slate-800">Developer Skill Tree</h1>
        <p className="text-slate-600 mt-1">Click a node to view details or unlock new skills.</p>
      </div>

      <div className="absolute top-16 right-8 z-20 p-4 rounded-xl shadow-md border border-slate-200"> {/* Changed top-8 to top-16 */}
        <div className="text-center">
            <div className="text-3xl font-bold text-slate-800">{unlockedSkills.size}/{skillsData.length}</div>
            <div className="text-sm text-slate-600 font-semibold">Skills Unlocked</div>
        </div>
      </div>

      {/* Adjusted height to accommodate the new layout */}
      <div className="relative w-full h-fit flex items-center justify-center pt-20"> {/* Increased height and added pt-20 */}
        <div className="relative my-4 w-[1000px] h-[800px] " > {/* Increased height here as well */}
          <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none z-0">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(203, 213, 225, 0.8)" />
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
      />
    </div>
  );
};

export default SkillTree;