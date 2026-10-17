'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Power } from 'lucide-react';
import { personalData } from '@/data/personal';
import { setLab } from '@/lib/labStore';

const handle = (label: string) => personalData.socials.find((s) => s.label === label)?.display ?? '';

const SCRIPT = [
  '$ ai-lab connect --operator=visitor',
  '> handshake .................. OK',
  '> loading inference engine ... OK',
  `> route: ${personalData.contact.email}`,
  `> route: ${handle('LinkedIn')}`,
  `> route: ${handle('GitHub')}`,
  '> connection established. Say hello below.',
];

export default function ContactTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const start = () => {
    timers.current.forEach(clearTimeout);
    setLines([]);
    setRunning(true);
    setLab({ terminalActive: true });
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setLines(SCRIPT);
      setRunning(false);
      return;
    }
    SCRIPT.forEach((l, i) => {
      timers.current.push(
        setTimeout(() => {
          setLines((prev) => [...prev, l]);
          if (i === SCRIPT.length - 1) setRunning(false);
        }, 260 + i * 330)
      );
    });
  };

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
        <span className="font-mono text-xs text-lab-text-muted">ai_lab://terminal</span>
        <span className={`w-2 h-2 rounded-full ${lines.length ? 'bg-lab-green' : 'bg-lab-text-muted'}`} aria-hidden="true" />
      </div>
      <div className="px-4 py-3 font-mono text-xs min-h-[172px] space-y-1" role="log" aria-live="polite">
        {lines.length === 0 && <p className="text-lab-text-muted caret">system idle</p>}
        {lines.map((l, i) => (
          <p key={i} className={`${i === 0 ? 'text-lab-text-primary' : 'text-lab-cyan'} ${running && i === lines.length - 1 ? 'caret' : ''}`}>
            {l}
          </p>
        ))}
      </div>
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={start}
          disabled={running}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-md border border-lab-cyan/50 bg-lab-cyan/10 font-mono text-xs font-semibold tracking-[0.2em] text-lab-cyan hover:bg-lab-cyan/20 hover:shadow-cyan-glow transition-all disabled:opacity-60 focus-ring"
        >
          <Power className="w-4 h-4" aria-hidden="true" />
          {lines.length && !running ? 'RE-INITIALIZE' : 'INITIALIZE CONNECTION'}
        </button>
      </div>
    </div>
  );
}
