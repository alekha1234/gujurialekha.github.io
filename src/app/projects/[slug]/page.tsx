import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { featuredProjects, ProjectItem } from '@/data/projects';
import {
  ArrowLeft,
  Github,
  ArrowUpRight,
  Database,
  Layers,
  BarChart3,
  Cpu,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Tag,
  FileCode,
} from 'lucide-react';

export function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = featuredProjects.find((p) => p.slug === params.slug);

  if (!project || !project.caseStudy) {
    notFound();
  }

  const caseStudy = project.caseStudy;

  const steps = [
    {
      num: '01',
      title: 'Problem Formulation',
      content: caseStudy.problem,
      icon: AlertCircle,
      tag: 'OPERATIONAL_CHALLENGE',
    },
    {
      num: '02',
      title: 'Data Ingestion & Feature Space',
      content: caseStudy.data,
      icon: Database,
      tag: 'DATASET_TELEMETRY',
    },
    {
      num: '03',
      title: 'Preprocessing & Methodology',
      content: caseStudy.approach,
      icon: Layers,
      tag: 'FEATURE_ENGINEERING',
    },
    {
      num: '04',
      title: 'Model Architecture & Training',
      content: caseStudy.model,
      icon: Cpu,
      tag: 'ALGORITHM_DESIGN',
    },
    {
      num: '05',
      title: 'Validation & Evaluation Protocol',
      content: caseStudy.evaluation,
      icon: BarChart3,
      tag: 'PERFORMANCE_METRICS',
    },
    {
      num: '06',
      title: 'Empirical Results & Discoveries',
      content: caseStudy.results,
      icon: CheckCircle2,
      tag: 'FINDINGS',
    },
    {
      num: '07',
      title: 'Production & Business Impact',
      content: caseStudy.impact,
      icon: TrendingUp,
      tag: 'STRATEGIC_VALUE',
    },
  ];

  return (
    <main className="min-h-screen bg-lab-bg text-lab-text-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between border-b border-lab-border pb-6">
          <Link
            href="/#case-studies"
            className="inline-flex items-center space-x-2 font-mono text-xs text-lab-text-secondary hover:text-lab-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>

          <span className="font-mono text-xs text-lab-text-muted">
            CASE_STUDY // {project.id.toUpperCase()}
          </span>
        </div>

        {/* Hero Section of Case Study */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-lab-cyan uppercase tracking-wider px-2.5 py-1 rounded bg-lab-surface border border-lab-border inline-block">
              {project.category}
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-lab-text-primary tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="font-mono text-sm sm:text-base text-lab-text-secondary">
              {project.subtitle}
            </p>
          </div>

          {/* Metrics Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-lab-surface border border-lab-border font-mono">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-[11px] text-lab-text-muted uppercase">{metric.label}</div>
                <div className="text-2xl font-bold text-lab-accent">{metric.value}</div>
                {metric.description && (
                  <div className="text-xs text-lab-text-secondary">{metric.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Project Image Banner */}
        <div className="relative aspect-video rounded-xl overflow-hidden border border-lab-border bg-lab-surface">
          <img
            src={`https://raw.githubusercontent.com/alekha1234/gujurialekha.github.io/main${project.image}`}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 7-Step Case Study Deep Dive */}
        <div className="space-y-6">
          <div className="space-y-1 border-b border-lab-border pb-4">
            <h2 className="font-display font-bold text-2xl text-lab-text-primary">
              Applied Machine Learning Engineering Specification
            </h2>
            <p className="font-mono text-xs text-lab-text-muted">
              Structured technical analysis conforming to production machine learning standards.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="rounded-xl border border-lab-border bg-lab-surface/70 p-6 space-y-3 hover:border-lab-border-subtle transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-bold text-lab-accent px-2 py-0.5 rounded bg-lab-accent/10 border border-lab-accent/30">
                        STEP {step.num}
                      </span>
                      <Icon className="w-4 h-4 text-lab-text-muted" />
                      <h3 className="font-display font-semibold text-lg text-lab-text-primary">
                        {step.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-lab-text-muted hidden sm:inline-block">
                      {step.tag}
                    </span>
                  </div>

                  <p className="text-sm text-lab-text-secondary leading-relaxed font-sans pl-1">
                    {step.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack Breakdown */}
        <div className="rounded-xl border border-lab-border bg-lab-surface p-6 space-y-4">
          <h3 className="font-mono text-xs text-lab-text-muted uppercase tracking-wider">
            TECHNICAL_ENVIRONMENT_COMPONENTS:
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs px-3 py-1.5 rounded bg-lab-elevated border border-lab-border text-lab-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl border border-lab-border bg-lab-surface/90">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-bold text-lg text-lab-text-primary">
              Ready to Inspect the Source Code?
            </h4>
            <p className="text-xs font-mono text-lab-text-muted">
              Access the complete Jupyter notebook, preprocessing routines, and evaluation logs.
            </p>
          </div>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded font-mono text-xs font-semibold bg-lab-accent text-lab-bg hover:bg-emerald-400 transition-colors shadow-lab-glow"
          >
            <Github className="w-4 h-4" />
            <span>Open GitHub Notebook</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </main>
  );
}
