'use client';

import React from 'react';
import { educationData, certificationsData } from '@/data/education';
import { GraduationCap, Award, ShieldCheck } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="py-16 border-t border-lab-border bg-lab-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-1.5 mb-8">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] text-lab-accent tracking-widest">[05 // QUALIFICATIONS & CREDENTIALS]</span>
            <div className="h-[1px] bg-lab-border flex-1 max-w-xs" aria-hidden="true" />
          </div>
          <h2 id="education-heading" className="font-display font-bold text-2xl sm:text-3xl text-lab-text-primary tracking-tight">
            Education & Professional Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Education Column */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-display font-bold text-lg sm:text-xl text-lab-text-primary tracking-tight flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-lab-accent" aria-hidden="true" />
              <span>Education</span>
            </h3>

            <div className="space-y-3">
              {educationData.map((edu, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-lab-border bg-lab-surface/80 p-4 space-y-2 hover:border-lab-border-subtle transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-display font-bold text-sm text-lab-text-primary">
                        {edu.degree}
                      </h4>
                      <p className="font-mono text-[10px] text-lab-accent font-medium mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-lab-text-muted px-1.5 py-0.5 rounded bg-lab-elevated border border-lab-border shrink-0">
                      {edu.period}
                    </span>
                  </div>

                  {edu.field && (
                    <p className="font-mono text-[10px] text-lab-cyan">
                      {edu.field}
                    </p>
                  )}

                  {edu.details && (
                    <p className="text-[11px] text-lab-text-secondary leading-relaxed font-sans">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-[10px] text-lab-cyan tracking-widest">[CREDENTIALS // INDUSTRY]</span>
                <div className="h-[1px] bg-lab-border flex-1 max-w-xs" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-lab-text-primary tracking-tight flex items-center space-x-2">
                <Award className="w-4 h-4 text-lab-cyan" />
                <span>Certifications</span>
              </h3>
            </div>

            <div className="space-y-3">
              {certificationsData.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  className="rounded-lg border border-lab-border bg-lab-surface/80 p-4 space-y-1.5 hover:border-lab-cyan/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-lab-cyan shrink-0" />
                      <h4 className="font-display font-bold text-sm text-lab-text-primary">
                        {cert.title}
                      </h4>
                    </div>
                    <span className="font-mono text-[10px] text-lab-text-muted shrink-0">
                      {cert.date}
                    </span>
                  </div>

                  <p className="font-mono text-[10px] text-lab-text-secondary pl-5">
                    Issued by: <span className="text-lab-text-primary">{cert.issuer}</span>
                  </p>

                  {cert.accreditationBody && (
                    <div className="pl-5 pt-0.5">
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-lab-elevated text-lab-text-muted border border-lab-border">
                        {cert.accreditationBody}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
