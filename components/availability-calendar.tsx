"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";

type Props = {
  bien: "marmotte" | "bouquetin" | "maison";
  lang?: Lang;
};

type Reponse = {
  busy: { start: string; end: string }[]; // end exclusif, format YYYY-MM-DD
  configure: boolean;
};

const T = {
  fr: {
    mois: [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
    ],
    jours: ["L", "M", "M", "J", "V", "S", "D"],
    titre: "Disponibilités",
    precedent: "Mois précédents",
    suivant: "Mois suivants",
    erreur:
      "Le calendrier est momentanément indisponible. Contactez-nous pour connaître les disponibilités.",
    chargement: "Chargement du calendrier…",
    disponible: "Disponible",
    occupe: "Occupé",
    nonConfigure:
      "Calendrier en cours de mise en place — contactez-nous pour vérifier les disponibilités.",
  },
  en: {
    mois: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    jours: ["M", "T", "W", "T", "F", "S", "S"],
    titre: "Availability",
    precedent: "Previous months",
    suivant: "Next months",
    erreur:
      "The calendar is temporarily unavailable. Please contact us to check availability.",
    chargement: "Loading calendar…",
    disponible: "Available",
    occupe: "Booked",
    nonConfigure:
      "Calendar coming soon — please contact us to check availability.",
  },
};

function cle(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function AvailabilityCalendar({ bien, lang = "fr" }: Props) {
  const t = T[lang];
  const [donnees, setDonnees] = useState<Reponse | null>(null);
  const [erreur, setErreur] = useState(false);
  const [depart, setDepart] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  useEffect(() => {
    let annule = false;
    fetch(`/api/disponibilites?bien=${bien}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((json: Reponse) => {
        if (!annule) setDonnees(json);
      })
      .catch(() => {
        if (!annule) setErreur(true);
      });
    return () => {
      annule = true;
    };
  }, [bien]);

  const joursOccupes = useMemo(() => {
    const ensemble = new Set<string>();
    if (!donnees) return ensemble;
    for (const { start, end } of donnees.busy) {
      const d = new Date(`${start}T00:00:00`);
      const fin = new Date(`${end}T00:00:00`);
      while (d < fin) {
        ensemble.add(cle(d));
        d.setDate(d.getDate() + 1);
      }
    }
    return ensemble;
  }, [donnees]);

  const aujourdHui = cle(new Date());

  const rendreMois = (base: Date) => {
    const annee = base.getFullYear();
    const mois = base.getMonth();
    const premier = new Date(annee, mois, 1);
    const nbJours = new Date(annee, mois + 1, 0).getDate();
    // Lundi = 0
    const decalage = (premier.getDay() + 6) % 7;

    const cases: (Date | null)[] = [
      ...Array.from({ length: decalage }, () => null),
      ...Array.from({ length: nbJours }, (_, i) => new Date(annee, mois, i + 1)),
    ];

    return (
      <div key={`${annee}-${mois}`} className="w-full">
        <p className="mb-3 text-center font-serif text-lg text-bark">
          {t.mois[mois]} {annee}
        </p>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-bark-light">
          {t.jours.map((j, i) => (
            <span key={i} className="py-1 font-bold">
              {j}
            </span>
          ))}
          {cases.map((date, i) => {
            if (!date) return <span key={`v-${i}`} />;
            const k = cle(date);
            const occupe = joursOccupes.has(k);
            const passe = k < aujourdHui;
            return (
              <span
                key={k}
                className={`rounded-md py-1.5 text-sm ${
                  passe
                    ? "text-bark-light/40"
                    : occupe
                      ? "bg-corten text-cream"
                      : "bg-sand text-bark"
                }`}
              >
                {date.getDate()}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  const moisSuivant = new Date(depart.getFullYear(), depart.getMonth() + 1, 1);

  return (
    <div className="rounded-2xl border border-sand-dark bg-cream p-5 sm:p-7">
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setDepart(new Date(depart.getFullYear(), depart.getMonth() - 1, 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-xl text-bark hover:bg-sand-dark"
          aria-label={t.precedent}
        >
          ‹
        </button>
        <p className="font-serif text-xl text-bark">{t.titre}</p>
        <button
          type="button"
          onClick={() => setDepart(new Date(depart.getFullYear(), depart.getMonth() + 1, 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-xl text-bark hover:bg-sand-dark"
          aria-label={t.suivant}
        >
          ›
        </button>
      </div>

      {erreur ? (
        <p className="py-6 text-center text-sm text-bark-light">{t.erreur}</p>
      ) : !donnees ? (
        <p className="py-6 text-center text-sm text-bark-light">{t.chargement}</p>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2">
            {rendreMois(depart)}
            <div className="hidden sm:block">{rendreMois(moisSuivant)}</div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-bark-light">
            <span className="flex items-center gap-2">
              <span className="inline-block h-3.5 w-3.5 rounded bg-sand ring-1 ring-sand-dark" />
              {t.disponible}
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-3.5 w-3.5 rounded bg-corten" />
              {t.occupe}
            </span>
          </div>
          {!donnees.configure && (
            <p className="mt-4 text-center text-xs italic text-bark-light">
              {t.nonConfigure}
            </p>
          )}
        </>
      )}
    </div>
  );
}
