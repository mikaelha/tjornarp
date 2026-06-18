// Generates public/og-default.png (1200×630) — the default social-share card.
// Run: node scripts/make-og.mjs  (requires Node >=22, uses Astro's bundled sharp)
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../public/og-default.png', import.meta.url));

// Brand palette (mirrors the Tailwind tokens used across the site).
const forest700 = '#2d4f40';
const forest800 = '#243e32';
const forest500 = '#4a7a63';
const lake400 = '#6aa0b3';
const wheat300 = '#e9c878';
const cream = '#f7f1e4';

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${forest700}"/>
      <stop offset="1" stop-color="${forest800}"/>
    </linearGradient>
    <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${lake400}"/>
      <stop offset="1" stop-color="#3f7689"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- sun -->
  <circle cx="1040" cy="150" r="64" fill="${wheat300}" opacity="0.9"/>

  <!-- wordmark -->
  <text x="90" y="300" font-family="Georgia, 'Times New Roman', serif" font-weight="700"
        font-size="150" fill="${cream}" letter-spacing="-2">Tjörnarp</text>
  <text x="96" y="372" font-family="Georgia, 'Times New Roman', serif" font-style="italic"
        font-size="54" fill="${wheat300}">byn vid sjön</text>

  <!-- landscape band -->
  <path d="M0 430 C 220 392 420 420 640 402 C 860 384 1040 420 1200 400 L1200 630 L0 630Z" fill="${forest500}"/>
  <!-- church on the rise -->
  <g transform="translate(560 412) scale(1.5)">
    <rect x="-6" y="-2" width="34" height="40" fill="${cream}"/>
    <rect x="2" y="-22" width="14" height="22" fill="${cream}"/>
    <path d="M2 -22 L9 -40 L16 -22 Z" fill="#c16e44"/>
    <rect x="6.5" y="-15" width="3" height="3" fill="#3f7689"/>
  </g>
  <!-- lake -->
  <path d="M0 520 C 300 500 560 504 760 524 C 940 540 1080 536 1200 522 L1200 600 C 1040 614 860 618 660 606 C 460 594 220 598 0 580 Z" fill="url(#lake)"/>
  <!-- trees -->
  <g fill="${forest800}">
    <path d="M980 512 l20 -56 20 56 z"/>
    <path d="M1014 520 l16 -46 16 46 z"/>
    <path d="M70 528 l22 -58 22 58 z"/>
  </g>

  <!-- url -->
  <text x="90" y="600" font-family="Helvetica, Arial, sans-serif" font-weight="600"
        font-size="34" fill="${cream}" opacity="0.92">tjornarp.com</text>
</svg>`;

await sharp(Buffer.from(svg)).resize(1200, 630).png().toFile(out);
console.log('Wrote', out);
