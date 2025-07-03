// pages/index.tsx (or wherever you have this file)
// This file is already correct for the new structure.

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import IntroSection from '../components/IntroSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import MesmerizingBackground from '../components/MesmerizingBackground';
import NavigationDots from '../components/NavigationDots';

const Index = () => {
  const [mesmerizingMode, setMesmerizingMode] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // This scroll handler is fine for detecting the active section
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[data-section]');
      // A threshold of innerHeight / 3 is often a good balance
      const scrollY = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        if (scrollY >= element.offsetTop && scrollY < element.offsetTop + element.offsetHeight) {
          setActiveSection(Number(element.dataset.section));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on mount to set initial section
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMesmerizingMode = () => {
    setMesmerizingMode(!mesmerizingMode);
  };

  return (
    <div className="relative bg-[#0A0A0A] text-white overflow-x-hidden">
      {mesmerizingMode && <MesmerizingBackground />}
      
      <button
        onClick={toggleMesmerizingMode}
        className="fixed top-6 right-6 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-mono hover:bg-white/20 transition-all duration-300"
      >
        {mesmerizingMode ? 'Exit Zen Mode' : 'Enter Zen Mode'}
      </button>

      <NavigationDots activeSection={activeSection} />

      <HeroSection />
      <IntroSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-40">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </div>
  );
};

export default Index;