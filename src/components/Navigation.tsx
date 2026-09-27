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
    { label: 'Experience', href: '#experience' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Skip to Main Content Link (WCAG 2.1 AA) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-lab-bg/90 backdrop-blur-md border-b border-lab-border py-3 shadow-lg shadow-black/40'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Identity & System Telemetry */}
            <Link
              href="#top"
              className="group flex items-center space-x-3 rounded focus-ring p-1"
              aria-label="Alekha Gujuri Home"
            >
              <div className="w-8 h-8 rounded border border-lab-border bg-lab-surface flex items-center justify-center text-lab-accent font-mono text-xs font-bold transition-colors group-hover:border-lab-accent group-hover:shadow-lab-glow">
                AG
              </div>
              <span className="font-display font-bold text-sm tracking-tight text-lab-text-primary group-hover:text-lab-accent transition-colors">
                ALEKHA GUJURI
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-mono text-xs text-lab-text-secondary hover:text-lab-accent transition-colors tracking-wide rounded focus-ring px-1 py-0.5"
                >
                  {link.label}
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

              <a
                href="#contact"
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded text-xs font-mono bg-lab-accent text-lab-bg font-semibold hover:bg-emerald-400 transition-colors shadow-lab-glow focus-ring"
              >
                <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Initiate Contact</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded border border-lab-border text-lab-text-secondary hover:text-lab-text-primary hover:bg-lab-surface transition-colors focus-ring"
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
            className="md:hidden bg-lab-bg/95 backdrop-blur-xl border-b border-lab-border px-4 pt-3 pb-6 space-y-3"
          >
            <nav className="flex flex-col space-y-2 pt-2 border-t border-lab-border/50" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-sm text-lab-text-secondary hover:text-lab-accent py-2 transition-colors flex items-center justify-between rounded focus-ring px-2"
                >
                  <span>{link.label}</span>
                  <span className="text-lab-text-muted text-xs" aria-hidden="true">→</span>
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
