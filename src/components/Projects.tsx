import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, ArrowUpRight, Star, Database, ShieldCheck, Layers, Server, Zap } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { SectionHeading } from './SectionHeading';

const CAT_CONFIG: Record<string, { color: string; glow: string; icon: React.FC<any> }> = {
  FINTECH:    { color: '#10b981', glow: 'rgba(16,185,129,0.20)', icon: Database    },
  SECURITY:   { color: '#8b5cf6', glow: 'rgba(139,92,246,0.20)', icon: ShieldCheck },
  'ML / NLP': { color: '#ec4899', glow: 'rgba(236,72,153,0.20)', icon: Layers      },
  ENTERPRISE: { color: '#22d3ee', glow: 'rgba(34,211,238,0.20)',  icon: Server      },
  HEALTHCARE: { color: '#f59e0b', glow: 'rgba(245,158,11,0.20)', icon: Server      },
  ECOMMERCE:  { color: '#6366f1', glow: 'rgba(99,102,241,0.20)', icon: Server      },
};

const DEFAULT_CAT = { color: '#22d3ee', glow: 'rgba(34,211,238,0.18)', icon: Server };

const CATEGORIES = ['ALL', 'FINTECH', 'SECURITY', 'ML / NLP', 'ENTERPRISE', 'HEALTHCARE'];

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ── Holographic shimmer card ───────────────────────────────── */
interface HoloCardProps {
  project: Project;
  onClick: () => void;
}

const HoloCard: React.FC<HoloCardProps> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cfg = CAT_CONFIG[project.category] ?? DEFAULT_CAT;
  const CatIcon = cfg.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    setShine({ x, y, opacity: 1 });
    // 3D tilt
    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    setTilt({ rotateX: tiltX, rotateY: tiltY });
  };

  const handleMouseLeave = () => {
    setShine(s => ({ ...s, opacity: 0 }));
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 35, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full group cursor-pointer"
      onClick={onClick}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="h-full"
        animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="h-full relative rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: 'rgba(15,19,31,0.85)',
            border: `1px solid rgba(255,255,255,0.08)`,
            boxShadow: '0 4px 30px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(20px)',
            transition: 'border-color 0.35s, box-shadow 0.35s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = `${cfg.color}50`;
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 50px ${cfg.glow}, 0 0 100px rgba(0,0,0,0.3), 0 8px 50px rgba(0,0,0,0.7)`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 30px rgba(0,0,0,0.6)';
          }}
        >
          {/* Iridescent shimmer — follows mouse */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl z-10 transition-opacity duration-300"
            style={{
              opacity: shine.opacity,
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(34,211,238,0.1) 0%, rgba(139,92,246,0.08) 35%, rgba(236,72,153,0.06) 55%, transparent 70%)`,
            }}
          />

          {/* Holographic top shimmer */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${cfg.color}60, rgba(139,92,246,0.4), transparent)`,
              opacity: shine.opacity,
            }}
          />

          {/* Project image preview */}
          <div className="relative h-36 overflow-hidden flex-shrink-0"
            style={{ background: `linear-gradient(135deg, rgba(15,19,31,1), rgba(23,29,48,1))` }}
          >
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover opacity-20 group-hover:opacity-45 transition-all duration-700 scale-110 group-hover:scale-100"
              />
            )}
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(15,19,31,1))` }} />

            {/* Gradient color wash */}
            <div
              className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 30% 50%, ${cfg.color}22, transparent 70%)` }}
            />

            {/* Category + featured badges — z layer: title floats above */}
            <div className="absolute top-3 left-3 flex items-center gap-2 z-20" style={{ transform: 'translateZ(20px)' }}>
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold backdrop-blur-sm"
                style={{
                  background: `rgba(${hexToRgb(cfg.color)}, 0.18)`,
                  border: `1px solid ${cfg.color}50`,
                  color: cfg.color,
                  boxShadow: `0 0 12px rgba(${hexToRgb(cfg.color)}, 0.3)`,
                }}
              >
                <CatIcon size={11} />
                {project.category}
              </div>
            </div>

            {project.featured && (
              <div className="absolute top-3 right-3 z-20" style={{ transform: 'translateZ(20px)' }}>
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 8px rgba(245,158,11,0.5), 0 0 20px rgba(245,158,11,0.2)',
                      '0 0 20px rgba(245,158,11,0.9), 0 0 40px rgba(245,158,11,0.4)',
                      '0 0 8px rgba(245,158,11,0.5), 0 0 20px rgba(245,158,11,0.2)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-black"
                  style={{ background: 'rgba(245,158,11,0.9)', color: '#000' }}
                >
                  <Star size={9} fill="currentColor" />
                  FEATURED
                </motion.div>
              </div>
            )}

            {/* Open arrow */}
            <div className="absolute bottom-2 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
              <ArrowUpRight size={16} style={{ color: cfg.color }} />
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col p-5 gap-3" style={{ transform: 'translateZ(10px)' }}>
            <div>
              <h3
                className="text-base font-bold text-white tracking-tight font-display mb-1 group-hover:transition-colors duration-300"
                style={{ transition: 'color 0.3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = cfg.color}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = ''}
              >
                {project.title}
              </h3>
              <p className="text-[11px] font-mono text-[var(--text-muted)]">{project.tagline}</p>
            </div>
            <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed flex-1">{project.description}</p>

            {/* Tech chips — slightly elevated Z */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[rgba(255,255,255,0.06)]" style={{ transform: 'translateZ(8px)' }}>
              {project.technologies.slice(0, 4).map(tech => (
                <span key={tech}
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono text-[var(--text-muted)] transition-all hover:text-white"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${cfg.color}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 8px rgba(${hexToRgb(cfg.color)}, 0.2)`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >{tech}</span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-[var(--text-muted)]"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >+{project.technologies.length - 4}</span>
              )}
            </div>

            {/* Actions row */}
            <div className="flex items-center justify-between text-[11px] font-mono">
              <button
                onClick={e => { e.stopPropagation(); }}
                className="flex items-center gap-1 transition-colors hover:opacity-80"
                style={{ color: cfg.color }}
              >
                <span>[View Details]</span>
                <ArrowUpRight size={12} />
              </button>
              <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer"
                    className="text-[var(--text-muted)] hover:text-white transition-colors font-mono text-xs"
                    title="GitHub"
                  >&lt;&gt;</a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer"
                    className="text-[var(--text-muted)] hover:text-white transition-colors"
                    title="Live Demo"
                  ><ExternalLink size={13} /></a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const filtered = selectedCategory === 'ALL' ? PROJECTS : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="section-separator mb-16" />
      <div className="max-w-7xl mx-auto">

        <SectionHeading
          number="// SECTION 04"
          title="PROJECTS."
          subtitle="A curated selection of high-performance backend systems and full-stack applications — engineered for scalability, security, and precision."
        />

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-5 border-b border-[rgba(255,255,255,0.06)]">
          <span className="text-[11px] font-mono text-[var(--text-muted)] mr-1 uppercase tracking-wider flex items-center gap-1">
            <Zap size={10} className="text-[var(--accent-cyan)]" />
            Filter:
          </span>
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat;
            const cfg = CAT_CONFIG[cat] ?? null;
            return (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="px-3.5 py-1.5 rounded-full text-[11px] font-mono font-semibold transition-all cursor-pointer relative overflow-hidden"
                style={isActive ? {
                  background: cfg ? `rgba(${hexToRgb(cfg.color)}, 0.18)` : 'rgba(34,211,238,0.14)',
                  color: cfg?.color ?? 'var(--accent-cyan)',
                  border: `1px solid ${cfg?.color ?? 'var(--accent-cyan)'}55`,
                  boxShadow: cfg
                    ? `0 0 20px ${cfg.glow}, inset 0 0 10px rgba(255,255,255,0.02)`
                    : '0 0 20px rgba(34,211,238,0.15)',
                } : {
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--text-muted)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Active indicator glow */}
                {isActive && (
                  <motion.span
                    layoutId="filterGlow"
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: cfg ? `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)` : 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)' }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <HoloCard
                key={project.id}
                project={project}
                onClick={() => setActiveProjectModal(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 spotlight"
          style={{
            background: 'rgba(20,26,41,0.7)',
            border: '1px solid rgba(34,211,238,0.12)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 40px rgba(34,211,238,0.05)',
          }}
        >
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase">// Repository Archive</h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Looking for more backend repos, microservice skeletons & algorithm benchmarks?
            </p>
          </div>
          <motion.a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="btn-ghost flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-mono whitespace-nowrap shrink-0"
          >
            <span>Explore All on GitHub</span>
            <ExternalLink size={13} />
          </motion.a>
        </motion.div>

      </div>

      <ProjectModal project={activeProjectModal} onClose={() => setActiveProjectModal(null)} />
      <div className="section-separator mt-16" />
    </section>
  );
};
