import Image from "next/image";
import Link from "next/link";
import Gallery from "@/components/gallery";
import AvailabilityCalendar from "@/components/availability-calendar";
import type { Logement } from "@/lib/logements";
import { localePrefix, type Lang } from "@/lib/i18n";

const T = {
  fr: {
    jusqua: (n: number) => `jusqu'à ${n} personnes`,
    couchages: "Couchages",
    equipements: "Équipements",
    reserver: "Demander une réservation",
    visite: "La visite en photos",
  },
  en: {
    jusqua: (n: number) => `up to ${n} guests`,
    couchages: "Sleeping arrangements",
    equipements: "Amenities",
    reserver: "Request a booking",
    visite: "Photo tour",
  },
};

export default function LogementDetail({
  logement,
  lang = "fr",
}: {
  logement: Logement;
  lang?: Lang;
}) {
  const t = T[lang];
  const prefixe = localePrefix(lang);

  return (
    <article>
      <section className="relative h-[45vh] min-h-[320px] sm:h-[55vh]">
        <Image
          src={logement.hero.src}
          alt={logement.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bark/80 via-bark/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-8 sm:px-6">
          <p className="text-sm uppercase tracking-widest text-cream/80">
            {logement.etage} · {t.jusqua(logement.capacite)}
          </p>
          <h1 className="mt-1 font-serif text-4xl font-bold text-cream sm:text-5xl">
            {logement.titre}
          </h1>
          <p className="mt-2 text-cream/90">{logement.accroche}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            {logement.description.map((paragraphe) => (
              <p
                key={paragraphe.slice(0, 40)}
                className="mb-4 leading-relaxed text-bark-light"
              >
                {paragraphe}
              </p>
            ))}

            <h2 className="mt-8 font-serif text-2xl text-bark">{t.couchages}</h2>
            <ul className="mt-4 space-y-3">
              {logement.couchages.map((c) => (
                <li
                  key={c.titre}
                  className="rounded-xl border border-sand-dark bg-sand/50 px-4 py-3"
                >
                  <span className="font-bold text-bark">{c.titre}</span>
                  <span className="text-bark-light"> — {c.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-2xl border border-sand-dark bg-sand/50 p-6">
            <h2 className="font-serif text-2xl text-bark">{t.equipements}</h2>
            <ul className="mt-4 space-y-2.5">
              {logement.equipements.map((e) => (
                <li key={e} className="flex items-start gap-2.5 text-sm text-bark-light">
                  <span aria-hidden className="mt-0.5 text-corten">✓</span>
                  {e}
                </li>
              ))}
            </ul>
            <Link
              href={`${prefixe}/contact`}
              className="mt-6 block rounded-full bg-corten px-6 py-3 text-center font-bold text-cream transition-colors hover:bg-corten-dark"
            >
              {t.reserver}
            </Link>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <h2 className="mb-6 font-serif text-3xl text-bark">{t.visite}</h2>
        <Gallery photos={logement.photos} lang={lang} />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6" id="disponibilites">
        <AvailabilityCalendar bien={logement.calendrier} lang={lang} />
      </section>
    </article>
  );
}
