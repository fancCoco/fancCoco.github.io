# Fan Chen Academic Website

An English, static academic portfolio built with Astro, TypeScript, Tailwind CSS, and a small React island for publication filtering.

## Development

This project uses Node.js 24 and npm. After installing dependencies:

```bash
npm run dev
npm run check
npm run build
```

The production site is configured for the user-page repository `fancCoco.github.io` and deploys to `https://fanccoco.github.io` through GitHub Pages Actions.

## Content updates

- Site identity and external links: `src/config.ts`
- Publications: `src/content/publications/`
- Projects: `src/content/projects/`
- Research areas: `src/content/research/`
- News: `src/content/news/`
- Public assets: `public/`

Content defaults to `draft: true`; public entries must explicitly set `draft: false`. Optional paper, code, Scholar, email, CV, and profile links are omitted until verified and public.

## Design direction

The light theme uses a restrained Notre Dame-inspired navy and gold palette. The dark theme uses an ink background, cool cyan/teal accents, and a quiet technical grid influenced by the supplied Karthika Mohan reference. Both themes prioritize readable content, strong focus states, reduced motion, and low JavaScript overhead.

## Materials still to add

- Public headshot or approved profile image
- Public email address
- Google Scholar, GitHub, LinkedIn, and ORCID URLs
- Public CV PDF
- Verified paper, code, video, and slides URLs
- Approved project teasers or diagrams

No placeholder portrait, unverified academic link, or empty CV file is published by default.
