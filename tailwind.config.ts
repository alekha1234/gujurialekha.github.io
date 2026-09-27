import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lab: {
          bg: '#080C14',
          surface: '#0E1726',
          elevated: '#162032',
          border: '#1E293B',
          'border-subtle': '#334155',
          accent: '#10B981',
          'accent-glow': 'rgba(16, 185, 129, 0.15)',
          cyan: '#06B6D4',
          amber: '#F59E0B',
          text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
            muted: '#64748B',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
      },
      boxShadow: {
        'lab-glow': '0 0 25px -5px rgba(16, 185, 129, 0.2)',
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
