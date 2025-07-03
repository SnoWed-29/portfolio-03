import { useState } from 'react';
import { Calendar, MapPin, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const experiences = [
    {
      role: 'Senior Frontend Engineer',
      company: 'TechFlow Inc.',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      description: 'Leading the development of a next-generation SaaS platform serving 100K+ users.',
      highlights: ['40% bundle size reduction', 'Real-time collaboration', 'TypeScript migration'],
      color: 'from-blue-500 to-purple-600',
      icon: Zap
    },
    {
      role: 'Frontend Developer',
      company: 'Design Studio Pro',
      location: 'New York, NY', 
      period: '2020 - 2022',
      description: 'Developed custom web applications for Fortune 500 companies.',
      highlights: ['25+ client projects', 'Award-winning experiences', 'Team mentorship'],
      color: 'from-green-500 to-teal-600',
      icon: TrendingUp
    },
    {
      role: 'Junior Developer',
      company: 'StartupLab',
      location: 'Austin, TX',
      period: '2019 - 2020',
      description: 'Kickstarted career in fast-paced startup environment.',
      highlights: ['Responsive web apps', 'Cross-team collaboration', 'Open source contributions'],
      color: 'from-orange-500 to-red-600',
      icon: Zap
    }
  ];

  return (
    <section data-section="2" className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Building exceptional digital experiences across various scales and industries.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 opacity-30"></div>

          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const isActive = activeIndex === index;
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    isActive ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className={`absolute left-6 w-5 h-5 rounded-full border-4 border-[#0A0A0A] transition-all duration-500 ${
                    isActive ? `bg-gradient-to-r ${exp.color} scale-125` : 'bg-white/20 hover:bg-white/40'
                  }`}></div>
                  
                  <div className="ml-20 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm group-hover:bg-white/15 transition-all duration-500">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${exp.color} ${
                          isActive ? 'animate-pulse' : ''
                        }`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                          <h4 className="text-lg text-blue-400 font-semibold">{exp.company}</h4>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm text-white/60">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-mono">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-white/80 mb-6 leading-relaxed">{exp.description}</p>

                    <div className="flex flex-wrap gap-3">
                      {exp.highlights.map((highlight, i) => (
                        <div
                          key={i}
                          className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${exp.color} bg-opacity-20 border border-white/20 transition-all duration-300 ${
                            isActive ? 'animate-pulse' : 'hover:scale-105'
                          }`}
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;