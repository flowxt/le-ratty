import type { Metadata } from "next";
import HomeContent from "@/components/home-content";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  lang: "fr",
  chemin: "",
  titre: "Le Ratty — Locations à Entremont, Haute-Savoie",
  titreAbsolu: true,
  description:
    "Le Ratty : deux appartements de charme à louer à Entremont (Glières-Val-de-Borne), à 7 minutes du Grand-Bornand. La Marmotte (6 pers.), Le Bouquetin (8 pers.) ou la maison entière jusqu'à 14 personnes.",
});

export default function Accueil() {
  return <HomeContent lang="fr" />;
}
