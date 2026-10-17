'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
}

// Primary, large. Add variants when a second call site needs one.
export function Button({ isLoading = false, leftIcon, className = '', children, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center space-x-1.5 rounded font-mono font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lab-accent focus-visible:ring-offset-2 focus-visible:ring-offset-lab-bg disabled:opacity-50 disabled:cursor-not-allowed select-none bg-lab-accent text-lab-bg font-semibold hover:bg-blue-400 border border-lab-accent/80 shadow-lab-glow px-5 py-2.5 text-sm ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      {children && <span>{children}</span>}
    </button>
  );
}
