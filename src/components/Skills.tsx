'use client';

import React from 'react';
import { skillsData } from '@/data/skills';
import { setLab, useLab } from '@/lib/labStore';
import { LabSection, LabTag } from '@/components/ui';

// Must match CATEGORY_COLORS in lab/stations/SkillCore.tsx so chips and 3D nodes read as one system.
const DOT = ['bg-lab-accent', 'bg-lab-cyan', 'bg-lab-violet', 'bg-lab-green', 'bg-blue-300'];

export default function Skills() {
  const active = useLab((s) => s.activeSkill);
  const activeCat = skillsData.find((c) => c.skills.some((s) => s.name === active));
  const activeSkill = activeCat?.skills.find((s) => s.name === active);

  const on = (name: string) => () => setLab({ activeSkill: name });
  const off = () => setLab({ activeSkill: null });

  return (
    <LabSection id="skills" labelledBy="skills-heading" side="left">
      <LabTag>02 // Neural core</LabTag>
      <h2 id="skills-heading" className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-3">
        Technical skills
      </h2>
      <p className="text-sm text-lab-text-secondary mb-6">
        Grouped by area. Brighter chips are the tools I use most in production.
      </p>

      <div className="space-y-5">
        {skillsData.map((cat, ci) => (
          <div key={cat.code}>
            <h3 className="flex items-center gap-2 font-mono text-xs tracking-wider text-lab-text-muted mb-2">
              <span className={`w-2 h-2 rounded-full ${DOT[ci]}`} aria-hidden="true" />
              {cat.title}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {cat.skills.map((s) => (
                <li key={s.name}>
                  <button
                    type="button"
                    onMouseEnter={on(s.name)}
                    onMouseLeave={off}
                    onFocus={on(s.name)}
                    onBlur={off}
                    className={`font-mono text-xs px-2.5 py-1 rounded-md border transition-all focus-ring ${
                      active === s.name
                        ? 'border-lab-accent bg-lab-accent/15 text-white shadow-lab-glow'
                        : s.highlight
                          ? 'border-white/10 bg-white/5 text-lab-text-primary hover:border-lab-accent/50'
                          : 'border-white/5 bg-transparent text-lab-text-secondary hover:border-lab-accent/40'
                    }`}
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="glass rounded-lg px-4 py-3 mt-6 min-h-[76px] font-mono text-xs" aria-live="polite">
        {activeSkill && activeCat ? (
          <>
            <p className="text-lab-text-primary text-sm font-semibold">{activeSkill.name}</p>
            <p className="text-lab-cyan mt-1">Level: {activeSkill.level}</p>
            <p className="text-lab-text-muted mt-0.5">
              {activeCat.code} · {activeCat.description}
            </p>
          </>
        ) : (
          <p className="text-lab-text-muted">Select a skill to see its level and area.</p>
        )}
      </div>
    </LabSection>
  );
}
