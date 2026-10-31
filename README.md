# AzizDev — Portfolio Next.js

Refonte complète du portfolio à partir de l’archive fournie : les projets, le parcours, les coordonnées, le CV et les visuels d’origine sont repris, mais l’ancienne application Vite est remplacée par une architecture full-stack maintenable.

## Stack

- Next.js 16, App Router, React 19 et TypeScript strict
- Tailwind CSS v4 pour les fondations CSS, avec design system dans src/app/globals.css
- PostgreSQL + Prisma ORM 7, avec client généré dans src/generated/prisma
- Better Auth (email / mot de passe) + plugin Admin
- Server Actions typées pour le formulaire de contact et le CRUD du back-office

## Ce qui est pilotable

L’interface publique est entièrement alimentée par PostgreSQL :

- Profil : identité, phrase d’accroche, photo, CV, coordonnées et réseaux
- Projets : image, description, technologies, liens, ordre, visibilité
- Compétences : nom, groupe et ordre
- Parcours : formation / expérience, période, contenu et visibilité
- Messages de contact : réception, lecture et suppression

Le front ne dépend d’aucune liste figée dans le code. Après une modification dans /admin, la page publique est revalidée.

## Arborescence utile

~~~text
src/
  app/
    (admin)/admin/        # back-office protégé
    actions/contact.ts    # Server Action publique du formulaire
    api/auth/[...all]/    # route Better Auth
    connexion/            # connexion administrateur
    page.tsx              # portfolio public
  components/
    portfolio/            # hero, projets, parcours, contact, footer
    admin/                # formulaires et navigation d’administration
    ui/theme-toggle.tsx   # thème light / dark persistant
  lib/
    auth.ts               # Better Auth + adapter Prisma
    prisma.ts             # client Prisma 7 + PrismaPg
    admin.ts              # garde d’accès au back-office
prisma/
  schema.prisma           # modèle de données PostgreSQL
  seed.ts                 # contenu initial issu de l’ancien portfolio
public/
  documents/              # CV d’origine
  images/                 # portrait et captures de projets d’origine
~~~

## Démarrage

Prérequis : Node.js récent compatible Next.js 16 et une base PostgreSQL accessible.

1. Créer votre fichier d’environnement :

   ~~~bash
   cp .env.example .env
   ~~~

   Sous PowerShell :

   ~~~powershell
   Copy-Item .env.example .env
   ~~~

   Renseigner ensuite DATABASE_URL, BETTER_AUTH_SECRET (au moins 32 caractères) et BETTER_AUTH_URL.

2. Installer les dépendances :

   ~~~bash
   npm install
   ~~~

3. Créer la base et le client Prisma :

   ~~~bash
   npm run db:migrate -- --name init
   npm run db:generate
   npm run db:seed
   ~~~

4. Créer le premier administrateur :

   ~~~bash
   npx auth@latest create-admin --email titeuf494@gmail.com --name "Adelazize Kabore" --role admin
   ~~~

5. Lancer l’application :

   ~~~bash
   npm run dev
   ~~~

Le portfolio est disponible sur http://localhost:3000, l’administration sur http://localhost:3000/admin.

## Important : Better Auth et Prisma

Le schéma Better Auth (y compris les champs du plugin Admin) est déjà écrit dans prisma/schema.prisma. Il n’est donc pas nécessaire de générer le schéma pour démarrer.

Si vous ajoutez plus tard un plugin Better Auth qui modifie les tables d’authentification, utilisez :

~~~bash
npm run auth:generate
npm run db:migrate -- --name nom-de-la-migration
npm run db:generate
~~~

Prisma 7 utilise un générateur explicite. Ne déplacez pas src/generated/prisma : il est généré par npm run db:generate et ignoré par Git.

## Ajouter vos propres images

Ajoutez les images des nouveaux projets dans public/images/projects/, puis renseignez leur chemin dans le back-office, par exemple :

~~~text
/images/projects/mon-nouveau-projet.png
~~~

Pour remplacer la photo, placez le fichier dans public/images/identity/ puis modifiez le chemin dans **Profil & liens**. Aucune intégration de stockage tiers n’est imposée : l’architecture reste prête pour en ajouter une plus tard sans modifier le modèle Project.

## Thèmes

Le mode sombre conserve le langage visuel de l’ancien portfolio : noir profond, halos cyan / violet, bordures translucides. Le bouton soleil / lune dans la barre de navigation active un mode clair plus éditorial et mémorise ce choix dans le navigateur.
