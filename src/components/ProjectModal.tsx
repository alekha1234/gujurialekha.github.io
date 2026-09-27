'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ProjectItem } from '@/data/projects';
import {
  X,
  Github,
  ArrowUpRight,
  Database,
  Layers,
  BarChart3,
  Cpu,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project || !project.caseStudy) return null;

  const caseStudy = project.caseStudy;

  const steps = [
    {
      num: '01',
      title: 'Problem Formulation',
      content: caseStudy.problem,
      icon: AlertCircle,
      tag: 'CHALLENGE',
    },
    {
      num: '02',
      title: 'Dataset & Feature Space',
      content: caseStudy.data,
      icon: Database,
      tag: 'DATA_SOURCE',
    },
    {
      num: '03',
      title: 'Methodology & Engineering',
      content: caseStudy.approach,
      icon: Layers,
      tag: 'DATA_PREPARATION',
    },
    {
      num: '04',
      title: 'Model Architecture & Training',
      content: caseStudy.model,
      icon: Cpu,
      tag: 'MODEL_DESIGN',
    },
    {
      num: '05',
      title: 'Validation & Evaluation Protocol',
      content: caseStudy.evaluation,
      icon: BarChart3,
      tag: 'METRICS_EVAL',
    },
    {
      num: '06',
      title: 'Empirical Results & Findings',
      content: caseStudy.results,
      icon: CheckCircle2,
      tag: 'OUTCOMES',
    },
    {
      num: '07',
      title: 'Production & Operational Impact',
      content: caseStudy.impact,
      icon: TrendingUp,
      tag: 'BUSINESS_IMPACT',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className="relative w-full max-w-4xl max-h-[90vh] bg-lab-surface border border-lab-border rounded-xl shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-lab-border bg-lab-surface/95 backdrop-blur-md px-6 py-4">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-lab-accent inline-block" aria-hidden="true" />
            <div className="font-mono text-xs text-lab-text-muted">
              CASE_STUDY_INSPECTOR // {project.id.toUpperCase()}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded border border-lab-border text-lab-text-secondary hover:text-lab-text-primary hover:bg-lab-elevated transition-colors focus-ring"
            aria-label="Close Case Study Dialog"
            autoFocus
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Metadata */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-lab-cyan uppercase tracking-wider">
              {project.category}
            </span>
            <h3 id="case-study-title" className="font-display font-bold text-2xl sm:text-3xl text-lab-text-primary">
              {project.title}
            </h3>
            <p className="text-sm font-mono text-lab-text-secondary">
              {project.subtitle}
            </p>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-lg bg-lab-bg border border-lab-border font-mono">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-[10px] text-lab-text-muted uppercase">{metric.label}</div>
                <div className="text-lg font-bold text-lab-accent">{metric.value}</div>
                {metric.description && (
                  <div className="text-[10px] text-lab-text-secondary truncate">{metric.description}</div>
                )}
              </div>
            ))}
          </div>

          {/* 7-Step Case Study Schema */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs text-lab-text-muted uppercase tracking-wider flex items-center space-x-2">
              <span>7-STEP APPLIED DATA SCIENCE SPECIFICATION</span>
            </h4>

            <div className="space-y-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="p-4 rounded-lg border border-lab-border/70 bg-lab-elevated/40 space-y-2 hover:border-lab-border transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span className="font-mono text-xs font-bold text-lab-accent">
                          {step.num}.
                        </span>
                        <Icon className="w-4 h-4 text-lab-text-muted" />
                        <h5 className="font-display font-semibold text-sm text-lab-text-primary">
                          {step.title}
                        </h5>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-lab-surface text-lab-text-muted border border-lab-border/50">
                        {step.tag}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-lab-text-secondary leading-relaxed pl-6 font-sans">
                      {step.content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technologies Used */}
          <div className="space-y-2 pt-2">
            <span className="font-mono text-xs text-lab-text-muted uppercase block">
              STACK_COMPONENTS:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-3 py-1 rounded bg-lab-surface border border-lab-border text-lab-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-lab-border">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/projects/${project.slug}/`}
                onClick={onClose}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded font-mono text-xs font-semibold bg-lab-accent text-lab-bg hover:bg-emerald-400 transition-colors shadow-lab-glow"
              >
                <span>Open Dedicated Case Study Page</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded font-mono text-xs border border-lab-border text-lab-text-secondary hover:text-lab-text-primary hover:bg-lab-elevated transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Source</span>
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded font-mono text-xs border border-lab-border text-lab-text-secondary hover:text-lab-text-primary hover:bg-lab-elevated transition-colors"
            >
              Close Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
