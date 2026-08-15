import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleOnHover?: number;
  onClick?: () => void;
  glowColor?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 6,
  scaleOnHover = 1.015,
  onClick,
  glowColor = 'rgba(99, 102, 241, 0.18)',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-maxTilt, maxTilt]);
  const glareX = useTransform(smoothMouseX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothMouseY, [0, 1], ['0%', '100%']);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice && !reducedMotion) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      className={`relative rounded-sm transition-shadow duration-300 ${className}`}
    >
      <motion.div
        style={{
          rotateX: isTouchDevice || reducedMotion ? 0 : rotateX,
          rotateY: isTouchDevice || reducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: isTouchDevice || reducedMotion ? 1 : scaleOnHover,
          y: isTouchDevice ? 0 : -4,
        }}
        transition={{ duration: 0.25 }}
        className="w-full h-full relative rounded-sm overflow-hidden p-[1px]"
      >
        {/* Interactive Border Tracer Highlight */}
        {!isTouchDevice && !reducedMotion && (
          <motion.div
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(350px circle at ${glareX.get()} ${glareY.get()}, rgba(129, 140, 248, 0.6), rgba(99, 102, 241, 0.2), transparent 70%)`,
            }}
            transition={{ opacity: { duration: 0.2 } }}
            className="pointer-events-none absolute inset-0 z-0"
          />
        )}

        {/* Internal Content Container */}
        <div className="relative z-10 w-full h-full bg-[#0a0a0e] rounded-sm overflow-hidden flex flex-col justify-between">
          {/* Dynamic Light Sheen / Ambient Glare Overlay */}
          {!isTouchDevice && !reducedMotion && (
            <motion.div
              style={{
                opacity: isHovered ? 0.12 : 0,
                background: `radial-gradient(circle 360px at ${glareX.get()} ${glareY.get()}, rgba(255, 255, 255, 0.9), transparent 75%)`,
              }}
              transition={{ opacity: { duration: 0.2 } }}
              className="pointer-events-none absolute inset-0 rounded-sm z-30 mix-blend-overlay transition-opacity"
            />
          )}

          {/* Subtle interior spotlight glow */}
          {!isTouchDevice && (
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(420px circle at 50% 50%, ${glowColor}, transparent 80%)`,
              }}
            />
          )}

          <div className="relative z-20 w-full h-full flex flex-col justify-between">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
