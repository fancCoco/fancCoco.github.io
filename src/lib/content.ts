import { getCollection } from 'astro:content';

export async function publicPublications() {
  return (await getCollection('publications', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.year - a.data.year || a.data.title.localeCompare(b.data.title),
  );
}

export async function publicProjects() {
  return (await getCollection('projects', ({ data }) => !data.draft)).sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    return a.data.title.localeCompare(b.data.title);
  });
}

export async function publicNews() {
  return (await getCollection('news', ({ data }) => !data.draft))
    .filter(({ data }) => data.date <= new Date())
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function publicResearch() {
  return (await getCollection('research', ({ data }) => !data.draft)).sort(
    (a, b) => a.data.order - b.data.order,
  );
}
