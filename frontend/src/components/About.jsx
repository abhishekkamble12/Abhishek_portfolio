import { motion } from 'framer-motion';
import { GraduationCap, User } from 'lucide-react';
import { profile } from '../data/profile';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl rotate-6 opacity-50" />
              <div className="absolute inset-0 bg-dark-lighter rounded-3xl -rotate-3 border border-white/10 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <User size={100} className="text-gray-600" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>

            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              {profile.summary}
            </p>

            <div className="flex items-center gap-3 mb-6 p-4 glass rounded-xl">
              <GraduationCap className="text-primary shrink-0" size={20} />
              <div>
                <div className="text-white font-medium text-sm">
                  {profile.education.degree}
                </div>
                <div className="text-gray-500 text-xs">
                  {profile.education.institute} &middot; {profile.education.period}
                </div>
                <div className="text-primary text-xs font-medium">
                  CGPA: {profile.education.cgpa}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 glass rounded-xl text-center hover:bg-white/5 transition-colors"
                >
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
