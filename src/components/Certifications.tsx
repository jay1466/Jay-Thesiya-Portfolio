import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Globe, Code, FileText, Smartphone, Cpu, Wrench, Eye, Sparkles } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { Certification } from '../types/portfolio';
import { CertificateModal } from './CertificateModal';
import { SectionHeading } from './SectionHeading';

/* ── Category & icon config ─────────────────────────────────────── */
const CERT_ICON_MAP: Record<string, { icon: React.FC<any>; color: string; glow: string }> = {
  MySQL:       { icon: Award,      color: '#22d3ee', glow: 'rgba(34,211,238,0.2)'   },
  'Open Source':{ icon: Globe,     color: '#10b981', glow: 'rgba(16,185,129,0.2)'  },
  CodeFest:    { icon: Code,       color: '#f59e0b', glow: 'rgba(245,158,11,0.2)'  },
  'Java Certificate': { icon: FileText, color: '#8b5cf6', glow: 'rgba(139,92,246,0.2)' },
  Firebase:    { icon: Smartphone, color: '#ec4899', glow: 'rgba(236,72,153,0.2)'  },
  'Gen AI':    { icon: Cpu,        color: '#6366f1', glow: 'rgba(99,102,241,0.2)'  },
  Maven:       { icon: Wrench,     color: '#f59e0b', glow: 'rgba(245,158,11,0.2)'  },
};

function getCertConfig(title: string) {
  for (const [key, cfg] of Object.entries(CERT_ICON_MAP)) {
    if (title.includes(key)) return cfg;
  }
  return { icon: Award, color: '#22d3ee', glow: 'rgba(34,211,238,0.2)' };
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `${r},${g},${b}`;
}

/* ── Holographic Cert Card ──────────────────────────────────────── */
const CertCard: React.FC<{ cert: Certification; idx: number; onClick: () => void }> = ({
  cert, idx, onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovered, setHovered] = useState(false);
  const cfg = getCertConfig(cert.title);
  const CertIcon = cfg.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setShine({ x, y, opacity: 1 });
    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ rotateX: tiltX, rotateY: tiltY });
  };
  const handleMouseLeave = () => {
    setShine(s => ({ ...s, opacity: 0 }));
    setTilt({ rotateX: 0, rotateY: 0 });
    setHovered(false);
  };

  const catColor = cert.category === 'Technical' ? '#22d3ee' : '#10b981';
  const catGlow  = cert.category === 'Technical' ? 'rgba(34,211,238,0.2)' : 'rgba(16,185,129,0.2)';

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 35, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setHovered(true)}
      className="h-full cursor-pointer group"
      style={{ perspective: '1000px' }}
      onClick={onClick}
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
            border: `1px solid ${hovered ? cfg.color + '50' : 'rgba(34,211,238,0.1)'}`,
            boxShadow: hovered
              ? `0 0 50px ${cfg.glow}, 0 0 100px rgba(0,0,0,0.3), 0 8px 50px rgba(0,0,0,0.7)`
              : '0 4px 30px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(24px)',
            transition: 'border-color 0.35s, box-shadow 0.35s',
          }}
        >
          {/* Mouse-follow iridescent shimmer */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl z-10 transition-opacity duration-300"
            style={{
              opacity: shine.opacity,
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(34,211,238,0.1) 0%, rgba(139,92,246,0.08) 35%, rgba(236,72,153,0.06) 55%, transparent 70%)`,
            }}
          />
          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${cfg.color}60, rgba(139,92,246,0.4), transparent)`,
              opacity: shine.opacity,
            }}
          />

          {/* Preview area */}
          <div
            onClick={onClick}
            className="relative overflow-hidden flex-shrink-0 cursor-pointer"
            style={{
              aspectRatio: '16 / 10',
              background: `linear-gradient(135deg, rgba(14,18,29,1), rgba(20,26,45,1))`,
              transform: 'translateZ(10px)',
            } as any}
          >
            {/* Background glow */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 100%, ${cfg.glow} 0%, transparent 65%)`,
              }}
            />

            {/* Icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <motion.div
                animate={hovered ? {
                  boxShadow: [`0 0 16px ${cfg.glow}`, `0 0 40px ${cfg.glow}, 0 0 80px ${cfg.glow}`, `0 0 16px ${cfg.glow}`],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-4 rounded-2xl mb-3"
                style={{ background: `rgba(${hexToRgb(cfg.color)}, 0.12)`, border: `1px solid rgba(${hexToRgb(cfg.color)}, 0.3)` }}
              >
                <CertIcon size={22} style={{ color: cfg.color }} />
              </motion.div>
              <span className="text-[11px] font-mono uppercase tracking-widest font-bold" style={{ color: cfg.color }}>
                {cert.issuerBadge || cert.issuer}
              </span>
              <span className="text-[9px] font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
                {cert.imagePlaceholderText || 'VERIFIED CREDENTIAL'}
              </span>
            </div>

            {/* Category badge */}
            <div className="absolute top-3 left-3 z-20">
              <span
                className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold"
                style={{
                  background: `rgba(${hexToRgb(catColor)}, 0.15)`,
                  border: `1px solid rgba(${hexToRgb(catColor)}, 0.4)`,
                  color: catColor,
                  boxShadow: `0 0 10px rgba(${hexToRgb(catColor)}, 0.2)`,
                }}
              >
                {cert.category}
              </span>
            </div>

            {/* Year badge */}
            <div className="absolute top-3 right-3 z-20">
              <span
                className="px-2.5 py-1 rounded-full text-[9px] font-mono"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-muted)',
                }}
              >
                {cert.year}
              </span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ background: 'rgba(10,14,23,0.75)', backdropFilter: 'blur(4px)' }}>
              <motion.span
                initial={false}
                animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                  color: '#fff',
                  boxShadow: '0 0 20px rgba(34,211,238,0.4)',
                }}
              >
                <Eye size={12} />
                View Credential
              </motion.span>
            </div>
          </div>

          {/* Card body */}
          <div className="p-5 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(6px)' }}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-semibold" style={{ color: cfg.color }}>
                  {cert.issuer}
                </span>
              </div>
              <h3
                onClick={onClick}
                className="text-sm sm:text-base font-bold text-white tracking-tight font-display transition-colors duration-300 cursor-pointer"
                style={{ color: hovered ? cfg.color : 'white' }}
              >
                {cert.title}
              </h3>
              <p className="text-[11px] mt-2 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {cert.description}
              </p>
            </div>

            {/* Footer */}
            <div
              className="mt-4 pt-3 border-t flex items-center justify-between text-[10px] font-mono"
              style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }} />
                {cert.credentialId}
              </span>
              <button
                onClick={onClick}
                className="flex items-center gap-1 transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = cfg.color}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
              >
                <Sparkles size={10} />
                [Details]
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Certifications Section ─────────────────────────────────────── */
export const Certifications: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Technical' | 'Achievement'>('All');
  const [activeCertModal, setActiveCertModal] = useState<Certification | null>(null);

  const filteredCerts = selectedFilter === 'All'
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter(c => c.category === selectedFilter);

  const FILTER_COLORS: Record<string, string> = {
    All:         '#22d3ee',
    Technical:   '#8b5cf6',
    Achievement: '#10b981',
  };

  return (
    <section
      id="certifications"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="section-separator mb-16" />
      <div className="max-w-7xl mx-auto">

        <SectionHeading
          number="// SECTION 06"
          title="VERIFIED EXPERTISE."
          subtitle="A continuous pursuit of knowledge. Official recognitions validating proficiency in modern software engineering practices, cloud architectures, and core programming languages."
        />

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 pb-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <span className="text-[11px] font-mono uppercase tracking-wider flex items-center gap-1 mr-1" style={{ color: 'var(--text-muted)' }}>
            <Sparkles size={10} style={{ color: 'var(--accent-cyan)' }} />
            Filter:
          </span>
          {(['All', 'Technical', 'Achievement'] as const).map(filter => {
            const isActive = selectedFilter === filter;
            const fc = FILTER_COLORS[filter];
            return (
              <motion.button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="px-3.5 py-1.5 rounded-full text-[11px] font-mono font-semibold transition-all cursor-pointer relative overflow-hidden"
                style={isActive ? {
                  background: `rgba(${hexToRgb(fc)}, 0.18)`,
                  color: fc,
                  border: `1px solid ${fc}55`,
                  boxShadow: `0 0 20px rgba(${hexToRgb(fc)}, 0.2), inset 0 0 10px rgba(255,255,255,0.02)`,
                } : {
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--text-muted)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="certFilterGlow"
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, rgba(${hexToRgb(fc)}, 0.12) 0%, transparent 70%)` }}
                  />
                )}
                <span className="relative z-10">{filter.toUpperCase()}</span>
              </motion.button>
            );
          })}

          {/* Counter */}
          <span
            className="ml-auto text-[10px] font-mono px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(34,211,238,0.06)', color: 'var(--text-muted)', border: '1px solid rgba(34,211,238,0.15)' }}
          >
            {filteredCerts.length} credential{filteredCerts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, idx) => (
              <CertCard
                key={cert.id}
                cert={cert}
                idx={idx}
                onClick={() => setActiveCertModal(cert)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      <CertificateModal
        cert={activeCertModal}
        certList={filteredCerts}
        onClose={() => setActiveCertModal(null)}
        onSelectCert={newCert => setActiveCertModal(newCert)}
      />
      <div className="section-separator mt-16" />
    </section>
  );
};
