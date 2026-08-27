import type { Metadata } from "next";
import LogementDetail from "@/components/logement-detail";
import { getLogements } from "@/lib/logements";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  lang: "fr",
  chemin: "/la-maison",
  titre: "La maison entière — 14 personnes",
  description:
    "Louez Le Ratty en entier : les deux appartements réunis pour accueillir jusqu'à 14 personnes à Entremont, à 7 minutes du Grand-Bornand.",
});

export default function PageMaison() {
  return <LogementDetail logement={getLogements("fr").maison} lang="fr" />;
}
