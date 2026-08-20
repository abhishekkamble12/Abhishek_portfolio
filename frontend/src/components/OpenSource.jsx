import { motion } from 'framer-motion';
import { GitPullRequest, ExternalLink, Trophy } from 'lucide-react';
import { openSource, achievements } from '../data/openSource';

const OpenSource = () => {
  return (
    <section id="opensource" className="py-20 bg-dark-lighter/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Open Source & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Contributing to the open-source ecosystem and competing at the highest levels.
          </p>
        </motion.div>

        {/* Open Source Contributions */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {openSource.map((contribution, index) => (
            <motion.div
              key={contribution.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-xl hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {contribution.project}
                  </h3>
                  <span className="text-sm text-primary font-medium">
                    {contribution.org}
                  </span>
                </div>
                <span className="text-xs px-3 py-1 bg-white/5 rounded-full text-gray-400">
                  {contribution.repo}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {contribution.description}
              </p>

              {/* PRs */}
              <div className="space-y-3">
                {contribution.prs.map((pr) => (
                  <a
                    key={pr.number}
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                  >
                    <GitPullRequest size={16} className="text-green-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-white group-hover:text-primary transition-colors">
                        {pr.title}
                      </span>
                      <span className="text-xs text-gray-500 block">
                        PR #{pr.number}
                      </span>
                    </div>
                    <ExternalLink size={14} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {contribution.tech.map((t) => (
                  <span key={t} className="text-xs text-gray-500">
                    #{t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass p-6 rounded-xl text-center hover:bg-white/5 transition-colors"
            >
              <Trophy className="text-primary w-6 h-6 mx-auto mb-3" />
              <div className="text-lg font-bold text-white mb-1">
                {achievement.value}
              </div>
              <div className="text-sm text-primary font-medium mb-2">
                {achievement.label}
              </div>
              <p className="text-xs text-gray-500">{achievement.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
