import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { experience } from '../data/experience';

const Experience = () => {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="section-label">03 / Experience</span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Work Experience
          </h2>
        </motion.div>

        {/* Single-column timeline, left-aligned */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-10">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-bg border-2 border-accent" />

                {/* Card */}
                <div className="card rounded-xl p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {exp.role}
                      </h3>
                      <p className="text-accent font-medium text-sm">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-text-muted mono text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullets — number first */}
                  <ul className="space-y-2 mb-4">
                    {exp.bullets.slice(0, 3).map((bullet, i) => (
                      <li
                        key={i}
                        className="text-sm text-text-body leading-relaxed flex gap-2"
                      >
                        <span className="text-accent mono text-xs mt-0.5 shrink-0">
                          ›
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="mono text-[10px] text-text-muted px-2 py-0.5 bg-surface rounded border border-border"
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
