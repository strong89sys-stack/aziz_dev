import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Session introuvable." }, { status: 401 });
  }

  const [adminCount, userCount] = await Promise.all([
    prisma.user.count({ where: { role: "admin" } }),
    prisma.user.count(),
  ]);

  // This endpoint can only elevate the unique, first account in an empty installation.
  if (adminCount > 0 || userCount !== 1) {
    return NextResponse.json(
      { error: "L’inscription administrateur est désormais fermée." },
      { status: 403 },
    );
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      role: "admin",
      emailVerified: true,
    },
  });

  return NextResponse.json({ ok: true });
}
