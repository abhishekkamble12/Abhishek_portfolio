import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const certifications = [
  {
    id: 1,
    title: "OCI AI Foundations Associate",
    issuer: "Oracle Cloud Infrastructure",
    date: "2025",
    image: "https://via.placeholder.com/100", // Replace with logo
    link: "#"
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Licenses & <span className="text-gradient">Certifications</span></h2>
          <p className="text-gray-400">Continuous learning and professional development.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.a
              href={cert.link}
              target="_blank"
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-xl flex items-center gap-4 hover:bg-white/5 hover:border-primary/30 transition-all group"
            >
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                <Award className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-400 mb-1">{cert.issuer}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Issued {cert.date}</span>
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;