# Le Ratty — leratty.fr

Site vitrine des locations « Le Ratty » à Entremont (Glières-Val-de-Borne,
Haute-Savoie) : deux appartements dans une maison rénovée.

- **Accueil** (`/`) — présentation de la maison et des deux appartements
- **La Marmotte** (`/la-marmotte`) — 6 personnes, rez-de-chaussée
- **Le Bouquetin** (`/le-bouquetin`) — 8 personnes, 1er étage
- **La maison entière** (`/la-maison`) — les deux appartements, 14 personnes
- **Contact** (`/contact`) — formulaire + infos pratiques

## Démarrer

```bash
npm install
npm run dev
```

Le site tourne sur [http://localhost:3000](http://localhost:3000).

## Calendriers de disponibilités (Abritel)

Chaque page logement affiche un calendrier « Disponible / Occupé » alimenté par
les liens **iCal Abritel**. Dans `.env.local` :

```bash
ICS_URL_MARMOTTE=https://www.abritel.fr/icalendar/xxxx.ics?nonTentative
ICS_URL_BOUQUETIN=https://www.abritel.fr/icalendar/xxxx.ics?nonTentative
ICS_URL_MAISON=https://www.abritel.fr/icalendar/xxxx.ics?nonTentative
```

Le site relit les calendriers toutes les 30 minutes (`app/api/disponibilites/route.ts`).
Logique appliquée :

- une réservation « Maison entière » rend **les deux** appartements occupés ;
- la page « maison entière » est occupée dès qu'**un** des biens est réservé.

En production (Vercel…), renseigner ces 3 variables dans les variables
d'environnement du projet.

## Formulaire de contact (Resend)

Les demandes du formulaire sont envoyées par e-mail à la propriétaire via
[Resend](https://resend.com). Dans `.env.local` :

```bash
RESEND_API_KEY=re_...
# Optionnel, si un domaine est vérifié sur Resend :
# RESEND_FROM=Le Ratty <contact@leratty.fr>
```

Sans domaine vérifié, l'expéditeur par défaut `onboarding@resend.dev` n'envoie
que vers l'adresse du compte Resend (ici `leraty74.entremont@gmail.com`), ce qui
suffit puisque c'est justement la destinataire. Pour envoyer depuis une adresse
`@leratty.fr`, vérifier le domaine sur Resend et renseigner `RESEND_FROM`.
Route : `app/api/contact/route.ts`.

## Classement

Le badge « Meublé de Tourisme ★★ » (composant `components/classement-badge.tsx`)
s'appuie sur `classement` dans `lib/logements.ts` (nombre d'étoiles + année).

## Bilingue FR / EN

Le site existe en français (racine, ex. `/la-marmotte`) et en anglais sous le
préfixe `/en` (ex. `/en/la-marmotte`). Le sélecteur drapeaux 🇫🇷/🇬🇧 est dans
l'en-tête. Tous les textes sont centralisés :

- `lib/logements.ts` — contenus des logements et atouts (fr/en) ;
- `lib/avis.ts` — avis clients (Booking + Google) ;
- chaque composant contient son petit dictionnaire `T = { fr, en }`.

## Coordonnées

Téléphone et e-mail sont définis dans `lib/logements.ts` (`contact`) et
utilisés partout (footer, page contact, formulaire).
