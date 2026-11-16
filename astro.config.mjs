import { defineConfig } from 'astro/config';

export default defineConfig({
  // `site` wird beim Deployment gesetzt (Etappe 5).
  server: { port: 4321 },
});
