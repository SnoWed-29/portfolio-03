import { useState, useEffect } from 'react';
import { Github, Linkedin, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Software Engineer';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, fullText]);

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/SnoWed-29/' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/haitham-dihaji-7515b1225/' },
    { icon: FileText, label: 'Resume', href: '#' },
  ];

  return (
    <section data-section="0" className="min-h-screen flex items-center justify-center px-6 relative z-10">
      <motion.div
        className="text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
            Haitham Dihaji
          </h1>
          <div className="h-12 flex items-center justify-center">
            <h2 className="text-xl md:text-2xl text-blue-300 font-light">
              {displayText}
              <span className="animate-pulse ml-1 text-blue-300">|</span>
            </h2>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          I build scalable and performant web & mobile applications, combining crafted user experiences with robust backend and cloud infrastructure.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              target='_blank'
              rel='noopener noreferrer'
            >
              <link.icon className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" />
              <span className="text-white text-sm font-medium">{link.label}</span>
            </a>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16">
          <div className="text-sm text-gray-400 font-mono">
            ctrl + scroll to explore
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;