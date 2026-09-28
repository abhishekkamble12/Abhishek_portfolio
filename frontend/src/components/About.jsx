import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';
import { profile } from '../data/profile';
import SectionHeader from './ui/SectionHeader';

const About = () => {
  return (
    <section id="about" className="py-28 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="06"
          label="Profile & Foundation"
          title="Engineering Background"
          subtitle="A summary of my background, problem-solving philosophy, and academic foundation."
          badge="MITAOE"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-3xl space-y-6"
        >
          {/* What I build */}
          <p className="text-text-body text-base md:text-lg leading-relaxed">
            {profile.summary}
          </p>

          {/* What I'm learning & working on */}
          <p className="text-text-body text-base md:text-lg leading-relaxed">
            I specialize in orchestrating stateful multi-agent systems with LangGraph,
            architecting hybrid RAG with BM25/FAISS and Reciprocal Rank Fusion,
            and establishing distributed tracing with OpenTelemetry.
            Through the Linux Foundation LFX Mentorship program, I contribute to CNCF incubating tooling
            to stay grounded in production engineering best practices.
          </p>

          {/* What role I want */}
          <p className="text-text-body text-base md:text-lg leading-relaxed">
            I'm looking for engineering roles where I can ship resilient LLM applications,
            event-driven microservices, and high-performance backend pipelines in high-ownership teams.
          </p>

          {/* Education Card */}
          <div className="card rounded-xl p-6 md:p-8 hover:border-accent/40 transition-all bg-surface/90 backdrop-blur-sm shadow-lg mt-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-xl text-accent shrink-0 border border-accent/20">
                <GraduationCap size={24} />
              </div>
              <div>
                <div className="text-white font-bold text-lg">
                  {profile.education.degree}
                </div>
                <div className="text-text-muted text-sm mono mt-0.5">
                  {profile.education.institute}
                </div>
                <div className="text-accent text-xs mono mt-1.5 font-semibold">
                  {profile.education.period} · CGPA: {profile.education.cgpa}
                </div>
              </div>
            </div>

            {/* Coursework */}
            {profile.education.coursework && (
              <div className="pt-4 border-t border-border/70 flex flex-wrap items-center gap-2">
                <span className="text-xs text-text-muted mono flex items-center gap-1.5 mr-1 font-medium">
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
