// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  adapter: node({
    mode: 'standalone',
  }),

  integrations: [mdx()],
  server: {
    host: '::', // needed for railway
  },
});
