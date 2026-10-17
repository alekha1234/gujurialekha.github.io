'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, Mesh, MeshBasicMaterial } from 'three';
import { labelTexture } from './textures';

// Emissive colour pushed above 1.0 for a bright, un-tonemapped glow.
export const glow = (hex: string, k = 2.2) => new Color(hex).multiplyScalar(k);

interface Props {
  text: string;
  position?: [number, number, number];
  height?: number;
  flicker?: boolean;
  opacity?: number;
}

export default function HoloLabel({
  text,
  position = [0, 0, 0],
  height = 0.14,
  flicker = true,
  opacity = 0.92,
}: Props) {
  const { tex, aspect } = useMemo(() => labelTexture(text), [text]);
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
  return <group position={position}>{plane}</group>;
}
