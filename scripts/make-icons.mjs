// Generates raster favicon fallbacks from public/favicon.svg.
// Run: node scripts/make-icons.mjs  (requires Node >=22, uses Astro's bundled sharp)
// SVG favicons aren't rendered by every browser, so we ship PNG + apple-touch-icon too.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const pub = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));
const svg = readFileSync(pub('favicon.svg'));
const cream = '#f7f1e4';

// Round icons keep transparency; render at high density for crisp downscaling.
for (const size of [16, 32, 192]) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(pub(`favicon-${size}.png`));
}

// Apple touch icon: iOS masks to a rounded square, so flatten onto the cream brand bg.
await sharp(svg, { density: 384 })
  .resize(180, 180)
  .flatten({ background: cream })
  .png()
  .toFile(pub('apple-touch-icon.png'));

console.log('Wrote favicon-16/32/192.png and apple-touch-icon.png');
