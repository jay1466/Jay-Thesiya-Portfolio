import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Globe, Code, FileText, Smartphone, Cpu, Wrench, ShieldCheck, Eye } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { Certification } from '../types/portfolio';
import { CertificateModal } from './CertificateModal';
import { SectionHeading } from './SectionHeading';
import { TiltCard } from './TiltCard';

export const Certifications: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Technical' | 'Achievement'>('All');
  const [activeCertModal, setActiveCertModal] = useState<Certification | null>(null);

  const getCertIcon = (title: string) => {
    if (title.includes('MySQL')) return <Award size={18} className="text-zinc-300" />;
    if (title.includes('Open Source')) return <Globe size={18} className="text-zinc-300" />;
    if (title.includes('CodeFest')) return <Code size={18} className="text-zinc-300" />;
    if (title.includes('Java Certificate')) return <FileText size={18} className="text-zinc-300" />;
    if (title.includes('Firebase')) return <Smartphone size={18} className="text-zinc-300" />;
    if (title.includes('Gen AI')) return <Cpu size={18} className="text-zinc-300" />;
    if (title.includes('Maven')) return <Wrench size={18} className="text-zinc-300" />;
    return <Award size={18} className="text-zinc-300" />;
  };

  const filteredCerts = selectedFilter === 'All'
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter((c) => c.category === selectedFilter);

  return (
    <section
      id="certifications"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#060608]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <SectionHeading
          number="// SECTION 06"
          title="VERIFIED EXPERTISE."
          subtitle="A continuous pursuit of knowledge. Official recognitions validating proficiency in modern software engineering practices, cloud architectures, and core programming languages."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-zinc-900">
          {(['All', 'Technical', 'Achievement'] as const).map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className={`px-3 py-1 text-xs font-mono transition-all rounded-none cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-850 hover:text-white hover:border-zinc-700'
              }`}
            >
              {filter.toUpperCase()}
            </motion.button>
          ))}
        </div>

        {/* Certifications Grid with Staggered Entrance and 3D Tilt */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, idx) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <TiltCard
                  maxTilt={3}
                  scaleOnHover={1.015}
                  className="h-full bg-[#0a0a0e] border border-zinc-850 rounded-sm overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-colors shadow-md group"
                >
                  {/* Certificate Preview Card */}
                  <div
                    onClick={() => setActiveCertModal(cert)}
                    style={{ transform: 'translateZ(10px)' }}
                    className="relative aspect-[16/10] bg-zinc-950 border-b border-zinc-850 overflow-hidden cursor-pointer flex flex-col items-center justify-center p-6 text-center transform-gpu"
                  >
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-none mb-3 group-hover:border-zinc-600 transition-colors">
                      {getCertIcon(cert.title)}
                    </div>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">
                      {cert.issuerBadge || cert.issuer}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 mt-1">
                      {cert.imagePlaceholderText || 'VERIFIED CREDENTIAL'}
                    </span>

                    <div className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-mono bg-zinc-950/90 border border-zinc-850 text-zinc-300 uppercase">
                      {cert.category}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 backdrop-blur-[2px] transition-all">
                      <span className="px-3 py-1.5 bg-white text-black font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg">
                        <Eye size={12} />
                        <span>View Credential</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(6px)' }}>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-indigo-400 font-medium">
                          {cert.issuer}
                        </span>
                      </div>

                      <h3
                        onClick={() => setActiveCertModal(cert)}
                        className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-indigo-200 transition-colors cursor-pointer font-display"
                      >
                        {cert.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>

                    {/* Footer details */}
                    <div className="mt-4 pt-3 border-t border-zinc-850/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                      <span>Issued: {cert.year}</span>
                      <button
                        onClick={() => setActiveCertModal(cert)}
                        className="text-zinc-400 group-hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>[Details]</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Certificate Modal */}
      <CertificateModal
        cert={activeCertModal}
        certList={filteredCerts}
        onClose={() => setActiveCertModal(null)}
        onSelectCert={(newCert) => setActiveCertModal(newCert)}
      />
    </section>
  );
};
