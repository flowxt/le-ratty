import { NextRequest } from "next/server";
import { Resend } from "resend";
import { contact } from "@/lib/logements";

/**
 * Reçoit les demandes du formulaire de contact et les envoie par e-mail à la
 * propriétaire via Resend.
 *
 * Variables d'environnement (.env.local) :
 *   RESEND_API_KEY   → clé API Resend (obligatoire)
 *   RESEND_FROM      → expéditeur (optionnel). Par défaut « onboarding@resend.dev »,
 *                      qui fonctionne tant que le domaine n'est pas vérifié, mais
 *                      n'envoie que vers l'adresse du compte Resend.
 */

const FROM = process.env.RESEND_FROM ?? "Le Ratty <onboarding@resend.dev>";

function echapper(v: FormDataEntryValue | null): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  const cle = process.env.RESEND_API_KEY;
  if (!cle) {
    return Response.json({ error: "Service e-mail non configuré." }, { status: 503 });
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const bien = echapper(data.bien as string);
  const nom = echapper(data.nom as string);
  const email = String(data.email ?? "").trim();
  const dates = echapper(data.dates as string);
  const personnes = echapper(data.personnes as string);
  const message = echapper(data.message as string);

  if (!nom || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Nom ou e-mail manquant/invalide." }, { status: 400 });
  }

  const html = `
    <h2>Nouvelle demande de réservation — Le Ratty</h2>
    <p><strong>Logement :</strong> ${bien}</p>
    <p><strong>Nom :</strong> ${nom}</p>
    <p><strong>E-mail :</strong> ${echapper(email)}</p>
    <p><strong>Dates :</strong> ${dates}</p>
    <p><strong>Personnes :</strong> ${personnes}</p>
    <p><strong>Message :</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
  `;

  const resend = new Resend(cle);
  const { error } = await resend.emails.send({
    from: FROM,
    to: contact.email,
    replyTo: email,
    subject: `Demande de réservation — ${bien} — ${nom}`,
    html,
  });

  if (error) {
    return Response.json({ error: "L'envoi a échoué." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
