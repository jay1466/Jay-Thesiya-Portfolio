import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Briefcase, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { SplitLeft, SplitRight } from './SplitSection';

const TYPE_COLORS: Record<string, { color: string; bg: string }> = {
  Internship:   { color: '#22d3ee', bg: 'rgba(34,211,238,0.1)'   },
  Freelance:    { color: '#ec4899', bg: 'rgba(236,72,153,0.1)'  },
  'Open Source':{ color: '#10b981', bg: 'rgba(16,185,129,0.1)'  },
  Full_Time:    { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)'  },
};

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `${r},${g},${b}`;
}

/* ── Single Experience Card ───────────────────────────────────────── */
const ExpCard: React.FC<{ exp: any; idx: number }> = ({ exp, idx }) => {
  const [hovered, setHovered] = useState(false);
  const typeCfg = TYPE_COLORS[exp.type] ?? TYPE_COLORS['Internship'];
  const isLatest = idx === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative sm:pl-10 group"
    >
      {/* Timeline dot node */}
      <div className="hidden sm:flex absolute left-0 top-3 h-4 w-4 items-center justify-center">
        <motion.span
          animate={isLatest ? {
            boxShadow: [
              '0 0 8px rgba(34,211,238,0.5)',
              '0 0 20px rgba(34,211,238,0.9), 0 0 40px rgba(139,92,246,0.4)',
              '0 0 8px rgba(34,211,238,0.5)',
            ]
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative h-3.5 w-3.5 rounded-sm flex items-center justify-center"
          style={{
            background: isLatest
              ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))'
              : 'rgba(255,255,255,0.06)',
            border: isLatest
              ? '1px solid var(--accent-cyan)'
              : `1px solid rgba(${hexToRgb(typeCfg.color)}, 0.3)`,
          }}
        >
          {isLatest && (
            <span
              className="absolute inset-0 rounded-sm animate-ping opacity-30"
              style={{ background: 'var(--accent-cyan)' }}
            />
          )}
        </motion.span>
      </div>

      {/* Glass card */}
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.28 }}
        className="relative rounded-xl overflow-hidden"
        style={{
          background: 'rgba(20,26,41,0.82)',
          border: `1px solid ${hovered ? typeCfg.color + '45' : 'rgba(34,211,238,0.1)'}`,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: hovered
            ? `0 0 40px ${typeCfg.bg}, 0 0 80px rgba(0,0,0,0.3), 0 10px 40px rgba(0,0,0,0.6)`
            : '0 4px 20px rgba(0,0,0,0.4)',
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: isLatest
              ? 'linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-violet), transparent)'
              : `linear-gradient(90deg, transparent, ${typeCfg.color}50, transparent)`,
            opacity: hovered ? 1 : 0.6,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Ambient glow on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${typeCfg.bg} 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />

        <div className="p-6 relative z-10">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <motion.div
                animate={{ boxShadow: hovered ? `0 0 20px ${typeCfg.bg}, 0 0 40px ${typeCfg.bg}` : `0 0 8px ${typeCfg.bg}` }}
                className="p-2 rounded-lg mt-0.5 flex-shrink-0"
                style={{ background: typeCfg.bg }}
              >
                <Briefcase size={14} style={{ color: typeCfg.color }} />
              </motion.div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-display">
                  {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-xs font-mono">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 transition-colors hover:opacity-80"
                      style={{ color: typeCfg.color }}
                    >
                      {exp.company}
                      <ExternalLink size={10} />
                    </a>
                  ) : (
                    <span style={{ color: typeCfg.color }}>{exp.company}</span>
                  )}
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                    <MapPin size={10} />
                    {exp.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Right badges */}
            <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 flex-shrink-0">
              {/* Period badge */}
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(34,211,238,0.2)',
                  color: 'var(--text-secondary)',
                }}
              >
                {exp.period}
              </span>
              {/* Type badge */}
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold"
                style={{
                  background: typeCfg.bg,
                  border: `1px solid ${typeCfg.color}40`,
                  color: typeCfg.color,
                }}
              >
                [{exp.type}]
              </span>
              {/* Latest badge */}
              {exp.highlightBadge && (
                <motion.span
                  animate={{
                    boxShadow: [
                      '0 0 6px rgba(34,211,238,0.4)',
                      '0 0 16px rgba(34,211,238,0.8)',
                      '0 0 6px rgba(34,211,238,0.4)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono font-black"
                  style={{ background: 'rgba(34,211,238,0.15)', color: 'var(--accent-cyan)', border: '1px solid rgba(34,211,238,0.5)' }}
                >
                  ✦ {exp.highlightBadge}
                </motion.span>
              )}
            </div>
          </div>

          {/* Bullet points */}
          <ul className="space-y-2 text-xs sm:text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
            {exp.description.map((item: string, dIdx: number) => (
              <li key={dIdx} className="flex items-start gap-2">
                <ChevronRight size={13} className="mt-0.5 flex-shrink-0" style={{ color: typeCfg.color }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-3.5 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {exp.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all"
                style={{
                  background: `rgba(${hexToRgb(typeCfg.color)}, 0.08)`,
                  border: `1px solid rgba(${hexToRgb(typeCfg.color)}, 0.2)`,
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = typeCfg.color;
                  (e.currentTarget as HTMLElement).style.borderColor = `rgba(${hexToRgb(typeCfg.color)}, 0.5)`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 10px rgba(${hexToRgb(typeCfg.color)}, 0.2)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                  (e.currentTarget as HTMLElement).style.borderColor = `rgba(${hexToRgb(typeCfg.color)}, 0.2)`;
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Experience Section ─────────────────────────────────────────── */
export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
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
                  boxShadow: '0 0 8px rgba(34,211,238,0.5)',
                }}
              />
              <span className="text-[11px] font-mono tracking-widest uppercase font-semibold" style={{ color: 'var(--accent-cyan)' }}>
                // SECTION 02
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase font-display leading-[1.05] mb-3">
              EXPERI<span className="gradient-text">ENCE.</span>
            </h2>
            <p className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
              Professional Work History & Engineering Roles
            </p>

            {/* Mini stats */}
            <div className="mt-8 space-y-3">
              {[
                { label: 'Internships', value: '2', color: '#22d3ee' },
                { label: 'Freelance Projects', value: '1+', color: '#ec4899' },
                { label: 'Open Source PRs', value: '10+', color: '#10b981' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between rounded-lg px-3 py-2"
                  style={{ background: 'rgba(20,26,41,0.7)', border: '1px solid rgba(34,211,238,0.08)' }}>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                  <span className="text-sm font-black font-display" style={{ color: s.color, textShadow: `0 0 15px ${s.color}80` }}>{s.value}</span>
                </div>
              ))}
            </div>
          </SplitLeft>

          {/* Right: Timeline */}
          <SplitRight className="lg:col-span-8 relative">
            <div ref={containerRef} className="relative">

              {/* Background guide line */}
              <div className="absolute left-[7px] top-3 bottom-6 w-[2px] hidden sm:block"
                style={{ background: 'rgba(34,211,238,0.06)' }} />

              {/* Scroll-linked cyan gradient line */}
              <motion.div
                style={{
                  scaleY,
                  originY: 0,
                  background: 'linear-gradient(180deg, var(--accent-cyan), var(--accent-violet))',
                  boxShadow: '0 0 8px rgba(34,211,238,0.5)',
                } as any}
                className="absolute left-[7px] top-3 bottom-6 w-[2px] hidden sm:block will-change-transform"
              />

              <div className="space-y-8">
                {EXPERIENCES.map((exp, idx) => (
                  <ExpCard key={exp.id} exp={exp} idx={idx} />
                ))}
              </div>
            </div>
          </SplitRight>

        </div>
      </div>
      <div className="section-separator mt-16" />
    </section>
  );
};
