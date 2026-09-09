import Image from "next/image";
import type { Lang } from "@/lib/i18n";

const T = {
  fr: {
    accepte: "Chèques-Vacances ANCV acceptés",
    alt: "Logo ANCV Chèque-Vacances",
  },
  en: {
    accepte: "ANCV Chèque-Vacances accepted",
    alt: "ANCV Chèque-Vacances logo",
  },
};

/** Pastille blanche affichant que les Chèques-Vacances ANCV sont acceptés. */
export default function AncvBadge({
  lang = "fr",
  className = "",
}: {
  lang?: Lang;
  className?: string;
}) {
  const t = T[lang];
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm ring-1 ring-black/5 ${className}`}
    >
      <Image
        src="/photo/ancv.png"
        alt={t.alt}
        width={772}
        height={469}
        className="h-9 w-auto"
      />
      <span className="text-sm font-semibold text-bark">{t.accepte}</span>
    </div>
  );
}
