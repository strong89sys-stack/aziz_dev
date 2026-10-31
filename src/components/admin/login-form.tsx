"use client";

import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const result = await authClient.signIn.email({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    setPending(false);

    if (result.error) {
      setError(result.error.message ?? "Connexion impossible.");
      return;
    }

    window.location.assign("/admin");
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="admin-email">Email</label>
        <input id="admin-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="admin-password">Mot de passe</label>
        <input id="admin-password" name="password" type="password" required autoComplete="current-password" />
      </div>
      <button className="primary-button" type="submit" disabled={pending}>
        <LockKeyhole size={16} /> {pending ? "Connexion…" : "Se connecter"}
      </button>
      {error && <p className="form-status error" aria-live="polite">{error}</p>}
    </form>
  );
}
