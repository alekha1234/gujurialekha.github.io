import { useSyncExternalStore } from 'react';

// Shared state between HTML sections and the 3D scene. The HTML writes, the scene reads
// (via getLab() inside useFrame, so hovering never re-renders the canvas tree).
export interface LabState {
  activeCapability: string | null;
  activeSkill: string | null;
  activeProject: string | null;
  activeMilestone: string | null;
  terminalActive: boolean;
}

let state: LabState = {
  activeCapability: null,
  activeSkill: null,
  activeProject: null,
  activeMilestone: null,
  terminalActive: false,
};
const listeners = new Set<() => void>();

export const getLab = () => state;

export function setLab(patch: Partial<LabState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useLab<T>(select: (s: LabState) => T): T {
  return useSyncExternalStore(subscribe, () => select(state), () => select(state));
}

// Pointer in NDC and scroll position as a float station index (f) + 0..1 progress; written by Scene listeners.
export const pointer = { x: 0, y: 0 };
export const scroll = { f: 0, progress: 0 };
