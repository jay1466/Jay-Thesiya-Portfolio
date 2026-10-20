import React from 'react';
import { EDUCATIONS } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export const Education: React.FC = () => (
  <section id="academics" className="wrap py-20 md:py-32">
    <SectionHeading index="05" label="Education">
      Still <span className="serif">learning</span>.
    </SectionHeading>

    <ol className="border-b border-[var(--rule)]">
      {EDUCATIONS.map((edu, i) => (
        <Reveal as="li" key={edu.id} delay={i * 0.05} className="rule grid-12 gap-y-4 py-8 md:py-10">
          <span className="label col-span-4 md:col-span-2 tabular-nums">{edu.period}</span>
          <div className="col-span-4 md:col-span-6">
            <h3 className="text-[clamp(1.4rem,2.4vw,2.2rem)] font-medium tracking-[-0.03em] leading-tight">
              {edu.degree}
            </h3>
            <p className="mt-1 text-[var(--ink-2)] text-lg">
              {edu.institution}<span className="text-[var(--ink-3)]"> — {edu.location}</span>
            </p>
            {i === 0 && edu.coursework && (
              <p className="mt-5 text-[var(--ink-2)] leading-relaxed max-w-xl">
                <span className="label mr-2">Coursework</span>
                {edu.coursework.join(', ')}.
              </p>
            )}
          </div>
          <div className="col-span-4 md:col-span-4 md:text-right">
            <span className="display text-[clamp(2.6rem,5vw,4.5rem)] tabular-nums">
              {edu.grade}
              {i === 0 && <span className="text-[0.4em] text-[var(--accent)] align-top ml-1 tracking-normal">/10</span>}
            </span>
            <p className="label mt-2">{edu.gradeLabel}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  </section>
);
