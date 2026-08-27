import type { Metadata } from "next";
import HomeContent from "@/components/home-content";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  lang: "en",
  chemin: "",
  titre: "Le Ratty — Holiday rentals in Entremont, French Alps",
  titreAbsolu: true,
  description:
    "Le Ratty: two charming apartments to rent in Entremont (Glières-Val-de-Borne), 7 minutes from Le Grand-Bornand. La Marmotte (sleeps 6), Le Bouquetin (sleeps 8) or the whole house for up to 14 guests.",
});

export default function HomeEn() {
  return <HomeContent lang="en" />;
}
