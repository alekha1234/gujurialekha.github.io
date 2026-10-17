import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lab: {
          bg: '#05070D',
          surface: '#0B1120',
          elevated: '#111A2E',
          border: '#1E293B',
          'border-subtle': '#334155',
          accent: '#3B82F6',
          cyan: '#22D3EE',
          violet: '#8B5CF6',
          green: '#34D399',
          amber: '#F59E0B',
          text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
            muted: '#7C8BA1', // 4.5:1+ on every lab surface (WCAG AA)
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'lab-glow': '0 0 25px -5px rgba(59, 130, 246, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
