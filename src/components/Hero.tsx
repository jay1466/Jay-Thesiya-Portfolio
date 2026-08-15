import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, Terminal, RefreshCw, Layers, Box, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';


export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'metrics' | 'jvm' | 'stack'>('metrics');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [commandOutput, setCommandOutput] = useState<{
    backend: string;
    api: string;
    uptime: string;
    modules: string[];
    heapUsage: string;
    threads: string;
  }>({
    backend: 'online',
    api: PERSONAL_INFO.apiVersion,
    uptime: PERSONAL_INFO.uptime,
    modules: ['spring-boot-core', 'spring-security-jwt', 'jpa-hibernate-engine', 'docker-runtime'],
    heapUsage: '214MB / 1024MB',
    threads: '16 Active (Virtual)',
  });

  // Desktop subtle mouse parallax (1-3px)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll-linked parallax & transition into About
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.6, 0.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const panelY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const bgGridY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  const handleRefreshStats = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCommandOutput((prev) => ({
        ...prev,
        uptime: '99.98%',
        heapUsage: `${Math.floor(Math.random() * 50) + 190}MB / 1024MB`,
        threads: `${Math.floor(Math.random() * 8) + 14} Active (Virtual)`,
      }));
      setIsRefreshing(false);
    }, 450);
  };

  // Stagger container for initial entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >

      {/* Parallax Background Grid */}
      <motion.div
        style={{ y: bgGridY, x: mouseOffset.x * 2 }}
        className="absolute inset-0 bg-grid-pattern opacity-70 pointer-events-none will-change-transform"
      />

      {/* Radial vignette overlay */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
      >
        
        {/* Left Column: Hero Typography & CTAs (7 cols on desktop) */}
        <motion.div
          style={{ y: textY, x: mouseOffset.x * 1.5 }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center will-change-transform"
        >
          {/* 1. System Status Badge */}
          <motion.div variants={itemVariants} className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-950/80 w-fit shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
                SYSTEM.STATUS = {PERSONAL_INFO.status}
              </span>
            </div>
          </motion.div>

          {/* 2. "JAVA BACKEND DEVELOPER" Headline first */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-[1.05] font-display mb-3"
          >
            JAVA BACKEND <br className="hidden sm:inline" />
            <span className="text-zinc-200">DEVELOPER</span>
          </motion.h1>

          {/* 3. "Hi, I'm" greeting */}
          <motion.div variants={itemVariants} className="text-zinc-400 font-mono text-xs sm:text-sm tracking-wider uppercase mb-1">
            &gt; Hi, I'm
          </motion.div>

          {/* 4. "Jay Thesiya" with sophisticated masked text reveal */}
          <div className="overflow-hidden py-1 mb-4">
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display"
            >
              Jay Thesiya
            </motion.h2>
          </div>

          {/* 5. Subheading / Tagline & Description */}
          <motion.div variants={itemVariants} className="space-y-3 mb-7 max-w-2xl">
            <p className="text-sm sm:text-base font-mono text-zinc-300">
              Turning ideas into intelligent solutions.
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Innovating through technology. Building seamless web experiences with robust, scalable backend architectures designed for high performance, transaction integrity, and enterprise stability.
            </p>
          </motion.div>

          {/* 6. Role Badges with hover micro-interaction */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8 font-mono text-[11px]">
            <motion.span
              whileHover={{ y: -2 }}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-1.5 transition-colors hover:border-zinc-700"
            >
              <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
              Surat, Gujarat, India
            </motion.span>
            <motion.span
              whileHover={{ y: -2 }}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-1.5 transition-colors hover:border-zinc-700"
            >
              <span className="h-1.5 w-1.5 bg-blue-400 rounded-full"></span>
              Spring Boot & Microservices
            </motion.span>
            <motion.span
              whileHover={{ y: -2 }}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-1.5 transition-colors hover:border-zinc-700"
            >
              <span className="h-1.5 w-1.5 bg-purple-400 rounded-full"></span>
              Problem Solving & DSA
            </motion.span>
          </motion.div>

          {/* 7. Magnetic CTA Buttons with micro-interactions */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <MagneticButton
              id="hero-view-resume-btn"
              as="a"
              href="#resume"
              className="px-6 py-3.5 bg-white text-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-zinc-200 shadow-lg shadow-white/5 gap-2"
            >
              <span>VIEW RESUME</span>
              <ArrowRight size={15} />
            </MagneticButton>

            <MagneticButton
              id="hero-github-btn"
              as="a"
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 border border-zinc-800 hover:border-zinc-500 bg-zinc-950/60 text-zinc-300 hover:text-white font-mono text-xs tracking-wider gap-2"
            >
              <span className="text-zinc-400">&gt;</span>
              <span>GitHub Profile</span>
              <ArrowUpRight size={14} className="opacity-70" />
            </MagneticButton>

            <MagneticButton
              id="hero-projects-btn"
              as="a"
              href="#projects"
              className="text-zinc-400 hover:text-white font-mono text-xs underline underline-offset-4 decoration-zinc-700 hover:decoration-white px-2 py-2"
            >
              Explore Projects
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* 8. Right Column: Interactive Terminal Widget (5 cols on desktop, slower parallax) */}
        <motion.div
          style={{ y: panelY, x: mouseOffset.x * -2.5 }}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 will-change-transform"
        >
          <div
            id="terminal-card"
            className="w-full bg-[#0c0c10] border border-zinc-800 rounded-sm shadow-2xl overflow-hidden font-mono"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700"></span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                <Terminal size={12} className="text-zinc-500" />
                <span>server_stats.sh</span>
              </div>
              <button
                onClick={handleRefreshStats}
                className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                title="Rerun script"
                aria-label="Refresh server metrics"
              >
                <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
              </button>
            </div>

            {/* Sub-tab navigation in terminal */}
            <div className="flex border-b border-zinc-800/80 bg-zinc-950/40 text-[11px] overflow-x-auto">

              <button
                onClick={() => setActiveTab('metrics')}
                className={`px-3 py-1.5 transition-colors border-r border-zinc-800/60 cursor-pointer ${
                  activeTab === 'metrics'
                    ? 'text-white bg-zinc-900/60 font-semibold border-b-2 border-b-indigo-500'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                [01] Metrics
              </button>
              <button
                onClick={() => setActiveTab('jvm')}
                className={`px-3 py-1.5 transition-colors border-r border-zinc-800/60 cursor-pointer ${
                  activeTab === 'jvm'
                    ? 'text-white bg-zinc-900/60 font-semibold border-b-2 border-b-indigo-500'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                [02] JVM Specs
              </button>
              <button
                onClick={() => setActiveTab('stack')}
                className={`px-3 py-1.5 transition-colors cursor-pointer ${
                  activeTab === 'stack'
                    ? 'text-white bg-zinc-900/60 font-semibold border-b-2 border-b-indigo-500'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                [03] Stack
              </button>
            </div>

            {/* Terminal Body with sequential line animations */}
            <div className="p-5 text-xs text-zinc-300 space-y-3 min-h-[290px] select-text relative">
              {/* Command Prompt line */}
              <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-800/40">
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400">root@thesiya:~$</span>
                  <span className="text-white font-mono">

                    {activeTab === 'metrics' && './get_metrics.sh'}
                    {activeTab === 'jvm' && 'java -XX:+PrintFlagsFinal -version'}
                    {activeTab === 'stack' && 'cat ./application-stack.yml'}
                  </span>
                </div>
              </div>

              {/* Tab 1: Server Metrics */}
              {activeTab === 'metrics' && (
                <motion.div
                  key="tab-metrics"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.08 },
                    },
                  }}
                  className="space-y-2 pt-1 font-mono"
                >
                  <motion.div variants={itemVariants} className="flex items-center gap-3">
                    <span className="text-zinc-500">[</span>
                    <span className="text-emerald-400 font-semibold">OK</span>
                    <span className="text-zinc-500">]</span>
                    <span className="text-zinc-400">backend:</span>
                    <span className="text-emerald-400 font-medium">{commandOutput.backend}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-center gap-3">
                    <span className="text-zinc-500">[</span>
                    <span className="text-sky-400 font-semibold">OK</span>
                    <span className="text-zinc-500">]</span>
                    <span className="text-zinc-400">cloud:</span>
                    <span className="text-sky-400 font-medium">active</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse ml-1" />
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-center gap-3">
                    <span className="text-zinc-500">[</span>
                    <span className="text-zinc-400 font-semibold">INFO</span>
                    <span className="text-zinc-500">]</span>
                    <span className="text-zinc-400">api:</span>
                    <span className="text-zinc-200">{commandOutput.api}</span>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-center gap-3">
                    <span className="text-zinc-500">[</span>
                    <span className="text-emerald-400 font-semibold">OK</span>
                    <span className="text-zinc-500">]</span>
                    <span className="text-zinc-400">uptime:</span>
                    <span className="text-zinc-200">{commandOutput.uptime}</span>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-center gap-3">
                    <span className="text-zinc-500">[</span>
                    <span className="text-amber-400 font-semibold">EXEC</span>
                    <span className="text-zinc-500">]</span>
                    <span className="text-zinc-400">loading modules...</span>
                    <span className="inline-block w-2 h-3.5 bg-white animate-pulse" />
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-2 text-[11px] text-zinc-500 border-t border-zinc-800/40 space-y-1">
                    <p>• Memory Heap: <span className="text-zinc-300">{commandOutput.heapUsage}</span></p>
                    <p>• Threads: <span className="text-zinc-300">{commandOutput.threads}</span></p>
                    <p>• Environment: <span className="text-zinc-300">Java 21 LTS / Spring Boot 3</span></p>
                  </motion.div>
                </motion.div>
              )}

              {/* Tab 2: JVM Specs */}
              {activeTab === 'jvm' && (
                <motion.div
                  key="tab-jvm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 pt-1 font-mono text-[11px]"
                >
                  <p className="text-zinc-400">openjdk version "21.0.2" 2024-01-16 LTS</p>
                  <p className="text-zinc-400">OpenJDK 64-Bit Server VM (build 21.0.2+13, mixed mode)</p>
                  <div className="pt-2 text-zinc-400 space-y-1">
                    <p>• Garbage Collector: <span className="text-emerald-400">G1GC Low-Latency</span></p>
                    <p>• Project Loom: <span className="text-sky-400">Virtual Threads Enabled</span></p>
                    <p>• Memory Model: <span className="text-zinc-300">Optimized Heap & Metaspace</span></p>
                    <p>• Build Tool: <span className="text-zinc-300">Apache Maven 3.9+</span></p>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Tech Stack Breakdown */}
              {activeTab === 'stack' && (
                <motion.div
                  key="tab-stack"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1 pt-1 font-mono text-[11px] text-zinc-400"
                >
                  <p className="text-indigo-300">backend_ecosystem:</p>
                  <p className="pl-3">core: ["Java 21", "Spring Boot 3", "Spring Security"]</p>
                  <p className="pl-3">data_persistence: ["Spring Data JPA", "Hibernate", "JDBC"]</p>
                  <p className="pl-3">databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"]</p>
                  <p className="pl-3">infrastructure: ["Docker", "AWS Cloud", "Linux (Bash)"]</p>
                  <p className="pl-3">frontend_client: ["React", "TypeScript", "Tailwind CSS"]</p>
                </motion.div>
              )}
            </div>

            {/* Terminal Footer with status */}
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-t border-zinc-800 text-[10px] text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>status: active_listener</span>
              </span>
              <span className="font-mono text-zinc-400 font-bold">///</span>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};
