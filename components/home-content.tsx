import Image from "next/image";
import Link from "next/link";
import AvisSection from "@/components/avis-section";
import ClassementBadge from "@/components/classement-badge";
import { adresse, getAtouts, getLogements } from "@/lib/logements";
import { localePrefix, type Lang } from "@/lib/i18n";

const T = {
  fr: {
    heroAlt: "La maison Le Ratty à Entremont, Haute-Savoie",
    lieu: "Entremont · Glières-Val-de-Borne · Haute-Savoie",
    heroTexte:
      "Deux appartements de charme dans une maison de famille entièrement rénovée, à 7 minutes du Grand-Bornand. Ensemble, ils accueillent jusqu'à 14 personnes.",
    ctaMaison: "Louer la maison entière",
    ctaContact: "Nous contacter",
    presTitre: "Une maison de famille, deux appartements",
    presTexte1:
      "Le Ratty se compose de deux appartements indépendants : Le Bouquetin à l'étage et La Marmotte au rez-de-chaussée, reliés par un escalier extérieur. Réservés ensemble, ils accueillent jusqu'à 14 personnes — et la grande table de la cuisine du Bouquetin permet à tous de partager les repas dans un espace convivial.",
    presTexte2:
      "Une configuration idéale pour les grandes familles, les retrouvailles entre amis ou les séjours sportifs — ski, randonnée, vélo… — tout en permettant à chacun de profiter de son propre espace.",
    citation:
      "Je suis heureuse de vous ouvrir les portes du Ratty, une maison de famille qui occupe une place particulière dans notre histoire. Elle appartenait à mes grands-parents et nous avons choisi de lui offrir une nouvelle vie : mon mari et notre fils l'ont entièrement rénovée avec passion, pour préserver son authenticité tout en y apportant le confort d'aujourd'hui. Nous aimons partager ce lieu et faire découvrir les richesses de notre vallée, entre Le Grand-Bornand, La Clusaz et le Plateau des Glières. Nous serons heureux de vous accueillir !",
    citationAuteur: "— Nathalie, votre hôte",
    badges: ["6 personnes · Rez-de-chaussée", "8 personnes · 1er étage"],
    resumes: [
      "Deux chambres, salon avec canapé convertible, cuisine équipée, douche à l'italienne et terrasse avec barbecue.",
      "Deux chambres, grand salon avec deux canapés convertibles, cuisine équipée et balcon-terrasse face aux montagnes.",
    ],
    decouvrir: "Découvrir l'appartement →",
    maisonSur: "Jusqu'à 14 personnes",
    maisonTitre: "Réunissez toute la tribu : louez la maison entière",
    maisonTexte:
      "Cousinade, anniversaire, séjour au ski entre amis ? En louant les deux appartements en même temps, vous privatisez tout Le Ratty : 4 chambres, 2 cuisines, 2 terrasses avec barbecue… et 14 couchages. Chaque famille garde son espace, et tout le monde se retrouve autour de la grande table du Bouquetin.",
    maisonCta: "Découvrir la maison entière",
    maisonImgAlt: "Balcon du Ratty face aux montagnes, garde-corps en découpe laser",
    saisonsTitre: "La montagne en toutes saisons",
    eteAlt: "Le lac de Lessy en été, au-dessus du Grand-Bornand",
    eteTitre: "L'été",
    eteTexte:
      "Randonnées vers le lac de Lessy, VTT, pêche à la truite dans le Borne sous vos fenêtres… Et chaque été au Grand-Bornand, le festival Au Bonheur des Mômes, incontournable pour vos bambins.",
    hiverAlt: "Le domaine skiable du Grand-Bornand en hiver",
    hiverTitre: "L'hiver",
    hiverTexte:
      "Le domaine du Grand-Bornand à 7 minutes, La Clusaz à 11 minutes. En saison, les bus Proximiti 460/461 partent devant la mairie d'Entremont — et notre partenaire Freeglisse vous équipe à tarif préférentiel.",
    quartierTitre: "Un vrai village savoyard",
    quartierTexte:
      "Nous apprécions particulièrement le calme du village et la proximité des grands sites touristiques : profiter pleinement de la montagne, puis retrouver la tranquillité d'un véritable village savoyard en fin de journée. Le Plateau des Glières, haut lieu de la Résistance, est à 20 minutes, et Annecy, la Venise des Alpes, à 45 minutes.",
    distances: [
      ["Le Grand-Bornand", "7 min"],
      ["La Clusaz", "11 min"],
      ["Plateau des Glières", "20 min"],
      ["Annecy", "45 min"],
    ],
    atoutsTitre: "Les atouts du Ratty",
    ouTitre: "Où nous trouver",
    ouNavette:
      "Station du Grand-Bornand à 7 minutes · bus Proximiti 460/461 devant la mairie d'Entremont",
    ouCta: "Ouvrir dans Google Maps",
  },
  en: {
    heroAlt: "Le Ratty house in Entremont, Haute-Savoie",
    lieu: "Entremont · Glières-Val-de-Borne · Haute-Savoie, France",
    heroTexte:
      "Two charming apartments in a fully renovated family house, 7 minutes from Le Grand-Bornand. Together they sleep up to 14 guests.",
    ctaMaison: "Rent the whole house",
    ctaContact: "Contact us",
    presTitre: "One family house, two apartments",
    presTexte1:
      "Le Ratty is made up of two independent apartments: Le Bouquetin upstairs and La Marmotte on the ground floor, connected by an outdoor staircase. Booked together, they sleep up to 14 guests — and the large kitchen table in Le Bouquetin lets everyone share meals in a convivial space.",
    presTexte2:
      "An ideal setup for large families, get-togethers with friends or sports holidays — skiing, hiking, cycling… — while letting everyone enjoy their own space.",
    citation:
      "I am delighted to open the doors of Le Ratty, a family house that holds a special place in our history. It belonged to my grandparents and we chose to give it a new life: my husband and our son fully renovated it with passion, preserving its authenticity while adding today's comfort. We love sharing this place and helping our guests discover the riches of our valley, between Le Grand-Bornand, La Clusaz and the Glières Plateau. We look forward to welcoming you!",
    citationAuteur: "— Nathalie, your host",
    badges: ["Sleeps 6 · Ground floor", "Sleeps 8 · 1st floor"],
    resumes: [
      "Two bedrooms, living room with sofa bed, fully equipped kitchen, walk-in shower and terrace with barbecue.",
      "Two bedrooms, large living room with two sofa beds, fully equipped kitchen and balcony-terrace facing the mountains.",
    ],
    decouvrir: "Discover the apartment →",
    maisonSur: "Up to 14 guests",
    maisonTitre: "Bring the whole tribe: rent the entire house",
    maisonTexte:
      "Family reunion, birthday, ski trip with friends? By booking both apartments at once you get the whole of Le Ratty to yourselves: 4 bedrooms, 2 kitchens, 2 terraces with barbecue… and 14 beds. Each family keeps its own space, and everyone gathers around the big table in Le Bouquetin.",
    maisonCta: "Discover the whole house",
    maisonImgAlt: "Le Ratty balcony facing the mountains, laser-cut railings",
    saisonsTitre: "The mountains in every season",
    eteAlt: "Lake Lessy in summer, above Le Grand-Bornand",
    eteTitre: "Summer",
    eteTexte:
      "Hikes to Lake Lessy, mountain biking, trout fishing in the Borne right below your windows… And every summer in Le Grand-Bornand, the Au Bonheur des Mômes festival, a must for the kids.",
    hiverAlt: "Le Grand-Bornand ski area in winter",
    hiverTitre: "Winter",
    hiverTexte:
      "Le Grand-Bornand ski area is 7 minutes away, La Clusaz 11 minutes. In season, Proximiti buses 460/461 leave from the Entremont town hall — and our partner Freeglisse rents you equipment at preferential rates.",
    quartierTitre: "A true Savoyard village",
    quartierTexte:
      "We especially love the calm of the village and the proximity of the great tourist sites: enjoy the mountains to the full, then come home to the tranquillity of a genuine Savoyard village at the end of the day. The Glières Plateau, a major site of the French Resistance, is 20 minutes away, and Annecy, the Venice of the Alps, 45 minutes.",
    distances: [
      ["Le Grand-Bornand", "7 min"],
      ["La Clusaz", "11 min"],
      ["Glières Plateau", "20 min"],
      ["Annecy", "45 min"],
    ],
    atoutsTitre: "Why you'll love Le Ratty",
    ouTitre: "Where to find us",
    ouNavette:
      "Le Grand-Bornand resort 7 minutes away · Proximiti buses 460/461 from the Entremont town hall",
    ouCta: "Open in Google Maps",
  },
};

export default function HomeContent({ lang = "fr" }: { lang?: Lang }) {
  const t = T[lang];
  const prefixe = localePrefix(lang);
  const { marmotte, bouquetin } = getLogements(lang);
  const atouts = getAtouts(lang);

  const cartes = [
    { logement: marmotte, badge: t.badges[0], resume: t.resumes[0] },
    { logement: bouquetin, badge: t.badges[1], resume: t.resumes[1] },
  ];

  return (
    <>
      {/* Héro */}
      <section className="relative h-[70vh] min-h-[420px]">
        <Image
          src="/photo/lebouquetin/maison.jpeg"
          alt={t.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bark/85 via-bark/25 to-bark/10" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <p className="text-sm uppercase tracking-[0.25em] text-cream/80">{t.lieu}</p>
          <h1 className="mt-2 font-serif text-5xl font-bold text-cream sm:text-6xl">
            Le Ratty
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/90">
            {t.heroTexte}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`${prefixe}/la-maison`}
              className="rounded-full bg-corten px-6 py-3 font-bold text-cream transition-colors hover:bg-corten-dark"
            >
              {t.ctaMaison}
            </Link>
            <Link
              href={`${prefixe}/contact`}
              className="rounded-full border border-cream/60 px-6 py-3 font-bold text-cream transition-colors hover:bg-cream/10"
            >
              {t.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      {/* Présentation + mot de Nathalie */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-serif text-3xl text-bark sm:text-4xl">
          {t.presTitre}
        </h2>
        <p className="mt-6 leading-relaxed text-bark-light">{t.presTexte1}</p>
        <p className="mt-4 leading-relaxed text-bark-light">{t.presTexte2}</p>

        <div className="mt-8 flex justify-center">
          <ClassementBadge lang={lang} />
        </div>

        <figure className="mt-10 rounded-2xl border border-sand-dark bg-sand/50 p-7 sm:p-9">
          <blockquote className="font-serif text-lg italic leading-relaxed text-bark">
            « {t.citation} »
          </blockquote>
          <figcaption className="mt-4 font-bold text-corten-dark">
            {t.citationAuteur}
          </figcaption>
        </figure>
      </section>

      {/* Cartes des deux appartements */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {cartes.map(({ logement, badge, resume }) => (
            <Link
              key={logement.slug}
              href={`${prefixe}/${logement.slug}`}
              className="group overflow-hidden rounded-2xl border border-sand-dark bg-cream shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={logement.hero.src}
                  alt={logement.hero.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-corten">
                  {badge}
                </p>
                <h3 className="mt-1.5 font-serif text-2xl font-bold text-bark">
                  {logement.nom}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bark-light">{resume}</p>
                <p className="mt-4 font-bold text-corten group-hover:underline">
                  {t.decouvrir}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mise en avant maison entière */}
      <section className="bg-bark py-16 text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/photo/lebouquetin/acces-entree.jpeg"
              alt={t.maisonImgAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-corten-light">
              {t.maisonSur}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
              {t.maisonTitre}
            </h2>
            <p className="mt-4 leading-relaxed text-cream/85">{t.maisonTexte}</p>
            <Link
              href={`${prefixe}/la-maison`}
              className="mt-6 inline-block rounded-full bg-corten px-6 py-3 font-bold text-cream transition-colors hover:bg-corten-dark"
            >
              {t.maisonCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Été / hiver */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-serif text-3xl text-bark sm:text-4xl">
          {t.saisonsTitre}
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-sand-dark bg-cream">
            <div className="relative aspect-[3/2]">
              <Image
                src="/photo/lac-lessy-ete.png"
                alt={t.eteAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl font-bold text-corten-dark">
                {t.eteTitre}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bark-light">{t.eteTexte}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-sand-dark bg-cream">
            <div className="relative aspect-[3/2]">
              <Image
                src="/photo/domaine-grandbornand.png"
                alt={t.hiverAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl font-bold text-corten-dark">
                {t.hiverTitre}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bark-light">{t.hiverTexte}</p>
            </div>
          </div>
        </div>

        {/* Quartier + distances */}
        <div className="mt-12 rounded-2xl border border-sand-dark bg-sand/50 p-7 sm:p-9">
          <h3 className="font-serif text-2xl text-bark">{t.quartierTitre}</h3>
          <p className="mt-3 leading-relaxed text-bark-light">{t.quartierTexte}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            {t.distances.map(([lieu, temps]) => (
              <div key={lieu} className="rounded-xl bg-cream px-3 py-4">
                <dt className="text-sm text-bark-light">{lieu}</dt>
                <dd className="mt-1 font-serif text-xl font-bold text-corten-dark">
                  {temps}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Atouts */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="text-center font-serif text-3xl text-bark sm:text-4xl">
          {t.atoutsTitre}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {atouts.map((atout) => (
            <div
              key={atout.titre}
              className="rounded-2xl border border-sand-dark bg-sand/50 p-6"
            >
              <h3 className="font-serif text-xl font-bold text-corten-dark">
                {atout.titre}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bark-light">
                {atout.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Avis */}
      <AvisSection lang={lang} />

      {/* Localisation */}
      <section className="border-t border-sand-dark py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl text-bark">{t.ouTitre}</h2>
          <p className="mt-4 text-bark-light">
            {adresse.rue}, {adresse.lieuDit} — {adresse.codePostal} {adresse.commune}
          </p>
          <p className="mt-2 text-sm text-bark-light">{t.ouNavette}</p>
          <a
            href={adresse.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full border border-corten px-6 py-3 font-bold text-corten transition-colors hover:bg-corten hover:text-cream"
          >
            {t.ouCta}
          </a>
        </div>
      </section>
    </>
  );
}
