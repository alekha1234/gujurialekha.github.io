/**
 * Centralized Design Tokens for Alekha Gujuri Portfolio
 * Single Source of Truth for Visual Consistency & WCAG 2.1 AA Compliance
 */

export const tokens = {
  colors: {
    bg: {
      canvas: '#080C14',
      surface: '#0E1726',
      elevated: '#162032',
      overlay: 'rgba(8, 12, 20, 0.85)',
    },
    border: {
      subtle: '#1E293B',
      default: '#293548',
      hover: '#3D4D66',
      accent: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.3)',
      cyan: '#06B6D4',
    },
    text: {
      primary: '#F8FAFC',    // 16.5:1 contrast against canvas (AAA)
      secondary: '#CBD5E1',  // 10.8:1 contrast against canvas (AAA)
      muted: '#94A3B8',      // 6.2:1 contrast against canvas (AA compliant, >4.5:1)
      accent: '#10B981',     // 6.8:1 contrast against canvas
      cyan: '#06B6D4',       // 6.4:1 contrast against canvas
      amber: '#F59E0B',      // 7.1:1 contrast against canvas
      danger: '#EF4444',
    },
    accent: {
      emerald: '#10B981',
      emeraldHover: '#34D399',
      cyan: '#06B6D4',
      cyanHover: '#22D3EE',
      amber: '#F59E0B',
      danger: '#EF4444',
      glow: 'rgba(16, 185, 129, 0.15)',
    },
  },
  typography: {
    fonts: {
      sans: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'var(--font-space-grotesk), sans-serif',
      mono: 'var(--font-jetbrains-mono), SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    scale: {
      micro: '0.625rem',   // 10px
      caption: '0.75rem',  // 12px
      bodySm: '0.875rem',  // 14px
      body: '1rem',        // 16px
      h4: '1.125rem',      // 18px
      h3: '1.25rem',       // 20px
      h2: '1.5rem',        // 24px
      h1: '2.25rem',       // 36px
      hero: '3rem',        // 48px
    },
  },
  spacing: {
    sectionPaddingY: 'py-12 sm:py-16',
    containerMaxWidth: 'max-w-7xl',
    cardPadding: 'p-4 sm:p-5',
  },
  radii: {
    sm: '0.25rem',    // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    full: '9999px',
  },
  accessibility: {
    minTouchTarget: 'min-h-[44px] min-w-[44px]',
    focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lab-accent focus-visible:ring-offset-2 focus-visible:ring-offset-lab-bg',
  },
} as const;

export type DesignTokens = typeof tokens;
