import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experience } from '../data/experience';

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-gray-400">My career timeline and key milestones.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary to-transparent opacity-30" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)] z-10 mt-6" />

                {/* Content */}
                <div className="flex-1 ml-6 md:ml-0">
                  <div
                    className={`glass p-6 rounded-xl border-l-4 border-primary hover:bg-white/5 transition-colors ${
                      index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 mb-2 text-primary text-sm font-medium ${
                        index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                      }`}
                    >
                      <Calendar size={14} />
                      {exp.period}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">
                      {exp.role}
                    </h3>
                    <div
                      className={`flex items-center gap-2 text-gray-400 mb-1 text-sm font-medium ${
                        index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                      }`}
                    >
                      <Briefcase size={14} />
                      {exp.company}
                    </div>
                    <div
                      className={`flex items-center gap-2 text-gray-500 mb-4 text-xs ${
                        index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                      }`}
                    >
                      <MapPin size={12} />
                      {exp.location}
                    </div>

                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="text-gray-400 text-sm leading-relaxed"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 bg-white/5 rounded text-gray-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty Space for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
