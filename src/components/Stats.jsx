import React from 'react';

const stats = [
  {
    label: 'TOTAL PROJECTS',
    value: 4,
    description: 'Innovative web & mobile solutions crafted',
  },
  {
    label: 'CERTIFICATES',
    value: 3,
    description: 'Professional skills validated',
  },
  {
    label: 'YEARS OF EXPERIENCE',
    value: 2,
    description: 'Continuous learning journey',
  },
];

const Stats = () => (
  <section className="w-full flex flex-col md:flex-row justify-center items-center gap-8 py-12 bg-gradient-to-br from-[#232526] to-[#1a1a2e]">
    {stats.map((stat, idx) => (
      <div key={idx} className="bg-[#23235b] rounded-2xl shadow-lg p-8 w-72 flex flex-col items-center text-white hover:scale-105 transition-transform">
        <div className="text-5xl font-extrabold text-purple-400 mb-2">{stat.value}</div>
        <div className="text-lg font-semibold mb-1">{stat.label}</div>
        <div className="text-gray-300 text-sm text-center">{stat.description}</div>
      </div>
    ))}
  </section>
);

export default Stats; 