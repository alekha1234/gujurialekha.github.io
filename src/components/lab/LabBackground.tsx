'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Tier } from './layout';

// three.js and the whole scene live in this lazy chunk; the page's HTML never waits on it.
// Rendered only inside the hero; the rest of the page sits on the static .lab-backdrop.
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
  const [active, setActive] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Phones get the static backdrop: the scene costs seconds of main-thread time on mobile CPUs.
    if (window.innerWidth < 768 || !hasWebGL() || new URLSearchParams(location.search).has('no3d')) return;
    // Start on the first interaction so three.js (~1.3 s of main-thread work) never delays the first paint.
    // ponytail: a visitor who never moves the mouse or scrolls sees the static backdrop; add a timeout fallback if that matters.
    const events = ['pointermove', 'pointerdown', 'scroll', 'wheel', 'keydown', 'touchstart'] as const;
    const start = () => {
      events.forEach((e) => removeEventListener(e, start));
      document.fonts.ready.then(() =>
        setCfg({ tier: pickTier(), reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches })
      );
    };
    events.forEach((e) => addEventListener(e, start, { passive: true }));
    return () => events.forEach((e) => removeEventListener(e, start));
  }, []);

  useEffect(() => {
    if (!cfg) return;
    const id = setTimeout(() => setShown(true), 60);
    // Stop rendering frames while the hero is scrolled out of view.
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting));
    io.observe(root.current!);
    return () => {
      clearTimeout(id);
      io.disconnect();
    };
  }, [cfg]);

  return (
    // -z-10 keeps it under the hero content; the mask fades the canvas into the page backdrop.
    // Hidden on phones (no 3D there): the masked layer alone delayed the hero paint by ~0.8 s on mobile.
    <div
      ref={root}
      aria-hidden="true"
      className="hidden md:block absolute inset-0 -z-10 pointer-events-none [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
    >
      {cfg && (
        <div className={`absolute inset-0 transition-opacity duration-[1400ms] ${shown ? 'opacity-100' : 'opacity-0'}`}>
          <Scene tier={cfg.tier} reduced={cfg.reduced} active={active} />
        </div>
      )}
      {/* Keeps text readable over the scene without hiding it */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_40%,rgba(5,7,13,0.55)_100%)]" />
    </div>
  );
}
