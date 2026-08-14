import type { Metadata } from "next";
import ContactContent from "@/components/contact-content";

export const metadata: Metadata = {
  title: "Contact & booking",
  description:
    "Contact Le Ratty to book La Marmotte, Le Bouquetin or the whole house in Entremont, Glières-Val-de-Borne (Haute-Savoie, French Alps).",
};

export default function PageContactEn() {
  return <ContactContent lang="en" />;
}
