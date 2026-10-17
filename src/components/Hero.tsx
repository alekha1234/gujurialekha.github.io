import React from 'react';
import { personalData } from '@/data/personal';
import { getAssetPath } from '@/utils/assets';
import { ArrowRight, FileText, Github, Linkedin, FlaskConical } from 'lucide-react';

const social = (label: string) => personalData.socials.find((s) => s.label === label)!;

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative z-10 min-h-screen flex items-center pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12">
        {/* On tablets the robot sits in this gap above the text (phones get no 3D scene) */}
        <div className="hidden md:block lg:hidden h-[30vh]" aria-hidden="true" />
        <div className="lg:col-span-7 xl:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-lab-green animate-ping opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-lab-green" />
            </span>
            <span className="font-mono text-[11px] text-lab-text-secondary uppercase tracking-wider">
              {personalData.status}
            </span>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-xs text-lab-cyan tracking-[0.3em]">AI RESEARCH LAB // ONLINE</p>
            <h1 id="hero-heading" className="font-display font-bold tracking-tight leading-[1.02]">
              <span className="block text-4xl sm:text-6xl xl:text-7xl text-lab-text-primary">I&apos;M ALEKHA GUJURI</span>
              <span className="block mt-3 text-2xl sm:text-4xl xl:text-5xl text-gradient-lab">AI / ML ENGINEER</span>
              <span className="sr-only"> — {personalData.formalName}, {personalData.role} &amp; Machine Learning Engineer</span>
            </h1>
            <p className="font-mono text-xs sm:text-sm text-lab-text-secondary">
              {personalData.role} @ <span className="text-lab-text-primary">Trinity Mobility</span> · {personalData.location}
            </p>
          </div>

          <p className="text-base sm:text-lg text-lab-text-secondary leading-relaxed max-w-xl">{personalData.shortBio}</p>

          {/* Hidden on phones so the call-to-action buttons stay on the first screen; Skills covers these */}
          <ul className="hidden sm:flex flex-wrap gap-2" aria-label="Focus areas">
            {personalData.subRoles.map((r) => (
              <li key={r} className="font-mono text-xs px-2.5 py-1 rounded-full border border-lab-accent/25 bg-lab-accent/5 text-blue-200">
                {r}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-md bg-blue-600 text-white font-mono text-xs font-semibold tracking-wider shadow-lab-glow hover:bg-blue-500 transition-colors focus-ring"
            >
              View projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md glass font-mono text-xs font-semibold tracking-wider text-lab-text-primary hover:glass-glow transition-shadow focus-ring"
            >
              Contact me
            </a>
            <a
              href="#ai-lab"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-lab-cyan/40 font-mono text-xs font-semibold tracking-wider text-lab-cyan hover:bg-lab-cyan/10 transition-colors focus-ring"
            >
              <FlaskConical className="w-4 h-4" aria-hidden="true" />
              Explore my AI lab
            </a>
          </div>

          <div className="flex items-center gap-4 pt-1 font-mono text-xs text-lab-text-muted">
            <a href={social('GitHub').url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-lab-text-primary transition-colors focus-ring rounded" aria-label="GitHub profile (opens in new tab)">
              <Github className="w-4 h-4" aria-hidden="true" /> GitHub
            </a>
            <a href={social('LinkedIn').url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-lab-text-primary transition-colors focus-ring rounded" aria-label="LinkedIn profile (opens in new tab)">
              <Linkedin className="w-4 h-4" aria-hidden="true" /> LinkedIn
            </a>
            <a href={getAssetPath(personalData.resume.viewUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-lab-text-primary transition-colors focus-ring rounded" aria-label="Resume PDF (opens in new tab)">
              <FileText className="w-4 h-4" aria-hidden="true" /> Resume
            </a>
          </div>
        </div>
      </div>

      <a href="#about" className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-lab-text-muted hover:text-lab-text-secondary focus-ring rounded">
        SCROLL TO ENTER
        <span className="w-px h-10 bg-gradient-to-b from-lab-cyan to-transparent" aria-hidden="true" />
      </a>
    </section>
  );
}
