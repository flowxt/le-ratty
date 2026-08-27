import type { MetadataRoute } from "next";

const BASE = "https://leratty.fr";

// Pages du site (FR = version canonique, EN sous /en). Priorités : accueil et
// maison entière en tête, puis les deux appartements, enfin le contact.
const PAGES: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/la-maison", priority: 0.9, changeFrequency: "weekly" },
  { path: "/la-marmotte", priority: 0.8, changeFrequency: "weekly" },
  { path: "/le-bouquetin", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const maj = new Date();
  return PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path || "/"}`,
    lastModified: maj,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        fr: `${BASE}${path || "/"}`,
        en: `${BASE}/en${path}`,
      },
    },
  }));
}
