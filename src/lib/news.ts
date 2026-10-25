// 腸胃肝膽新知週報：讀取 src/content/news/*.md（排除 draft），新到舊排序
import { getCollection } from "astro:content";

export const getNews = async () =>
  (await getCollection("news", (e) => !e.data.draft)).sort(
    (a, b) => b.data.published.localeCompare(a.data.published) || b.id.localeCompare(a.id)
  );

export const newsTitle = "腸胃肝膽新知週報";
