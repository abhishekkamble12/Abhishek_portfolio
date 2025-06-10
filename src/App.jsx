import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Contact from './components/Contact';
import './index.css';

function App() {
  return (
    <div className="bg-[#181823] min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Portfolio />
      <Certifications />
      <Experience />
      <Contact />
    </div>
  );
}

export default App;
