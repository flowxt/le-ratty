import type { Lang } from "./i18n";

export type Avis = {
  nom: string;
  texte: string;
  source: "Booking.com" | "Google";
  /** Date de séjour (avis Google) ou pays (avis Booking) */
  complement?: { fr: string; en: string };
};

export const lienAvisGoogle = "https://share.google/ZFmYTDqLKW9cxhYBK";

export const listeAvis: Avis[] = [
  {
    nom: "Iwona",
    source: "Google",
    complement: { fr: "Juillet 2026", en: "July 2026" },
    texte:
      "L'appartement est très spacieux et idéal pour notre famille de cinq personnes. Nous avons particulièrement apprécié la grande cuisine bien équipée avec sa table spacieuse, le calme des lieux, la fraîcheur constante de la vallée et la proximité de magnifiques sites alpins. Les hôtes étaient très accueillants et serviables.",
  },
  {
    nom: "Hanane",
    source: "Google",
    complement: { fr: "Juillet 2026", en: "July 2026" },
    texte:
      "Tout a été parfait du début à la fin, l'endroit est magnifique, très calme, tout est à proximité (supérette, boulangerie, restaurant) à moins de 5 minutes en voiture. Concernant le logement, vous ne manquerez de rien, à se sentir presque chez nous. Je recommande à 300 %.",
  },
  {
    nom: "Frunza",
    source: "Google",
    complement: { fr: "Juillet 2025", en: "July 2025" },
    texte:
      "Superbe endroit, deuxième fois que j'y viens en famille. Hôtes accueillants, à l'écoute, très sympathiques et d'une énorme gentillesse. Appartement très bien équipé, lit confortable, bonne connexion wifi, barbecue sur place, cuisine équipée, télévision connectée. Propre, soigné. Je recommande à 100 %.",
  },
  {
    nom: "Benoit",
    source: "Google",
    complement: { fr: "Mars 2024", en: "March 2024" },
    texte:
      "Nous venons de passer un excellent weekend dans l'appartement des marmottes. C'est un sans faute de bout en bout ! Gentillesse des hôtes, très chouette appart, très propre, bien équipé et bien situé. Il est extrêmement bien isolé phoniquement et thermiquement. Je recommande vivement.",
  },
  {
    nom: "Daniel",
    source: "Google",
    complement: { fr: "Mars 2024", en: "March 2024" },
    texte:
      "Nous avons vécu un très bon moment dans ce bel appartement. Spacieux, propre, très bien équipé et très bien situé. Proche des stations du Grand-Bornand et de La Clusaz. Juste parfait. Les hôtes sont très accueillants, réactifs et à l'écoute… Merci.",
  },
  {
    nom: "Fabien",
    source: "Google",
    complement: { fr: "Février 2024", en: "February 2024" },
    texte:
      "Beaucoup d'espace et de rangements, parking très grand pouvant accueillir au moins 6 voitures, idéal pour les familles ou groupes. Super accueil des propriétaires.",
  },
  {
    nom: "Virginie",
    source: "Booking.com",
    complement: { fr: "France", en: "France" },
    texte:
      "La maison de Nathalie et de son mari est très paisible, on s'est tout de suite senti dans un cocon, comme à la maison !",
  },
  {
    nom: "Jean-Baptiste",
    source: "Booking.com",
    complement: { fr: "France", en: "France" },
    texte:
      "L'accueil et la disponibilité des propriétaires. L'hébergement est vraiment très bien équipé.",
  },
  {
    nom: "Melissa",
    source: "Booking.com",
    complement: { fr: "France", en: "France" },
    texte:
      "Super endroit, à proximité des stations et au calme. Hôtes super, rien à dire, tout était parfait.",
  },
  {
    nom: "Catherine",
    source: "Booking.com",
    complement: { fr: "France", en: "France" },
    texte:
      "La gentillesse des propriétaires. Lits confortables, tout le matériel propre.",
  },
  {
    nom: "Sylvain",
    source: "Booking.com",
    complement: { fr: "France", en: "France" },
    texte:
      "Bon accueil de l'hôte. Accessible et disponible, flexible par rapport aux horaires d'arrivée. Merci à eux.",
  },
  {
    nom: "Alina",
    source: "Booking.com",
    complement: { fr: "Italie", en: "Italy" },
    texte:
      "We had a wonderful holiday and the apartment was perfect for our stay. The house was clean, cozy, and well equipped with everything we needed.",
  },
  {
    nom: "Chiara",
    source: "Booking.com",
    complement: { fr: "Italie", en: "Italy" },
    texte:
      "L'appartamento è pulito, grande, ben fornito e in una posizione silenziosa. Tutto nuovo e perfettamente funzionante.",
  },
];

export function complementAvis(avis: Avis, lang: Lang): string | undefined {
  return avis.complement?.[lang];
}
