"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { milestones, MilestoneKind } from "@/lib/labContent";
import { setLab } from "@/lib/labStore";
import { LabSection, LabTag } from "@/components/ui";

const KIND: Record<
  MilestoneKind,
  { label: string; dot: string; text: string }
> = {
  work: { label: "EXPERIENCE", dot: "bg-lab-accent", text: "text-blue-300" },
  education: {
    label: "EDUCATION",
    dot: "bg-lab-violet",
    text: "text-violet-300",
  },
  cert: {
    label: "CERTIFICATION",
    dot: "bg-lab-green",
    text: "text-emerald-300",
  },
};

// Most recent role is selected by default so the panel is never empty.
const work = milestones.filter((m) => m.kind === "work");
const DEFAULT = work[work.length - 1].id;

export default function Timeline() {
  const [sel, setSel] = useState(DEFAULT);
  useEffect(() => setLab({ activeMilestone: sel }), [sel]);

  return (
    <LabSection id="experience" labelledBy="journey-heading" side="right">
      <LabTag>08 // Data path</LabTag>
      <h2
        id="journey-heading"
        className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-3"
      >
        Experience &amp; education
      </h2>
      <p className="text-sm text-lab-text-secondary mb-5">
        Each milestone, newest first. Select one to see the details.
      </p>

      <div
        role="tablist"
        aria-label="Career milestones"
        className="relative flex flex-wrap gap-1.5 mb-4"
      >
        {[...milestones].reverse().map((x) => (
          <button
            key={x.id}
            role="tab"
            id={`tab-${x.id}`}
            aria-selected={sel === x.id}
            aria-controls={`panel-${x.id}`}
            onClick={() => setSel(x.id)}
            className={`inline-flex items-center gap-1.5 font-mono text-[11px] px-2 py-1.5 rounded-md border transition-all focus-ring ${
              sel === x.id
                ? "border-lab-accent/60 bg-lab-accent/10 text-white"
                : "border-white/10 text-lab-text-secondary hover:border-white/25"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${KIND[x.kind].dot}`}
              aria-hidden="true"
            />
            {x.org
              .split(" (")[0]
              .replace("Lovely Professional University", "LPU")}
          </button>
        ))}
      </div>

      {/* Every panel is in the static HTML (search engines, no-JS); only the selected one is shown. */}
      {milestones.map((m) => {
        const k = KIND[m.kind];
        return (
          <div
            key={m.id}
            id={`panel-${m.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${m.id}`}
            hidden={sel !== m.id}
            className="glass holo-scan rounded-xl p-5 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`font-mono text-[11px] tracking-widest ${k.text}`}
              >
                {k.label}
              </span>
              <span className="font-mono text-xs text-lab-text-muted">
                {m.period}
              </span>
            </div>
            <div>
              <h3 className="font-display font-semibold text-xl">{m.title}</h3>
              <p className="text-sm text-lab-text-secondary flex flex-wrap items-center gap-x-3">
                <span className="text-lab-text-primary">{m.org}</span>
                {m.location && (
                  <span className="inline-flex items-center gap-1 text-xs">
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    {m.location}
                  </span>
                )}
              </p>
            </div>
            {m.summary && (
              <p className="text-sm text-lab-text-secondary leading-relaxed">
                {m.summary}
              </p>
            )}
            {m.highlights.length > 0 && (
              <ul className="space-y-2 text-xs text-lab-text-secondary leading-relaxed max-h-72 overflow-y-auto pr-1">
                {m.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span
                      className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${k.dot}`}
                      aria-hidden="true"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
            {m.technologies.length > 0 && (
              <ul
                className="flex flex-wrap gap-1 pt-1"
                aria-label="Technologies"
              >
                {m.technologies.map((t) => (
                  <li
                    key={t}
                    className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-white/5 text-lab-text-secondary"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
            {m.link && (
              <a
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-lab-cyan hover:text-white focus-ring rounded"
              >
                {m.org} website{" "}
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </a>
            )}
          </div>
        );
      })}
    </LabSection>
  );
}
