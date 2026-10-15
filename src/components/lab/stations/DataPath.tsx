'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CatmullRomCurve3, Color, Group, InstancedMesh, MathUtils, MeshBasicMaterial, Object3D, Vector3 } from 'three';
import HoloLabel, { glow } from '../HoloLabel';
import { milestones, MilestoneKind } from '@/lib/labContent';
import { getLab, useLab } from '@/lib/labStore';

export const KIND_COLOR: Record<MilestoneKind, string> = { work: '#3b82f6', education: '#8b5cf6', cert: '#34d399' };

// Experience/education: a glowing data path with one node per milestone, oldest first.
export default function DataPath({ position }: { position: [number, number, number] }) {
  const nodes = useRef<(Group | null)[]>([]);
  const flow = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const active = useLab((s) => s.activeMilestone);

  const { curve, pts } = useMemo(() => {
    const n = milestones.length;
    const pts = milestones.map((_, k) => new Vector3(-2.3 + (k * 4.6) / (n - 1), Math.sin(k * 0.9) * 0.55, Math.cos(k * 0.7) * 0.5));
    const ext = [pts[0].clone().add(new Vector3(-1.2, -0.4, -0.6)), ...pts, pts[n - 1].clone().add(new Vector3(1.2, 0.4, -0.6))];
    return { curve: new CatmullRomCurve3(ext), pts };
  }, []);

  const tubeMat = useMemo(() => new MeshBasicMaterial({ color: glow('#38bdf8', 1.1), toneMapped: false, transparent: true, opacity: 0.55 }), []);
  const p = useMemo(() => new Vector3(), []);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const act = getLab().activeMilestone;
    milestones.forEach((m, i) => {
      const g = nodes.current[i];
      if (!g) return;
      const k = MathUtils.damp(g.scale.x, act === m.id ? 2 : 1, 6, dt);
      g.scale.setScalar(k);
      g.children[1].rotation.z = t * 0.8;
    });
    const f = flow.current;
    if (!f) return;
    for (let i = 0; i < 14; i++) {
      curve.getPointAt((t * 0.05 + i / 14) % 1, p);
      dummy.position.copy(p);
      dummy.updateMatrix();
      f.setMatrixAt(i, dummy.matrix);
    }
    f.instanceMatrix.needsUpdate = true;
  });

  const activeIdx = milestones.findIndex((m) => m.id === active);

  return (
    <group position={position}>
      <mesh material={tubeMat}>
        <tubeGeometry args={[curve, 200, 0.014, 6, false]} />
      </mesh>
      <instancedMesh ref={flow} args={[undefined, undefined, 14]} frustumCulled={false}>
        <sphereGeometry args={[0.03, 8, 6]} />
        <meshBasicMaterial color={glow('#a5f3fc', 3)} toneMapped={false} />
      </instancedMesh>
      {milestones.map((m, i) => (
        <group
          key={m.id}
          position={pts[i]}
          ref={(g) => {
            nodes.current[i] = g;
          }}
        >
          <mesh>
            <sphereGeometry args={[0.08, 20, 14]} />
            <meshBasicMaterial color={new Color(KIND_COLOR[m.kind]).multiplyScalar(2.4)} toneMapped={false} />
          </mesh>
          <mesh>
            <torusGeometry args={[0.15, 0.006, 6, 40, Math.PI * 1.5]} />
            <meshBasicMaterial color={new Color(KIND_COLOR[m.kind]).multiplyScalar(1.6)} toneMapped={false} />
          </mesh>
        </group>
      ))}
      {activeIdx >= 0 && (
        <HoloLabel
          text={milestones[activeIdx].org}
          sub={milestones[activeIdx].period}
          position={pts[activeIdx].clone().add(new Vector3(0, 0.55, 0)).toArray() as [number, number, number]}
          height={0.24}
          width={820}
          color={KIND_COLOR[milestones[activeIdx].kind]}
          billboard
          flicker={false}
        />
      )}
    </group>
  );
}
