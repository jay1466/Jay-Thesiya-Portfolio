import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, BookOpen, Award } from 'lucide-react';
import { EDUCATIONS } from '../data/portfolioData';
import { SplitLeft, SplitRight } from './SplitSection';

const EDU_COLORS = [
  { color: '#00e5ff', glow: 'rgba(0,229,255,0.15)',   bg: 'rgba(0,229,255,0.08)'   },
  { color: '#8b5cf6', glow: 'rgba(139,92,246,0.15)',  bg: 'rgba(139,92,246,0.08)'  },
  { color: '#ec4899', glow: 'rgba(236,72,153,0.15)',  bg: 'rgba(236,72,153,0.08)'  },
];

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `${r},${g},${b}`;
}

/* ── Education Card ──────────────────────────────────────────────── */
const EduCard: React.FC<{ edu: any; idx: number }> = ({ edu, idx }) => {
  const [hovered, setHovered] = useState(false);
  const cfg = EDU_COLORS[idx] ?? EDU_COLORS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(8,8,26,0.82)',
        border: `1px solid ${hovered ? cfg.color + '45' : 'rgba(0,229,255,0.1)'}`,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: hovered
          ? `0 0 50px ${cfg.glow}, 0 0 100px rgba(0,0,0,0.3), 0 12px 50px rgba(0,0,0,0.6)`
          : '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Top gradient shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${cfg.color}80, rgba(139,92,246,0.5), transparent)`,
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Ambient glow orb */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.4 }}
        className="absolute -top-12 -right-12 w-44 h-44 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            {/* Icon badge */}
            <motion.div
              animate={{ boxShadow: hovered ? `0 0 20px ${cfg.glow}, 0 0 40px ${cfg.glow}` : `0 0 8px ${cfg.glow}` }}
              className="p-2.5 rounded-xl mt-0.5 flex-shrink-0"
              style={{ background: cfg.bg }}
            >
              <GraduationCap size={16} style={{ color: cfg.color }} />
            </motion.div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-display">
                {edu.degree}
              </h3>
              <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs font-mono">
                <span className="font-semibold" style={{ color: cfg.color }}>{edu.institution}</span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <MapPin size={10} />
                  {edu.location}
                </span>
              </div>
            </div>
          </div>

          {/* Period badge */}
          <span
            className="px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold flex-shrink-0 w-fit"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid rgba(${hexToRgb(cfg.color)}, 0.3)`,
              color: 'var(--text-secondary)',
            }}
          >
            {edu.period}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
          {edu.description}
        </p>

        {/* Footer: grade + coursework */}
        <div
          className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {/* Grade pill */}
          <div className="flex items-center gap-2">
            <Award size={12} style={{ color: cfg.color }} />
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              {edu.gradeLabel}:
            </span>
            <motion.span
              animate={{ boxShadow: hovered ? `0 0 16px rgba(${hexToRgb(cfg.color)}, 0.6)` : 'none' }}
              transition={{ duration: 0.4 }}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-black"
              style={{
                background: cfg.bg,
                border: `1px solid rgba(${hexToRgb(cfg.color)}, 0.4)`,
                color: cfg.color,
              }}
            >
              {edu.grade}
            </motion.span>
          </div>

          {/* Coursework tags */}
          {edu.coursework && (
            <div className="flex flex-wrap gap-1.5">
              {edu.coursework.slice(0, 4).map((course: string) => (
                <span
                  key={course}
                  className="px-2 py-0.5 rounded-full text-[9px] font-mono transition-all cursor-default"
                  style={{
                    background: `rgba(${hexToRgb(cfg.color)}, 0.06)`,
                    border: `1px solid rgba(${hexToRgb(cfg.color)}, 0.18)`,
                    color: 'var(--text-muted)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = cfg.color;
                    (e.currentTarget as HTMLElement).style.borderColor = `rgba(${hexToRgb(cfg.color)}, 0.45)`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 8px rgba(${hexToRgb(cfg.color)}, 0.2)`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLElement).style.borderColor = `rgba(${hexToRgb(cfg.color)}, 0.18)`;
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {course}
                </span>
              ))}
              {edu.coursework.length > 4 && (
                <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-mono"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-muted)',
                  }}
                >
                  +{edu.coursework.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Education Section ───────────────────────────────────────────── */
export const Education: React.FC = () => (
  <section
    id="academics"
    className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-x-clip"
  >
    <div className="section-separator mb-16" />
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

        {/* Left: Sticky heading */}
        <SplitLeft className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="flex items-center gap-2 mb-4">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              style={{
                originX: 0,
                display: 'inline-block',
                height: '2px',
                width: '28px',
                background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))',
                borderRadius: '2px',
                boxShadow: '0 0 8px rgba(0,229,255,0.5)',
              }}
            />
            <span className="text-[11px] font-mono tracking-widest uppercase font-semibold" style={{ color: 'var(--accent-cyan)' }}>
              // SECTION 03
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase font-display leading-[1.05] mb-3">
            ACADE<span className="gradient-text">MICS.</span>
          </h2>
          <p className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
            Formal Degree, Coursework & Academic Foundations
          </p>

          {/* Decorative grid */}
          <div className="mt-8 rounded-2xl p-4 relative overflow-hidden"
            style={{ background: 'rgba(8,8,26,0.7)', border: '1px solid rgba(0,229,255,0.08)' }}>
            <div className="absolute inset-0 bg-hex-pattern opacity-20 pointer-events-none" />
            <div className="relative z-10 flex items-center gap-2 mb-3">
              <BookOpen size={14} style={{ color: 'var(--accent-cyan)' }} />
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Education Track
              </span>
            </div>
            {EDUCATIONS.map((edu, i) => (
              <div key={edu.id} className="flex items-center gap-2 text-[10px] font-mono mb-1.5 last:mb-0">
                <span
                  className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{ background: EDU_COLORS[i]?.color ?? '#00e5ff', boxShadow: `0 0 6px ${EDU_COLORS[i]?.color ?? '#00e5ff'}` }}
                />
                <span style={{ color: 'var(--text-muted)' }}>{edu.degree.split(' in ')[0]}</span>
              </div>
            ))}
          </div>
        </SplitLeft>

        {/* Right: Education cards */}
        <SplitRight className="lg:col-span-8 space-y-6">
          <div className="text-[11px] font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
            // EDUCATION MILESTONES
          </div>
          {EDUCATIONS.map((edu, idx) => (
            <EduCard key={edu.id} edu={edu} idx={idx} />
          ))}
        </SplitRight>

      </div>
    </div>
    <div className="section-separator mt-16" />
  </section>
);
