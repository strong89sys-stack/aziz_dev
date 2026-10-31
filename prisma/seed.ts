import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const profile = {
  id: 1,
  displayName: "Adelazize Kabore",
  role: "Développeur web full-stack junior",
  headline: "Je transforme des idées ambitieuses en expériences web nettes, rapides et mémorables.",
  bio: "Développeur web en formation, je conçois des applications utiles, modernes et soignées. J’aime relier la clarté d’une interface à la solidité d’une architecture, du front-end au back-end.",
  philosophy: "J’aborde chaque projet comme un système vivant : une intention claire, des interactions qui guident naturellement et un code suffisamment robuste pour évoluer. L’accessibilité, les performances et le soin du détail ne sont pas des finitions ; ils font partie du produit.",
  location: "Abidjan, Côte d’Ivoire",
  email: "adelazizekabore@gmail.com",
  phone: "+225 05 65 24 26 48",
  availability: "Ouvert aux opportunités",
  avatarUrl: "/images/identity/aziz-profile.png",
  cvUrl: "/documents/CV-Aziz-Kabore.pdf",
  githubUrl: "https://github.com/strong89sys-stack",
  linkedinUrl: "https://www.linkedin.com/in/adelazize-kabore-705a75428",
};

const projects = [
  {
    slug: "dashboard-gestion-peage",
    title: "Dashboard · Gestion d’un pont à péage",
    excerpt: "Un cockpit opérationnel pour suivre les passages, les caisses et les indicateurs d’un réseau de péage.",
    description: "Application web de gestion d’un pont à péage permettant de centraliser le suivi des passages, la gestion des caisses et le pilotage des opérations depuis un dashboard administrateur.",
    imageUrl: "/images/projects/gest-peage.png",
    category: "Académique",
    technologies: ["HTML", "CSS", "PHP", "JavaScript"],
    repoUrl: "https://github.com/strong89sys-stack/Projet_informatique",
    liveUrl: null,
    featured: true,
    published: true,
    sortOrder: 1,
  },
  {
    slug: "star-burger",
    title: "Star Burger",
    excerpt: "L’identité digitale d’un restaurant fictif, pensée comme une vitrine appétissante et directe.",
    description: "Projet académique réalisé avec HTML et CSS, consistant en la conception d’un site web statique pour un restaurant fictif.",
    imageUrl: "/images/projects/star-burger.png",
    category: "Académique",
    technologies: ["HTML", "CSS"],
    repoUrl: "https://github.com/strong89sys-stack/StarBurger",
    liveUrl: "https://strong89sys-stack.github.io/StarBurger/",
    featured: false,
    published: true,
    sortOrder: 2,
  },
  {
    slug: "money-management",
    title: "Money Management",
    excerpt: "Un espace personnel pour enregistrer ses transactions et enfin rendre son budget lisible.",
    description: "Application de suivi des dépenses et des revenus permettant d’enregistrer, consulter et gérer ses transactions afin de garder une vision claire de ses finances.",
    imageUrl: "/images/projects/expense-app.png",
    category: "Personnel",
    technologies: ["Vue.js", "Sass", "PHP"],
    repoUrl: "https://github.com/strong89sys-stack/MoneyCheck",
    liveUrl: null,
    featured: true,
    published: true,
    sortOrder: 3,
  },
  {
    slug: "trinity-game",
    title: "Trinity Game",
    excerpt: "Un Tic-Tac-Toe React où l’interface, la logique de jeu et le feedback se répondent sans friction.",
    description: "Jeu de Tic-Tac-Toe développé avec React, avec gestion des tours, détection automatique des victoires et des matchs nuls, ainsi qu’une interface interactive.",
    imageUrl: "/images/projects/trinity-game.png",
    category: "Personnel",
    technologies: ["React", "Sass"],
    repoUrl: "https://github.com/strong89sys-stack/Trinity-Game",
    liveUrl: "https://trinity-game-wheat.vercel.app/",
    featured: false,
    published: true,
    sortOrder: 4,
  },
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    excerpt: "Un assistant de budget compact pour noter, filtrer et mieux lire ses dépenses au quotidien.",
    description: "Application de suivi des dépenses et des revenus avec une interface moderne, un système de tri et une lecture immédiate de l’évolution du budget.",
    imageUrl: "/images/projects/expense-tracker.png",
    category: "Personnel",
    technologies: ["HTML", "CSS", "JavaScript", "Flask API", "MySQL"],
    repoUrl: "https://github.com/strong89sys-stack/Expenses_app",
    liveUrl: null,
    featured: false,
    published: true,
    sortOrder: 5,
  },
];

const skills = [
  "React",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "Vue.js",
  "Next.js",
  "Laravel",
  "PHP",
  "Sass",
  "Python",
  "Git",
  "GitHub",
  "PostgreSQL",
  "MySQL",
];

const experiences = [
  {
    title: "Développeur Full-Stack — Projets personnels & apprentissage avancé",
    organization: null,
    period: "2026 — aujourd’hui",
    description: "Poursuite de ma formation en développement logiciel, avec un approfondissement de mes compétences en développement web, conception d’applications et architectures modernes.",
    sortOrder: 1,
    published: true,
  },
  {
    title: "Licence 2 — Réseaux & Génie Logiciel",
    organization: "PIGIER Côte d’Ivoire — BTS",
    period: "2025 — 2026",
    description: "Deuxième année de formation avec obtention du BTS. Développement de compétences en programmation, bases de données, développement web et conception d’applications.",
    sortOrder: 2,
    published: true,
  },
  {
    title: "Licence 1 — Réseaux & Génie Logiciel",
    organization: "PIGIER Côte d’Ivoire",
    period: "2024 — 2025",
    description: "Découverte et acquisition des fondamentaux de la programmation, des réseaux, des bases de données et du développement logiciel.",
    sortOrder: 3,
    published: true,
  },
  {
    title: "Baccalauréat",
    organization: null,
    period: "2024",
    description: "Obtention du Baccalauréat et début de mon parcours dans le domaine de l’informatique et du développement logiciel.",
    sortOrder: 4,
    published: true,
  },
];

async function main() {
  // 1. Profile
  await prisma.portfolioProfile.upsert({
    where: { id: 1 },
    update: profile,
    create: { ...profile },
  });

  // 2. Projects
  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({ data: projects });
  }

  // 3. Skills
  if ((await prisma.skill.count()) === 0) {
    await prisma.skill.createMany({
      data: skills.map((name, index) => ({
        name,
        group: "Technologies",
        sortOrder: index + 1,
      })),
    });
  }

  // 4. Experiences
  if ((await prisma.experience.count()) === 0) {
    await prisma.experience.createMany({ data: experiences });
  }

  // 5. Admin User
  // const adminEmail = "titeuf494@gmail.com";
  // const adminUser = await prisma.user.findUnique({ where: { email: adminEmail } });

  // if (!adminUser) {
  //   const adminId = "admin-user-id-123";
  //   const hashedPassword = await hash("428864Az", 10);

  //   await prisma.user.create({
  //     data: {
  //       id: adminId,
  //       name: "Kabore Adelazize",
  //       email: adminEmail,
  //       role: "admin",
  //       emailVerified: true,
  //     },
  //   });

  //   await prisma.account.create({
  //     data: {
  //       id: "admin-account-id-123",
  //       accountId: "admin-account",
  //       providerId: "password",
  //       userId: adminId,
  //       password: hashedPassword,
  //     },
  //   });
  //   console.log("Admin user created successfully.");
  // }
}

main()
  .then(() => console.log("Portfolio seeded."))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());