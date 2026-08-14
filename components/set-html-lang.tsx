"use client";

import { useEffect } from "react";

/** Ajuste l'attribut lang de <html> pour les pages anglaises (le layout racine est en fr). */
export default function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "fr";
    };
  }, [lang]);
  return null;
}
