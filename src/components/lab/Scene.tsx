'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Grid, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from '@react-three/postprocessing';
import { Vector2 } from 'three';
import CameraRig from './CameraRig';
import Robot from './Robot';
import NeuralNetwork from './NeuralNetwork';
import Particles from './Particles';
import CapabilityHub from './stations/CapabilityHub';
import SkillCore from './stations/SkillCore';
import FlowStation from './stations/FlowStation';
import ProjectModules from './stations/ProjectModules';
import DataPath from './stations/DataPath';
import Terminal from './stations/Terminal';
import { STATIONS, Tier, stationIndex } from './layout';
import { pipelines } from '@/lib/labContent';
import { pointer, scroll } from '@/lib/labStore';

const at = (id: string) => STATIONS[stationIndex(id)].target;

// Maps window scroll to a float station index: f = i exactly when section i is centred.
function useScrollStations(invalidate: () => void) {
  useEffect(() => {
    let centers: number[] = [];
    const measure = () => {
      const vh = window.innerHeight;
      centers = STATIONS.map((s, i) => {
        const el = document.getElementById(s.id);
        if (!el || i === 0) return 0;
        const r = el.getBoundingClientRect();
        const c = r.top + window.scrollY + r.height / 2 - vh / 2;
        return i === STATIONS.length - 1 ? Math.min(c, document.documentElement.scrollHeight - vh) : c;
      });
      for (let i = 1; i < centers.length; i++) centers[i] = Math.max(centers[i], centers[i - 1] + 1);
      update();
    };
    const update = () => {
      const y = window.scrollY;
      let i = 0;
      while (i < centers.length - 2 && y >= centers[i + 1]) i++;
      const u = (y - centers[i]) / (centers[i + 1] - centers[i]);
      scroll.f = Math.max(0, Math.min(centers.length - 1, i + u));
      scroll.progress = scroll.f / (centers.length - 1);
      invalidate();
    };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('pointermove', onPointer, { passive: true });
    measure();
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', measure);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [invalidate]);
}

function ScrollBridge() {
  const invalidate = useThree((s) => s.invalidate);
  useScrollStations(invalidate);
  return null;
}

// Only mount a station once the camera is within reach; keeps first frames and texture loads light.
function Near({ id, children, range = 1.6 }: { id: string; children: React.ReactNode; range?: number }) {
  const [near, setNear] = useState(false);
  const idx = stationIndex(id);
  useFrame(() => {
    if (!near && Math.abs(scroll.f - idx) < range) setNear(true);
  });
  return near ? <>{children}</> : null;
}

const CA_OFFSET = new Vector2(0.0005, 0.0006);

export default function Scene({ tier: initialTier, reduced }: { tier: Tier; reduced: boolean }) {
  const [tier, setTier] = useState<Tier>(initialTier);

  return (
    <Canvas
      dpr={tier === 'high' ? [1, 1.75] : 1}
      frameloop={reduced ? 'demand' : 'always'}
      gl={{ antialias: tier !== 'high', powerPreference: 'high-performance', alpha: false }}
      camera={{ fov: 45, near: 0.1, far: 90, position: [0, 0.35, 8] }}
    >
      <color attach="background" args={['#05070d']} />
      <fogExp2 attach="fog" args={['#05070d', 0.058]} />
      <PerformanceMonitor onDecline={() => setTier((t) => (t === 'high' ? 'mid' : t))} />
      <ScrollBridge />
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

      <Particles count={tier === 'high' ? 2400 : 900} />
      <Robot />

      <NeuralNetwork position={[0, 0.6, -9]} nodeSize={0.07} pulses={tier === 'high' ? 150 : 70} />
      <Near id="about">
        <CapabilityHub position={at('about')} />
        <NeuralNetwork position={[-3, 0.5, -30]} layers={[5, 8, 8, 5]} spread={[9, 4, 3]} pulses={30} seed={19} />
      </Near>
      <Near id="skills">
        <SkillCore position={at('skills')} />
      </Near>
      <Near id="ml-lab">
        <FlowStation position={at('ml-lab')} stages={pipelines.ml} color="#3b82f6" variant="ml" />
      </Near>
      <Near id="nlp-lab">
        <FlowStation position={at('nlp-lab')} stages={pipelines.nlp} color="#22d3ee" variant="nlp" />
      </Near>
      <Near id="llm-lab">
        <FlowStation position={at('llm-lab')} stages={pipelines.rag} color="#8b5cf6" variant="rag" />
      </Near>
      <Near id="vision-lab">
        <FlowStation position={at('vision-lab')} stages={pipelines.cv} color="#34d399" variant="cv" />
      </Near>
      <Near id="projects">
        <Suspense fallback={null}>
          <ProjectModules position={at('projects')} />
        </Suspense>
      </Near>
      <Near id="experience">
        <DataPath position={at('experience')} />
      </Near>
      <Near id="contact">
        <Terminal position={at('contact')} />
      </Near>

      {tier === 'high' && (
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur luminanceThreshold={0.85} luminanceSmoothing={0.2} intensity={0.9} radius={0.7} />
          <ChromaticAberration offset={CA_OFFSET} radialModulation={false} modulationOffset={0} />
          <Vignette eskil={false} offset={0.2} darkness={0.75} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
