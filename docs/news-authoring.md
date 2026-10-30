# 胃腸肝膽新知週報：撰寫規格

每週一新增一個 markdown 檔到 `src/content/news/`，push 到 `main` 後自動 build 並部署。
網址：列表 `/news/`，單篇 `/news/<檔名>/`。範本：`src/content/news/2026-10-19-sample.md`（`draft: true`，不會發布）。

## 檔名（＝網址）

- 格式：`YYYY-MM-DD-英文小寫短語.md`，例：`2026-10-26-masld-glp1.md` → `/news/2026-10-26-masld-glp1/`
- 只用英文小寫、數字、連字號 `-`；不要空格、中文、大寫或底線開頭（`_` 開頭的檔案會被忽略）。
- 檔名就是網址 slug，**發布後不要改檔名**（改了舊網址會變 404）。
- 資料夾只放週報 `.md`；這份說明放在 `docs/`，不會被當成週報讀取。

## Frontmatter 欄位

| 欄位 | 型別 | 必填 | 說明／範例 |
|---|---|---|---|
| `title` | 字串 | ✅ | `"胃腸肝膽新知週報：GLP-1 與脂肪肝（2026/10/26）"` |
| `description` | 字串 | ✅ | 一到兩句摘要，顯示在列表、首頁、搜尋結果與分享預覽 |
| `published` | 日期 `YYYY-MM-DD` | ✅ | `2026-10-26` |
| `reviewed` | 日期 `YYYY-MM-DD` | 選填 | 醫師最近審閱日；沒填自動等於 `published` |
| `draft` | `true`／`false` | 選填 | 預設 `false`。`true` 時**完全不產生頁面**、不進列表、首頁與 sitemap |
| `sources_period` | 字串 | 選填 | 本期涵蓋的文獻期間，例 `"2026/10/18–10/24"` |
| `keywords` | 字串陣列 | 選填 | 例 `["脂肪肝", "GLP-1"]` 或 YAML 清單（見範本） |
| `faq` | `{ q, a }` 陣列 | 選填 | 產生「常見問題」區塊與 FAQPage 結構化資料 |
| `references` | `{ text, url? }` 陣列 | 選填 | 參考文獻；`url` 可省略 |

欄位與衛教文章（`src/content/articles/`）相同，但週報**沒有** `pillar`。其他未列出的欄位會被忽略。

```yaml
---
title: "胃腸肝膽新知週報：本期標題"
description: "本期摘要。"
published: 2026-10-26
reviewed: 2026-10-26
sources_period: "2026/10/18–10/24"
keywords:
  - 脂肪肝
  - GLP-1
faq:
  - q: "問題？"
    a: "回答。"
references:
  - text: "Author A, et al. Title. Journal. 2026;1(1):1–10."
    url: https://doi.org/10.xxxx/xxxxx
---
```

## 注意事項（容易出錯的地方）

1. **日期一律 `YYYY-MM-DD`**（`2026-10-26`），不能寫 `2026/10/26` 或 `10/26`，否則 build 失敗。`sources_period` 是一般文字，可以用斜線。
2. **半形冒號 `: ` 要加引號**：title、description、faq 的 q／a、references 的 text 裡只要有半形冒號（或 `#`、開頭是 `[`、`{`、`*`、`&`、`!`、`>`、`'`、`"`），整段用雙引號包起來。全形冒號「：」不用。字串內要用雙引號時改用「」。保險做法：所有文字欄位都加雙引號。
3. **縮排用空白，不要用 Tab**。`faq`／`references` 每一項以 `  - ` 開頭，下一行對齊（見範本）。`faq` 的鍵名必須是 `q` 和 `a`；`references` 必須是 `text`（可加 `url`）。
4. **`draft: true` 不會發布**（與衛教文章不同：文章 draft 仍有頁面但 noindex）。正式發布時改成 `false` 或刪掉那行。
5. **frontmatter 錯誤會讓整個網站 build 失敗，部署就不會更新**（線上維持上一版）。push 前請本機跑一次 build 確認：
   `npx -y node@22 node_modules/astro/bin/astro.mjs build`
6. 內文從 `##` 開始寫段落標題，不要再寫 `# 標題`（頁面已用 title 當 H1）。
7. 站內連結用相對路徑且**結尾要有 `/`**：`[標題](/articles/<slug>/)`。把草稿中的 `[內部連結：…]` 換成下表的連結；表中沒有的主題就刪掉佔位文字，不要自己編網址。
8. 免責聲明、作者／審閱資訊、日期、參考文獻、FAQ 區塊與結構化資料都會自動產生，不需要寫在內文。

## 可連結的站內網址

### 衛教文章

| 網址 | 標題 | 主題 | Markdown |
|---|---|---|---|
| `/articles/anal-pain-and-fissure/` | 肛門痛不一定是痔瘡：肛裂、膿瘍與血栓痔怎麼分 | 痔瘡與血便 | `[肛門痛不一定是痔瘡：肛裂、膿瘍與血栓痔怎麼分](/articles/anal-pain-and-fissure/)` |
| `/articles/chronic-constipation/` | 長期便秘怎麼處理？為什麼有些人吃瀉藥也沒用 | 腸躁症與便秘 | `[長期便秘怎麼處理？為什麼有些人吃瀉藥也沒用](/articles/chronic-constipation/)` |
| `/articles/colonoscopy-bowel-prep/` | 大腸鏡清腸藥怎麼喝才會乾淨？時間表與低渣飲食全解析 | 胃鏡與大腸鏡檢查 | `[大腸鏡清腸藥怎麼喝才會乾淨？時間表與低渣飲食全解析](/articles/colonoscopy-bowel-prep/)` |
| `/articles/diabetes-liver-fibrosis-screening/` | 有糖尿病，為什麼醫師要幫你檢查肝纖維化？ | 脂肪肝（MASLD） | `[有糖尿病，為什麼醫師要幫你檢查肝纖維化？](/articles/diabetes-liver-fibrosis-screening/)` |
| `/articles/elevated-liver-enzymes/` | 健檢肝指數 GOT、GPT 偏高，接下來要查什麼？ | 脂肪肝（MASLD） | `[健檢肝指數 GOT、GPT 偏高，接下來要查什麼？](/articles/elevated-liver-enzymes/)` |
| `/articles/endoscopy-blood-thinners/` | 在吃阿斯匹靈或抗凝血藥，做胃鏡、大腸鏡要停藥嗎？ | 胃鏡與大腸鏡檢查 | `[在吃阿斯匹靈或抗凝血藥，做胃鏡、大腸鏡要停藥嗎？](/articles/endoscopy-blood-thinners/)` |
| `/articles/endoscopy-sedation/` | 無痛胃鏡、無痛大腸鏡安全嗎？麻醉前你該知道的事 | 胃鏡與大腸鏡檢查 | `[無痛胃鏡、無痛大腸鏡安全嗎？麻醉前你該知道的事](/articles/endoscopy-sedation/)` |
| `/articles/fatty-liver-glp1-treatment/` | 脂肪肝可以打減重針嗎？腸泌素藥物治療 MASH 的現況 | 脂肪肝（MASLD） | `[脂肪肝可以打減重針嗎？腸泌素藥物治療 MASH 的現況](/articles/fatty-liver-glp1-treatment/)` |
| `/articles/fatty-liver-how-to-reverse/` | 脂肪肝怎麼逆轉？要減幾公斤才真的有效 | 脂肪肝（MASLD） | `[脂肪肝怎麼逆轉？要減幾公斤才真的有效](/articles/fatty-liver-how-to-reverse/)` |
| `/articles/fatty-liver-ultrasound-report/` | 超音波報告寫「脂肪肝」，嚴重嗎？報告怎麼看 | 脂肪肝（MASLD） | `[超音波報告寫「脂肪肝」，嚴重嗎？報告怎麼看](/articles/fatty-liver-ultrasound-report/)` |
| `/articles/fatty-liver-what-to-do/` | 超音波說我有脂肪肝，要擔心嗎？該做哪些檢查 | 脂肪肝（MASLD） | `[超音波說我有脂肪肝，要擔心嗎？該做哪些檢查](/articles/fatty-liver-what-to-do/)` |
| `/articles/fit-positive-what-next/` | 糞便潛血檢查陽性，一定要做大腸鏡嗎？ | 大腸癌篩檢與大腸鏡 | `[糞便潛血檢查陽性，一定要做大腸鏡嗎？](/articles/fit-positive-what-next/)` |
| `/articles/gerd-diet-and-lifestyle/` | 胃食道逆流該怎麼吃、怎麼睡？有證據的生活調整 | 胃食道逆流 | `[胃食道逆流該怎麼吃、怎麼睡？有證據的生活調整](/articles/gerd-diet-and-lifestyle/)` |
| `/articles/gerd-ppi-how-to-take/` | 胃食道逆流的藥怎麼吃才有效？PPI 的正確吃法與停藥 | 胃食道逆流 | `[胃食道逆流的藥怎麼吃才有效？PPI 的正確吃法與停藥](/articles/gerd-ppi-how-to-take/)` |
| `/articles/gerd-symptoms-and-treatment/` | 胃食道逆流怎麼治？從症狀、吃藥到什麼時候該做胃鏡 | 胃食道逆流 | `[胃食道逆流怎麼治？從症狀、吃藥到什麼時候該做胃鏡](/articles/gerd-symptoms-and-treatment/)` |
| `/articles/gerd-when-to-get-endoscopy/` | 火燒心、喉嚨卡卡，什麼時候該做胃鏡？ | 胃食道逆流 | `[火燒心、喉嚨卡卡，什麼時候該做胃鏡？](/articles/gerd-when-to-get-endoscopy/)` |
| `/articles/glp1-before-endoscopy/` | 打減重針期間要做胃鏡、大腸鏡，需要停藥嗎？ | 腸泌素藥物（減重針） | `[打減重針期間要做胃鏡、大腸鏡，需要停藥嗎？](/articles/glp1-before-endoscopy/)` |
| `/articles/glp1-diet-protein/` | 打猛健樂期間怎麼吃？蛋白質、進食順序與保住肌肉的方法 | 腸泌素藥物（減重針） | `[打猛健樂期間怎麼吃？蛋白質、進食順序與保住肌肉的方法](/articles/glp1-diet-protein/)` |
| `/articles/glp1-gallbladder-pancreas/` | 打減重針肚子痛，什麼時候要擔心膽結石與胰臟炎？ | 腸泌素藥物（減重針） | `[打減重針肚子痛，什麼時候要擔心膽結石與胰臟炎？](/articles/glp1-gallbladder-pancreas/)` |
| `/articles/glp1-gi-side-effects/` | 打減重針後噁心、便秘、腹瀉怎麼辦？腸泌素藥物的腸胃副作用 | 腸泌素藥物（減重針） | `[打減重針後噁心、便秘、腹瀉怎麼辦？腸泌素藥物的腸胃副作用](/articles/glp1-gi-side-effects/)` |
| `/articles/glp1-how-much-weight-loss/` | 打減重針會瘦多少？停藥之後會復胖嗎？ | 腸泌素藥物（減重針） | `[打減重針會瘦多少？停藥之後會復胖嗎？](/articles/glp1-how-much-weight-loss/)` |
| `/articles/glp1-which-drug-to-choose/` | 猛健樂與週纖達差在哪？兩種減重針怎麼選 | 腸泌素藥物（減重針） | `[猛健樂與週纖達差在哪？兩種減重針怎麼選](/articles/glp1-which-drug-to-choose/)` |
| `/articles/glp1-who-should-not-use/` | 哪些人不適合打減重針？禁忌症與要特別小心的狀況 | 腸泌素藥物（減重針） | `[哪些人不適合打減重針？禁忌症與要特別小心的狀況](/articles/glp1-who-should-not-use/)` |
| `/articles/h-pylori-eradication-and-retest/` | 幽門桿菌除菌藥怎麼吃？副作用、複驗時間與失敗了怎麼辦 | 幽門桿菌 | `[幽門桿菌除菌藥怎麼吃？副作用、複驗時間與失敗了怎麼辦](/articles/h-pylori-eradication-and-retest/)` |
| `/articles/h-pylori-should-i-treat/` | 驗出幽門桿菌，一定要除菌嗎？ | 幽門桿菌 | `[驗出幽門桿菌，一定要除菌嗎？](/articles/h-pylori-should-i-treat/)` |
| `/articles/hbv-liver-cancer-surveillance/` | 為什麼 B 肝帶原要每半年做一次腹部超音波 | B 型與 C 型肝炎 | `[為什麼 B 肝帶原要每半年做一次腹部超音波](/articles/hbv-liver-cancer-surveillance/)` |
| `/articles/hbv-monitoring-and-treatment/` | B 肝帶原要多久追蹤一次？什麼時候需要開始吃藥 | B 型與 C 型肝炎 | `[B 肝帶原要多久追蹤一次？什麼時候需要開始吃藥](/articles/hbv-monitoring-and-treatment/)` |
| `/articles/hcv-treatment-and-cure/` | C 型肝炎現在可以治癒了：口服 8 到 12 週，治癒率超過 95% | B 型與 C 型肝炎 | `[C 型肝炎現在可以治癒了：口服 8 到 12 週，治癒率超過 95%](/articles/hcv-treatment-and-cure/)` |
| `/articles/hemorrhoids-treatment/` | 痔瘡怎麼治？從分級、保守治療到橡皮圈結紮與手術 | 痔瘡與血便 | `[痔瘡怎麼治？從分級、保守治療到橡皮圈結紮與手術](/articles/hemorrhoids-treatment/)` |
| `/articles/ibs-what-is-it/` | 腸躁症：檢查都正常，肚子還是痛又拉，該怎麼辦？ | 腸躁症與便秘 | `[腸躁症：檢查都正常，肚子還是痛又拉，該怎麼辦？](/articles/ibs-what-is-it/)` |
| `/articles/lpr-throat-symptoms/` | 喉嚨卡卡、一直清喉嚨、聲音沙啞，是咽喉逆流嗎？ | 胃食道逆流 | `[喉嚨卡卡、一直清喉嚨、聲音沙啞，是咽喉逆流嗎？](/articles/lpr-throat-symptoms/)` |
| `/articles/polyp-surveillance-interval/` | 大腸鏡切了瘜肉，下一次要多久後再做？ | 大腸癌篩檢與大腸鏡 | `[大腸鏡切了瘜肉，下一次要多久後再做？](/articles/polyp-surveillance-interval/)` |
| `/articles/rectal-bleeding-what-to-do/` | 大便有血怎麼辦？從顏色看可能原因，哪些要馬上就醫 | 痔瘡與血便 | `[大便有血怎麼辦？從顏色看可能原因，哪些要馬上就醫](/articles/rectal-bleeding-what-to-do/)` |

### 主題頁（皆可連結）

| 網址 | 主題 | Markdown |
|---|---|---|
| `/topics/gerd/` | 胃食道逆流 | `[胃食道逆流](/topics/gerd/)` |
| `/topics/h-pylori/` | 幽門桿菌 | `[幽門桿菌](/topics/h-pylori/)` |
| `/topics/fatty-liver/` | 脂肪肝（MASLD） | `[脂肪肝（MASLD）](/topics/fatty-liver/)` |
| `/topics/colon-screening/` | 大腸癌篩檢與大腸鏡 | `[大腸癌篩檢與大腸鏡](/topics/colon-screening/)` |
| `/topics/ibs-constipation/` | 腸躁症與便秘 | `[腸躁症與便秘](/topics/ibs-constipation/)` |
| `/topics/endoscopy/` | 胃鏡與大腸鏡檢查 | `[胃鏡與大腸鏡檢查](/topics/endoscopy/)` |
| `/topics/hemorrhoids-bleeding/` | 痔瘡與血便 | `[痔瘡與血便](/topics/hemorrhoids-bleeding/)` |
| `/topics/glp1/` | 腸泌素藥物（減重針） | `[腸泌素藥物（減重針）](/topics/glp1/)` |
| `/topics/viral-hepatitis/` | B 型與 C 型肝炎 | `[B 型與 C 型肝炎](/topics/viral-hepatitis/)` |

其他：`/articles/`（文章總覽）、`/news/`（週報列表）、`/clinics/`（看診資訊）、`/about/`（關於醫師）。

> 新增文章或主題後，這張表要手動更新。目前清單以 `src/content/articles/*.md` 與 `src/data/site.ts` 的 `pillars` 為準。
