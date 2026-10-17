'use client';

import React, { useState } from 'react';
import { featuredProjects, hasRepo, ProjectItem } from '@/data/projects';
import { getAssetPath } from '@/utils/assets';
import { setLab, useLab } from '@/lib/labStore';
import { LabSection, LabTag } from '@/components/ui';
import ProjectModal from './ProjectModal';
import { Github, ExternalLink, Maximize2 } from 'lucide-react';

export default function FeaturedProjects() {
  const [open, setOpen] = useState<ProjectItem | null>(null);
  const active = useLab((s) => s.activeProject);

  return (
    <>
      <LabSection id="projects" labelledBy="projects-heading" side="left">
        <LabTag>07 // Project modules</LabTag>
        <h2 id="projects-heading" className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-3">
          Featured case studies
        </h2>
        <p className="text-sm text-lab-text-secondary mb-6">
          Select a project for the full case study.
        </p>

        <ul className="space-y-2.5">
          {featuredProjects.map((p) => {
            const on = active === p.id;
            return (
              <li
                key={p.id}
                onMouseEnter={() => setLab({ activeProject: p.id })}
                onMouseLeave={() => setLab({ activeProject: null })}
                onFocus={() => setLab({ activeProject: p.id })}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setLab({ activeProject: null });
                }}
                className={`glass holo-scan rounded-xl transition-all duration-300 ${on ? 'glass-glow' : ''}`}
              >
                <div className="flex gap-3 p-3">
                  <img
                    src={getAssetPath(p.image)}
                    alt=""
                    width={96}
                    height={72}
                    loading="lazy"
                    className={`w-20 h-16 sm:w-24 sm:h-[72px] rounded-md object-cover shrink-0 border border-white/10 transition-all ${on ? 'brightness-110' : 'brightness-75 saturate-50'}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] text-lab-cyan truncate">{p.category.toUpperCase()}</p>
                    <h3 className="text-sm sm:text-[15px] font-semibold leading-snug">
                      <button type="button" onClick={() => setOpen(p)} className="text-left hover:text-blue-300 focus-ring rounded">
                        {p.title}
                      </button>
                    </h3>
                    <p className={`text-xs text-lab-text-secondary mt-1 leading-relaxed ${on ? '' : 'line-clamp-3'}`}>{p.summary}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 px-3 pb-3">
                  {p.technologies.map((t) => (
                    <span
                      key={t}
                      className={`font-mono text-[11px] px-1.5 py-0.5 rounded border transition-colors ${
                        on ? 'border-lab-accent/40 bg-lab-accent/10 text-blue-100' : 'border-transparent bg-white/5 text-lab-text-muted'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                  <span className="flex-1" />
                  <button
                    type="button"
                    onClick={() => setOpen(p)}
                    className="inline-flex items-center gap-1 font-mono text-xs text-lab-cyan hover:text-white focus-ring rounded px-1"
                  >
                    <Maximize2 className="w-3 h-3" aria-hidden="true" /> Details
                  </button>
                  {hasRepo(p.githubUrl) ? (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-lab-text-secondary hover:text-white focus-ring rounded px-1"
                      aria-label={`Code: ${p.title} on GitHub (opens in new tab)`}
                    >
                      <Github className="w-3 h-3" aria-hidden="true" /> Code
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-lab-text-muted px-1">Proprietary</span>
                  )}
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-lab-green hover:text-white focus-ring rounded px-1"
                      aria-label={`Live: ${p.title} demo (opens in new tab)`}
                    >
                      <ExternalLink className="w-3 h-3" aria-hidden="true" /> Live
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </LabSection>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </>
  );
}
