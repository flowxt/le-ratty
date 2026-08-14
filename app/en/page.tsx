import type { Metadata } from "next";
import HomeContent from "@/components/home-content";

export const metadata: Metadata = {
  title: { absolute: "Le Ratty — Holiday rentals in Entremont, French Alps" },
  description:
    "Le Ratty: two charming apartments to rent in Entremont (Glières-Val-de-Borne), 7 minutes from Le Grand-Bornand. La Marmotte (sleeps 6), Le Bouquetin (sleeps 8) or the whole house for up to 14 guests.",
};

export default function HomeEn() {
  return <HomeContent lang="en" />;
}
