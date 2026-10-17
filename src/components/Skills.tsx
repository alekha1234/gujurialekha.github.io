'use client';

import React from 'react';
import { skillsData } from '@/data/skills';
import { LabSection, LabTag } from '@/components/ui';

// 5 areas on a 6-column grid: 3 cards in the first row, 2 wider ones in the second, so no empty slot.
const span = (i: number) => (i < 3 ? 'lg:col-span-2' : 'lg:col-span-3');

export default function Skills() {
  return (
    <LabSection id="skills" labelledBy="skills-heading">
      <LabTag>02 // Neural core</LabTag>
      <h2 id="skills-heading" className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-3">
        Technical skills
      </h2>
      <p className="text-sm text-lab-text-secondary mb-6">
        Grouped by area. Brighter chips are the tools I use most in production.
      </p>

      <div className="rail grid gap-4 sm:grid-cols-2 lg:grid-cols-6 focus-ring" tabIndex={0} aria-label="Skill areas">
        {skillsData.map((cat, i) => (
          <article key={cat.code} className={`glass rounded-xl p-5 flex flex-col sm:max-lg:last:col-span-2 ${span(i)}`}>
            <span className="font-mono text-[11px] text-lab-accent">Area 0{i + 1}</span>
            <h3 className="font-display font-semibold text-base mt-1 mb-2">{cat.title}</h3>
            <p className="text-xs text-lab-text-secondary leading-relaxed">{cat.description}</p>
            <ul className="flex flex-wrap gap-1 mt-4">
              {cat.skills.map((s) => (
                <li
                  key={s.name}
                  className={`font-mono text-[11px] px-1.5 py-0.5 rounded bg-white/5 ${
                    s.highlight ? 'text-lab-text-primary' : 'text-lab-text-muted'
                  }`}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </LabSection>
  );
}
