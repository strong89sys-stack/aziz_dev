import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import type { PortfolioProfile } from "@/generated/prisma/client";

type HeroProps = {
  profile: PortfolioProfile;
  projectCount: number;
};

export function Hero({ profile, projectCount }: HeroProps) {
  const nameParts = profile.displayName.split(" ");
  const firstName = nameParts.shift() ?? profile.displayName;
  const lastName = nameParts.join(" ") || "Kabore";

  return (
    <section id="accueil" className="hero shell">
      <div className="hero-grid">
        <div>
          <div className="availability">
            <i aria-hidden="true" />
            {profile.availability}
          </div>
          <p className="eyebrow">{profile.role}</p>
          <h1 className="hero-title">
            {firstName}
            <span>{lastName}.</span>
          </h1>
          <p className="hero-copy">{profile.headline}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#projets">
              Explorer mes projets <ArrowDownRight size={16} />
            </a>
            <a className="secondary-button" href="#contact">
              Démarrer une discussion <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="hero-meta" aria-label="Informations rapides">
            <div className="stat">
              <b>{projectCount.toString().padStart(2, "0")} projets</b>
              <span>Construits & documentés</span>
            </div>
            <div className="stat">
              <b>{profile.location}</b>
              <span>Basé en Afrique de l’Ouest</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label={"Portrait de " + profile.displayName}>
          <div className="orbit orbit-a" aria-hidden="true" />
          <div className="orbit orbit-b" aria-hidden="true" />
          <div className="orbit-dot" aria-hidden="true" />
          <div className="availability-card">
            <Sparkles size={15} /> En construction permanente
          </div>
          <div className="portrait-frame">
            <Image src={profile.avatarUrl} alt={"Portrait de " + profile.displayName} fill priority sizes="(max-width: 680px) 78vw, 410px" />
          </div>
          <div className="visual-chip">
            <strong>Mon terrain de jeu</strong>
            Interfaces expressives, logique solide et attention aux détails.
          </div>
          <div style={{ position: "absolute", right: "5%", top: "4%", color: "var(--faint)", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.72rem", fontWeight: 700 }}>
            <MapPin size={14} /> {profile.location}
          </div>
        </div>
      </div>
    </section>
  );
}
