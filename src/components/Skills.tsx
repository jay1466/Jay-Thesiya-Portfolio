import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Server, Database, Wrench, Code2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';

/* ── SVG Arc Ring — enhanced ───────────────────────────────────────── */
interface ArcRingProps {
  pct: number;
  color: string;
  size?: number;
  stroke?: number;
  animate?: boolean;
}

const ArcRing: React.FC<ArcRingProps> = ({ pct, color, size = 42, stroke = 4, animate = true }) => {
  const [displayed, setDisplayed] = useState(animate ? 0 : pct);
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (inView) {
      const start = performance.now();
      const duration = 1200;
      const raf = (ts: number) => {
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setDisplayed(Math.round(pct * ease));
        if (progress < 1) requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }, [inView, pct]);

  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (displayed / 100) * circ;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg ref={ref} width={size} height={size} className="-rotate-90 absolute inset-0">
        {/* Track */}
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        {/* Fill */}
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.05s linear',
            filter: `drop-shadow(0 0 6px ${color}99)`,
          }}
        />
      </svg>
      {/* Center percent */}
      <span className="absolute text-[8px] font-mono font-bold" style={{ color }}>{displayed}%</span>
    </div>
  );
};

/* ── Orbit badge pill ──────────────────────────────────────────────── */
const OrbitBadge: React.FC<{ skill: string; color: string; index: number; visible: boolean }> = ({
  skill, color, index, visible
}) => {
  const angle = (index / 3) * 360 + 90;
  const rad = (angle * Math.PI) / 180;
  const r = 64;
  const x = Math.cos(rad) * r;
  const y = Math.sin(rad) * r;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={visible ? { opacity: 1, scale: 1, x, y } : { opacity: 0, scale: 0, x: 0, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full text-[8px] font-mono whitespace-nowrap pointer-events-none"
      style={{
        background: `rgba(${hexToRgb(color)}, 0.15)`,
        border: `1px solid rgba(${hexToRgb(color)}, 0.4)`,
        color,
        boxShadow: `0 0 8px rgba(${hexToRgb(color)}, 0.3)`,
      }}
    >
      {skill}
    </motion.div>
  );
};

/* ── Category config ──────────────────────────────────────────────── */
const CAT_CONFIG: Record<string, { icon: React.FC<any>; color: string; glow: string; label: string }> = {
  backend:        { icon: Server,   color: '#22d3ee', glow: 'rgba(34,211,238,0.14)',  label: 'Backend Architecture' },
  databases:      { icon: Database, color: '#8b5cf6', glow: 'rgba(139,92,246,0.14)', label: 'Databases & Storage' },
  'tools-devops': { icon: Wrench,   color: '#10b981', glow: 'rgba(16,185,129,0.14)', label: 'DevOps & Tooling' },
  'frontend-core':{ icon: Code2,    color: '#f59e0b', glow: 'rgba(245,158,11,0.14)', label: 'Core CS & Frontend' },
};

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `${r},${g},${b}`;
}

export const Skills: React.FC = () => (
  <section
    id="skills"
    className="relative py-24 px-4 sm:px-6 lg:px-8"
  >
    <div className="section-separator mb-16" />
    <div className="max-w-7xl mx-auto">

      <SectionHeading
        number="// SECTION 05"
        title="TECHNICAL ARSENAL."
        subtitle="A quantifiable breakdown of core competencies — heavily weighted towards backend architecture, robust data management, and deployment automation."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_CATEGORIES.map((cat, catIdx) => {
          const cfg = CAT_CONFIG[cat.id] ?? { icon: Server, color: '#22d3ee', glow: 'rgba(34,211,238,0.1)', label: cat.name };
          const CatIcon = cfg.icon;
          const avgPct = Math.round(cat.skills.reduce((a, s) => a + s.proficiency, 0) / cat.skills.length);

          return (
            <SkillCard
              key={cat.id}
              cat={cat}
              cfg={cfg}
              CatIcon={CatIcon}
              catIdx={catIdx}
              avgPct={avgPct}
            />
          );
        })}
      </div>
    </div>
    <div className="section-separator mt-16" />
  </section>
);

/* ── Skill Card (separate component for hover state) ─────────────── */
const SkillCard: React.FC<{
  cat: any; cfg: any; CatIcon: React.FC<any>; catIdx: number; avgPct: number;
}> = ({ cat, cfg, CatIcon, catIdx, avgPct }) => {
  const [hovered, setHovered] = useState(false);
  const [hoveredSkillIdx, setHoveredSkillIdx] = useState<number | null>(null);

  return (
    <motion.div
      key={cat.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: catIdx * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl p-6 gradient-border overflow-hidden group"
      style={{
        background: 'rgba(20,26,41,0.8)',
        border: `1px solid ${hovered ? cfg.color + '40' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered
          ? `0 0 50px ${cfg.glow}, 0 0 100px rgba(0,0,0,0.3), 0 12px 50px rgba(0,0,0,0.6)`
          : `0 0 20px ${cfg.glow}`,
        backdropFilter: 'blur(24px)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Glow orb behind the card on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* Spotlight sweep */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, left: hovered ? '120%' : '-30%' }}
        initial={{ opacity: 0, left: '-30%' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="absolute top-0 -skew-x-12 w-24 h-full pointer-events-none z-0"
        style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)` }}
      />

      {/* Card header */}
      <div className="relative z-10 flex items-center justify-between pb-4 mb-5 border-b border-[rgba(255,255,255,0.07)]">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ boxShadow: hovered ? `0 0 20px ${cfg.glow}, 0 0 40px ${cfg.glow}` : `0 0 10px ${cfg.glow}` }}
            className="p-2.5 rounded-xl transition-all"
            style={{ background: cfg.glow }}
          >
            <CatIcon size={17} style={{ color: cfg.color }} />
          </motion.div>
          <div>
            <h3 className="text-sm font-bold text-white font-display">{cat.name}</h3>
            <p className="text-[10px] font-mono text-[var(--text-muted)]">{cat.skills.length} skills tracked</p>
          </div>
        </div>

        {/* Animated average ring */}
        <div className="relative">
          <ArcRing pct={avgPct} color={cfg.color} size={48} stroke={4} />
        </div>
      </div>

      {/* Skills list */}
      <div className="relative z-10 space-y-4">
        {cat.skills.map((skill: any, sIdx: number) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: catIdx * 0.08 + sIdx * 0.05 }}
            className="flex items-center gap-3 group/skill"
            onMouseEnter={() => setHoveredSkillIdx(sIdx)}
            onMouseLeave={() => setHoveredSkillIdx(null)}
          >
            {/* Arc ring */}
            <div className="relative flex items-center justify-center" style={{ width: 42, height: 42 }}>
              <ArcRing pct={skill.proficiency} color={cfg.color} size={42} stroke={3.5} />
            </div>

            {/* Name & bar */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-mono text-[var(--text-secondary)] truncate group-hover/skill:text-white transition-colors">{skill.name}</span>
                <span className="text-[10px] font-mono ml-2 shrink-0" style={{ color: cfg.color }}>
                  {skill.proficiency}%
                </span>
              </div>
              {/* Bar track */}
              <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: skill.proficiency / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: catIdx * 0.08 + sIdx * 0.05 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    originX: 0,
                    background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}88)`,
                    boxShadow: `0 0 10px ${cfg.color}66`,
                    height: '100%',
                    borderRadius: '9999px',
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-5 pt-3 border-t border-[rgba(255,255,255,0.05)] text-[10px] font-mono text-[var(--text-muted)]">
        // ACTIVE IN PRODUCTION & DSA
      </div>
    </motion.div>
  );
};
