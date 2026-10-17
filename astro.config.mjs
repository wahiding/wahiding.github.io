import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pages kept out of the sitemap. Unfinished persona pages are not built at all: they live in
// src/pages/_filmmaker.astro, _psychology.astro and _collector.astro (underscore = not routed).
const hidden = ['/404/'];

export default defineConfig({
  site: 'https://wahiding.github.io',
  integrations: [
    sitemap({ filter: (page) => !hidden.some((h) => page.endsWith(h)) }),
  ],
});
