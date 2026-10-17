'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { HERO, rig } from './layout';
import { pointer } from '@/lib/labStore';

const { damp } = MathUtils;
const look = new Vector3(...HERO.target);

export default function CameraRig({ reduced }: { reduced: boolean }) {
  const { camera, size } = useThree();
  const narrow = size.width < 900;

  useFrame((_, dt) => {
    rig.narrow = narrow;
    rig.base.set(look.x, look.y + 0.35, look.z + HERO.dist + (narrow ? 2.5 : 0));

    const px = reduced ? 0 : pointer.x * 0.32;
    const py = reduced ? 0 : pointer.y * 0.18;
    camera.position.set(
      damp(camera.position.x, rig.base.x + px, 4, dt),
      damp(camera.position.y, rig.base.y + py, 4, dt),
      rig.base.z
    );
    camera.lookAt(look);
  });

  return null;
}
