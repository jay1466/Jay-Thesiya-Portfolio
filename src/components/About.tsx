import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Server, Code2, Database, Shield,
  Activity, Compass, Headphones, Cpu, Camera, Gamepad2,
} from 'lucide-react';
import { PERSONAL_INFO, STATS } from '../data/portfolioData';
import { CountUp } from './CountUp';
import { SplitLeft, SplitRight } from './SplitSection';

const PILLAR_CARDS = [
  {
    icon: Server, color: '#22d3ee', glow: 'rgba(34,211,238,0.15)',
    title: 'Microservices Architecture',
    desc: 'Decoupled, containerized services with Spring Cloud, Eureka discovery, resilient circuit breakers, and distributed tracing.',
  },
  {
    icon: Shield, color: '#10b981', glow: 'rgba(16,185,129,0.15)',
    title: 'Security & Authentication',
    desc: 'Enterprise-grade security using Spring Security 6, stateless JWT tokenization, RBAC access controls, and OAuth2.',
  },
  {
    icon: Database, color: '#8b5cf6', glow: 'rgba(139,92,246,0.15)',
    title: 'Relational & NoSQL Optimization',
    desc: 'Advanced schema indexing, Hibernate second-level caching, Redis memory layers, and ACID-compliant transaction safety.',
  },
  {
    icon: Code2, color: '#f59e0b', glow: 'rgba(245,158,11,0.15)',
    title: 'Algorithms & Problem Solving',
    desc: 'Rigorous algorithmic approach to data structures, memory constraints, time complexity analysis, and concurrency.',
  },
];

const HOBBY_ICONS: Record<string, React.FC<any>> = {
  Activity, Compass, Headphones, Cpu, Camera, Gamepad2,
};

const HOBBY_COLORS: Record<string, string> = {
  Cricket:             '#22d3ee',
  Traveling:           '#8b5cf6',
  'Listening to Music':'#ec4899',
  'Exploring New Tech':'#10b981',
  Photography:         '#f59e0b',
  Gaming:              '#6366f1',
};

const STAT_COLORS = ['#22d3ee', '#8b5cf6', '#10b981', '#f59e0b'];

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `${r},${g},${b}`;
}

/* ── Pillar Card — with deep shimmer & spotlight ─────────────── */
const PillarCard: React.FC<{ icon: React.FC<any>; color: string; glow: string; title: string; desc: string }> = ({
  icon: Icon, color, glow, title, desc
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.28 }}
      className="rounded-xl p-5 relative overflow-hidden"
      style={{
        background: 'rgba(20,26,41,0.8)',
        border: `1px solid ${hovered ? color + '40' : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? `0 0 40px ${glow}, 0 0 80px rgba(0,0,0,0.3), 0 8px 40px rgba(0,0,0,0.6)`
          : `0 0 15px ${glow}`,
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Background glow orb */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.4 }}
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`, filter: 'blur(16px)' }}
      />

      {/* Spotlight sweep */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, left: hovered ? '130%' : '-30%' }}
        initial={{ opacity: 0, left: '-30%' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute top-0 -skew-x-12 w-16 h-full pointer-events-none z-0"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-3">
          <motion.div
            animate={{ boxShadow: hovered ? `0 0 20px ${glow}, 0 0 40px ${glow}` : `0 0 8px ${glow}` }}
            className="p-2 rounded-lg transition-all"
            style={{ background: glow }}
          >
            <Icon size={16} style={{ color }} />
          </motion.div>
          <h3 className="text-xs font-mono font-bold text-white">{title}</h3>
        </div>
        <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{desc}</p>
      </div>

      {/* Bottom gradient line on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-[1px] origin-left"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
    </motion.div>
  );
};

/* ── Stat Card — with animated glow ring on hover ─────────────── */
const StatCard: React.FC<{ stat: any; color: string; index: number }> = ({ stat, color, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
      style={{
        background: 'rgba(20,26,41,0.8)',
        border: `1px solid ${hovered ? color + '45' : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? `0 0 50px rgba(${hexToRgb(color)}, 0.18), 0 0 100px rgba(${hexToRgb(color)}, 0.06), 0 10px 40px rgba(0,0,0,0.6)`
          : '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Radial glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 50%, rgba(${hexToRgb(color)}, 0.1) 0%, transparent 65%)` }}
      />

      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-3 relative z-10">{stat.label}</span>
      <div className="relative z-10">
        <CountUp
          value={stat.value}
          suffix={stat.suffix}
          duration={1.8}
          className="text-3xl sm:text-4xl font-black font-display tracking-tight"
          style={{
            color,
            textShadow: hovered
              ? `0 0 30px rgba(${hexToRgb(color)}, 0.8), 0 0 60px rgba(${hexToRgb(color)}, 0.4)`
              : `0 0 15px rgba(${hexToRgb(color)}, 0.5)`,
            transition: 'text-shadow 0.4s ease',
          } as any}
        />
      </div>
      <span className="text-[10px] font-mono text-[var(--text-muted)] mt-2 block relative z-10">{stat.subtext}</span>

      {/* Animated ring on hover */}
      <motion.div
        animate={{
          opacity: hovered ? [0.4, 0.8, 0.4] : 0,
          scale: hovered ? [1, 1.05, 1] : 0.8,
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full pointer-events-none"
        style={{
          border: `1px solid rgba(${hexToRgb(color)}, 0.4)`,
          boxShadow: `0 0 20px rgba(${hexToRgb(color)}, 0.2)`,
        }}
      />
    </motion.div>
  );
};

export const About: React.FC = () => (
  <section
    id="about"
    className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-x-clip"
  >
    {/* Gradient separator top */}
    <div className="section-separator mb-16" />

    <div className="max-w-7xl mx-auto">

      {/* ── Header & Bio ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">

        <SplitLeft className="lg:col-span-4">
          <div className="flex items-center gap-2 mb-4">
            <motion.span
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              style={{ originX: 0, background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }}
              className="h-[2px] w-8 inline-block"
            />
            <span className="text-[11px] font-mono tracking-widest text-[var(--accent-cyan)] uppercase font-semibold">
              // SECTION 01
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase font-display leading-[1.05] mb-3">
            WHO <span className="gradient-text">I AM.</span>
          </h2>
          <p className="text-[11px] font-mono text-[var(--text-muted)]">Identity & Technical Philosophy</p>
        </SplitLeft>

        <SplitRight className="lg:col-span-8 space-y-5">
          {/* Bio card */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-7 relative overflow-hidden spotlight"
            style={{
              background: 'rgba(20,26,41,0.82)',
              border: '1px solid rgba(34,211,238,0.14)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 0 40px rgba(34,211,238,0.06)',
            }}
          >
            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.4), rgba(139,92,246,0.3), transparent)' }}
            />
            <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
              <strong className="text-white font-semibold">Passionate Java Backend Developer and IT student</strong>{' '}
              dedicated to engineering robust, scalable server-side architectures. I specialize in translating
              complex business requirements into clean, performant code. My approach is rooted in precision,
              leveraging modern Java ecosystems, Spring Boot microservices, and distributed cloud databases
              to build high-availability systems.
            </p>
            <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.06)] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-[var(--text-muted)] block uppercase tracking-wider mb-1">// Academic Status</span>
                <span className="text-white">B.Tech IT @ ADIT (2023 – 2027)</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block uppercase tracking-wider mb-1">// Core Expertise</span>
                <span className="gradient-text font-semibold">Java 21, Spring Boot, REST APIs</span>
              </div>
            </div>
          </motion.div>

          {/* Philosophy pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLAR_CARDS.map((card) => (
              <PillarCard key={card.title} {...card} />
            ))}
          </div>
        </SplitRight>
      </div>

      {/* ── Stats ────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} color={STAT_COLORS[i]} index={i} />
        ))}
      </div>

      {/* ── Hobbies ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'rgba(20,26,41,0.75)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), rgba(236,72,153,0.2), transparent)' }}
        />
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-4 block">
          // Beyond the Terminal · Interests
        </span>
        <div className="flex flex-wrap gap-3">
          {PERSONAL_INFO.hobbies.map(({ name, icon }) => {
            const Icon = HOBBY_ICONS[icon] || Activity;
            const color = HOBBY_COLORS[name] || '#22d3ee';
            return (
              <motion.div
                key={name}
                whileHover={{ y: -4, scale: 1.06 }}
                transition={{ duration: 0.2 }}
                className="px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] cursor-default transition-all relative overflow-hidden"
                style={{
                  background: `rgba(${hexToRgb(color)}, 0.08)`,
                  border: `1px solid rgba(${hexToRgb(color)}, 0.2)`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px rgba(${hexToRgb(color)}, 0.25), inset 0 0 12px rgba(${hexToRgb(color)}, 0.05)`;
                  (e.currentTarget as HTMLElement).style.borderColor = `rgba(${hexToRgb(color)}, 0.55)`;
                  (e.currentTarget as HTMLElement).style.color = color;
                  (e.currentTarget as HTMLElement).style.background = `rgba(${hexToRgb(color)}, 0.14)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.borderColor = `rgba(${hexToRgb(color)}, 0.2)`;
                  (e.currentTarget as HTMLElement).style.color = '';
                  (e.currentTarget as HTMLElement).style.background = `rgba(${hexToRgb(color)}, 0.08)`;
                }}
              >
                <Icon size={13} style={{ color }} />
                {name}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

    </div>
    <div className="section-separator mt-16" />
  </section>
);
