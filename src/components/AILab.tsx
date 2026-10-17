'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjects, moreProjectsData } from '@/data/projects';
import { experienceData } from '@/data/experience';
import { pipelines } from '@/lib/labContent';
import { LabSection, LabTag } from '@/components/ui';

function StageFlow({ stages, color, active }: { stages: string[]; color: string; active?: number }) {
  return (
    <div className="glass rounded-xl p-4">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2 font-mono text-[11px] sm:text-xs">
        {stages.map((s, i) => (
          <li key={s} className="flex items-center gap-1.5">
            <span
              className={`px-2 py-1 rounded border transition-colors ${
                active === i ? 'text-white border-current bg-white/10' : 'text-lab-text-secondary border-white/10'
              }`}
              style={active === i ? { color } : undefined}
            >
              <span className="opacity-50 mr-1">{String(i + 1).padStart(2, '0')}</span>
              <span className={active === i ? 'text-white' : ''}>{s}</span>
            </span>
            {i < stages.length - 1 && <span className="text-lab-text-muted" aria-hidden="true">→</span>}
          </li>
        ))}
      </ol>
      <div className="relative h-px mt-4 bg-white/10 overflow-hidden" aria-hidden="true">
        {[0, 1, 2].map((d) => (
          <span key={d} className="flow-dot" style={{ animationDelay: `${d * 1.05}s`, background: color, boxShadow: `0 0 10px ${color}` }} />
        ))}
      </div>
    </div>
  );
}

function useStepper(n: number, ms = 1800) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => clearInterval(id);
  }, [n, ms]);
  return i;
}

function WorkLink({ title, sub, href, internal }: { title: string; sub: string; href: string; internal?: boolean }) {
  const cls = 'group flex items-start justify-between gap-3 glass rounded-lg p-3 hover:glass-glow transition-shadow focus-ring';
  const body = (
    <>
      <span>
        <span className="block text-sm font-semibold text-lab-text-primary">{title}</span>
        <span className="block text-xs text-lab-text-secondary mt-0.5 line-clamp-2">{sub}</span>
      </span>
      <ArrowUpRight className="w-4 h-4 shrink-0 text-lab-text-muted group-hover:text-lab-cyan" aria-hidden="true" />
    </>
  );
  return internal ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  );
}

const TOKENS = ['AI', 'understands', 'human', 'language'];
// Decorative vector heights (illustrative only, not model output).
const vec = (t: string, d: number) => 20 + ((t.charCodeAt(d % t.length) * (d + 3)) % 70);

const NLP_STEPS = [
  'The sentence is split into tokens, the units a model reads.',
  'Each token becomes a vector of numbers: its embedding.',
  'Attention lets every token weigh every other token for context.',
  'The context-aware vectors combine into a representation of meaning.',
  'A language model reads that representation to predict or generate text.',
  'The result: a classification, a summary, or a generated response.',
];

const project = (id: string) => featuredProjects.find((p) => p.id === id)!;
const archived = (id: string) => moreProjectsData.find((p) => p.id === id)!;
const genAiWork = experienceData[0].highlights.filter((h) => /RAG|LLM|Agentic/.test(h));

export default function AILab() {
  const nlpStep = useStepper(pipelines.nlp.length, 2200);

  return (
    <div id="ai-lab">
      {/* ---------- Machine learning pipeline ---------- */}
      <LabSection id="ml-lab" labelledBy="ml-heading" side="right">
        <LabTag>03 // AI Lab · Machine learning</LabTag>
        <h2 id="ml-heading" className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-3">
          The training environment
        </h2>
        <p className="text-sm text-lab-text-secondary leading-relaxed mb-5">
          Every model I ship follows the same path, from raw sensor or business data to a prediction an operator can act on.
        </p>
        <StageFlow stages={pipelines.ml} color="#3b82f6" />
        <h3 className="font-mono text-xs tracking-[0.2em] text-lab-text-muted mt-6 mb-2">MODEL CARDS</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {featuredProjects
            .filter((p) => !/Vision|Deep Learning/.test(p.category))
            .map((p) => (
              <div key={p.id} className="glass rounded-lg p-3">
                <p className="font-mono text-[11px] text-lab-accent">{p.category.toUpperCase()}</p>
                <p className="text-sm font-semibold mt-0.5">{p.title.split(':')[0]}</p>
                <p className="text-xs text-lab-text-secondary mt-1 line-clamp-3">{p.caseStudy?.model}</p>
              </div>
            ))}
        </div>
      </LabSection>

      {/* ---------- NLP ---------- */}
      <LabSection id="nlp-lab" labelledBy="nlp-heading" side="left">
        <LabTag>04 // AI Lab · Natural language</LabTag>
        <h2 id="nlp-heading" className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-3">
          How a model reads a sentence
        </h2>
        <p className="text-sm text-lab-text-secondary mb-5">
          Follow one sentence through the stages. Each step lights up in turn.
        </p>
        <div className="glass rounded-xl p-5 space-y-4">
          <p className="font-mono text-sm text-lab-text-primary">&ldquo;AI understands human language&rdquo;</p>
          <div className="flex flex-wrap gap-2" aria-hidden="true">
            {TOKENS.map((t) => (
              <div key={t} className={`rounded-md border px-2 py-1.5 transition-colors ${nlpStep >= 1 ? 'border-lab-violet/50' : 'border-white/10'}`}>
                <p className={`font-mono text-xs ${nlpStep === 0 ? 'text-lab-cyan' : 'text-lab-text-secondary'}`}>{t}</p>
                <div className={`flex items-end gap-[2px] h-5 mt-1 transition-opacity ${nlpStep >= 1 ? 'opacity-100' : 'opacity-20'}`}>
                  {Array.from({ length: 6 }, (_, d) => (
                    <span key={d} className="w-1 bg-lab-violet rounded-sm" style={{ height: `${vec(t, d)}%` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <StageFlow stages={pipelines.nlp} color="#22d3ee" active={nlpStep} />
          <p className="text-sm text-lab-text-secondary min-h-[40px]" aria-live="polite">
            <span className="font-mono text-lab-cyan">{pipelines.nlp[nlpStep]}: </span>
            {NLP_STEPS[nlpStep]}
          </p>
        </div>
        <h3 className="font-mono text-xs tracking-[0.2em] text-lab-text-muted mt-6 mb-2">IN MY WORK</h3>
        <WorkLink title={archived('nlp-suite').title} sub={archived('nlp-suite').description} href={archived('nlp-suite').githubUrl} />
      </LabSection>

      {/* ---------- LLM / RAG ---------- */}
      <LabSection id="llm-lab" labelledBy="llm-heading" side="right">
        <LabTag color="text-violet-300">05 // AI Lab · LLM core</LabTag>
        <h2 id="llm-heading" className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-3">
          Retrieval-augmented generation
        </h2>
        <p className="text-sm text-lab-text-secondary leading-relaxed mb-5">
          A query is embedded, matched against a vector index, and the retrieved context grounds the LLM so its answer is traceable
          to real data. It is the pattern behind the alert summaries I deployed for city operators.
        </p>
        <StageFlow stages={pipelines.rag} color="#8b5cf6" />
        <h3 className="font-mono text-xs tracking-[0.2em] text-lab-text-muted mt-6 mb-2">IN PRODUCTION · TRINITY MOBILITY</h3>
        <ul className="space-y-2">
          {genAiWork.map((h) => {
            const [head, ...rest] = h.split(': ');
            return (
              <li key={head} className="glass rounded-lg p-3">
                <p className="text-sm font-semibold">{head}</p>
                <p className="text-xs text-lab-text-secondary mt-1 leading-relaxed">{rest.join(': ')}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-2">
          <WorkLink
            internal
            title={project('smart-irrigation-pipeline').title}
            sub="LLM summaries published to the ICCC platform for operators."
            href={`/projects/${project('smart-irrigation-pipeline').slug}/`}
          />
        </div>
      </LabSection>

      {/* ---------- Computer vision ---------- */}
      <LabSection id="vision-lab" labelledBy="vision-heading" side="left">
        <LabTag color="text-emerald-300">06 // AI Lab · Computer vision</LabTag>
        <h2 id="vision-heading" className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-3">
          The vision scanner
        </h2>
        <p className="text-sm text-lab-text-secondary leading-relaxed mb-5">
          Images become pixel tensors, convolutional layers extract features, and a vision model classifies what it sees or
          localizes it with bounding boxes.
        </p>
        <StageFlow stages={pipelines.cv} color="#34d399" />
        <h3 className="font-mono text-xs tracking-[0.2em] text-lab-text-muted mt-6 mb-2">VISION PROJECTS</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {['real-time-face-mask-detection', 'jellyfish-marine-classification'].map((id) => (
            <WorkLink key={id} internal title={project(id).title} sub={project(id).subtitle} href={`/projects/${project(id).slug}/`} />
          ))}
          {['cifar10-benchmark', 'cat-dog-resnet50'].map((id) => (
            <WorkLink key={id} title={archived(id).title} sub={archived(id).description} href={archived(id).githubUrl} />
          ))}
        </div>
      </LabSection>
    </div>
  );
}
