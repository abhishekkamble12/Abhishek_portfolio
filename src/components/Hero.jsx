import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <span className="text-primary font-medium">Available for Work</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm <span className="text-gradient">Abhishek Kamble</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-200">
            Full Stack Developer | AI Engineer
          </h2>
          
          <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
            Building intelligent, scalable, and human-centered digital experiences. 
            Specializing in MERN Stack, Python, and Agentic AI Systems.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link 
              to="portfolio" 
              smooth={true} 
              offset={-70}
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-medium flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              View Projects <ArrowRight size={20} />
            </Link>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all hover:scale-105"
            >
              Contact Me
            </a>
          </div>

          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" className="text-gray-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/abhishek-softwaredev" target="_blank" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:kambleabhshek7744@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative w-full aspect-square max-w-[500px] mx-auto">
            {/* Abstract Shapes */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full opacity-20 animate-[pulse_4s_ease-in-out_infinite]" />
            <div className="absolute inset-4 bg-dark rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
               {/* Placeholder for 3D Image or Avatar */}
               <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                  <div className="text-9xl animate-[float_6s_ease-in-out_infinite]">🚀</div>
               </div>
            </div>
            
            {/* Floating Tech Badges */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 p-4 glass rounded-2xl border border-white/10"
            >
              <span className="text-2xl">⚛️</span>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 -left-8 p-4 glass rounded-2xl border border-white/10"
            >
              <span className="text-2xl">🐍</span>
            </motion.div>

            <motion.div 
              animate={{ x: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 -right-12 p-4 glass rounded-2xl border border-white/10"
            >
              <span className="text-2xl">🤖</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
