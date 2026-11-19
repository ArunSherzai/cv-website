// Zentrale Angaben, die an mehreren Stellen gebraucht werden.
/** Pfad zu einer Datei in public/, mit Basis-Pfad (GitHub Pages liegt unter /cv-website/). */
export const asset = (path: string) =>
  import.meta.env.BASE_URL.replace(/\/?$/, '/') + path.replace(/^\//, '');

export const site = {
  name: 'Arun Sherzai',
  title: 'Arun Sherzai · Informatik-Student in Wien',
  description:
    'Informatik-Student an der FH Technikum Wien. Ich baue Apps mit sauberen Oberflächen, durchdachten Animationen und einem Backend, das mitspielt.',
  email: 'arunsherzai@gmail.com',
  github: 'https://github.com/ArunSherzai',
  // Offener Punkt aus BRIEF.md: aktueller Lebenslauf fehlt noch.
  // Sobald das PDF in public/ liegt, hier den Pfad eintragen (z. B. '/lebenslauf-arun-sherzai.pdf').
  // Solange null, wird der Button nicht angezeigt.
  cvPdf: asset('Lebenslauf_Arun_Sherzai.pdf') as string | null,
};

export const navLinks = [
  { href: '#projekte', label: 'Projekte' },
  { href: '#erfahrung', label: 'Erfahrung' },
  { href: '#ausbildung', label: 'Ausbildung' },
  { href: '#kontakt', label: 'Kontakt' },
];
