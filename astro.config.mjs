// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  adapter: node({
    mode: 'standalone',
  }),

  integrations: [mdx(), react()],
  server: {
    host: '::', // needed for railway
  },
});
