import React from 'react';

const Hero = () => (
  <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 pt-32 pb-12 bg-gradient-to-br from-[#232526] to-[#1a1a2e]">
    <div className="flex-1">
      <div className="mb-4">
        <span className="inline-block px-4 py-2 bg-[#23235b] text-purple-300 rounded-full shadow-lg mb-6">Ready to Innovate</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2">
        Full Stack <span className="text-purple-400">Developer</span>
      </h1>
      <h2 className="text-2xl text-gray-300 mb-4">Tech Enthusiast</h2>
      <p className="text-gray-400 mb-6 max-w-xl">Enhancing digital experiences that are smooth, scalable, and made to impress.</p>
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="px-4 py-1 bg-[#23235b] text-white rounded-full">React</span>
        <span className="px-4 py-1 bg-[#23235b] text-white rounded-full">Javascript</span>
        <span className="px-4 py-1 bg-[#23235b] text-white rounded-full">Node.js</span>
        <span className="px-4 py-1 bg-[#23235b] text-white rounded-full">PostgreSQL</span>
      </div>
      <div className="flex gap-4 mb-8">
        <a href="#portfolio" className="px-6 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition">Projects</a>
        <a href="#contact" className="px-6 py-2 bg-[#23235b] text-white rounded-lg shadow hover:bg-purple-700 transition">Contact</a>
      </div>
      <div className="flex gap-6 mt-4">
        <a href="#" className="text-white hover:text-purple-400"><i className="fab fa-github text-2xl"></i></a>
        <a href="#" className="text-white hover:text-purple-400"><i className="fab fa-linkedin text-2xl"></i></a>
        <a href="#" className="text-white hover:text-purple-400"><i className="fab fa-instagram text-2xl"></i></a>
      </div>
    </div>
    <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
      {/* Illustration Placeholder */}
      <div className="w-80 h-80 bg-gradient-to-tr from-purple-500 to-blue-400 rounded-3xl flex items-center justify-center shadow-2xl">
        <span className="text-7xl text-white">💻</span>
      </div>
    </div>
  </section>
);

export default Hero; 