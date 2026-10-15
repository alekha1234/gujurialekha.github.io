'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import { Color, Mesh, MeshBasicMaterial } from 'three';
import { labelTexture, LabelOpts } from './textures';

// Emissive colour pushed above 1.0 so it crosses the bloom threshold.
export const glow = (hex: string, k = 2.2) => new Color(hex).multiplyScalar(k);

interface Props extends LabelOpts {
  text: string;
  position?: [number, number, number];
  height?: number;
  billboard?: boolean;
  flicker?: boolean;
  opacity?: number;
}

export default function HoloLabel({
  text,
  position = [0, 0, 0],
  height = 0.14,
  billboard = false,
  flicker = true,
  opacity = 0.92,
  ...opts
}: Props) {
  const { tex, aspect } = useMemo(() => labelTexture(text, opts), [text, opts.sub, opts.color, opts.width, opts.frame]);
  useEffect(() => () => tex.dispose(), [tex]);
  const mesh = useRef<Mesh>(null);
  const seed = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    if (!flicker || !mesh.current) return;
    const t = clock.elapsedTime + seed;
    // Mostly steady, with a brief holographic flicker every few seconds.
    const f = Math.sin(t * 0.9) > 0.985 ? 0.45 : 1;
    (mesh.current.material as MeshBasicMaterial).opacity = opacity * f;
  });

  const plane = (
    <mesh ref={mesh}>
      <planeGeometry args={[height * aspect, height]} />
      <meshBasicMaterial map={tex} transparent opacity={opacity} depthWrite={false} toneMapped={false} />
    </mesh>
  );
  return billboard ? <Billboard position={position}>{plane}</Billboard> : <group position={position}>{plane}</group>;
}
