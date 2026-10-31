import { Layers3, Sparkles } from "lucide-react";
import type { PortfolioProfile, Skill } from "@/generated/prisma/client";

type AboutProps = {
  profile: PortfolioProfile;
  skills: Skill[];
};

export function About({ profile, skills }: AboutProps) {
  const repeatedSkills = [...skills, ...skills];

  return (
    <section id="a-propos" className="section shell">
      <span className="section-label">La méthode derrière l’écran</span>
      <h2 className="section-title">
        Un code précis.<br />Une <em>présence</em> qui reste.
      </h2>

      <div className="about-grid">
        <article className="glass-card philosophy-card">
          <span className="eyebrow"><Sparkles size={14} style={{ verticalAlign: "-2px", marginRight: "0.35rem" }} /> Philosophie</span>
          <p>{profile.philosophy}</p>
        </article>
        <aside className="glass-card skills-card">
          <div>
            <span className="eyebrow"><Layers3 size={14} style={{ verticalAlign: "-2px", marginRight: "0.35rem" }} /> Stack en mouvement</span>
            <h3>Des outils choisis pour faire avancer les idées.</h3>
            <p>Une sélection vivante de technologies que j’explore et mets en pratique.</p>
          </div>
          <div className="chip-list">
            {skills.slice(0, 6).map((skill) => (
              <span className="chip" key={skill.id}>
                {skill.iconClass && <i className={`${skill.iconClass} mr-1.5`} style={{ fontSize: "1rem" }}></i>}
                {skill.name}
              </span>
            ))}
          </div>
        </aside>
      </div>

      {skills.length > 0 && (
        <div className="skills-ticker" aria-label="Compétences techniques">
          <div className="skills-track">
            {repeatedSkills.map((skill, index) => (
              <span className="chip" key={skill.id + "-" + index}>
                {skill.iconClass && <i className={`${skill.iconClass} mr-1.5`} style={{ fontSize: "1rem" }}></i>}
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
