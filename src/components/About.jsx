import React from 'react';

const About = () => (
  <section id="about" className="min-h-[60vh] flex flex-col items-center justify-center px-8 py-24 bg-gradient-to-br from-[#1a1a2e] to-[#232526]">
    <h2 className="text-4xl font-extrabold text-purple-400 mb-6">About Me</h2>
    <p className="text-lg text-gray-200 max-w-2xl text-center mb-8">
      Hello, I'm <span className="font-bold text-white">Abhishek Kamble</span> passionate about building smart and scalable web & mobile applications. I've completed a full-stack development course and constantly explore new technologies to refine my skills. Focused on continuous learning, I aim to transition into the IT industry by 2027 and eventually move towards AI and data science.
    </p>
    <div className="flex gap-6">
      <a href="https://drive.google.com/file/d/1qt2Y8SzFHXbV31HVrNEIYPTPIutyJUQd/view?usp=drivesdk" download className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition">Download CV</a>
      <a href="#portfolio" className="px-6 py-3 border border-purple-400 text-purple-400 rounded-lg hover:bg-purple-400 hover:text-white transition">View Projects</a>
    </div>
  </section>
);

export default About; 
