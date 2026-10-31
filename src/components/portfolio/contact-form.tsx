"use client";

import { useActionState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";

const initialContactState = {
  status: "idle" as const,
  message: "",
};

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, initialContactState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <form ref={formRef} action={action}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Nom</label>
          <input id="name" name="name" autoComplete="name" required placeholder="Votre nom" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder="vous@exemple.com" />
        </div>
        <div className="field">
          <label htmlFor="phone">Téléphone <span style={{ textTransform: "none", letterSpacing: 0 }}>(facultatif)</span></label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+225 ..." />
        </div>
        <div className="field">
          <label htmlFor="subject">Sujet <span style={{ textTransform: "none", letterSpacing: 0 }}>(facultatif)</span></label>
          <input id="subject" name="subject" placeholder="Votre projet" />
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="company">Société</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="field full">
          <label htmlFor="message">Votre message</label>
          <textarea id="message" name="message" required placeholder="Expliquez-moi brièvement ce que vous imaginez…" />
        </div>
      </div>
      <button type="submit" className="primary-button" disabled={pending} style={{ marginTop: "1.1rem", width: "100%" }}>
        {pending ? "Envoi en cours…" : <>Envoyer le message <Send size={16} /></>}
      </button>
      <p className={state.status === "error" ? "form-status error" : "form-status"} aria-live="polite">{state.message}</p>
    </form>
  );
}
