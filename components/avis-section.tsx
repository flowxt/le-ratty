import { complementAvis, lienAvisGoogle, listeAvis } from "@/lib/avis";
import type { Lang } from "@/lib/i18n";

const T = {
  fr: {
    titre: "Ils ont séjourné au Ratty",
    booking: "Exceptionnel · 9,6/10 sur Booking.com",
    google: "5/5 sur Google — voir les avis",
    source: "Avis",
  },
  en: {
    titre: "Guests loved their stay",
    booking: "Exceptional · 9.6/10 on Booking.com",
    google: "5/5 on Google — see the reviews",
    source: "Review from",
  },
};

export default function AvisSection({ lang = "fr" }: { lang?: Lang }) {
  const t = T[lang];

  return (
    <section className="border-t border-sand-dark bg-sand/40 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-serif text-3xl text-bark sm:text-4xl">
          {t.titre}
        </h2>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="rounded-full bg-bark px-4 py-2 font-bold text-cream">
            {t.booking}
          </span>
          <a
            href={lienAvisGoogle}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-corten px-4 py-2 font-bold text-corten transition-colors hover:bg-corten hover:text-cream"
          >
            <span aria-hidden>★★★★★</span> {t.google}
          </a>
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {listeAvis.map((avis) => (
            <figure
              key={avis.nom + avis.source}
              className="mb-5 break-inside-avoid rounded-2xl border border-sand-dark bg-cream p-6"
            >
              <blockquote className="text-sm leading-relaxed text-bark-light">
                « {avis.texte} »
              </blockquote>
              <figcaption className="mt-4 flex items-baseline justify-between gap-3">
                <span className="font-bold text-bark">
                  {avis.nom}
                  {complementAvis(avis, lang) && (
                    <span className="ml-2 font-normal text-bark-light">
                      · {complementAvis(avis, lang)}
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-xs uppercase tracking-wide text-corten">
                  {avis.source}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
