"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, ChartNoAxesCombined, FolderKanban, LogOut, Mail, Route, Settings2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const links = [
  { href: "/admin", label: "Vue d’ensemble", icon: ChartNoAxesCombined },
  { href: "/admin/projects", label: "Projets", icon: FolderKanban },
  { href: "/admin/skills", label: "Compétences", icon: BriefcaseBusiness },
  { href: "/admin/experiences", label: "Parcours", icon: Route },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/profile", label: "Profil & liens", icon: Settings2 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  async function signOut() {
    await authClient.signOut();
    window.location.assign("/connexion");
  }

  return (
    <aside className="admin-sidebar">
      <Link className="brand" href="/admin">
        <span className="brand-mark">A</span>
        <span className="brand-text">Aziz<span>Dev</span></span>
      </Link>
      <nav className="admin-nav" aria-label="Navigation administrative">
        {links.map((link) => {
          const Icon = link.icon;
          const active = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link href={link.href} key={link.href} data-active={active}>
              <Icon size={17} /> {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="admin-sidebar-footer">
        <Link className="admin-nav" href="/" style={{ marginTop: 0 }}>Voir le portfolio</Link>
        <button className="danger-button" type="button" onClick={signOut} style={{ width: "100%", marginTop: "0.8rem" }}>
          <LogOut size={14} style={{ marginRight: "0.35rem" }} /> Se déconnecter
        </button>
      </div>
    </aside>
  );
}
