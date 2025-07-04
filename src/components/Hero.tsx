import React from 'react';
import { motion } from 'framer-motion';
import { FaCodeMerge } from "react-icons/fa6";

// Re-imagined WavyUnderline component for better aesthetics
const WavyUnderline = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <span className="relative inline-block">
      {children}
      <motion.svg
        className="absolute -bottom-1 left-0 w-full h-3"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay, ease: "easeInOut" }}
      >
        <motion.path
          d="M0,7 Q25,3 50,7 T100,7"
          stroke="#4ECDC4" // A soft teal for the underline
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </motion.svg>
    </span>
  );
};

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-16  relative z-10">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side - Static Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-center md:text-left"
        >
          <div>
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-3 leading-tight" // Darker primary text, bolder
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className='text-teal-600 font-bolder w-fit '><FaCodeMerge className='w-fit float-left'/></span>Haitham
              <span className='text-teal-600 font-bolder'>  </span>Dihaji
            </motion.h1>
            <motion.p
  className="text-2xl md:text-3xl text-gray-700 font-bold" // Larger, bolder, darker for emphasis
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
>
  Software Engineer
</motion.p>

<motion.p
  className="text-lg md:text-xl text-gray-500 font-medium" // Slightly smaller, lighter gray
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }} // Slightly delayed for a subtle cascade
>
  <span className="text-gray-400">at </span>Cyberground
</motion.p>
          </div>
          
          <motion.nav 
            className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center md:justify-start" // Horizontal navigation for desktop
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={() => scrollToSection('showcase')}
              className="text-lg text-gray-700 hover:text-teal-600 transition-colors duration-300 relative group"
            >
              Showcase
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-teal-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('parallax')}
              className="text-lg text-gray-700 hover:text-teal-600 transition-colors duration-300 relative group"
            >
              Resume
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-teal-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>
            <a
              href="https://github.com/SnoWeD-29"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-gray-700 hover:text-teal-600 transition-colors duration-300 relative group"
            >
              Github
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-teal-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
          </motion.nav>
        </motion.div>

        {/* Right Side - Bio */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8 text-center md:text-left" // Align text to left on desktop
        >
          <div className="text-xl md:text-2xl leading-relaxed text-gray-700 space-y-4 text-justify">
                <p>
                    Hi, I'm <WavyUnderline delay={1}>Haitham Dihaji</WavyUnderline>, a passionate web developer focused on building modern, user-friendly, and responsive web applications.
                </p>
                <p>
                    Skilled in technologies like React, TypeScript, PHP, and PostgreSQL, I create scalable digital solutions—from dynamic dashboards to <WavyUnderline delay={1.7}>secure authentication</WavyUnderline>, all with an eye for <WavyUnderline delay={1.5}>clean, accessible design</WavyUnderline>.
                </p>
            </div>
          
          <motion.a
            href="mailto:snowed29@gmail.com"
            className="inline-block px-8 py-3 bg-teal-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-teal-600 transition-all duration-300 transform hover:-translate-y-1" // Prominent CTA button
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Schedule a call
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;