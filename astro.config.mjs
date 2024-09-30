import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ivomynttinen.com',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    mdx(),
    sitemap()
  ],
  devToolbar: {
    enabled: false
  }
});
