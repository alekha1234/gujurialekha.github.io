'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import {
  AdditiveBlending,
  DoubleSide,
  Group,
  InstancedMesh,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  Vector3,
} from 'three';
import HoloLabel, { glow } from './HoloLabel';
import { beamTexture } from './textures';
import { rig, STATIONS } from './layout';
import { getLab, pointer } from '@/lib/labStore';

const { damp } = MathUtils;

const LABELS: { text: string; pos: [number, number, number]; anchor: [number, number, number] }[] = [
  { text: 'NEURAL ENGINE', pos: [-0.95, 2.3, 0.1], anchor: [-0.2, 2.05, 0.1] },
  { text: 'NLP CORE', pos: [0.9, 2.42, 0.1], anchor: [0.22, 2.08, 0.1] },
  { text: 'VISION MODULE', pos: [1.0, 1.98, 0.15], anchor: [0.12, 1.9, 0.26] },
  { text: 'LANGUAGE MODEL', pos: [-1.05, 1.42, 0.15], anchor: [-0.4, 1.35, 0.2] },
  { text: 'INFERENCE ENGINE', pos: [1.05, 1.12, 0.2], anchor: [0.05, 1.3, 0.24] },
];

const off = new Vector3();
const next = new Vector3();
const PARKED = new Vector3(0, -12, -7);

function Arm({ side, mats, armRef }: { side: 1 | -1; mats: Mats; armRef: React.RefObject<Group> }) {
  return (
    <group position={[side * 0.5, 1.5, 0]}>
      <mesh material={mats.graphite}>
        <sphereGeometry args={[0.13, 24, 16]} />
      </mesh>
      <group ref={armRef} rotation={[0, 0, side * 0.14]}>
        <mesh position={[0, -0.22, 0]} material={mats.shell}>
          <capsuleGeometry args={[0.075, 0.28, 6, 16]} />
        </mesh>
        <mesh position={[side * 0.078, -0.22, 0]} material={mats.glow}>
          <boxGeometry args={[0.008, 0.2, 0.02]} />
        </mesh>
        <mesh position={[0, -0.46, 0]} material={mats.carbon}>
          <sphereGeometry args={[0.072, 20, 14]} />
        </mesh>
        <group position={[0, -0.46, 0]} rotation={[-0.35, 0, 0]}>
          <mesh position={[0, -0.2, 0]} material={mats.shell}>
            <capsuleGeometry args={[0.066, 0.24, 6, 16]} />
          </mesh>
          <mesh position={[0, -0.41, 0]} material={mats.graphite}>
            <sphereGeometry args={[0.07, 16, 12]} />
          </mesh>
          <mesh position={[0, -0.41, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.glow}>
            <torusGeometry args={[0.074, 0.006, 8, 32]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

type Mats = ReturnType<typeof makeMats>;
function makeMats() {
  return {
    shell: new MeshPhysicalMaterial({ color: '#e6ebf2', metalness: 0.3, roughness: 0.26, clearcoat: 1, clearcoatRoughness: 0.12 }),
    graphite: new MeshStandardMaterial({ color: '#2b313c', metalness: 0.75, roughness: 0.32 }),
    carbon: new MeshStandardMaterial({ color: '#0c1017', metalness: 0.45, roughness: 0.55 }),
    visor: new MeshPhysicalMaterial({ color: '#03060c', metalness: 0.9, roughness: 0.06, clearcoat: 1 }),
    glow: new MeshBasicMaterial({ color: glow('#38bdf8', 2.4), toneMapped: false }),
    eye: new MeshBasicMaterial({ color: glow('#67e8f9', 4), toneMapped: false }),
    holo: new MeshBasicMaterial({ color: glow('#38bdf8', 1.2), transparent: true, opacity: 0.35, toneMapped: false, depthWrite: false }),
  };
}

export default function Robot() {
  const mats = useMemo(makeMats, []);
  const root = useRef<Group>(null);
  const body = useRef<Group>(null);
  const torso = useRef<Group>(null);
  const head = useRef<Group>(null);
  const eyes = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const armL = useRef<Group>(null);
  const armR = useRef<Group>(null);
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);
  const antenna = useRef<Mesh>(null);
  const bars = useRef<InstancedMesh>(null);
  const hud = useRef<Group>(null);
  const dummy = useMemo(() => new Object3D(), []);

  const connectors = useMemo(() => {
    const pts: number[] = [];
    LABELS.forEach((l) => pts.push(...l.anchor, ...l.pos));
    return new Float32Array(pts);
  }, []);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const r = root.current;
    if (!r) return;

    // Companion position: offset from the camera base, blended between stations.
    // Phones: the robot only appears in the hero, shrunk into the gap above the headline.
    const pick = (i: number) => (rig.narrow && i > 0 ? null : STATIONS[i].robot);
    const a = pick(rig.seg);
    const b = pick(Math.min(rig.seg + 1, STATIONS.length - 1));
    off.set(...((a ?? PARKED.toArray()) as [number, number, number]));
    next.set(...((b ?? PARKED.toArray()) as [number, number, number]));
    off.lerp(next, rig.ease);
    if (rig.narrow) {
      off.x = 0;
      off.y += 2.3;
    }
    r.scale.setScalar(rig.narrow ? 0.6 : 1);
    if (getLab().terminalActive && rig.seg >= STATIONS.length - 2) off.x -= 0.25;
    const tx = rig.base.x + off.x;
    const ty = rig.base.y + off.y + Math.sin(t * 1.1) * 0.04;
    const tz = rig.base.z + off.z;
    r.position.set(damp(r.position.x, tx, 3, dt), damp(r.position.y, ty, 3, dt), damp(r.position.z, tz, 3, dt));
    r.visible = r.position.y - rig.base.y > -7;
    // Name labels only in the hero; elsewhere they would crowd the stations and the terminal.
    if (hud.current) hud.current.visible = rig.f < 0.6;
    r.rotation.y = damp(r.rotation.y, -off.x * 0.09 + pointer.x * 0.08, 3, dt);

    // Breathing, servo micro-motion.
    if (torso.current) {
      const breath = Math.sin(t * 1.6);
      torso.current.scale.set(1 + breath * 0.008, 1 + breath * 0.014, 1 + breath * 0.012);
      torso.current.position.y = 1.25 + breath * 0.006;
    }
    if (body.current) body.current.rotation.z = Math.sin(t * 0.7) * 0.012;

    // Head and eyes follow the cursor, clamped.
    if (head.current) {
      const servo = Math.sin(t * 7.3) * 0.004 * (Math.sin(t * 0.8) > 0.6 ? 1 : 0);
      head.current.rotation.y = damp(head.current.rotation.y, pointer.x * 0.5 + servo, 4, dt);
      head.current.rotation.x = damp(head.current.rotation.x, -pointer.y * 0.28, 4, dt);
    }
    if (eyes.current) {
      eyes.current.position.x = damp(eyes.current.position.x, pointer.x * 0.02, 6, dt);
      eyes.current.position.y = damp(eyes.current.position.y, pointer.y * 0.014, 6, dt);
      const blink = (t % 4.3) < 0.12 ? 0.15 : 1;
      eyes.current.scale.y = blink;
    }
    if (core.current) core.current.scale.setScalar(1 + Math.sin(t * 2.4) * 0.12);
    if (armL.current) armL.current.rotation.x = Math.sin(t * 1.1) * 0.05;
    if (armR.current) armR.current.rotation.x = Math.sin(t * 1.1 + 1.4) * 0.05 - 0.08;
    if (ringA.current) ringA.current.rotation.z = t * 0.25;
    if (ringB.current) ringB.current.rotation.z = -t * 0.18;
    if (antenna.current) antenna.current.visible = (t % 1.6) < 0.8;

    if (bars.current) {
      for (let i = 0; i < 8; i++) {
        const hgt = 0.05 + 0.2 * (0.5 + 0.5 * Math.sin(t * (1.2 + i * 0.37) + i));
        dummy.position.set(-0.21 + i * 0.06, -0.12 + hgt / 2, 0.01);
        dummy.scale.set(1, hgt, 1);
        dummy.updateMatrix();
        bars.current.setMatrixAt(i, dummy.matrix);
      }
      bars.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={root} position={[2.1, -1.9, 2.2]}>
      {/* Local lights so the robot is lit wherever it travels */}
      <pointLight position={[-1.2, 2.6, -1]} color="#22d3ee" intensity={6} distance={5} />
      <pointLight position={[1.4, 1.6, 1.6]} color="#93c5fd" intensity={3} distance={5} />

      {/* Fake volumetric beam from above */}
      <mesh position={[0, 3.2, -0.2]}>
        <cylinderGeometry args={[0.35, 1.3, 3.6, 32, 1, true]} />
        <meshBasicMaterial
          color="#60a5fa"
          alphaMap={beamTexture()}
          transparent
          opacity={0.08}
          blending={AdditiveBlending}
          depthWrite={false}
          side={DoubleSide}
        />
      </mesh>

      {/* Hover base */}
      <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.glow}>
        <torusGeometry args={[0.42, 0.014, 12, 64]} />
      </mesh>
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 48]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={0.12} blending={AdditiveBlending} depthWrite={false} />
      </mesh>

      <group ref={body}>
        {/* Spine + pelvis */}
        <mesh position={[0, 0.5, 0]} material={mats.graphite}>
          <cylinderGeometry args={[0.2, 0.1, 0.5, 24]} />
        </mesh>
        <mesh position={[0, 0.82, 0]} material={mats.carbon}>
          <sphereGeometry args={[0.21, 24, 16]} />
        </mesh>
        <mesh position={[0, 0.96, 0]} material={mats.carbon}>
          <cylinderGeometry args={[0.2, 0.22, 0.2, 24]} />
        </mesh>
        <mesh position={[0, 0.96, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.glow}>
          <torusGeometry args={[0.215, 0.005, 8, 48]} />
        </mesh>

        {/* Torso */}
        <group ref={torso} position={[0, 1.25, 0]}>
          <RoundedBox args={[0.78, 0.66, 0.42]} radius={0.14} smoothness={4} material={mats.shell} />
          <RoundedBox args={[0.5, 0.36, 0.05]} radius={0.04} position={[0, 0.06, 0.2]} material={mats.carbon} />
          {[-0.28, 0.28].map((x) => (
            <mesh key={x} position={[x, 0.02, 0.212]} material={mats.glow}>
              <boxGeometry args={[0.012, 0.34, 0.01]} />
            </mesh>
          ))}
          <mesh position={[0, -0.2, 0.215]} material={mats.glow}>
            <boxGeometry args={[0.3, 0.01, 0.01]} />
          </mesh>
          <mesh position={[0, 0.06, 0.232]} material={mats.glow}>
            <torusGeometry args={[0.075, 0.009, 10, 40]} />
          </mesh>
          <mesh ref={core} position={[0, 0.06, 0.23]} material={mats.eye}>
            <sphereGeometry args={[0.035, 16, 12]} />
          </mesh>
        </group>

        <Arm side={-1} mats={mats} armRef={armL} />
        <Arm side={1} mats={mats} armRef={armR} />

        {/* Neck + head */}
        <mesh position={[0, 1.66, 0]} material={mats.carbon}>
          <cylinderGeometry args={[0.065, 0.08, 0.16, 16]} />
        </mesh>
        <group ref={head} position={[0, 1.9, 0]}>
          <mesh material={mats.shell} scale={[1, 0.9, 0.95]}>
            <sphereGeometry args={[0.26, 40, 28]} />
          </mesh>
          <RoundedBox args={[0.4, 0.15, 0.12]} radius={0.06} smoothness={4} position={[0, 0.01, 0.19]} material={mats.visor} />
          <group ref={eyes} position={[0, 0.01, 0.252]}>
            {[-0.075, 0.075].map((x) => (
              <mesh key={x} position={[x, 0, 0]} material={mats.eye} scale={[1.6, 1, 1]}>
                <sphereGeometry args={[0.018, 12, 10]} />
              </mesh>
            ))}
          </group>
          {[-1, 1].map((s) => (
            <group key={s} position={[s * 0.255, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <mesh material={mats.graphite}>
                <cylinderGeometry args={[0.07, 0.07, 0.06, 24]} />
              </mesh>
              <mesh position={[0, s * 0.032, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.glow}>
                <torusGeometry args={[0.05, 0.005, 8, 32]} />
              </mesh>
            </group>
          ))}
          <mesh position={[0.16, 0.3, -0.04]} rotation={[0, 0, -0.25]} material={mats.graphite}>
            <cylinderGeometry args={[0.006, 0.01, 0.2, 8]} />
          </mesh>
          <mesh ref={antenna} position={[0.186, 0.4, -0.04]} material={mats.eye}>
            <sphereGeometry args={[0.016, 10, 8]} />
          </mesh>
        </group>
      </group>

      {/* Holographic interface */}
      <mesh ref={ringA} position={[0, 1.1, 0]} rotation={[Math.PI / 2.15, 0, 0]} material={mats.holo}>
        <torusGeometry args={[0.95, 0.004, 6, 96, Math.PI * 1.6]} />
      </mesh>
      <mesh ref={ringB} position={[0, 1.1, 0]} rotation={[Math.PI / 1.85, 0.2, 0]} material={mats.holo}>
        <torusGeometry args={[1.12, 0.003, 6, 96, Math.PI * 1.1]} />
      </mesh>

      <group ref={hud}>
        <group position={[-1.05, 0.72, 0.25]} rotation={[0, 0.35, 0]}>
          <mesh>
            <planeGeometry args={[0.56, 0.34]} />
            <meshBasicMaterial color="#0b1b33" transparent opacity={0.55} depthWrite={false} />
          </mesh>
          <instancedMesh ref={bars} args={[undefined, undefined, 8]} material={mats.holo}>
            <boxGeometry args={[0.035, 1, 0.005]} />
          </instancedMesh>
        </group>
        {LABELS.map((l) => (
          <HoloLabel key={l.text} text={l.text} position={l.pos} height={0.1} />
        ))}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[connectors, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#38bdf8" transparent opacity={0.35} depthWrite={false} />
        </lineSegments>
      </group>
    </group>
  );
}
