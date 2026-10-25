// 全站設定：改這一個檔案，全站的名字、資歷、主題會一起更新。
// 標有 TODO 的欄位請換成真實資料。

export const site = {
  url: "https://gidrchenyufu.com",
  doctorNameZh: "陳昱甫",
  doctorNameEn: "Yu-Fu Chen, MD",
  // 網站名稱（方向一：人名 + 專科定位）
  name: "陳昱甫醫師｜胃腸肝膽專科",
  // 首頁 <title> 專用（比 name 多了地區，有助本地搜尋）。
  // name 仍用於 og:site_name 與品牌名稱，所以保持簡短。
  homeTitle: "陳昱甫醫師｜桃園中壢・八德 胃腸肝膽專科",
  tagline: "胃腸鏡、幽門桿菌、脂肪肝的白話衛教",
  description:
    "火燒心、胃脹、血便、長期便秘、健檢肝指數異常該怎麼辦？胃腸肝膽專科醫師用白話說明胃鏡、大腸鏡與脂肪肝的判斷依據，每篇附參考文獻與審閱日期。桃園中壢、八德門診。",
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
  // ⚠️ 這裡只放「醫師本人」的社群帳號，會進到 Person 的 sameAs。
  // 診所的粉專／IG 請填在下面 clinics[].social，會進到該診所 MedicalClinic 的 sameAs；
  // 填錯位置等於告訴搜尋引擎「醫師本人＝某間診所的粉專」。
  sameAs: [] as string[],
};

// 分析與搜尋工具。三個欄位都是「填了才生效」，留空字串不會輸出任何程式碼，
// 也不會載入任何第三方檔案。詳細申請步驟見 README。
export const analytics = {
  // Google Search Console 的 HTML 標籤驗證碼：只要 content="..." 引號裡那一串，
  // 不要整個 <meta> 標籤。驗證通過後這一行要保留，拿掉會失去驗證。
  googleSiteVerification: "",
  // GA4 評估 ID，格式 G-XXXXXXXXXX
  ga4MeasurementId: "",
  // Cloudflare Web Analytics 的 token（在 Cloudflare 後台取得）
  cloudflareToken: "",
};

// 有啟用任何會蒐集瀏覽資料的工具時，免責聲明頁會自動加上對應的隱私權說明。
export const usesVisitorAnalytics = Boolean(
  analytics.ga4MeasurementId || analytics.cloudflareToken,
);
// 線上預約：沒有就填 null。qr 是 public/ 底下的圖檔路徑。
// ⚠️ 換了 url 要一併重新產生 QR 圖，兩者必須一致：
//    npx -y qrcode@1.5.4 -t svg -e M -o public/<檔名>.svg "<url>"
type Booking = { label: string; url: string; qr: string } | null;

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
    booking: null as Booking,
    social: [
      {
        label: "Facebook",
        url: "https://www.facebook.com/p/%E9%95%B7%E5%AE%89%E5%85%A7%E7%A7%91%E8%A8%BA%E6%89%80-61555133626093/",
      },
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
    booking: {
      label: "LINE 線上預約",
      url: "https://line.me/R/ti/p/@280escrw",
      qr: "/line-booking-riri.svg",
    } as Booking,
    social: [
      {
        label: "Facebook",
        url: "https://www.facebook.com/p/%E6%97%A5%E6%97%A5%E6%99%B4%E8%81%AF%E5%90%88%E8%A8%BA%E6%89%80-%E8%A6%AA%E5%AD%90%E8%80%B3%E9%BC%BB%E5%96%89%E8%82%9D%E8%86%BD%E8%85%B8%E8%83%83%E5%B0%88%E7%A7%91-61577704497098/",
      },
      { label: "Instagram", url: "https://www.instagram.com/sunny_every_day269/" },
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
  {
    slug: "glp1",
    title: "腸泌素藥物（減重針）",
    summary:
      "噁心、便秘、腹痛怎麼處理，哪些肚子痛要立刻就醫，以及做胃鏡大腸鏡前要不要停藥。",
    keywords: ["腸泌素", "GLP-1", "減重針", "瘦瘦針", "semaglutide", "tirzepatide"],
  },
] as const;

export type PillarSlug = (typeof pillars)[number]["slug"];
