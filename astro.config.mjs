import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://fanccoco.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
