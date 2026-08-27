import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Le Ratty — Locations à Entremont, Haute-Savoie",
    short_name: "Le Ratty",
    description:
      "Deux appartements de charme à louer à Entremont, à 7 minutes du Grand-Bornand : La Marmotte (6 pers.), Le Bouquetin (8 pers.) ou la maison entière jusqu'à 14 personnes.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ef",
    theme_color: "#9a5b2f",
    lang: "fr",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
