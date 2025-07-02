import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';

const ContactSection = () => {
  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
  ];

  return (
    <section data-section="4" className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center w-full">
        <div className="animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Ready to build great products together?
          </h2>
          
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always excited to work on challenging projects and collaborate with 
            passionate teams. Let's create something amazing.
          </p>

          <div className="mb-16">
            <a
              href="mailto:alex@example.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group"
            >
              <Mail className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              alex@example.com
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="flex justify-center gap-6 mb-16 animate-fade-in delay-500">
            {socialLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <link.icon className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 animate-fade-in delay-1000">
            <p className="text-white/40 text-sm font-mono">
              © 2025 Haitham Dihaji. Crafted with passion and precision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;