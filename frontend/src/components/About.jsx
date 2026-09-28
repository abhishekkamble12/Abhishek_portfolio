import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
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

          {/* What I'm learning */}
          <p className="text-text-body text-base mb-5 leading-relaxed">
            Currently deepening my work in multi-agent orchestration with LangGraph,
            voice AI pipelines, and production-grade observability with OpenTelemetry.
            I contribute to CNCF open-source projects to stay close to the tooling I use.
          </p>

          {/* What role I want */}
          <p className="text-text-body text-base mb-8 leading-relaxed">
            I'm looking for roles where I can build AI-powered backend systems —
            RAG platforms, agent pipelines, or ML-serving infrastructure — in a team
            that ships often and values engineering rigor.
          </p>

          {/* Education */}
          <div className="card rounded-xl p-5 inline-flex items-center gap-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <GraduationCap className="text-accent" size={20} />
            </div>
            <div>
              <div className="text-white font-medium text-sm">
                {profile.education.degree}
              </div>
              <div className="text-text-muted text-xs mono">
                {profile.education.institute}
              </div>
              <div className="text-text-muted text-xs mono mt-0.5">
                {profile.education.period} · CGPA: {profile.education.cgpa}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
