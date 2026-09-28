import { motion } from 'framer-motion';
import { ArrowRight, FileText, MapPin } from 'lucide-react';
import { Link } from 'react-scroll';
import { profile } from '../data/profile';

const metricChips = [
  { label: 'RAGAS Faithfulness', value: '0.923' },
  { label: 'CNCF PRs Merged', value: '2' },
  { label: 'LeetCode', value: '1600+' },
];

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      {/* Subtle spotlight — replaces blurred blobs */}
      <div className="hero-spotlight" />

      {/* Dot grid texture */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 card rounded-full mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-accent mono text-xs font-medium">
              Open to Work
            </span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-[1.1] text-white">
            {profile.name}
          </h1>

          {/* Headline — result-oriented */}
          <p className="text-xl md:text-2xl text-text-body mb-4 max-w-2xl leading-relaxed">
            I build{' '}
            <span className="text-accent font-medium">RAG and agent backends</span>{' '}
            that ship.
          </p>

          {/* Location + availability */}
          <div className="flex items-center gap-2 text-text-muted text-sm mb-10 mono">
            <MapPin size={14} />
            <span>{profile.location}</span>
            <span className="mx-2">·</span>
            <span>{profile.education.degree.split(',')[0]}</span>
          </div>

          {/* Metric chips */}
          <div className="flex flex-wrap gap-3 mb-10">
            {metricChips.map((chip) => (
              <div
                key={chip.label}
                className="card px-4 py-3 rounded-lg"
              >
                <div className="text-xl font-bold text-white mono">
                  {chip.value}
                </div>
                <div className="text-xs text-text-muted mono mt-0.5">
                  {chip.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="projects"
              smooth={true}
              offset={-70}
              className="px-7 py-3.5 bg-accent hover:bg-accent/90 text-bg rounded-lg font-medium flex items-center gap-2 transition-all cursor-pointer text-sm"
            >
              View Work <ArrowRight size={16} />
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 card-hover rounded-lg font-medium flex items-center gap-2 transition-all text-sm text-white"
            >
              <FileText size={16} />
              Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
