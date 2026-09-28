import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollPercent(Math.round(progress));
      }
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-40 p-3 bg-surface/90 hover:bg-surface text-accent border border-border hover:border-accent/50 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md cursor-pointer transition-all group"
        >
          {/* SVG Progress Ring */}
          <svg className="w-10 h-10 -rotate-90 pointer-events-none" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#232830"
              strokeWidth="2"
            />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#3DDC97"
              strokeWidth="2"
              strokeDasharray="97.4"
              strokeDashoffset={97.4 - (97.4 * scrollPercent) / 100}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>

          {/* Icon in Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ArrowUp size={16} className="text-white group-hover:text-accent group-hover:-translate-y-0.5 transition-all" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
