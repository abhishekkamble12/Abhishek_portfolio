import React from 'react';

const projects = [
  {
    title: 'IntervueAI',
    image: 'https://via.placeholder.com/400x200?text=IntervueAI',
    description: 'Real-time mock interviews with AI, no forms or clicks just natural, personalized conversations.',
    demo: '#',
    details: '#',
  },
  {
    title: 'Blendy',
    image: 'https://via.placeholder.com/400x200?text=Blendy',
    description: 'A social app where you can connect in real-time, log in with one click, share moments, posts instantly.',
    demo: '#',
    details: '#',
  },
  {
    title: 'WATCHit',
    image: 'https://via.placeholder.com/400x200?text=WATCHit',
    description: 'A video streaming app made for easy, personal entertainment and everything you love to binge.',
    demo: '#',
    details: '#',
  },
];

const Portfolio = () => (
  <section id="portfolio" className="py-24 px-8 bg-gradient-to-br from-[#1a1a2e] to-[#232526]">
    <h2 className="text-4xl font-extrabold text-purple-400 mb-10 text-center">Portfolio</h2>
    <div className="flex flex-wrap justify-center gap-8">
      {projects.map((project, idx) => (
        <div key={idx} className="bg-[#23235b] rounded-2xl shadow-lg p-6 w-96 flex flex-col items-center text-white hover:scale-105 transition-transform">
          <img src={project.image} alt={project.title} className="rounded-xl mb-4 w-full h-48 object-cover" />
          <div className="text-2xl font-bold mb-2">{project.title}</div>
          <div className="text-gray-300 text-sm mb-4 text-center">{project.description}</div>
          <div className="flex gap-4">
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Live Demo</a>
            <a href={project.details} className="text-white hover:text-purple-400 transition">Details →</a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Portfolio; 