import React from 'react';

const Navbar = () => (
  <nav className="w-full flex justify-between items-center py-6 px-8 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] shadow-lg fixed top-0 left-0 z-50">
    <div className="text-2xl font-bold text-purple-400">Abhishek Kamble</div>
    <ul className="flex space-x-8 text-lg text-white">
      <li><a href="#home" className="hover:text-purple-400 transition">Home</a></li>
      <li><a href="#about" className="hover:text-purple-400 transition">About</a></li>
      <li><a href="#portfolio" className="hover:text-purple-400 transition">Portfolio</a></li>
      <li><a href="#certifications" className="hover:text-purple-400 transition">Certifications</a></li>
      <li><a href="#experience" className="hover:text-purple-400 transition">Experience</a></li>
      <li><a href="#contact" className="hover:text-purple-400 transition">Contact</a></li>
    </ul>
  </nav>
);

export default Navbar; 
