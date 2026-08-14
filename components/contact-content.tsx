import ContactForm from "@/components/contact-form";
import { adresse, contact } from "@/lib/logements";
import type { Lang } from "@/lib/i18n";

const T = {
  fr: {
    sur: "Contact & réservation",
    titre: "Préparez votre séjour au Ratty",
    intro:
      "Une question, une demande de réservation pour La Marmotte, Le Bouquetin ou la maison entière ? Appelez-nous ou écrivez-nous, nous vous répondrons rapidement.",
    formTitre: "Demande de réservation",
    coordonnees: "Nous joindre",
    trouver: "Nous trouver",
    maps: "Ouvrir dans Google Maps",
    acces:
      "Station du Grand-Bornand à 7 minutes en voiture.\nBus Proximiti 460/461, arrêt devant la mairie d'Entremont.",
    bonASavoir: "Bon à savoir",
    infos: [
      {
        titre: "Réservation en direct",
        detail:
          "La réservation se fait directement auprès de nous, avec un contrat de location simple : nom et prénom, adresse postale, e-mail, nombre de personnes et durée du séjour.",
      },
      {
        titre: "Caution",
        detail: "Une caution est demandée à l'arrivée, en espèces ou par chèque.",
      },
      {
        titre: "Taxe de séjour",
        detail: "1 € par adulte et par nuit, collectée pour la commune.",
      },
      {
        titre: "Accueil sur place",
        detail:
          "Nous privilégions un accueil physique : nous vous remettons les clés en personne et vous faisons visiter les lieux.",
      },
    ],
  },
  en: {
    sur: "Contact & booking",
    titre: "Plan your stay at Le Ratty",
    intro:
      "A question, or a booking request for La Marmotte, Le Bouquetin or the whole house? Call or write to us — we will get back to you quickly.",
    formTitre: "Booking request",
    coordonnees: "Get in touch",
    trouver: "Find us",
    maps: "Open in Google Maps",
    acces:
      "Le Grand-Bornand resort is 7 minutes by car.\nProximiti buses 460/461 stop at the Entremont town hall.",
    bonASavoir: "Good to know",
    infos: [
      {
        titre: "Direct booking",
        detail:
          "Booking is made directly with us, with a simple rental contract: full name, postal address, e-mail, number of guests and length of stay.",
      },
      {
        titre: "Deposit",
        detail: "A deposit is requested on arrival, in cash or by cheque.",
      },
      {
        titre: "Tourist tax",
        detail: "€1 per adult per night, collected for the municipality.",
      },
      {
        titre: "Welcome on site",
        detail:
          "We favour a personal welcome: we hand you the keys in person and show you around.",
      },
    ],
  },
};

export default function ContactContent({ lang = "fr" }: { lang?: Lang }) {
  const t = T[lang];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-widest text-corten">{t.sur}</p>
      <h1 className="mt-2 font-serif text-4xl font-bold text-bark sm:text-5xl">
        {t.titre}
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-bark-light">{t.intro}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={contact.telephoneHref}
          className="rounded-full bg-corten px-6 py-3 font-bold text-cream transition-colors hover:bg-corten-dark"
        >
          {contact.telephone}
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="rounded-full border border-corten px-6 py-3 font-bold text-corten transition-colors hover:bg-corten hover:text-cream"
        >
          {contact.email}
        </a>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[3fr_2fr]">
        <section className="rounded-2xl border border-sand-dark bg-sand/40 p-6 sm:p-8">
          <h2 className="mb-6 font-serif text-2xl text-bark">{t.formTitre}</h2>
          <ContactForm lang={lang} />
        </section>

        <div className="space-y-8">
          <section>
            <h2 className="font-serif text-2xl text-bark">{t.trouver}</h2>
            <address className="mt-3 not-italic leading-relaxed text-bark-light">
              {adresse.rue}
              <br />
              {adresse.lieuDit}
              <br />
              {adresse.codePostal} {adresse.commune}
            </address>
            <a
              href={adresse.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-bold text-corten underline-offset-4 hover:underline"
            >
              {t.maps}
            </a>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-bark-light">
              {t.acces}
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-bark">{t.bonASavoir}</h2>
            <ul className="mt-4 space-y-4">
              {t.infos.map((info) => (
                <li
                  key={info.titre}
                  className="rounded-xl border border-sand-dark bg-cream p-4"
                >
                  <p className="font-bold text-bark">{info.titre}</p>
                  <p className="mt-1 text-sm leading-relaxed text-bark-light">
                    {info.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
