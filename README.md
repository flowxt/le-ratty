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

## Calendriers de disponibilités

Chaque page logement affiche un calendrier « Disponible / Occupé ». Les
données viennent de **Google Agenda**, que la propriétaire met à jour
elle-même depuis son téléphone ou son ordinateur :

1. Créer un compte Google (ou utiliser un compte existant).
2. Dans [Google Agenda](https://calendar.google.com), créer **3 agendas** :
   « La Marmotte », « Le Bouquetin » et « Maison entière ».
3. À chaque réservation, ajouter un événement sur toute la durée du séjour
   dans l'agenda du bien concerné (l'agenda « Maison entière » sert quand les
   deux appartements sont loués ensemble : il bloque automatiquement les deux).
4. Pour chaque agenda : *Paramètres* → *Intégrer l'agenda* → copier
   l'**adresse secrète au format iCal**.
5. Copier `.env.example` vers `.env.local` et coller les 3 adresses :

```bash
ICS_URL_MARMOTTE=https://calendar.google.com/calendar/ical/.../basic.ics
ICS_URL_BOUQUETIN=https://calendar.google.com/calendar/ical/.../basic.ics
ICS_URL_MAISON=https://calendar.google.com/calendar/ical/.../basic.ics
```

Le site relit les agendas toutes les 30 minutes (`app/api/disponibilites/route.ts`).
Logique appliquée :

- une réservation « Maison entière » rend **les deux** appartements occupés ;
- la page « maison entière » est occupée dès qu'**un** des biens est réservé.

En production (Vercel…), renseigner ces 3 variables dans les variables
d'environnement du projet.

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
