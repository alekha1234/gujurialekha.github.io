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
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
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

// One shared clock for all four demos (one re-render per tick, not four), running only while the
// AI Lab is on screen: off screen, or during page load, the demos cost no main-thread time.
function useTicker(ms: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting) id = setInterval(() => setTick((t) => t + 1), ms);
    });
    io.observe(document.getElementById('ai-lab')!);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, [ms]);
  return tick;
}

function WorkLink({ title, sub, href, internal }: { title: string; sub: string; href: string; internal?: boolean }) {
  const cls = 'group flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-3 hover:border-lab-accent/50 transition-shadow focus-ring';
  const body = (
    <>
      <span>
        <span className="block text-sm font-semibold text-lab-text-primary">{title}</span>
        <span className="text-xs text-lab-text-secondary mt-0.5 line-clamp-2 min-h-[2rem]">{sub}</span>
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

// The stage being explained, under each card's demo (same pattern for all four pipelines).
function StepNote({ stages, notes, i, color }: { stages: string[]; notes: string[]; i: number; color: string }) {
  return (
    <p className="text-sm text-lab-text-secondary min-h-[80px] sm:min-h-[60px]" aria-live="polite">
      <span className="font-mono" style={{ color }}>{stages[i]}: </span>
      {notes[i]}
    </p>
  );
}

// The same raised "3D" tile in every card's demo. The tile for the running stage lifts and glows
// in the card's colour. Fixed height so changing content never resizes the card.
function Tile({ on, label, color, children }: { on: boolean; label: string; color: string; children: React.ReactNode }) {
  return (
    <div
      className="tile3d h-[88px] min-w-0 overflow-hidden rounded-md border px-2 py-1.5"
      style={on ? { borderColor: color, boxShadow: `0 12px 24px -12px ${color}, inset 0 1px 0 rgba(255,255,255,0.12)`, transform: 'translateY(-3px)' } : undefined}
    >
      <p className="font-mono text-[11px] text-lab-text-muted mb-1 truncate">{label}</p>
      {children}
    </div>
  );
}

// Every demo is the same shape: one caption line, then four tiles.
function Demo({ caption, on, color, children }: { caption: string; on: boolean; color: string; children: React.ReactNode }) {
  return (
    <>
      <p className="font-mono text-sm truncate transition-colors" style={{ color: on ? color : undefined }}>
        {caption}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{children}</div>
    </>
  );
}

const Illustrative = () => <p className="font-mono text-[11px] text-lab-text-muted">Illustrative example</p>;

const ML_NOTES = [
  'Raw sensor and weather readings arrive, with gaps and noise.',
  'Gaps are filled and values scaled so every feature is comparable.',
  'Lag and rolling features turn single readings into patterns over time.',
  'A model is chosen for the task: forecast, classify, or regress.',
  'The model learns from history; validation error drops each round.',
  'A fresh reading runs through the exact same steps, live.',
  'The output is an action an operator can trust: irrigate, and for how long.',
];
const LOSS = [92, 70, 52, 40, 33, 30];

const RAG_NOTES = [
  'An operator asks a plain-language question.',
  'The question becomes a vector, the same space the documents live in.',
  'The vector index finds the closest documents by meaning, not keywords.',
  'The best matches are pulled in; the rest are ignored.',
  'Retrieved passages are packed into the prompt as context.',
  'The LLM answers using only that context.',
  'The answer is grounded and traceable back to its sources.',
];
const DOCS = [
  ['Sensor log', 'Zone 4 moisture'],
  ['Heat alert', '41°C at 14:00'],
  ['Pump schedule', 'zones 1–6'],
];

const CV_NOTES = [
  'A camera frame arrives.',
  'The frame becomes a grid of pixel intensities: a tensor.',
  'Convolution windows slide over the grid, picking up edges and shapes.',
  'The vision model combines those features layer by layer.',
  'It outputs a class, or a bounding box around what it found.',
];
// 4x4 pixel intensities for the Frame tile (decorative only, not a real image).
const PIXELS = Array.from({ length: 16 }, (_, k) => 0.15 + (((k * 37) % 23) / 23) * 0.6);

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
// The RAG highlight from current work doubles as the LLM section's production example.
const [ragHead, ...ragRest] = experienceData[0].highlights.find((h) => /RAG/.test(h))!.split(': ');
const ragBody = ragRest.join(': ');

// One layout for all four cards. On desktop each card is a CSS subgrid over 8 shared row tracks
// (tag, title, description, demo, stages+note, caption, label, link), so every zone lines up with
// its neighbour in the same row no matter how the text wraps.
function LabCard({
  id, tag, tagColor, title, description, demo, stages, step, notes, color, workLabel, work,
}: {
  id: string; tag: string; tagColor?: string; title: string; description: string; demo: React.ReactNode;
  stages: string[]; step: number; notes: string[]; color: string; workLabel: string; work: React.ReactNode;
}) {
  return (
    <article id={id} aria-labelledby={`${id}-heading`} className="glass rounded-xl p-5 flex flex-col scroll-mt-16 lg:grid lg:grid-rows-subgrid lg:row-span-8 lg:gap-y-0">
      <LabTag color={tagColor}>{tag}</LabTag>
      <h3 id={`${id}-heading`} className="font-display font-semibold text-xl tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-sm text-lab-text-secondary leading-relaxed">{description}</p>
      <div aria-hidden="true" className="mt-4 rounded-lg border border-white/5 bg-white/[0.02] p-3 flex flex-col gap-3">
        {demo}
      </div>
      <div className="mt-4 space-y-4">
        <StageFlow stages={stages} color={color} active={step} />
        <StepNote stages={stages} notes={notes} i={step} color={color} />
      </div>
      <Illustrative />
      <h4 className="font-mono text-xs tracking-[0.2em] text-lab-text-muted mt-auto pt-5 mb-2">{workLabel}</h4>
      {work}
    </article>
  );
}

export default function AILab() {
  const tick = useTicker(2000);
  const mlStep = tick % pipelines.ml.length;
  const nlpStep = tick % pipelines.nlp.length;
  const ragStep = tick % pipelines.rag.length;
  const cvStep = tick % pipelines.cv.length;

  return (
    <LabSection id="ai-lab" labelledBy="ai-lab-heading">
      <h2 id="ai-lab-heading" className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-3">
        AI Lab
      </h2>
      <p className="text-sm text-lab-text-secondary mb-6">
        Four pipelines I build with, each traced to a project that uses it.
      </p>

      <div className="rail grid gap-4 lg:grid-cols-2">
        <LabCard
          id="ml-lab"
          tag="03 // Machine learning"
          title="The training environment"
          description="Every model I ship follows the same path, from raw sensor or business data to a prediction an operator can act on."
          stages={pipelines.ml}
          step={mlStep}
          notes={ML_NOTES}
          color="#3b82f6"
          demo={
            <Demo caption="Zone 4 soil sensor" on={mlStep === 0} color="#3b82f6">
              <Tile on={mlStep <= 1 || mlStep === 5} label="Reading" color="#3b82f6">
                <p className="font-mono text-xs text-lab-text-secondary leading-snug">
                  moist 0.31
                  <br />
                  temp 33°C
                  <br />
                  hum <span className={mlStep === 0 ? 'text-amber-300' : ''}>{mlStep === 0 ? '— gap' : '41%'}</span>
                </p>
              </Tile>
              <Tile on={mlStep === 2} label="Features" color="#3b82f6">
                <div className={`flex items-end gap-[2px] h-9 transition-opacity ${mlStep >= 2 ? 'opacity-100' : 'opacity-20'}`}>
                  {['lag1', 'lag3', 'roll6', 'temp', 'hum', 'rain'].map((f, d) => (
                    <span key={f} className="w-1.5 bg-lab-accent rounded-sm" style={{ height: `${vec(f, d)}%` }} />
                  ))}
                </div>
              </Tile>
              <Tile on={mlStep === 3 || mlStep === 4} label={mlStep === 4 ? 'Train error' : 'Model'} color="#3b82f6">
                {mlStep === 4 ? (
                  <div className="flex items-end gap-[3px] h-9">
                    {LOSS.map((h, d) => (
                      <span key={d} className="w-1.5 bg-lab-accent/80 rounded-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                ) : (
                  <p className="font-mono text-xs text-lab-text-secondary leading-snug">gradient boosting</p>
                )}
              </Tile>
              <Tile on={mlStep === 6} label="Output" color="#3b82f6">
                <p className={`font-mono text-xs leading-snug ${mlStep === 6 ? 'text-white' : 'text-lab-text-muted'}`}>
                  {mlStep === 6 ? 'Irrigate ON 18 min' : 'waiting…'}
                </p>
              </Tile>
            </Demo>
          }
          workLabel="IN PRODUCTION · TRINITY MOBILITY"
          work={
            <WorkLink
              internal
              title={project('ml-composer-platform').title}
              sub={project('ml-composer-platform').summary}
              href={`/projects/${project('ml-composer-platform').slug}/`}
            />
          }
        />

        <LabCard
          id="nlp-lab"
          tag="04 // Natural language"
          title="How a model reads a sentence"
          description="Follow one sentence through the stages. Each step lights up in turn."
          stages={pipelines.nlp}
          step={nlpStep}
          notes={NLP_STEPS}
          color="#22d3ee"
          demo={
            <Demo caption="“AI understands human language”" on={nlpStep === 0} color="#22d3ee">
              {TOKENS.map((t, k) => (
                // One word lights per stage, as if the model reads the sentence left to right.
                <Tile key={t} on={nlpStep === k + 1} label={t} color="#22d3ee">
                  <div className={`flex items-end gap-[2px] h-9 transition-opacity ${nlpStep >= 1 ? 'opacity-100' : 'opacity-20'}`}>
                    {Array.from({ length: 6 }, (_, d) => (
                      <span key={d} className="w-1.5 bg-lab-violet rounded-sm" style={{ height: `${vec(t, d)}%` }} />
                    ))}
                  </div>
                </Tile>
              ))}
            </Demo>
          }
          workLabel="IN MY WORK"
          work={<WorkLink title={archived('nlp-suite').title} sub={archived('nlp-suite').description} href={archived('nlp-suite').githubUrl} />}
        />

        <LabCard
          id="llm-lab"
          tag="05 // LLM core"
          tagColor="text-violet-300"
          title="Retrieval-augmented generation"
          description="A query is embedded, matched against a vector index, and the retrieved context grounds the LLM so its answer is traceable to real data. It is the pattern behind the alert summaries I deployed for city operators."
          stages={pipelines.rag}
          step={ragStep}
          notes={RAG_NOTES}
          color="#a78bfa"
          demo={
            <Demo caption="“Why did Zone 4 irrigate twice today?”" on={ragStep <= 1} color="#a78bfa">
              {DOCS.map(([name, detail], k) => (
                <Tile key={name} on={k < 2 && ragStep === k + 2} label={name} color="#a78bfa">
                  <p className={`font-mono text-xs leading-snug transition-opacity ${k === 2 && ragStep >= 3 ? 'opacity-30' : 'text-lab-text-secondary'}`}>
                    {detail}
                  </p>
                </Tile>
              ))}
              <Tile on={ragStep >= 4} label="Answer" color="#a78bfa">
                <p className={`font-mono text-xs leading-snug ${ragStep >= 4 ? 'text-white' : 'text-lab-text-muted'}`}>
                  {ragStep >= 5 ? 'Heat alert → 2nd cycle · 2 sources' : ragStep === 4 ? 'building prompt…' : 'waiting…'}
                </p>
              </Tile>
            </Demo>
          }
          workLabel="IN PRODUCTION · TRINITY MOBILITY"
          work={<WorkLink internal title={ragHead} sub={ragBody} href={`/projects/${project('smart-irrigation-pipeline').slug}/`} />}
        />

        <LabCard
          id="vision-lab"
          tag="06 // Computer vision"
          tagColor="text-emerald-300"
          title="The vision scanner"
          description="Images become pixel tensors, convolutional layers extract features, and a vision model classifies what it sees or localizes it with bounding boxes."
          stages={pipelines.cv}
          step={cvStep}
          notes={CV_NOTES}
          color="#34d399"
          demo={
            <Demo caption="Camera frame, gate 2" on={cvStep === 0} color="#34d399">
              <Tile on={cvStep === 0} label="Frame" color="#34d399">
                <div className="grid grid-cols-4 gap-[2px] w-10 h-10">
                  {PIXELS.map((v, k) => (
                    <span key={k} className="rounded-[1px]" style={{ background: cvStep === 0 ? '#64748b' : '#34d399', opacity: v }} />
                  ))}
                </div>
              </Tile>
              <Tile on={cvStep === 1} label="Tensor" color="#34d399">
                <p className="font-mono text-xs text-lab-text-secondary leading-snug">
                  8 × 8 × 1
                  <br />
                  values 0–1
                </p>
              </Tile>
              <Tile on={cvStep === 2 || cvStep === 3} label={cvStep === 3 ? 'Model' : 'Features'} color="#34d399">
                <p className="font-mono text-xs text-lab-text-secondary leading-snug">{cvStep === 3 ? 'YOLOv5 backbone' : 'conv 3 × 3 windows'}</p>
              </Tile>
              <Tile on={cvStep === 4} label="Detection" color="#34d399">
                <div className="relative w-12 h-9 rounded-sm border border-white/10">
                  {cvStep === 4 && <span className="absolute inset-1 border-2 border-emerald-300 rounded-sm" />}
                </div>
                <p className={`font-mono text-[11px] mt-0.5 ${cvStep === 4 ? 'text-emerald-300' : 'text-lab-text-muted'}`}>{cvStep === 4 ? 'mask: on' : 'waiting…'}</p>
              </Tile>
            </Demo>
          }
          workLabel="IN MY WORK"
          work={
            <WorkLink
              internal
              title={project('real-time-face-mask-detection').title}
              sub={project('real-time-face-mask-detection').subtitle}
              href={`/projects/${project('real-time-face-mask-detection').slug}/`}
            />
          }
        />
      </div>
    </LabSection>
  );
}
