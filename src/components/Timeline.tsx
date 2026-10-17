"use client";

import React from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { milestones } from "@/lib/labContent";
import { LabSection, LabTag } from "@/components/ui";

// milestones is sorted oldest first; both cards read newest first.
const newest = [...milestones].reverse();
const work = newest.filter((m) => m.kind === "work");
const learning = [
  ...newest.filter((m) => m.kind === "education"),
  ...newest.filter((m) => m.kind === "cert"),
];

export default function Timeline() {
  return (
    <LabSection id="experience" labelledBy="journey-heading">
      <LabTag>08 // Data path</LabTag>
      <h2
        id="journey-heading"
        className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-3"
      >
        Experience &amp; education
      </h2>
      <p className="text-sm text-lab-text-secondary mb-6">Most recent first.</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="glass rounded-xl p-5 sm:p-6">
          <h3 className="font-mono text-[11px] tracking-widest text-blue-300 mb-4">
            EXPERIENCE
          </h3>
          <ol className="space-y-6">
            {work.map((m) => (
              <li key={m.id} className="relative pl-4 border-l border-lab-accent/40 space-y-2">
                <span
                  className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-lab-accent"
                  aria-hidden="true"
                />
                <div>
                  <h4 className="font-display font-semibold text-lg leading-snug">{m.title}</h4>
                  <p className="text-sm text-lab-text-secondary flex flex-wrap items-center gap-x-3">
                    {m.link ? (
                      <a
                        href={m.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-lab-text-primary hover:text-lab-cyan focus-ring rounded"
                      >
                        {m.org}
                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                        <span className="sr-only"> website (opens in new tab)</span>
                      </a>
                    ) : (
                      <span className="text-lab-text-primary">{m.org}</span>
                    )}
                    {m.location && (
                      <span className="inline-flex items-center gap-1 text-xs">
                        <MapPin className="w-3 h-3" aria-hidden="true" />
                        {m.location}
                      </span>
                    )}
                  </p>
                  <p className="font-mono text-xs text-lab-text-muted mt-1">{m.period}</p>
                </div>
                {m.summary && (
                  <p className="text-sm text-lab-text-secondary leading-relaxed line-clamp-3 sm:line-clamp-none">{m.summary}</p>
                )}
                {m.highlights.length > 0 && (
                  <details>
                    <summary className="cursor-pointer font-mono text-xs text-lab-cyan hover:text-white focus-ring rounded w-fit">
                      Key work &amp; stack ({m.highlights.length})
                    </summary>
                    <ul className="mt-2 space-y-2 text-xs text-lab-text-secondary leading-relaxed">
                      {m.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span
                            className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-lab-accent"
                            aria-hidden="true"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    {m.technologies.length > 0 && (
                      <ul className="flex flex-wrap gap-1 mt-3" aria-label="Technologies">
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
                  </details>
                  )}
              </li>
            ))}
          </ol>
        </article>

        <article className="glass rounded-xl p-5 sm:p-6">
          <h3 className="font-mono text-[11px] tracking-widest text-violet-300 mb-4">
            EDUCATION &amp; CERTIFICATIONS
          </h3>
          <ol className="space-y-4">
            {learning.map((m) => (
              <li key={m.id} className="relative pl-4 border-l border-white/10">
                <span
                  className={`absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full ${
                    m.kind === "cert" ? "bg-lab-green" : "bg-lab-violet"
                  }`}
                  aria-hidden="true"
                />
                <p className={`font-mono text-[11px] tracking-widest ${m.kind === "cert" ? "text-emerald-300" : "text-violet-300"}`}>
                  {m.kind === "cert" ? "CERTIFICATION" : "EDUCATION"}
                </p>
                <h4 className="font-semibold text-[15px] leading-snug">{m.title}</h4>
                <p className="text-xs text-lab-text-secondary">
                  <span className="text-lab-text-primary">{m.org}</span>
                  {" · "}
                  <span className="font-mono text-lab-text-muted">{m.period}</span>
                </p>
                {m.highlights.length > 0 && (
                  <p className="text-xs text-lab-text-muted mt-0.5">{m.highlights.join(" · ")}</p>
                )}
              </li>
            ))}
          </ol>
        </article>
      </div>
    </LabSection>
  );
}
