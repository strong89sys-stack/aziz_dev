import { ExperienceForm } from "@/components/admin/experience-form";
import { createExperience, deleteExperience, updateExperience } from "@/app/(admin)/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function ExperiencesAdminPage() {
  const experiences = await prisma.experience.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <>
      <div className="admin-heading">
        <div><span className="eyebrow">Contenu</span><h1>Parcours</h1><p>Les éléments apparaissent sur la frise chronologique du portfolio.</p></div>
      </div>
      <section className="admin-panel">
        <h2>Ajouter une étape</h2>
        <p>Une formation, une expérience ou une étape marquante : donne-lui une période claire et une description courte.</p>
        <ExperienceForm action={createExperience} submitLabel="Ajouter à la frise" />
      </section>
      <section className="admin-panel">
        <h2>Étapes existantes</h2>
        <div className="admin-list">
          {experiences.map((experience) => (
            <details className="admin-row" key={experience.id} style={{ display: "block" }}>
              <summary style={{ cursor: "pointer", listStyle: "none" }}>
                <div className="admin-row-main">
                  <h3>{experience.title} {!experience.published && <span className="chip" style={{ marginLeft: "0.4rem" }}>Masqué</span>}</h3>
                  <p>{experience.period}{experience.organization ? " · " + experience.organization : ""}</p>
                </div>
              </summary>
              <div style={{ paddingTop: "1.1rem" }}>
                <ExperienceForm action={updateExperience} experience={experience} submitLabel="Enregistrer les changements" />
                <form action={deleteExperience} style={{ marginTop: "0.8rem" }}>
                  <input type="hidden" name="id" value={experience.id} />
                  <button className="danger-button" type="submit">Supprimer</button>
                </form>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
