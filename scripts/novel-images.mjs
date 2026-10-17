// Resize the chapter banner images for the website.
// Input:  Resources/Novel/images/ files named like "chapter-N.png" or "Chapt N anything.png" (N = 1..9)
// Output: public/images/novel/chapter-N.jpg  (16:9, 1600px wide, compressed)
// Usage:  node scripts/novel-images.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const srcDir = 'Resources/Novel/images';
const outDir = 'public/images/novel';
fs.mkdirSync(outDir, { recursive: true });

const nameRe = /^chap(?:ter|t)?[-_ ]*(\d+).*\.(jpe?g|png|webp)$/i;
const files = fs.readdirSync(srcDir).filter((f) => nameRe.test(f));
if (!files.length) {
  console.log(`No chapter-N images found in ${srcDir}`);
  process.exit(0);
}

for (const f of files.sort()) {
  const n = f.match(nameRe)[1];
  const out = path.join(outDir, `chapter-${n}.jpg`);
  await sharp(path.join(srcDir, f))
    .resize(1600, 900, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  console.log(`${f} -> ${out} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`);
}
