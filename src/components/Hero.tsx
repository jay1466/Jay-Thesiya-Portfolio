import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, Terminal, RefreshCw, Cpu, Server, Database, Shield, Code2, ChevronDown, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';

/* ── Rotating role list ─────────────────────────────────────── */
const ROLES = [
  'Java Backend Developer',
  'Spring Boot Specialist',
  'Microservices Architect',
  'Problem Solver',
  'IT Engineer',
];

/* ── Floating tech orb icons ─────────────────────────────────── */
const ORB_ICONS = [
  { Icon: Server,   color: '#00e5ff', angle: 0,   label: 'Spring Boot'   },
  { Icon: Database, color: '#8b5cf6', angle: 72,  label: 'PostgreSQL'   },
  { Icon: Shield,   color: '#10b981', angle: 144, label: 'Spring Security' },
  { Icon: Code2,    color: '#f59e0b', angle: 216, label: 'Java 21'      },
  { Icon: Cpu,      color: '#ec4899', angle: 288, label: 'Docker'       },
];

/* ── Character-by-character reveal component ─────────────────── */
const CharReveal: React.FC<{ text: string; delay?: number; className?: string }> = ({
  text, delay = 0, className = ''
}) => {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(12px)', y: 12 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00a0' : char}
        </motion.span>
      ))}
    </span>
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'metrics' | 'jvm' | 'stack'>('metrics');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [commandOutput, setCommandOutput] = useState({
    backend: 'online',
    api: PERSONAL_INFO.apiVersion,
    uptime: PERSONAL_INFO.uptime,
    heapUsage: '214MB / 1024MB',
    threads: '16 Active (Virtual)',
  });
  const [orbAngle, setOrbAngle] = useState(0);
  const animRef = useRef<number>(0);

  /* Rotate roles every 2.5 s */
  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2500);
    return () => clearInterval(t);
  }, []);

  /* Slowly rotate the orb ring */
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      setOrbAngle(((ts - start) / 1000) * 18);
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  /* Desktop mouse parallax */
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const handle = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  /* Scroll-linked parallax */
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);
  const textY       = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const panelY      = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const bgGridY     = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);

  const handleRefreshStats = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCommandOutput(p => ({
        ...p,
        heapUsage: `${Math.floor(Math.random() * 60) + 180}MB / 1024MB`,
        threads: `${Math.floor(Math.random() * 8) + 14} Active (Virtual)`,
      }));
      setIsRefreshing(false);
    }, 480);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* ── Parallax Grid ── */}
      <motion.div
        style={{ y: bgGridY, x: mouseOffset.x * 2 }}
        className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none will-change-transform"
      />

      {/* ── Ambient Orbs (larger, more vibrant) ── */}
      <motion.div
        style={{ x: mouseOffset.x * -20, y: mouseOffset.y * -15, background: 'radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(0,229,255,0.06) 50%, transparent 70%)' }}
        className="hero-orb w-[600px] h-[600px] -top-32 -left-48 will-change-transform"
      />
      <motion.div
        style={{ x: mouseOffset.x * 25, y: mouseOffset.y * 20, background: 'radial-gradient(circle, rgba(139,92,246,0.20) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)' }}
        className="hero-orb w-[480px] h-[480px] top-0 -right-40 will-change-transform"
      />
      <motion.div
        className="hero-orb w-[320px] h-[320px] bottom-0 left-1/2 -translate-x-1/2 will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)' }}
      />

      {/* ── Radial vignette ── */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >

        {/* ════════════════════════════════════════════════════════
            LEFT COLUMN — Typography & CTAs
            ════════════════════════════════════════════════════════ */}
        <motion.div
          style={{ y: textY, x: mouseOffset.x * 1.5 }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center will-change-transform"
        >
          {/* 1. Holographic status badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full w-fit relative overflow-hidden"
              style={{
                background: 'rgba(0,229,255,0.06)',
                border: '1px solid rgba(0,229,255,0.28)',
                boxShadow: '0 0 20px rgba(0,229,255,0.1), inset 0 0 20px rgba(0,229,255,0.03)',
              }}
            >
              {/* Animated shimmer sweep */}
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.08) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 3s ease-in-out infinite',
                }}
              />
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" style={{ boxShadow: '0 0 8px #10b981' }} />
              </span>
              <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase font-semibold relative z-10">
                Available · Backend Engineering
              </span>
              <Sparkles size={11} className="text-emerald-400 opacity-70 relative z-10" />
            </div>
          </motion.div>

          {/* 2. Headline — cinematic character reveal */}
          <motion.div variants={itemVariants} className="mb-2">
            <span className="text-[13px] font-mono text-[var(--text-muted)] tracking-widest uppercase mb-3 block">
              &gt; Hey, I'm
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.0] font-display">
              <CharReveal
                text="Jay"
                delay={0.2}
                className="gradient-text-animated mr-3"
              />
              <CharReveal
                text="Thesiya"
                delay={0.4}
                className="text-white"
              />
            </h1>
          </motion.div>

          {/* 3. Animated role */}
          <motion.div variants={itemVariants} className="mb-5 h-9 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIdx}
                initial={{ y: 30, opacity: 0, filter: 'blur(4px)' }}
                animate={{ y: 0,  opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -30, opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg sm:text-2xl font-bold text-[var(--text-secondary)] font-mono"
              >
                <span className="text-[var(--accent-cyan)]">{'< '}</span>
                {ROLES[roleIdx]}
                <span className="text-[var(--accent-violet)]">{' />'}</span>
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* 4. Description */}
          <motion.div variants={itemVariants} className="mb-8 max-w-xl">
            <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
              Turning ideas into intelligent solutions. Building seamless web experiences with{' '}
              <span className="text-white font-semibold">robust, scalable backend architectures</span>{' '}
              designed for high performance, transaction integrity, and enterprise stability.
            </p>
          </motion.div>

          {/* 5. Tags */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-9">
            {[
              { label: 'Surat, Gujarat, India', color: 'rgba(0,229,255,0.15)', border: 'rgba(0,229,255,0.25)', dot: '#00e5ff' },
              { label: 'Spring Boot & Microservices', color: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', dot: '#8b5cf6' },
              { label: 'DSA & Problem Solving', color: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', dot: '#10b981' },
            ].map(tag => (
              <motion.span
                key={tag.label}
                whileHover={{ y: -2, scale: 1.04 }}
                style={{ background: tag.color, borderColor: tag.border }}
                className="px-3 py-1.5 border rounded-full text-[11px] font-mono text-[var(--text-secondary)] flex items-center gap-1.5 transition-all spotlight"
              >
                <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: tag.dot, boxShadow: `0 0 8px ${tag.dot}` }} />
                {tag.label}
              </motion.span>
            ))}
          </motion.div>

          {/* 6. CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <MagneticButton
              id="hero-view-resume-btn"
              as="a"
              href="#resume"
              className="btn-primary flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-mono font-bold tracking-wider"
            >
              <span className="relative z-10">VIEW RESUME</span>
              <ArrowRight size={15} className="relative z-10" />
            </MagneticButton>

            <MagneticButton
              id="hero-github-btn"
              as="a"
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost flex items-center gap-2 px-6 py-3.5 rounded-full"
            >
              <span className="text-[var(--text-muted)]">&gt;</span>
              <span>GitHub Profile</span>
              <ArrowUpRight size={14} className="opacity-70" />
            </MagneticButton>

            <MagneticButton
              id="hero-projects-btn"
              as="a"
              href="#projects"
              className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)] font-mono text-xs underline underline-offset-4 decoration-[var(--text-muted)] hover:decoration-[var(--accent-cyan)] px-2 py-2 transition-colors"
            >
              Explore Projects ↓
            </MagneticButton>
          </motion.div>

          {/* 7. Scroll hint */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center gap-2 text-[var(--text-muted)]"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={16} className="text-[var(--accent-cyan)] opacity-60" />
            </motion.div>
            <span className="text-[10px] font-mono tracking-widest uppercase opacity-40">Scroll to explore</span>
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════
            RIGHT COLUMN — 3D Orb + Glass Terminal
            ════════════════════════════════════════════════════════ */}
        <motion.div
          style={{ y: panelY, x: mouseOffset.x * -2.5 }}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center gap-6 will-change-transform"
        >
          {/* ── 3D Tech Orb ── */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer atmosphere */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)',
                boxShadow: '0 0 80px rgba(0,229,255,0.18), 0 0 140px rgba(139,92,246,0.1)',
              }}
            />
            {/* Ring 1 — slow spin */}
            <div
              className="absolute w-52 h-52 rounded-full border border-[rgba(0,229,255,0.12)]"
              style={{ animation: 'slowSpin 25s linear infinite' }}
            />
            {/* Ring 2 — counter spin */}
            <div
              className="absolute w-40 h-40 rounded-full border border-[rgba(139,92,246,0.15)]"
              style={{ animation: 'counterSpin 18s linear infinite' }}
            />

            {/* center core */}
            <motion.div
              animate={{ boxShadow: [
                '0 0 30px rgba(0,229,255,0.3), inset 0 0 30px rgba(139,92,246,0.1)',
                '0 0 60px rgba(0,229,255,0.5), inset 0 0 50px rgba(139,92,246,0.2)',
                '0 0 30px rgba(0,229,255,0.3), inset 0 0 30px rgba(139,92,246,0.1)',
              ] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,229,255,0.25), rgba(139,92,246,0.3))',
                border: '1px solid rgba(0,229,255,0.4)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <span className="text-3xl font-black gradient-text-animated font-display">JT</span>
            </motion.div>

            {/* orbiting icons */}
            {ORB_ICONS.map(({ Icon, color, angle, label }, i) => {
              const rad = ((angle + orbAngle) * Math.PI) / 180;
              const r = 105;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              return (
                  <motion.div
                    key={label}
                    title={label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="absolute"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center cursor-default"
                    style={{
                      background: `rgba(${hexToRgb(color)}, 0.18)`,
                      border: `1px solid rgba(${hexToRgb(color)}, 0.5)`,
                      boxShadow: `0 0 16px rgba(${hexToRgb(color)}, 0.4), inset 0 0 8px rgba(${hexToRgb(color)}, 0.1)`,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <Icon size={17} color={color} />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Glass Terminal ── */}
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(6,6,18,0.85)',
              border: '1px solid rgba(0,229,255,0.18)',
              boxShadow: '0 0 60px rgba(0,229,255,0.1), 0 0 120px rgba(139,92,246,0.06), 0 24px 80px rgba(0,0,0,0.7)',
              backdropFilter: 'blur(28px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(0,229,255,0.12)]"
              style={{ background: 'rgba(0,229,255,0.05)' }}
            >
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/70" />
                <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
                <Terminal size={11} className="text-[var(--accent-cyan)]" />
                <span className="gradient-text">server_stats.sh</span>
              </div>
              <button
                onClick={handleRefreshStats}
                className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors p-1"
                title="Refresh"
                aria-label="Refresh metrics"
              >
                <RefreshCw size={12} className={isRefreshing ? 'animate-spin text-[var(--accent-cyan)]' : ''} />
              </button>
            </div>

            {/* Tab bar */}
            <div className="flex border-b border-[rgba(255,255,255,0.06)] text-[11px] font-mono overflow-x-auto">
              {(['metrics', 'jvm', 'stack'] as const).map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 transition-all border-r border-[rgba(255,255,255,0.05)] cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-[var(--accent-cyan)] font-semibold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  }`}
                  style={activeTab === tab ? {
                    background: 'rgba(0,229,255,0.07)',
                    boxShadow: 'inset 0 -2px 0 var(--accent-cyan)',
                  } : {}}
                >
                  [{String(i + 1).padStart(2, '0')}] {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Body */}
            <div className="p-5 text-xs font-mono min-h-[240px] space-y-2.5" style={{ background: 'rgba(2,2,9,0.6)' }}>
              <div className="flex items-center gap-2 pb-2.5 border-b border-[rgba(255,255,255,0.05)] text-[var(--text-muted)]">
                <span className="text-[var(--accent-cyan)]">root@thesiya:~$</span>
                <span className="text-white">
                  {activeTab === 'metrics' && './get_metrics.sh'}
                  {activeTab === 'jvm'     && 'java -version && jvm-stats'}
                  {activeTab === 'stack'   && 'cat application-stack.yml'}
                </span>
                <span className="animate-blink text-[var(--accent-cyan)]">|</span>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'metrics' && (
                  <motion.div key="metrics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="space-y-2">
                    {[
                      { status: 'OK',   color: '#10b981', key: 'backend:',  val: commandOutput.backend,  dot: true  },
                      { status: 'OK',   color: '#00e5ff', key: 'cloud:',    val: 'active',               dot: true  },
                      { status: 'INFO', color: '#8b5cf6', key: 'api:',      val: commandOutput.api,      dot: false },
                      { status: 'OK',   color: '#10b981', key: 'uptime:',   val: commandOutput.uptime,   dot: false },
                    ].map(r => (
                      <div key={r.key} className="flex items-center gap-2.5 text-[var(--text-muted)]">
                        <span className="text-zinc-600">[</span>
                        <span className="font-bold text-[10px]" style={{ color: r.color }}>{r.status}</span>
                        <span className="text-zinc-600">]</span>
                        <span>{r.key}</span>
                        <span className="text-white font-semibold">{r.val}</span>
                        {r.dot && <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: r.color, boxShadow: `0 0 8px ${r.color}` }} />}
                      </div>
                    ))}
                    <div className="pt-2 border-t border-[rgba(255,255,255,0.05)] text-[10px] text-[var(--text-muted)] space-y-1">
                      <p>• Memory Heap: <span className="text-white">{commandOutput.heapUsage}</span></p>
                      <p>• Threads: <span className="text-white">{commandOutput.threads}</span></p>
                      <p>• Environment: <span className="text-white">Java 21 LTS / Spring Boot 3</span></p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'jvm' && (
                  <motion.div key="jvm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="space-y-1.5 text-[var(--text-muted)] text-[11px]">
                    <p className="text-[var(--accent-cyan)]">openjdk version "21.0.2" 2024-01-16 LTS</p>
                    <p>OpenJDK 64-Bit Server VM (build 21.0.2+13, mixed mode)</p>
                    <div className="pt-2 space-y-1">
                      <p>• GC: <span className="text-emerald-400">G1GC Low-Latency</span></p>
                      <p>• Project Loom: <span className="text-[var(--accent-cyan)]">Virtual Threads ✓</span></p>
                      <p>• Memory Model: <span className="text-white">Optimized Heap + Metaspace</span></p>
                      <p>• Build Tool: <span className="text-white">Apache Maven 3.9+</span></p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'stack' && (
                  <motion.div key="stack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="space-y-1 text-[11px] text-[var(--text-muted)]">
                    <p style={{ color: 'var(--accent-violet)' }}>backend_ecosystem:</p>
                    <p className="pl-3">core: <span className="text-white">["Java 21", "Spring Boot 3", "Spring Security"]</span></p>
                    <p className="pl-3">data: <span className="text-white">["JPA", "Hibernate", "JDBC"]</span></p>
                    <p className="pl-3">db: <span className="text-white">["PostgreSQL", "MySQL", "MongoDB", "Redis"]</span></p>
                    <p className="pl-3">infra: <span className="text-white">["Docker", "AWS", "Linux"]</span></p>
                    <p className="pl-3">frontend: <span className="text-white">["React", "TypeScript", "Tailwind"]</span></p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-[rgba(0,229,255,0.1)] text-[10px] font-mono text-[var(--text-muted)]"
              style={{ background: 'rgba(0,229,255,0.03)' }}
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: '0 0 8px #10b981' }} />
                <span>status: active_listener</span>
              </span>
              <span className="gradient-text font-bold">///</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* tiny helper */
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
