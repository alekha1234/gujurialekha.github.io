'use client';

import React from 'react';
import { personalData } from '@/data/personal';
import { getAssetPath } from '@/utils/assets';
import { capabilities } from '@/lib/labContent';
import { LabSection, LabTag } from '@/components/ui';

const facts = [
  { k: 'CURRENT ENGAGEMENT', v: 'Trinity Mobility (Associate Data Scientist)' },
  { k: 'EXPERIENCE', v: '2.5 years' },
  { k: 'LOCATION', v: personalData.location },
  { k: 'HIGHEST EDUCATION', v: 'MCA (AI & ML) — LPU (2025–2027)' },
  { k: 'UNDERGRADUATE', v: 'B.Sc. Physics (Hons) — 7.7/10 CGPA' },
  { k: 'CORE EXPERTISE', v: 'Time Series • FastAPI • Simulation • MLOps' },
];

const pillars = [
  {
    title: 'Time-Series Forecasting & Multi-Stage ML',
    description:
      'Designing chained predictive pipelines (e.g. Smart Irrigation) where soil and weather forecasts feed decision classifiers and duration regressors, returning unified operational commands.',
    tools: ['Scikit-Learn', 'Time-Series', 'Lag Features', 'FastAPI', 'Pandas'],
  },
  {
    title: 'Simulation Engines & Synthetic Telemetry',
    description:
      'Building physics-informed synthetic data engines and simulation pipelines (e.g. Smart Energy) for load curves, peak demand, and anomaly scenarios across 15-min to daily intervals.',
    tools: ['Pandapower', 'NetworkX', 'Parquet', 'JSON', 'Synthetic Data'],
  },
  {
    title: 'Generative AI, RAG & Agentic AI',
    description:
      'Integrating RAG pipelines and agentic AI workflows with municipal command centers (ICCC). Deploying LLM-based alert summarization with retrieval-augmented context so operators receive clear, grounded operational summaries.',
    tools: ['GenAI / LLMs', 'RAG Pipelines', 'Agentic AI', 'Prompt Design', 'ICCC Integration'],
  },
  {
    title: 'MLOps, Quality Gates & Microservice CI/CD',
    description:
      'Architecting Model Registries with Nexus, single-click deployment CI/CD workflows, and automated test execution with code coverage gates within Flask/FastAPI service pipelines.',
    tools: ['FastAPI', 'Flask', 'MLflow', 'Evidently AI', 'Nexus', 'CI/CD'],
  },
];

export default function About() {
  return (
    <>
      <LabSection id="about" labelledBy="about-heading">
        <LabTag>01 // Profile</LabTag>
        <h2 id="about-heading" className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-6">
          The engineer behind the lab
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="glass holo-scan rounded-xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-4">
              <img
                src={getAssetPath('/documents/logos/gujuri-alekha-144.jpg')}
                alt={`${personalData.name} — ${personalData.role}`}
                width={72}
                height={72}
                loading="lazy"
                className="w-16 h-16 rounded-lg object-cover object-top border border-lab-accent/40"
              />
              <div>
                <p className="font-display font-semibold text-lg">
                  {personalData.name} <span className="text-xs font-normal text-lab-text-muted">(also {personalData.formalName})</span>
                </p>
                <p className="font-mono text-xs text-lab-cyan">{personalData.role.toUpperCase()}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-lab-text-secondary leading-relaxed">
              {personalData.extendedBio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 pt-4 border-t border-white/5 font-mono text-xs">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="text-lab-text-muted">{f.k}</dt>
                  <dd className="text-lab-text-primary">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col">
            <h3 className="font-mono text-xs tracking-[0.2em] text-lab-text-muted mb-3">AI CAPABILITY MODULES</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
              {capabilities.map((c) => (
                <li key={c.id} className="glass rounded-lg p-4 flex flex-col">
                  <span className="font-mono text-[11px] text-lab-cyan">{c.short}</span>
                  <span className="text-sm font-semibold text-lab-text-primary mt-0.5 mb-1.5">{c.title}</span>
                  <p className="text-xs text-lab-text-secondary leading-relaxed">
                    <span className="font-mono text-lab-cyan">{c.source} → </span>
                    {c.evidence}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </LabSection>

      <section aria-labelledby="pillars-heading" className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LabTag>01.b // Production pillars</LabTag>
          <h2 id="pillars-heading" className="font-display font-bold text-2xl sm:text-3xl tracking-tight mb-6">
            What I build in production
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <article key={p.title} className="glass rounded-xl p-5 flex flex-col">
                <span className="font-mono text-[11px] text-lab-accent">Pillar 0{i + 1}</span>
                <h3 className="font-display font-semibold text-base mt-1 mb-2">{p.title}</h3>
                <p className="text-xs text-lab-text-secondary leading-relaxed flex-1">{p.description}</p>
                <ul className="flex flex-wrap gap-1 mt-4">
                  {p.tools.map((t) => (
                    <li key={t} className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-white/5 text-lab-text-secondary">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
