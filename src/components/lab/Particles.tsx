'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { AdditiveBlending, Color, ShaderMaterial } from 'three';
import { pointer } from '@/lib/labStore';

const vertex = /* glsl */ `
uniform float uTime;
uniform vec2 uPointer;
uniform float uPixelRatio;
attribute float aSeed;
attribute vec3 aColor;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec3 p = position;
  p.y += sin(uTime * 0.2 + aSeed * 6.28) * 0.25;
  p.x += cos(uTime * 0.15 + aSeed * 12.0) * 0.25;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec4 clip = projectionMatrix * mv;
  // Repel from the cursor in screen space.
  vec2 d = clip.xy / clip.w - uPointer;
  float push = smoothstep(0.22, 0.0, length(d * vec2(1.6, 1.0))) * 0.05;
  clip.xy += normalize(d + 1e-5) * push * clip.w;
  gl_Position = clip;
  gl_PointSize = (1.2 + aSeed * 2.0) * uPixelRatio * (9.0 / -mv.z);
  float twinkle = 0.6 + 0.4 * sin(uTime * 1.5 + aSeed * 40.0);
  vAlpha = twinkle * smoothstep(55.0, 6.0, -mv.z) * smoothstep(0.3, 1.5, -mv.z);
  vColor = aColor;
}`;

const fragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
  float r = length(gl_PointCoord - 0.5);
  gl_FragColor = vec4(vColor, smoothstep(0.5, 0.0, r) * vAlpha);
}`;

export default function Particles({ count = 2000 }: { count?: number }) {
  const mat = useRef<ShaderMaterial>(null);
  const dpr = useThree((s) => s.viewport.dpr);

  const { pos, seed, color } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const color = new Float32Array(count * 3);
    const palette = ['#3b82f6', '#22d3ee', '#8b5cf6', '#e2e8f0'].map((h) => new Color(h));
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 36;
      pos[i * 3 + 1] = -7 + Math.random() * 16;
      pos[i * 3 + 2] = 12 - Math.random() * 158;
      seed[i] = Math.random();
      palette[i % 7 === 0 ? 2 : i % 5 === 0 ? 3 : i % 2].toArray(color, i * 3);
    }
    return { pos, seed, color };
  }, [count]);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPointer: { value: [0, 0] }, uPixelRatio: { value: dpr } }),
    [dpr]
  );

  useFrame(({ clock }) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = clock.elapsedTime;
    mat.current.uniforms.uPointer.value = [pointer.x, pointer.y];
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seed, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[color, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
