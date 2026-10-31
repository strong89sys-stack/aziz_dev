import type { Experience } from "@/generated/prisma/client";

type FormAction = (formData: FormData) => void | Promise<void>;

export function ExperienceForm({ action, experience, submitLabel }: { action: FormAction; experience?: Experience; submitLabel: string }) {
  return (
    <form className="admin-form" action={action}>
      {experience && <input type="hidden" name="id" value={experience.id} />}
      <div className="admin-form-grid">
        <div className="field">
          <label>Titre</label>
          <input name="title" required defaultValue={experience?.title} />
        </div>
        <div className="field">
          <label>Organisation <span style={{ textTransform: "none", letterSpacing: 0 }}>(facultatif)</span></label>
          <input name="organization" defaultValue={experience?.organization ?? ""} />
        </div>
        <div className="field">
          <label>Période</label>
          <input name="period" required defaultValue={experience?.period} placeholder="2026 — aujourd’hui" />
        </div>
        <div className="field">
          <label>Ordre d’affichage</label>
          <input name="sortOrder" type="number" min="0" required defaultValue={experience?.sortOrder ?? 0} />
        </div>
        <div className="field full">
          <label>Description</label>
          <textarea name="description" required defaultValue={experience?.description} />
        </div>
      </div>
      <label className="inline-toggle"><input type="checkbox" name="published" defaultChecked={experience?.published ?? true} /> Visible sur le portfolio</label>
      <button className="primary-button" type="submit">{submitLabel}</button>
    </form>
  );
}
