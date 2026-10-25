// 內容集合設定。目前只有「胃腸肝膽新知週報」(news) 走 content collection；
// 衛教文章 (articles) 仍由 src/lib/articles.ts 直接讀取 markdown。
// news 的欄位刻意與 articles 的 frontmatter 一致（見 src/lib/articles.ts 的 ArticleFrontmatter）。
// 撰寫說明：docs/news-authoring.md
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// YYYY-MM-DD。YAML 不加引號會被解析成 Date，加了引號是字串，兩種都接受，統一轉成字串。
const day = z
  .union([z.date(), z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "日期格式必須是 YYYY-MM-DD")])
  .transform((d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d));

const news = defineCollection({
  // 只讀 src/content/news/ 底下的 .md；檔名（去掉 .md）就是網址 slug：/news/<檔名>/
  loader: glob({
    pattern: "*.md",
    base: "./src/content/news",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1),
      published: day,
      reviewed: day.optional(), // 沒填就等於 published
      draft: z.boolean().optional().default(false),
      faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
      references: z.array(z.object({ text: z.string(), url: z.string().optional() })).optional(),
      keywords: z.array(z.string()).optional(),
      sources_period: z.string().optional(), // 例："2026/10/18–10/24"
    })
    .transform((d) => ({ ...d, reviewed: d.reviewed ?? d.published })),
});

export const collections = { news };
