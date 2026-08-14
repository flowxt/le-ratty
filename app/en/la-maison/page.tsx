import type { Metadata } from "next";
import LogementDetail from "@/components/logement-detail";
import { getLogements } from "@/lib/logements";

export const metadata: Metadata = {
  title: "The whole house — sleeps 14",
  description:
    "Rent the whole of Le Ratty: both apartments together for up to 14 guests in Entremont, 7 minutes from Le Grand-Bornand.",
};

export default function PageMaisonEn() {
  return <LogementDetail logement={getLogements("en").maison} lang="en" />;
}
