import { Vector3 } from 'three';

export type Tier = 'high' | 'mid';

// Hero framing: the camera looks at `target` from `dist` away; `robot` is the robot's offset from the camera.
export const HERO = { target: [0, 0, 0], dist: 8, robot: [2.1, -1.95, -5.8] } as const;

// Written by CameraRig every frame, read by the robot.
export const rig = {
  base: new Vector3(0, 0.35, 8), // camera position without pointer parallax
  narrow: false,
};
