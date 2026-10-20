import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES, PERSONAL_INFO } from '../data/portfolioData';
import { useLocalTime } from '../hooks/useLocalTime';
import { scrollToId } from './Navbar';

const current = EXPERIENCES.find(e => e.current);
const EASE = [0.22, 1, 0.36, 1] as const;

/** Each headline line slides up from behind a mask. */
const Line: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => (
  <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
    <motion.span
      className="block"
      initial={{ y: '105%' }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

const STACK = ['Java', 'Spring Boot', 'REST APIs', 'Microservices', 'React', 'PostgreSQL', 'MySQL', 'Docker', 'Hibernate', 'AWS'];

export const Hero: React.FC = () => {
  const time = useLocalTime();

  return (
    <section id="home" className="relative pt-28 md:pt-36 flex flex-col min-h-[100svh]">
      <div className="wrap flex-1 flex flex-col">
        <motion.div {...fadeIn(0.1)} className="grid-12 label mb-10 md:mb-16">
          <span className="col-span-2 md:col-span-3">Portfolio — {new Date().getFullYear()}</span>
          <span className="col-span-2 md:col-span-3 text-right md:text-left">Java / Full Stack</span>
          <span className="hidden md:block md:col-span-3">Spring Boot · React · SQL</span>
          <span className="hidden md:block md:col-span-3 text-right">Index ↓</span>
        </motion.div>

        <h1 className="display text-[clamp(3.1rem,11.2vw,12.5rem)]">
          <Line delay={0.15}>Java developer</Line>
          <Line delay={0.25}>building systems</Line>
          <Line delay={0.35}>
            that <span className="serif">don’t</span> break<span className="text-[var(--accent)]">.</span>
          </Line>
        </h1>

        <div className="grid-12 gap-y-8 mt-auto pt-14 md:pt-20 pb-10">
          {current && (
            <motion.div {...fadeIn(0.7)} className="col-span-4 md:col-span-4">
              <p className="label mb-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 bg-[var(--accent)] animate-ping opacity-60" />
                  <span className="relative h-2 w-2 bg-[var(--accent)]" />
                </span>
                Currently
              </p>
              <p className="text-lg md:text-xl leading-snug">
                {current.role} at{' '}
                <a
                  href="#experience"
                  onClick={e => { e.preventDefault(); scrollToId('experience'); }}
                  className="font-medium u-link"
                >
                  {current.company}
                </a>
                <span className="text-[var(--ink-3)]"> — since {current.period.split('–')[0].trim()}</span>
              </p>
            </motion.div>
          )}
          <motion.div {...fadeIn(0.8)} className="col-span-2 md:col-span-3">
            <p className="label mb-2">Based in</p>
            <p className="text-lg md:text-xl leading-snug">
              Surat, India<br />
              <span className="text-[var(--ink-3)] tabular-nums">{time} IST</span>
            </p>
          </motion.div>
          <motion.div {...fadeIn(0.9)} className="col-span-2 md:col-span-5 flex flex-col md:items-end justify-end gap-3">
            <a
              href="#projects"
              onClick={e => { e.preventDefault(); scrollToId('projects'); }}
              className="btn-ink w-full md:w-auto justify-between"
            >
              Selected work <span aria-hidden>↓</span>
            </a>
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="label !text-[var(--ink)] u-link self-start md:self-end"
            >
              Download résumé ↗
            </a>
          </motion.div>
        </div>
      </div>

      {/* Tech marquee */}
      <motion.div
        {...fadeIn(1)}
        className="marquee border-y border-[var(--rule)] py-4 md:py-5 overflow-hidden select-none"
        aria-label={`Tech stack: ${STACK.join(', ')}`}
      >
        <div className="marquee-track flex" aria-hidden>
          {[0, 1].map(copy => (
            <div key={copy} className="flex shrink-0">
              {STACK.map((item, i) => (
                <span key={item} className="flex items-center text-2xl md:text-4xl tracking-tight whitespace-nowrap">
                  <span className={i % 2 ? 'serif' : 'font-medium'}>{item}</span>
                  <span className="mx-6 md:mx-10 text-[var(--accent)] text-xl md:text-2xl">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
