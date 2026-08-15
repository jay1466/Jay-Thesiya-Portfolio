import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileText, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavItem {
  name: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Academics', href: '#academics', id: 'academics' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Certificates', href: '#certifications', id: 'certifications' },
  { name: 'Resume', href: '#resume', id: 'resume' },
  { name: 'Profiles', href: '#profiles', id: 'profiles' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section spy with reliable bounding rect
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      
      let currentSection = NAV_ITEMS[0].id;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 300) {
            currentSection = NAV_ITEMS[i].id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(element, { offset: -70 });
      } else {
        const topOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      id="main-navigation"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060608]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      {/* Top Skip to Content for Accessibility */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:font-mono focus:text-xs"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Monogram & Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2 text-white font-mono text-sm tracking-tight font-medium transition-transform duration-200 hover:-translate-y-0.5"
          id="nav-brand-logo"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-white tracking-wide">Jay Thesiya</span>
        </a>

        {/* Desktop Navigation Links with micro-shift and underline indicator */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.a
                key={item.id}
                id={`nav-link-${item.id}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                whileHover={{ y: -1 }}
                className={`relative px-3 py-1.5 text-xs font-mono transition-colors tracking-wide cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Quick Social & Action Links */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-950/60 rounded-sm hover:border-zinc-700 transition-colors"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <Github size={14} />
          </motion.a>

          <motion.a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-950/60 rounded-sm hover:border-zinc-700 transition-colors"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={14} />
          </motion.a>

          <motion.a
            href="#resume"
            onClick={(e) => handleNavClick(e, '#resume')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black font-mono text-[11px] font-bold tracking-wider uppercase hover:bg-zinc-200 transition-colors"
          >
            <FileText size={12} />
            <span>CV</span>
          </motion.a>
        </div>

        {/* Mobile Menu Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white border border-zinc-850 bg-zinc-950/80 rounded-sm"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#0a0a0e] border-b border-zinc-800 px-4 pt-3 pb-6 space-y-2 overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2 pt-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 text-xs font-mono rounded-sm border ${
                    activeSection === item.id
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-zinc-950 border-zinc-850 text-zinc-300 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-850 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">Jay Thesiya Portfolio</span>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                >
                  <Github size={14} />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                >
                  <Linkedin size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
