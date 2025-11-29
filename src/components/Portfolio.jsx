import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "ATLAS: Academic Task & Learning Agent System",
    category: "AI/ML",
    image: "https://via.placeholder.com/600x400", // Replace with actual image
    tech: ["Python", "LangChain", "LangGraph", "Streamlit", "FastAPI"],
    github: "https://github.com",
    demo: "#"
  },
  {
    id: 2,
    title: "AI Resume Analyzer",
    category: "AI/ML",
    image: "https://via.placeholder.com/600x400",
    tech: ["Django", "LangChain", "HuggingFace", "React", "SQLite"],
    github: "https://github.com",
    demo: "#"
  },
  {
    id: 3,
    title: "MERN Food Application",
    category: "Full Stack",
    image: "https://via.placeholder.com/600x400",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Docker"],
    github: "https://github.com",
    demo: "#"
  }
];

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'AI/ML', 'Full Stack'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            A showcase of my recent work, highlighting my skills in web development and AI integration.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat 
                    ? 'bg-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="glass-card rounded-xl overflow-hidden group hover:border-primary/50 transition-colors"
              >
                <div className="relative overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay Buttons */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                    <a 
                      href={project.github} 
                      target="_blank"
                      className="p-3 bg-white/10 rounded-full hover:bg-primary text-white transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank"
                      className="p-3 bg-white/10 rounded-full hover:bg-primary text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-primary text-xs font-medium px-2 py-1 bg-primary/10 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs text-gray-400">#{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;