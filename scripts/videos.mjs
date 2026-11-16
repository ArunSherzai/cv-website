// Schneidet die Sprig-Videos auf die Karte zu (ohne Schatten und Rand) und komprimiert sie.
// Originale in assets/ bleiben unverändert. Aufruf: node scripts/videos.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import ffmpeg from 'ffmpeg-static';

const out = 'public/video';
mkdirSync(out, { recursive: true });

// Zuschnitt je Video (die Aufnahmen sind leicht unterschiedlich groß): Breite:Höhe:x:y
const videos = [
  { name: 'sprig-health-100', crop: '572:244:12:8' },
  { name: 'sprig-health-50', crop: '572:244:13:10' },
  { name: 'sprig-health-10', crop: '572:244:10:13' },
];

const run = (args) => execFileSync(ffmpeg, ['-v', 'error', '-y', ...args], { stdio: 'inherit' });

for (const v of videos) {
  const src = `assets/plantup/${v.name}.mp4`;
  const vf = `crop=${v.crop}`;
  run(['-i', src, '-an', '-vf', vf, '-c:v', 'libx264', '-crf', '27', '-preset', 'slow',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${out}/${v.name}.mp4`]);
  run(['-i', src, '-an', '-vf', vf, '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0',
    '-row-mt', '1', `${out}/${v.name}.webm`]);
  run(['-ss', '0.5', '-i', src, '-frames:v', '1', '-vf', vf, '-c:v', 'libwebp', '-quality', '80',
    `${out}/${v.name}.webp`]);
  console.log('fertig:', v.name);
}
