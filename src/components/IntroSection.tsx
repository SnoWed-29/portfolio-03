import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const skillItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const IntroSection = () => {
  const skills = [
    'React & Next.js Applications',
    'TypeScript Development',
    'UI/UX Implementation',
    'Performance Optimization',
    'Design Systems',
    'Creative Coding'
  ];

  return (
    <section data-section="1" className="min-h-screen flex items-center px-6 py-20">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeIn}>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Hey there <span className="wave">👋</span>
            </h2>
            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                I'm a passionate developer who believes that great code is an art form. 
                With over 5 years of experience crafting digital experiences, I specialize 
                in transforming complex problems into elegant, user-friendly solutions.
              </p>
              <p>
                My approach combines technical excellence with design thinking. I obsess 
                over details—from pixel-perfect interfaces to performant animations that 
                feel natural and purposeful.
              </p>
              <p>
                When I'm not coding, you'll find me exploring the latest web technologies, 
                contributing to open source projects, or experimenting with creative coding 
                and generative art.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <div className="bg-gradient-to-br from-white/5 to-white/10 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-6">What I do best</h3>
              <motion.div
                className="space-y-4"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    className="flex items-center gap-3 group"
                    variants={skillItem}
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></div>
                    <span className="group-hover:text-blue-400 transition-colors">{skill}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div className="text-center mt-16" variants={fadeIn}>
          <a
            href="#contact" // You might want to update this to use the navigation logic
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Let's work together
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default IntroSection;