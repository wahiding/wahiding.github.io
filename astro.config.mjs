import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pages kept out of the sitemap. Unfinished persona pages are not built at all: they live in
// src/pages/_filmmaker.astro, _psychology.astro and _collector.astro (underscore = not routed).
// /avyantar-ch1/ is only a redirect to the new Chapter 1 page.
const hidden = ['/404/', '/avyantar-ch1/'];

export default defineConfig({
  site: 'https://wahiding.github.io',
  // Keep the novel's punctuation exactly as written (no curly quotes or dash substitution).
  markdown: { smartypants: false },
  redirects: {
    '/avyantar-ch1': '/avyantar/1/',
  },
  integrations: [
    sitemap({ filter: (page) => !hidden.some((h) => page.endsWith(h)) }),
  ],
});
