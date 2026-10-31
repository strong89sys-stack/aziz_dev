import Link from "next/link";
import { ExternalLink, MailPlus, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [projects, skills, experiences, unreadMessages, latestMessages] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.experience.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
  ]);

  return (
    <>
      <div className="admin-heading">
        <div>
          <span className="eyebrow">Cockpit du portfolio</span>
          <h1>Bonjour, Aziz.</h1>
          <p>Tout ce qui apparaît sur ton portfolio se pilote depuis ici.</p>
        </div>
        <Link className="secondary-button" href="/" target="_blank">Voir le site <ExternalLink size={15} /></Link>
      </div>

      <section className="admin-kpis" aria-label="Indicateurs du portfolio">
        <article className="kpi"><span>Projets</span><b>{projects}</b></article>
        <article className="kpi"><span>Compétences</span><b>{skills}</b></article>
        <article className="kpi"><span>Étapes de parcours</span><b>{experiences}</b></article>
        <article className="kpi"><span>Messages non lus</span><b>{unreadMessages}</b></article>
      </section>

      <section className="admin-panel">
        <h2>Actions rapides</h2>
        <p>Ajoute un nouvel élément sans toucher au code.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}>
          <Link className="primary-button" href="/admin/projects"><Plus size={15} /> Nouveau projet</Link>
          <Link className="secondary-button" href="/admin/skills"><Plus size={15} /> Compétence</Link>
          <Link className="secondary-button" href="/admin/experiences"><Plus size={15} /> Parcours</Link>
        </div>
      </section>

      <section className="admin-panel">
        <h2><MailPlus size={17} style={{ verticalAlign: "-3px", marginRight: "0.35rem" }} />Derniers messages</h2>
        {latestMessages.length === 0 ? (
          <p>Aucun message pour le moment.</p>
        ) : (
          <div className="admin-list">
            {latestMessages.map((message) => (
              <div className="admin-row" key={message.id}>
                <div className="admin-row-main">
                  <h3>{message.name} · {message.subject || "Sans objet"}</h3>
                  <p>{message.email} — {message.message}</p>
                </div>
                {!message.isRead && <span className="chip">Nouveau</span>}
              </div>
            ))}
          </div>
        )}
        <Link className="text-link" href="/admin/messages" style={{ marginTop: "1rem" }}>Voir la boîte de réception <ExternalLink size={14} /></Link>
      </section>
    </>
  );
}
