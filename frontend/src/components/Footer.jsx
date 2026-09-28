import { Github, Linkedin } from 'lucide-react';
import { profile } from '../data/profile';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="mono text-xs text-text-muted text-center sm:text-left">
            Built with React, FastAPI \u0026 a RAG pipeline —{' '}
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              source on GitHub
            </a>
          </p>

          <div className="flex items-center gap-4">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <span className="mono text-xs text-text-muted">
              © {year}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
