import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, MapPin } from 'lucide-react';
import { Link } from 'react-scroll';
import { profile } from '../data/profile';
import Hero3DCanvas from './canvas/Hero3DCanvas';
import { useGsapMagnetic } from '../utils/gsapEffects';

const Hero = () => {
  const btnWorkRef = useRef(null);
  const btnResumeRef = useRef(null);

  // Attach GSAP magnetic cursor pull to primary actions
  useGsapMagnetic(btnWorkRef, 0.3);
  useGsapMagnetic(btnResumeRef, 0.25);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      {/* Three.js Interactive 3D Neural Constellation & Wireframe Core */}
      <Hero3DCanvas />

      {/* Subtle radial spotlight & dot grid */}
      <div className="hero-spotlight pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 card rounded-full mb-8 backdrop-blur-md">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-accent mono text-xs font-medium">
              Open to Software & AI Engineering Roles
            </span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-[1.1] text-white tracking-tight">
            {profile.name}
          </h1>

          {/* Headline — result-oriented based on resume */}
          <p className="text-xl md:text-2xl text-text-body mb-4 max-w-2xl leading-relaxed">
            I build{' '}
            <span className="text-accent font-medium">
              multi-agent systems, RAG platforms & distributed backends
            </span>{' '}
            that ship to production.
          </p>

          {/* Location + education summary */}
          <div className="flex items-center gap-2 text-text-muted text-sm mb-10 mono">
            <MapPin size={14} className="text-accent" />
            <span>{profile.location}</span>
            <span className="mx-2">·</span>
            <span>MITAOE Pune (2023–2027)</span>
          </div>

          {/* Metric chips from resume stats */}
          <div className="flex flex-wrap gap-3 mb-10">
            {profile.stats.map((stat) => (
              <div
                key={stat.label}
                className="card px-4 py-3 rounded-lg border border-border/80 backdrop-blur-sm hover:border-accent/40 transition-colors"
              >
                <div className="text-xl font-bold text-white mono">
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted mono mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons with GSAP Magnetic Interaction */}
          <div className="flex flex-wrap gap-4">
            <div ref={btnWorkRef}>
              <Link
                to="projects"
                smooth={true}
                offset={-70}
                className="px-7 py-3.5 bg-accent hover:bg-accent/90 text-bg rounded-lg font-medium flex items-center gap-2 transition-all cursor-pointer text-sm shadow-[0_0_20px_rgba(61,220,151,0.2)] hover:shadow-[0_0_30px_rgba(61,220,151,0.35)]"
              >
                View Projects <ArrowRight size={16} />
              </Link>
            </div>
            <div ref={btnResumeRef}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 card-hover rounded-lg font-medium flex items-center gap-2 transition-all text-sm text-white border border-border backdrop-blur-sm"
              >
                <FileText size={16} className="text-accent" />
                Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
