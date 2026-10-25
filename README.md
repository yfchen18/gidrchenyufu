# gidrchenyufu.com

腸胃肝膽專科醫師個人衛教網站，使用 [Astro](https://astro.build) 建置的靜態網站，部署於 Cloudflare。

## 常用修改

| 想改什麼 | 改哪個檔案 |
|---|---|
| 醫師姓名、資歷、理念、聯絡信箱 | `src/data/site.ts` |
| 新增／調整主題（支柱頁） | `src/data/site.ts` 的 `pillars` |
| 新增文章 | 在 `src/content/articles/` 新增一個 `.md` 檔 |
| 線上預約連結與 QR | `src/data/site.ts` 的 `clinics[].booking`（見下） |
| 顏色、字體 | `src/styles/global.css` |

## 新增文章

複製 `src/content/articles/h-pylori-should-i-treat.md`，改檔名（檔名就是網址，用英文小寫加連字號），再修改開頭的設定：

- `pillar`：所屬主題，必須是 `site.ts` 裡的 slug（`gerd`、`h-pylori`、`fatty-liver`、`colon-screening`、`ibs-constipation`、`endoscopy`、`hemorrhoids-bleeding`）
- `reviewed`：醫師最近審閱日期，每次更新內容就改
- `draft: true`：示範／草稿，頁面會加上 noindex，不會被 Google 收錄；正式發布時刪掉這行
- `faq`、`references`：選填，會自動產生常見問題區塊、參考文獻與結構化資料

文章會自動出現在首頁、文章總覽、所屬主題頁，以及同主題文章的「延伸閱讀」。

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

## 部署（Cloudflare Workers & Pages）

- Build command：`npm run build`
- Output directory：`dist`
- 推送到 `main` 後自動重新部署
