import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { RegisterForm } from "@/components/admin/register-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const userCount = await prisma.user.count();

  return (
    <main className="login-page">
      <section className="login-card">
        <Link className="text-link" href="/"><ArrowLeft size={15} /> Retour au portfolio</Link>
        <span className="eyebrow" style={{ display: "block", marginTop: "1.8rem" }}>Initialisation sécurisée</span>
        <h1>Créer l’administrateur.</h1>
        {userCount === 0 ? (
          <>
            <p>Cette page est temporairement ouverte : le tout premier compte reçoit automatiquement le rôle administrateur.</p>
            <RegisterForm />
          </>
        ) : (
          <>
            <p>Un compte existe déjà. L’inscription initiale est fermée afin de protéger le back-office.</p>
            <Link className="primary-button" href="/connexion"><LockKeyhole size={16} /> Se connecter</Link>
          </>
        )}
      </section>
    </main>
  );
}