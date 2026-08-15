import React from 'react';
import { motion } from 'motion/react';

interface SplitSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface SplitWingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * SplitSection:
 * Divides any section into two distinct wings (Left & Right) that smoothly glide in
 * from opposite sides upon scrolling into view and pace together into their final docked position.
 * 
 * Minimalist, silky Apple/Linear physics. 0% funky, 100% precision.
 */
export const SplitSection: React.FC<SplitSectionProps> = ({
  children,
  className = '',
  id,
}) => {
  return (
    <div id={id} className={`w-full overflow-x-clip ${className}`}>
      {children}
    </div>
  );
};

export const SplitLeft: React.FC<SplitWingProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -40,
        y: 10,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const SplitRight: React.FC<SplitWingProps> = ({
  children,
  className = '',
  delay = 0.08,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 40,
        y: 10,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
