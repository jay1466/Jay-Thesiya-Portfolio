import React from 'react';
import { PERSONAL_INFO, STATS } from '../data/portfolioData';
import { CountUp } from './CountUp';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const PRINCIPLES = [
  { title: 'Backend first', desc: 'REST APIs and microservices in Spring Boot, built to be read, tested and scaled.' },
  { title: 'Secure by default', desc: 'Spring Security, JWT and role-based access control from day one — not bolted on later.' },
  { title: 'Data that holds up', desc: 'Normalised schemas, sensible indexes and real transactions in PostgreSQL, MySQL and MongoDB.' },
  { title: 'End to end', desc: 'Comfortable shipping the React UI on top, so features land complete.' },
];

// Vertical rules between cells: 2 columns on mobile, 4 on desktop
const STAT_CELL = ['', 'border-l pl-4 md:pl-6', 'md:border-l md:pl-6', 'border-l pl-4 md:pl-6'];

export const About: React.FC = () => (
  <section id="about" className="wrap py-20 md:py-32">
    <SectionHeading index="01" label="About">
      Quietly <span className="serif">reliable</span> software.
    </SectionHeading>

    <div className="grid-12 gap-y-12">
      <Reveal className="col-span-4 md:col-start-5 md:col-span-8">
        <p className="text-[clamp(1.45rem,2.7vw,2.6rem)] leading-[1.18] tracking-[-0.02em]">
          I’m Jay — a Java developer and IT student at A D Patel Institute of Technology.{' '}
          <span className="text-[var(--ink-3)]">
            I like turning messy business requirements into clean, well-tested services and the
            interfaces that sit on top of them. Right now I’m doing exactly that as a full stack intern.
          </span>
        </p>
      </Reveal>

      {/* Principles — numbered, ruled list */}
      <div className="col-span-4 md:col-start-5 md:col-span-8 grid sm:grid-cols-2 gap-x-6">
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05} className="rule pt-4 pb-8">
            <p className="label mb-3">0{i + 1}</p>
            <h3 className="text-xl font-medium tracking-tight mb-2">{p.title}</h3>
            <p className="text-[var(--ink-2)] leading-relaxed">{p.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>

    {/* Numbers */}
    <div className="grid grid-cols-2 md:grid-cols-4 mt-16 md:mt-28">
      {STATS.map((stat, i) => (
        <Reveal
          key={stat.label}
          delay={i * 0.06}
          className={`pt-6 pb-8 pr-4 border-t border-[var(--rule)] ${STAT_CELL[i] ?? ''}`}
        >
          <div className="display text-[clamp(3rem,6.5vw,6rem)] tabular-nums">
            <CountUp value={String(stat.numericValue)} />
            <span className="text-[0.4em] tracking-normal text-[var(--accent)] align-top ml-1">{stat.suffix}</span>
          </div>
          <p className="mt-3 font-medium">{stat.label}</p>
          <p className="text-sm text-[var(--ink-3)] mt-1">{stat.subtext}</p>
        </Reveal>
      ))}
    </div>

    <Reveal className="grid-12 mt-12">
      <p className="label col-span-4 md:col-span-4 mb-3 md:mb-0">Off the clock</p>
      <p className="col-span-4 md:col-span-8 text-lg md:text-xl text-[var(--ink-2)]">
        {PERSONAL_INFO.hobbies.map((h, i) => (
          <React.Fragment key={h.name}>
            {i > 0 && <span className="text-[var(--accent)]"> / </span>}
            {h.name}
          </React.Fragment>
        ))}
      </p>
    </Reveal>
  </section>
);
