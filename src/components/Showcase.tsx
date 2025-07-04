import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
    { id: 1, title: "React/Three Portfolio", description: "This project is my old portfolio built with React and Three.js.", bg: "bg-gradient-to-br from-blue-600 to-purple-600" },
    { id: 2, title: "Jad Travel Agency", description: "This is a website for a travel agency built using Laravel and MySQL.", bg: "bg-gradient-to-br from-green-500 to-teal-600" },
    { id: 3, title: "Ecommerce mobile app", description: "This is a mobile app for an ecommerce store built using Flutter.", bg: "bg-gradient-to-br from-indigo-700 to-pink-600" },
    // { id: 5, title: "Interactive Data Visualization", description: "Visualize complex datasets with dynamic charts, graphs, and interactive maps.", bg: "bg-gradient-to-br from-cyan-500 to-blue-700" },
    // { id: 6, title: "Fitness & Nutrition Tracker", description: "Track workouts, meals, and progress with personalized plans and insights.", bg: "bg-gradient-to-br from-purple-500 to-fuchsia-600" },
    // { id: 7, title: "Collaborative Whiteboard App", description: "Real-time collaborative drawing and brainstorming tool for remote teams.", bg: "bg-gradient-to-br from-yellow-500 to-amber-600" },
    // { id: 8, title: "Cloud Storage Management", description: "Manage files across multiple cloud providers with a unified interface.", bg: "bg-gradient-to-br from-lime-500 to-emerald-600" },
  ];

const Showcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" }); // Adjust margin for earlier trigger

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for individual cards
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
  };

  return (
    <section id="showcase" className="py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16" // Increased bottom margin
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 tracking-tight"> {/* Darker, bolder, tighter spacing */}
            Selected <span className="text-teal-600">Work</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light"> {/* Slightly larger, lighter font weight */}
            Explore a selection of my recent projects, blending creativity with cutting-edge technology.
          </p>
        </motion.div>

        <motion.div
          className="overflow-hidden pb-8" // Added padding bottom to prevent shadow clipping
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -2500, right: 0 }} // Adjust based on total width of cards + gaps
            className="flex gap-8 px-4 cursor-grab active:cursor-grabbing will-change-transform" // Increased gap, added px-4 for initial spacing
            whileDrag={{ cursor: "grabbing" }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }} // More pronounced shadow on hover
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`
                  min-w-[320px] h-[380px] ${project.bg} 
                  rounded-3xl p-7 flex flex-col justify-between
                  shadow-xl border border-white/20 overflow-hidden relative
                `}
              >
                {/* Background overlay for subtle pattern/texture */}
                <div className="absolute inset-0 bg-pattern-dots opacity-10"></div> 

                <div className="relative z-10"> {/* Ensure content is above overlay */}
                  <h3 className="text-white font-bold text-2xl mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                {/* Call to Action Button or Link */}
                <div className="relative z-10 mt-auto">
                    <button className="bg-white/30 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white/50 transition-colors duration-300">
                        View Project
                    </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-12 text-gray-500 text-lg flex items-center justify-center gap-2" // Improved instruction text
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h14"></path></svg>
          <span className="font-medium">Drag horizontally to explore more projects</span>
          <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h14"></path></svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;