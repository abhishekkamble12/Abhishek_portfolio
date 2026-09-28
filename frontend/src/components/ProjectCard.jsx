import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useGsapCardTilt } from '../utils/gsapEffects';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  // GSAP 3D Interactive Tilt on hover
  useGsapCardTilt(cardRef, 7);

  const isFirst = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`relative ${isFirst ? 'md:col-span-2' : ''}`}
    >
      <div
        ref={cardRef}
        className="card rounded-xl p-6 md:p-8 group relative overflow-hidden transition-colors border border-border/80 hover:border-accent/50 bg-surface/90 backdrop-blur-md h-full flex flex-col justify-between"
      >
        {/* Subtle hover gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div>
          {/* Header & Badges */}
          <div className="flex justify-between items-start mb-4">
            <span className="mono text-xs text-accent px-2.5 py-1 bg-accent/10 border border-accent/20 rounded-md">
              {project.category}
            </span>
            <div className="flex gap-3 relative z-10">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md text-text-muted hover:text-accent hover:bg-surface border border-transparent hover:border-border transition-all"
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
                  className="p-1.5 rounded-md text-text-muted hover:text-accent hover:bg-surface border border-transparent hover:border-border transition-all"
                  aria-label={`View ${project.title} demo`}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-xl md:text-2xl font-bold mb-1 text-white group-hover:text-accent transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-text-muted mb-4 mono">{project.subtitle}</p>

          {/* Description */}
          <p className="text-text-body text-sm mb-5 leading-relaxed max-w-2xl">
            {project.description}
          </p>

          {/* Key Metrics / Highlights */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.metrics.map((m) => (
                <span
                  key={m}
                  className="mono text-xs px-2.5 py-1 bg-accent/5 text-accent/90 border border-accent/15 rounded-md"
                >
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tech tags footer */}
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-4 border-t border-border/50">
          {project.tech.slice(0, 7).map((t) => (
            <span key={t} className="mono text-[11px] text-text-muted">
              {t}
            </span>
          ))}
          {project.tech.length > 7 && (
            <span className="mono text-[11px] text-text-muted opacity-50">
              +{project.tech.length - 7}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
