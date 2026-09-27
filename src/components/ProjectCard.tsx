'use client';

import React from 'react';
import { ProjectItem } from '@/data/projects';
import { getAssetPath } from '@/utils/assets';
import { Github, ArrowUpRight, FileCode, CheckCircle, BarChart2 } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenCaseStudy: (project: ProjectItem) => void;
}

export default function ProjectCard({ project, onOpenCaseStudy }: ProjectCardProps) {
  return (
    <div className="rounded-lg border border-lab-border bg-lab-surface/80 overflow-hidden flex flex-col justify-between hover:border-lab-border-subtle transition-all duration-300 group">
      <div>
        {/* Project Thumbnail Image with Technical HUD Header */}
        <div className="relative aspect-video w-full overflow-hidden bg-lab-elevated border-b border-lab-border">
          <img
            src={getAssetPath(project.image)}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lab-surface via-transparent to-transparent opacity-90" />

          {/* Category Chip */}
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-lab-bg/90 border border-lab-border text-lab-cyan backdrop-blur-md uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          {/* Quick Case Study Badge */}
          <div className="absolute top-3 right-3">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-lab-accent/15 border border-lab-accent/40 text-lab-accent backdrop-blur-md">
              7-STEP CASE STUDY
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-xl text-lab-text-primary group-hover:text-lab-accent transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-lab-text-muted">
              {project.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-lab-text-secondary leading-relaxed font-sans line-clamp-3">
            {project.summary}
          </p>

          {/* Metric Telemetry Chips */}
          <div className="grid grid-cols-3 gap-2 py-2 border-y border-lab-border/60 font-mono">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="space-y-0.5 text-center">
                <div className="text-[9px] text-lab-text-muted uppercase truncate">{metric.label}</div>
                <div className="text-sm font-bold text-lab-accent">{metric.value}</div>
              </div>
            ))}
          </div>

          {/* Key Engineering Highlights */}
          <div className="space-y-1.5 pt-1">
            {project.highlights.slice(0, 2).map((highlight, hIdx) => (
              <div key={hIdx} className="flex items-start space-x-2 text-xs text-lab-text-secondary">
                <span className="text-lab-accent font-mono text-[11px] mt-0.5">▹</span>
                <span className="line-clamp-2">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="p-6 pt-0 space-y-4">
        {/* Technologies Pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] px-2 py-0.5 rounded bg-lab-elevated border border-lab-border text-lab-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 text-lab-text-muted">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-2 pt-2 border-t border-lab-border/40">
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="flex-1 py-2 px-3 rounded font-mono text-xs font-semibold bg-lab-accent text-lab-bg hover:bg-emerald-400 transition-colors flex items-center justify-center space-x-1.5"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Read Case Study</span>
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded border border-lab-border bg-lab-elevated text-lab-text-secondary hover:text-lab-text-primary hover:border-lab-accent transition-colors"
            title="Inspect GitHub Notebook"
            aria-label="Inspect GitHub Notebook"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
