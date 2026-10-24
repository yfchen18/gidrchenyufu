// 全站設定：改這一個檔案，全站的名字、資歷、主題會一起更新。
// 標有 TODO 的欄位請換成真實資料。

export const site = {
  url: "https://gidrchenyufu.com",
  // TODO: 換成中文全名
  doctorNameZh: "陳○○",
  doctorNameEn: "Yu-Fu Chen, MD",
  // 網站名稱（方向一：人名 + 專科定位）
  name: "陳○○醫師｜腸胃肝膽專科",
  tagline: "胃腸鏡、幽門桿菌、脂肪肝的白話衛教",
  description:
    "腸胃肝膽專科醫師撰寫的衛教文章：胃食道逆流、幽門桿菌、脂肪肝、胃鏡與大腸鏡，內容附參考文獻與審閱日期。",
  email: "contact@gidrchenyufu.com",
  locale: "zh-TW",
  // TODO: 確認後填入真實資歷
  credentials: [
    "內科專科醫師",
    "消化系專科醫師",
    "（TODO：消化系內視鏡專科／其他資格）",
  ],
  education: ["（TODO：學歷）", "（TODO：住院醫師／研究醫師訓練醫院）"],
  philosophy:
    "（TODO：一兩句看診理念，例如：把檢查結果講到你聽得懂，再一起決定下一步。）",
  // 社群連結：有了再填，會自動放進結構化資料 sameAs
  sameAs: [] as string[],
};

// 主題叢集：每個支柱頁 = 一個主題。文章用 pillar 欄位對應 slug。
export const pillars = [
  {
    slug: "gerd",
    title: "胃食道逆流",
    summary: "火燒心、喉嚨卡卡、慢性咳嗽：逆流的判斷、藥物使用與何時該做胃鏡。",
    keywords: ["胃食道逆流", "火燒心", "PPI", "LPR"],
  },
  {
    slug: "h-pylori",
    title: "幽門桿菌",
    summary: "要不要驗、要不要除菌、除菌失敗怎麼辦，以及和胃癌預防的關係。",
    keywords: ["幽門桿菌", "除菌", "胃癌預防"],
  },
  {
    slug: "fatty-liver",
    title: "脂肪肝（MASLD）",
    summary: "超音波報告上的脂肪肝代表什麼、瘦的人為什麼也會有，以及怎麼逆轉。",
    keywords: ["脂肪肝", "MASLD", "肝纖維化"],
  },
] as const;

export type PillarSlug = (typeof pillars)[number]["slug"];
