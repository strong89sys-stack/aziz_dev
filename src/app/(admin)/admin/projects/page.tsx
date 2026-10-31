import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/project-form";
import { createProject, deleteProject, updateProject } from "@/app/(admin)/admin/actions";

export default async function ProjectsAdminPage() {
  const projects = await prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <>
      <div className="admin-heading">
        <div><span className="eyebrow">Contenu</span><h1>Projets</h1><p>Ajoute, modifie, masque ou retire les études de cas visibles sur la page d’accueil.</p></div>
      </div>
      <section className="admin-panel">
        <h2>Ajouter un projet</h2>
        <p>Place une image dans <code>public/images/projects</code>, puis utilise son chemin ici.</p>
        <ProjectForm action={createProject} submitLabel="Publier le projet" />
      </section>
      <section className="admin-panel">
        <h2>Projets existants</h2>
        <div className="admin-list">
          {projects.map((project) => (
            <details className="admin-row" key={project.id} style={{ display: "block" }}>
              <summary style={{ cursor: "pointer", listStyle: "none" }}>
                <div className="admin-row-main">
                  <h3>{project.title} {!project.published && <span className="chip" style={{ marginLeft: "0.4rem" }}>Masqué</span>}</h3>
                  <p>{project.category} · Ordre {project.sortOrder}</p>
                </div>
              </summary>
              <div style={{ paddingTop: "1.2rem" }}>
                <ProjectForm action={updateProject} project={project} submitLabel="Enregistrer les changements" />
                <form action={deleteProject} style={{ marginTop: "0.8rem" }}>
                  <input type="hidden" name="id" value={project.id} />
                  <button className="danger-button" type="submit">Supprimer ce projet</button>
                </form>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
