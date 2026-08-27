import type { Metadata } from "next";
import type { Lang } from "./i18n";

export const SITE_URL = "https://leratty.fr";
export const SITE_NOM = "Le Ratty";

/** Image de partage par défaut (1200x630, façade du Ratty). */
const OG_IMAGE = "/og-le-ratty.jpg";

const OG_ALT = {
  fr: "La maison Le Ratty à Entremont, en Haute-Savoie",
  en: "Le Ratty house in Entremont, French Alps",
};

type Options = {
  lang: Lang;
  /** Chemin sans préfixe de langue : "" pour l'accueil, "/la-marmotte", etc. */
  chemin: string;
  titre: string;
  description: string;
  /** Titre déjà complet : on n'applique pas le gabarit « … · Le Ratty ». */
  titreAbsolu?: boolean;
  image?: string;
};

/**
 * Construit les métadonnées d'une page : titre, description, URL canonique,
 * liens hreflang FR/EN et cartes de partage (OpenGraph + Twitter).
 */
export function metadonnees({
  lang,
  chemin,
  titre,
  description,
  titreAbsolu = false,
  image = OG_IMAGE,
}: Options): Metadata {
  const urlFr = chemin || "/";
  const urlEn = `/en${chemin}`;
  const canonical = lang === "fr" ? urlFr : urlEn;
  const titreComplet = titreAbsolu ? titre : `${titre} · ${SITE_NOM}`;

  return {
    title: titreAbsolu ? { absolute: titre } : titre,
    description,
    alternates: {
      canonical,
      languages: {
        fr: urlFr,
        en: urlEn,
        "x-default": urlFr,
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NOM,
      locale: lang === "fr" ? "fr_FR" : "en_GB",
      alternateLocale: lang === "fr" ? "en_GB" : "fr_FR",
      url: canonical,
      title: titreComplet,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: OG_ALT[lang],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titreComplet,
      description,
      images: [image],
    },
  };
}
