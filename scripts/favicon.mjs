// Erzeugt Favicons aus dem Original-Logo. Das Original in assets/ bleibt unverändert.
import sharp from 'sharp';

const src = 'assets/brand/logo-as.png';
await sharp(src).resize(96, 96).png({ compressionLevel: 9 }).toFile('public/favicon.png');
await sharp(src).resize(180, 180).png({ compressionLevel: 9 }).toFile('public/apple-touch-icon.png');
console.log('Favicons erzeugt.');
