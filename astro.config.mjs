import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SITE = "https://gidrchenyufu.com";

// ---- sitemap lastmod ----
// 從文章／週報 frontmatter 讀 reviewed（沒有就用 published），當作 sitemap 的 lastmod。
// 主題頁、文章列表與首頁用其底下最新一篇文章的日期；/news/ 用最新一期週報的日期；
// 其他頁面不放 lastmod。draft: true 的不算。
const fmField = (fm, key) => fm.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+?)["']?\\s*$`, "m"))?.[1];
const readMeta = (dir) => {
  const base = new URL(dir, import.meta.url);
  let files = [];
  try {
    files = readdirSync(base).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  return files
    .map((f) => {
      const src = readFileSync(new URL(f, base), "utf8");
      const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
      if (/^draft:\s*true\s*$/m.test(fm)) return null;
      const date = fmField(fm, "reviewed") ?? fmField(fm, "published");
      return { slug: f.replace(/\.md$/, ""), pillar: fmField(fm, "pillar"), date };
    })
    .filter((a) => a && /^\d{4}-\d{2}-\d{2}$/.test(a.date ?? ""));
};
const articleMeta = readMeta("./src/content/articles/");
const newsMeta = readMeta("./src/content/news/");
const latest = (list) => list.map((a) => a.date).sort().at(-1);
const lastmodByPath = new Map([
  ...articleMeta.map((a) => [`/articles/${a.slug}/`, a.date]),
  ...newsMeta.map((n) => [`/news/${n.slug}/`, n.date]),
]);
for (const p of new Set(articleMeta.map((a) => a.pillar))) {
  lastmodByPath.set(`/topics/${p}/`, latest(articleMeta.filter((a) => a.pillar === p)));
}
if (articleMeta.length) lastmodByPath.set("/articles/", latest(articleMeta));
if (newsMeta.length) lastmodByPath.set("/news/", latest(newsMeta));
if (articleMeta.length || newsMeta.length) lastmodByPath.set("/", latest([...articleMeta, ...newsMeta]));

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
        // @astrojs/sitemap 產生的檔名是 sitemap-index.xml。Google 與 Bing 是讀
        // robots.txt 的 Sitemap: 宣告（以及後台提交），不靠猜檔名，所以這兩行
        // 不是必要的；但不少檢測工具與比較簡略的爬蟲只會試慣例路徑，補上成本很低。
        "/sitemap.xml /sitemap-index.xml 301",
        "/sitemap_index.xml /sitemap-index.xml 301",
      ];
      const out = fileURLToPath(new URL("_redirects", dir));
      writeFileSync(
        out,
        `# 由 astro.config.mjs 自動產生：不帶結尾斜線的網址以 301 轉到帶斜線的正式網址，\n# 並把慣例的 sitemap 路徑轉到實際的 sitemap-index.xml\n${lines.join("\n")}\n`
      );
    },
  },
};

// ---- 預覽部署不給搜尋引擎收錄 ----
// Cloudflare Workers Builds 會帶入 WORKERS_CI_BRANCH。非 main 分支的建置（PR 預覽）
// 在 dist/_headers 對所有頁面加上 X-Robots-Tag: noindex，避免預覽網址被當成重複站收錄。
// main 的正式建置與本機建置都不會產生這個檔案，正式站行為不變。
const previewNoindex = {
  name: "preview-noindex-header",
  hooks: {
    "astro:build:done": ({ dir }) => {
      const branch = process.env.WORKERS_CI_BRANCH;
      if (!branch || branch === "main") return;
      writeFileSync(
        fileURLToPath(new URL("_headers", dir)),
        `# 由 astro.config.mjs 自動產生：預覽建置（分支 ${branch}）不給搜尋引擎收錄\n/*\n  X-Robots-Tag: noindex, nofollow\n`
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
    previewNoindex,
  ],
});
