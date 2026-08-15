import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { EXPERIENCES } from '../data/portfolioData';
import { TiltCard } from './TiltCard';
import { SplitLeft, SplitRight } from './SplitSection';

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#060608] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Heading (4 cols, sticky on desktop - reveals from Left) */}
          <SplitLeft className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="flex items-center gap-2 mb-3">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ originX: 0 }}
                className="h-[2px] w-6 bg-indigo-500 inline-block"
              />
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                // SECTION 02
              </span>
            </div>
            
            <div className="overflow-hidden py-1">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.1]">
                EXPERIENCE.
              </h2>
            </div>

            <p className="mt-3 text-xs font-mono text-zinc-400">
              Professional Work History & Engineering Roles
            </p>
          </SplitLeft>

          {/* Right Column: Timeline Cards (8 cols - reveals from Right) */}
          <SplitRight className="lg:col-span-8 relative">
            <div ref={containerRef} className="relative">
              
              {/* Background Line Guide */}
              <div className="absolute left-[7px] top-3 bottom-6 w-[2px] bg-zinc-900 hidden sm:block" />

              {/* Scroll-Linked Progressive Drawing Timeline Line */}
              <motion.div
                style={{ scaleY, originY: 0 }}
                className="absolute left-[7px] top-3 bottom-6 w-[2px] bg-indigo-500 hidden sm:block will-change-transform shadow-[0_0_8px_rgba(99,102,241,0.5)]"
              />

              <div className="space-y-8">
                {EXPERIENCES.map((exp, idx) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative sm:pl-10 group"
                  >
                    {/* Timeline Indicator Node with subtle activation pulse */}
                    <div className="hidden sm:flex absolute left-0 top-1.5 h-4 w-4 items-center justify-center">
                      <span
                        className={`h-3 w-3 rounded-none border transition-all duration-300 ${
                          idx === 0
                            ? 'bg-indigo-500 border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.7)]'
                            : 'bg-zinc-900 border-zinc-700 group-hover:border-zinc-400 group-hover:bg-zinc-800'
                        }`}
                      />
                    </div>

                    {/* Card Container with illuminated spotlight border */}
                    <TiltCard
                      className="border border-zinc-850 hover:border-zinc-700 transition-colors shadow-md card-lift"
                      glowColor="rgba(99, 102, 241, 0.12)"
                    >
                      <div className="p-6">
                        {/* Header: Role & Period */}
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                            {exp.role}
                          </h3>
                          <span className="text-xs font-mono text-zinc-400 px-2 py-0.5 bg-zinc-950 border border-zinc-850 rounded-none w-fit">
                            {exp.period}
                          </span>
                        </div>

                        {/* Company, Location & Type */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-indigo-400 mb-4">
                          <span className="font-semibold">{exp.company}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-zinc-400">{exp.location}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-zinc-400 font-medium">[{exp.type}]</span>
                        </div>

                        {/* Detailed bullet points */}
                        <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 mb-5 leading-relaxed">
                          {exp.description.map((item, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <span className="text-indigo-400 font-mono select-none mt-1">&gt;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Staggered Technology tags */}
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-850/80">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-[11px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-850 rounded-none hover:text-zinc-200 hover:border-zinc-700 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>

            </div>
          </SplitRight>

        </div>
      </div>
    </section>
  );
};

