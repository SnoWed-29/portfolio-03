import React from 'react';
import { motion } from 'framer-motion';

interface NavigationDotsProps {
  activeSection: number;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({ activeSection }) => {
  const sections = ['Hero', 'About', 'Experience', 'Projects', 'Contact'];

  const scrollToSection = (index: number) => {
    // UPDATED: Look for the section in the main document
    const section = document.querySelector(`section[data-section="${index}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col gap-4">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => scrollToSection(index)}
            className="group relative flex items-center justify-center"
            aria-label={`Go to ${section} section`}
          >
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === index
                  ? 'border-blue-400'
                  : 'bg-transparent border-white/30 group-hover:border-white/60'
              }`}
            />
            {activeSection === index && (
              <motion.div
                layoutId="active-dot-pill"
                className="absolute w-4 h-4 rounded-full bg-blue-400"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-black/80 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {section}
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationDots;