"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { toSlug } from "@/lib/utils";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  experienceSchema,
  profileSchema,
  projectSchema,
  skillSchema,
} from "@/lib/validations";

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function checked(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

function validationError(error: { issues: Array<{ message: string }> }) {
  throw new Error(error.issues[0]?.message ?? "Les données saisies ne sont pas valides.");
}

function revalidatePortfolio() {
  revalidatePath("/");
  revalidatePath("/admin");
}

function projectInput(formData: FormData) {
  const title = text(formData, "title");
  const parsed = projectSchema.safeParse({
    title,
    slug: text(formData, "slug"),
    excerpt: text(formData, "excerpt"),
    description: text(formData, "description"),
    imageUrl: text(formData, "imageUrl"),
    category: text(formData, "category"),
    technologies: text(formData, "technologies")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    repoUrl: text(formData, "repoUrl"),
    liveUrl: text(formData, "liveUrl"),
    sortOrder: text(formData, "sortOrder"),
  });

  if (!parsed.success) validationError(parsed.error);

  return {
    ...parsed.data,
    slug: toSlug(parsed.data.slug || title),
    repoUrl: parsed.data.repoUrl || null,
    liveUrl: parsed.data.liveUrl || null,
    featured: checked(formData, "featured"),
    published: checked(formData, "published"),
  };
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const imageUrl = await handleFileUpload(formData, "image", "projects");
  const input = projectInput(formData);

  await prisma.project.create({
    data: {
      ...input,
      imageUrl: imageUrl || input.imageUrl
    }
  });
  revalidatePortfolio();
  revalidatePath("/admin/projects");
}

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) throw new Error("Projet introuvable.");

  const imageUrl = await handleFileUpload(formData, "image", "projects");
  const input = projectInput(formData);

  await prisma.project.update({
    where: { id },
    data: {
      ...input,
      ...(imageUrl && { imageUrl })
    }
  });
  revalidatePortfolio();
  revalidatePath("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) throw new Error("Projet introuvable.");
  await prisma.project.delete({ where: { id } });
  revalidatePortfolio();
  revalidatePath("/admin/projects");
}

async function handleFileUpload(formData: FormData, fieldName: string, folder: string) {
  const file = formData.get(fieldName) as File | null;
  if (!file || file.size === 0) return null;

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadToCloudinary(buffer, folder);
  return result.secure_url;
}

function skillInput(formData: FormData) {
  const parsed = skillSchema.safeParse({
    name: text(formData, "name"),
    group: text(formData, "group"),
    sortOrder: text(formData, "sortOrder"),
  });
  if (!parsed.success) validationError(parsed.error);
  return parsed.data;
}

export async function createSkill(formData: FormData) {
  await requireAdmin();
  const iconClass = text(formData, "iconClass");
  await prisma.skill.create({
    data: {
      ...skillInput(formData),
      iconClass
    }
  });
  revalidatePortfolio();
  revalidatePath("/admin/skills");
}

export async function updateSkill(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) throw new Error("Compétence introuvable.");

  const iconClass = text(formData, "iconClass");

  await prisma.skill.update({
    where: { id },
    data: {
      ...skillInput(formData),
      iconClass
    }
  });
  revalidatePortfolio();
  revalidatePath("/admin/skills");
}

export async function deleteSkill(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) throw new Error("Compétence introuvable.");
  await prisma.skill.delete({ where: { id } });
  revalidatePortfolio();
  revalidatePath("/admin/skills");
}

function experienceInput(formData: FormData) {
  const parsed = experienceSchema.safeParse({
    title: text(formData, "title"),
    organization: text(formData, "organization"),
    period: text(formData, "period"),
    description: text(formData, "description"),
    sortOrder: text(formData, "sortOrder"),
  });
  if (!parsed.success) validationError(parsed.error);
  return {
    ...parsed.data,
    organization: parsed.data.organization || null,
    published: checked(formData, "published"),
  };
}

export async function createExperience(formData: FormData) {
  await requireAdmin();
  await prisma.experience.create({ data: experienceInput(formData) });
  revalidatePortfolio();
  revalidatePath("/admin/experiences");
}

export async function updateExperience(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) throw new Error("Élément de parcours introuvable.");
  await prisma.experience.update({ where: { id }, data: experienceInput(formData) });
  revalidatePortfolio();
  revalidatePath("/admin/experiences");
}

export async function deleteExperience(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) throw new Error("Élément de parcours introuvable.");
  await prisma.experience.delete({ where: { id } });
  revalidatePortfolio();
  revalidatePath("/admin/experiences");
}

export async function updateProfile(formData: FormData) {
  await requireAdmin();

  const avatarFile = await handleFileUpload(formData, "avatar", "profile");
  const cvFile = await handleFileUpload(formData, "cv", "profile");

  const parsed = profileSchema.safeParse({
    displayName: text(formData, "displayName"),
    role: text(formData, "role"),
    headline: text(formData, "headline"),
    bio: text(formData, "bio"),
    philosophy: text(formData, "philosophy"),
    location: text(formData, "location"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    availability: text(formData, "availability"),
    avatarUrl: text(formData, "avatarUrl"),
    cvUrl: text(formData, "cvUrl"),
    githubUrl: text(formData, "githubUrl"),
    linkedinUrl: text(formData, "linkedinUrl"),
  });
  if (!parsed.success) validationError(parsed.error);

  const data = {
    ...parsed.data,
    phone: parsed.data.phone || null,
    githubUrl: parsed.data.githubUrl || null,
    linkedinUrl: parsed.data.linkedinUrl || null,
    ...(avatarFile && { avatarUrl: avatarFile }),
    ...(cvFile && { cvUrl: cvFile }),
  };

  await prisma.portfolioProfile.upsert({
    where: { id: 1 },
    create: { id: 1, ...data },
    update: data,
  });
  revalidatePortfolio();
  revalidatePath("/admin/profile");
}

export async function markMessageRead(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) throw new Error("Message introuvable.");
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: checked(formData, "isRead") },
  });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  if (!id) throw new Error("Message introuvable.");
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
