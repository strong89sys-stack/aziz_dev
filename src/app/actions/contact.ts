"use server";

import { contactSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject") || undefined,
    message: formData.get("message"),
    company: formData.get("company") || undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Vérifie les informations saisies.",
    };
  }

  if (parsed.data.company) {
    return { status: "success", message: "Merci, ton message a bien été envoyé." };
  }

  const { company: _company, ...message } = parsed.data;
  await prisma.contactMessage.create({ data: message });

  return {
    status: "success",
    message: "Merci ! Ton message est bien arrivé. Je te répondrai dès que possible.",
  };
}
