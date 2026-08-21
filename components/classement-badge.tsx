import { classement } from "@/lib/logements";
import type { Lang } from "@/lib/i18n";

const T = {
  fr: {
    label: "Meublé de Tourisme",
    sous: `Classé ${classement.etoiles} étoiles · Atout France ${classement.annee}`,
    aria: `Meublé de Tourisme classé ${classement.etoiles} étoiles`,
  },
  en: {
    label: "Meublé de Tourisme",
    sous: `${classement.etoiles}-star rated · Atout France ${classement.annee}`,
    aria: `${classement.etoiles}-star rated tourist accommodation`,
  },
};

/** Badge officiel « Meublé de Tourisme » avec le nombre d'étoiles. */
export default function ClassementBadge({
  lang = "fr",
  className = "",
}: {
  lang?: Lang;
  className?: string;
}) {
  const t = T[lang];

  return (
    <div
      aria-label={t.aria}
      className={`inline-flex items-center gap-3 rounded-xl border border-corten/30 bg-cream px-4 py-3 shadow-sm ${className}`}
    >
      <div className="flex flex-col items-center justify-center rounded-lg bg-bark px-3 py-2 text-cream">
        <span aria-hidden className="text-lg leading-none tracking-widest text-corten-light">
          {"★".repeat(classement.etoiles)}
        </span>
      </div>
      <div className="text-left">
        <p className="font-serif text-base font-bold leading-tight text-bark">
          {t.label}
        </p>
        <p className="text-xs text-bark-light">{t.sous}</p>
      </div>
    </div>
  );
}
