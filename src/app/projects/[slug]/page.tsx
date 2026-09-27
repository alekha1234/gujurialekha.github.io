import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { featuredProjects, ProjectItem } from '@/data/projects';
import { getAssetPath } from '@/utils/assets';
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

export function generateMetadata({ params }: PageProps): Metadata {
  const project = featuredProjects.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: 'Project Case Study Not Found',
    };
  }

  const canonicalUrl = `https://alekha1234.github.io/gujurialekha.github.io/projects/${project.slug}/`;
  const imageUrl = `https://alekha1234.github.io/gujurialekha.github.io${project.image}`;

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: canonicalUrl,
      title: `${project.title} | Applied ML Case Study`,
      description: project.summary,
      siteName: 'Alekha Gujuri — Data Scientist Portfolio',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} — Applied Machine Learning Architecture`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Case Study`,
      description: project.summary,
      creator: '@Alekha81293434',
      images: [imageUrl],
    },
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

  const currentIndex = featuredProjects.findIndex((p) => p.slug === params.slug);
  const prevProject =
    featuredProjects[(currentIndex - 1 + featuredProjects.length) % featuredProjects.length];
  const nextProject = featuredProjects[(currentIndex + 1) % featuredProjects.length];

  const canonicalUrl = `https://alekha1234.github.io/gujurialekha.github.io/projects/${project.slug}/`;
  const imageUrl = `https://alekha1234.github.io/gujurialekha.github.io${project.image}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${canonicalUrl}#article`,
        isPartOf: {
          '@id': 'https://alekha1234.github.io/gujurialekha.github.io/#website',
        },
        headline: project.title,
        description: project.summary,
        inLanguage: 'en-US',
        url: canonicalUrl,
        image: imageUrl,
        author: {
          '@id': 'https://alekha1234.github.io/gujurialekha.github.io/#person',
        },
        publisher: {
          '@id': 'https://alekha1234.github.io/gujurialekha.github.io/#person',
        },
        datePublished: '2024-01-15T00:00:00Z',
        dateModified: '2026-09-27T00:00:00Z',
        articleSection: project.category,
        keywords: project.technologies.join(', '),
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${canonicalUrl}#code`,
        name: project.title,
        codeRepository: project.githubUrl,
        programmingLanguage: 'Python',
        author: {
          '@id': 'https://alekha1234.github.io/gujurialekha.github.io/#person',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://alekha1234.github.io/gujurialekha.github.io/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Case Studies',
            item: 'https://alekha1234.github.io/gujurialekha.github.io/#case-studies',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-lab-bg text-lab-text-primary py-12 px-4 sm:px-6 lg:px-8">
      {/* Schema.org 2026 Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            src={getAssetPath(project.image)}
            alt={`${project.title} — Applied Machine Learning Architecture`}
            width={1200}
            height={675}
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
            <h3 className="font-display font-bold text-lg text-lab-text-primary">
              Ready to Inspect the Source Code?
            </h3>
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

        {/* Directional Internal Link Conduits: Previous / Next Case Study */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-lab-border">
          <Link
            href={`/projects/${prevProject.slug}/`}
            className="group flex flex-col p-4 rounded-xl border border-lab-border bg-lab-surface/60 hover:border-lab-accent/60 transition-all"
          >
            <span className="font-mono text-[10px] text-lab-text-muted uppercase flex items-center space-x-1 group-hover:text-lab-accent">
              <ArrowLeft className="w-3 h-3" />
              <span>Previous Case Study</span>
            </span>
            <span className="font-display font-semibold text-sm text-lab-text-primary mt-1 line-clamp-1 group-hover:text-lab-accent transition-colors">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}/`}
            className="group flex flex-col items-end text-right p-4 rounded-xl border border-lab-border bg-lab-surface/60 hover:border-lab-accent/60 transition-all"
          >
            <span className="font-mono text-[10px] text-lab-text-muted uppercase flex items-center space-x-1 group-hover:text-lab-accent">
              <span>Next Case Study</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
            <span className="font-display font-semibold text-sm text-lab-text-primary mt-1 line-clamp-1 group-hover:text-lab-accent transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
