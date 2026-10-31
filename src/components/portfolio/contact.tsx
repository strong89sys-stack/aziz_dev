import { Mail, MapPin, MessageCircle } from "lucide-react";
import type { PortfolioProfile } from "@prisma/client";
import { ContactForm } from "@/components/portfolio/contact-form";

type ContactProps = {
  profile: PortfolioProfile;
};

export function Contact({ profile }: ContactProps) {
  const whatsappNumber = profile.phone?.replace(/\D/g, "");

  return (
    <section id="contact" className="section shell">
      <div className="contact-shell">
        <div className="contact-grid">
          <div className="contact-copy">
            <span className="section-label">Une idée à mettre en ligne ?</span>
            <h2>Construisons quelque chose qui <em>compte</em>.</h2>
            <p>Un projet, une opportunité ou simplement envie de parler tech ? Laisse-moi un message, je serai heureux d’échanger.</p>
            <div className="contact-methods">
              <a className="contact-method" href={"mailto:" + profile.email}>
                <span><Mail size={16} /></span>{profile.email}
              </a>
              {whatsappNumber && (
                <a className="contact-method" href={"https://wa.me/" + whatsappNumber} target="_blank" rel="noreferrer">
                  <span><MessageCircle size={16} /></span>{profile.phone}
                </a>
              )}
              <p className="contact-method"><span><MapPin size={16} /></span>{profile.location}</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
