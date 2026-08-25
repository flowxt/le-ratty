import { NextRequest } from "next/server";

/**
 * Renvoie les périodes occupées d'un bien à partir de calendriers iCal
 * (liens .ics Abritel et/ou Airbnb, définis dans .env.local). Chaque bien
 * peut avoir plusieurs sources : toutes sont fusionnées.
 *
 *   ICS_URL_MARMOTTE / ICS_URL_MARMOTTE_AIRBNB   → La Marmotte seule
 *   ICS_URL_BOUQUETIN / ICS_URL_BOUQUETIN_AIRBNB → Le Bouquetin seul
 *   ICS_URL_MAISON / ICS_URL_MAISON_AIRBNB       → calendrier « maison entière »
 *
 * Les deux appartements sont indépendants : la disponibilité de chaque
 * appartement ne dépend QUE de son propre calendrier. La page « maison
 * entière » est indisponible dès que l'un des deux appartements (ou le
 * calendrier maison lui-même) est occupé.
 *
 * NB : le flux Abritel « maison » est un calendrier agrégé (il contient déjà
 * les réservations des deux appartements) ; on ne l'utilise donc PAS comme
 * source des appartements, sinon une résa Marmotte bloquerait le Bouquetin.
 */

type Plage = { start: string; end: string };

const FEEDS: Record<string, (string | undefined)[]> = {
  marmotte: [process.env.ICS_URL_MARMOTTE, process.env.ICS_URL_MARMOTTE_AIRBNB],
  bouquetin: [process.env.ICS_URL_BOUQUETIN, process.env.ICS_URL_BOUQUETIN_AIRBNB],
  maison: [process.env.ICS_URL_MAISON, process.env.ICS_URL_MAISON_AIRBNB],
};

const SOURCES: Record<string, string[]> = {
  marmotte: ["marmotte"],
  bouquetin: ["bouquetin"],
  maison: ["marmotte", "bouquetin", "maison"],
};

function versDateISO(valeur: string): string | null {
  // DTSTART;VALUE=DATE:20260215 ou DTSTART;TZID=Europe/Paris:20260215T160000
  const m = valeur.match(/(\d{4})(\d{2})(\d{2})/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

function jourSuivant(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function parserIcs(ics: string): Plage[] {
  const plages: Plage[] = [];
  const evenements = ics.split("BEGIN:VEVENT").slice(1);
  for (const bloc of evenements) {
    const corps = bloc.split("END:VEVENT")[0];
    const mStart = corps.match(/^DTSTART[^:]*:(.+)$/m);
    if (!mStart) continue;
    const start = versDateISO(mStart[1]);
    if (!start) continue;

    const mEnd = corps.match(/^DTEND[^:]*:(.+)$/m);
    let end = mEnd ? versDateISO(mEnd[1]) : null;
    // Événement sans DTEND, ou fin horodatée le même jour : occupe au moins ce jour
    if (!end || end <= start) end = jourSuivant(start);

    plages.push({ start, end });
  }
  return plages;
}

export async function GET(request: NextRequest) {
  const bien = request.nextUrl.searchParams.get("bien") ?? "";
  const sources = SOURCES[bien];
  if (!sources) {
    return Response.json({ error: "bien inconnu" }, { status: 400 });
  }

  const urls = Array.from(
    new Set(
      sources
        .flatMap((s) => FEEDS[s] ?? [])
        .filter((u): u is string => Boolean(u)),
    ),
  );

  const resultats = await Promise.allSettled(
    urls.map(async (url) => {
      const res = await fetch(url, { next: { revalidate: 1800 } });
      if (!res.ok) throw new Error(`iCal ${res.status}`);
      return parserIcs(await res.text());
    }),
  );

  const toutes = resultats
    .filter((r): r is PromiseFulfilledResult<Plage[]> => r.status === "fulfilled")
    .flatMap((r) => r.value);

  const vues = new Set<string>();
  const busy = toutes
    .filter((p) => {
      const cle = `${p.start}_${p.end}`;
      if (vues.has(cle)) return false;
      vues.add(cle);
      return true;
    })
    .sort((a, b) => a.start.localeCompare(b.start));

  return Response.json({ busy, configure: urls.length > 0 });
}
