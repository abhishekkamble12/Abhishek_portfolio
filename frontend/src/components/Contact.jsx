import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Copy,
  CheckCircle,
  Send,
  AlertCircle,
} from 'lucide-react';
import { profile } from '../data/profile';
import { submitContact } from '../lib/api';
import SectionHeader from './ui/SectionHeader';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      await submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  const inputClass =
    'w-full bg-surface border border-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors mono';

  return (
    <section id="contact" className="py-28 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="07"
          label="Initiate Transmission"
          title="Let's Build Together"
          subtitle="Open for full-time Software Engineer, Backend Engineer, and AI/ML Engineer opportunities."
          badge="Available Now"
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-6"
          >
            <p className="text-text-body leading-relaxed text-base">
              I'm actively interviewing for full-time engineering roles.
              Feel free to send a direct email, submit the form, or connect on LinkedIn and GitHub.
            </p>

            {/* Email with copy */}
            <button
              onClick={copyEmail}
              className="card-hover rounded-xl px-5 py-4 flex items-center gap-3 w-full text-left group bg-surface/90 backdrop-blur-sm cursor-pointer shadow-md"
            >
              <div className="p-2 bg-accent/10 rounded-lg">
                <Mail size={18} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-text-muted mono">Direct Email</div>
                <div className="text-sm text-white truncate font-medium">
                  {profile.email}
                </div>
              </div>
              {copied ? (
                <CheckCircle size={16} className="text-green-400 shrink-0" />
              ) : (
                <Copy
                  size={16}
                  className="text-text-muted group-hover:text-accent transition-colors shrink-0"
                />
              )}
            </button>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover rounded-xl px-5 py-4 flex items-center gap-3 flex-1 group bg-surface/90 backdrop-blur-sm cursor-pointer"
              >
                <Github size={18} className="text-text-muted group-hover:text-accent transition-colors" />
                <span className="text-sm text-white font-medium">GitHub</span>
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover rounded-xl px-5 py-4 flex items-center gap-3 flex-1 group bg-surface/90 backdrop-blur-sm cursor-pointer"
              >
                <Linkedin size={18} className="text-text-muted group-hover:text-accent transition-colors" />
                <span className="text-sm text-white font-medium">LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="card rounded-xl p-6 md:p-8 bg-surface/90 backdrop-blur-sm shadow-xl"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="text-accent w-12 h-12 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  Message Sent
                </h3>
                <p className="text-text-muted text-sm mb-4">
                  Thanks for reaching out! I will respond promptly.
                </p>
                <button
                  onClick={() => setStatus(null)}
                  className="px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm transition-colors hover:bg-accent/20 mono cursor-pointer"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-text-muted mono mb-1.5 block" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Alex Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted mono mb-1.5 block" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-text-muted mono mb-1.5 block" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Role inquiry / Collaboration"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-xs text-text-muted mono mb-1.5 block" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    placeholder="Let's connect regarding..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={14} />
                    <span className="mono text-xs">{errorMsg || 'Something went wrong.'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-accent text-bg font-semibold py-3.5 rounded-lg hover:bg-accent/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer shadow-[0_0_20px_rgba(61,220,151,0.2)] hover:shadow-[0_0_25px_rgba(61,220,151,0.35)]"
                >
                  {status === 'sending' ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
