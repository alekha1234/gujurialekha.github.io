'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  CatmullRomCurve3,
  DoubleSide,
  Group,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  QuadraticBezierCurve3,
  Vector3,
} from 'three';
import { Line } from '@react-three/drei';
import type { Line2 } from 'three-stdlib';
import type { LineMaterial } from 'three-stdlib';
import HoloLabel, { glow } from '../HoloLabel';
import NeuralNetwork from '../NeuralNetwork';

export type FlowVariant = 'ml' | 'nlp' | 'rag' | 'cv';

interface Props {
  position: [number, number, number];
  stages: string[];
  color: string;
  variant: FlowVariant;
}

const GAP = 0.68;
const PARTICLES = 34;

// A vertical pipeline: stage nodes top to bottom, data particles flowing through them,
// plus a small variant-specific visual on the left explaining what the data looks like.
export default function FlowStation({ position, stages, color, variant }: Props) {
  const inst = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  const { curve, nodes } = useMemo(() => {
    const top = ((stages.length - 1) * GAP) / 2;
    const nodes = stages.map((_, k) => new Vector3((k % 2 ? 0.28 : -0.28) + 0.4, top - k * GAP, Math.sin(k * 1.3) * 0.25));
    return { curve: new CatmullRomCurve3(nodes), nodes };
  }, [stages]);

  const mats = useMemo(
    () => ({
      node: new MeshBasicMaterial({ color: glow(color, 2.4), toneMapped: false }),
      particle: new MeshBasicMaterial({ color: glow('#a5f3fc', 3), toneMapped: false }),
      tube: new MeshBasicMaterial({ color: glow(color, 0.9), transparent: true, opacity: 0.45, toneMapped: false }),
    }),
    [color]
  );

  const p = useMemo(() => new Vector3(), []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const m = inst.current;
    if (!m) return;
    for (let i = 0; i < PARTICLES; i++) {
      const u = (t * 0.09 + i / PARTICLES) % 1;
      curve.getPointAt(u, p);
      dummy.position.set(p.x + Math.sin(i * 7.1 + t) * 0.03, p.y, p.z + Math.cos(i * 3.3 + t) * 0.03);
      dummy.scale.setScalar(0.6 + 0.4 * Math.sin(u * Math.PI));
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={position}>
      <mesh material={mats.tube}>
        <tubeGeometry args={[curve, 160, 0.01, 6, false]} />
      </mesh>
      {nodes.map((n, k) => (
        <group key={stages[k]} position={n}>
          <mesh material={mats.node}>
            <octahedronGeometry args={[0.07, 0]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.13, 0.004, 6, 40]} />
            <meshBasicMaterial color={glow(color, 1.2)} transparent opacity={0.6} toneMapped={false} />
          </mesh>
          <HoloLabel
            text={stages[k]}
            sub={`STAGE 0${k + 1}`}
            position={[1.12, 0, 0]}
            height={0.25}
            width={560}
            color={color}
          />
        </group>
      ))}
      <instancedMesh ref={inst} args={[undefined, undefined, PARTICLES]} material={mats.particle} frustumCulled={false}>
        <sphereGeometry args={[0.028, 8, 6]} />
      </instancedMesh>

      <group position={[-1.35, 0, 0]}>
        {variant === 'ml' && <MLVisual />}
        {variant === 'nlp' && <NLPVisual />}
        {variant === 'rag' && <RAGVisual />}
        {variant === 'cv' && <CVVisual />}
      </group>
    </group>
  );
}

function MLVisual() {
  const cubes = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const m = cubes.current;
    if (!m) return;
    let i = 0;
    for (let x = 0; x < 3; x++)
      for (let y = 0; y < 3; y++)
        for (let z = 0; z < 3; z++) {
          const pulse = 0.18 + 0.02 * Math.sin(t * 2 + i);
          dummy.position.set((x - 1) * 0.24, (y - 1) * 0.24, (z - 1) * 0.24);
          dummy.scale.setScalar(pulse / 0.18);
          dummy.updateMatrix();
          m.setMatrixAt(i++, dummy.matrix);
        }
    m.instanceMatrix.needsUpdate = true;
    m.rotation.set(t * 0.2, t * 0.3, 0);
  });
  return (
    <>
      <group position={[0, 1.5, 0]}>
        <instancedMesh ref={cubes} args={[undefined, undefined, 27]}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshBasicMaterial color={glow('#3b82f6', 1.4)} wireframe toneMapped={false} />
        </instancedMesh>
        <HoloLabel text="RAW DATA" position={[0, -0.55, 0]} height={0.11} width={320} />
      </group>
      <NeuralNetwork position={[0, -0.6, 0]} layers={[3, 5, 5, 2]} spread={[1.6, 1.3, 0.3]} pulses={16} nodeSize={0.045} reactive={false} seed={3} />
      <HoloLabel text="MODEL" position={[0, -1.5, 0]} height={0.11} width={260} />
    </>
  );
}

const TOKENS = ['AI', 'understands', 'human', 'language'];

function NLPVisual() {
  const bars = useRef<InstancedMesh>(null);
  const arcs = useRef<Group>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const tokenX = TOKENS.map((_, i) => (i - 1.5) * 0.5);
  const arcCurves = useMemo(() => {
    const pairs: [number, number][] = [[0, 1], [1, 3], [0, 3], [2, 3], [1, 2]];
    return pairs.map(([a, b]) => {
      const s = new Vector3(tokenX[a], -0.35, 0);
      const e = new Vector3(tokenX[b], -0.35, 0);
      const mid = s.clone().lerp(e, 0.5).add(new Vector3(0, 0.25 + Math.abs(b - a) * 0.12, 0));
      return new QuadraticBezierCurve3(s, mid, e).getPoints(24);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const m = bars.current;
    if (m) {
      let i = 0;
      TOKENS.forEach((_, ti) => {
        for (let d = 0; d < 6; d++) {
          const h = 0.04 + 0.16 * (0.5 + 0.5 * Math.sin(t * 1.3 + ti * 2.1 + d * 0.9));
          dummy.position.set(tokenX[ti] - 0.15 + d * 0.06, 0.25 + h / 2, 0);
          dummy.scale.set(1, h, 1);
          dummy.updateMatrix();
          m.setMatrixAt(i++, dummy.matrix);
        }
      });
      m.instanceMatrix.needsUpdate = true;
    }
    arcs.current?.children.forEach((c, i) => {
      ((c as Line2).material as LineMaterial).opacity = 0.25 + 0.7 * Math.max(0, Math.sin(t * 1.4 - i * 0.9));
    });
  });

  return (
    <group>
      <HoloLabel text="“AI understands human language”" position={[0, 1.55, 0]} height={0.19} width={900} color="#e2e8f0" />
      {TOKENS.map((tok, i) => (
        <HoloLabel key={tok} text={tok} position={[tokenX[i], 0.95, 0]} height={0.14} width={tok.length > 5 ? 380 : 220} flicker={false} />
      ))}
      <instancedMesh ref={bars} args={[undefined, undefined, TOKENS.length * 6]}>
        <boxGeometry args={[0.04, 1, 0.04]} />
        <meshBasicMaterial color={glow('#8b5cf6', 2)} toneMapped={false} />
      </instancedMesh>
      <group ref={arcs}>
        {arcCurves.map((pts, i) => (
          <Line key={i} points={pts} color="#22d3ee" lineWidth={1.2} transparent opacity={0.5} depthWrite={false} />
        ))}
      </group>
      {TOKENS.map((_, i) => (
        <mesh key={i} position={[tokenX[i], -0.35, 0]}>
          <sphereGeometry args={[0.04, 10, 8]} />
          <meshBasicMaterial color={glow('#22d3ee', 2.5)} toneMapped={false} />
        </mesh>
      ))}
      <HoloLabel text="SELF-ATTENTION" position={[0, -0.62, 0]} height={0.1} width={420} />
      <HoloLabel text="SEMANTIC VECTOR → OUTPUT" position={[0, -1.35, 0]} height={0.11} width={640} color="#34d399" />
    </group>
  );
}

function RAGVisual() {
  const core = useRef<Mesh>(null);
  const orbit = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (core.current) core.current.rotation.set(t * 0.3, t * 0.4, 0);
    const m = orbit.current;
    if (!m) return;
    for (let i = 0; i < 18; i++) {
      const a = t * (0.3 + (i % 3) * 0.12) + i * 0.35;
      const r = 0.75 + (i % 3) * 0.22;
      dummy.position.set(Math.cos(a) * r, Math.sin(a * 0.7) * 0.25 + (i % 2 ? 0.1 : -0.1), Math.sin(a) * r);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });
  return (
    <group>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshBasicMaterial color={glow('#8b5cf6', 2.2)} wireframe toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.2, 24, 16]} />
        <meshBasicMaterial color={glow('#c4b5fd', 2.6)} toneMapped={false} />
      </mesh>
      <instancedMesh ref={orbit} args={[undefined, undefined, 18]}>
        <boxGeometry args={[0.06, 0.06, 0.06]} />
        <meshBasicMaterial color={glow('#22d3ee', 2)} toneMapped={false} />
      </instancedMesh>
      <HoloLabel text="LLM CORE" position={[0, 0.72, 0]} height={0.13} width={320} color="#c4b5fd" />
      <HoloLabel text="RETRIEVED CONTEXT" position={[0, -1.05, 0]} height={0.1} width={520} />
      <HoloLabel text="USER QUERY" position={[0, 1.55, 0]} height={0.11} width={360} color="#e2e8f0" />
      <HoloLabel text="GROUNDED RESPONSE" position={[0, -1.55, 0]} height={0.11} width={540} color="#34d399" />
    </group>
  );
}

function CVVisual() {
  const scan = useRef<Mesh>(null);
  const box = useRef<Group>(null);
  const target = useRef<Mesh>(null);
  const boxPts = useMemo(() => {
    const s = 0.62;
    const c = [
      [-s, -s], [s, -s], [s, s], [-s, s],
    ];
    return [...c, c[0]].map(([x, y]) => new Vector3(x, y, 0));
  }, []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (scan.current) scan.current.position.y = Math.sin(t * 0.9) * 0.6;
    if (target.current) target.current.rotation.set(t * 0.2, t * 0.35, 0);
    if (box.current) {
      const on = Math.sin(t * 0.9) < -0.2;
      box.current.scale.setScalar(on ? 1 : 1.08);
      box.current.children.forEach((c) => (((c as Line2).material as LineMaterial).opacity = on ? 0.95 : 0.25));
    }
  });
  return (
    <group position={[0, 0.3, 0]}>
      <mesh ref={target}>
        <torusKnotGeometry args={[0.3, 0.09, 96, 12]} />
        <meshBasicMaterial color={glow('#60a5fa', 1.3)} wireframe toneMapped={false} />
      </mesh>
      <mesh ref={scan}>
        <planeGeometry args={[1.5, 0.02]} />
        <meshBasicMaterial color={glow('#22d3ee', 3)} transparent opacity={0.9} side={DoubleSide} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -0.3]}>
        <planeGeometry args={[1.5, 1.5, 12, 12]} />
        <meshBasicMaterial color="#1e3a8a" wireframe transparent opacity={0.35} />
      </mesh>
      <group ref={box}>
        <Line points={boxPts} color="#34d399" lineWidth={1.6} transparent opacity={0.9} />
      </group>
      <HoloLabel text="IMAGE → PIXELS" position={[0, 1.05, 0]} height={0.11} width={440} color="#e2e8f0" />
      <HoloLabel text="DETECTION" position={[-0.24, -0.78, 0]} height={0.1} width={320} color="#34d399" />
    </group>
  );
}
