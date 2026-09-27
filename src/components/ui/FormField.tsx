'use client';

import React from 'react';

export interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  optionalLabel?: string;
  error?: string;
  helperText?: string;
  children: React.ReactElement;
  className?: string;
}

export function FormField({
  label,
  id,
  required = false,
  optionalLabel,
  error,
  helperText,
  children,
  className = '',
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const ariaDescribedBy = [
    error ? errorId : null,
    helperText ? helperId : null,
  ]
    .filter(Boolean)
    .join(' ');

  const clonedChild = React.cloneElement(children, {
    id,
    name: children.props.name || id,
    'aria-required': required ? 'true' : undefined,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': ariaDescribedBy || undefined,
    className: `${children.props.className || ''} ${
      error ? 'border-red-500 focus:border-red-500' : ''
    }`,
  });

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={id} className="font-mono text-xs text-lab-text-secondary block font-medium">
        {label}{' '}
        {required && <span className="text-lab-accent" aria-hidden="true">*</span>}
        {required && <span className="sr-only">(required)</span>}
        {optionalLabel && <span className="text-[10px] text-lab-text-muted font-normal">({optionalLabel})</span>}
      </label>

      {clonedChild}

      {error && (
        <p id={errorId} role="alert" className="font-mono text-[11px] text-red-400">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helperId} className="font-mono text-[10px] text-lab-text-muted">
          {helperText}
        </p>
      )}
    </div>
  );
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-2.5 rounded bg-lab-bg border border-lab-border text-sm font-mono text-lab-text-primary placeholder:text-lab-text-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lab-accent focus-visible:border-lab-accent ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full px-4 py-2.5 rounded bg-lab-bg border border-lab-border text-sm font-sans text-lab-text-primary placeholder:text-lab-text-muted/60 transition-colors resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lab-accent focus-visible:border-lab-accent ${className}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
