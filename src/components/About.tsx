'use client';

import React, { useState } from 'react';
import { personalData } from '@/data/personal';
import {
  Brain,
  Eye,
  MessageSquareCode,
  Server,
  ChevronDown,
  ChevronUp,
  Cpu,
  Compass,
} from 'lucide-react';

export default function About() {
  const [expanded, setExpanded] = useState(false);

  const pillars = [
    {
      code: 'PILLAR_01',
      title: 'Data Science & Predictive Modeling',
      description:
        'Transforming raw transactional and operational datasets into empirical insights. Performing rigorous EDA, feature engineering, hypothesis validation, and predictive modeling for business triage.',
      icon: Brain,
      tools: ['Scikit-Learn', 'Pandas', 'NumPy', 'Stats', 'EDA'],
    },
    {
      code: 'PILLAR_02',
      title: 'Machine Learning & Deep Architectures',
      description:
        'Developing supervised and unsupervised pipelines—from gradient boosted trees (XGBoost/LightGBM) to deep neural networks (CNNs, ResNet50) for fine-grained classification.',
      icon: Cpu,
      tools: ['TensorFlow', 'Keras', 'Random Forest', 'SVM', 'Ensembles'],
    },
    {
      code: 'PILLAR_03',
      title: 'AI, Vision & NLP Engineering',
      description:
        'Implementing high-throughput object detection using YOLOv5 and end-to-end NLP pipelines encompassing tokenization, TF-IDF vectorization, lemmatization, and sentiment extraction.',
      icon: Eye,
      tools: ['YOLOv5', 'NLTK', 'OpenCV', 'TF-IDF', 'Computer Vision'],
    },
    {
      code: 'PILLAR_04',
      title: 'Pipeline Engineering & API Serving',
      description:
        'Containerizing and deploying machine learning artifacts into production microservices with FastAPI and Flask, backed by relational (MySQL) and document (MongoDB) databases.',
      icon: Server,
      tools: ['FastAPI', 'Flask', 'MySQL', 'MongoDB', 'Git / CI'],
    },
  ];

  return (
    <section id="about" className="py-24 border-t border-lab-border bg-lab-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs text-lab-accent tracking-widest">[01 // BACKGROUND & METHODOLOGY]</span>
            <div className="h-[1px] bg-lab-border flex-1 max-w-xs" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-lab-text-primary tracking-tight">
            About & Engineering Philosophy
          </h2>
        </div>

        {/* Narrative & Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7 space-y-5 text-lab-text-secondary leading-relaxed font-sans">
            <p className="text-lg text-lab-text-primary font-medium">
              {personalData.shortBio}
            </p>

            <p>
              My journey in data science is grounded in a rigorous quantitative physics background (B.Sc. Physics Honours),
              combining mathematical formulation with modern algorithmic computation. I have applied predictive intelligence
              across both dynamic municipal smart mobility at <strong>Trinity Mobility</strong> and enterprise consulting engagements at <strong>Rubixe</strong>.
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
                <span>SYSTEM_PROFILE</span>
              </span>
              <span className="font-mono text-[11px] text-lab-accent">VERIFIED DATA</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-lab-border/50">
                <span className="text-lab-text-muted">LOCATION</span>
                <span className="text-lab-text-primary">{personalData.location}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-lab-border/50">
                <span className="text-lab-text-muted">ACADEMIC FOUNDATION</span>
                <span className="text-lab-text-primary">B.Sc. Physics (Honours)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-lab-border/50">
                <span className="text-lab-text-muted">PROFESSIONAL ACCREDITATIONS</span>
                <span className="text-lab-text-primary">IABAC & NASSCOM Certified</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-lab-border/50">
                <span className="text-lab-text-muted">PRIMARY FOCUS</span>
                <span className="text-lab-text-primary">Predictive ML, CV & NLP</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-lab-text-muted">SERVING STACK</span>
                <span className="text-lab-text-primary">FastAPI • Flask • Docker/Pipelines</span>
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
            <span className="font-mono text-xs text-lab-text-muted">// CORE CAPABILITIES</span>
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
