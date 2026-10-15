'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { Color, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three';
import { glow } from '../HoloLabel';
import { screenTexture } from '../textures';
import { personalData } from '@/data/personal';
import { getLab } from '@/lib/labStore';

const handle = (label: string) => personalData.socials.find((s) => s.label === label)?.display ?? '';

// Contact station: holographic terminal the robot stands beside.
export default function Terminal({ position }: { position: [number, number, number] }) {
  const tex = useMemo(
    () =>
      screenTexture([
        'AI_LAB://contact --init',
        `> ${handle('GitHub')}`,
        `> ${handle('LinkedIn')}`,
        `> ${personalData.contact.email}`,
        `> ${personalData.location}`,
        '> status: awaiting connection',
      ]),
    []
  );
  useEffect(() => () => tex.dispose(), [tex]);

  const screen = useMemo(() => new MeshBasicMaterial({ map: tex, toneMapped: false, transparent: true, opacity: 0.9 }), [tex]);
  const frame = useMemo(() => new MeshBasicMaterial({ color: glow('#22d3ee', 1.6), toneMapped: false }), []);
  const metal = useMemo(() => new MeshStandardMaterial({ color: '#1f2531', metalness: 0.8, roughness: 0.35 }), []);
  const scan = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);
  const dim = useMemo(() => new Color(0.75, 0.75, 0.75), []);
  const bright = useMemo(() => new Color(1.6, 1.6, 1.6), []);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const on = getLab().terminalActive;
    screen.color.lerp(on ? bright : dim, Math.min(1, dt * 4));
    if (scan.current) {
      scan.current.position.y = 0.45 - ((t * (on ? 0.9 : 0.25)) % 1) * 0.9;
      (scan.current.material as MeshBasicMaterial).opacity = on ? 0.8 : 0.25;
    }
    if (ring.current) {
      const s = MathUtils.damp(ring.current.scale.x, on ? 1 + (t % 1) * 0.6 : 1, 8, dt);
      ring.current.scale.setScalar(s);
      ring.current.rotation.z = t * 0.4;
    }
  });

  return (
    <group position={position} rotation={[0, -0.25, 0]}>
      <RoundedBox args={[1.9, 0.08, 0.8]} radius={0.03} position={[0, -1.05, 0]} material={metal} />
      <mesh position={[0, -0.63, -0.15]} material={metal}>
        <cylinderGeometry args={[0.06, 0.1, 0.8, 16]} />
      </mesh>
      <group position={[0, 0.05, -0.15]} rotation={[-0.12, 0, 0]}>
        <mesh material={screen}>
          <planeGeometry args={[1.7, 1.02]} />
        </mesh>
        {[
          [0, 0.52, 1.74, 0.012],
          [0, -0.52, 1.74, 0.012],
          [-0.87, 0, 0.012, 1.04],
          [0.87, 0, 0.012, 1.04],
        ].map(([x, y, w, h], i) => (
          <mesh key={i} position={[x, y, 0.002]} material={frame}>
            <planeGeometry args={[w, h]} />
          </mesh>
        ))}
        <mesh ref={scan} position={[0, 0, 0.004]}>
          <planeGeometry args={[1.7, 0.02]} />
          <meshBasicMaterial color={glow('#67e8f9', 2)} transparent opacity={0.25} toneMapped={false} depthWrite={false} />
        </mesh>
      </group>
      <mesh ref={ring} position={[0, -1.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.95, 0.97, 64]} />
        <meshBasicMaterial color={glow('#22d3ee', 1.8)} transparent opacity={0.7} toneMapped={false} />
      </mesh>
    </group>
  );
}
