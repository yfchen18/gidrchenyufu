# gidrchenyufu.com

胃腸肝膽專科醫師個人衛教網站，使用 [Astro](https://astro.build) 建置的靜態網站，部署於 Cloudflare。

## 用 Claude Code 寫內容

這個 repo 附了 Claude Code 的工作流程設定，在這裡開 session 就會自動生效：

| 檔案 | 內容 |
|---|---|
| `CLAUDE.md` | 寫稿規則（關聯不等於因果、台灣適用性）、查證流程、發布流程、環境的坑 |
| `.claude/skills/news-weekly/` | 寫一期新知週報 |
| `.claude/skills/health-article/` | 寫一篇衛教文章或開一個新主題 |
| `.claude/skills/publish-and-index/` | build 驗證、推上線、送 Search Console |
| `.claude/launch.json` | 本機預覽用的 dev server 設定 |

直接說「寫一期週報」「這篇推上線」「送索引」就會走對應的流程。

## 常用修改

| 想改什麼 | 改哪個檔案 |
|---|---|
| 醫師姓名、資歷、理念、聯絡信箱 | `src/data/site.ts` |
| 新增／調整主題（支柱頁） | `src/data/site.ts` 的 `pillars` |
| 主題頁的總覽正文 | `src/content/pillars/<slug>.md` |
| 新增文章 | 在 `src/content/articles/` 新增一個 `.md` 檔 |
| 新增新知週報 | 在 `src/content/news/` 新增 `.md`，規格見 `docs/news-authoring.md` |
| 線上預約連結與 QR | `src/data/site.ts` 的 `clinics[].booking`（見下） |
| 顏色、字體 | `src/styles/global.css` |
| Search Console 驗證碼、分析工具 | `src/data/site.ts` 的 `analytics` |
| 社群分享預覽圖 | 直接換掉 `public/og.jpg`，維持 1200×630 |

## 新增文章

複製 `src/content/articles/h-pylori-should-i-treat.md`，改檔名（檔名就是網址，用英文小寫加連字號），再修改開頭的設定：

- `pillar`：所屬主題，必須是 `site.ts` 裡的 slug（`gerd`、`h-pylori`、`fatty-liver`、`colon-screening`、`ibs-constipation`、`endoscopy`、`hemorrhoids-bleeding`）
- `reviewed`：醫師最近審閱日期，每次更新內容就改
- `draft: true`：示範／草稿，頁面會加上 noindex，不會被 Google 收錄；正式發布時刪掉這行
- `faq`、`references`：選填，會自動產生常見問題區塊、參考文獻與結構化資料

文章會自動出現在首頁、文章總覽、所屬主題頁，以及同主題文章的「延伸閱讀」。

## 主題頁（支柱頁）正文

每個主題頁的總覽內容放在 `src/content/pillars/` 裡，檔名必須對應 `site.ts` 的 pillar slug（`gerd.md`、`h-pylori.md`、`fatty-liver.md`）。開頭的設定：

- `title`：頁面的 H1 與瀏覽器標題，寫成民眾會實際搜尋的長標題
- `description`：meta description，Google 搜尋結果顯示的那段
- `reviewed`：醫師最近審閱日期，每次改內容就更新
- `faq`、`references`：選填，會自動產生常見問題區塊、參考文獻與 FAQ 結構化資料

沒有對應 `.md` 檔的主題，頁面會自動退回只顯示文章列表，不會壞掉。

## Search Console 與分析工具

全部設定都在 `src/data/site.ts` 的 `analytics`，三個欄位都是「填了才生效」，留空不會載入任何第三方檔案。分析程式碼只在正式建置時輸出，`npm run dev` 不會送出資料。

### 1. Google Search Console（必做，這是關鍵字資料的唯一來源）

1. 前往 [Search Console](https://search.google.com/search-console) → 新增資源
2. **建議選「網域」資源**（輸入 `gidrchenyufu.com`）：一次涵蓋 www、非 www 與 http/https，驗證方式是在 Cloudflare 的 DNS 加一筆 TXT 記錄，不需要改程式碼
3. 若選「網址前置字元」資源，驗證時選「HTML 標記」，把 `content="..."` 引號裡那一串填進 `analytics.googleSiteVerification`，推上 `main` 等部署完成後按驗證
4. 驗證通過後**不要拿掉**驗證碼或 TXT 記錄，移除會失去驗證
5. 驗證後到「Sitemap」提交 `sitemap-index.xml`
6. 用「網址審查」對三個主題頁與每篇文章按「要求建立索引」，新站可以加快收錄

資料通常要兩到三天才開始累積，新站第一個月的數字會很少，這是正常的。

### 2. 流量分析（選一個）

| | Cloudflare Web Analytics | GA4 |
|---|---|---|
| 費用 | 免費 | 免費 |
| 安裝 | 在 Cloudflare 後台開啟後取得 token，填入 `analytics.cloudflareToken` | 建立資源後取得 `G-` 開頭的評估 ID，填入 `analytics.ga4MeasurementId` |
| Cookie | 不使用 | 使用 |
| 能否追蹤「點擊電話號碼」 | 不行 | 可以 |
| 能否與 Search Console 連結 | 不行 | 可以 |

填入任一個之後，免責聲明頁會自動出現對應的隱私權說明區塊（`src/pages/disclaimer.astro`），不需要另外編輯。
## 線上預約（LINE）

每間診所在 `src/data/site.ts` 的 `booking` 欄位各自設定，沒有就填 `null`。
看診資訊頁會在該診所區塊顯示一顆可點擊的按鈕；QR 只在寬度 560px 以上顯示
（手機無法掃自己螢幕上的 QR，所以手機以按鈕為主）。

⚠️ **換了 `url` 一定要重新產生 QR 圖**，兩者必須指向同一個網址：

```bash
npx -y qrcode@1.5.4 -t svg -e M -o public/line-booking-riri.svg "https://line.me/R/ti/p/@280escrw"
```

## 本機預覽

```bash
npm install
npm run dev
```

### Node 版本

Astro 會在啟動時檢查 Node 版本，**版本不符會直接拒絕執行，不是警告**。目前要求的下限由
`package.json` 的 `engines.node` 記錄，實際釘住的版本放在 `.node-version` 與 `.nvmrc`
（兩個檔案內容相同，Cloudflare 讀前者、nvm 讀後者）。

```bash
nvm use    # 會讀 .nvmrc
```

⚠️ **升級 astro 時要一起看它的 Node 需求。** Astro 的下限經常就是 Node 當下的最新一版，
如果只升 astro 而沒有同步更新這兩個檔案，Cloudflare 的建置會在第一步就失敗。

## 部署（Cloudflare Workers & Pages）

- Build command：`npm run build`
- Output directory：`dist`
- 推送到 `main` 後自動重新部署
