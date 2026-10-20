import React, { useState } from 'react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { Certification } from '../types/portfolio';
import { CertificateModal } from './CertificateModal';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export const Certifications: React.FC = () => {
  const [selected, setSelected] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="wrap py-20 md:py-32">
      <SectionHeading index="06" label="Certificates">
        On <span className="serif">paper</span>, too.
      </SectionHeading>

      <ul className="border-b border-[var(--rule)]">
        {CERTIFICATIONS.map((cert, i) => (
          <Reveal as="li" key={cert.id} delay={(i % 4) * 0.04} className="rule">
            <button
              onClick={() => setSelected(cert)}
              className="row-hover group w-full text-left grid-12 items-baseline gap-y-1 py-5 cursor-pointer"
            >
              <span className="label col-span-1 md:pl-3 tabular-nums">{cert.year}</span>
              <span className="col-span-3 md:col-span-5 text-lg md:text-2xl font-medium tracking-tight group-hover:text-[var(--accent)] transition-colors">
                {cert.title}
              </span>
              <span className="col-span-3 col-start-2 md:col-span-4 md:col-start-auto text-[var(--ink-2)]">{cert.issuer}</span>
              <span className="hidden md:flex md:col-span-2 justify-between items-baseline pr-3">
                <span className="label">{cert.category}</span>
                <span className="label !text-[var(--ink)]">View ↗</span>
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <CertificateModal
        cert={selected}
        certList={CERTIFICATIONS}
        onClose={() => setSelected(null)}
        onSelectCert={setSelected}
      />
    </section>
  );
};
