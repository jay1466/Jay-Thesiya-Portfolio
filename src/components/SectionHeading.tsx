import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  index: string;
  label: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}

/** Editorial section header: index · label on the left, oversized title on the right. */
export const SectionHeading: React.FC<SectionHeadingProps> = ({ index, label, children, aside }) => (
  <Reveal className="grid-12 rule pt-4 mb-14 md:mb-24 gap-y-6">
    <span className="label col-span-1 md:col-span-1">({index})</span>
    <span className="label col-span-3 md:col-span-3">{label}</span>
    <div className="col-span-4 md:col-span-8">
      <h2 className="display text-[clamp(2.6rem,7.2vw,7rem)]">{children}</h2>
      {aside && <div className="mt-6 max-w-xl text-[var(--ink-2)] text-base md:text-lg leading-relaxed">{aside}</div>}
    </div>
  </Reveal>
);
