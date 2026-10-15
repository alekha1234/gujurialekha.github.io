'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import type { LineMaterial } from 'three-stdlib';
import { Group, MathUtils, MeshBasicMaterial } from 'three';
import HoloLabel, { glow } from '../HoloLabel';
import { capabilities } from '@/lib/labContent';
import { getLab } from '@/lib/labStore';

// About station: six capability modules orbiting a core, each wired back to it.
export default function CapabilityHub({ position }: { position: [number, number, number] }) {
  const ring = useRef<Group>(null);
  const mods = useRef<(Group | null)[]>([]);
  const lineMats = useRef<(LineMaterial | null)[]>([]);
  const coreMat = useMemo(() => new MeshBasicMaterial({ color: glow('#60a5fa', 2.2), toneMapped: false }), []);
  const hexMat = useMemo(
    () => new MeshBasicMaterial({ color: glow('#22d3ee', 1.3), toneMapped: false, transparent: true, opacity: 0.85 }),
    []
  );

  const slots = useMemo(
    () =>
      capabilities.map((c, i) => {
        const a = (i / capabilities.length) * Math.PI * 2;
        return { c, pos: [Math.cos(a) * 1.75, 0.75 + Math.sin(a) * 1.15, Math.sin(a * 2) * 0.3] as [number, number, number] };
      }),
    []
  );

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const active = getLab().activeCapability;
    if (ring.current) ring.current.rotation.z = Math.sin(t * 0.15) * 0.08;
    slots.forEach((s, i) => {
      const g = mods.current[i];
      if (!g) return;
      const on = active === s.c.id;
      const k = MathUtils.damp(g.scale.x, on ? 1.35 : active ? 0.85 : 1, 6, dt);
      g.scale.setScalar(k);
      g.position.y = s.pos[1] + Math.sin(t * 0.9 + i) * 0.05;
      g.children[0].rotation.z = t * 0.3 + i;
      const lm = lineMats.current[i];
      if (lm) lm.opacity = MathUtils.damp(lm.opacity, on ? 0.95 : active ? 0.08 : 0.3, 6, dt);
    });
  });

  return (
    <group position={position}>
      <mesh material={coreMat} position={[0, 0, -0.8]}>
        <icosahedronGeometry args={[0.12, 1]} />
      </mesh>
      <mesh position={[0, 0, -0.8]}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.25} toneMapped={false} />
      </mesh>
      <group ref={ring}>
        {slots.map((s, i) => (
          <group key={s.c.id}>
            <Line
              ref={(l) => {
                lineMats.current[i] = l ? (l.material as LineMaterial) : null;
              }}
              points={[[0, 0.75, 0.2], s.pos]}
              color="#38bdf8"
              lineWidth={1.2}
              transparent
              opacity={0.3}
              depthWrite={false}
            />
            <group ref={(g) => {
              mods.current[i] = g;
            }} position={s.pos}>
              <mesh material={hexMat}>
                <ringGeometry args={[0.3, 0.325, 6]} />
              </mesh>
              <HoloLabel text={s.c.short} position={[0, 0, 0.02]} height={0.19} width={260} />
            </group>
          </group>
        ))}
      </group>
    </group>
  );
}
