import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import SectionHeader from './ui/SectionHeader';

const Skills = () => {
  return (
    <section id="skills" className="py-28 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="05"
          label="Core Stack"
          title="Technical Capabilities"
          subtitle="Specialized in full-stack AI engineering, distributed agent workflows, cloud-native deployments, and observability."
          badge="Full Stack & AI"
        />

        {/* 5 columns on desktop, 2-3 on tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {skills.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.08 }}
              className="card rounded-xl p-5 border border-border/80 hover:border-accent/40 transition-colors flex flex-col justify-between bg-surface/90 backdrop-blur-sm"
            >
              <div>
                <h3 className="mono text-xs text-accent mb-4 font-semibold tracking-wide uppercase">
                  {group.category}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs md:text-sm text-text-body hover:text-white transition-colors flex items-start gap-1.5"
                    >
                      <span className="text-accent/70 mono text-xs mt-0.5">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
