import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface CountUpProps {
  value: string;
  duration?: number;
}

export const CountUp: React.FC<CountUpProps> = ({ value, duration = 1.6 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayValue, setDisplayValue] = useState<string>('0');

  useEffect(() => {
    if (!isInView) return;

    // Check if value is a decimal like 8.95
    const isDecimal = value.includes('.');
    // Extract numeric part and suffix (+ or /10 etc)
    const match = value.match(/([\d.]+)(.*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(match[1]);
    const suffix = match[2] || '';
    const startTime = performance.now();
    const durationMs = duration * 1000;

    let animationFrameId: number;

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentNum = targetNum * easeOut;

      if (isDecimal) {
        setDisplayValue(`${currentNum.toFixed(2)}${suffix}`);
      } else {
        setDisplayValue(`${Math.floor(currentNum)}${suffix}`);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
};
