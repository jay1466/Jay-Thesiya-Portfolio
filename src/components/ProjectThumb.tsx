import React from 'react';
import { Project } from '../types/portfolio';

/** Project screenshot, or a typographic placeholder when there's no image. */
export const ProjectThumb: React.FC<{ project: Project; className?: string }> = ({ project, className = '' }) =>
  project.imageUrl ? (
    <img
      src={project.imageUrl}
      alt={`${project.title} screenshot`}
      loading="lazy"
      className={`w-full h-full object-cover ${className}`}
    />
  ) : (
    <div className={`w-full h-full flex flex-col justify-between p-5 bg-[var(--ink)] text-[var(--paper)] ${className}`}>
      <span className="label !text-[var(--paper)] opacity-60">{project.category}</span>
      <span className="display text-3xl">
        {project.title}<span className="text-[var(--accent)]">.</span>
      </span>
    </div>
  );
