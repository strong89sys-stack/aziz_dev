import { SkillForm } from "@/components/admin/skill-form";
import { createSkill, deleteSkill, updateSkill } from "@/app/(admin)/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function SkillsAdminPage() {
  const skills = await prisma.skill.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] });

  return (
    <>
      <div className="admin-heading">
        <div><span className="eyebrow">Contenu</span><h1>Compétences</h1><p>Ces éléments animent les blocs “Stack en mouvement” et le ruban de compétences.</p></div>
      </div>
      <section className="admin-panel">
        <h2>Ajouter une compétence</h2>
        <p>Utilise l’ordre pour placer les compétences les plus importantes en premier.</p>
        <SkillForm action={createSkill} submitLabel="Ajouter la compétence" />
      </section>
      <section className="admin-panel">
        <h2>Compétences actuelles</h2>
        <div className="admin-list">
          {skills.map((skill) => (
            <details className="admin-row" key={skill.id} style={{ display: "block" }}>
              <summary style={{ cursor: "pointer", listStyle: "none" }}>
                <div className="admin-row-main"><h3>{skill.name}</h3><p>{skill.group} · Ordre {skill.sortOrder}</p></div>
              </summary>
              <div style={{ paddingTop: "1.1rem" }}>
                <SkillForm action={updateSkill} skill={skill} submitLabel="Mettre à jour" />
                <form action={deleteSkill} style={{ marginTop: "0.8rem" }}>
                  <input type="hidden" name="id" value={skill.id} />
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
