import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const ContactSection = () => {
  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  return (
    <section data-section="4" className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-bold mb-8">
            Ready to build great products together?
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always excited to work on challenging projects and collaborate with 
            passionate teams. Let's create something amazing.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-16">
            <a
              href="mailto:alex@example.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group"
            >
              <Mail className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              alex@example.com
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center gap-6 mb-16">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <link.icon className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="border-t border-white/10 pt-8">
            <p className="text-white/40 text-sm font-mono">
              © 2025 Haitham Dihaji. Crafted with passion and precision.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;