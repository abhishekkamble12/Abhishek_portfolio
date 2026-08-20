import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Search } from 'lucide-react';
import { projects, categories } from '../data/projects';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const featuredProjects = projects.filter((p) => p.featured);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of production-grade work in AI/ML, backend systems, and data engineering.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-8 hover:border-primary/50 transition-colors group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-primary text-xs font-medium px-3 py-1 bg-primary/10 rounded-full">
                  {project.category}
                </span>
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{project.subtitle}</p>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Metrics */}
              {project.metrics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.metrics.map((m) => (
                    <span
                      key={m}
                      className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 5).map((t) => (
                  <span key={t} className="text-xs text-gray-500">
                    #{t}
                  </span>
                ))}
                {project.tech.length > 5 && (
                  <span className="text-xs text-gray-600">
                    +{project.tech.length - 5} more
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            All <span className="text-gradient">Projects</span>
          </h3>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects or technologies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-dark-lighter border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
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
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects
              .filter((p) => !p.featured)
              .map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-primary text-xs font-medium px-2 py-1 bg-primary/10 rounded-full">
                      {project.category}
                    </span>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label={`View ${project.title} demo`}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h4 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">{project.subtitle}</p>
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {project.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.metrics.slice(0, 2).map((m) => (
                        <span
                          key={m}
                          className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs text-gray-500">
                        #{t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.filter((p) => !p.featured).length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No projects match your search.
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
