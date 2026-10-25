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
    "把檢查結果講到你聽得懂，再一起決定下一步。",
  // 社群連結：有了再填，會自動放進結構化資料 sameAs
  sameAs: [] as string[],
};

// 看診地點與門診時段。schedule 每列：[星期, 上午, 下午, 晚上]，空字串代表無門診。
// mapUrl 選填：填了就用這個連結，沒填就以地址自動產生 Google 地圖搜尋連結。
// id：結構化資料 @id 與頁面錨點用（/clinics/#id），設定後請勿更改。
// region／locality／street：地址拆欄，給結構化資料 PostalAddress 用，需與 address 一致。
// postalCode：3 碼郵遞區號（由行政區判定）；geo 選填：經緯度，沒有就不填。
export const clinics = [
  {
    id: "changan",
    name: "中壢長安內科",
    address: "桃園市中壢區中山東路二段550號",
    region: "桃園市",
    locality: "中壢區",
    street: "中山東路二段550號",
    postalCode: "320",
    geo: undefined as { latitude: number; longitude: number } | undefined,
    phone: "03-4650508",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=%E9%95%B7%E5%AE%89%E5%85%A7%E7%A7%91%E8%A8%BA%E6%89%80%20%E6%A1%83%E5%9C%92%E5%B8%82%E4%B8%AD%E5%A3%A2%E5%8D%80%E4%B8%AD%E5%B1%B1%E6%9D%B1%E8%B7%AF%E4%BA%8C%E6%AE%B5550%E8%99%9F",
    schedule: [
      ["週二", "08:00–12:00", "14:30–18:00", ""],
      ["週四", "", "14:30–18:00", "18:30–21:30"],
      ["週五", "08:00–12:00", "", ""],
    ],
    note: "",
  },
  {
    id: "ririqing",
    name: "日日晴聯合診所",
    address: "桃園市八德區建德路269號",
    region: "桃園市",
    locality: "八德區",
    street: "建德路269號",
    postalCode: "334",
    // 座標取自下方 mapUrl 的 Google 地圖地點（!3d／!4d）
    geo: { latitude: 24.9321606, longitude: 121.2806876 } as
      | { latitude: number; longitude: number }
      | undefined,
    phone: "03-3688539",
    mapUrl:
      "https://www.google.com/maps/place/%E6%97%A5%E6%97%A5%E6%99%B4%E8%81%AF%E5%90%88%E8%A8%BA%E6%89%80/@24.9321606,121.2781127,17z/data=!3m1!4b1!4m6!3m5!1s0x3468195e8fb394ef:0x6b7010c07c449309!8m2!3d24.9321606!4d121.2806876!16s%2Fg%2F11xkpp4rqd",
    schedule: [
      ["週三", "08:00–12:00", "16:00–20:00", ""],
      ["週五", "", "16:00–20:00", ""],
      ["週日", "08:00–12:00", "", ""],
    ],
    note: "週三與週五的下午診為 16:00–20:00 連續看診，中間不休診。",
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
  {
    slug: "colon-screening",
    title: "大腸癌篩檢與大腸鏡",
    summary:
      "糞便潛血陽性怎麼辦、幾歲該開始篩、切了瘜肉之後多久要再做一次大腸鏡。",
    keywords: ["大腸癌篩檢", "糞便潛血", "大腸鏡", "大腸瘜肉"],
  },
  {
    slug: "ibs-constipation",
    title: "腸躁症與便秘",
    summary:
      "肚子痛又拉、長期便秘：檢查正常不等於沒病，這些症狀有明確的診斷標準與治療順序。",
    keywords: ["腸躁症", "大腸激躁症", "便秘", "低 FODMAP"],
  },
  {
    slug: "endoscopy",
    title: "胃鏡與大腸鏡檢查",
    summary:
      "清腸藥怎麼喝才乾淨、無痛麻醉安不安全、在吃抗凝血藥要不要停：檢查前後該知道的事。",
    keywords: ["胃鏡", "大腸鏡", "清腸", "無痛內視鏡", "麻醉鎮靜"],
  },
  {
    slug: "hemorrhoids-bleeding",
    title: "痔瘡與血便",
    summary:
      "痔瘡怎麼治、肛門為什麼痛、血便的顏色代表什麼：哪些可以先觀察，哪些一定要檢查。",
    keywords: ["痔瘡", "血便", "肛裂", "肛門痛", "橡皮圈結紮"],
  },
] as const;

export type PillarSlug = (typeof pillars)[number]["slug"];
