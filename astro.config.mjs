import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ivomynttinen.com',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'always',
    format: 'directory'
  },
  integrations: [
    mdx(),
    sitemap()
  ],
  devToolbar: {
    enabled: false
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'rose-pine-dawn',
        dark: 'rose-pine',
      },
      // Enable word wrap to prevent horizontal scrolling
      wrap: true
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  }
});
