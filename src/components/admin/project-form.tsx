import type { Project } from "@/generated/prisma/client";

type FormAction = (formData: FormData) => void | Promise<void>;

type ProjectFormProps = {
  action: FormAction;
  project?: Project;
  submitLabel: string;
};

export function ProjectForm({ action, project, submitLabel }: ProjectFormProps) {
  return (
    <form className="admin-form" action={action}>
      {project && <input type="hidden" name="id" value={project.id} />}
      <div className="admin-form-grid">
        <div className="field">
          <label htmlFor={project ? "title-edit" : "title"}>Titre</label>
          <input id={project ? "title-edit" : "title"} name="title" required defaultValue={project?.title} />
        </div>
        <div className="field">
          <label htmlFor={project ? "slug-edit" : "slug"}>Slug <span style={{ textTransform: "none", letterSpacing: 0 }}>(facultatif)</span></label>
          <input id={project ? "slug-edit" : "slug"} name="slug" defaultValue={project?.slug} placeholder="genéré depuis le titre" />
        </div>
        <div className="field">
          <label htmlFor={project ? "category-edit" : "category"}>Type</label>
          <input id={project ? "category-edit" : "category"} name="category" required defaultValue={project?.category ?? "Personnel"} placeholder="Personnel ou Académique" />
        </div>
        <div className="field">
          <label htmlFor={project ? "order-edit" : "order"}>Ordre d’affichage</label>
          <input id={project ? "order-edit" : "order"} name="sortOrder" type="number" min="0" required defaultValue={project?.sortOrder ?? 0} />
        </div>
        <div className="field full">
          <label htmlFor={project ? "image-upload-edit" : "image-upload"}>Image du projet</label>
          <input id={project ? "image-upload-edit" : "image-upload"} name="image" type="file" accept="image/*" />
          {project?.imageUrl && (
            <div className="mt-2">
              <img src={project.imageUrl} alt={project.title} className="h-24 w-auto object-cover rounded" />
            </div>
          )}
        </div>
        <div className="field full">
          <label htmlFor={project ? "image-url-edit" : "image-url"}>URL de secours / Externe <span style={{ textTransform: "none", letterSpacing: 0 }}>(facultatif)</span></label>
          <input id={project ? "image-url-edit" : "image-url"} name="imageUrl" defaultValue={project?.imageUrl} placeholder="https://..." />
        </div>
        <div className="field full">
          <label htmlFor={project ? "excerpt-edit" : "excerpt"}>Accroche</label>
          <input id={project ? "excerpt-edit" : "excerpt"} name="excerpt" required defaultValue={project?.excerpt} />
        </div>
        <div className="field full">
          <label htmlFor={project ? "description-edit" : "description"}>Description</label>
          <textarea id={project ? "description-edit" : "description"} name="description" required defaultValue={project?.description} />
        </div>
        <div className="field full">
          <label htmlFor={project ? "technologies-edit" : "technologies"}>Technologies <span style={{ textTransform: "none", letterSpacing: 0 }}>(séparées par des virgules)</span></label>
          <input id={project ? "technologies-edit" : "technologies"} name="technologies" required defaultValue={project?.technologies.join(", ")} placeholder="Next.js, TypeScript, PostgreSQL" />
        </div>
        <div className="field">
          <label htmlFor={project ? "repo-edit" : "repo"}>URL du dépôt <span style={{ textTransform: "none", letterSpacing: 0 }}>(facultatif)</span></label>
          <input id={project ? "repo-edit" : "repo"} name="repoUrl" type="url" defaultValue={project?.repoUrl ?? ""} />
        </div>
        <div className="field">
          <label htmlFor={project ? "live-edit" : "live"}>URL live <span style={{ textTransform: "none", letterSpacing: 0 }}>(facultatif)</span></label>
          <input id={project ? "live-edit" : "live"} name="liveUrl" type="url" defaultValue={project?.liveUrl ?? ""} />
        </div>
      </div>
      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
        <label className="inline-toggle"><input type="checkbox" name="published" defaultChecked={project?.published ?? true} /> Visible sur le portfolio</label>
        <label className="inline-toggle"><input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} /> Projet à la une</label>
      </div>
      <button className="primary-button" type="submit">{submitLabel}</button>
    </form>
  );
}
