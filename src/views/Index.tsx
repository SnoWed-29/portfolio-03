import { useState, useEffect } from 'react';
import { ChevronDown, } from 'lucide-react';
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
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[data-section]');
      const scrollY = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMesmerizingMode = () => {
    setMesmerizingMode(!mesmerizingMode);
  };

  return (
    <div className="relative text-white overflow-x-hidden">
      {mesmerizingMode && <MesmerizingBackground />}
      
      {/* Mesmerizing Mode Toggle */}
      <button
        onClick={toggleMesmerizingMode}
        className="fixed top-6 right-6 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-mono hover:bg-white/20 transition-all duration-300"
      >
        {mesmerizingMode ? 'Exit Zen Mode' : 'Enter Zen Mode'}
      </button>

      {/* Navigation Dots */}
      <NavigationDots activeSection={activeSection} />

      {/* Hero Section */}
      <HeroSection />

      {/* Introduction Section */}
      <IntroSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </div>
  );
};

export default Index;