"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function RegisterForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const signUp = await authClient.signUp.email({
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });

    if (signUp.error) {
      setPending(false);
      setError(signUp.error.message ?? "Impossible de créer le compte.");
      return;
    }

    const bootstrap = await fetch("/api/bootstrap-admin", {
      method: "POST",
      credentials: "same-origin",
    });

    if (!bootstrap.ok) {
      const body = await bootstrap.json().catch(() => null);
      setPending(false);
      setError(body?.error ?? "Le compte a été créé, mais le rôle administrateur n’a pas pu être attribué.");
      return;
    }

    window.location.assign("/admin");
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="register-name">Nom complet</label>
        <input id="register-name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="register-email">Email</label>
        <input id="register-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="register-password">Mot de passe</label>
        <input id="register-password" name="password" type="password" required minLength={8} autoComplete="new-password" />
      </div>
      <button className="primary-button" type="submit" disabled={pending}>
        <ShieldCheck size={16} /> {pending ? "Création…" : "Créer mon compte administrateur"}
      </button>
      {error && <p className="form-status error" aria-live="polite">{error}</p>}
    </form>
  );
}
