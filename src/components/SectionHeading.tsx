import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  accentColor?: string;
  className?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  subtitle,
  accentColor = 'bg-indigo-500',
  className = '',
  align = 'left',
}) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : ''} ${className}`}>
      {/* 1. Section Number & Expanding Indicator Line */}
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center gap-2 mb-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className={`h-[2px] w-6 ${accentColor} inline-block`}
        />
        <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold">
          {number}
        </span>
      </motion.div>

      {/* 2. Main Section Heading with clean masked upward reveal */}
      <div className="overflow-hidden py-1">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.1]"
        >
          {title}
        </motion.h2>
      </div>

      {/* 3. Subtitle / Description */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-3 text-xs sm:text-sm font-mono text-zinc-400 max-w-3xl leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

