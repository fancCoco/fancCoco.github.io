import { useEffect, useMemo, useState } from 'react';

type Publication = {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: string;
  topics: string[];
  status: string;
  paperUrl?: string;
  projectUrl?: string;
  codeUrl?: string;
  videoUrl?: string;
  slidesUrl?: string;
  bibtex?: string;
};

type Props = { publications: Publication[] };
type Filters = { query: string; year: string; topic: string; type: string };

const emptyFilters: Filters = { query: '', year: 'all', topic: 'all', type: 'all' };

function readFilters(): Filters {
  if (typeof window === 'undefined') return emptyFilters;
  const params = new URLSearchParams(window.location.search);
  return {
    query: params.get('q') || '',
    year: params.get('year') || 'all',
    topic: params.get('topic') || 'all',
    type: params.get('type') || 'all',
  };
}

function updateUrl(filters: Filters) {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams();
  if (filters.query) params.set('q', filters.query);
  if (filters.year !== 'all') params.set('year', filters.year);
  if (filters.topic !== 'all') params.set('topic', filters.topic);
  if (filters.type !== 'all') params.set('type', filters.type);
  const query = params.toString();
  window.history.replaceState({}, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
}

function labelize(value: string) {
  return value === 'under-review' ? 'Under review' : value[0]?.toUpperCase() + value.slice(1);
}

function PublicationItem({ item }: { item: Publication }) {
  const titleHref = item.paperUrl || item.projectUrl;
  return (
    <article className="explorer-item surface-card">
      <div className="explorer-item__top"><span>{item.year} · {labelize(item.type)}</span><span className="explorer-item__status"><i className={item.status === 'accepted' ? 'gold' : ''}></i>{labelize(item.status)}</span></div>
      <h2>{titleHref ? <a href={titleHref} target={item.paperUrl ? '_blank' : undefined} rel={item.paperUrl ? 'noreferrer' : undefined}>{item.title}</a> : item.title}</h2>
      <p className="explorer-item__authors">{item.authors.map((author, index) => <span className={author.toLowerCase() === 'fan chen' ? 'author-self' : undefined} key={`${author}-${index}`}>{author}{index < item.authors.length - 1 ? ', ' : ''}</span>)}</p>
      <p className="explorer-item__venue">{item.venue}</p>
      <div className="explorer-item__topics">{item.topics.map((topic) => <span className="pill" key={topic}>{topic}</span>)}</div>
      <div className="explorer-item__links">
        {item.paperUrl && <a href={item.paperUrl} target="_blank" rel="noreferrer">Paper ↗</a>}
        {item.projectUrl && <a href={item.projectUrl}>Project ↗</a>}
        {item.codeUrl && <a href={item.codeUrl} target="_blank" rel="noreferrer">Code ↗</a>}
        {item.videoUrl && <a href={item.videoUrl} target="_blank" rel="noreferrer">Video ↗</a>}
        {item.slidesUrl && <a href={item.slidesUrl} target="_blank" rel="noreferrer">Slides ↗</a>}
        {item.bibtex && <details className="bibtex"><summary>BibTeX</summary><div><pre>{item.bibtex}</pre><button type="button" onClick={(event) => { const button = event.currentTarget; navigator.clipboard?.writeText(item.bibtex || '').then(() => { button.textContent = 'Copied'; setTimeout(() => { button.textContent = 'Copy'; }, 1600); }).catch(() => { button.textContent = 'Select text'; }); }}>Copy</button></div></details>}
      </div>
    </article>
  );
}

export default function PublicationExplorer({ publications }: Props) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  useEffect(() => setFilters(readFilters()), []);
  useEffect(() => { updateUrl(filters); }, [filters]);

  const years = useMemo(() => [...new Set(publications.map((item) => item.year))].sort((a, b) => b - a), [publications]);
  const topics = useMemo(() => [...new Set(publications.flatMap((item) => item.topics))].sort(), [publications]);
  const types = useMemo(() => [...new Set(publications.map((item) => item.type))].sort(), [publications]);
  const filtered = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return publications.filter((item) => {
      const matchesQuery = !query || [item.title, item.authors.join(' '), item.venue, item.topics.join(' ')].join(' ').toLowerCase().includes(query);
      return matchesQuery && (filters.year === 'all' || item.year.toString() === filters.year) && (filters.topic === 'all' || item.topics.includes(filters.topic)) && (filters.type === 'all' || item.type === filters.type);
    });
  }, [filters, publications]);

  function setFilter(key: keyof Filters, value: string) { setFilters((current) => ({ ...current, [key]: value })); }
  function clearFilters() { setFilters(emptyFilters); }

  return (
    <div className="explorer">
      <div className="explorer-controls" aria-label="Publication filters">
        <label className="explorer-search"><span>Search</span><input value={filters.query} onChange={(event) => setFilter('query', event.target.value)} placeholder="Title, author, venue, topic" /></label>
        {years.length > 1 && <label><span>Year</span><select value={filters.year} onChange={(event) => setFilter('year', event.target.value)}><option value="all">All years</option>{years.map((year) => <option value={year} key={year}>{year}</option>)}</select></label>}
        {topics.length > 1 && <label><span>Topic</span><select value={filters.topic} onChange={(event) => setFilter('topic', event.target.value)}><option value="all">All topics</option>{topics.map((topic) => <option value={topic} key={topic}>{topic}</option>)}</select></label>}
        {types.length > 1 && <label><span>Type</span><select value={filters.type} onChange={(event) => setFilter('type', event.target.value)}><option value="all">All types</option>{types.map((type) => <option value={type} key={type}>{labelize(type)}</option>)}</select></label>}
      </div>
      <div className="explorer-summary"><p><strong>{filtered.length}</strong> {filtered.length === 1 ? 'publication' : 'publications'}</p><button type="button" onClick={clearFilters}>Clear filters</button></div>
      <div className="explorer-list">{filtered.map((item) => <PublicationItem item={item} key={`${item.year}-${item.title}`} />)}</div>
      {!filtered.length && <div className="empty-state"><p className="eyebrow">No match</p><h2>Try a broader search.</h2><p className="muted">There are no public publications matching the current filters.</p></div>}
    </div>
  );
}
