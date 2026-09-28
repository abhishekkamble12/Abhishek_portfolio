import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import OpenSource from './components/OpenSource';
import AIAssistant from './components/AIAssistant';
import Skills from './components/Skills';
import About from './components/About';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <div className="bg-bg min-h-screen text-text-body selection:bg-accent selection:text-bg relative overflow-x-hidden">
      {/* Top glowing scroll progress bar */}
      <ScrollProgressBar />

      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <OpenSource />
      <AIAssistant />
      <Skills />
      <About />
      <Certifications />
      <Contact />
      <Footer />

      {/* Floating dynamic circular scroll-to-top button */}
      <BackToTop />
    </div>
  );
}

export default App;
