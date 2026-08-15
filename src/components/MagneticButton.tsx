import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
  as?: 'button' | 'a';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  id,
  onClick,
  href,
  target,
  rel,
  strength = 0.25,
  as = 'button',
}) => {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Only on non-touch devices and non-reduced-motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Max 6px displacement
    const maxDisplacement = 6;
    const targetX = Math.max(Math.min(middleX * strength, maxDisplacement), -maxDisplacement);
    const targetY = Math.max(Math.min(middleY * strength, maxDisplacement), -maxDisplacement);

    setPosition({ x: targetX, y: targetY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      // @ts-ignore
      ref={ref}
      id={id}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.15 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center cursor-pointer transition-colors ${className}`}
    >
      {children}
    </Component>
  );
};
