import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EXPERIENCES } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export const Experience: React.FC = () => {
  // The current role starts expanded
  const [openId, setOpenId] = useState<string | null>(EXPERIENCES.find(e => e.current)?.id ?? null);

  return (
    <section id="experience" className="wrap py-20 md:py-32">
      <SectionHeading index="02" label="Experience">
        Where I’ve <span className="serif">worked</span>.
      </SectionHeading>

      <ol className="border-b border-[var(--rule)]">
        {EXPERIENCES.map((exp, i) => {
          const open = openId === exp.id;
          return (
            <Reveal as="li" key={exp.id} delay={i * 0.04} className="rule">
              <button
                onClick={() => setOpenId(open ? null : exp.id)}
                aria-expanded={open}
                aria-controls={`${exp.id}-panel`}
                data-open={open}
                className="row-hover w-full text-left grid-12 items-baseline gap-y-2 py-6 md:py-8 cursor-pointer group"
              >
                <span className="label col-span-3 md:col-span-2 md:pl-3 tabular-nums">
                  {exp.period.replace(/\b(\w{3}) \d{1,2},/, '$1')}
                </span>
                <span className="col-span-1 md:hidden text-right text-2xl leading-none font-light">
                  {open ? '−' : '+'}
                </span>
                <span className="col-span-4 md:col-span-5 text-[clamp(1.4rem,2.6vw,2.4rem)] font-medium tracking-[-0.03em] leading-tight group-hover:translate-x-1 transition-transform duration-500">
                  {exp.role}
                </span>
                <span className="col-span-4 md:col-span-3 text-lg text-[var(--ink-2)] flex items-center gap-2.5">
                  {exp.current && (
                    <span className="label !text-[var(--accent-ink)] flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 bg-[var(--accent)]" /> Now
                    </span>
                  )}
                  {exp.company}
                </span>
                <span className="hidden md:flex md:col-span-2 justify-between items-baseline pr-3">
                  <span className="label">{exp.type}</span>
                  <span className={`text-2xl leading-none font-light transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`${exp.id}-panel`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid-12 gap-y-6 pb-10 pt-2">
                      <div className="col-span-4 md:col-start-3 md:col-span-6">
                        <ul className="space-y-3 text-[var(--ink-2)] leading-relaxed md:text-lg">
                          {exp.description.map(point => (
                            <li key={point} className="flex gap-4">
                              <span aria-hidden className="text-[var(--accent)] select-none">—</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-4 md:col-span-4 md:pl-6">
                        <p className="label mb-3">Stack</p>
                        <p className="text-[var(--ink-2)] leading-relaxed">{exp.technologies.join(', ')}</p>
                        {exp.location && (
                          <>
                            <p className="label mt-5 mb-1">Location</p>
                            <p className="text-[var(--ink-2)]">{exp.location}</p>
                          </>
                        )}
                        {exp.companyUrl && (
                          <a href={exp.companyUrl} target="_blank" rel="noreferrer" className="inline-block mt-5 label !text-[var(--ink)] u-link">
                            Visit {exp.company} ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
};
