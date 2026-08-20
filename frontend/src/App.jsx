import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIAssistant from './components/AIAssistant';
import Skills from './components/Skills';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import OpenSource from './components/OpenSource';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-dark min-h-screen text-white selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <AIAssistant />
      <Skills />
      <Projects />
      <Experience />
      <OpenSource />
      <About />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
