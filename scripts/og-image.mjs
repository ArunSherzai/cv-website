// Erzeugt das Open-Graph-Bild (1200×630) im Stil der Seite: public/og-image.png
// Rendert HTML mit den selbst gehosteten Schriften in einem lokal installierten Chrome.
// Aufruf: node scripts/og-image.mjs   (optional CHROME_PATH setzen)
import { readFileSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const chrome =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const b64 = (path) => readFileSync(path).toString('base64');
const serif = b64('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2');
const sans = b64('node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2');
const logo = b64('assets/brand/logo-as.png');

// Texte laut BRIEF.md 4.1 (Name und Hero-Satz), nichts ergänzt.
const html = `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><style>
  @font-face { font-family: 'Instrument Serif'; src: url(data:font/woff2;base64,${serif}) format('woff2'); }
  @font-face { font-family: 'Geist'; src: url(data:font/woff2;base64,${sans}) format('woff2'); font-weight: 100 900; }
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    background: #f5f5f7; color: #1d1d1f;
    padding: 72px 88px;
    display: flex; flex-direction: column; justify-content: space-between;
    -webkit-font-smoothing: antialiased;
  }
  img { width: 72px; height: 72px; border-radius: 14px; display: block; }
  h1 {
    font-family: 'Instrument Serif', serif; font-weight: 400;
    font-size: 148px; line-height: 0.95; letter-spacing: -0.025em;
  }
  p {
    margin-top: 28px; max-width: 900px;
    font-family: 'Geist', sans-serif; font-size: 31px; line-height: 1.4; color: #1d1d1f;
  }
</style></head><body>
  <img src="data:image/png;base64,${logo}" alt="">
  <div>
    <h1>Arun Sherzai</h1>
    <p>Informatik-Student an der FH Technikum Wien. Ich baue Apps mit sauberen Oberflächen, durchdachten Animationen und einem Backend, das mitspielt.</p>
  </div>
</body></html>`;

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og-image.png', type: 'png' });
await browser.close();
console.log('public/og-image.png erzeugt');
