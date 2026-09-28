import { motion } from 'framer-motion';
import { GitPullRequest, CheckCircle, Trophy } from 'lucide-react';
import { openSource, achievements } from '../data/openSource';
import SectionHeader from './ui/SectionHeader';

const OpenSource = () => {
  return (
    <section id="opensource" className="py-28 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="03"
          label="Ecosystem & Community"
          title="Open Source & Honors"
          subtitle="Direct code contributions to CNCF distributed tracing and edge computing projects through the Linux Foundation LFX Mentorship."
          badge="CNCF Contributor"
        />

        {/* GitHub-style PR cards */}
        <div className="space-y-5 mb-20">
          {openSource.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.12 }}
              className="card rounded-xl p-6 md:p-8 hover:border-accent/40 transition-all shadow-lg bg-surface/90 backdrop-blur-sm"
            >
              {/* Repo header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="mono text-xs text-accent px-2.5 py-1 bg-accent/10 rounded-md border border-accent/20">
                  {project.org}
                </span>
                <span className="mono text-sm sm:text-base text-white font-semibold">
                  {project.repo}
                </span>
              </div>

              <p className="text-sm text-text-body mb-5 leading-relaxed max-w-3xl">
                {project.description}
              </p>

              {/* PR list */}
              <div className="space-y-2 mb-5">
                {project.prs.map((pr) => (
                  <a
                    key={pr.number}
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-surface hover:bg-accent/10 border border-border hover:border-accent/30 transition-colors group cursor-pointer"
                  >
                    <GitPullRequest size={15} className="text-accent shrink-0" />
                    <span className="mono text-xs text-text-muted">
                      #{pr.number}
                    </span>
                    <span className="text-sm text-text-body group-hover:text-white transition-colors truncate">
                      {pr.title}
                    </span>
                    <span className="ml-auto flex items-center gap-1 mono text-[11px] text-green-400 bg-green-400/10 px-2.5 py-0.5 rounded-full border border-green-400/20 shrink-0">
                      <CheckCircle size={11} />
                      Merged
                    </span>
                  </a>
                ))}
              </div>

              {/* Tech */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/60">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="mono text-[11px] text-text-muted px-2.5 py-0.5 bg-surface rounded border border-border"
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
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={18} className="text-accent" />
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              Hackathons & Competitive Ratings
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {achievements.map((a) => (
              <div
                key={a.label}
                className="card rounded-xl p-4 hover:border-accent/40 transition-colors bg-surface/80 backdrop-blur-sm"
              >
                <div className="mono text-xs text-accent font-semibold mb-1">
                  {a.value}
                </div>
                <div className="text-sm font-bold text-white mb-1">
                  {a.label}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {a.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSource;
