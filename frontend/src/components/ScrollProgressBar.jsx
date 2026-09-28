import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-cyan-400 to-accent origin-left z-[60] shadow-[0_0_12px_rgba(61,220,151,0.7)] pointer-events-none"
    />
  );
};

export default ScrollProgressBar;
