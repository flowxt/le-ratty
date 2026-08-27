import type { Metadata } from "next";
import LogementDetail from "@/components/logement-detail";
import { getLogements } from "@/lib/logements";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  lang: "fr",
  chemin: "/la-marmotte",
  titre: "La Marmotte — 6 personnes",
  description:
    "La Marmotte, appartement 6 personnes au rez-de-chaussée du Ratty à Entremont : 2 chambres, cuisine équipée, douche à l'italienne, terrasse avec barbecue.",
});

export default function PageMarmotte() {
  return <LogementDetail logement={getLogements("fr").marmotte} lang="fr" />;
}
