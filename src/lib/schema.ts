import { site } from "../data/site";

// 作者／醫師的結構化資料，所有文章共用同一個 @id
export const physicianId = `${site.url}/about/#physician`;

export const physicianLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": physicianId,
  name: `${site.doctorNameZh}醫師`,
  alternateName: site.doctorNameEn,
  jobTitle: "腸胃肝膽專科醫師",
  url: `${site.url}/about/`,
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
  ],
  ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
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
