'use client';

import React from 'react';
import Image from 'next/image';
import { personalData } from '@/data/personal';
import { getAssetPath } from '@/utils/assets';
import {
  ArrowDown,
  FileText,
  Github,
  Linkedin,
  Terminal,
  Cpu,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 bg-tech-grid">
      {/* Ambient background light point */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-lab-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic & Editorial Core */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* System Status Telemetry */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full border border-lab-accent/30 bg-lab-accent/5 backdrop-blur-sm self-start">
              <span className="w-2 h-2 rounded-full bg-lab-accent animate-ping" />
              <span className="font-mono text-xs font-medium text-lab-accent uppercase tracking-wider">
                {personalData.status}
              </span>
            </div>

            {/* Core Identification Header */}
            <div className="space-y-2">
              <p className="font-mono text-xs text-lab-text-muted uppercase tracking-widest">
                [00 // APPLIED AI & DATA SCIENCE SYSTEM]
              </p>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-lab-text-primary tracking-tight leading-[1.08]">
                ALEKHA <span className="text-lab-accent">GUJURI</span>
              </h1>
              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs sm:text-sm text-lab-text-secondary">
                <span className="px-2 py-0.5 rounded bg-lab-surface border border-lab-border text-lab-text-primary">
                  Data Scientist
                </span>
                <span className="text-lab-text-muted">•</span>
                <span className="px-2 py-0.5 rounded bg-lab-surface border border-lab-border text-lab-text-primary">
                  Machine Learning
                </span>
                <span className="text-lab-text-muted">•</span>
                <span className="px-2 py-0.5 rounded bg-lab-surface border border-lab-border text-lab-text-primary">
                  Applied AI & Vision
                </span>
              </div>
            </div>

            {/* Concise Mission Statement */}
            <p className="text-base sm:text-lg text-lab-text-secondary leading-relaxed max-w-2xl font-sans">
              Transforming complex observational data into deterministic predictive systems. Currently advancing operational analytics and ML models at{' '}
              <span className="text-lab-text-primary font-medium border-b border-lab-accent/50">
                Trinity Mobility
              </span>
              , with prior enterprise consulting leadership at{' '}
              <span className="text-lab-text-primary font-medium border-b border-lab-accent/50">
                Rubixe
              </span>
              .
            </p>

            {/* Metric Telemetry Chips */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="p-3 rounded border border-lab-border bg-lab-surface/60">
                <div className="font-mono text-xl sm:text-2xl font-bold text-lab-accent">2+ Yrs</div>
                <div className="font-mono text-[11px] text-lab-text-muted">Production DS Experience</div>
              </div>
              <div className="p-3 rounded border border-lab-border bg-lab-surface/60">
                <div className="font-mono text-xl sm:text-2xl font-bold text-lab-text-primary">17+</div>
                <div className="font-mono text-[11px] text-lab-text-muted">ML & Vision Repos</div>
              </div>
              <div className="p-3 rounded border border-lab-border bg-lab-surface/60">
                <div className="font-mono text-xl sm:text-2xl font-bold text-lab-cyan">IABAC</div>
                <div className="font-mono text-[11px] text-lab-text-muted">Certified Scientist</div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#case-studies"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded font-mono text-xs uppercase tracking-wider font-semibold bg-lab-accent text-lab-bg hover:bg-emerald-400 transition-all shadow-lab-glow"
              >
                <span>Explore Case Studies</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={personalData.resume.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded font-mono text-xs uppercase tracking-wider border border-lab-border bg-lab-surface hover:bg-lab-elevated text-lab-text-primary hover:border-lab-accent transition-all"
              >
                <FileText className="w-4 h-4 text-lab-accent" />
                <span>View Full Resume</span>
              </a>

              {/* Social Channels */}
              <div className="flex items-center space-x-2 pl-2">
                <a
                  href="https://github.com/alekha1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/gujuri-alekha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.kaggle.com/gujurialekha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors font-mono text-xs font-bold"
                  aria-label="Kaggle Profile"
                >
                  K
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: AI Data-Lab Telemetry & Portrait Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer HUD corner brackets */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-lab-accent" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-lab-accent" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-lab-accent" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-lab-accent" />

              {/* Main Card Container */}
              <div className="rounded-lg border border-lab-border bg-lab-surface/80 p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
                {/* Header terminal bar */}
                <div className="flex items-center justify-between border-b border-lab-border pb-3 mb-5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="font-mono text-xs text-lab-text-muted ml-2">model_inference.py</span>
                  </div>
                  <div className="font-mono text-[10px] text-lab-accent border border-lab-accent/30 px-1.5 py-0.5 rounded bg-lab-accent/5">
                    GPU_CUDA: ACTIVE
                  </div>
                </div>

                {/* Profile Portrait with Data Overlay */}
                <div className="relative aspect-square rounded border border-lab-border/70 overflow-hidden bg-lab-elevated group">
                  {/* Real Portrait Image */}
                  <img
                    src="https://raw.githubusercontent.com/alekha1234/gujurialekha.github.io/main/documents/logos/profile-img.png"
                    alt="Alekha Gujuri"
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="eager"
                  />

                  {/* Scanning line animation */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lab-accent/10 to-transparent h-16 w-full animate-bounce pointer-events-none opacity-40" />

                  {/* Monospace telemetry tag over image */}
                  <div className="absolute bottom-3 left-3 right-3 bg-lab-bg/85 backdrop-blur-md border border-lab-border p-2.5 rounded">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-lab-text-secondary flex items-center space-x-1.5">
                        <Activity className="w-3.5 h-3.5 text-lab-accent" />
                        <span>PIPELINE_STATUS</span>
                      </span>
                      <span className="text-lab-accent font-semibold">ONLINE // 99.8%</span>
                    </div>
                  </div>
                </div>

                {/* Technical Specs Footer inside Card */}
                <div className="mt-5 space-y-2.5 pt-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-lab-text-muted">
                    <span>PRIMARY_LANGUAGE</span>
                    <span className="text-lab-text-primary">Python 3.11</span>
                  </div>
                  <div className="flex items-center justify-between text-lab-text-muted">
                    <span>CORE_FRAMEWORKS</span>
                    <span className="text-lab-text-primary">TensorFlow • Scikit-Learn • YOLO</span>
                  </div>
                  <div className="flex items-center justify-between text-lab-text-muted">
                    <span>SPECIALIZATION</span>
                    <span className="text-lab-accent">CV • NLP • Predictive Analytics</span>
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
