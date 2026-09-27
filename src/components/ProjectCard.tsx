'use client';

import React from 'react';
import { ProjectItem } from '@/data/projects';
import { getAssetPath } from '@/utils/assets';
import { Github, BarChart2, Eye } from 'lucide-react';

export type CardVariant = 'focused' | 'adjacent' | 'outer';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenCaseStudy: (project: ProjectItem) => void;
  variant?: CardVariant;
  isFocused?: boolean;
  onClick?: () => void;
}

export default function ProjectCard({
  project,
  onOpenCaseStudy,
  variant,
  isFocused,
  onClick,
}: ProjectCardProps) {
  // Determine variant: explicit variant prop takes precedence, fallback to isFocused
  const cardVariant: CardVariant = variant || (isFocused ? 'focused' : 'adjacent');

  // Outer peek card (2 steps away from focus)
  if (cardVariant === 'outer') {
    return (
      <div
        onClick={onClick}
        className="rounded-lg border border-lab-border/70 bg-lab-surface/30 opacity-40 hover:opacity-85 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer h-[310px] scale-[0.93] hover:scale-95 hover:border-lab-accent/50"
        title={`Focus: ${project.title}`}
      >
        <div>
          {/* Outer Thumbnail */}
          <div className="relative h-[110px] w-full overflow-hidden bg-lab-elevated border-b border-lab-border/60">
            <img
              src={getAssetPath(project.image)}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-lab-surface via-transparent to-transparent opacity-95" />
            <div className="absolute top-1.5 left-1.5">
              <span className="font-mono text-[8px] px-1 py-0.5 rounded bg-lab-bg/90 border border-lab-border text-lab-cyan/80 uppercase truncate max-w-[100px] block">
                {project.category.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Outer Content */}
          <div className="p-2 space-y-1">
            <h4 className="font-display font-semibold text-[11px] text-lab-text-secondary group-hover:text-lab-accent transition-colors leading-snug line-clamp-2">
              {project.title}
            </h4>
            <div className="flex flex-wrap gap-0.5 pt-0.5">
              {project.technologies.slice(0, 2).map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[8px] px-1 py-0.5 rounded bg-lab-elevated border border-lab-border text-lab-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Outer Footer Hint */}
        <div className="px-2 pb-2 pt-1 border-t border-lab-border/30 flex items-center justify-between text-[9px] font-mono text-lab-text-muted group-hover:text-lab-accent">
          <span>SELECT</span>
          <Eye className="w-2.5 h-2.5" />
        </div>
      </div>
    );
  }

  // Adjacent card (1 step away from focus)
  if (cardVariant === 'adjacent') {
    return (
      <div
        onClick={onClick}
        className="rounded-lg border border-lab-border bg-lab-surface/60 opacity-70 hover:opacity-100 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer h-[350px] scale-[0.97] hover:scale-100 hover:border-lab-accent/60 hover:shadow-sm"
        title={`Focus: ${project.title}`}
      >
        <div>
          {/* Adjacent Thumbnail */}
          <div className="relative h-[125px] w-full overflow-hidden bg-lab-elevated border-b border-lab-border">
            <img
              src={getAssetPath(project.image)}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-lab-surface via-transparent to-transparent opacity-90" />
            <div className="absolute top-2 left-2">
              <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-lab-bg/90 border border-lab-border text-lab-cyan backdrop-blur-md uppercase tracking-wider">
                {project.category}
              </span>
            </div>
          </div>

          {/* Adjacent Content */}
          <div className="p-2.5 space-y-1">
            <h3 className="font-display font-bold text-xs text-lab-text-primary group-hover:text-lab-accent transition-colors leading-snug line-clamp-1">
              {project.title}
            </h3>
            <p className="font-mono text-[8.5px] text-lab-text-muted line-clamp-1">
              {project.subtitle}
            </p>
            <p className="text-[10px] text-lab-text-secondary leading-snug line-clamp-2 font-sans pt-0.5">
              {project.summary}
            </p>
          </div>
        </div>

        {/* Adjacent Footer */}
        <div className="px-2.5 pb-2 pt-1.5 space-y-1.5 border-t border-lab-border/40">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[8.5px] px-1.5 py-0.5 rounded bg-lab-elevated border border-lab-border text-lab-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="w-full py-1 text-center rounded font-mono text-[9px] font-medium bg-lab-elevated border border-lab-border/80 text-lab-text-secondary group-hover:text-lab-accent group-hover:border-lab-accent/50 transition-colors">
            Click to Inspect →
          </div>
        </div>
      </div>
    );
  }

  // Focused card (Center active stage)
  return (
    <div
      onClick={onClick}
      className="rounded-lg border border-lab-accent/90 bg-lab-surface shadow-lab-glow ring-1 ring-lab-accent/40 z-20 opacity-100 scale-100 flex flex-col justify-between overflow-hidden group h-[385px] transition-all duration-300"
    >
      <div>
        {/* Focused Thumbnail */}
        <div className="relative h-[140px] w-full overflow-hidden bg-lab-elevated border-b border-lab-border flex-shrink-0">
          <img
            src={getAssetPath(project.image)}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lab-surface via-transparent to-transparent opacity-90" />

          {/* Category Chip */}
          <div className="absolute top-2 left-2">
            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-lab-bg/95 border border-lab-border text-lab-cyan backdrop-blur-md uppercase tracking-wider font-semibold">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3 space-y-1 flex-1 min-h-0">
          <div className="space-y-0.5">
            <h3 className="font-display font-bold text-sm text-lab-text-primary group-hover:text-lab-accent transition-colors leading-snug line-clamp-1">
              {project.title}
            </h3>
            <p className="font-mono text-[9px] text-lab-text-muted line-clamp-1">
              {project.subtitle}
            </p>
          </div>

          <p className="text-[10.5px] text-lab-text-secondary leading-snug font-sans line-clamp-2">
            {project.summary}
          </p>

          {/* 3 Metric Chips */}
          <div className="grid grid-cols-3 gap-1 py-1 border-y border-lab-border/60 font-mono">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="space-y-0 text-center">
                <div className="text-[7.5px] text-lab-text-muted uppercase truncate">{metric.label}</div>
                <div className="text-[10.5px] font-bold text-lab-accent truncate">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="px-3 pb-2.5 space-y-1.5 flex-shrink-0">
        {/* Tech Pills */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[8.5px] px-1.5 py-0.5 rounded bg-lab-elevated border border-lab-border text-lab-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="font-mono text-[8.5px] px-1 py-0.5 text-lab-text-muted">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1.5 pt-1 border-t border-lab-border/40">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCaseStudy(project);
            }}
            className="flex-1 py-1.5 px-2 rounded font-mono text-[10px] font-semibold bg-lab-accent text-lab-bg hover:bg-emerald-400 transition-colors flex items-center justify-center space-x-1 shadow-sm focus-ring"
            aria-label={`Open Case Study for ${project.title}`}
          >
            <BarChart2 className="w-3 h-3" aria-hidden="true" />
            <span>Case Study</span>
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded border border-lab-border bg-lab-elevated text-lab-text-secondary hover:text-lab-text-primary hover:border-lab-accent transition-colors focus-ring"
            title={`View ${project.title} on GitHub (opens in new tab)`}
            aria-label={`View ${project.title} on GitHub (opens in new tab)`}
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
