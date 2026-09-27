'use client';

import React, { useState } from 'react';
import { personalData } from '@/data/personal';
import {
  Brain,
  Cpu,
  Layers,
  Server,
  ChevronDown,
  ChevronUp,
  Compass,
  Sparkles,
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
      title: 'Generative AI & Operator Alert Summarization',
      description:
        'Integrating machine learning outputs with municipal command centers (ICCC) and deploying LLM-based alert summarization so operators receive clear, plain-language operational summaries.',
      icon: Bot,
      tools: ['GenAI / LLMs', 'Prompt Design', 'ICCC Integration', 'Alert Traceability'],
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
    <section id="about" className="py-24 border-t border-lab-border bg-lab-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs text-lab-accent tracking-widest">[01 // BACKGROUND & PRODUCTION PHILOSOPHY]</span>
            <div className="h-[1px] bg-lab-border flex-1 max-w-xs" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-lab-text-primary tracking-tight">
            About & Engineering Practice
          </h2>
        </div>

        {/* Narrative & Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7 space-y-5 text-lab-text-secondary leading-relaxed font-sans">
            <p className="text-lg text-lab-text-primary font-medium">
              {personalData.shortBio}
            </p>

            <p>
              Operating across the seam between applied data science and software delivery, my work centers on developing reliable, reusable, and production-ready machine learning solutions for Smart City IoT and enterprise systems at <strong>Trinity Mobility</strong>.
            </p>

            {expanded && (
              <div className="space-y-4 pt-2 border-t border-lab-border/50 text-lab-text-secondary animate-fadeIn">
                {personalData.extendedBio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center space-x-2 font-mono text-xs text-lab-accent hover:text-emerald-300 transition-colors pt-2 focus:outline-none"
            >
              <span>{expanded ? 'Collapse Detailed Narrative' : 'Read Full Engineering Background'}</span>
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick Quantitative Facts Box */}
          <div className="lg:col-span-5 bg-lab-surface border border-lab-border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-lab-border pb-3">
              <span className="font-mono text-xs text-lab-text-muted flex items-center space-x-2">
                <Compass className="w-3.5 h-3.5 text-lab-accent" />
                <span>VERIFIED_PROFILE</span>
              </span>
              <span className="font-mono text-[11px] text-lab-accent">2.5 YRS EXPERIENCE</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-lab-border/50">
                <span className="text-lab-text-muted">CURRENT ENGAGEMENT</span>
                <span className="text-lab-text-primary">Trinity Mobility (Associate Data Scientist)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-lab-border/50">
                <span className="text-lab-text-muted">LOCATION</span>
                <span className="text-lab-text-primary">{personalData.location}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-lab-border/50">
                <span className="text-lab-text-muted">HIGHEST EDUCATION</span>
                <span className="text-lab-text-primary">MCA (AI & ML) — LPU (2025–2027)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-lab-border/50">
                <span className="text-lab-text-muted">UNDERGRADUATE</span>
                <span className="text-lab-text-primary">B.Sc. Physics (Hons) — 7.7/10 CGPA</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-lab-text-muted">CORE EXPERTISE</span>
                <span className="text-lab-accent">Time Series • FastAPI • Simulation • MLOps</span>
              </div>
            </div>
          </div>
        </div>

        {/* What I Do — 4 Pillars */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center space-x-3">
            <h3 className="font-display font-bold text-2xl text-lab-text-primary">
              What I Do
            </h3>
            <span className="font-mono text-xs text-lab-text-muted">// PRODUCTION PILLARS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.code}
                  className="rounded-lg border border-lab-border bg-lab-surface/60 p-6 flex flex-col justify-between hover:border-lab-accent/60 hover:bg-lab-surface transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-lab-text-muted">
                        {pillar.code}
                      </span>
                      <Icon className="w-5 h-5 text-lab-accent group-hover:scale-110 transition-transform" />
                    </div>

                    <h4 className="font-display font-bold text-lg text-lab-text-primary leading-snug group-hover:text-lab-accent transition-colors">
                      {pillar.title}
                    </h4>

                    <p className="text-xs text-lab-text-secondary leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-lab-border/50 flex flex-wrap gap-1.5 mt-4">
                    {pillar.tools.map((tool) => (
                      <span
                        key={tool}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-lab-elevated text-lab-text-secondary border border-lab-border/70"
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
      </div>
    </section>
  );
}
