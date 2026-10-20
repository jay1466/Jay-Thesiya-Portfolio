import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export const Skills: React.FC = () => (
  <section id="skills" className="wrap py-20 md:py-32">
    <SectionHeading index="04" label="Skills">
      The <span className="serif">toolbox</span>.
    </SectionHeading>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {SKILL_CATEGORIES.map((cat, i) => (
        <Reveal key={cat.id} delay={i * 0.06}>
          <div className="border-t-2 border-[var(--ink)] pt-4 mb-2 flex items-baseline justify-between">
            <h3 className="text-lg font-medium tracking-tight">{cat.name}</h3>
            <span className="label">{String(cat.skills.length).padStart(2, '0')}</span>
          </div>
          <ul>
            {cat.skills.map(skill => (
              <li key={skill.name} className="rule py-3 flex items-baseline justify-between gap-3">
                <span className="text-[var(--ink-2)]">{skill.name}</span>
                {skill.level === 'Advanced' && (
                  <span title="Advanced" className="h-1.5 w-1.5 shrink-0 bg-[var(--accent)] self-center" />
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>

    <Reveal className="mt-10 label flex items-center gap-2">
      <span className="h-1.5 w-1.5 bg-[var(--accent)]" /> Strongest skills
    </Reveal>
  </section>
);
