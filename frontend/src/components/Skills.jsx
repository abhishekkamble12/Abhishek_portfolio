import { motion } from 'framer-motion';
import { skills } from '../data/skills';

const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="section-label">05 / Skills</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Engineering Capabilities
          </h2>
        </motion.div>

        {/* 5 columns on desktop, 2-3 on tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {skills.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="card rounded-xl p-5 border border-border/80 hover:border-accent/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <h3 className="mono text-xs text-accent mb-4 font-semibold tracking-wide uppercase">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs md:text-sm text-text-body hover:text-white transition-colors flex items-start gap-1.5"
                    >
                      <span className="text-accent/60 mono text-xs mt-0.5">›</span>
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
