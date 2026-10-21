import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

// Static export writes this to out/404.html, which GitHub Pages serves for any unknown URL.
// robots overrides the layout's "index, follow" (Next also adds its own noindex here)
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main-content" className="relative min-h-screen flex items-center justify-center px-4">
      <div aria-hidden="true" className="fixed inset-0 z-0 lab-backdrop pointer-events-none" />
      <div className="relative z-10 glass rounded-xl p-8 max-w-md w-full text-center space-y-4">
        <p className="font-mono text-xs tracking-[0.3em] text-lab-cyan">ERROR 404</p>
        <h1 className="font-display font-bold text-3xl tracking-tight">Page not found</h1>
        <p className="text-sm text-lab-text-secondary">
          This page doesn&apos;t exist or has moved. Head back to the portfolio or read the blog.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 text-white font-mono text-xs font-semibold tracking-wider hover:bg-blue-500 transition-colors focus-ring"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to portfolio
          </a>
          <a
            href="https://gujurialekha.github.io/blog/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md glass font-mono text-xs font-semibold tracking-wider text-lab-text-primary hover:glass-glow transition-shadow focus-ring"
          >
            Read the blog
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </main>
  );
}
