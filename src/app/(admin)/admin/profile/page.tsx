import { updateProfile } from "@/app/(admin)/admin/actions";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function ProfileAdminPage() {
  const profile = await prisma.portfolioProfile.findUnique({ where: { id: 1 } });
  if (!profile) throw new Error("Profil introuvable. Lance npm run db:seed.");

  return (
    <>
      <div className="admin-heading">
        <div><span className="eyebrow">Identité</span><h1>Profil & liens</h1><p>Le contenu central de l’accueil, des coordonnées et du pied de page.</p></div>
      </div>
      <section className="admin-panel">
        <h2>Informations principales</h2>
        <p>Les fichiers sont désormais uploadés via Cloudinary.</p>
        <form className="admin-form" action={updateProfile}>
          <div className="admin-form-grid">
            <div className="field"><label>Nom affiché</label><input name="displayName" required defaultValue={profile.displayName} /></div>
            <div className="field"><label>Rôle</label><input name="role" required defaultValue={profile.role} /></div>
            <div className="field"><label>Localisation</label><input name="location" required defaultValue={profile.location} /></div>
            <div className="field"><label>Disponibilité</label><input name="availability" required defaultValue={profile.availability} /></div>
            <div className="field"><label>Email</label><input name="email" type="email" required defaultValue={profile.email} /></div>
            <div className="field"><label>Téléphone <span style={{ textTransform: "none", letterSpacing: 0 }}>(facultatif)</span></label><input name="phone" defaultValue={profile.phone ?? ""} /></div>
            <div className="field full"><label>Phrase d’accroche</label><textarea name="headline" required defaultValue={profile.headline} /></div>
            <div className="field full"><label>Bio</label><textarea name="bio" required defaultValue={profile.bio} /></div>
            <div className="field full"><label>Philosophie</label><textarea name="philosophy" required defaultValue={profile.philosophy} /></div>

            <div className="field">
              <label>Portrait</label>
              <input name="avatar" type="file" accept="image/*" />
              {profile.avatarUrl && (
                <div className="mt-2">
                  <img src={profile.avatarUrl} alt={profile.displayName} className="h-16 w-16 object-cover rounded-full" />
                </div>
              )}
              <input name="avatarUrl" defaultValue={profile.avatarUrl} placeholder="URL de secours" />
            </div>

            <div className="field">
              <label>CV (PDF/Image)</label>
              <input name="cv" type="file" accept=".pdf,image/*" />
              {profile.cvUrl && (
                <div className="mt-2">
                  <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline">Voir le fichier actuel</a>
                </div>
              )}
              <input name="cvUrl" defaultValue={profile.cvUrl} placeholder="URL de secours" />
            </div>

            <div className="field"><label>GitHub <span style={{ textTransform: "none", letterSpacing: 0 }}>(facultatif)</span></label><input name="githubUrl" type="url" defaultValue={profile.githubUrl ?? ""} /></div>
            <div className="field"><label>LinkedIn <span style={{ textTransform: "none", letterSpacing: 0 }}>(facultatif)</span></label><input name="linkedinUrl" type="url" defaultValue={profile.linkedinUrl ?? ""} /></div>
          </div>
          <button className="primary-button" type="submit">Enregistrer le profil</button>
        </form>
      </section>
    </>
  );
}
