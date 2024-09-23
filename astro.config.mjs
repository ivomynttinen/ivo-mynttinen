import { defineConfig } from 'astro/config';
import matomo from 'astro-matomo';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ivomynttinen.com',
  integrations: [
    mdx(),
    sitemap(),
    matomo({
      enabled: import.meta.env.PROD, // Only load in production: 
      host: "https://matomo.hanglage-no8.de/",
      setCookieDomain: "*.ivomynttinen.com",
      siteId: 3,
      heartBeatTimer: 5,
      disableCookies: true,
      debug: false,
    }),
  ],
  devToolbar: {
    enabled: false
  }
});
