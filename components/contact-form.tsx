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
    labels: {
      bien: "Logement souhaité",
      nom: "Nom et prénom",
      nomPh: "Votre nom",
      email: "Votre e-mail",
      emailPh: "vous@exemple.fr",
      personnes: "Nombre de personnes",
      dates: "Dates souhaitées",
      datesPh: "Ex. : du 14 au 21 février 2027",
      message: "Votre message",
      messagePh: "Une question, une précision sur votre séjour…",
      envoyer: "Envoyer ma demande",
      envoi: "Envoi en cours…",
    },
    succes:
      "Merci ! Votre demande a bien été envoyée. Nous vous répondrons rapidement.",
    erreur: `Une erreur est survenue. Vous pouvez nous écrire directement à ${contact.email} ou nous appeler au ${contact.telephone}.`,
  },
  en: {
    biens: [
      "La Marmotte (sleeps 6)",
      "Le Bouquetin (sleeps 8)",
      "The whole house (sleeps 14)",
    ],
    labels: {
      bien: "Accommodation",
      nom: "Full name",
      nomPh: "Your name",
      email: "Your e-mail",
      emailPh: "you@example.com",
      personnes: "Number of guests",
      dates: "Requested dates",
      datesPh: "E.g.: 14 to 21 February 2027",
      message: "Your message",
      messagePh: "A question, a detail about your stay…",
      envoyer: "Send my request",
      envoi: "Sending…",
    },
    succes: "Thank you! Your request has been sent. We will get back to you shortly.",
    erreur: `Something went wrong. You can write to us directly at ${contact.email} or call ${contact.telephone}.`,
  },
};

type Etat = "idle" | "envoi" | "succes" | "erreur";

export default function ContactForm({ lang = "fr" }: { lang?: Lang }) {
  const t = T[lang];
  const [bien, setBien] = useState(t.biens[0]);
  const [etat, setEtat] = useState<Etat>("idle");

  const envoyer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const donnees = new FormData(form);
    setEtat("envoi");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bien,
          nom: donnees.get("nom"),
          email: donnees.get("email"),
          dates: donnees.get("dates"),
          personnes: donnees.get("personnes"),
          message: donnees.get("message"),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setEtat("succes");
      form.reset();
      setBien(t.biens[0]);
    } catch {
      setEtat("erreur");
    }
  };

  const champ =
    "w-full rounded-xl border border-sand-dark bg-cream px-4 py-3 text-bark placeholder:text-bark-light/60 focus:outline-none focus:ring-2 focus:ring-corten";

  if (etat === "succes") {
    return (
      <div className="rounded-xl border border-corten/30 bg-cream p-6 text-center">
        <p className="text-2xl" aria-hidden>
          ✓
        </p>
        <p className="mt-2 font-bold text-bark">{t.succes}</p>
      </div>
    );
  }

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
          <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-bark">
            {t.labels.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={champ}
            placeholder={t.labels.emailPh}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
        <div>
          <label htmlFor="dates" className="mb-1.5 block text-sm font-bold text-bark">
            {t.labels.dates}
          </label>
          <input id="dates" name="dates" required className={champ} placeholder={t.labels.datesPh} />
        </div>
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

      {etat === "erreur" && (
        <p className="rounded-xl border border-corten/40 bg-corten/10 px-4 py-3 text-sm text-corten-dark">
          {t.erreur}
        </p>
      )}

      <button
        type="submit"
        disabled={etat === "envoi"}
        className="w-full rounded-full bg-corten px-6 py-3.5 font-bold text-cream transition-colors hover:bg-corten-dark disabled:opacity-60 sm:w-auto"
      >
        {etat === "envoi" ? t.labels.envoi : t.labels.envoyer}
      </button>
    </form>
  );
}
