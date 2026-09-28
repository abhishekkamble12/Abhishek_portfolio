import { motion } from 'framer-motion';

const SectionHeader = ({ number, label, title, subtitle, badge }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 relative"
    >
      {/* Expanding Accent Laser Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full bg-gradient-to-r from-accent/60 via-accent/20 to-transparent origin-left mb-8 shadow-[0_0_8px_rgba(61,220,151,0.5)]"
      />

      {/* Monospace Code / Section Badge */}
      <div className="flex items-center gap-3 mb-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/25 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <span className="mono text-xs font-semibold text-accent tracking-wider uppercase">
            {number} // {label}
          </span>
        </div>
        {badge && (
          <span className="mono text-[11px] text-text-muted px-2.5 py-0.5 rounded bg-surface border border-border">
            {badge}
          </span>
        )}
      </div>

      {/* Main Section Title with dynamic gradient highlight */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 font-display">
        {title}
      </h2>

      {/* Subtitle / Chapter Briefing */}
      {subtitle && (
        <p className="text-text-body text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Subtle background ambient glow behind the section header */}
      <div className="absolute -top-12 -left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />
    </motion.div>
  );
};

export default SectionHeader;
