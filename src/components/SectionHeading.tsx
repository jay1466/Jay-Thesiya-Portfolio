import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  subtitle,
  className = '',
  align = 'left',
}) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : ''} ${className}`}>
      {/* Section number row */}
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center gap-2.5 mb-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
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
          {number}
        </span>
      </motion.div>

      {/* Main heading */}
      <div className="overflow-hidden py-1">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-display leading-[1.05]"
        >
          {title}
        </motion.h2>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-3 text-xs sm:text-sm font-mono leading-relaxed max-w-3xl ${
            align === 'center' ? 'mx-auto' : ''
          }`}
          style={{ color: 'var(--text-muted)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
