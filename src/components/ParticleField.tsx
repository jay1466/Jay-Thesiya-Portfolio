import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number;
  pulseOffset: number;
}

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 90,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animIdRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight || window.innerHeight;
      init();
    };

    const init = () => {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 2 + 0.6,
        opacity: Math.random() * 0.55 + 0.15,
        hue: Math.random() > 0.55 ? 188 : 262, // cyan(~188) or violet(~262)
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    };

    const drawConnections = (p: Particle, particles: Particle[]) => {
      const maxDist = 140;
      for (const other of particles) {
        if (other === p) continue;
        const dx = p.x - other.x;
        const dy = p.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.22;
          // blend hue between the two particles
          const blendHue = (p.hue + other.hue) / 2;
          ctx!.beginPath();
          ctx!.strokeStyle = `hsla(${blendHue}, 95%, 72%, ${alpha})`;
          ctx!.lineWidth = 0.7;
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(other.x, other.y);
          ctx!.stroke();
        }
      }
    };

    const drawMouseAttract = (p: Particle) => {
      const dx = p.x - mouseRef.current.x;
      const dy = p.y - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 130;
      if (dist < repelRadius && dist > 0) {
        const force = (repelRadius - dist) / repelRadius;
        p.vx += (dx / dist) * force * 0.35;
        p.vy += (dy / dist) * force * 0.35;
      }
    };

    const maxSpeed = 1.0;
    const clampSpeed = (v: number) => Math.max(-maxSpeed, Math.min(maxSpeed, v));

    const animate = (timestamp: number) => {
      timeRef.current = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (const p of particles) {
        drawMouseAttract(p);
        p.vx *= 0.988;
        p.vy *= 0.988;
        p.vx = clampSpeed(p.vx);
        p.vy = clampSpeed(p.vy);
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        drawConnections(p, particles);

        // Pulse opacity
        const pulse = 1 + 0.3 * Math.sin(timestamp / 1800 + p.pulseOffset);
        const dynamicOpacity = p.opacity * pulse;

        // Draw glow aura
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 95%, 76%, ${dynamicOpacity * 0.8})`);
        grad.addColorStop(0.5, `hsla(${p.hue}, 90%, 70%, ${dynamicOpacity * 0.3})`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 70%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 82%, ${dynamicOpacity * 1.4})`;
        ctx.fill();
      }

      animIdRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };

    resize();
    animate(0);

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.75 }}
      aria-hidden="true"
    />
  );
};
