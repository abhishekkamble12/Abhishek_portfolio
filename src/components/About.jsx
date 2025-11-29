import { motion } from 'framer-motion';
import { Calendar, Code, Briefcase, User } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Code size={20} />, label: 'LeetCode Problems', value: '50+' },
    { icon: <Briefcase size={20} />, label: 'Internships', value: '1' },
    { icon: <User size={20} />, label: 'Hackathons', value: 'Top 20' },
  ];

  return (
    <section id="about" className="py-20 bg-dark-lighter/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image/Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl rotate-6 opacity-50" />
              <div className="absolute inset-0 bg-dark-lighter rounded-3xl -rotate-3 border border-white/10 overflow-hidden">
                {/* Replace with actual image */}
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
              I am a Bachelor of Technology student in Electronic and Telecommunication at MIT AOE Pune. 
              My passion lies in bridging the gap between hardware and intelligent software systems.
            </p>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              I have hands-on experience in Machine Learning, Full Stack Development, and Agentic AI. 
              I've built robust applications using the MERN stack and engineered complex AI agents using LangChain and LangGraph. 
              I am an active problem solver on LeetCode and a hackathon enthusiast.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="p-4 glass rounded-xl text-center hover:bg-white/5 transition-colors">
                  <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
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
