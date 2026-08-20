import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-scroll';
import { profile } from '../data/profile';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <span className="text-primary font-medium">Available for Work</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            {profile.name}
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">
            {profile.title}
          </h2>

          <p className="text-gray-400 text-lg mb-8 max-w-2xl leading-relaxed">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              to="projects"
              smooth={true}
              offset={-70}
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-medium flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              Explore My Work <ArrowRight size={20} />
            </Link>
            <Link
              to="contact"
              smooth={true}
              offset={-70}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all hover:scale-105 cursor-pointer"
            >
              Contact Me
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all hover:scale-105"
            >
              Resume
            </a>
          </div>

          {/* Evidence Strip */}
          <div className="flex flex-wrap gap-8 mb-12">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
