'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Tier } from './layout';

// three.js and the whole scene live in this lazy chunk; the page's HTML never waits on it.
const Scene = dynamic(() => import('./Scene'), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function pickTier(): Tier {
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 4;
  if (w < 1200 || cores <= 4) return 'mid';
  return 'high';
}

export default function LabBackground() {
  const [cfg, setCfg] = useState<{ tier: Tier; reduced: boolean } | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Phones get the static backdrop: the scene costs seconds of main-thread time on mobile CPUs.
    if (window.innerWidth < 768 || !hasWebGL() || new URLSearchParams(location.search).has('no3d')) return;
    const start = () =>
      document.fonts.ready.then(() =>
        setCfg({ tier: pickTier(), reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches })
      );
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    if (ric) ric(start, { timeout: 1500 });
    else setTimeout(start, 400);
  }, []);

  useEffect(() => {
    if (!cfg) return;
    const id = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(id);
  }, [cfg]);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 lab-backdrop pointer-events-none">
      {cfg && (
        <div className={`absolute inset-0 transition-opacity duration-[1400ms] ${shown ? 'opacity-100' : 'opacity-0'}`}>
          <Scene tier={cfg.tier} reduced={cfg.reduced} />
        </div>
      )}
      {/* Keeps text readable over the scene without hiding it */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_40%,rgba(5,7,13,0.55)_100%)]" />
    </div>
  );
}
