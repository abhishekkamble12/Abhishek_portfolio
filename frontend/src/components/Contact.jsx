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
      // Fallback: do nothing
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
    <section id="contact" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="section-label">07 / Contact</span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Let's Build Something
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-text-body leading-relaxed">
              I'm available for full-time opportunities and interesting
              collaborations. Reach out via email or connect on LinkedIn.
            </p>

            {/* Email with copy */}
            <button
              onClick={copyEmail}
              className="card-hover rounded-xl px-5 py-4 flex items-center gap-3 w-full text-left group"
            >
              <div className="p-2 bg-accent/10 rounded-lg">
                <Mail size={18} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-text-muted mono">Email</div>
                <div className="text-sm text-white truncate">
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
                className="card-hover rounded-xl px-5 py-4 flex items-center gap-3 flex-1 group"
              >
                <Github size={18} className="text-text-muted group-hover:text-accent transition-colors" />
                <span className="text-sm text-white">GitHub</span>
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover rounded-xl px-5 py-4 flex items-center gap-3 flex-1 group"
              >
                <Linkedin size={18} className="text-text-muted group-hover:text-accent transition-colors" />
                <span className="text-sm text-white">LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card rounded-xl p-6"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="text-accent w-12 h-12 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">
                  Message Sent
                </h3>
                <p className="text-text-muted text-sm mb-4">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus(null)}
                  className="px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm transition-colors hover:bg-accent/20 mono"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-text-muted mono mb-1 block" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted mono mb-1 block" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-text-muted mono mb-1 block" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-xs text-text-muted mono mb-1 block" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
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
                  className="w-full bg-accent text-bg font-medium py-3 rounded-lg hover:bg-accent/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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
