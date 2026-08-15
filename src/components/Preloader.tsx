import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if already shown in this session
    const hasLoadedBefore = sessionStorage.getItem('jt_preloader_shown');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasLoadedBefore || prefersReduced) {
      onComplete();
      return;
    }

    sessionStorage.setItem('jt_preloader_shown', 'true');

    const duration = 1200; // ~1.2 seconds total duration
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(onComplete, 220);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <motion.div
      id="preloader-overlay"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -15,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060608] text-white px-4 select-none"
    >
      <div className="w-full max-w-sm flex flex-col items-center text-center">
        
        {/* 1. JT Monogram with fade in & subtle scale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative mb-5 flex h-14 w-14 items-center justify-center border border-white/25 bg-zinc-950 font-mono text-xl font-bold tracking-widest text-white shadow-xl"
        >
          <div className="absolute -top-1 -left-1 h-2 w-2 border-t-2 border-l-2 border-white" />
          <div className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 border-white" />
          JT
        </motion.div>

        {/* 2. JAY THESIYA with subtle letter-spacing animation */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: '0.35em', y: 8 }}
          animate={{ opacity: 1, letterSpacing: '0.12em', y: 0 }}
          transition={{ delay: 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-display uppercase tracking-wider"
        >
          JAY THESIYA
        </motion.h1>

        {/* 3. JAVA • WEB • DEVELOPER */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.4, ease: 'easeOut' }}
          className="text-[11px] sm:text-xs font-mono tracking-[0.28em] text-zinc-400 mb-6 uppercase"
        >
          JAVA • WEB • DEVELOPER
        </motion.p>

        {/* 4. Thin loading progress line 0 -> 100% */}
        <div className="w-48 sm:w-56 h-[2px] bg-zinc-900 overflow-hidden relative mb-3">
          <motion.div
            className="h-full bg-white transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percent indicator */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[10px] font-mono text-zinc-400 tracking-wider"
        >
          {progress}%
        </motion.span>

      </div>
    </motion.div>
  );
};
