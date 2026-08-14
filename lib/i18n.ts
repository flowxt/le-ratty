export type Lang = "fr" | "en";

/** Préfixe d'URL du site anglais ("" pour le français, "/en" pour l'anglais). */
export function localePrefix(lang: Lang): string {
  return lang === "fr" ? "" : "/en";
}

export function langFromPathname(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

/** Chemin équivalent dans l'autre langue (les routes sont identiques, seul le préfixe change). */
export function switchLangPath(pathname: string, cible: Lang): string {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return cible === "fr" ? stripped : stripped === "/" ? "/en" : `/en${stripped}`;
}
