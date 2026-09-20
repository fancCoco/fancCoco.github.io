# Fan Chen Academic Website

An English, single-page academic website template built with Astro and TypeScript. The public site intentionally contains only the name Fan Chen and generic placeholders until approved public content is added.

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
- Home page template: `src/pages/index.astro`
- Research cards: `src/components/home/ResearchCards.astro`
- Content templates: `src/content/`
- Public assets: `public/`

The example content files are marked `draft: true` and are not rendered. The current public site uses only the Home page; the content folders are retained as future templates. Replace them only with information that is ready to be public. Keep private, unpublished, or unverified details out of the repository.

## Design direction

The single Home page is organized as Bio, News, Research, Publications, Projects, Theses & Dissertations, Patents, and Contact. The section rhythm is inspired by the referenced academic homepage while the content remains generic and private by default.

The light theme uses a restrained navy-and-gold palette. The dark theme uses an ink background with cool cyan and teal accents. Both themes prioritize readable content, strong focus states, reduced motion, and low JavaScript overhead.
