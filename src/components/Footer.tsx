'use client';

import React, { useState, useEffect } from 'react';
import { personalData } from '@/data/personal';
import { ArrowUp, Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer role="contentinfo" className="border-t border-lab-border bg-lab-bg py-12 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-lab-border/50">
          {/* Identity */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="font-display font-bold text-sm text-lab-text-primary">
                ALEKHA GUJURI
              </span>
              <span className="text-lab-accent text-[11px] font-semibold">// DATA_SCIENTIST</span>
            </div>
            <p className="text-[11px] text-lab-text-muted">
              Bengaluru, Karnataka, India • Open for Applied AI & Data Science
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/alekha1234"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lab-text-secondary hover:text-lab-accent transition-colors focus-ring rounded p-1"
              aria-label="View Alekha Gujuri GitHub Profile (opens in new tab)"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/gujuri-alekha/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lab-text-secondary hover:text-lab-cyan transition-colors focus-ring rounded p-1"
              aria-label="Connect with Alekha Gujuri on LinkedIn (opens in new tab)"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="https://www.kaggle.com/gujurialekha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lab-text-secondary hover:text-lab-accent transition-colors font-bold focus-ring rounded p-1"
              aria-label="View Alekha Gujuri Kaggle Competitions (opens in new tab)"
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

        {/* Bottom Metadata & Telemetry */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-lab-text-muted gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lab-accent" />
            <span>UTC_CLOCK: {utcTime || 'SYNCHRONIZING...'}</span>
          </div>

          <div>
            Licensed under Apache-2.0 • © {new Date().getFullYear()} Alekha Gujuri.
          </div>
        </div>
      </div>
    </footer>
  );
}
