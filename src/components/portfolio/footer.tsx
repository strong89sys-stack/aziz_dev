import { Github, Linkedin } from "lucide-react";
import type { PortfolioProfile } from "@/generated/prisma/client";

type FooterProps = {
  profile: PortfolioProfile;
};

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <span>© {new Date().getFullYear()} · {profile.displayName}. Fait avec intention.</span>
        <div className="footer-links">
          {profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer"><Github size={16} aria-label="GitHub" /></a>}
          {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={16} aria-label="LinkedIn" /></a>}
          <a href="/connexion">Administration</a>
        </div>
      </div>
    </footer>
  );
}
