import { CanvasTexture, SRGBColorSpace } from 'three';

const monoFamily = () =>
  (typeof document !== 'undefined' &&
    getComputedStyle(document.body).getPropertyValue('--font-jetbrains-mono').trim()) ||
  'ui-monospace, monospace';

// Holographic label drawn to a canvas: thin frame, corner ticks, mono text.
export function labelTexture(text: string) {
  const color = '#7dd3fc';
  const width = 512;
  const h = 110;
  const c = document.createElement('canvas');
  c.width = width;
  c.height = h;
  const g = c.getContext('2d')!;
  const mono = monoFamily();
  g.fillStyle = 'rgba(6, 16, 34, 0.62)';
  g.fillRect(4, 4, width - 8, h - 8);
  g.strokeStyle = color + '66';
  g.lineWidth = 2;
  g.strokeRect(4, 4, width - 8, h - 8);
  g.strokeStyle = color;
  g.lineWidth = 4;
  const t = 18;
  for (const [x, y, dx, dy] of [
    [4, 4, 1, 1],
    [width - 4, 4, -1, 1],
    [4, h - 4, 1, -1],
    [width - 4, h - 4, -1, -1],
  ]) {
    g.beginPath();
    g.moveTo(x + dx * t, y);
    g.lineTo(x, y);
    g.lineTo(x, y + dy * t);
    g.stroke();
  }
  g.fillStyle = color;
  g.textBaseline = 'middle';
  let size = 44;
  g.font = `600 ${size}px ${mono}`;
  while (g.measureText(text).width > width - 56 && size > 18) {
    size -= 2;
    g.font = `600 ${size}px ${mono}`;
  }
  g.fillText(text, 28, h / 2 + 2);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return { tex, aspect: width / h };
}

let dot: CanvasTexture | null = null;
// Soft round sprite shared by every Points material.
export function dotTexture() {
  if (dot) return dot;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  dot = new CanvasTexture(c);
  return dot;
}

let vGrad: CanvasTexture | null = null;
// Vertical alpha gradient (bright at v=1) for fake volumetric beams.
export function beamTexture() {
  if (vGrad) return vGrad;
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 128;
  const g = c.getContext('2d')!;
  const grd = g.createLinearGradient(0, 128, 0, 0);
  grd.addColorStop(0, 'rgba(0,0,0,1)');
  grd.addColorStop(1, 'rgba(255,255,255,1)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 4, 128);
  vGrad = new CanvasTexture(c);
  return vGrad;
}
