import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pages that are still draft: kept out of the sitemap (and marked noindex on the page itself).
const hidden = ['/filmmaker/', '/psychology/', '/collector/', '/404/'];

export default defineConfig({
  site: 'https://wahiding.github.io',
  integrations: [
    sitemap({ filter: (page) => !hidden.some((h) => page.endsWith(h)) }),
  ],
});
