'use client';

import React, { useState } from 'react';
import { personalData } from '@/data/personal';
import { skillsData } from '@/data/skills';
import {
  Brain,
  Cpu,
  Server,
  ChevronDown,
  ChevronUp,
  Compass,
  Bot,
} from 'lucide-react';

export default function About() {
  const [expanded, setExpanded] = useState(false);

  const pillars = [
    {
      code: 'PILLAR_01',
      title: 'Time-Series Forecasting & Multi-Stage ML',
      description:
        'Designing chained predictive pipelines (e.g. Smart Irrigation) where soil and weather forecasts feed decision classifiers and duration regressors, returning unified operational commands.',
      icon: Brain,
      tools: ['Scikit-Learn', 'Time-Series', 'Lag Features', 'FastAPI', 'Pandas'],
    },
    {
      code: 'PILLAR_02',
      title: 'Simulation Engines & Synthetic Telemetry',
      description:
        'Building physics-informed synthetic data engines and simulation pipelines (e.g. Smart Energy) for load curves, peak demand, and anomaly scenarios across 15-min to daily intervals.',
      icon: Cpu,
      tools: ['Pandapower', 'NetworkX', 'Parquet', 'JSON', 'Synthetic Data'],
    },
    {
      code: 'PILLAR_03',
      title: 'Generative AI, RAG & Agentic AI',
      description:
        'Integrating RAG pipelines and agentic AI workflows with municipal command centers (ICCC). Deploying LLM-based alert summarization with retrieval-augmented context so operators receive clear, grounded operational summaries.',
      icon: Bot,
      tools: ['GenAI / LLMs', 'RAG Pipelines', 'Agentic AI', 'Prompt Design', 'ICCC Integration'],
    },
    {
      code: 'PILLAR_04',
      title: 'MLOps, Quality Gates & Microservice CI/CD',
      description:
        'Architecting Model Registries with Nexus, single-click deployment CI/CD workflows, and automated test execution with code coverage gates within Flask/FastAPI service pipelines.',
      icon: Server,
      tools: ['FastAPI', 'Flask', 'MLflow', 'Evidently AI', 'Nexus', 'CI/CD'],
    },
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="py-16 border-t border-lab-border bg-lab-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-1.5 mb-8">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] text-lab-accent tracking-widest">[01 // BACKGROUND & PRODUCTION PHILOSOPHY]</span>
            <div className="h-[1px] bg-lab-border flex-1 max-w-xs" aria-hidden="true" />
          </div>
          <h2 id="about-heading" className="font-display font-bold text-2xl sm:text-3xl text-lab-text-primary tracking-tight">
            About & Engineering Practice
          </h2>
        </div>

        {/* Narrative & Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          <div className="lg:col-span-7 space-y-3 text-lab-text-secondary leading-relaxed font-sans text-sm">
            <p className="text-base text-lab-text-primary font-medium">
              {personalData.shortBio}
            </p>

            <p>
              Operating across the seam between applied data science and software delivery, my work centers on developing reliable, reusable, and production-ready machine learning solutions for Smart City IoT and enterprise systems at <strong>Trinity Mobility</strong>.
            </p>

            {expanded && (
              <div className="space-y-3 pt-2 border-t border-lab-border/50 text-lab-text-secondary animate-fadeIn">
                {personalData.extendedBio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className="inline-flex items-center space-x-1.5 font-mono text-[10px] text-lab-accent hover:text-emerald-300 transition-colors pt-1 focus-ring rounded p-1"
            >
              <span>{expanded ? 'Collapse' : 'Read Full Background'}</span>
              {expanded ? <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" /> : <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />}
            </button>
          </div>

          {/* Quick Facts Box */}
          <div className="lg:col-span-5 bg-lab-surface border border-lab-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-lab-border pb-2">
              <span className="font-mono text-[10px] text-lab-text-muted flex items-center space-x-1.5">
                <Compass className="w-3 h-3 text-lab-accent" />
                <span>VERIFIED_PROFILE</span>
              </span>
              <span className="font-mono text-[10px] text-lab-accent">2.5 YRS EXPERIENCE</span>
            </div>

            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between py-1 border-b border-lab-border/50">
                <span className="text-lab-text-muted">CURRENT ENGAGEMENT</span>
                <span className="text-lab-text-primary">Trinity Mobility (Associate Data Scientist)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-lab-border/50">
                <span className="text-lab-text-muted">LOCATION</span>
                <span className="text-lab-text-primary">{personalData.location}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-lab-border/50">
                <span className="text-lab-text-muted">HIGHEST EDUCATION</span>
                <span className="text-lab-text-primary">MCA (AI & ML) — LPU (2025–2027)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-lab-border/50">
                <span className="text-lab-text-muted">UNDERGRADUATE</span>
                <span className="text-lab-text-primary">B.Sc. Physics (Hons) — 7.7/10 CGPA</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-lab-text-muted">CORE EXPERTISE</span>
                <span className="text-lab-accent">Time Series • FastAPI • Simulation • MLOps</span>
              </div>
            </div>
          </div>
        </div>

        {/* What I Do — 4 Pillars */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center space-x-3">
            <h3 className="font-display font-bold text-xl text-lab-text-primary">
              What I Do
            </h3>
            <span className="font-mono text-[10px] text-lab-text-muted">// PRODUCTION PILLARS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.code}
                  className="rounded-lg border border-lab-border bg-lab-surface/60 p-4 flex flex-col justify-between hover:border-lab-accent/60 hover:bg-lab-surface transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-lab-text-muted">
                        {pillar.code}
                      </span>
                      <Icon className="w-4 h-4 text-lab-accent group-hover:scale-110 transition-transform" />
                    </div>

                    <h4 className="font-display font-bold text-sm text-lab-text-primary leading-snug group-hover:text-lab-accent transition-colors">
                      {pillar.title}
                    </h4>

                    <p className="text-[11px] text-lab-text-secondary leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-lab-border/50 flex flex-wrap gap-1 mt-3">
                    {pillar.tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-lab-elevated text-lab-text-secondary border border-lab-border/70"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Merged: Technical Competencies & Tooling Matrix */}
        <div id="skills" className="mt-10 pt-6 border-t border-lab-border/60 scroll-mt-24">
          <div className="flex items-center space-x-2 mb-4">
            <span className="font-mono text-[10px] text-lab-accent tracking-widest">[04 // TECH_MATRIX & TOOLING COMPETENCIES]</span>
            <div className="h-[1px] bg-lab-border flex-1 max-w-xs" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {skillsData.map((category) => (
              <div
                key={category.code}
                className="rounded-lg border border-lab-border bg-lab-surface/60 p-3 hover:border-lab-border-subtle transition-all duration-300"
              >
                <div className="flex items-center justify-between border-b border-lab-border pb-2 mb-2">
                  <span className="font-mono text-[9px] text-lab-accent">{category.code}</span>
                </div>

                <h4 className="font-display font-bold text-xs text-lab-text-primary mb-1">
                  {category.title}
                </h4>

                <div className="space-y-1 pt-1">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between py-0.5 text-[10px] font-mono"
                    >
                      <span className={`flex items-center space-x-1.5 ${skill.highlight ? 'text-lab-text-primary' : 'text-lab-text-secondary'}`}>
                        {skill.highlight && (
                          <span className="w-1 h-1 rounded-full bg-lab-accent inline-block" />
                        )}
                        <span>{skill.name}</span>
                      </span>
                      <span className="text-[9px] text-lab-text-muted">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
