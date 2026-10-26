// 讀取 src/content/pillars/*.md：每個主題支柱頁的總覽正文。
// 檔名要對應 site.ts 裡 pillars 的 slug，例如 gerd.md。
export interface PillarFrontmatter {
  title: string; // 支柱頁的 H1 與 <title>，寫成民眾會搜尋的長標題
  description: string; // meta description
  reviewed: string; // 醫師最近審閱日期 YYYY-MM-DD
  // 要嵌入的互動小工具，目前只有 "fib4"。填了模板才會載入對應的 JS。
  tool?: string;
  faq?: { q: string; a: string }[];
  references?: { text: string; url?: string }[];
}

export interface PillarContent {
  slug: string;
  data: PillarFrontmatter;
  Content: any;
}

const toDay = (d: unknown) =>
  (d instanceof Date ? d.toISOString() : String(d)).slice(0, 10);

const modules = import.meta.glob("../content/pillars/*.md", { eager: true }) as Record<
  string,
  { frontmatter: PillarFrontmatter; Content: any }
>;

const bySlug = new Map<string, PillarContent>(
  Object.entries(modules).map(([path, mod]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    return [
      slug,
      {
        slug,
        data: { ...mod.frontmatter, reviewed: toDay(mod.frontmatter.reviewed) },
        Content: mod.Content,
      },
    ];
  }),
);

// 還沒寫正文的主題回傳 undefined，支柱頁會自動退回只顯示文章列表。
export const pillarContent = (slug: string) => bySlug.get(slug);
