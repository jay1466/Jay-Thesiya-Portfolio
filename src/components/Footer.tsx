import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLocalTime } from '../hooks/useLocalTime';
import { scrollToId } from './Navbar';

export const Footer: React.FC = () => {
  const time = useLocalTime();
  return (
    <footer className="wrap pt-10 pb-6 overflow-hidden">
      <div className="grid-12 rule pt-5 gap-y-4 label">
        <span className="col-span-2 md:col-span-3">© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
        <span className="col-span-2 md:col-span-3 text-right md:text-left">Surat {time} IST</span>
        <span className="col-span-2 md:col-span-3 flex gap-5">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="u-link !text-[var(--ink)]">GitHub</a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="u-link !text-[var(--ink)]">LinkedIn</a>
        </span>
        <button onClick={() => scrollToId('home')} className="col-span-2 md:col-span-3 text-right u-link !text-[var(--ink)] cursor-pointer justify-self-end">
          Back to top ↑
        </button>
      </div>
      {/* Oversized wordmark, sized to the viewport so it spans edge to edge */}
      <p aria-hidden className="display mt-10 md:mt-16 text-[min(15.5vw,14rem)] leading-[0.8] whitespace-nowrap select-none tracking-[-0.06em]">
        Jay Thesiya<span className="text-[var(--accent)]">.</span>
      </p>
    </footer>
  );
};
