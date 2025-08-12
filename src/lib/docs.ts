import fs from 'fs';
import path from 'path';

export type DocMeta = {
  title: string;
  description?: string;
  category: string; // Top-level sidebar category label
  order?: number; // Ordering within the category
  sidebar_title?: string; // Optional short title used in sidebar
};

export type DocHeading = {
  id: string;
  text: string;
  level: number;
};

export type DocPage = DocMeta & {
  slugParts: string[]; // e.g. ['get-started', 'welcome']
  slug: string; // e.g. 'get-started/welcome'
  content: string;
  headings: DocHeading[];
};

export type SidebarGroup = {
  category: string;
  items: Array<{
    title: string;
    sidebarTitle: string;
    slug: string; // '/docs/get-started/welcome'
    order?: number;
  }>;
};

const docsDirectory = path.join(process.cwd(), 'src/content/docs');

export function getAllDocFiles(): string[] {
  const result: string[] = [];
  const walk = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        result.push(full);
      }
    }
  };
  if (fs.existsSync(docsDirectory)) walk(docsDirectory);
  return result;
}

export function getAllDocs(): DocPage[] {
  const files = getAllDocFiles();
  const pages: DocPage[] = files.map((fullPath) => {
    const relative = path.relative(docsDirectory, fullPath); // 'get-started/welcome.md'
    const slugParts = relative.replace(/\\/g, '/').replace(/\.md$/, '').split('/');
    const slug = slugParts.join('/');

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { frontmatter, content } = parseMdFile(fileContents);
    const headings = extractHeadings(content);

    const categoryFromPath = slugParts[0] || 'General';
    const category = String(frontmatter.category || titleCase(categoryFromPath));

    return {
      slug,
      slugParts,
      title: String(frontmatter.title || slugParts[slugParts.length - 1]),
      description: frontmatter.description,
      category,
      order: frontmatter.order ? Number(frontmatter.order) : undefined,
      sidebar_title: frontmatter.sidebar_title,
      content,
      headings,
    } as DocPage;
  });

  // Sort by category then order then title
  return pages.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    const ao = a.order ?? 9999;
    const bo = b.order ?? 9999;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title);
  });
}

export function getDocBySlug(slugParts: string[]): DocPage | null {
  const slug = slugParts.join('/');
  try {
    const fullPath = path.join(docsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { frontmatter, content } = parseMdFile(fileContents);
    return {
      slug,
      slugParts,
      title: String(frontmatter.title || slugParts[slugParts.length - 1]),
      description: frontmatter.description,
      category: String(frontmatter.category || titleCase(slugParts[0] || 'General')),
      order: frontmatter.order ? Number(frontmatter.order) : undefined,
      sidebar_title: frontmatter.sidebar_title,
      content,
      headings: extractHeadings(content),
    } as DocPage;
  } catch (e) {
    return null;
  }
}

export function getSidebarTree(): SidebarGroup[] {
  const all = getAllDocs();
  const byCategory: Record<string, SidebarGroup> = {};
  for (const page of all) {
    const category = page.category;
    if (!byCategory[category]) {
      byCategory[category] = { category, items: [] };
    }
    byCategory[category].items.push({
      title: page.title,
      sidebarTitle: page.sidebar_title || page.title,
      slug: `/docs/${page.slug}`,
      order: page.order,
    });
  }
  const groups = Object.values(byCategory).map((g) => ({
    ...g,
    items: g.items.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999) || a.sidebarTitle.localeCompare(b.sidebarTitle)),
  }));
  return groups.sort((a, b) => a.category.localeCompare(b.category));
}

export type SearchItem = {
  id: string;
  title: string; // Doc title or heading title
  category: string;
  url: string; // '/docs/slug#heading-id'
  text: string; // Content snippet
};

export function getSearchItems(): SearchItem[] {
  const items: SearchItem[] = [];
  const docs = getAllDocs();
  for (const doc of docs) {
    // Doc-level item
    items.push({
      id: doc.slug,
      title: doc.title,
      category: doc.category,
      url: `/docs/${doc.slug}`,
      text: stripMd(doc.content).slice(0, 500),
    });

    // Heading-level items
    const lines = doc.content.split(/\r?\n/);
    const indices = doc.headings.map((h, idx) => ({ h, lineIndex: findHeadingLineIndex(lines, h) , next: idx < doc.headings.length - 1 ? null : null }));
    for (let i = 0; i < doc.headings.length; i++) {
      const h = doc.headings[i];
      const start = findHeadingLineIndex(lines, h);
      const end = i < doc.headings.length - 1 ? findHeadingLineIndex(lines, doc.headings[i + 1]) : lines.length;
      const snippet = stripMd(lines.slice(start + 1, Math.min(end, start + 12)).join(' '));
      items.push({
        id: `${doc.slug}#${h.id}`,
        title: `${doc.title} › ${h.text}`,
        category: doc.category,
        url: `/docs/${doc.slug}#${h.id}`,
        text: snippet,
      });
    }
  }
  return items;
}

function parseMdFile(fileContent: string): { frontmatter: any; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = fileContent.match(frontmatterRegex);
  if (!match) {
    return { frontmatter: {}, content: fileContent };
  }
  const frontmatterString = match[1];
  const content = fileContent.replace(frontmatterRegex, '');
  const frontmatter: Record<string, string> = {};
  frontmatterString.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts.join(':').trim();
    }
  });
  return { frontmatter, content };
}

function extractHeadings(content: string): DocHeading[] {
  const lines = content.split(/\r?\n/);
  const headings: DocHeading[] = [];
  for (const line of lines) {
    const m = line.match(/^(#{1,6})\s+(.*)$/);
    if (m) {
      const level = m[1].length;
      const text = m[2].trim();
      const id = slugify(text);
      headings.push({ id, text, level });
    }
  }
  return headings;
}

function findHeadingLineIndex(lines: string[], heading: DocHeading): number {
  const pattern = new RegExp(`^#{${heading.level}}\\s+${escapeRegExp(heading.text)}\\s*$`);
  for (let i = 0; i < lines.length; i++) {
    if (pattern.test(lines[i])) return i;
  }
  return 0;
}

function stripMd(md: string): string {
  return md
    .replace(/`{1,3}[^`]*`/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function titleCase(str: string): string {
  return str
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
} 