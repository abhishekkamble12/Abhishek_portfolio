import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { certifications } from '../data/certifications';

const Certifications = () => {
  return (
    <section id="certifications" className="py-12">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Certifications</span>
          {/* Compact logo row */}
          <div className="flex flex-wrap gap-3 mt-3">
            {certifications.map((cert) => (
              <a
                key={cert.id}
                href={cert.link !== '#' ? cert.link : undefined}
                target={cert.link !== '#' ? '_blank' : undefined}
                rel={cert.link !== '#' ? 'noopener noreferrer' : undefined}
                className={`card rounded-lg px-4 py-2.5 flex items-center gap-2 group ${
                  cert.link !== '#'
                    ? 'hover:border-accent/30 cursor-pointer'
                    : 'cursor-default'
                } transition-colors`}
              >
                <div>
                  <span className="text-sm text-white font-medium group-hover:text-accent transition-colors">
                    {cert.title}
                  </span>
                  <span className="mx-2 text-text-muted">·</span>
                  <span className="mono text-xs text-text-muted">
                    {cert.issuer}
                  </span>
                </div>
                {cert.link !== '#' && (
                  <ExternalLink size={12} className="text-text-muted shrink-0" />
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
