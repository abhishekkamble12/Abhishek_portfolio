import { Github, Linkedin, Heart } from 'lucide-react';
import { profile } from '../data/profile';

const Footer = () => {
  return (
    <footer className="bg-dark-lighter py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>

        <div className="text-gray-500 text-sm flex items-center gap-1">
          Made with <Heart size={14} className="text-red-500 fill-red-500" /> using React & Tailwind
        </div>
      </div>
    </footer>
  );
};

export default Footer;
