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
    { label: '01. About', href: '#about' },
    { label: '02. Experience', href: '#experience' },
    { label: '03. Case Studies', href: '#case-studies' },
    { label: '04. Skills', href: '#skills' },
    { label: '05. Education', href: '#education' },
    { label: '06. Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-lab-bg/90 backdrop-blur-md border-b border-lab-border py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Identity & System Telemetry */}
          <Link href="#top" className="group flex items-center space-x-3">
            <div className="w-8 h-8 rounded border border-lab-border bg-lab-surface flex items-center justify-center text-lab-accent font-mono text-xs font-bold transition-colors group-hover:border-lab-accent group-hover:shadow-lab-glow">
              AG
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-lab-text-primary group-hover:text-lab-accent transition-colors">
                ALEKHA GUJURI
              </span>
              <span className="font-mono text-[10px] text-lab-text-muted flex items-center space-x-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-lab-accent animate-pulse" />
                <span>DS_SYS // v2.5</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs text-lab-text-secondary hover:text-lab-accent transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={personalData.resume.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono border border-lab-border hover:border-lab-accent text-lab-text-primary hover:text-lab-accent transition-all duration-200 bg-lab-surface/80 hover:bg-lab-elevated"
            >
              <FileText className="w-3.5 h-3.5 text-lab-accent" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-lab-text-muted" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded text-xs font-mono bg-lab-accent text-lab-bg font-semibold hover:bg-emerald-400 transition-colors shadow-lab-glow"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Initiate Contact</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded border border-lab-border text-lab-text-secondary hover:text-lab-text-primary hover:bg-lab-surface transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-lab-bg/95 backdrop-blur-xl border-b border-lab-border px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 pt-2 border-t border-lab-border/50">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm text-lab-text-secondary hover:text-lab-accent py-2 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-lab-text-muted text-xs">→</span>
              </a>
            ))}
          </div>
          <div className="pt-3 flex flex-col space-y-2">
            <a
              href={personalData.resume.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded font-mono text-xs border border-lab-border bg-lab-surface text-lab-text-primary"
            >
              <FileText className="w-4 h-4 text-lab-accent" />
              <span>View Full Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded font-mono text-xs bg-lab-accent text-lab-bg font-semibold"
            >
              <Terminal className="w-4 h-4" />
              <span>Initiate Contact</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
