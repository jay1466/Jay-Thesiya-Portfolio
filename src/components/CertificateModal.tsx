import React from 'react';
import { Certification } from '../types/portfolio';
import { Modal } from './Modal';

interface CertificateModalProps {
  cert: Certification | null;
  certList: Certification[];
  onClose: () => void;
  onSelectCert: (cert: Certification) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, certList, onClose, onSelectCert }) => {
  const index = cert ? certList.findIndex(c => c.id === cert.id) : -1;
  const step = (dir: 1 | -1) => {
    if (index < 0) return;
    onSelectCert(certList[(index + dir + certList.length) % certList.length]);
  };

  return (
    <Modal open={!!cert} onClose={onClose} labelledBy="cert-modal-title" maxWidth="max-w-5xl">
      {cert && (
        <>
          <div className="bg-[var(--paper-2)] flex items-center justify-center p-4 pt-16 sm:p-8 sm:pt-16">
            {cert.customImage?.endsWith('.pdf') ? (
              <object data={cert.customImage} type="application/pdf" className="w-full h-[60vh]">
                <a href={cert.customImage} target="_blank" rel="noreferrer" className="btn-ink">Open PDF ↗</a>
              </object>
            ) : cert.customImage ? (
              <img src={cert.customImage} alt={`${cert.title} certificate`} className="max-h-[60vh] w-auto shadow-lg" />
            ) : (
              <p className="py-20 label">{cert.imagePlaceholderText}</p>
            )}
          </div>

          <div className="p-6 sm:p-10 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="label mb-3">{cert.issuer} — {cert.year}</p>
              <h3 id="cert-modal-title" className="display text-[clamp(2rem,4.5vw,3.4rem)]">{cert.title}</h3>
              <p className="mt-5 leading-relaxed text-[var(--ink-2)]">{cert.description}</p>
            </div>
            <div className="md:col-span-5 rule pt-4 md:mt-2">
              <h4 className="label mb-3">What it covered</h4>
              <p className="text-lg leading-relaxed">{cert.skillsLearned.join(' · ')}</p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                {cert.verificationUrl && (
                  <a href={cert.verificationUrl} target="_blank" rel="noreferrer" className="btn-ink">Verify ↗</a>
                )}
                {cert.customImage && (
                  <a href={cert.customImage} target="_blank" rel="noreferrer" className="label !text-[var(--ink)] u-link">
                    Open full size ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          {certList.length > 1 && (
            <div className="grid grid-cols-2 border-t border-[var(--rule)]">
              <button onClick={() => step(-1)} className="row-hover text-left p-5 sm:px-10 cursor-pointer">
                <span className="label">← Previous</span>
              </button>
              <button onClick={() => step(1)} className="row-hover text-right p-5 sm:px-10 border-l border-[var(--rule)] cursor-pointer">
                <span className="label">{index + 1} / {certList.length} &nbsp; Next →</span>
              </button>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};
