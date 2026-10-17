import React from 'react';

interface LabSectionProps {
  id: string;
  labelledBy?: string;
  // Which half of the screen the content occupies; the 3D station shows on the other half.
  side?: 'left' | 'right' | 'full';
  className?: string;
  children: React.ReactNode;
}

export function LabSection({ id, labelledBy, side = 'left', className = '', children }: LabSectionProps) {
  const col =
    side === 'full'
      ? 'lg:col-span-12'
      : side === 'left'
        ? 'lg:col-span-6 xl:col-span-5'
        : 'lg:col-span-6 xl:col-span-5 lg:col-start-7 xl:col-start-8';
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative z-10 min-h-screen flex items-center py-24 scroll-mt-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className={col}>{children}</div>
      </div>
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
