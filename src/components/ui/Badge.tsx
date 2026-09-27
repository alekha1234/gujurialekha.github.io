'use client';

import React from 'react';

export type BadgeVariant = 'accent' | 'cyan' | 'amber' | 'muted' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  accent: 'bg-lab-accent/10 border-lab-accent/40 text-lab-accent',
  cyan: 'bg-lab-cyan/10 border-lab-cyan/40 text-lab-cyan',
  amber: 'bg-lab-amber/10 border-lab-amber/40 text-lab-amber',
  muted: 'bg-lab-elevated border-lab-border text-lab-text-muted',
  outline: 'bg-transparent border-lab-border text-lab-text-secondary',
};

export function Badge({
  variant = 'muted',
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center space-x-1 font-mono text-[9px] px-2 py-0.5 rounded border uppercase tracking-wider ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
