'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { personalData } from '@/data/personal';
import { getAssetPath } from '@/utils/assets';
import { FileText, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'AI Lab', href: '#ai-lab' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Blogs', href: personalData.socials.find((s) => s.label === 'Technical Blog')!.url, external: true },
    { label: 'Contact', href: '#contact' },
  ];
  const ext = { target: '_blank', rel: 'noopener noreferrer' };

  return (
    <>
      {/* Skip to Main Content Link (WCAG 2.1 AA) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 transition-all duration-300 ${isScrolled ? 'pt-2' : 'pt-4'}`}
      >
        <div
          className={`max-w-6xl mx-auto rounded-xl px-3 sm:px-4 transition-all duration-300 ${
            isScrolled ? 'glass border-lab-accent/25 py-2 shadow-[0_0_24px_-10px_rgba(59,130,246,0.6)]' : 'py-3 border border-transparent'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Identity & System Telemetry */}
            <Link
              href="#top"
              className="group flex items-center space-x-3 rounded focus-ring p-1"
            >
              <div aria-hidden="true" className="w-8 h-8 rounded border border-lab-border bg-lab-surface flex items-center justify-center text-lab-accent font-mono text-xs font-bold transition-colors group-hover:border-lab-accent group-hover:shadow-lab-glow">
                AG
              </div>
              <span className="font-display font-bold text-sm tracking-tight text-lab-text-primary group-hover:text-lab-accent transition-colors">
                ALEKHA <span className="text-lab-cyan">G</span>
              </span>
              <span className="sr-only">home</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-3 xl:space-x-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external && ext)}
                  className="inline-flex items-center gap-1 whitespace-nowrap font-mono text-[11px] uppercase text-lab-text-secondary hover:text-white transition-colors tracking-[0.18em] rounded focus-ring px-1 py-0.5"
                >
                  {link.label}
                  {link.external && <ArrowUpRight className="w-3 h-3" aria-label="(opens in new tab)" />}
                </a>
              ))}
            </nav>

            {/* Action CTAs */}
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href={getAssetPath(personalData.resume.viewUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono border border-lab-border hover:border-lab-accent text-lab-text-primary hover:text-lab-accent transition-all duration-200 bg-lab-surface/80 hover:bg-lab-elevated focus-ring"
                aria-label="View Resume PDF (opens in new tab)"
              >
                <FileText className="w-3.5 h-3.5 text-lab-accent" aria-hidden="true" />
                <span>Resume</span>
                <ArrowUpRight className="w-3 h-3 text-lab-text-muted" aria-hidden="true" />
              </a>

            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded border border-lab-border text-lab-text-secondary hover:text-lab-text-primary hover:bg-lab-surface transition-colors focus-ring"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden glass max-w-6xl mx-auto mt-2 rounded-xl px-4 pt-3 pb-6 space-y-3"
          >
            <nav className="flex flex-col space-y-2 pt-2 border-t border-lab-border/50" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external && ext)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-sm text-lab-text-secondary hover:text-lab-accent py-2 transition-colors flex items-center justify-between rounded focus-ring px-2"
                >
                  <span>{link.label}</span>
                  {link.external ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-lab-text-muted" aria-label="(opens in new tab)" />
                  ) : (
                    <span className="text-lab-text-muted text-xs" aria-hidden="true">→</span>
                  )}
                </a>
              ))}
            </nav>
            <div className="pt-3 flex flex-col space-y-2">
              <a
                href={getAssetPath(personalData.resume.viewUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-2.5 rounded font-mono text-xs border border-lab-border bg-lab-surface text-lab-text-primary focus-ring"
                aria-label="View Full Resume PDF (opens in new tab)"
              >
                <FileText className="w-4 h-4 text-lab-accent" aria-hidden="true" />
                <span>View Full Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 w-full py-2.5 rounded font-mono text-xs bg-lab-accent text-lab-bg font-semibold focus-ring"
              >
                <Terminal className="w-4 h-4" aria-hidden="true" />
                <span>Initiate Contact</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
