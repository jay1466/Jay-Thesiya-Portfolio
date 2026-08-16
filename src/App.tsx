import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import Lenis from 'lenis';
import { IntroVideo } from './components/IntroVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { ResumeSection } from './components/ResumeSection';
import { SocialProfiles } from './components/SocialProfiles';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { MinimalFoldSection } from './components/MinimalFoldSection';
import { ParticleField } from './components/ParticleField';

export default function App() {
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [showFloatingTop, setShowFloatingTop] = useState<boolean>(false);

  /* ── High-performance smooth scrolling ── */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      autoRaf: false,
    });

    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animId = requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const elem = document.querySelector(href);
        if (elem) {
          e.preventDefault();
          lenis.scrollTo(elem as HTMLElement, { offset: -70 });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('click', handleAnchorClick);
      delete (window as any).__lenis;
      lenis.destroy();
    };
  }, []);

  /* ── Scroll progress bar ── */
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    return scrollY.on('change', latest => setShowFloatingTop(latest > 500));
  }, [scrollY]);

  const scrollToTop = () => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-[var(--text-primary)] relative selection:bg-[var(--accent-cyan)] selection:text-black"
      style={{ background: 'var(--bg)' }}
    >
      {/* Global Canvas Particle Field */}
      <ParticleField count={75} />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Cinematic intro */}
      <AnimatePresence>
        {showPreloader && (
          <IntroVideo onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      {/* Gradient scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet), var(--accent-pink))',
          boxShadow: '0 0 8px rgba(0,229,255,0.7)',
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content" className="relative z-10">
        <MinimalFoldSection isHero>
          <Hero />
        </MinimalFoldSection>

        <MinimalFoldSection index={0} direction="left">
          <About />
        </MinimalFoldSection>

        <MinimalFoldSection index={1} direction="right">
          <Experience />
        </MinimalFoldSection>

        <MinimalFoldSection index={2} direction="left">
          <Education />
        </MinimalFoldSection>

        <MinimalFoldSection index={3} direction="right">
          <Projects />
        </MinimalFoldSection>

        <MinimalFoldSection index={4} direction="left">
          <Skills />
        </MinimalFoldSection>

        <MinimalFoldSection index={5} direction="right">
          <Certifications />
        </MinimalFoldSection>

        <MinimalFoldSection index={6} direction="left">
          <ResumeSection />
        </MinimalFoldSection>

        <MinimalFoldSection index={7} direction="right">
          <SocialProfiles />
        </MinimalFoldSection>

        <MinimalFoldSection index={8} direction="left">
          <Contact />
        </MinimalFoldSection>
      </main>

      <Footer />

      {/* Back to top — gradient ring */}
      <AnimatePresence>
        {showFloatingTop && (
          <motion.button
            id="floating-back-to-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.85 }}
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center rounded-full cursor-pointer"
            style={{
              background: 'rgba(2,2,9,0.9)',
              border: '1px solid rgba(0,229,255,0.35)',
              boxShadow: '0 0 20px rgba(0,229,255,0.2), 0 4px 20px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(12px)',
            }}
            title="Scroll to top"
            aria-label="Scroll to top"
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0,229,255,0.4), 0 0 60px rgba(139,92,246,0.2)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,255,0.7)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,229,255,0.2), 0 4px 20px rgba(0,0,0,0.5)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,255,0.35)';
            }}
          >
            <ArrowUp size={16} style={{ color: 'var(--accent-cyan)' }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
