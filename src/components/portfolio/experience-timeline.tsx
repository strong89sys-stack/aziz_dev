import { Route } from "lucide-react";
import type { Experience } from "@prisma/client";

type ExperienceTimelineProps = {
  experiences: Experience[];
};

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section id="parcours" className="section shell">
      <span className="section-label">La route se dessine</span>
      <h2 className="section-title">Mon parcours, <em>point par point</em>.</h2>
      <div className="timeline">
        {experiences.map((experience) => (
          <article className="timeline-item" key={experience.id}>
            <span className="timeline-dot" aria-hidden="true" />
            <div className="timeline-card">
              <span className="timeline-period"><Route size={13} style={{ verticalAlign: "-2px", marginRight: "0.3rem" }} />{experience.period}</span>
              <h3>
                {experience.title}
                {experience.organization && <span>{experience.organization}</span>}
              </h3>
              <p>{experience.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
