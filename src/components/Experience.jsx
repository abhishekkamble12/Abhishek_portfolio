import React from 'react';

const experiences = [
  {
    title: 'Web Developer Intern',
    company: 'Tech Solutions',
    year: '2023',
    description: 'Worked on building scalable web applications and contributed to frontend and backend development.',
  },
  {
    title: 'Freelance Developer',
    company: 'Self-employed',
    year: '2022-2023',
    description: 'Developed multiple client projects using React, Node.js, and PostgreSQL.',
  },
];

const Experience = () => (
  <section id="experience" className="py-24 px-8 bg-gradient-to-br from-[#1a1a2e] to-[#232526]">
    <h2 className="text-4xl font-extrabold text-purple-400 mb-10 text-center">Experience</h2>
    <div className="flex flex-wrap justify-center gap-8">
      {experiences.map((exp, idx) => (
        <div key={idx} className="bg-[#23235b] rounded-2xl shadow-lg p-6 w-96 flex flex-col items-center text-white hover:scale-105 transition-transform">
          <div className="text-2xl font-bold mb-2">{exp.title}</div>
          <div className="text-gray-300 text-sm mb-2">{exp.company}</div>
          <div className="text-purple-400 text-lg mb-4">{exp.year}</div>
          <div className="text-gray-200 text-center">{exp.description}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Experience; 