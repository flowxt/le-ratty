import type { Metadata } from "next";
import LogementDetail from "@/components/logement-detail";
import { getLogements } from "@/lib/logements";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  lang: "fr",
  chemin: "/le-bouquetin",
  titre: "Le Bouquetin — 8 personnes",
  description:
    "Le Bouquetin, appartement 8 personnes au 1er étage du Ratty à Entremont : 2 chambres, grand salon, cuisine équipée, terrasse clôturée face aux montagnes.",
});

export default function PageBouquetin() {
  return <LogementDetail logement={getLogements("fr").bouquetin} lang="fr" />;
}
