'use client';

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-lab-accent text-lab-bg font-semibold hover:bg-emerald-400 border border-lab-accent/80 shadow-lab-glow',
  secondary:
    'bg-lab-elevated text-lab-text-primary hover:bg-lab-surface hover:text-lab-accent border border-lab-border hover:border-lab-accent/50',
  outline:
    'bg-lab-surface/80 text-lab-text-primary hover:text-lab-accent hover:border-lab-accent border border-lab-border hover:bg-lab-elevated',
  ghost:
    'bg-transparent text-lab-text-secondary hover:text-lab-accent hover:bg-lab-surface/50 border border-transparent',
  icon:
    'bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent border border-lab-border p-2',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1 text-[10px]',
  md: 'px-3.5 py-2 text-xs',
  lg: 'px-5 py-2.5 text-sm',
};

const baseStyles =
  'inline-flex items-center justify-center space-x-1.5 rounded font-mono font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lab-accent focus-visible:ring-offset-2 focus-visible:ring-offset-lab-bg disabled:opacity-50 disabled:cursor-not-allowed select-none';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isIconOnly = variant === 'icon';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${
          isIconOnly ? 'p-2' : sizeStyles[size]
        } ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isIconOnly = variant === 'icon';

    return (
      <a
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${
          isIconOnly ? 'p-2' : sizeStyles[size]
        } ${className}`}
        {...props}
      >
        {leftIcon}
        {children && <span>{children}</span>}
        {rightIcon}
      </a>
    );
  }
);

LinkButton.displayName = 'LinkButton';
