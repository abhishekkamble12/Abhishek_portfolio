import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';
import { certifications } from '../data/certifications';

const Certifications = () => {
  return (
    <section id="certifications" className="py-16 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Award size={18} className="text-accent" />
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              Industry Certifications
            </h3>
          </div>

          {/* Compact logo/badge row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {certifications.map((cert) => (
              <a
                key={cert.id}
                href={cert.link !== '#' ? cert.link : undefined}
                target={cert.link !== '#' ? '_blank' : undefined}
                rel={cert.link !== '#' ? 'noopener noreferrer' : undefined}
                className={`card rounded-xl p-4 flex items-center justify-between group bg-surface/80 backdrop-blur-sm ${
                  cert.link !== '#'
                    ? 'hover:border-accent/40 cursor-pointer'
                    : 'cursor-default'
                } transition-colors`}
              >
                <div>
                  <div className="text-sm text-white font-semibold group-hover:text-accent transition-colors">
                    {cert.title}
                  </div>
                  <div className="mono text-xs text-text-muted mt-0.5">
                    {cert.issuer}
                  </div>
                </div>
                {cert.link !== '#' && (
                  <ExternalLink size={14} className="text-text-muted group-hover:text-accent transition-colors shrink-0 ml-2" />
                )}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
