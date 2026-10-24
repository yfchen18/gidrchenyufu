// 全站設定：改這一個檔案，全站的名字、資歷、主題會一起更新。
// 標有 TODO 的欄位請換成真實資料。

export const site = {
  url: "https://gidrchenyufu.com",
  doctorNameZh: "陳昱甫",
  doctorNameEn: "Yu-Fu Chen, MD",
  // 網站名稱（方向一：人名 + 專科定位）
  name: "陳昱甫醫師｜腸胃肝膽專科",
  tagline: "胃腸鏡、幽門桿菌、脂肪肝的白話衛教",
  description:
    "腸胃肝膽專科醫師撰寫的衛教文章：胃食道逆流、幽門桿菌、脂肪肝、胃鏡與大腸鏡，內容附參考文獻與審閱日期。",
  email: "contact@gidrchenyufu.com",
  locale: "zh-TW",
  // 專科資格與學會
  credentials: [
    "台灣消化系醫學會專科醫師",
    "台灣消化系內視鏡醫學會會員",
    "糖尿病共同照護網認證醫師",
    "台灣肥胖醫學會會員",
  ],
  // 訓練經歷
  training: [
    "台北榮民總醫院胃腸肝膽科總醫師",
    "日本埼玉醫科大學國際醫療中心研修醫師",
  ],
  // 專長（來自門診主治項目）
  expertise: [
    "胃潰瘍、胃食道逆流、消化不良、脹氣與便秘",
    "大腸激躁症",
    "急慢性肝炎、脂肪肝與肝膽疾病",
    "胃鏡、大腸鏡與腹部超音波",
    "糖尿病照護與三高慢性病",
  ],
  philosophy:
    "（TODO：一兩句看診理念，例如：把檢查結果講到你聽得懂，再一起決定下一步。）",
  // 社群連結：有了再填，會自動放進結構化資料 sameAs
  sameAs: [] as string[],
};

// 看診地點與門診時段。schedule 每列：[星期, 上午, 下午, 晚上]，空字串代表無門診。
export const clinics = [
  {
    name: "中壢長安內科",
    address: "桃園市中壢區中山東路二段550號",
    phone: "03-4650508",
    schedule: [
      ["星期二", "08:00–12:00", "14:30–18:00", ""],
      ["星期四", "", "14:30–18:00", "18:30–21:30"],
      ["星期五", "08:00–12:00", "", ""],
    ],
    note: "",
  },
  {
    name: "日日晴聯合診所",
    address: "桃園市八德區建德路269號",
    phone: "03-3688539",
    schedule: [] as string[][], // TODO：補上陳醫師在日日晴的門診時段
    note: "門診時段請來電洽詢。",
  },
];

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
