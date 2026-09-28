import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { experience } from '../data/experience';
import SectionHeader from './ui/SectionHeader';

const Experience = () => {
  return (
    <section id="experience" className="py-28 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="02"
          label="Track Record"
          title="Work Experience"
          subtitle="Hands-on software engineering and machine learning roles shipping production services to real users."
          badge="Verified"
        />

        {/* Single-column timeline, left-aligned */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-border to-border" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="relative pl-8"
              >
                {/* Timeline dot with glowing pulse */}
                <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-bg border-2 border-accent shadow-[0_0_10px_rgba(61,220,151,0.6)]" />

                {/* Card */}
                <div className="card rounded-xl p-6 md:p-8 hover:border-accent/40 transition-all shadow-lg bg-surface/90 backdrop-blur-sm">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <p className="text-accent font-medium text-sm mono">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-text-muted mono text-xs">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-accent" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-accent" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullets — number first */}
                  <ul className="space-y-3 mb-6">
                    {exp.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-sm text-text-body leading-relaxed flex gap-2.5"
                      >
                        <span className="text-accent mono text-xs mt-0.5 shrink-0 font-bold">
                          ›
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/60">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="mono text-[11px] text-text-muted px-2.5 py-1 bg-surface rounded border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
