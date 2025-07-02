import { useState, useEffect } from 'react';
import { Github, Linkedin, FileText, Twitter } from 'lucide-react';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Software Engineer';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentIndex, fullText]);

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/SnoWed-29/' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/haitham-dihaji-7515b1225/' },
    { icon: FileText, label: 'Resume', href: '#' },
  ];

  return (
    <section data-section="0" className="min-h-screen flex items-center justify-center px-6 relative z-10">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
            {/* Changed to solid white for maximum contrast */}
            Haitham Dihaji
          </h1>
          <div className="h-12 flex items-center justify-center">
            <h2 className="text-xl md:text-2xl text-blue-300 font-light">
              {/* Used a vibrant but light blue for better visibility and a modern feel */}
              {displayText}
              <span className="animate-pulse ml-1 text-blue-300">|</span>
            </h2>
          </div>
        </div>

        <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-1000">
          {/* Changed to a lighter shade of gray for improved contrast */}
          I build scalable and performant web & mobile applications, combining crafted user experiences with robust backend and cloud infrastructure.
        </p>

        <div className="flex flex-wrap justify-center gap-6 animate-fade-in delay-1500">
          {socialLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              target='_blank'
              rel='noopener noreferrer' // Added for security best practice
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <link.icon className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" />
              {/* Kept text white, let the icon change color on hover for subtle feedback */}
              <span className="text-white text-sm font-medium">{link.label}</span>
            </a>
          ))}
        </div>

        <div className="mt-16 animate-fade-in delay-2000">
          <div className="text-sm text-gray-400 font-mono">
            {/* Changed to a medium gray for better visibility without being too dominant */}
            ctrl + scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;