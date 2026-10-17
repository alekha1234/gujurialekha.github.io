'use client';

import React from 'react';
import Link from 'next/link';
import { featuredProjects, hasRepo } from '@/data/projects';
import { getAssetPath } from '@/utils/assets';
import { LabSection, LabTag } from '@/components/ui';
import { Github, ExternalLink, Maximize2 } from 'lucide-react';

const shown = featuredProjects.filter((p) => p.isFeatured);

export default function FeaturedProjects() {
  return (
    <LabSection id="projects" labelledBy="projects-heading">
      <LabTag>07 // Project modules</LabTag>
      <h2 id="projects-heading" className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-3">
        Featured case studies
      </h2>
      <p className="text-sm text-lab-text-secondary mb-6">
        Select a project for the full case study.
      </p>

      <ul className="rail grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((p) => (
          <li key={p.id} className="glass rounded-xl overflow-hidden flex flex-col hover:glass-glow transition-all duration-300">
            <img
              src={getAssetPath(p.image)}
              alt={`${p.title} preview`}
              width={640}
              height={360}
              loading="lazy"
              className="aspect-video w-full object-cover border-b border-white/10"
            />
            <div className="p-5 flex flex-col flex-1">
              <p className="font-mono text-[11px] text-lab-cyan truncate">{p.category.toUpperCase()}</p>
              <h3 className="text-[15px] font-semibold leading-snug mt-1">
                <Link href={`/projects/${p.slug}/`} className="hover:text-blue-300 focus-ring rounded">
                  {p.title}
                </Link>
              </h3>
              <p className="text-xs text-lab-text-secondary mt-2 leading-relaxed line-clamp-3">{p.summary}</p>
              <ul className="flex flex-wrap gap-1.5 mt-3" aria-label="Technologies">
                {p.technologies.slice(0, 4).map((t) => (
                  <li key={t} className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-white/5 text-lab-text-muted">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-4">
                <Link
                  href={`/projects/${p.slug}/`}
                  className="inline-flex items-center gap-1 font-mono text-xs text-lab-cyan hover:text-white focus-ring rounded px-1"
                  aria-label={`Details: ${p.title} case study`}
                >
                  <Maximize2 className="w-3 h-3" aria-hidden="true" /> Details
                </Link>
                <span className="flex-1" />
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
            </div>
          </li>
        ))}
      </ul>
    </LabSection>
  );
}
