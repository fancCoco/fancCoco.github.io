# Fan Chen Academic Website

An English, static academic website template built with Astro and TypeScript. The public site intentionally contains only the name Fan Chen and generic placeholders until approved public content is added.

## Development

This project uses Node.js and npm. After installing dependencies:

```bash
npm run dev
npm run check
npm run build
```

The production site deploys to GitHub Pages through the workflow in `.github/workflows/deploy.yml`.

## Adding public content

- Site identity: `src/config.ts`
- Homepage template: `src/pages/index.astro`
- Research cards: `src/components/home/ResearchCards.astro`
- Content templates: `src/content/`
- Public assets: `public/`

The example content files are marked `draft: true` and are not rendered. Replace them only with information that is ready to be public. Keep private, unpublished, or unverified details out of the repository.

## Design direction

The light theme uses a restrained navy-and-gold palette. The dark theme uses an ink background with cool cyan and teal accents. Both themes prioritize readable content, strong focus states, reduced motion, and low JavaScript overhead.
