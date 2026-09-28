import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Sparkles, Loader2, ExternalLink, Bot, User,
  Trash2, ChevronDown, Zap, Brain, Code, Award, Briefcase
} from 'lucide-react';
import { Link } from 'react-scroll';
import { askAIStream } from '../lib/api';

// Simple markdown renderer (no external dep needed)
// Escapes HTML first to prevent XSS, then applies safe formatting
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderMarkdown(text) {
  if (!text) return '';
  // Escape HTML first to neutralize any injected tags/scripts
  let html = escapeHtml(text)
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-black/40 rounded-lg p-3 my-2 overflow-x-auto text-xs font-mono text-primary/90 border border-white/5"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-white/10 text-primary px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Headers
    .replace(/^### (.+)$/gm, '<h4 class="text-white font-semibold mt-3 mb-1">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 class="text-white font-bold mt-3 mb-1 text-lg">$1</h3>')
    // Bullet points
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-gray-300">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 text-gray-300 list-decimal">$2</li>')
    // Line breaks
    .replace(/\n/g, '<br/>');
  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li[^>]*>.*?<\/li>(?:<br\/>)?)+/g, (match) =>
    `<ul class="space-y-1 my-2">${match.replace(/<br\/>/g, '')}</ul>`
  );
  return html;
}

const questionCategories = [
  {
    icon: Briefcase,
    label: 'Experience',
    color: 'text-blue-400',
    questions: [
      "Summarize Abhishek's internship experience",
      "What backend systems has he built?",
      "Describe his work at VMK SI Pay",
    ],
  },
  {
    icon: Code,
    label: 'Projects',
    color: 'text-emerald-400',
    questions: [
      "Which projects use LangGraph or LLM agents?",
      "Tell me about Arishem's architecture",
      "What's the most technically complex project?",
    ],
  },
  {
    icon: Brain,
    label: 'AI/ML',
    color: 'text-purple-400',
    questions: [
      "What RAG systems has he built?",
      "Describe his ML and deep learning experience",
      "What NLP and voice AI work has he done?",
    ],
  },
  {
    icon: Award,
    label: 'Achievements',
    color: 'text-amber-400',
    questions: [
      "Tell me about hackathon achievements",
      "What open-source contributions has he made?",
      "What's his competitive programming record?",
    ],
  },
];

const ConfidenceMeter = ({ confidence }) => {
  const pct = Math.round(confidence * 100);
  const color = pct > 60 ? 'bg-emerald-500' : pct > 30 ? 'bg-amber-500' : 'bg-red-400';
  const label = pct > 60 ? 'High' : pct > 30 ? 'Medium' : 'Low';
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-text-muted mono">Confidence</span>
      <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
      <span className="text-text-muted mono">{label}</span>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex items-center gap-3">
    <div className="w-7 h-7 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
      <Bot className="text-accent w-3.5 h-3.5" />
    </div>
    <div className="bg-surface border border-border rounded-2xl rounded-bl-sm px-4 py-3">
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 bg-accent/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 bg-accent/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 bg-accent/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

import SectionHeader from './ui/SectionHeader';

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [streamingMeta, setStreamingMeta] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const metaRef = useRef(null); // For streaming meta closure

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText, scrollToBottom]);

  const handleSubmit = async (q) => {
    const text = (q || input).trim();
    if (!text || loading) return;

    setInput('');
    setActiveCategory(null);
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);
    setStreamingText('');
    setStreamingMeta(null);

    let accumulated = '';

    try {
      await askAIStream(text, {
        onToken: (token) => {
          accumulated += token;
          setStreamingText(accumulated);
        },
        onMeta: (meta) => {
          metaRef.current = meta;
          setStreamingMeta(meta);
        },
        onDone: () => {
          const meta = metaRef.current;
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: accumulated,
              sources: meta?.sources || [],
              confidence: meta?.confidence || 0,
            },
          ]);
          setStreamingText('');
          setStreamingMeta(null);
          metaRef.current = null;
          setLoading(false);
        },
        onError: (msg) => {
          setMessages((prev) => [...prev, { role: 'assistant', content: `⚠ ${msg}`, error: true }]);
          setLoading(false);
        },
      });
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `Connection error: ${err.message}`, error: true }]);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setStreamingText('');
    setStreamingMeta(null);
  };

  const getSectionTarget = (type) => {
    switch (type) {
      case 'project': return 'projects';
      case 'experience': return 'experience';
      case 'skill': return 'skills';
      case 'opensource': return 'opensource';
      case 'certification': return 'certifications';
      case 'achievement': return 'about';
      default: return 'about';
    }
  };

  return (
    <section id="ai-assistant" className="py-28 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="04"
          label="Interactive Intelligence"
          title="Ask About My Architecture & Experience"
          subtitle="Query my actual engineering codebase, architecture decisions, and metrics via a live RAG-grounded AI assistant."
          badge="Live Agent"
        />

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Main Chat Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card rounded-xl overflow-hidden flex flex-col"
            style={{ minHeight: '520px' }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm text-text-muted mono">RAG-Powered Assistant</span>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={12} />
                  Clear
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 min-h-[380px] max-h-[480px]">
              {/* Empty State */}
              {messages.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-5">
                    <Sparkles className="text-accent w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Career Intelligence</h3>
                  <p className="text-gray-500 text-sm text-center max-w-sm mb-6">
                    Ask about my projects, technical decisions, or career trajectory.
                    Select a category or type your question.
                  </p>

                  {/* Category Pills */}
                  <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
                    {questionCategories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.label}
                          onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-all ${
                            activeCategory === cat.label
                              ? 'bg-accent/10 border-accent/30 text-white'
                              : 'bg-surface border-border text-text-muted hover:border-accent/20 hover:text-white'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${cat.color}`} />
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Expanded Category Questions */}
                  <AnimatePresence>
                    {activeCategory && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full max-w-sm mt-3 space-y-1.5 overflow-hidden"
                      >
                        {questionCategories
                          .find((c) => c.label === activeCategory)
                          ?.questions.map((q) => (
                            <button
                              key={q}
                              onClick={() => handleSubmit(q)}
                              className="w-full text-left px-3 py-2 text-sm text-text-muted hover:text-white bg-surface hover:bg-accent/5 border border-border hover:border-accent/20 rounded-lg transition-all"
                            >
                              {q}
                            </button>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Message History */}
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 bg-accent/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="text-accent w-3.5 h-3.5" />
                      </div>
                    )}

                    <div className={`max-w-[85%] ${
                      msg.role === 'user'
                        ? 'bg-accent/10 border border-accent/20 rounded-2xl rounded-br-sm px-4 py-2.5'
                        : 'bg-surface border border-border rounded-2xl rounded-bl-sm px-4 py-2.5'
                    }`}>
                      {msg.role === 'assistant' ? (
                        <div
                          className={`text-sm leading-relaxed ${msg.error ? 'text-red-400' : 'text-gray-300'}`}
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                        />
                      ) : (
                        <p className="text-sm text-white">{msg.content}</p>
                      )}

                      {/* Confidence + Sources */}
                      {msg.confidence > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-border space-y-2">
                          <ConfidenceMeter confidence={msg.confidence} />
                          {msg.sources && msg.sources.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {msg.sources.map((src, j) => (
                                <Link
                                  key={j}
                                  to={getSectionTarget(src.type)}
                                  smooth={true}
                                  offset={-70}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent/10 text-accent text-[11px] rounded-full hover:bg-accent/20 transition-all cursor-pointer mono"
                                >
                                  {src.title.length > 30 ? src.title.slice(0, 28) + '…' : src.title}
                                  <ExternalLink size={9} />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <User className="text-gray-400 w-3.5 h-3.5" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Streaming Response */}
              {loading && streamingText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-7 h-7 bg-accent/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="text-accent w-3.5 h-3.5" />
                  </div>
                  <div className="max-w-[85%] bg-surface border border-border rounded-2xl rounded-bl-sm px-4 py-2.5">
                    {streamingMeta && <ConfidenceMeter confidence={streamingMeta.confidence} />}
                    <div
                      className="text-sm leading-relaxed text-gray-300 mt-1"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(streamingText) + '<span class="inline-block w-0.5 h-4 bg-primary/70 ml-0.5 animate-pulse" />' }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Typing Indicator (before first token) */}
              {loading && !streamingText && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about projects, skills, experience..."
                  disabled={loading}
                  className="flex-1 bg-bg border border-border rounded-xl px-4 py-2.5 text-white text-sm placeholder-text-muted focus:outline-none focus:border-accent/40 transition-colors disabled:opacity-50 mono"
                />
                <button
                  onClick={() => handleSubmit()}
                  disabled={loading || !input.trim()}
                  className="px-4 py-2.5 bg-accent hover:bg-accent/90 text-bg rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Sidebar — Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* How it works */}
            <div className="card rounded-xl p-4">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-accent" />
                How It Works
              </h4>
              <div className="space-y-2.5 text-xs text-gray-400">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                  <span>Your question is embedded and searched against the portfolio knowledge base</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                  <span>Top relevant chunks are retrieved via TF-IDF cosine similarity</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                  <span>Context is sent to GPT-OSS 120B (Groq) with a strict no-hallucination prompt</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                  <span>Response streams in real-time with source citations</span>
                </div>
              </div>
            </div>

            {/* Try Asking */}
            <div className="card rounded-xl p-4">
              <h4 className="text-sm font-semibold text-white mb-3">Recruiter Favorites</h4>
              <div className="space-y-1.5">
                {[
                  "What makes Abhishek stand out as a backend engineer?",
                  "Which project shows the most production experience?",
                  "Summarize his AI/ML capabilities",
                  "What cloud and infrastructure skills does he have?",
                  "Tell me about his competitive programming",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSubmit(q)}
                    disabled={loading}
                    className="w-full text-left px-2.5 py-2 text-[11px] text-text-muted hover:text-white bg-surface hover:bg-accent/5 rounded-lg border border-border hover:border-accent/20 transition-all disabled:opacity-50 mono"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack Badge */}
            <div className="card rounded-xl p-4 text-center">
              <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1 mono">Powered by</p>
              <p className="text-xs text-text-body mono">
                <span className="text-accent">Groq</span> · GPT-OSS 120B · TF-IDF · FastAPI
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
