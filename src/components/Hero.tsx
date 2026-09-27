'use client';

import React from 'react';
import { personalData } from '@/data/personal';
import { getAssetPath } from '@/utils/assets';
import {
  ArrowDown,
  FileText,
  Github,
  Linkedin,
  Activity,
} from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[90vh] flex items-center pt-20 pb-12 bg-tech-grid">
      {/* Ambient background light point */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-lab-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* System Status */}
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full border border-lab-accent/30 bg-lab-accent/5 backdrop-blur-sm self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-lab-accent animate-ping" />
              <span className="font-mono text-[10px] font-medium text-lab-accent uppercase tracking-wider">
                {personalData.status}
              </span>
            </div>

            {/* Core Identification Header */}
            <div className="space-y-1.5">
              <p className="font-mono text-[10px] text-lab-text-muted uppercase tracking-widest">
                [00 // APPLIED ML & ML ENGINEERING SYSTEM]
              </p>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-lab-text-primary tracking-tight leading-[1.1]">
                GUJURI <span className="text-lab-accent">ALEKHA</span>
                <span className="sr-only"> — Associate Data Scientist & Machine Learning Engineer</span>
              </h1>
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5 font-mono text-[10px] sm:text-xs text-lab-text-secondary">
                <span className="px-1.5 py-0.5 rounded bg-lab-surface border border-lab-border text-lab-text-primary">
                  Associate Data Scientist
                </span>
                <span className="text-lab-text-muted">•</span>
                <span className="px-1.5 py-0.5 rounded bg-lab-surface border border-lab-border text-lab-text-primary">
                  Applied ML & MLOps
                </span>
                <span className="text-lab-text-muted">•</span>
                <span className="px-1.5 py-0.5 rounded bg-lab-surface border border-lab-border text-lab-text-primary">
                  Time Series & Simulation
                </span>
              </div>
            </div>

            {/* Concise Mission Statement — Rubixe removed */}
            <p className="text-sm sm:text-base text-lab-text-secondary leading-relaxed max-w-2xl font-sans">
              Applied Data Scientist with <strong>2.5 years of experience</strong> carrying machine learning from rough problem statements through to production delivery. Developing time-series forecasting, multi-stage decision pipelines, and simulation engines at{' '}
              <span className="text-lab-text-primary font-medium border-b border-lab-accent/50">
                Trinity Mobility
              </span>
              .
            </p>

            {/* Metric Telemetry Chips */}
            <div className="grid grid-cols-3 gap-2 pt-1 max-w-md">
              <div className="p-2 rounded border border-lab-border bg-lab-surface/60">
                <div className="font-mono text-base sm:text-lg font-bold text-lab-accent">2.5 Yrs</div>
                <div className="font-mono text-[10px] text-lab-text-muted">Production ML</div>
              </div>
              <div className="p-2 rounded border border-lab-border bg-lab-surface/60">
                <div className="font-mono text-sm sm:text-[15px] font-bold text-lab-text-primary whitespace-nowrap">Data Science</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-lab-accent truncate">MLOps, RAG & GenAI</div>
              </div>
              <div className="p-2 rounded border border-lab-border bg-lab-surface/60">
                <div className="font-mono text-base sm:text-lg font-bold text-lab-cyan">MCA (AI)</div>
                <div className="font-mono text-[10px] text-lab-text-muted">LPU 2027</div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href="#case-studies"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded font-mono text-[10px] uppercase tracking-wider font-semibold bg-lab-accent text-lab-bg hover:bg-emerald-400 transition-all shadow-lab-glow focus-ring"
              >
                <span>Inspect Production Work</span>
                <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
              </a>

              <a
                href={getAssetPath(personalData.resume.viewUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded font-mono text-[10px] uppercase tracking-wider border border-lab-border bg-lab-surface hover:bg-lab-elevated text-lab-text-primary hover:border-lab-accent transition-all focus-ring"
                aria-label="View Resume PDF (opens in new tab)"
              >
                <FileText className="w-3.5 h-3.5 text-lab-accent" aria-hidden="true" />
                <span>View Resume</span>
              </a>

              {/* Social Channels — smaller icons */}
              <div className="flex items-center space-x-1.5 pl-1">
                <a
                  href="https://github.com/alekha1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors focus-ring"
                  aria-label="View Alekha Gujuri GitHub Profile (opens in new tab)"
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/gujuri-alekha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors focus-ring"
                  aria-label="Connect with Alekha Gujuri on LinkedIn (opens in new tab)"
                >
                  <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.kaggle.com/gujurialekha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors font-mono text-[10px] font-bold focus-ring"
                  aria-label="View Alekha Gujuri Kaggle Competitions (opens in new tab)"
                >
                  K
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Portrait Frame — full width on mobile, aligned height on desktop */}
          <div className="lg:col-span-5 relative flex justify-center w-full">
            <div className="relative w-full max-w-full sm:max-w-md lg:max-w-[270px]">
              {/* Outer HUD corner brackets */}
              <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-lab-accent" />
              <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-lab-accent" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-lab-accent" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-lab-accent" />

              {/* Main Card Container */}
              <div className="rounded-lg border border-lab-border bg-lab-surface/80 p-3 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col justify-between">
                {/* Header terminal bar */}
                <div className="flex items-center justify-between border-b border-lab-border pb-2 mb-2.5">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="font-mono text-[10px] text-lab-text-muted ml-1.5">pipeline.py</span>
                  </div>
                  <div className="font-mono text-[9px] text-lab-accent border border-lab-accent/30 px-1.5 py-0.5 rounded bg-lab-accent/5">
                    ONLINE
                  </div>
                </div>

                {/* Profile Portrait */}
                <div className="relative aspect-[4/5] rounded border border-lab-border/70 overflow-hidden bg-lab-elevated group">
                  <img
                    src={getAssetPath('/documents/logos/headshot.png')}
                    alt="Gujuri Alekha — Associate Data Scientist"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                    loading="eager"
                  />

                  {/* Monospace telemetry tag */}
                  <div className="absolute bottom-2 left-2 right-2 bg-lab-bg/90 backdrop-blur-md border border-lab-border p-1.5 rounded">
                    <div className="flex items-center justify-between font-mono text-[9px]">
                      <span className="text-lab-text-secondary flex items-center space-x-1">
                        <Activity className="w-3 h-3 text-lab-accent" />
                        <span>AI / ML SYSTEMS</span>
                      </span>
                      <span className="text-lab-accent font-semibold">RAG // ACTIVE</span>
                    </div>
                  </div>
                </div>

                {/* Technical Specs Footer */}
                <div className="mt-2.5 pt-2 border-t border-lab-border/50 font-mono text-[9px] space-y-1.5">
                  <div className="flex items-center justify-between text-lab-text-muted">
                    <span>ROLE</span>
                    <span className="text-lab-accent font-semibold">Associate Data Scientist</span>
                  </div>
                  <div className="flex items-center justify-between text-lab-text-muted">
                    <span>COMPANY</span>
                    <span className="text-lab-text-primary">Trinity Mobility (Bengaluru)</span>
                  </div>
                  <div className="flex items-center justify-between text-lab-text-muted">
                    <span>FOCUS</span>
                    <span className="text-lab-text-primary">Machine Learning • RAG • GenAI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
