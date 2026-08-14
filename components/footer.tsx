"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adresse, contact } from "@/lib/logements";
import { langFromPathname, localePrefix } from "@/lib/i18n";

const T = {
  fr: {
    intro:
      "Deux appartements de charme dans une maison entièrement rénovée, au cœur des montagnes de Haute-Savoie. Jusqu'à 14 personnes en louant la maison entière.",
    trouver: "Nous trouver",
    maps: "Voir sur Google Maps",
    logements: "Les logements",
    marmotte: "La Marmotte — 6 personnes (RDC)",
    bouquetin: "Le Bouquetin — 8 personnes (1er étage)",
    maison: "La maison entière — 14 personnes",
    contactLien: "Contact & réservation",
  },
  en: {
    intro:
      "Two charming apartments in a fully renovated house, in the heart of the Haute-Savoie mountains. Up to 14 guests when renting the whole house.",
    trouver: "Find us",
    maps: "View on Google Maps",
    logements: "The apartments",
    marmotte: "La Marmotte — sleeps 6 (ground floor)",
    bouquetin: "Le Bouquetin — sleeps 8 (1st floor)",
    maison: "The whole house — sleeps 14",
    contactLien: "Contact & booking",
  },
};

export default function Footer() {
  const pathname = usePathname();
  const lang = langFromPathname(pathname);
  const prefixe = localePrefix(lang);
  const t = T[lang];

  return (
    <footer className="mt-auto border-t border-sand-dark bg-bark text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-bold text-corten-light">Le Ratty</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/80">{t.intro}</p>
          <p className="mt-4 text-sm text-cream/80">
            <a href={contact.telephoneHref} className="hover:text-cream">
              {contact.telephone}
            </a>
            <br />
            <a href={`mailto:${contact.email}`} className="hover:text-cream">
              {contact.email}
            </a>
          </p>
        </div>

        <div>
          <p className="font-serif text-lg text-corten-light">{t.trouver}</p>
          <address className="mt-3 text-sm not-italic leading-relaxed text-cream/80">
            {adresse.rue}
            <br />
            {adresse.lieuDit}
            <br />
            {adresse.codePostal} {adresse.commune}
          </address>
          <a
            href={adresse.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-corten-light underline-offset-4 hover:underline"
          >
            {t.maps}
          </a>
        </div>

        <div>
          <p className="font-serif text-lg text-corten-light">{t.logements}</p>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li>
              <Link href={`${prefixe}/la-marmotte`} className="hover:text-cream">
                {t.marmotte}
              </Link>
            </li>
            <li>
              <Link href={`${prefixe}/le-bouquetin`} className="hover:text-cream">
                {t.bouquetin}
              </Link>
            </li>
            <li>
              <Link href={`${prefixe}/la-maison`} className="hover:text-cream">
                {t.maison}
              </Link>
            </li>
            <li>
              <Link href={`${prefixe}/contact`} className="hover:text-cream">
                {t.contactLien}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Le Ratty — Entremont, Glières-Val-de-Borne
      </div>
    </footer>
  );
}
