import type { Metadata } from "next";
import ContactContent from "@/components/contact-content";

export const metadata: Metadata = {
  title: "Contact & réservation",
  description:
    "Contactez Le Ratty pour réserver La Marmotte, Le Bouquetin ou la maison entière à Entremont, Glières-Val-de-Borne (Haute-Savoie).",
};

export default function PageContact() {
  return <ContactContent lang="fr" />;
}
