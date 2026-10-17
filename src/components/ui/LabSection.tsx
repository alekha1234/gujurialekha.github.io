import React from 'react';

interface LabSectionProps {
  id: string;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}

// Compact full-width section: content sizes the section, no forced screen height.
export function LabSection({ id, labelledBy, className = '', children }: LabSectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative z-10 py-16 scroll-mt-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">{children}</div>
    </section>
  );
}

export function LabTag({ children, color = 'text-lab-cyan' }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className={`font-mono text-xs tracking-[0.2em] uppercase ${color}`}>{children}</span>
      <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-lab-accent/60 to-transparent" aria-hidden="true" />
    </div>
  );
}
