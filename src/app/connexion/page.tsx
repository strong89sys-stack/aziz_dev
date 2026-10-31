import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card">
        <Link className="text-link" href="/"><ArrowLeft size={15} /> Retour au portfolio</Link>
        <span className="eyebrow" style={{ display: "block", marginTop: "1.8rem" }}>Espace propriétaire</span>
        <h1>Le back-office.</h1>
        <p>Connecte-toi avec ton compte administrateur pour piloter les contenus de ton portfolio.</p>
        <LoginForm />
      </section>
    </main>
  );
}
