'use client';

import React from 'react';
import { skillsData } from '@/data/skills';
import { CheckCircle2, Cpu, Wrench } from 'lucide-react';

export default function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-lab-border bg-lab-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs text-lab-accent tracking-widest">[04 // TECHNICAL TELEMETRY]</span>
            <div className="h-[1px] bg-lab-border flex-1 max-w-xs" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-lab-text-primary tracking-tight">
            Technical Competencies & Tooling Matrix
          </h2>
          <p className="text-sm text-lab-text-muted font-mono max-w-2xl">
            Grouped by machine learning lifecycle domain: statistical modeling, neural vision, NLP, and serving infrastructure.
          </p>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.code}
              className="rounded-lg border border-lab-border bg-lab-surface/70 p-6 flex flex-col justify-between hover:border-lab-border-subtle transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-lab-border pb-3">
                  <span className="font-mono text-[10px] text-lab-accent">
                    {category.code}
                  </span>
                  <Cpu className="w-4 h-4 text-lab-text-muted" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-lab-text-primary">
                    {category.title}
                  </h3>
                  <p className="text-xs text-lab-text-muted font-sans">
                    {category.description}
                  </p>
                </div>

                {/* Skills Badges */}
                <div className="space-y-2 pt-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2 rounded bg-lab-elevated/50 border border-lab-border/60 hover:border-lab-border transition-colors text-xs font-mono"
                    >
                      <span className={`flex items-center space-x-2 ${skill.highlight ? 'text-lab-text-primary font-medium' : 'text-lab-text-secondary'}`}>
                        {skill.highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-lab-accent inline-block" />
                        )}
                        <span>{skill.name}</span>
                      </span>
                      <span className="text-[10px] text-lab-text-muted px-1.5 py-0.5 rounded bg-lab-surface">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
