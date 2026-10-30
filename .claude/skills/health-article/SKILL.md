---
name: health-article
description: 寫一篇衛教文章或主題頁（pillar）並發布到 gidrchenyufu.com。當醫師說要寫某個主題的衛教文章、新增一篇文章、開一個新主題、或要補充／更正既有文章時使用。涵蓋 frontmatter、SEO 結構、內部連結與發布。
---

# 寫一篇衛教文章

先讀 `CLAUDE.md`（寫稿規則與查證流程）與 `README.md` 的「新增文章」。
這份只講文章特有的部分。

## 文章 vs 主題頁

| | 衛教文章 | 主題頁（pillar） |
|---|---|---|
| 位置 | `src/content/articles/<slug>.md` | `src/content/pillars/<slug>.md` |
| 網址 | `/articles/<slug>/` | `/topics/<slug>/` |
| frontmatter | 需要 `pillar` | 不需要 `pillar`，但 slug 必須對應 `src/data/site.ts` 的 pillars |
| 內容 | 回答一個具體問題 | 這個主題的總覽與入口，三到五個最常被誤會的觀念 |

**開新主題**要同時做三件事：在 `src/data/site.ts` 的 `pillars` 加一筆、新增
`src/content/pillars/<slug>.md`、在 `src/pages/index.astro` 的 `bySymptom` 加一列
（用病人自己會說的話當症狀描述，例「健檢驗出 B 肝表面抗原陽性」）。

## frontmatter

```yaml
---
title: 寫成病人會實際搜尋的長標題，不是教科書章節名
description: 一到兩句，會出現在 Google 搜尋結果
pillar: 必須是 site.ts 裡的 slug
published: 2026-10-30
reviewed: 2026-10-30
faq:
  - q: 病人真的會問的話
    a: 完整回答，不要只寫「請諮詢醫師」
references:
  - text: "作者. 期刊. 年份."
    url: https://doi.org/...
---
```

- `draft: true` 的文章仍會產生頁面但加 noindex（和週報不同，週報的 draft 是完全不產生）。
- `tool: "fib4"` 會嵌入 FIB-4 計算器，目前只有這一個。
- 日期格式與引號規則同週報，見 `docs/news-authoring.md` 的「注意事項」。

## 內容結構

1. **開場用門診會聽到的那句話**，不要用定義開場。
   例：「我是 B 肝帶原，可是肝指數一直正常，醫師說先觀察就好。」
2. 需要的話放一個「一句話版本」把結論先給。
3. `##` 分節，標題就是結論或問題本身。
4. 數字做成表格；切點、門檻、劑量這類東西用表格比用句子清楚。
5. **誠實那一節**：證據的限制、不同指引不一致的地方、檢查會漏掉什麼。
   這一節不要省略，它是這個站的風格。
6. 「什麼時候不該等到下一次排程」這類**提早就醫的紅旗清單**，有就寫。
7. 結尾 `## 其他相關主題` 只放**跨主題**的連結。
   **不要寫 `## 延伸閱讀`** —— 模板會自動產生同主題的延伸閱讀。

## 寫完之後

1. 更新 `docs/news-authoring.md` 末尾的可連結網址表（新增文章或主題後要手動更新）
2. build、驗證、fetch、push、確認線上生效 —— 流程見 `CLAUDE.md`
3. 報告時要講：哪些數字無法獨立確認、留了哪些 `TODO（醫師補充）`
4. 問他要不要送 Search Console（見 `publish-and-index` skill）
