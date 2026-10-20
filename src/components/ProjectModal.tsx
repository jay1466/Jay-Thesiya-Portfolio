import React from 'react';
import { Project } from '../types/portfolio';
import { Modal } from './Modal';
import { ProjectThumb } from './ProjectThumb';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const Block: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="rule pt-4">
    <h4 className="label mb-4">{title}</h4>
    <ul className="space-y-2.5 text-[var(--ink-2)] leading-relaxed">
      {items.map(item => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="text-[var(--accent)]">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => (
  <Modal open={!!project} onClose={onClose} labelledBy="project-modal-title" maxWidth="max-w-5xl">
    {project && (
      <>
        <div className="aspect-[16/8] sm:aspect-[16/7] overflow-hidden bg-[var(--paper-2)]">
          <ProjectThumb project={project} />
        </div>
        <div className="p-6 sm:p-10 space-y-10">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <p className="label mb-3">{project.category}</p>
              <h3 id="project-modal-title" className="display text-[clamp(2.4rem,6vw,4.5rem)]">
                {project.title}<span className="text-[var(--accent)]">.</span>
              </h3>
              <p className="mt-4 text-lg text-[var(--ink-2)]">{project.tagline}</p>
            </div>
            <p className="md:col-span-5 md:pt-8 leading-relaxed text-[var(--ink-2)]">{project.description}</p>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <dl className="grid grid-cols-2 sm:grid-cols-3 border-t border-[var(--rule)]">
              {project.metrics.map((m, i) => (
                <div key={m.label} className={`pt-4 pb-2 pr-3 ${i > 0 ? 'sm:border-l sm:pl-5' : ''} ${i % 2 ? 'border-l pl-4' : ''} border-[var(--rule)]`}>
                  <dt className="label">{m.label}</dt>
                  <dd className="mt-2 text-xl md:text-2xl font-medium tracking-tight">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <Block title="Highlights" items={project.highlights} />
            {project.architecture && <Block title="Architecture" items={project.architecture} />}
          </div>

          <div className="rule pt-4">
            <h4 className="label mb-3">Stack</h4>
            <p className="text-lg">{project.technologies.join(' · ')}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ink">
                View source <span aria-hidden>↗</span>
              </a>
            )}
            {project.liveUrl && project.liveUrl !== project.githubUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="label !text-[var(--ink)] u-link">
                Live demo ↗
              </a>
            )}
          </div>
        </div>
      </>
    )}
  </Modal>
);
