import type { Lang } from "./i18n";

export type Photo = {
  src: string;
  alt: string;
};

/** Chaîne localisée */
type LS = { fr: string; en: string };
type PhotoDef = { src: string; alt: LS };

export type Logement = {
  slug: string;
  nom: string;
  titre: string;
  accroche: string;
  capacite: number;
  etage: string;
  description: string[];
  couchages: { titre: string; detail: string }[];
  equipements: string[];
  hero: Photo;
  photos: Photo[];
  calendrier: "marmotte" | "bouquetin" | "maison";
};

type LogementDef = Omit<
  Logement,
  "nom" | "titre" | "accroche" | "etage" | "description" | "couchages" | "equipements" | "hero" | "photos"
> & {
  nom: LS;
  titre: LS;
  accroche: LS;
  etage: LS;
  description: LS[];
  couchages: { titre: LS; detail: LS }[];
  equipements: LS[];
  hero: PhotoDef;
  photos: PhotoDef[];
};

// Les deux salles de bains et le local skis sont identiques :
// les photos du Bouquetin sont réutilisées pour La Marmotte (demande de la propriétaire).
const sdbCommune: PhotoDef[] = [
  {
    src: "/photo/lebouquetin/sdb.jpeg",
    alt: {
      fr: "Salle de bains avec toilette et douche à l'italienne",
      en: "Bathroom with toilet and walk-in shower",
    },
  },
  {
    src: "/photo/lebouquetin/douche-italienne.jpeg",
    alt: { fr: "Douche à l'italienne", en: "Walk-in shower" },
  },
];

const localCommun: PhotoDef = {
  src: "/photo/lebouquetin/local.jpeg",
  alt: {
    fr: "Box fermé à clé pour skis et vélos, au sous-sol",
    en: "Lockable storage room for skis and bikes, in the basement",
  },
};

// Vue sur la montagne enneigée depuis la maison (commune aux deux appartements).
const vueAppart: PhotoDef = {
  src: "/photo/vue-appart.jpg",
  alt: {
    fr: "Vue sur la montagne enneigée depuis la maison",
    en: "View over the snow-covered mountain from the house",
  },
};

const marmotteDef: LogementDef = {
  slug: "la-marmotte",
  nom: { fr: "La Marmotte", en: "La Marmotte" },
  titre: { fr: "Appartement La Marmotte", en: "La Marmotte apartment" },
  accroche: {
    fr: "6 personnes · Rez-de-chaussée · Terrasse avec barbecue",
    en: "Sleeps 6 · Ground floor · Terrace with barbecue",
  },
  capacite: 6,
  etage: { fr: "Rez-de-chaussée", en: "Ground floor" },
  description: [
    {
      fr: "Au rez-de-chaussée du Ratty, l'appartement La Marmotte accueille jusqu'à 6 personnes dans un cadre chaleureux entièrement rénové.",
      en: "On the ground floor of Le Ratty, La Marmotte welcomes up to 6 guests in a warm, fully renovated setting.",
    },
    {
      fr: "Deux chambres confortables, un salon-salle à manger avec canapé convertible, une cuisine équipée et une salle de bains avec douche à l'italienne : tout est pensé pour un séjour en famille ou entre amis au cœur des montagnes.",
      en: "Two comfortable bedrooms, a living-dining room with a sofa bed, a fully equipped kitchen and a bathroom with a walk-in shower: everything you need for a family or friends' getaway in the heart of the mountains.",
    },
    {
      fr: "Vous profitez d'une terrasse avec barbecue, d'un parking privé sous vidéosurveillance et d'un box fermé à clé pour ranger skis et vélos.",
      en: "You also enjoy a terrace with barbecue, private parking under video surveillance and a lockable storage room for skis and bikes.",
    },
  ],
  couchages: [
    {
      titre: { fr: "Chambre 1", en: "Bedroom 1" },
      detail: { fr: "1 lit double + 1 lit bébé à barreaux", en: "1 double bed + 1 baby cot" },
    },
    {
      titre: { fr: "Chambre 2", en: "Bedroom 2" },
      detail: {
        fr: "2 lits simples ou 1 lit en 160 (au choix)",
        en: "2 single beds or 1 queen-size bed (your choice)",
      },
    },
    {
      titre: { fr: "Salon / salle à manger", en: "Living-dining room" },
      detail: { fr: "1 canapé convertible 2 places", en: "1 double sofa bed" },
    },
  ],
  equipements: [
    { fr: "Cuisine équipée", en: "Fully equipped kitchen" },
    {
      fr: "Salle de bains avec toilette et douche à l'italienne",
      en: "Bathroom with toilet and walk-in shower",
    },
    { fr: "Wifi", en: "Wifi" },
    { fr: "Machine à laver (au sous-sol)", en: "Washing machine (in the basement)" },
    { fr: "Box fermé à clé pour skis et vélos", en: "Lockable ski and bike storage" },
    { fr: "Terrasse avec barbecue", en: "Terrace with barbecue" },
    {
      fr: "Parking privé sous vidéosurveillance",
      en: "Private parking under video surveillance",
    },
    { fr: "Chauffage central", en: "Central heating" },
  ],
  hero: {
    src: "/photo/marmotte/salon-vue.jpeg",
    alt: {
      fr: "Salon lumineux de l'appartement La Marmotte",
      en: "Bright living room of La Marmotte",
    },
  },
  photos: [
    {
      src: "/photo/marmotte/salon-vue.jpeg",
      alt: { fr: "Salon avec vue de l'appartement La Marmotte", en: "Living room with a view, La Marmotte" },
    },
    {
      src: "/photo/marmotte/salon-2couchage.jpeg",
      alt: {
        fr: "Salon-salle à manger avec canapé convertible 2 places",
        en: "Living-dining room with double sofa bed",
      },
    },
    {
      src: "/photo/marmotte/vue-cuisine.jpg",
      alt: {
        fr: "Cuisine équipée et grande table de La Marmotte",
        en: "Fully equipped kitchen and large table, La Marmotte",
      },
    },
    {
      src: "/photo/marmotte/cuisine.jpeg",
      alt: { fr: "Cuisine équipée de La Marmotte", en: "Fully equipped kitchen, La Marmotte" },
    },
    {
      src: "/photo/marmotte/lit-double-marmotte.jpeg",
      alt: { fr: "Chambre avec lit double de La Marmotte", en: "Double bedroom, La Marmotte" },
    },
    {
      src: "/photo/marmotte/chambre-2lits.jpeg",
      alt: { fr: "Chambre avec deux lits simples", en: "Bedroom with two single beds" },
    },
    {
      src: "/photo/marmotte/chambre2.jpeg",
      alt: { fr: "Chambre de l'appartement La Marmotte", en: "Bedroom, La Marmotte" },
    },
    {
      src: "/photo/marmotte/chambre2-vue.jpeg",
      alt: { fr: "Chambre avec vue sur la montagne", en: "Bedroom with mountain view" },
    },
    ...sdbCommune,
    {
      src: "/photo/marmotte/terrasse-marmotte.jpeg",
      alt: {
        fr: "Terrasse de La Marmotte avec barbecue et bains de soleil",
        en: "La Marmotte terrace with barbecue and sun loungers",
      },
    },
    localCommun,
    vueAppart,
  ],
  calendrier: "marmotte",
};

const bouquetinDef: LogementDef = {
  slug: "le-bouquetin",
  nom: { fr: "Le Bouquetin", en: "Le Bouquetin" },
  titre: { fr: "Appartement Le Bouquetin", en: "Le Bouquetin apartment" },
  accroche: {
    fr: "8 personnes · 1er étage · Balcon-terrasse face aux montagnes",
    en: "Sleeps 8 · 1st floor · Balcony-terrace facing the mountains",
  },
  capacite: 8,
  etage: { fr: "1er étage", en: "1st floor" },
  description: [
    {
      fr: "Au premier étage du Ratty, l'appartement Le Bouquetin accueille jusqu'à 8 personnes. On y accède par le balcon-terrasse bordé des garde-corps en découpe laser, face aux montagnes.",
      en: "On the first floor of Le Ratty, Le Bouquetin welcomes up to 8 guests. You reach it via the balcony-terrace lined with laser-cut railings, facing the mountains.",
    },
    {
      fr: "Deux chambres, un grand salon avec deux canapés convertibles, une cuisine équipée avec une grande table conviviale et une salle de bains avec douche à l'italienne composent ce logement entièrement rénové.",
      en: "Two bedrooms, a large living room with two sofa beds, a fully equipped kitchen with a large convivial table and a bathroom with a walk-in shower make up this fully renovated home.",
    },
    {
      fr: "Comme La Marmotte, il dispose d'une terrasse avec barbecue, d'un parking privé sous vidéosurveillance, d'une machine à laver et d'un box fermé à clé pour skis et vélos.",
      en: "Like La Marmotte, it has a terrace with barbecue, private parking under video surveillance, a washing machine and a lockable storage room for skis and bikes.",
    },
  ],
  couchages: [
    {
      titre: { fr: "Chambre 1", en: "Bedroom 1" },
      detail: { fr: "1 lit double + 1 lit bébé à barreaux", en: "1 double bed + 1 baby cot" },
    },
    {
      titre: { fr: "Chambre 2", en: "Bedroom 2" },
      detail: {
        fr: "2 lits simples ou 1 lit en 160 (au choix)",
        en: "2 single beds or 1 queen-size bed (your choice)",
      },
    },
    {
      titre: { fr: "Salon", en: "Living room" },
      detail: { fr: "2 canapés convertibles 2 places", en: "2 double sofa beds" },
    },
  ],
  equipements: [
    { fr: "Cuisine équipée avec grande table", en: "Fully equipped kitchen with large table" },
    {
      fr: "Salle de bains avec toilette et douche à l'italienne",
      en: "Bathroom with toilet and walk-in shower",
    },
    { fr: "Wifi", en: "Wifi" },
    { fr: "Machine à laver (au sous-sol)", en: "Washing machine (in the basement)" },
    { fr: "Box fermé à clé pour skis et vélos", en: "Lockable ski and bike storage" },
    { fr: "Balcon-terrasse avec barbecue", en: "Balcony-terrace with barbecue" },
    {
      fr: "Parking privé sous vidéosurveillance",
      en: "Private parking under video surveillance",
    },
    { fr: "Chauffage central", en: "Central heating" },
  ],
  hero: {
    src: "/photo/lebouquetin/salon.jpeg",
    alt: { fr: "Salon de l'appartement Le Bouquetin", en: "Living room of Le Bouquetin" },
  },
  photos: [
    {
      src: "/photo/lebouquetin/salon.jpeg",
      alt: {
        fr: "Salon avec cheminée de l'appartement Le Bouquetin",
        en: "Living room with fireplace, Le Bouquetin",
      },
    },
    {
      src: "/photo/lebouquetin/salon-suite.jpeg",
      alt: { fr: "Salon avec canapés convertibles", en: "Living room with sofa beds" },
    },
    {
      src: "/photo/lebouquetin/cuisine.jpeg",
      alt: { fr: "Cuisine équipée du Bouquetin", en: "Fully equipped kitchen, Le Bouquetin" },
    },
    {
      src: "/photo/lebouquetin/chambre-double.jpeg",
      alt: { fr: "Chambre avec lit double", en: "Bedroom with double bed" },
    },
    {
      src: "/photo/lebouquetin/double-lit.jpeg",
      alt: { fr: "Chambre avec lit double du Bouquetin", en: "Double bedroom, Le Bouquetin" },
    },
    {
      src: "/photo/lebouquetin/chambre-bouquetin.jpeg",
      alt: { fr: "Chambre de l'appartement Le Bouquetin", en: "Bedroom, Le Bouquetin" },
    },
    {
      src: "/photo/lebouquetin/chambre2.jpeg",
      alt: { fr: "Deuxième chambre du Bouquetin", en: "Second bedroom, Le Bouquetin" },
    },
    ...sdbCommune,
    {
      src: "/photo/lebouquetin/acces-entree.jpeg",
      alt: {
        fr: "Accès au Bouquetin par le balcon, vue sur les montagnes",
        en: "Balcony access to Le Bouquetin, mountain view",
      },
    },
    {
      src: "/photo/lebouquetin/terrasse.jpeg",
      alt: {
        fr: "Terrasse avec parasol et barbecue",
        en: "Terrace with parasol and barbecue",
      },
    },
    {
      src: "/photo/lebouquetin/terrasse-suite.jpeg",
      alt: {
        fr: "Terrasse avec les garde-corps en découpe laser Le Ratty",
        en: "Terrace with the laser-cut Le Ratty railings",
      },
    },
    localCommun,
    vueAppart,
  ],
  calendrier: "bouquetin",
};

const maisonDef: LogementDef = {
  slug: "la-maison",
  nom: { fr: "La maison entière", en: "The whole house" },
  titre: { fr: "Le Ratty — la maison entière", en: "Le Ratty — the whole house" },
  accroche: {
    fr: "Jusqu'à 14 personnes · Les deux appartements réunis",
    en: "Up to 14 guests · Both apartments together",
  },
  capacite: 14,
  etage: { fr: "Maison complète", en: "Whole house" },
  description: [
    {
      fr: "Pour les grandes tablées, les cousinades et les séjours entre amis : louez Le Ratty en entier et profitez des deux appartements en même temps, pour accueillir jusqu'à 14 personnes. Les deux logements sont reliés par un escalier extérieur.",
      en: "For big family gatherings and holidays with friends: rent the whole of Le Ratty and enjoy both apartments at once, for up to 14 guests. The two homes are connected by an outdoor staircase.",
    },
    {
      fr: "La Marmotte au rez-de-chaussée (6 personnes) et Le Bouquetin au premier étage (8 personnes) offrent chacun leur cuisine équipée, leur salle de bains avec douche à l'italienne et leur terrasse avec barbecue : chaque famille garde son intimité. Et pour les repas tous ensemble, la grande table de la cuisine du Bouquetin réunit tout le monde dans un espace convivial.",
      en: "La Marmotte on the ground floor (6 guests) and Le Bouquetin on the first floor (8 guests) each have their own kitchen, bathroom with walk-in shower and terrace with barbecue, so every family keeps its privacy. And for shared meals, the large kitchen table in Le Bouquetin brings everyone together.",
    },
    {
      fr: "Cette configuration est idéale pour les grandes familles, les retrouvailles entre amis ou les séjours sportifs — ski, randonnée, vélo… La station du Grand-Bornand est à 7 minutes.",
      en: "This setup is ideal for large families, get-togethers with friends or sports holidays — skiing, hiking, cycling… Le Grand-Bornand resort is 7 minutes away.",
    },
  ],
  couchages: [
    {
      titre: { fr: "La Marmotte (RDC)", en: "La Marmotte (ground floor)" },
      detail: {
        fr: "6 personnes — 2 chambres + canapé convertible",
        en: "6 guests — 2 bedrooms + sofa bed",
      },
    },
    {
      titre: { fr: "Le Bouquetin (1er étage)", en: "Le Bouquetin (1st floor)" },
      detail: {
        fr: "8 personnes — 2 chambres + 2 canapés convertibles",
        en: "8 guests — 2 bedrooms + 2 sofa beds",
      },
    },
    {
      titre: { fr: "Au total", en: "In total" },
      detail: {
        fr: "4 chambres, 3 canapés convertibles, 2 lits bébé",
        en: "4 bedrooms, 3 sofa beds, 2 baby cots",
      },
    },
  ],
  equipements: [
    { fr: "2 cuisines équipées", en: "2 fully equipped kitchens" },
    {
      fr: "2 salles de bains avec douche à l'italienne",
      en: "2 bathrooms with walk-in shower",
    },
    { fr: "Wifi dans les deux appartements", en: "Wifi in both apartments" },
    { fr: "2 terrasses avec barbecue", en: "2 terraces with barbecue" },
    { fr: "Machines à laver", en: "Washing machines" },
    { fr: "Box fermés à clé pour skis et vélos", en: "Lockable ski and bike storage" },
    {
      fr: "Parking privé sous vidéosurveillance",
      en: "Private parking under video surveillance",
    },
    { fr: "Maison entièrement rénovée", en: "Fully renovated house" },
  ],
  hero: {
    src: "/photo/lebouquetin/maison.jpeg",
    alt: {
      fr: "La maison Le Ratty et ses garde-corps en découpe laser",
      en: "Le Ratty house with its laser-cut railings",
    },
  },
  photos: [
    {
      src: "/photo/lebouquetin/maison.jpeg",
      alt: { fr: "La maison Le Ratty vue de l'extérieur", en: "Le Ratty seen from outside" },
    },
    {
      src: "/photo/lebouquetin/acces-entree.jpeg",
      alt: {
        fr: "Balcon du premier étage face aux montagnes",
        en: "First-floor balcony facing the mountains",
      },
    },
    {
      src: "/photo/lebouquetin/terrasse.jpeg",
      alt: {
        fr: "Terrasse du rez-de-chaussée avec barbecue",
        en: "Ground-floor terrace with barbecue",
      },
    },
    {
      src: "/photo/lebouquetin/terrasse-suite.jpeg",
      alt: {
        fr: "Terrasse et garde-corps Le Ratty en découpe laser",
        en: "Terrace and laser-cut Le Ratty railings",
      },
    },
    {
      src: "/photo/marmotte/salon-vue.jpeg",
      alt: { fr: "Salon de La Marmotte", en: "Living room, La Marmotte" },
    },
    {
      src: "/photo/lebouquetin/salon.jpeg",
      alt: { fr: "Salon du Bouquetin", en: "Living room, Le Bouquetin" },
    },
    {
      src: "/photo/marmotte/cuisine.jpeg",
      alt: { fr: "Cuisine de La Marmotte", en: "Kitchen, La Marmotte" },
    },
    {
      src: "/photo/lebouquetin/cuisine.jpeg",
      alt: { fr: "Cuisine du Bouquetin", en: "Kitchen, Le Bouquetin" },
    },
    {
      src: "/photo/lebouquetin/parking.jpeg",
      alt: {
        fr: "Parking privé sous vidéosurveillance",
        en: "Private parking under video surveillance",
      },
    },
    localCommun,
    vueAppart,
  ],
  calendrier: "maison",
};

function resoudre(def: LogementDef, lang: Lang): Logement {
  return {
    ...def,
    nom: def.nom[lang],
    titre: def.titre[lang],
    accroche: def.accroche[lang],
    etage: def.etage[lang],
    description: def.description.map((d) => d[lang]),
    couchages: def.couchages.map((c) => ({ titre: c.titre[lang], detail: c.detail[lang] })),
    equipements: def.equipements.map((e) => e[lang]),
    hero: { src: def.hero.src, alt: def.hero.alt[lang] },
    photos: def.photos.map((p) => ({ src: p.src, alt: p.alt[lang] })),
  };
}

export function getLogements(lang: Lang) {
  return {
    marmotte: resoudre(marmotteDef, lang),
    bouquetin: resoudre(bouquetinDef, lang),
    maison: resoudre(maisonDef, lang),
  };
}

export const contact = {
  email: "leraty74.entremont@gmail.com",
  telephone: "06 82 55 99 41",
  telephoneHref: "tel:+33682559941",
};

// Classement officiel « Meublé de Tourisme » (Atout France, 2024, valable 5 ans).
export const classement = {
  etoiles: 2,
  annee: 2024,
};

export const adresse = {
  rue: "1203 Route de la Douane",
  lieuDit: "Entremont",
  codePostal: "74130",
  commune: "Glières-Val-de-Borne",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=1203+Route+de+la+Douane+74130+Gli%C3%A8res-Val-de-Borne",
};

export function getAtouts(lang: Lang) {
  const defs: { titre: LS; detail: LS }[] = [
    {
      titre: { fr: "Stations à deux pas", en: "Ski resorts nearby" },
      detail: {
        fr: "Le Grand-Bornand à 7 minutes, La Clusaz à 11 minutes. Les bus Proximiti 460/461 s'arrêtent devant la mairie d'Entremont et desservent le Grand-Bornand en saison de ski.",
        en: "Le Grand-Bornand is 7 minutes away, La Clusaz 11 minutes. Proximiti buses 460/461 stop at the Entremont town hall and serve Le Grand-Bornand during the ski season.",
      },
    },
    {
      titre: { fr: "Parking privé vidéosurveillé", en: "Private monitored parking" },
      detail: {
        fr: "Grand parking privé au pied de la maison, sous vidéosurveillance — jusqu'à 6 voitures.",
        en: "Large private car park at the foot of the house, under video surveillance — room for up to 6 cars.",
      },
    },
    {
      titre: { fr: "Local skis & vélos", en: "Ski & bike storage" },
      detail: {
        fr: "Box fermés à clé au sous-sol pour votre matériel de ski et vos vélos.",
        en: "Lockable storage rooms in the basement for your ski gear and bikes.",
      },
    },
    {
      titre: { fr: "Terrasses & barbecues", en: "Terraces & barbecues" },
      detail: {
        fr: "Chaque appartement dispose de sa terrasse avec barbecue.",
        en: "Each apartment has its own terrace with barbecue.",
      },
    },
    {
      titre: { fr: "Vue sur le Borne", en: "View over the Borne river" },
      detail: {
        fr: "La rivière coule sous vos fenêtres, avec possibilité de pêche à la truite.",
        en: "The river flows right below your windows, with trout fishing possible.",
      },
    },
    {
      titre: { fr: "Partenariat Freeglisse", en: "Freeglisse partnership" },
      detail: {
        fr: "Tarif préférentiel sur la location de matériel chez Freeglisse à Saint-Pierre-en-Faucigny.",
        en: "Preferential rates on equipment rental at Freeglisse in Saint-Pierre-en-Faucigny.",
      },
    },
  ];
  return defs.map((d) => ({ titre: d.titre[lang], detail: d.detail[lang] }));
}
