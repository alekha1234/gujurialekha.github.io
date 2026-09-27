'use client';

import React from 'react';

export interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  tagColor?: 'accent' | 'cyan' | 'amber';
}

export function SectionHeader({
  tag,
  title,
  description,
  action,
  className = '',
  tagColor = 'accent',
}: SectionHeaderProps) {
  const colorMap = {
    accent: 'text-lab-accent',
    cyan: 'text-lab-cyan',
    amber: 'text-lab-amber',
  };

  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 ${className}`}>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-2">
          <span className={`font-mono text-[10px] tracking-widest uppercase ${colorMap[tagColor]}`}>
            {tag}
          </span>
          <div className="h-[1px] bg-lab-border flex-1 max-w-xs" aria-hidden="true" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-lab-text-primary tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-lab-text-muted font-mono max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex items-center space-x-2 self-start md:self-auto shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
