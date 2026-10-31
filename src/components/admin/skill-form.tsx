import type { Skill } from "@prisma/client";

type FormAction = (formData: FormData) => void | Promise<void>;

export function SkillForm({ action, skill, submitLabel }: { action: FormAction; skill?: Skill; submitLabel: string }) {
  return (
    <form className="admin-form" action={action}>
      {skill && <input type="hidden" name="id" value={skill.id} />}
      <div className="admin-form-grid">
        <div className="field">
          <label>Compétence</label>
          <input name="name" required defaultValue={skill?.name} placeholder="Ex. Next.js" />
        </div>
        <div className="field">
          <label>Groupe</label>
          <input name="group" required defaultValue={skill?.group ?? "Technologies"} placeholder="Technologies" />
        </div>
      </div>
      <div className="field">
        <label>Classe DevIcon <span style={{ textTransform: "none", letterSpacing: 0 }}>(ex: devicon-nextjs-plain)</span></label>
        <input name="iconClass" defaultValue={skill?.iconClass} placeholder="devicon-nextjs-plain" />
        {skill?.iconClass && (
          <div className="mt-2 flex items-center gap-2">
            <i className={skill.iconClass} className="text-xl"></i>
            <span className="text-xs text-gray-500">Aperçu</span>
          </div>
        )}
      </div>
      <div className="field" style={{ maxWidth: 180 }}>
        <label>Ordre</label>
        <input name="sortOrder" type="number" min="0" required defaultValue={skill?.sortOrder ?? 0} />
      </div>
      <button className="primary-button" type="submit">{submitLabel}</button>
    </form>
  );
}
