import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileText, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavItem { name: string; href: string; id: string; }

const NAV_ITEMS: NavItem[] = [
  { name: 'Home',         href: '#home',          id: 'home'          },
  { name: 'About',        href: '#about',         id: 'about'         },
  { name: 'Experience',   href: '#experience',    id: 'experience'    },
  { name: 'Academics',    href: '#academics',     id: 'academics'     },
  { name: 'Projects',     href: '#projects',      id: 'projects'      },
  { name: 'Skills',       href: '#skills',        id: 'skills'        },
  { name: 'Certificates', href: '#certifications',id: 'certifications'},
  { name: 'Resume',       href: '#resume',        id: 'resume'        },
  { name: 'Profiles',     href: '#profiles',      id: 'profiles'      },
  { name: 'Contact',      href: '#contact',       id: 'contact'       },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      let current = NAV_ITEMS[0].id;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= 280) {
          current = NAV_ITEMS[i].id;
          break;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: -72 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      id="main-navigation"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
      style={scrolled ? {
        background: 'rgba(2,2,9,0.72)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        borderBottom: '1px solid rgba(0,229,255,0.12)',
        boxShadow: '0 4px 60px rgba(0,0,0,0.6), 0 0 1px rgba(0,229,255,0.12), 0 1px 0 rgba(139,92,246,0.06)',
      } : {
        background: 'transparent',
      }}
    >
      {/* Luminous bottom border line (only when scrolled) */}
      {scrolled && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.4) 30%, rgba(139,92,246,0.4) 70%, transparent 100%)',
          }}
        />
      )}

      {/* Skip link */}
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:font-mono focus:text-xs">
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Brand — with animated glow pulse */}
        <a
          href="#home"
          onClick={e => handleNavClick(e, '#home')}
          id="nav-brand-logo"
          className="group flex items-center gap-2.5 transition-all duration-300 hover:opacity-90"
        >
          <div className="relative">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" style={{ boxShadow: '0 0 10px #10b981, 0 0 20px rgba(16,185,129,0.4)' }} />
            </span>
          </div>
          <motion.span
            className="font-bold text-white text-sm tracking-wide font-display"
            whileHover={{ scale: 1.02 }}
          >
            Jay{' '}
            <motion.span
              className="gradient-text-animated"
              animate={{}}
            >
              Thesiya
            </motion.span>
          </motion.span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {NAV_ITEMS.map(item => {
            const isActive = activeSection === item.id;
            return (
              <motion.a
                key={item.id}
                id={`nav-link-${item.id}`}
                href={item.href}
                onClick={e => handleNavClick(e, item.href)}
                whileHover={{ y: -1 }}
                className={`relative px-3 py-1.5 text-[11px] font-mono tracking-wider cursor-pointer transition-all rounded-md ${
                  isActive
                    ? 'text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
                style={isActive ? { background: 'rgba(0,229,255,0.06)' } : {}}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0.5 left-2.5 right-2.5 h-[2px] rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))',
                      boxShadow: '0 0 8px rgba(0,229,255,0.6)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-2">
          {[
            { href: PERSONAL_INFO.github, icon: <Github size={14} />, label: 'GitHub' },
            { href: PERSONAL_INFO.linkedin, icon: <Linkedin size={14} />, label: 'LinkedIn' },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              title={label}
              aria-label={label}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-cyan)] rounded-lg transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,255,0.4)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,229,255,0.2), inset 0 0 8px rgba(0,229,255,0.04)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,229,255,0.06)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              {icon}
            </motion.a>
          ))}

          <motion.a
            href="#resume"
            onClick={e => handleNavClick(e, '#resume')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-mono font-bold tracking-wider text-white btn-primary ml-1"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <FileText size={11} />
              Resume
            </span>
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[var(--text-muted)] hover:text-white rounded-lg transition-colors"
          style={{
            border: '1px solid rgba(0,229,255,0.18)',
            background: 'rgba(0,229,255,0.05)',
            boxShadow: mobileMenuOpen ? '0 0 16px rgba(0,229,255,0.2)' : 'none',
          }}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="lg:hidden overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(3,3,14,0.96)',
              backdropFilter: 'blur(28px) saturate(180%)',
              borderBottom: '1px solid rgba(0,229,255,0.14)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map(item => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={e => handleNavClick(e, item.href)}
                    className={`px-3 py-2.5 text-xs font-mono rounded-lg border transition-all ${
                      activeSection === item.id
                        ? 'text-[var(--accent-cyan)] font-bold'
                        : 'text-[var(--text-muted)] hover:text-white'
                    }`}
                    style={activeSection === item.id
                      ? {
                          background: 'rgba(0,229,255,0.09)',
                          borderColor: 'rgba(0,229,255,0.35)',
                          boxShadow: '0 0 12px rgba(0,229,255,0.12)',
                        }
                      : { background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }
                    }
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="pt-4 mt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[var(--text-muted)]">Jay Thesiya Portfolio</span>
                <div className="flex items-center gap-2">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"
                    className="p-2 border border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] hover:text-[var(--accent-cyan)] rounded-lg transition-all"
                  ><Github size={14} /></a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer"
                    className="p-2 border border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] hover:text-[var(--accent-cyan)] rounded-lg transition-all"
                  ><Linkedin size={14} /></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
