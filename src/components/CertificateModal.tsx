import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Check, Copy, ExternalLink, Award, ShieldCheck, Download } from 'lucide-react';
import { Certification } from '../types/portfolio';

interface CertificateModalProps {
  cert: Certification | null;
  certList: Certification[];
  onClose: () => void;
  onSelectCert: (cert: Certification) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  cert,
  certList,
  onClose,
  onSelectCert,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  if (!cert) return null;

  const currentIndex = certList.findIndex((c) => c.id === cert.id);
  const prevCert = currentIndex > 0 ? certList[currentIndex - 1] : certList[certList.length - 1];
  const nextCert = currentIndex < certList.length - 1 ? certList[currentIndex + 1] : certList[0];

  const handleCopyId = () => {
    if (cert.credentialId) {
      navigator.clipboard.writeText(cert.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md">
        
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-4xl bg-[#0b0b10] border border-zinc-800 rounded-sm shadow-2xl overflow-hidden my-6"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-950 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-zinc-900 border border-zinc-750 text-indigo-400">
                {cert.issuerBadge || cert.issuer}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Issued: {cert.year}
              </span>
            </div>

            {/* Navigation & Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setZoomLevel(1);
                  onSelectCert(prevCert);
                }}
                className="p-1.5 text-zinc-400 hover:text-white border border-zinc-850 hover:border-zinc-700 transition-colors"
                title="Previous certificate"
                aria-label="Previous certificate"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => {
                  setZoomLevel(1);
                  onSelectCert(nextCert);
                }}
                className="p-1.5 text-zinc-400 hover:text-white border border-zinc-850 hover:border-zinc-700 transition-colors"
                title="Next certificate"
                aria-label="Next certificate"
              >
                <ChevronRight size={16} />
              </button>
              <div className="h-4 w-[1px] bg-zinc-800 mx-1" />
              <button
                onClick={onClose}
                className="p-1.5 text-zinc-400 hover:text-white border border-transparent hover:border-zinc-800 transition-colors"
                title="Close"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Title & Organization */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
                  {cert.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
                  Issuing Organization: <span className="text-zinc-200">{cert.issuer}</span>
                </p>
              </div>

              {/* Credential ID / Copy */}
              {cert.credentialId && (
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-zinc-950 border border-zinc-850 text-xs font-mono text-zinc-300">
                    <span className="text-zinc-400 text-[10px] block">Credential ID</span>
                    <span>{cert.credentialId}</span>
                  </div>
                  <button
                    onClick={handleCopyId}
                    className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                    title="Copy ID"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              )}
            </div>

            {/* Certificate Display Canvas / Placeholder Frame */}
            <div className="relative bg-[#060609] border border-zinc-800 rounded-sm p-4 sm:p-8 overflow-hidden min-h-[280px] sm:min-h-[380px] flex items-center justify-center">
              
              {/* Zoom Controls Bar */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-zinc-950/90 border border-zinc-800 px-2 py-1">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                  className="p-1 text-zinc-400 hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="text-[10px] font-mono text-zinc-400 px-1">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.2))}
                  className="p-1 text-zinc-400 hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
              </div>

              {/* Certificate Image or Styled Placeholder */}
              <motion.div
                style={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`w-full max-w-2xl bg-zinc-950 ${!cert.customImage ? 'border-2 border-dashed border-zinc-700 p-8 sm:p-12' : ''} text-center relative shadow-2xl overflow-hidden flex flex-col items-center justify-center min-h-[300px]`}
              >
                {cert.customImage ? (
                  cert.customImage.endsWith('.pdf') ? (
                    <object data={cert.customImage} type="application/pdf" className="w-full h-[500px]">
                      <p>Alternative text - include a link <a href={cert.customImage}>to the PDF!</a></p>
                    </object>
                  ) : (
                    <img src={cert.customImage} alt={cert.title} className="w-full h-auto object-contain" />
                  )
                ) : (
                  <>
                    {/* Corner decorative marks */}
                    <div className="absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 border-zinc-500" />
                    <div className="absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 border-zinc-500" />
                    <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-zinc-500" />
                    <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-zinc-500" />

                    <Award size={36} className="text-zinc-400 mx-auto mb-4" />

                    <div className="text-xs font-mono tracking-[0.2em] text-indigo-400 uppercase mb-2">
                      [ CERTIFICATE IMAGE PLACEHOLDER ]
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold text-white tracking-wide uppercase font-display mb-2">
                      {cert.title}
                    </h4>

                    <p className="text-xs font-mono text-zinc-400 mb-6">
                      Presented by {cert.issuer} • Issued in {cert.year}
                    </p>

                    <div className="inline-block border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-[11px] font-mono text-zinc-400">
                      Replaceable in <code>/src/data/portfolioData.ts</code> via <code>customImage</code> attribute
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Verification & Description */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {cert.description}
              </p>

              {cert.skillsLearned && cert.skillsLearned.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase block mb-1.5">
                    Skills & Competencies Validated:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsLearned.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 text-xs font-mono bg-zinc-950 border border-zinc-800 text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-950 border-t border-zinc-800 text-xs font-mono text-zinc-400">
            <span>Verified Official Credential</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
            >
              Close Viewer
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
