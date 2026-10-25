import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SITE = "https://gidrchenyufu.com";

// ---- sitemap lastmod ----
// 從文章 frontmatter 讀 reviewed（沒有就用 published），當作 sitemap 的 lastmod。
// 主題頁與文章列表／首頁用其底下最新一篇文章的日期；其他頁面不放 lastmod。
const articlesDir = new URL("./src/content/articles/", import.meta.url);
const fmField = (fm, key) => fm.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+?)["']?\\s*$`, "m"))?.[1];
const articleMeta = readdirSync(articlesDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const src = readFileSync(new URL(f, articlesDir), "utf8");
    const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
    if (/^draft:\s*true\s*$/m.test(fm)) return null;
    const date = fmField(fm, "reviewed") ?? fmField(fm, "published");
    return { slug: f.replace(/\.md$/, ""), pillar: fmField(fm, "pillar"), date };
  })
  .filter((a) => a && /^\d{4}-\d{2}-\d{2}$/.test(a.date ?? ""));
const latest = (list) => list.map((a) => a.date).sort().at(-1);
const lastmodByPath = new Map(articleMeta.map((a) => [`/articles/${a.slug}/`, a.date]));
for (const p of new Set(articleMeta.map((a) => a.pillar))) {
  lastmodByPath.set(`/topics/${p}/`, latest(articleMeta.filter((a) => a.pillar === p)));
}
if (articleMeta.length) {
  lastmodByPath.set("/articles/", latest(articleMeta));
  lastmodByPath.set("/", latest(articleMeta));
}

// ---- 301 trailing-slash redirects ----
// Cloudflare Workers 靜態資源的 html_handling 會把 /about 以 307（暫時）轉到 /about/，
// 狀態碼無法設定。這裡在 build 後產生 dist/_redirects，對每個頁面加上
// 「/path /path/ 301」，讓不帶斜線的網址改用 301（永久）轉址；
// /path/index.html 也一併 301 到 /path/。
const trailingSlash301 = {
  name: "trailing-slash-301-redirects",
  hooks: {
    "astro:build:done": ({ dir, pages }) => {
      const paths = pages
        .map((p) => p.pathname.replace(/^\/+|\/+$/g, ""))
        .filter((p) => p !== "404")
        .sort();
      const lines = [
        ...paths.filter(Boolean).map((p) => `/${p} /${p}/ 301`),
        ...paths.map((p) => (p ? `/${p}/index.html /${p}/ 301` : "/index.html / 301")),
      ];
      const out = fileURLToPath(new URL("_redirects", dir));
      writeFileSync(
        out,
        `# 由 astro.config.mjs 自動產生：不帶結尾斜線的網址以 301 轉到帶斜線的正式網址\n${lines.join("\n")}\n`
      );
    },
  },
};

export default defineConfig({
  site: SITE,
  trailingSlash: "always",
  integrations: [
    sitemap({
      serialize(item) {
        const lastmod = lastmodByPath.get(new URL(item.url).pathname);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
    trailingSlash301,
  ],
});
