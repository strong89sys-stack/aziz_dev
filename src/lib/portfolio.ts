import { prisma } from "@/lib/prisma";

export async function getPortfolioData() {
  const [profile, projects, skills, experiences] = await Promise.all([
    prisma.portfolioProfile.findUnique({ where: { id: 1 } }),
    prisma.project.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.skill.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
    prisma.experience.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
  ]);

  if (!profile) {
    throw new Error("Le profil portfolio n’existe pas encore. Exécute npm run db:seed.");
  }

  return { profile, projects, skills, experiences };
}
