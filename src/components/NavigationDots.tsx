import React from 'react';

interface NavigationDotsProps {
  activeSection: number;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({ activeSection }) => {
  const sections = ['Hero', 'About', 'Experience', 'Projects', 'Contact'];

  const scrollToSection = (index: number) => {
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
            className="group relative"
            aria-label={`Go to ${section} section`}
          >
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === index
                  ? 'bg-blue-400 border-blue-400 scale-125'
                  : 'bg-transparent border-white/30 hover:border-white/60'
              }`}
            />
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