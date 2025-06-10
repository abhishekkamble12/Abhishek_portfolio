import React from 'react';

const certifications = [
  {
    title: 'Full Stack Web Development',
    issuer: 'Abhishek Kamble',
    year: 2024,
    link: '/certificates/certificate1.png',
    image: '/certificates/certificate1.png',
  },
  {
    title: 'React Advanced',
    issuer: 'Abhishek Kamble',
    year: 2023,
    link: '/certificates/certificate2.png',
    image: '/certificates/certificate2.png',
  },
  {
    title: 'Node.js Mastery',
    issuer: 'Abhishek Kamble',
    year: 2023,
    link: '/certificates/certificate3.png',
    image: '/certificates/certificate3.png',
  },
];

const Certifications = () => (
  <section id="certifications" className="py-24 px-8 bg-gradient-to-br from-[#232526] to-[#1a1a2e]">
    <h2 className="text-4xl font-extrabold text-purple-400 mb-10 text-center">Certifications</h2>
    <div className="flex flex-wrap justify-center gap-8">
      {certifications.map((cert, idx) => (
        <div key={idx} className="bg-[#23235b] rounded-2xl shadow-lg p-6 w-80 flex flex-col items-center text-white hover:scale-105 transition-transform">
          <a href={cert.link} target="_blank" rel="noopener noreferrer">
            <img src={cert.image} alt={cert.title} className="mb-4 rounded-lg w-64 h-40 object-cover border-2 border-purple-400 hover:opacity-90 transition" />
          </a>
          <div className="text-2xl font-bold mb-2">{cert.title}</div>
          <div className="text-gray-300 text-sm mb-2">{cert.issuer}</div>
          <div className="text-purple-400 text-lg mb-4">{cert.year}</div>
          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-purple-500 rounded-lg text-white hover:bg-purple-600 transition">View Certificate</a>
        </div>
      ))}
    </div>
  </section>
);

export default Certifications; 