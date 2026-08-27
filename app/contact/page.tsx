import type { Metadata } from "next";
import ContactContent from "@/components/contact-content";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  lang: "fr",
  chemin: "/contact",
  titre: "Contact & réservation",
  description:
    "Contactez Le Ratty pour réserver La Marmotte, Le Bouquetin ou la maison entière à Entremont, Glières-Val-de-Borne (Haute-Savoie).",
});

export default function PageContact() {
  return <ContactContent lang="fr" />;
}
