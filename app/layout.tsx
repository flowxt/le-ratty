import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SITE_NOM, SITE_URL } from "@/lib/seo";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Le Ratty — Locations à Entremont, Haute-Savoie",
    template: `%s · ${SITE_NOM}`,
  },
  description:
    "Le Ratty : deux appartements de charme à louer à Entremont (Glières-Val-de-Borne), à 7 minutes du Grand-Bornand. La Marmotte (6 pers.), Le Bouquetin (8 pers.) ou la maison entière jusqu'à 14 personnes.",
  applicationName: SITE_NOM,
  keywords: [
    "Le Ratty",
    "location Entremont",
    "location vacances Haute-Savoie",
    "Glières-Val-de-Borne",
    "Grand-Bornand",
    "La Clusaz",
    "Plateau des Glières",
    "appartement montagne",
    "location groupe 14 personnes",
    "meublé de tourisme",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
