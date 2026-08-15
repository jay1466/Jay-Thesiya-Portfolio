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

export default function App() {
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [showFloatingTop, setShowFloatingTop] = useState<boolean>(false);

  // Initialize high-performance, studio-grade smooth scrolling
  useEffect(() => {
    // Respect reduced motion settings
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

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

    // Global scroll listener for hash anchor links
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

  // Scroll Progress Bar with smooth spring
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setShowFloatingTop(latest > 500);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060608] text-[#e4e4eb] relative selection:bg-white selection:text-black">
      
      {/* Desktop subtle custom cursor */}
      <CustomCursor />

      {/* Cinematic intro sequence on initial load */}
      <AnimatePresence>
        {showPreloader && (
          <IntroVideo onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      {/* Top subtle reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Main Navigation */}
      <Navbar />

      {/* Main Single-Page Content Stream with Minimalist Unfolding Scroll Physics */}
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

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showFloatingTop && (
          <motion.button
            id="floating-back-to-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 p-3 bg-zinc-950/90 border border-zinc-800 hover:border-zinc-500 text-zinc-300 hover:text-white rounded-none shadow-2xl backdrop-blur-md transition-colors cursor-pointer"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
