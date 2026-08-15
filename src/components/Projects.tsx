import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, ArrowUpRight, Star, Terminal, Layers, ShieldCheck, Database, Server } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { SectionHeading } from './SectionHeading';
import { TiltCard } from './TiltCard';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ['ALL', 'FINTECH', 'SECURITY', 'ML / NLP', 'ENTERPRISE', 'HEALTHCARE'];

  const filteredProjects = selectedCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const getProjectIcon = (category: string) => {
    switch (category) {
      case 'FINTECH': return <Database size={18} className="text-emerald-400" />;
      case 'SECURITY': return <ShieldCheck size={18} className="text-indigo-400" />;
      case 'ML / NLP': return <Layers size={18} className="text-purple-400" />;
      default: return <Server size={18} className="text-sky-400" />;
    }
  };

  return (
    <section
      id="projects"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#060608]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <SectionHeading
          number="// SECTION 04"
          title="PROJECTS."
          subtitle="// A curated selection of high-performance backend systems and full-stack applications. Engineered for scalability, security, and precision."
        />

        {/* Filter Pills with smooth motion */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-zinc-900">
          <span className="text-xs font-mono text-zinc-400 mr-2 uppercase">Filter:</span>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className={`px-3 py-1 text-xs font-mono transition-all rounded-none cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-850 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid with Staggered Entrance and 3D Tilt */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 35, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <TiltCard
                  maxTilt={3.5}
                  scaleOnHover={1.015}
                  className={`h-full bg-[#0a0a0e] border ${
                    project.featured ? 'border-zinc-700 hover:border-zinc-500' : 'border-zinc-850 hover:border-zinc-700'
                  } rounded-sm overflow-hidden flex flex-col justify-between group shadow-lg transition-colors`}
                >
                  {/* Top Terminal / Visual Preview Bar */}
                  <div
                    onClick={() => setActiveProjectModal(project)}
                    style={{ transform: 'translateZ(10px)' }}
                    className="relative bg-zinc-950 border-b border-zinc-850 cursor-pointer overflow-hidden transform-gpu"
                  >
                    <div className="p-5 z-10 relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-none shadow-md">
                            {getProjectIcon(project.category)}
                          </div>
                          <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase bg-zinc-900/80 backdrop-blur-sm border border-zinc-850 text-zinc-300">
                            {project.category}
                          </span>
                        </div>

                        {project.featured && (
                          <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-amber-400/90 text-black flex items-center gap-1 shadow-sm">
                            <Star size={10} fill="currentColor" />
                            FEATURED
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-mono text-zinc-300 mt-2 line-clamp-1 drop-shadow-md">
                        {project.tagline}
                      </p>

                      <div className="absolute top-3 right-3 text-zinc-400 group-hover:text-white bg-zinc-900/80 p-1 border border-zinc-850 rounded-none transition-colors z-20">
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    {project.imageUrl && (
                      <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
                      </div>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(6px)' }}>
                    <div>
                      {/* Project Title */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3
                          onClick={() => setActiveProjectModal(project)}
                          className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors cursor-pointer font-display"
                        >
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies Tags & Actions */}
                    <div className="space-y-4 pt-3 border-t border-zinc-850/80">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-850 rounded-none"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-850">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs font-mono">
                        <button
                          onClick={() => setActiveProjectModal(project)}
                          className="text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>[Architecture & Details]</span>
                          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>

                        <div className="flex items-center gap-3" style={{ transform: 'translateZ(12px)' }}>
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-zinc-400 hover:text-white transition-colors p-1"
                              title="GitHub Source"
                              aria-label={`View ${project.title} source code on GitHub`}
                            >
                              &lt;&gt;
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-zinc-400 hover:text-white transition-colors p-1"
                              title="Live Demo"
                              aria-label={`View ${project.title} live demo`}
                            >
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Global GitHub CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 p-6 bg-[#08080c] border border-zinc-850 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase">
              // REPOSITORY ARCHIVE
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Looking for more backend repositories, microservice skeletons, and algorithm benchmarks?
            </p>
          </div>

          <motion.a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-white text-zinc-200 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            <span>Explore All on GitHub</span>
            <ExternalLink size={13} />
          </motion.a>
        </motion.div>

      </div>

      {/* Project Details Lightbox Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
};
