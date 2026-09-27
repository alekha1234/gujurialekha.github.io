'use client';

import React from 'react';
import { educationData, certificationsData } from '@/data/education';
import { GraduationCap, Award, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 border-t border-lab-border bg-lab-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Education Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-lab-accent tracking-widest">[05 // ACADEMIC FOUNDATION]</span>
                <div className="h-[1px] bg-lab-border flex-1 max-w-xs" />
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-lab-text-primary tracking-tight flex items-center space-x-2">
                <GraduationCap className="w-6 h-6 text-lab-accent" />
                <span>Education</span>
              </h3>
            </div>

            <div className="space-y-6">
              {educationData.map((edu, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-lab-border bg-lab-surface/80 p-6 space-y-3 hover:border-lab-border-subtle transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-display font-bold text-lg text-lab-text-primary">
                        {edu.degree}
                      </h4>
                      <p className="font-mono text-xs text-lab-accent font-medium mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-lab-text-muted px-2 py-0.5 rounded bg-lab-elevated border border-lab-border">
                      {edu.period}
                    </span>
                  </div>

                  {edu.field && (
                    <p className="font-mono text-xs text-lab-cyan">
                      Specialization: {edu.field}
                    </p>
                  )}

                  {edu.details && (
                    <p className="text-xs text-lab-text-secondary leading-relaxed font-sans pt-1">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-lab-cyan tracking-widest">[CREDENTIALS // INDUSTRY ACCREDITATIONS]</span>
                <div className="h-[1px] bg-lab-border flex-1 max-w-xs" />
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-lab-text-primary tracking-tight flex items-center space-x-2">
                <Award className="w-6 h-6 text-lab-cyan" />
                <span>Certifications</span>
              </h3>
            </div>

            <div className="space-y-4">
              {certificationsData.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  className="rounded-lg border border-lab-border bg-lab-surface/80 p-5 space-y-2 hover:border-lab-cyan/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <ShieldCheck className="w-4 h-4 text-lab-cyan shrink-0" />
                      <h4 className="font-display font-bold text-base text-lab-text-primary">
                        {cert.title}
                      </h4>
                    </div>
                    <span className="font-mono text-[11px] text-lab-text-muted">
                      {cert.date}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-lab-text-secondary pl-6">
                    Issued by: <span className="text-lab-text-primary">{cert.issuer}</span>
                  </p>

                  {cert.accreditationBody && (
                    <div className="pl-6 pt-1">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-lab-elevated text-lab-text-muted border border-lab-border">
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
