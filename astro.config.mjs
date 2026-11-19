import { defineConfig } from 'astro/config';

// GitHub Pages: https://arunsherzai.github.io/cv-website/
// Bei einer eigenen Domain später `site` ändern und `base` auf '/' setzen.
export default defineConfig({
  site: 'https://arunsherzai.github.io',
  base: '/cv-website/',
  server: { port: 4321 },
});
