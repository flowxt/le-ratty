"use client";

import { useState } from "react";
import { contact } from "@/lib/logements";
import type { Lang } from "@/lib/i18n";

const T = {
  fr: {
    biens: [
      "La Marmotte (6 personnes)",
      "Le Bouquetin (8 personnes)",
      "La maison entière (14 personnes)",
    ],
    sujet: (bien: string) => `Demande de réservation — ${bien}`,
    corps: {
      bonjour: "Bonjour,",
      souhait: "Je souhaite réserver :",
      nom: "Nom et prénom :",
      dates: "Dates souhaitées :",
      personnes: "Nombre de personnes :",
    },
    labels: {
      bien: "Logement souhaité",
      nom: "Nom et prénom",
      nomPh: "Votre nom",
      personnes: "Nombre de personnes",
      dates: "Dates souhaitées",
      datesPh: "Ex. : du 14 au 21 février 2027",
      message: "Votre message",
      messagePh: "Une question, une précision sur votre séjour…",
      envoyer: "Envoyer ma demande",
      note: (email: string) =>
        `Le bouton ouvre votre messagerie avec la demande pré-remplie, à envoyer à ${email}.`,
    },
  },
  en: {
    biens: [
      "La Marmotte (sleeps 6)",
      "Le Bouquetin (sleeps 8)",
      "The whole house (sleeps 14)",
    ],
    sujet: (bien: string) => `Booking request — ${bien}`,
    corps: {
      bonjour: "Hello,",
      souhait: "I would like to book:",
      nom: "Full name:",
      dates: "Requested dates:",
      personnes: "Number of guests:",
    },
    labels: {
      bien: "Accommodation",
      nom: "Full name",
      nomPh: "Your name",
      personnes: "Number of guests",
      dates: "Requested dates",
      datesPh: "E.g.: 14 to 21 February 2027",
      message: "Your message",
      messagePh: "A question, a detail about your stay…",
      envoyer: "Send my request",
      note: (email: string) =>
        `The button opens your e-mail app with a pre-filled request to ${email}.`,
    },
  },
};

export default function ContactForm({ lang = "fr" }: { lang?: Lang }) {
  const t = T[lang];
  const [bien, setBien] = useState(t.biens[0]);

  const envoyer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const donnees = new FormData(e.currentTarget);
    const sujet = t.sujet(bien);
    const corps = [
      t.corps.bonjour,
      ``,
      `${t.corps.souhait} ${bien}`,
      `${t.corps.nom} ${donnees.get("nom")}`,
      `${t.corps.dates} ${donnees.get("dates")}`,
      `${t.corps.personnes} ${donnees.get("personnes")}`,
      ``,
      `${donnees.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
  };

  const champ =
    "w-full rounded-xl border border-sand-dark bg-cream px-4 py-3 text-bark placeholder:text-bark-light/60 focus:outline-none focus:ring-2 focus:ring-corten";

  return (
    <form onSubmit={envoyer} className="space-y-4">
      <div>
        <label htmlFor="bien" className="mb-1.5 block text-sm font-bold text-bark">
          {t.labels.bien}
        </label>
        <select
          id="bien"
          name="bien"
          value={bien}
          onChange={(e) => setBien(e.target.value)}
          className={champ}
        >
          {t.biens.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className="mb-1.5 block text-sm font-bold text-bark">
            {t.labels.nom}
          </label>
          <input id="nom" name="nom" required className={champ} placeholder={t.labels.nomPh} />
        </div>
        <div>
          <label htmlFor="personnes" className="mb-1.5 block text-sm font-bold text-bark">
            {t.labels.personnes}
          </label>
          <input
            id="personnes"
            name="personnes"
            type="number"
            min={1}
            max={14}
            required
            className={champ}
            placeholder="4"
          />
        </div>
      </div>

      <div>
        <label htmlFor="dates" className="mb-1.5 block text-sm font-bold text-bark">
          {t.labels.dates}
        </label>
        <input id="dates" name="dates" required className={champ} placeholder={t.labels.datesPh} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-bold text-bark">
          {t.labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={champ}
          placeholder={t.labels.messagePh}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-corten px-6 py-3.5 font-bold text-cream transition-colors hover:bg-corten-dark sm:w-auto"
      >
        {t.labels.envoyer}
      </button>
      <p className="text-xs text-bark-light">{t.labels.note(contact.email)}</p>
    </form>
  );
}
