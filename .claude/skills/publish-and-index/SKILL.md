---
name: publish-and-index
description: 把改好的內容發布到 gidrchenyufu.com 並送 Google Search Console 要求索引。當醫師說要發布、推上線、一起推上去、送索引、要求建立索引，或問還有什麼網址需要送索引時使用。
---

# 發布與送索引

## 一、push 前

```bash
git fetch origin && git status --short --branch
```

**醫師會同時自己改 repo。** 落後就 `git merge --ff-only origin/main`；
有衝突用 merge 並保留他的版本，**絕不 force push**。

本機 build（frontmatter 錯誤會讓整站 build 失敗、線上停在上一版）：

```bash
npx -y node@22 node_modules/astro/bin/astro.mjs build
```

驗證 `dist/`：

- 新頁面存在；`FAQPage`／`BreadcrumbList`／`MedicalWebPage` 各一份
- 內文的站內連結都找得到對應的 `index.html`
  （`/_astro/*.css`、`/favicon.svg`、`/sitemap-index.xml` 不是頁面，算正常）
- 列表頁、首頁、`sitemap-0.xml` 都收到了
- 有表格的頁面在 375px 量 `document.documentElement.scrollWidth` vs `clientWidth`

## 二、push 後確認線上生效

部署約 60–90 秒。用 `until` 迴圈，**不要用固定的 `sleep`**：

```bash
U=https://gidrchenyufu.com/<path>/
until [ "$(curl -s -o /dev/null -w '%{http_code}' $U)" = "200" ]; do sleep 10; done
```

改內容時要輪詢**新字串出現**或**舊字串消失**。
⚠️ 不要挑一個新舊版本都包含的字串，會誤判成已部署。

## 三、送 Search Console

**只有全新網址需要送。** 改內容的既有網址不用重送——同一網址重複提交不會加快，
Google 重新檢索時會自己抓到新版。sitemap 也不用重新提交。

用 Claude in Chrome（`mcp__claude-in-chrome__*`）。先載入工具：

```
ToolSearch "select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__find,mcp__claude-in-chrome__tabs_close_mcp,mcp__claude-in-chrome__browser_batch"
```

每個網址的流程：

1. `navigate` 到
   `https://search.google.com/search-console?resource_id=sc-domain%3Agidrchenyufu.com`
2. 等 9 秒，點最上方的網址檢查輸入框（約 `(690, 30)`），輸入網址，按 Return
3. 等約 18 秒，截圖看狀態
4. 點右側的**「要求建立索引」**。
   ⚠️ `find` 回傳的 ref 可能點不到（有隱藏的重複元素），**用截圖上的座標點**比較可靠
5. 等約 30 秒，確認對話框出現**「已要求建立索引」「已將網址加入優先檢索佇列」**
   —— 看到這句才算完成，只按按鈕不算
6. 關掉對話框，下一個網址

**一個網址一次完整流程**，不要省略確認那一步。
每天的配額約 10 個，用完會送不出去。

做完 `tabs_close_mcp` 關掉分頁。

## 四、查「還有哪些網址沒收錄」

- `https://search.google.com/search-console/index?resource_id=sc-domain%3Agidrchenyufu.com`
  的「網頁索引狀態」報表**會落後兩三天**，顯示的「未建立索引」可能早就收錄了。
- **要判斷現況一律用網址檢查工具逐一查**，那個才是即時的。
- 全站網址清單：`curl -s https://gidrchenyufu.com/sitemap-0.xml | grep -o '<loc>[^<]*'`
  （`grep -c '<loc>'` 會算錯，XML 是單行，要用 `grep -o ... | wc -l`）

## 五、報告時要誠實

- 收錄時間由 Google 決定，**不要承諾幾天內會收錄**
- 沒看到確認對話框就不要說送出去了
