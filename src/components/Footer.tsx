import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Github, Linkedin, Mail, Code2, Heart, Zap } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const SOCIAL = [
  { label: 'GitHub',   href: PERSONAL_INFO.github,            Icon: Github,   color: '#f0f4ff', glow: 'rgba(240,244,255,0.2)' },
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin,          Icon: Linkedin, color: '#0077b5', glow: 'rgba(0,119,181,0.3)'   },
  { label: 'Email',    href: `mailto:${PERSONAL_INFO.email}`, Icon: Mail,     color: '#22d3ee', glow: 'rgba(34,211,238,0.25)'  },
  { label: 'LeetCode', href: PERSONAL_INFO.leetcode,          Icon: Code2,    color: '#f59e0b', glow: 'rgba(245,158,11,0.25)' },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="main-footer"
      className="relative pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--bg) 0%, rgba(0,5,15,1) 100%)',
      }}
    >
      {/* Animated gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--accent-cyan) 25%, var(--accent-violet) 50%, var(--accent-pink) 75%, transparent 100%)',
          boxShadow: '0 0 20px rgba(34,211,238,0.3), 0 0 40px rgba(139,92,246,0.15)',
        }}
      />

      {/* Large ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-60 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.06) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Hex pattern overlay */}
      <div className="absolute inset-0 bg-hex-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Big name treatment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          {/* Orbit ring behind name */}
          <div className="relative inline-block">
            <motion.div
              className="absolute inset-x-0 -inset-y-4 rounded-full pointer-events-none"
              animate={{
                boxShadow: [
                  '0 0 40px rgba(34,211,238,0.08)',
                  '0 0 80px rgba(34,211,238,0.16), 0 0 120px rgba(139,92,246,0.08)',
                  '0 0 40px rgba(34,211,238,0.08)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="text-5xl sm:text-7xl font-black font-display tracking-tight cursor-pointer gradient-text-animated leading-tight block"
            >
              JAY THESIYA
            </motion.button>
          </div>
          <p className="mt-4 text-xs font-mono text-[var(--text-muted)] tracking-widest uppercase">
            Java Backend Developer · Spring Boot · Microservices
          </p>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center justify-center gap-4 mb-14"
        >
          {SOCIAL.map(({ label, href, Icon, color, glow }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              whileHover={{ y: -5, scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              className="p-3.5 rounded-xl text-[var(--text-muted)] transition-all"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
                transition: 'all 0.3s ease',
              }}
              title={label}
              aria-label={label}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = color;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${glow}, 0 0 50px ${glow.replace('0.', '0.0')}`;
                (e.currentTarget as HTMLElement).style.color = color;
                (e.currentTarget as HTMLElement).style.background = `rgba(${color.replace('#', '').match(/.{2}/g)!.map(h => parseInt(h, 16)).join(',')}, 0.07)`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.color = '';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
              }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.15), rgba(139,92,246,0.15), transparent)' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[var(--text-muted)]">
          <span>© 2026 Jay Thesiya · Built with Java &amp; React precision</span>

          <div className="flex items-center gap-3">
            {/* "Built with" animated badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono"
              style={{
                background: 'rgba(139,92,246,0.1)',
                border: '1px solid rgba(139,92,246,0.25)',
                color: '#a78bfa',
              }}
            >
              <Zap size={10} />
              <span>Built with passion</span>
              <Heart size={9} fill="currentColor" className="text-pink-400" />
            </motion.div>

            <span className="text-[var(--text-muted)]">Portfolio v2.0</span>

            <motion.button
              id="footer-back-to-top"
              onClick={scrollToTop}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-all cursor-pointer"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              title="Back to top"
              aria-label="Back to top"
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.4)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(34,211,238,0.2), inset 0 0 8px rgba(34,211,238,0.05)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.06)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <ArrowUp size={15} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};
