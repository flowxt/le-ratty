import type { Metadata } from "next";
import LogementDetail from "@/components/logement-detail";
import { getLogements } from "@/lib/logements";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  lang: "en",
  chemin: "/la-marmotte",
  titre: "La Marmotte — sleeps 6",
  description:
    "La Marmotte, a 6-guest apartment on the ground floor of Le Ratty in Entremont: 2 bedrooms, fully equipped kitchen, walk-in shower, terrace with barbecue.",
});

export default function PageMarmotteEn() {
  return <LogementDetail logement={getLogements("en").marmotte} lang="en" />;
}
