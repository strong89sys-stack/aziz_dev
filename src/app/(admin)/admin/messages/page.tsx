import { deleteMessage, markMessageRead } from "@/app/(admin)/admin/actions";
import { prisma } from "@/lib/prisma";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function MessagesAdminPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <div className="admin-heading">
        <div><span className="eyebrow">Boîte de réception</span><h1>Messages</h1><p>Les messages du formulaire de contact sont conservés dans PostgreSQL.</p></div>
      </div>
      <section className="admin-panel">
        <h2>{messages.length} message{messages.length > 1 ? "s" : ""}</h2>
        {messages.length === 0 ? (
          <p>Ta boîte de réception est vide.</p>
        ) : (
          <div className="admin-list">
            {messages.map((message) => (
              <article className="admin-row" key={message.id} style={{ alignItems: "start" }}>
                <div className="admin-row-main" style={{ whiteSpace: "normal" }}>
                  <h3>{message.name} {!message.isRead && <span className="chip" style={{ marginLeft: "0.4rem" }}>Nouveau</span>}</h3>
                  <p style={{ whiteSpace: "normal" }}>{message.email}{message.phone ? " · " + message.phone : ""} · {dateFormatter.format(message.createdAt)}</p>
                  {message.subject && <p style={{ color: "var(--ink)", whiteSpace: "normal" }}>{message.subject}</p>}
                  <p style={{ whiteSpace: "pre-wrap", overflow: "visible", textOverflow: "clip" }}>{message.message}</p>
                </div>
                <div style={{ display: "grid", gap: "0.5rem", flex: "0 0 auto" }}>
                  <form action={markMessageRead}>
                    <input type="hidden" name="id" value={message.id} />
                    <input type="hidden" name="isRead" value={message.isRead ? "" : "on"} />
                    <button className="secondary-button" style={{ minHeight: 34 }} type="submit">{message.isRead ? "Marquer non lu" : "Marquer lu"}</button>
                  </form>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={message.id} />
                    <button className="danger-button" type="submit">Supprimer</button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
