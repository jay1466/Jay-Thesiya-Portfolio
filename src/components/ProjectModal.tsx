import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, ExternalLink, Shield, Cpu, Layers, CheckCircle2, Terminal } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-3xl bg-[#0b0b10] border border-zinc-800 rounded-sm shadow-2xl overflow-hidden my-8"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-zinc-900 border border-zinc-750 text-zinc-300 uppercase">
                {project.category}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                system.id: {project.id}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white border border-transparent hover:border-zinc-800 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Title & Tagline */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                {project.title}
              </h3>
              <p className="text-sm font-mono text-indigo-400 mt-1">
                {project.tagline}
              </p>
            </div>

            {/* Project Image */}
            {project.imageUrl && (
              <div className="w-full rounded-sm overflow-hidden border border-zinc-800 shadow-xl bg-zinc-950 flex justify-center">
                <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-cover max-h-[350px] object-top" />
              </div>
            )}

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {project.description}
            </p>

            {/* Metrics if available */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {project.metrics.map((m) => (
                  <div key={m.label} className="p-3 bg-zinc-950 border border-zinc-850 rounded-sm">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">{m.label}</span>
                    <span className="text-sm font-bold text-white font-mono">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Technical Highlights */}
            {project.highlights && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  Key Architectural Features:
                </h4>
                <div className="space-y-1.5 pl-2">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                      <span className="text-zinc-400 font-mono mt-0.5">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture Details if available */}
            {project.architecture && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={13} className="text-indigo-400" />
                  Service & Data Layer Topology:
                </h4>
                <div className="p-3.5 bg-zinc-950 border border-zinc-850 font-mono text-xs text-zinc-300 space-y-1">
                  {project.architecture.map((a, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-zinc-400">&gt;</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="pt-2">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Technologies & Tools:
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-mono bg-zinc-950 border border-zinc-800 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-t border-zinc-800">
            <span className="text-[11px] font-mono text-zinc-400">
              Repository & Code Access
            </span>
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 transition-colors"
                >
                  <Github size={14} />
                  <span>Source Code</span>
                </a>
              )}
              {project.liveUrl && project.liveUrl !== project.githubUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-zinc-800 text-zinc-200 hover:text-white hover:border-zinc-600 font-mono text-xs transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>Live Preview</span>
                </a>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
