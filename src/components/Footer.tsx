'use client';

import React from 'react';
import { personalData } from '@/data/personal';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer role="contentinfo" className="relative z-10 border-t border-white/5 bg-lab-bg/70 backdrop-blur-md py-12 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-lab-border/50">
          {/* Identity */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="font-display font-bold text-sm text-lab-text-primary">
                GUJURI ALEKHA
              </span>
              <span className="text-lab-accent text-xs font-semibold">{personalData.headline}</span>
            </div>
            <p className="text-xs text-lab-text-muted">
              Bengaluru, Karnataka, India • Open for Applied AI & Data Science
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/gujurialekha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lab-text-secondary hover:text-lab-accent transition-colors focus-ring rounded p-1"
              aria-label="View Gujuri Alekha GitHub Profile (opens in new tab)"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/gujurialekha/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lab-text-secondary hover:text-lab-cyan transition-colors focus-ring rounded p-1"
              aria-label="Connect with Gujuri Alekha on LinkedIn (opens in new tab)"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="https://www.kaggle.com/gujurialekha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lab-text-secondary hover:text-lab-accent transition-colors font-bold focus-ring rounded p-1"
              aria-label="View Gujuri Alekha Kaggle Competitions (opens in new tab)"
            >
              K
            </a>
            <a
              href={`mailto:${personalData.contact.email}`}
              className="text-lab-text-secondary hover:text-lab-amber transition-colors focus-ring rounded p-1"
              aria-label={`Send Email to ${personalData.contact.email}`}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-all text-xs focus-ring"
            aria-label="Scroll back to top of page"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="pt-6 text-center text-xs text-lab-text-muted">
          <div>
            © {new Date().getFullYear()} Gujuri Alekha
          </div>
        </div>
      </div>
    </footer>
  );
}
