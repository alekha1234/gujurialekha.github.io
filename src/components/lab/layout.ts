import { Vector3 } from 'three';

export type Tier = 'high' | 'mid' | 'min';
type V3 = [number, number, number];

// One station per HTML section, in page order. `target` is where that section's 3D object
// lives; `side` is where it appears on screen (content sits on the other side).
export interface Station {
  id: string;
  target: V3;
  side: -1 | 0 | 1;
  dist?: number;
  robot: V3 | null; // robot offset from the camera; null = parked out of frame
}

export const STATIONS: Station[] = [
  { id: 'top', target: [0, 0, 0], side: 0, dist: 8, robot: [2.1, -1.95, -5.8] },
  { id: 'about', target: [-3, 0.5, -26], side: -1, robot: [-2.35, -1.55, -7] },
  { id: 'skills', target: [3, 0.1, -40], side: 1, robot: null },
  { id: 'ml-lab', target: [-3, 0, -54], side: -1, robot: null },
  { id: 'nlp-lab', target: [3, 0, -66], side: 1, robot: null },
  { id: 'llm-lab', target: [-3, 0, -78], side: -1, robot: null },
  { id: 'vision-lab', target: [3, 0, -90], side: 1, robot: null },
  { id: 'projects', target: [3.3, 0, -104], side: 1, robot: null },
  { id: 'experience', target: [-3, 0, -118], side: -1, robot: null },
  { id: 'contact', target: [2.7, -0.2, -132], side: 1, robot: [0.7, -1.95, -5.4] },
];

export const stationIndex = (id: string) => STATIONS.findIndex((s) => s.id === id);

// Written by CameraRig every frame, read by the robot and stations.
export const rig = {
  base: new Vector3(0, 0, 8), // camera position without pointer parallax
  seg: 0, // current segment index
  ease: 0, // eased progress within the segment
  f: 0, // raw float station index (from scroll)
  narrow: false,
};

export const smoothstep = (u: number) => u * u * (3 - 2 * u);
