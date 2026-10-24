// 讀取 src/content/articles/*.md 的所有文章
export interface ArticleFrontmatter {
  title: string;
  description: string;
  pillar: string;
  published: string; // YYYY-MM-DD
  reviewed: string; // 醫師最近審閱日期 YYYY-MM-DD
  draft?: boolean;
  faq?: { q: string; a: string }[];
  references?: { text: string; url?: string }[];
}

export interface Article {
  slug: string;
  data: ArticleFrontmatter;
  Content: any;
}

const toDay = (d: unknown) =>
  (d instanceof Date ? d.toISOString() : String(d)).slice(0, 10);

const modules =import.meta.glob("../content/articles/*.md", { eager: true }) as Record<
  string,
  { frontmatter: ArticleFrontmatter; Content: any }
>;

export const articles: Article[] = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: path.split("/").pop()!.replace(/\.md$/, ""),
    // YAML 會把 2026-10-25 解析成 Date，統一轉回 YYYY-MM-DD 字串
    data: {
      ...mod.frontmatter,
      published: toDay(mod.frontmatter.published),
      reviewed: toDay(mod.frontmatter.reviewed),
    },
    Content: mod.Content,
  }))
  .sort((a, b) => b.data.published.localeCompare(a.data.published));

export const articlesByPillar = (pillar: string) =>
  articles.filter((a) => a.data.pillar === pillar);
