import  { useState } from 'react';
import { Github, ArrowRight, Star, Code, Zap } from 'lucide-react';

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'AI-Powered Task Manager',
      description: 'A smart productivity app that uses machine learning to prioritize tasks and optimize workflows.',
      tech: ['React', 'TypeScript', 'Python', 'TensorFlow'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      github: '#',
      demo: '#',
      color: 'from-purple-500 to-pink-500',
      stats: { stars: 127, forks: 34 }
    },
    {
      title: 'Real-time Collaboration Tool',
      description: 'A modern workspace platform enabling seamless team collaboration with live editing and video calls.',
      tech: ['Next.js', 'WebRTC', 'Socket.io', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      github: '#',
      demo: '#',
      color: 'from-blue-500 to-cyan-500',
      stats: { stars: 89, forks: 23 }
    },
    {
      title: 'Interactive Data Visualization',
      description: 'A comprehensive dashboard for visualizing complex datasets with interactive charts and real-time updates.',
      tech: ['D3.js', 'React', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      github: '#',
      demo: '#',
      color: 'from-green-500 to-emerald-500',
      stats: { stars: 156, forks: 42 }
    }
  ];

  return (
    <section data-section="3" className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Personal Projects
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Side projects and experiments that showcase my passion for building innovative solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500 group-hover:scale-105">
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  
                  {/* Floating Stats */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-black/60 rounded-full text-xs backdrop-blur-sm">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-white">{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-black/60 rounded-full text-xs backdrop-blur-sm">
                      <Code className="w-3 h-3 text-blue-400" />
                      <span className="text-white">{project.stats.forks}</span>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${project.color} ${
                      hoveredProject === index ? 'animate-pulse' : ''
                    }`}>
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>

                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-medium bg-white/10 border border-white/20 rounded-md text-white/80 hover:bg-white/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 group/btn"
                    >
                      <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r ${project.color} rounded-lg text-sm font-medium text-white hover:scale-105 transition-all duration-300 group/btn`}
                    >
                      Demo
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;