"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { langFromPathname, localePrefix, switchLangPath } from "@/lib/i18n";

const NAV = [
  { chemin: "/", label: { fr: "Accueil", en: "Home" } },
  { chemin: "/la-marmotte", label: { fr: "La Marmotte", en: "La Marmotte" } },
  { chemin: "/le-bouquetin", label: { fr: "Le Bouquetin", en: "Le Bouquetin" } },
  { chemin: "/la-maison", label: { fr: "La maison entière", en: "The whole house" } },
  { chemin: "/contact", label: { fr: "Contact", en: "Contact" } },
];

export default function Header() {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const lang = langFromPathname(pathname);
  const prefixe = localePrefix(lang);

  const liens = NAV.map((item) => ({
    href: item.chemin === "/" ? (prefixe === "" ? "/" : prefixe) : `${prefixe}${item.chemin}`,
    label: item.label[lang],
  }));

  const drapeaux = (
    <div className="flex items-center gap-1 rounded-full border border-sand-dark bg-sand/60 p-1">
      <Link
        href={switchLangPath(pathname, "fr")}
        aria-label="Version française"
        onClick={() => setOuvert(false)}
        className={`rounded-full px-2 py-0.5 text-base leading-none ${
          lang === "fr" ? "bg-cream shadow-sm" : "opacity-50 hover:opacity-100"
        }`}
      >
        🇫🇷
      </Link>
      <Link
        href={switchLangPath(pathname, "en")}
        aria-label="English version"
        onClick={() => setOuvert(false)}
        className={`rounded-full px-2 py-0.5 text-base leading-none ${
          lang === "en" ? "bg-cream shadow-sm" : "opacity-50 hover:opacity-100"
        }`}
      >
        🇬🇧
      </Link>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-sand-dark bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href={prefixe === "" ? "/" : prefixe}
          className="flex items-baseline gap-2"
          onClick={() => setOuvert(false)}
        >
          <span className="font-serif text-2xl font-bold tracking-wide text-corten-dark">
            Le Ratty
          </span>
          <span className="hidden text-sm text-bark-light sm:inline">
            Entremont · Haute-Savoie
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <nav className="flex items-center gap-1">
            {liens.map((lien) => {
              const actif = pathname === lien.href;
              return (
                <Link
                  key={lien.href}
                  href={lien.href}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    actif ? "bg-corten text-cream" : "text-bark hover:bg-sand"
                  }`}
                >
                  {lien.label}
                </Link>
              );
            })}
          </nav>
          {drapeaux}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          {drapeaux}
          <button
            type="button"
            aria-label={lang === "fr" ? "Ouvrir le menu" : "Open menu"}
            aria-expanded={ouvert}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md"
            onClick={() => setOuvert((v) => !v)}
          >
            <span
              className={`h-0.5 w-6 bg-bark transition-transform ${ouvert ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-6 bg-bark ${ouvert ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-6 bg-bark transition-transform ${ouvert ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {ouvert && (
        <nav className="border-t border-sand-dark bg-cream px-4 pb-4 pt-2 md:hidden">
          {liens.map((lien) => {
            const actif = pathname === lien.href;
            return (
              <Link
                key={lien.href}
                href={lien.href}
                onClick={() => setOuvert(false)}
                className={`block rounded-lg px-4 py-3 text-base ${
                  actif ? "bg-corten text-cream" : "text-bark hover:bg-sand"
                }`}
              >
                {lien.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
