'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, useTexture } from '@react-three/drei';
import type { LineMaterial } from 'three-stdlib';
import { Color, Group, MathUtils, MeshBasicMaterial, SRGBColorSpace, Texture } from 'three';
import HoloLabel from '../HoloLabel';
import { featuredProjects } from '@/data/projects';
import { getAssetPath } from '@/utils/assets';
import { getLab } from '@/lib/labStore';

const W = 1.08;
const H = 0.66;
const HUB: [number, number, number] = [0, 0.1, -2];

// Crop a texture to cover the panel like CSS object-fit: cover.
function cover(tex: Texture) {
  const img = tex.image as { width: number; height: number } | undefined;
  if (!img?.width) return;
  const r = img.width / img.height / (W / H);
  if (r > 1) {
    tex.repeat.set(1 / r, 1);
    tex.offset.set((1 - 1 / r) / 2, 0);
  } else {
    tex.repeat.set(1, r);
    tex.offset.set(0, (1 - r) / 2);
  }
  tex.colorSpace = SRGBColorSpace;
}

export default function ProjectModules({ position }: { position: [number, number, number] }) {
  const textures = useTexture(featuredProjects.map((p) => getAssetPath(p.image)));
  textures.forEach(cover);

  const slots = useMemo(
    () =>
      featuredProjects.map((p, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return {
          p,
          pos: [(col - 1) * (W + 0.18), (0.5 - row) * (H + 0.42), Math.abs(col - 1) * 0.25] as [number, number, number],
          rotY: (1 - col) * 0.22,
          short: p.title.split(':')[0],
        };
      }),
    []
  );

  const groups = useRef<(Group | null)[]>([]);
  const imgMats = useMemo(() => textures.map((t) => new MeshBasicMaterial({ map: t, toneMapped: false })), [textures]);
  const frames = useRef<(LineMaterial | null)[]>([]);
  const links = useRef<(LineMaterial | null)[]>([]);
  const c = useMemo(() => new Color(), []);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const active = getLab().activeProject;
    slots.forEach((s, i) => {
      const g = groups.current[i];
      if (!g) return;
      const on = active === s.p.id;
      const k = MathUtils.damp(g.scale.x, on ? 1.14 : 1, 6, dt);
      g.scale.setScalar(k);
      g.position.z = MathUtils.damp(g.position.z, s.pos[2] + (on ? 0.45 : 0), 6, dt);
      g.position.y = s.pos[1] + Math.sin(t * 0.7 + i) * 0.03;
      c.setScalar(on ? 1.15 : active ? 0.3 : 0.62);
      imgMats[i].color.lerp(c, Math.min(1, dt * 6));
      const f = frames.current[i];
      if (f) f.opacity = MathUtils.damp(f.opacity, on ? 1 : 0.35, 6, dt);
      const l = links.current[i];
      if (l) l.opacity = MathUtils.damp(l.opacity, on ? 0.9 : 0.06, 6, dt);
    });
  });

  const rect: [number, number, number][] = [
    [-W / 2, -H / 2, 0.005],
    [W / 2, -H / 2, 0.005],
    [W / 2, H / 2, 0.005],
    [-W / 2, H / 2, 0.005],
    [-W / 2, -H / 2, 0.005],
  ];

  return (
    <group position={position}>
      <mesh position={HUB}>
        <icosahedronGeometry args={[0.18, 1]} />
        <meshBasicMaterial color={new Color('#60a5fa').multiplyScalar(2.2)} wireframe toneMapped={false} />
      </mesh>
      {slots.map((s, i) => (
        <group key={s.p.id}>
          <Line
            ref={(l) => {
              links.current[i] = l ? (l.material as LineMaterial) : null;
            }}
            points={[HUB, s.pos]}
            color="#22d3ee"
            lineWidth={1.4}
            transparent
            opacity={0.06}
            depthWrite={false}
          />
          <group
            ref={(g) => {
              groups.current[i] = g;
            }}
            position={s.pos}
            rotation={[0, s.rotY, 0]}
          >
            <mesh material={imgMats[i]}>
              <planeGeometry args={[W, H]} />
            </mesh>
            <Line
              ref={(l) => {
                frames.current[i] = l ? (l.material as LineMaterial) : null;
              }}
              points={rect}
              color="#38bdf8"
              lineWidth={1.5}
              transparent
              opacity={0.35}
            />
            <HoloLabel text={s.short} position={[0, -H / 2 - 0.13, 0]} height={0.12} width={760} flicker={false} />
          </group>
        </group>
      ))}
    </group>
  );
}
