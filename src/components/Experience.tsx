'use client';

import React from 'react';
import { experienceData } from '@/data/experience';
import { Calendar, MapPin, Globe, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-16 border-t border-lab-border bg-lab-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-1.5 mb-10">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] text-lab-accent tracking-widest">[02 // COMMERCIAL EXPERIENCE]</span>
            <div className="h-[1px] bg-lab-border flex-1 max-w-xs" aria-hidden="true" />
          </div>
          <h2 id="experience-heading" className="font-display font-bold text-2xl sm:text-3xl text-lab-text-primary tracking-tight">
            Work Experience & Production Impact
          </h2>
          <p className="text-[11px] text-lab-text-muted font-mono max-w-2xl">
            Commercial data science track record driving predictive intelligence and data engineering systems.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experienceData.map((item, index) => (
            <div
              key={item.id}
              className="relative rounded-lg border border-lab-border bg-lab-surface/70 p-5 sm:p-6 hover:border-lab-border-subtle transition-all duration-300"
            >
              {/* Active Badge */}
              {item.isCurrent && (
                <div className="absolute top-0 right-6 -translate-y-1/2 inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-lab-accent text-lab-bg text-[9px] font-mono font-bold uppercase tracking-wider shadow-lab-glow">
                  <span className="w-1 h-1 rounded-full bg-lab-bg animate-pulse" aria-hidden="true" />
                  <span>Current</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Meta Column */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[9px] text-lab-text-muted">
                      [EXP_0{index + 1}]
                    </span>
                    <h3 className="font-display font-bold text-xl text-lab-text-primary">
                      {item.company}
                    </h3>
                    <p className="font-mono text-[11px] text-lab-accent font-medium">
                      {item.role}
                    </p>
                  </div>

                  <div className="space-y-1 font-mono text-[10px] text-lab-text-muted">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3 h-3 text-lab-text-secondary" aria-hidden="true" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3 h-3 text-lab-text-secondary" aria-hidden="true" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <span className="inline-block px-2 py-0.5 rounded bg-lab-elevated border border-lab-border text-[10px] font-mono text-lab-cyan">
                    {item.domain}
                  </span>

                  {/* Company Links */}
                  <div className="flex items-center space-x-1.5 pt-1">
                    {item.links.website && (
                      <a
                        href={item.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono border border-lab-border hover:border-lab-accent text-lab-text-secondary hover:text-lab-text-primary transition-colors bg-lab-surface focus-ring"
                        aria-label={`Visit ${item.company} website (opens in new tab)`}
                      >
                        <Globe className="w-2.5 h-2.5 text-lab-accent" aria-hidden="true" />
                        <span>Website</span>
                        <ArrowUpRight className="w-2 h-2 text-lab-text-muted" aria-hidden="true" />
                      </a>
                    )}
                    {item.links.linkedin && (
                      <a
                        href={item.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono border border-lab-border hover:border-lab-accent text-lab-text-secondary hover:text-lab-text-primary transition-colors bg-lab-surface focus-ring"
                        aria-label={`View ${item.company} on LinkedIn (opens in new tab)`}
                      >
                        <Linkedin className="w-2.5 h-2.5 text-lab-cyan" aria-hidden="true" />
                        <span>LinkedIn</span>
                        <ArrowUpRight className="w-2 h-2 text-lab-text-muted" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-8 space-y-3 lg:pl-4 lg:border-l lg:border-lab-border/50">
                  <p className="text-xs text-lab-text-primary leading-relaxed font-sans">
                    {item.summary}
                  </p>

                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-lab-text-muted uppercase tracking-wider">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-1.5">
                      {item.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start space-x-2 text-[11px] text-lab-text-secondary leading-relaxed">
                          <span className="text-lab-accent font-mono text-[10px] mt-0.5">▹</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="pt-2 border-t border-lab-border/40">
                    <span className="font-mono text-[9px] text-lab-text-muted block mb-1.5">
                      TECHNOLOGIES:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-lab-elevated border border-lab-border text-lab-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
