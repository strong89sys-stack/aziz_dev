import Image from "next/image";
import { ArrowUpRight, Github, Play } from "lucide-react";
import type { Project } from "@/generated/prisma/client";

type ProjectsProps = {
  projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projets" className="section shell">
      <div className="project-header">
        <div>
          <span className="section-label">Études de cas & expérimentations</span>
          <h2 className="section-title">Des projets pour <em>essayer</em>, apprendre et livrer.</h2>
        </div>
        <p className="project-intro">
          Chaque carte est une étape : une contrainte à résoudre, une technologie à mieux comprendre, une expérience à rendre plus simple.
        </p>
      </div>

      <div className="project-list">
        {projects.map((project, index) => (
          <article className="project-card" key={project.id}>
            <div className="project-media">
              <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
              <Image src={project.imageUrl} alt={"Aperçu du projet " + project.title} fill sizes="(max-width: 680px) 100vw, (max-width: 900px) 50vw, 42vw" />
            </div>
            <div className="project-content">
              <span className="project-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-footer">
                <div className="chip-list">
                  {project.technologies.map((technology) => <span className="chip" key={technology}>{technology}</span>)}
                </div>
                <div className="project-links">
                  {project.repoUrl && (
                    <a className="text-link" href={project.repoUrl} target="_blank" rel="noreferrer">
                      <Github size={15} /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                      <Play size={15} /> Découvrir <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
