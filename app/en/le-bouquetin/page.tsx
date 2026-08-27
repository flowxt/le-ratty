import type { Metadata } from "next";
import LogementDetail from "@/components/logement-detail";
import { getLogements } from "@/lib/logements";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  lang: "en",
  chemin: "/le-bouquetin",
  titre: "Le Bouquetin — sleeps 8",
  description:
    "Le Bouquetin, an 8-guest apartment on the 1st floor of Le Ratty in Entremont: 2 bedrooms, large living room, fully equipped kitchen, enclosed terrace facing the mountains.",
});

export default function PageBouquetinEn() {
  return <LogementDetail logement={getLogements("en").bouquetin} lang="en" />;
}
