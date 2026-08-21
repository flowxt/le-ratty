import { NextRequest } from "next/server";

/**
 * Renvoie les périodes occupées d'un bien à partir de calendriers iCal
 * (liens Abritel .ics, définis dans .env.local) :
 *
 *   ICS_URL_MARMOTTE  → réservations de La Marmotte seule
 *   ICS_URL_BOUQUETIN → réservations du Bouquetin seul
 *   ICS_URL_MAISON    → réservations de la maison entière (bloque les deux)
 *
 * Une réservation « maison » rend les deux appartements indisponibles, et la
 * maison entière est indisponible dès qu'un des deux appartements est réservé.
 */

type Plage = { start: string; end: string };

const FEEDS: Record<string, string | undefined> = {
  marmotte: process.env.ICS_URL_MARMOTTE,
  bouquetin: process.env.ICS_URL_BOUQUETIN,
  maison: process.env.ICS_URL_MAISON,
};

const SOURCES: Record<string, string[]> = {
  marmotte: ["marmotte", "maison"],
  bouquetin: ["bouquetin", "maison"],
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

  const urls = sources
    .map((s) => FEEDS[s])
    .filter((u): u is string => Boolean(u));

  const resultats = await Promise.allSettled(
    urls.map(async (url) => {
      const res = await fetch(url, { next: { revalidate: 1800 } });
      if (!res.ok) throw new Error(`iCal ${res.status}`);
      return parserIcs(await res.text());
    }),
  );

  const busy = resultats
    .filter((r): r is PromiseFulfilledResult<Plage[]> => r.status === "fulfilled")
    .flatMap((r) => r.value)
    .sort((a, b) => a.start.localeCompare(b.start));

  return Response.json({ busy, configure: urls.length > 0 });
}
