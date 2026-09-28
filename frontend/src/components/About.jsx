import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';
import { profile } from '../data/profile';

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="section-label">06 / About</span>
          <h2 className="text-3xl md:text-4xl font-bold">
            About Me
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          {/* What I build */}
          <p className="text-text-body text-base mb-5 leading-relaxed">
            {profile.summary}
          </p>

          {/* What I'm learning & working on */}
          <p className="text-text-body text-base mb-5 leading-relaxed">
            I specialize in orchestrating stateful multi-agent systems with LangGraph,
            architecting hybrid RAG with BM25/FAISS and Reciprocal Rank Fusion,
            and establishing distributed tracing with OpenTelemetry.
            Through the Linux Foundation LFX Mentorship program, I contribute to CNCF incubating tooling
            to stay grounded in production engineering best practices.
          </p>

          {/* What role I want */}
          <p className="text-text-body text-base mb-8 leading-relaxed">
            I'm looking for engineering roles where I can ship resilient LLM applications,
            event-driven microservices, and high-performance backend pipelines in high-ownership teams.
          </p>

          {/* Education */}
          <div className="card rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2.5 bg-accent/10 rounded-lg text-accent shrink-0">
                <GraduationCap size={22} />
              </div>
              <div>
                <div className="text-white font-semibold text-base">
                  {profile.education.degree}
                </div>
                <div className="text-text-muted text-sm mono">
                  {profile.education.institute}
                </div>
                <div className="text-accent text-xs mono mt-1">
                  {profile.education.period} · CGPA: {profile.education.cgpa}
                </div>
              </div>
            </div>

            {/* Coursework */}
            {profile.education.coursework && (
              <div className="pt-4 border-t border-border flex flex-wrap items-center gap-2">
                <span className="text-xs text-text-muted mono flex items-center gap-1.5 mr-1">
                  <BookOpen size={13} className="text-accent" /> Coursework:
                </span>
                {profile.education.coursework.map((course) => (
                  <span
                    key={course}
                    className="mono text-[11px] text-text-muted bg-surface px-2.5 py-1 rounded border border-border"
                  >
                    {course}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
