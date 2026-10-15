'use client';

import { useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CatmullRomCurve3, MathUtils, Vector3 } from 'three';
import { rig, smoothstep, stationIndex, STATIONS } from './layout';
import { getLab, pointer, scroll } from '@/lib/labStore';

const { damp } = MathUtils;
const pos = new Vector3();
const look = new Vector3();
const lookNow = new Vector3(0, 0, 0);
const PROJECTS = stationIndex('projects');

export default function CameraRig({ reduced }: { reduced: boolean }) {
  const { camera, size } = useThree();
  const narrow = size.width < 900;

  const curves = useMemo(() => {
    const shift = narrow ? 0 : 2.35;
    const looks = STATIONS.map((s) => new Vector3(s.target[0] - s.side * shift, s.target[1], s.target[2]));
    const cams = STATIONS.map((s, i) => looks[i].clone().add(new Vector3(0, 0.35, (s.dist ?? 7) + (narrow ? 2.5 : 0))));
    return { cam: new CatmullRomCurve3(cams), look: new CatmullRomCurve3(looks) };
  }, [narrow]);

  useFrame((_, dt) => {
    const n = STATIONS.length;
    const f = MathUtils.clamp(scroll.f, 0, n - 1);
    const seg = Math.min(Math.floor(f), n - 2);
    const ease = smoothstep(f - seg);
    const t = (seg + ease) / (n - 1);
    rig.seg = seg;
    rig.ease = ease;
    rig.f = f;
    rig.narrow = narrow;

    curves.cam.getPoint(t, pos);
    curves.look.getPoint(t, look);

    // Lean in toward whatever project is being inspected.
    if (getLab().activeProject && Math.abs(f - PROJECTS) < 0.6) pos.lerp(look, 0.12);

    const k = reduced ? 1000 : 2.6;
    rig.base.set(damp(rig.base.x, pos.x, k, dt), damp(rig.base.y, pos.y, k, dt), damp(rig.base.z, pos.z, k, dt));
    lookNow.set(damp(lookNow.x, look.x, k, dt), damp(lookNow.y, look.y, k, dt), damp(lookNow.z, look.z, k, dt));

    const px = reduced ? 0 : pointer.x * 0.32;
    const py = reduced ? 0 : pointer.y * 0.18;
    camera.position.set(
      damp(camera.position.x, rig.base.x + px, 4, dt),
      damp(camera.position.y, rig.base.y + py, 4, dt),
      rig.base.z
    );
    camera.lookAt(lookNow);
  });

  return null;
}
