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

function App() {
  return (
    <div className="bg-bg min-h-screen text-text-body selection:bg-accent selection:text-bg">
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
    </div>
  );
}

export default App;
