'use client';

import React from 'react';
import { experienceData } from '@/data/experience';
import { Briefcase, Calendar, MapPin, Globe, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-lab-border bg-lab-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs text-lab-accent tracking-widest">[02 // COMMERCIAL EXPERIENCE]</span>
            <div className="h-[1px] bg-lab-border flex-1 max-w-xs" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-lab-text-primary tracking-tight">
            Work Experience & Production Impact
          </h2>
          <p className="text-sm text-lab-text-muted font-mono max-w-2xl">
            Commercial data science track record driving predictive intelligence and data engineering systems.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {experienceData.map((item, index) => (
            <div
              key={item.id}
              className="relative rounded-lg border border-lab-border bg-lab-surface/70 p-6 sm:p-8 hover:border-lab-border-subtle transition-all duration-300"
            >
              {/* Active Badge if Current */}
              {item.isCurrent && (
                <div className="absolute top-0 right-8 -translate-y-1/2 inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-lab-accent text-lab-bg text-[10px] font-mono font-bold uppercase tracking-wider shadow-lab-glow">
                  <span className="w-1.5 h-1.5 rounded-full bg-lab-bg animate-pulse" />
                  <span>Current Engagement</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Meta Column */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-lab-text-muted">
                      [EXP_INDEX_0{index + 1}]
                    </span>
                    <h3 className="font-display font-bold text-2xl text-lab-text-primary">
                      {item.company}
                    </h3>
                    <p className="font-mono text-xs text-lab-accent font-medium">
                      {item.role}
                    </p>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs text-lab-text-muted pt-1">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-lab-text-secondary" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-lab-text-secondary" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-2.5 py-1 rounded bg-lab-elevated border border-lab-border text-[11px] font-mono text-lab-cyan">
                      {item.domain}
                    </span>
                  </div>

                  {/* Company Links */}
                  <div className="flex items-center space-x-2 pt-2">
                    {item.links.website && (
                      <a
                        href={item.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-mono border border-lab-border hover:border-lab-accent text-lab-text-secondary hover:text-lab-text-primary transition-colors bg-lab-surface"
                      >
                        <Globe className="w-3 h-3 text-lab-accent" />
                        <span>Website</span>
                        <ArrowUpRight className="w-2.5 h-2.5 text-lab-text-muted" />
                      </a>
                    )}
                    {item.links.linkedin && (
                      <a
                        href={item.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-mono border border-lab-border hover:border-lab-accent text-lab-text-secondary hover:text-lab-text-primary transition-colors bg-lab-surface"
                      >
                        <Linkedin className="w-3 h-3 text-lab-cyan" />
                        <span>LinkedIn</span>
                        <ArrowUpRight className="w-2.5 h-2.5 text-lab-text-muted" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content & Deliverables Column */}
                <div className="lg:col-span-8 space-y-5 lg:pl-6 lg:border-l lg:border-lab-border/50">
                  <p className="text-sm text-lab-text-primary leading-relaxed font-sans">
                    {item.summary}
                  </p>

                  <div className="space-y-2.5">
                    <span className="font-mono text-[11px] text-lab-text-muted uppercase tracking-wider">
                      Key Deliverables & Responsibilities:
                    </span>
                    <ul className="space-y-2">
                      {item.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start space-x-3 text-xs sm:text-sm text-lab-text-secondary leading-relaxed">
                          <span className="text-lab-accent font-mono text-xs mt-0.5">▹</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-3 border-t border-lab-border/40">
                    <span className="font-mono text-[10px] text-lab-text-muted block mb-2">
                      TECHNOLOGIES_UTILIZED:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs px-2.5 py-0.5 rounded bg-lab-elevated border border-lab-border text-lab-text-secondary"
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
