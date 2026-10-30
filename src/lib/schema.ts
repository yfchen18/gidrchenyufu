import { site, clinics } from "../data/site";

// 作者／醫師的結構化資料，所有文章共用同一個 @id。
// 注意：schema.org 的 Physician 類型是「醫療機構／診所」，不是個人，
// 所以醫師本人用 Person，執業的診所用 MedicalClinic，以 worksFor 連起來。
export const physicianId = `${site.url}/about/#physician`;

// 每間診所的 @id（/clinics/ 頁面上的錨點），Person.worksFor 與 MedicalClinic 共用
export const clinicId = (id: string) => `${site.url}/clinics/#${id}`;

export const physicianLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": physicianId,
  name: `${site.doctorNameZh}醫師`,
  alternateName: site.doctorNameEn,
  jobTitle: "胃腸肝膽專科醫師",
  url: `${site.url}/about/`,
  hasOccupation: {
    "@type": "Occupation",
    name: "胃腸肝膽專科醫師",
    occupationLocation: { "@type": "City", name: "桃園市" },
  },
  knowsAbout: [
    "Gastroenterology",
    "Hepatology",
    "Endoscopy",
    "胃食道逆流",
    "幽門桿菌",
    "脂肪肝",
    "大腸癌篩檢",
    "大腸鏡",
    "腸躁症",
    "慢性便秘",
    "胃鏡",
    "痔瘡",
  ],
  worksFor: clinics.map((c) => ({
    "@type": "MedicalClinic",
    "@id": clinicId(c.id),
    name: c.name,
  })),
  ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
};

// 文章 author／reviewedBy 用的醫師資料：帶完整姓名，不只 @id，
// 讓搜尋引擎在單一文章頁就能讀到作者是誰（資料沿用 physicianLd，不重複維護）
export const physicianRef = {
  "@type": "Person",
  "@id": physicianLd["@id"],
  name: physicianLd.name,
  alternateName: physicianLd.alternateName,
  jobTitle: physicianLd.jobTitle,
  url: physicianLd.url,
  ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
};

// 門診時段轉成 OpeningHoursSpecification，讓 Google 能直接顯示營業時間
const dayOfWeek: Record<string, string> = {
  週一: "Monday",
  週二: "Tuesday",
  週三: "Wednesday",
  週四: "Thursday",
  週五: "Friday",
  週六: "Saturday",
  週日: "Sunday",
};
const openingHours = (schedule: string[][]) =>
  schedule.flatMap((row) =>
    row
      .slice(1)
      .filter(Boolean)
      .map((slot) => {
        const [opens, closes] = slot.split("–");
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${dayOfWeek[row[0]]}`,
          opens,
          closes,
        };
      })
  );

// 看診地點的 MedicalClinic 結構化資料：只放 site.ts 裡有的真實資料
export const clinicLd = (c: (typeof clinics)[number]) => {
  const hours = openingHours(c.schedule);
  const sameAs = [...(c.website ? [c.website] : []), ...c.social.map((s) => s.url)];
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": clinicId(c.id),
    name: c.name,
    // url：診所官網；@id 維持 /clinics/#id，Person.worksFor 以此對應
    url: c.website ?? clinicId(c.id),
    telephone: c.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.street,
      addressLocality: c.locality,
      addressRegion: c.region,
      ...(c.postalCode ? { postalCode: c.postalCode } : {}),
      addressCountry: "TW",
    },
    ...(c.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: c.geo.latitude, longitude: c.geo.longitude } }
      : {}),
    ...(c.mapUrl ? { hasMap: c.mapUrl } : {}),
    // 診所官網＋診所自己的粉專／IG（不是醫師本人的，那個在 site.sameAs → Person）
    ...(sameAs.length ? { sameAs } : {}),
    ...(hours.length ? { openingHoursSpecification: hours } : {}),
    // 線上預約：讓搜尋引擎認得這是預約管道
    ...(c.booking
      ? {
          potentialAction: {
            "@type": "ReserveAction",
            name: c.booking.label,
            target: {
              "@type": "EntryPoint",
              urlTemplate: c.booking.url,
              inLanguage: site.locale,
            },
          },
        }
      : {}),
    medicalSpecialty: "https://schema.org/Gastroenterologic",
    employee: { "@id": physicianId },
  };
};

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: new URL(it.path, site.url).href,
  })),
});

// 網站本身的 @id（首頁的 WebSite 節點），其他頁面用 isPartOf 指回來，
// 讓搜尋引擎知道這些頁面屬於同一個網站。
export const websiteId = `${site.url}/#website`;

// 頁面層級型別：告訴搜尋引擎「這一頁是什麼」，而不只是「這一頁提到了誰」。
// Person、MedicalClinic 這類是實體，不是頁面型別；少了這一層，引擎得自己猜
// 頁面主題，AI 也較難判斷哪一頁才是某個實體的權威頁面。
// 文章頁與主題頁已經由 MedicalWebPage 擔任這個角色，不需要再加。
type PageType = "WebPage" | "ProfilePage" | "ContactPage" | "CollectionPage";
export const pageLd = (o: {
  type: PageType;
  name: string;
  description: string;
  path: string;
  // 這一頁主要在講的實體，用 @id 指向同頁或他頁已經定義好的節點
  mainEntity?: object | object[];
}) => ({
  "@context": "https://schema.org",
  "@type": o.type,
  "@id": `${new URL(o.path, site.url).href}#webpage`,
  name: o.name,
  description: o.description,
  url: new URL(o.path, site.url).href,
  inLanguage: site.locale,
  isPartOf: { "@id": websiteId },
  ...(o.mainEntity ? { mainEntity: o.mainEntity } : {}),
});
