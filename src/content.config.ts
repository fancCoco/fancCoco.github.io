import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const publishing = {
  draft: z.boolean().default(true),
};

const publicationSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  venue: z.string(),
  year: z.number(),
  type: z.enum(['conference', 'journal', 'workshop', 'preprint', 'thesis']),
  topics: z.array(z.string()).default([]),
  status: z.enum(['published', 'accepted', 'under-review', 'preprint']),
  selected: z.boolean().default(false),
  featuredOrder: z.number().optional(),
  image: z.string().optional(),
  abstract: z.string().optional(),
  doi: z.string().optional(),
  paperUrl: z.string().url().optional(),
  projectId: z.string().optional(),
  projectUrl: z.string().url().optional(),
  codeUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  slidesUrl: z.string().url().optional(),
  bibtex: z.string().optional(),
});

const projectSchema = z.object({
  title: z.string(),
  summary: z.string(),
  status: z.enum(['completed', 'ongoing', 'planned']),
  period: z.string(),
  topics: z.array(z.string()),
  featured: z.boolean().default(false),
  cover: z.string().optional(),
  links: z
    .object({
      paper: z.string().url().optional(),
      code: z.string().url().optional(),
      demo: z.string().url().optional(),
      video: z.string().url().optional(),
    })
    .default({}),
});

const newsSchema = z.object({
  date: z.coerce.date(),
  title: z.string(),
  category: z.enum(['publication', 'talk', 'education', 'award', 'project']),
  link: z.string().optional(),
  featured: z.boolean().default(false),
});

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.{md,mdx}' }),
  schema: publicationSchema.extend(publishing),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: projectSchema.extend(publishing),
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: newsSchema.extend(publishing),
});

const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.md' }),
  schema: z
    .object({
      title: z.string(),
      summary: z.string(),
      order: z.number().int(),
    })
    .extend(publishing),
});

export const collections = { publications, projects, news, research };
