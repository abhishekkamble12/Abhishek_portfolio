import { motion } from 'framer-motion';
import { GitPullRequest, CheckCircle, Trophy } from 'lucide-react';
import { openSource, achievements } from '../data/openSource';

const OpenSource = () => {
  return (
    <section id="opensource" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="section-label">04 / Open Source</span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Open Source Contributions
          </h2>
        </motion.div>

        {/* GitHub-style PR cards */}
        <div className="space-y-4 mb-16">
          {openSource.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card rounded-xl p-6"
            >
              {/* Repo header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="mono text-xs text-accent px-2 py-0.5 bg-accent/10 rounded-md border border-accent/10">
                  {project.org}
                </span>
                <span className="mono text-sm text-white font-medium">
                  {project.repo}
                </span>
              </div>

              <p className="text-sm text-text-body mb-4 leading-relaxed max-w-3xl">
                {project.description}
              </p>

              {/* PR list */}
              <div className="space-y-2 mb-4">
                {project.prs.map((pr) => (
                  <a
                    key={pr.number}
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/5 transition-colors group"
                  >
                    <GitPullRequest size={14} className="text-accent shrink-0" />
                    <span className="mono text-xs text-text-muted">
                      #{pr.number}
                    </span>
                    <span className="text-sm text-text-body group-hover:text-white transition-colors">
                      {pr.title}
                    </span>
                    <span className="ml-auto flex items-center gap-1 mono text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20 shrink-0">
                      <CheckCircle size={10} />
                      Merged
                    </span>
                  </a>
                ))}
              </div>

              {/* Tech */}
              <div className="flex gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="mono text-[10px] text-text-muted px-2 py-0.5 bg-surface rounded border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Trophy size={16} className="text-accent" />
            Achievements
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {achievements.map((a) => (
              <div key={a.label} className="card rounded-lg px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">
                    {a.label}
                  </span>
                  <span className="mono text-xs text-accent">{a.value}</span>
                </div>
                <p className="text-xs text-text-muted">{a.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSource;
