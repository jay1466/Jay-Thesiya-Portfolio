import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroVideoProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  '> Initializing Jay Thesiya Portfolio v3.2.1...',
  '> Loading Spring Boot modules... [OK]',
  '> Connecting database layer... [OK]',
  '> Compiling experience & projects... [OK]',
  '> Building UI components... [OK]',
  '> System ready. Welcome.',
];

export const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'boot' | 'reveal' | 'exit'>('boot');
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showName, setShowName] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Matrix rain canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);
    const chars = 'ジュリアアイウエオカキクケコ01ABCDEFabcdef<>{}[]';

    const draw = () => {
      ctx.fillStyle = 'rgba(6, 6, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animFrameRef.current = requestAnimationFrame(draw);
    };
    animFrameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Phase sequencer
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { onComplete(); return; }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => { const id = setTimeout(fn, ms); timers.push(id); };

    let lineIndex = 0;
    let elapsed = 400;
    BOOT_LINES.forEach((line) => {
      t(() => setVisibleLines(prev => [...prev, line]), elapsed);
      elapsed += 230;
    });

    t(() => {
      setPhase('reveal');
      t(() => setShowName(true), 200);
      t(() => { setGlitch(true); t(() => setGlitch(false), 280); }, 400);
      t(() => setShowTagline(true), 700);
      t(() => setPhase('exit'), 2600);
      t(() => onComplete(), 3300);
    }, elapsed + 200);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        className="fixed inset-0 z-[100] bg-[#060608] overflow-hidden flex flex-col items-center justify-center select-none"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />

        {/* Letterbox bars */}
        <motion.div style={{ originY: 0 }} animate={phase === 'exit' ? { scaleY: 0, transition: { duration: 0.5, ease: [0.76,0,0.24,1] } } : {}} className="absolute top-0 inset-x-0 h-[10vh] bg-black z-10" />
        <motion.div style={{ originY: 1 }} animate={phase === 'exit' ? { scaleY: 0, transition: { duration: 0.5, ease: [0.76,0,0.24,1] } } : {}} className="absolute bottom-0 inset-x-0 h-[10vh] bg-black z-10" />

        {/* Corner brackets */}
        {['top-8 left-8 border-t-2 border-l-2','top-8 right-8 border-t-2 border-r-2','bottom-8 left-8 border-b-2 border-l-2','bottom-8 right-8 border-b-2 border-r-2'].map((cls, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.05 }} className={`absolute h-8 w-8 border-indigo-500/50 z-20 ${cls}`} />
        ))}

        {/* Scanning line */}
        <motion.div initial={{ top: '10%' }} animate={{ top: '90%' }} transition={{ duration: 2, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }} className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent z-20 pointer-events-none" />

        {/* Content */}
        <div className="relative z-30 w-full max-w-2xl mx-auto px-8 flex flex-col items-center">
          <AnimatePresence>
            {phase === 'boot' && (
              <motion.div key="boot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }} className="w-full font-mono text-xs sm:text-sm text-left">
                {visibleLines.map((line, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.18 }} className={`mb-1.5 ${line.includes('[OK]') ? 'text-emerald-400' : line.includes('ready') ? 'text-white font-bold' : 'text-zinc-400'}`}>
                    {line}
                    {i === visibleLines.length - 1 && <motion.span animate={{ opacity: [1,0] }} transition={{ duration: 0.55, repeat: Infinity }} className="ml-1 inline-block w-2 h-3.5 bg-indigo-400 align-middle" />}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase !== 'boot' && (
              <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                {/* JT Monogram */}
                <motion.div initial={{ scale: 0, rotate: -20, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ duration: 0.5, ease: [0.34,1.56,0.64,1] }} className="relative mx-auto mb-7 flex h-16 w-16 items-center justify-center border-2 border-white/25 bg-zinc-950/80 font-mono text-2xl font-bold text-white shadow-[0_0_50px_rgba(99,102,241,0.5)]">
                  <div className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-indigo-400" />
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-indigo-400" />
                  JT
                </motion.div>

                {/* Name */}
                {showName && (
                  <motion.h1
                    initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', x: glitch ? [0,-5,5,-3,0] : 0 }}
                    transition={{ duration: 0.55, ease: [0.16,1,0.3,1] }}
                    className="text-5xl sm:text-7xl font-extrabold tracking-tight uppercase font-display mb-4"
                  >
                    <span className={glitch ? 'text-rose-300' : 'text-white'}>JAY </span>
                    <span className={glitch ? 'text-indigo-300' : 'text-white'}>THESIYA</span>
                  </motion.h1>
                )}

                {/* Expanding divider */}
                {showName && (
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.16,1,0.3,1] }} style={{ originX: 0.5 }} className="mx-auto h-px w-60 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mb-5" />
                )}

                {/* Tagline */}
                {showTagline && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-xs sm:text-sm font-mono text-indigo-400 tracking-[0.35em] uppercase">
                    Java Backend Developer · Spring Boot · Cloud
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Curtain wipe */}
        <AnimatePresence>
          {phase === 'exit' && (
            <>
              <motion.div key="ct" initial={{ y: '-100%' }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.76,0,0.24,1] }} className="absolute inset-x-0 top-0 h-1/2 bg-[#060608] z-40" />
              <motion.div key="cb" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.76,0,0.24,1] }} className="absolute inset-x-0 bottom-0 h-1/2 bg-[#060608] z-40" />
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
