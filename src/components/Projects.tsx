import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { ProjectThumb } from './ProjectThumb';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const titleCase = (s: string) => (s.includes('/') ? s : s.charAt(0) + s.slice(1).toLowerCase());

/** Floating preview that trails the cursor while hovering a project row (fine pointers only). */
const CursorPreview: React.FC<{ project: Project | null }> = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28 });
  const sy = useSpring(y, { stiffness: 260, damping: 28 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX + 24); y.set(e.clientY - 120); };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-30 hidden [@media(hover:hover)]:block"
    >
      <AnimatePresence>
        {project && (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-[340px] aspect-[16/10] overflow-hidden bg-[var(--paper-2)] shadow-2xl absolute"
          >
            <ProjectThumb project={project} className="!grayscale-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="wrap py-20 md:py-32">
      <SectionHeading
        index="03"
        label="Selected work"
        aside="Backend-heavy builds across fintech, security, healthcare and e-commerce. Open any project for the architecture and details."
      >
        Things I’ve <span className="serif">built</span>.
      </SectionHeading>

      <ul className="border-b border-[var(--rule)]" onMouseLeave={() => setHovered(null)}>
        {PROJECTS.map((project, i) => (
          <Reveal as="li" key={project.id} delay={i * 0.04} className="rule">
            <button
              onClick={() => { setHovered(null); setSelected(project); }}
              onMouseEnter={() => setHovered(project)}
              onFocus={() => setHovered(null)}
              className="row-hover group w-full text-left grid-12 items-center gap-y-3 py-6 md:py-9 cursor-pointer"
            >
              <span className="label col-span-1 md:pl-3 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span className="col-span-3 md:col-span-6 display text-[clamp(1.9rem,5vw,4.6rem)] !leading-[1] transition-[transform,color] duration-500 group-hover:translate-x-2 md:group-hover:translate-x-4 group-hover:text-[var(--accent)]">
                {project.title}
              </span>
              <span className="col-span-3 col-start-2 md:col-span-3 md:col-start-auto text-[var(--ink-2)] text-sm md:text-base leading-snug md:pr-4">
                {project.tagline}
              </span>
              <span className="hidden md:flex md:col-span-2 items-center justify-between pr-3">
                <span className="label">{titleCase(project.category)}</span>
                <span className="text-2xl transition-transform duration-500 group-hover:rotate-45">↗</span>
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-10 flex justify-end">
        <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="label !text-[var(--ink)] u-link">
          More on GitHub ↗
        </a>
      </Reveal>

      <CursorPreview project={hovered} />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};
