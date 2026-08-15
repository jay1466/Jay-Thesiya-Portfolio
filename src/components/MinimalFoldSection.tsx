import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface MinimalFoldSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  isHero?: boolean;
  direction?: 'left' | 'right' | 'none';
  index?: number;
}

/**
 * MinimalFoldSection:
 * Minimalist, high-end scroll entrance where each section smoothly glides in
 * from the left or right side and locks securely into its position.
 * 
 * Alternates between left and right side entrances.
 * Clean, modern, 0% funky — pure Apple / Vercel grade precision.
 */
export const MinimalFoldSection: React.FC<MinimalFoldSectionProps> = ({
  children,
  id,
  className = '',
  isHero = false,
  direction,
  index = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  if (isHero) {
    return (
      <div id={id} className={`relative w-full ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full ${className}`}
    >
      <motion.div
        initial={{
          opacity: 0,
          rotateX: isHero ? 0 : 15,
          rotateY: direction === 'left' ? -10 : direction === 'right' ? 10 : 0,
          y: 35,
          scale: 0.96,
          z: -50
        }}
        whileInView={{
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          y: 0,
          scale: 1,
          z: 0
        }}
        viewport={{ once: true, margin: "0px" }}
        transition={{
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformPerspective: 1200, transformStyle: 'preserve-3d' }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};
