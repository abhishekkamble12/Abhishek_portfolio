import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Search, ArrowUpRight } from 'lucide-react';
import { projects, categories } from '../data/projects';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const featuredProjects = projects.filter((p) => p.featured);

  const filteredAll = projects.filter((p) => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch && !p.featured;
  });

  const filteredFeatured = projects.filter((p) => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch && p.featured;
  });

  return (
    <section id="projects" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="section-label">01 / Work</span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured Projects
          </h2>
        </motion.div>

        {/* ============ Bento Grid — Featured ============ */}
        <div className="grid md:grid-cols-2 gap-4 mb-20">
          {filteredFeatured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`card-hover rounded-xl p-6 md:p-8 group ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="mono text-xs text-accent px-2.5 py-1 bg-accent/10 rounded-md">
                  {project.category}
                </span>
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent transition-colors"
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
                      className="text-text-muted hover:text-accent transition-colors"
                      aria-label={`View ${project.title} demo`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-text-muted mb-4">{project.subtitle}</p>
              <p className="text-text-body text-sm mb-5 leading-relaxed max-w-2xl">
                {project.description}
              </p>

              {/* Metrics — monospace */}
              {project.metrics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.metrics.map((m) => (
                    <span
                      key={m}
                      className="mono text-xs px-3 py-1.5 bg-accent/5 text-accent border border-accent/10 rounded-md"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}

              {/* Tech tags */}
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {project.tech.slice(0, 6).map((t) => (
                  <span key={t} className="mono text-xs text-text-muted">
                    {t}
                  </span>
                ))}
                {project.tech.length > 6 && (
                  <span className="mono text-xs text-text-muted opacity-50">
                    +{project.tech.length - 6}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ============ More Projects — Compact List ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="section-label">02 / More</span>
          <h3 className="text-2xl font-bold mb-6">
            All Projects
          </h3>

          {/* Search */}
          <div className="relative max-w-sm mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-accent transition-colors mono"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all mono ${
                  filter === cat
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'bg-surface text-text-muted border border-border hover:border-accent/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Compact project rows */}
        <div className="border border-border rounded-xl overflow-hidden">
          <AnimatePresence>
            {filteredAll.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                key={project.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 hover:bg-surface/80 transition-colors group ${
                  index !== filteredAll.length - 1
                    ? 'border-b border-border'
                    : ''
                }`}
              >
                <div className="flex-1 min-w-0 mb-2 sm:mb-0">
                  <div className="flex items-center gap-3">
                    <h4 className="text-sm font-semibold text-white group-hover:text-accent transition-colors truncate">
                      {project.title}
                    </h4>
                    <span className="mono text-[10px] text-text-muted px-2 py-0.5 bg-surface rounded border border-border shrink-0">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5 truncate">
                    {project.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden md:flex gap-2">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="mono text-[10px] text-text-muted">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-accent transition-colors"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-accent transition-colors"
                        aria-label={`View ${project.title} demo`}
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredAll.length === 0 && (
          <p className="text-center text-text-muted mt-8 mono text-sm">
            No projects match your search.
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
