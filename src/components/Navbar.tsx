import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLocalTime } from '../hooks/useLocalTime';
import { ThemeSwitch } from './ThemeSwitch';

export const NAV_ITEMS = [
  { name: 'About',        id: 'about' },
  { name: 'Experience',   id: 'experience' },
  { name: 'Projects',     id: 'projects' },
  { name: 'Skills',       id: 'skills' },
  { name: 'Education',    id: 'academics' },
  { name: 'Certificates', id: 'certifications' },
  { name: 'Contact',      id: 'contact' },
];

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as any).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: id === 'home' ? 0 : -56 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const Navbar: React.FC = () => {
  const time = useLocalTime();
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      let current = '';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 160) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (open) { lenis?.stop(); document.body.style.overflow = 'hidden'; }
    else { lenis?.start(); document.body.style.overflow = ''; }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled && !open ? 'bg-[var(--paper)]/90 backdrop-blur-sm border-b border-[var(--rule)]' : 'border-b border-transparent'
        }`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 btn-ink">
          Skip to content
        </a>
        <div className="wrap h-14 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-6">
          <a
            href="#home"
            onClick={e => go(e, 'home')}
            className="font-semibold tracking-tight text-[15px] whitespace-nowrap"
          >
            Jay Thesiya<span className="text-[var(--accent)]">.</span>
          </a>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_ITEMS.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={e => go(e, item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                className={`label !text-[0.7rem] transition-colors flex items-center gap-1.5 ${
                  active === item.id ? '!text-[var(--ink)]' : 'hover:!text-[var(--ink)]'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 bg-[var(--accent)] transition-transform duration-300 ${
                    active === item.id ? 'scale-100' : 'scale-0'
                  }`}
                />
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-5">
            <span className="label hidden md:inline whitespace-nowrap">Surat {time} IST</span>
            <ThemeSwitch />
            <button
              onClick={() => setOpen(o => !o)}
              className="lg:hidden label !text-[var(--ink)] cursor-pointer w-10 text-right"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 bg-[var(--paper)] pt-20 pb-8 flex flex-col lg:hidden"
          >
            <nav aria-label="Mobile" className="wrap flex-1 flex flex-col justify-center">
              <ul>
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="rule"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={e => go(e, item.id)}
                      className="flex items-baseline gap-4 py-3"
                    >
                      <span className="label w-6">0{i + 1}</span>
                      <span className={`display text-[clamp(2rem,9vw,3.5rem)] ${active === item.id ? 'text-[var(--accent)]' : ''}`}>
                        {item.name}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="wrap flex items-center justify-between label">
              <span>Surat {time} IST</span>
              <a href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noreferrer" className="!text-[var(--ink)] u-link">
                Résumé ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
