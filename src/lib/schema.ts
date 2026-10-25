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
  jobTitle: "腸胃肝膽專科醫師",
  url: `${site.url}/about/`,
  hasOccupation: {
    "@type": "Occupation",
    name: "腸胃肝膽專科醫師",
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
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": clinicId(c.id),
    name: c.name,
    url: clinicId(c.id),
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
    ...(hours.length ? { openingHoursSpecification: hours } : {}),
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
