import React from 'react';

const Contact = () => (
  <section id="contact" className="py-24 px-8 bg-gradient-to-br from-[#232526] to-[#1a1a2e] flex flex-col items-center">
    <h2 className="text-4xl font-extrabold text-purple-400 mb-10 text-center">Contact</h2>
    <form className="bg-[#23235b] rounded-2xl shadow-lg p-8 w-full max-w-lg flex flex-col gap-6 mb-8">
      <input type="text" placeholder="Your Name" className="px-4 py-3 rounded-lg bg-[#1a1a2e] text-white focus:outline-none" />
      <input type="email" placeholder="Your Email" className="px-4 py-3 rounded-lg bg-[#1a1a2e] text-white focus:outline-none" />
      <textarea placeholder="Your Message" rows="4" className="px-4 py-3 rounded-lg bg-[#1a1a2e] text-white focus:outline-none" />
      <button type="submit" className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition">Send Message</button>
    </form>
    <div className="flex gap-8 mt-4">
      <a href="#" className="text-white hover:text-purple-400 text-2xl"><i className="fab fa-github"></i></a>
      <a href="#" className="text-white hover:text-purple-400 text-2xl"><i className="fab fa-linkedin"></i></a>
      <a href="#" className="text-white hover:text-purple-400 text-2xl"><i className="fab fa-instagram"></i></a>
    </div>
  </section>
);

export default Contact; 