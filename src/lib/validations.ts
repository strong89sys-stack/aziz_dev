import { z } from "zod";

const url = z.string().url("L’URL doit être valide.").or(z.literal(""));

export const projectSchema = z.object({
  title: z.string().trim().min(2, "Le titre est requis.").max(100),
  slug: z.string().trim().max(120).optional(),
  excerpt: z.string().trim().min(8, "Ajoute une accroche plus précise.").max(180),
  description: z.string().trim().min(20, "Ajoute une description plus complète.").max(1600),
  imageUrl: z.string().trim().min(1, "L’image est requise."),
  category: z.string().trim().min(2).max(50),
  technologies: z.array(z.string().trim().min(1).max(32)).min(1),
  repoUrl: url,
  liveUrl: url,
  sortOrder: z.coerce.number().int().min(0).max(999),
});

export const skillSchema = z.object({
  name: z.string().trim().min(1).max(40),
  group: z.string().trim().min(1).max(40),
  sortOrder: z.coerce.number().int().min(0).max(999),
});

export const experienceSchema = z.object({
  title: z.string().trim().min(2).max(160),
  organization: z.string().trim().max(160),
  period: z.string().trim().min(2).max(80),
  description: z.string().trim().min(12).max(800),
  sortOrder: z.coerce.number().int().min(0).max(999),
});

export const profileSchema = z.object({
  displayName: z.string().trim().min(2).max(80),
  role: z.string().trim().min(2).max(120),
  headline: z.string().trim().min(12).max(180),
  bio: z.string().trim().min(20).max(900),
  philosophy: z.string().trim().min(20).max(900),
  location: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().max(40),
  availability: z.string().trim().min(2).max(100),
  avatarUrl: z.string().trim().min(1),
  cvUrl: z.string().trim().min(1),
  githubUrl: url,
  linkedinUrl: url,
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indique ton nom.").max(100),
  email: z.string().trim().email("Indique un email valide."),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().max(120).optional(),
  message: z.string().trim().min(20, "Ton message doit contenir au moins 20 caractères.").max(3000),
  company: z.string().max(0).optional(),
});
