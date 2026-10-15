'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, BufferAttribute, Color, Group, InstancedMesh, MathUtils, Object3D, Vector3 } from 'three';
import HoloLabel from '../HoloLabel';
import { skillsData } from '@/data/skills';
import { getLab, useLab } from '@/lib/labStore';

export const CATEGORY_COLORS = ['#3b82f6', '#22d3ee', '#8b5cf6', '#34d399', '#93c5fd'];

// Skills station: every skill from src/data/skills.ts is a node on a sphere around a neural core.
export default function SkillCore({ position }: { position: [number, number, number] }) {
  const spin = useRef<Group>(null);
  const nodes = useRef<InstancedMesh>(null);
  const lineColors = useRef<BufferAttribute>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const active = useLab((s) => s.activeSkill);

  const data = useMemo(() => {
    const skills = skillsData.flatMap((cat, ci) => cat.skills.map((s) => ({ name: s.name, ci })));
    const n = skills.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts = skills.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      return new Vector3(Math.cos(golden * i) * r, y, Math.sin(golden * i) * r).multiplyScalar(1.85);
    });
    const base = skills.map((s) => new Color(CATEGORY_COLORS[s.ci]));
    const linePos = new Float32Array(n * 6);
    pts.forEach((p, i) => p.toArray(linePos, i * 6 + 3));
    return { skills, pts, base, linePos, lineCol: new Float32Array(n * 6), scales: new Float32Array(n).fill(1) };
  }, []);

  const c = useMemo(() => new Color(), []);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const act = getLab().activeSkill;
    if (spin.current) spin.current.rotation.y += dt * (act ? 0.02 : 0.08);
    const inst = nodes.current;
    const cols = lineColors.current;
    data.skills.forEach((s, i) => {
      const on = act === s.name;
      data.scales[i] = MathUtils.damp(data.scales[i], on ? 2.6 : act ? 0.8 : 1, 7, dt);
      if (inst) {
        dummy.position.copy(data.pts[i]);
        dummy.scale.setScalar(data.scales[i] * (1 + Math.sin(t * 1.7 + i) * 0.06));
        dummy.updateMatrix();
        inst.setMatrixAt(i, dummy.matrix);
        c.copy(data.base[i]).multiplyScalar(on ? 3.2 : act ? 0.6 : 1.5);
        inst.setColorAt(i, c);
      }
      if (cols) {
        c.copy(data.base[i]).multiplyScalar(on ? 1.6 : act ? 0.05 : 0.22);
        c.toArray(data.lineCol, i * 6);
        c.toArray(data.lineCol, i * 6 + 3);
      }
    });
    if (inst) {
      inst.instanceMatrix.needsUpdate = true;
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    }
    if (cols) cols.needsUpdate = true;
  });

  const activeIdx = data.skills.findIndex((s) => s.name === active);

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.2, 32, 24]} />
        <meshBasicMaterial color={new Color('#60a5fa').multiplyScalar(1.6)} toneMapped={false} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.18} toneMapped={false} />
      </mesh>
      <group ref={spin}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[data.linePos, 3]} />
            <bufferAttribute ref={lineColors} attach="attributes-color" args={[data.lineCol, 3]} />
          </bufferGeometry>
          <lineBasicMaterial vertexColors transparent blending={AdditiveBlending} depthWrite={false} />
        </lineSegments>
        <instancedMesh ref={nodes} args={[undefined, undefined, data.skills.length]}>
          <sphereGeometry args={[0.07, 14, 10]} />
          <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
        {activeIdx >= 0 && (
          <HoloLabel
            text={active!}
            position={data.pts[activeIdx].clone().multiplyScalar(1.28).toArray() as [number, number, number]}
            height={0.2}
            width={720}
            color={CATEGORY_COLORS[data.skills[activeIdx].ci]}
            billboard
            flicker={false}
          />
        )}
      </group>
    </group>
  );
}
