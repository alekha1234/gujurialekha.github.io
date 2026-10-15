'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  AdditiveBlending,
  BufferAttribute,
  Color,
  Group,
  InstancedMesh,
  MathUtils,
  Object3D,
  Points,
  Vector3,
} from 'three';
import { dotTexture } from './textures';
import { pointer } from '@/lib/labStore';

interface Props {
  position?: [number, number, number];
  layers?: number[];
  spread?: [number, number, number];
  pulses?: number;
  nodeSize?: number;
  fanout?: number;
  reactive?: boolean;
  seed?: number;
}

// Deterministic PRNG so the network layout is stable across renders.
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

const tmp = new Vector3();
const COLD = new Color('#3b82f6');
const WARM = new Color('#a78bfa');
const CYAN = new Color('#22d3ee');

export default function NeuralNetwork({
  position = [0, 0, 0],
  layers = [7, 11, 13, 11, 8, 5],
  spread = [22, 8, 6],
  pulses = 140,
  nodeSize = 0.09,
  fanout = 3,
  reactive = true,
  seed = 7,
}: Props) {
  const group = useRef<Group>(null);
  const nodesRef = useRef<InstancedMesh>(null);
  const pulsesRef = useRef<Points>(null);

  const net = useMemo(() => {
    const rand = rng(seed);
    const nodes: Vector3[] = [];
    const layerOf: number[] = [];
    const byLayer: number[][] = [];
    layers.forEach((count, li) => {
      byLayer.push([]);
      const x = -spread[0] / 2 + (li * spread[0]) / Math.max(1, layers.length - 1);
      for (let k = 0; k < count; k++) {
        const y = -spread[1] / 2 + ((k + 0.5) * spread[1]) / count + (rand() - 0.5) * 0.4;
        const z = (rand() - 0.5) * spread[2];
        byLayer[li].push(nodes.length);
        layerOf.push(li);
        nodes.push(new Vector3(x + (rand() - 0.5) * 0.6, y, z));
      }
    });
    const edges: [number, number][] = [];
    const out: number[][] = nodes.map(() => []);
    for (let li = 0; li < layers.length - 1; li++) {
      for (const a of byLayer[li]) {
        const nextL = byLayer[li + 1];
        const picks = new Set<number>();
        while (picks.size < Math.min(fanout, nextL.length)) picks.add(nextL[Math.floor(rand() * nextL.length)]);
        picks.forEach((b) => {
          out[a].push(edges.length);
          edges.push([a, b]);
        });
      }
    }
    const pos = new Float32Array(edges.length * 6);
    const col = new Float32Array(edges.length * 6);
    const c = new Color();
    edges.forEach(([a, b], i) => {
      nodes[a].toArray(pos, i * 6);
      nodes[b].toArray(pos, i * 6 + 3);
      c.copy(COLD).lerp(WARM, layerOf[a] / layers.length).toArray(col, i * 6);
      c.copy(COLD).lerp(WARM, layerOf[b] / layers.length).toArray(col, i * 6 + 3);
    });
    const colors = nodes.map((_, i) => new Color().copy(COLD).lerp(CYAN, layerOf[i] % 2 ? 0.6 : 0.1).multiplyScalar(1.25));
    return { nodes, edges, out, pos, col, colors, first: byLayer[0] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layers.join(), spread.join(), fanout, seed]);

  const state = useMemo(() => {
    const rand = rng(seed + 11);
    const p = Array.from({ length: pulses }, () => ({
      edge: Math.floor(rand() * net.edges.length),
      t: rand(),
      speed: 0.25 + rand() * 0.45,
    }));
    return { p, scales: new Float32Array(net.nodes.length).fill(1), buf: new Float32Array(pulses * 3) };
  }, [pulses, net, seed]);

  const dummy = useMemo(() => new Object3D(), []);

  useFrame(({ clock, camera }, dt) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime;
    g.rotation.y = Math.sin(t * 0.05) * 0.08 + (reactive ? pointer.x * 0.04 : 0);
    g.rotation.x = reactive ? -pointer.y * 0.02 : 0;
    g.updateMatrixWorld();

    // Nodes near the cursor (in screen space) swell slightly.
    const inst = nodesRef.current;
    if (inst) {
      net.nodes.forEach((n, i) => {
        let target = 1;
        if (reactive) {
          tmp.copy(n).applyMatrix4(g.matrixWorld).project(camera);
          const d = Math.hypot((tmp.x - pointer.x) * 1.6, tmp.y - pointer.y);
          target = 1 + Math.max(0, 1 - d / 0.14) * 1.4;
        }
        state.scales[i] = MathUtils.damp(state.scales[i], target, 6, dt);
        dummy.position.copy(n);
        dummy.scale.setScalar(state.scales[i] * (1 + Math.sin(t * 2 + i) * 0.08));
        dummy.updateMatrix();
        inst.setMatrixAt(i, dummy.matrix);
      });
      inst.instanceMatrix.needsUpdate = true;
    }

    // Data pulses hop edge to edge, forward through the layers.
    const pts = pulsesRef.current;
    if (pts) {
      state.p.forEach((p, i) => {
        p.t += p.speed * dt;
        if (p.t >= 1) {
          const end = net.edges[p.edge][1];
          const outs = net.out[end];
          p.edge = outs.length
            ? outs[Math.floor(Math.random() * outs.length)]
            : net.out[net.first[Math.floor(Math.random() * net.first.length)]][0] ?? 0;
          p.t = 0;
        }
        const [a, b] = net.edges[p.edge];
        tmp.copy(net.nodes[a]).lerp(net.nodes[b], p.t).toArray(state.buf, i * 3);
      });
      (pts.geometry.attributes.position as BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <group ref={group} position={position}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[net.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[net.col, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.14} blending={AdditiveBlending} depthWrite={false} />
      </lineSegments>

      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, net.nodes.length]}
        onUpdate={(m) => {
          net.colors.forEach((c, i) => m.setColorAt(i, c));
          if (m.instanceColor) m.instanceColor.needsUpdate = true;
        }}
      >
        <sphereGeometry args={[nodeSize, 12, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      {pulses > 0 && (
        <points ref={pulsesRef} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[state.buf, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={nodeSize * 2.4}
            map={dotTexture()}
            color={new Color('#a5f3fc').multiplyScalar(2.5)}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
            toneMapped={false}
          />
        </points>
      )}
    </group>
  );
}
