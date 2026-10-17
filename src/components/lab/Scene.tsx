'use client';

import { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Grid, Lightformer, PerformanceMonitor } from '@react-three/drei';
import CameraRig from './CameraRig';
import Robot from './Robot';
import NeuralNetwork from './NeuralNetwork';
import Particles from './Particles';
import type { Tier } from './layout';
import { pointer } from '@/lib/labStore';

// Writes the pointer in NDC; invalidate keeps the 'demand' (reduced-motion) loop responsive.
function PointerBridge() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      invalidate();
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => window.removeEventListener('pointermove', onPointer);
  }, [invalidate]);
  return null;
}

export default function Scene({ tier: initialTier, reduced, active }: { tier: Tier; reduced: boolean; active: boolean }) {
  const [tier, setTier] = useState<Tier>(initialTier);

  return (
    <Canvas
      dpr={tier === 'high' ? [1, 1.75] : 1}
      frameloop={!active ? 'never' : reduced ? 'demand' : 'always'}
      gl={{ antialias: tier !== 'high', powerPreference: 'high-performance', alpha: false }}
      camera={{ fov: 45, near: 0.1, far: 90, position: [0, 0.35, 8] }}
    >
      <color attach="background" args={['#05070d']} />
      <fogExp2 attach="fog" args={['#05070d', 0.058]} />
      <PerformanceMonitor onDecline={() => setTier((t) => (t === 'high' ? 'mid' : t))} />
      <PointerBridge />
      <CameraRig reduced={reduced} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#dbeafe" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={2} position={[0, 5, 2]} scale={[8, 2, 1]} color="#e0f2fe" />
        <Lightformer form="rect" intensity={1.4} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[4, 3, 1]} color="#3b82f6" />
        <Lightformer form="rect" intensity={1} position={[5, 0, -1]} rotation-y={-Math.PI / 2} scale={[4, 3, 1]} color="#8b5cf6" />
      </Environment>

      <Grid
        position={[0, -2.6, 0]}
        args={[10, 10]}
        infiniteGrid
        followCamera
        cellSize={0.6}
        cellThickness={0.6}
        cellColor="#0f2542"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#1e40af"
        fadeDistance={34}
        fadeStrength={1.6}
      />

      <Particles count={tier === 'high' ? 900 : 350} />
      <Robot />

      <NeuralNetwork position={[0, 0.6, -9]} nodeSize={0.07} pulses={tier === 'high' ? 150 : 70} />

    </Canvas>
  );
}
