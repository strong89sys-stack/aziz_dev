import { ThemeToggle } from "@/components/ui/theme-toggle";

type MainHeaderProps = {
  cvUrl: string;
};

export function MainHeader({ cvUrl }: MainHeaderProps) {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#accueil" aria-label="Retour à l’accueil">
          <span className="brand-mark">A</span>
          <span className="brand-text">Aziz<span>Dev</span></span>
        </a>

        <nav className="nav-links" aria-label="Navigation principale">
          <a href="#a-propos">À propos</a>
          <a href="#projets">Projets</a>
          <a href="#parcours">Parcours</a>
          <a href="#contact">Contact</a>
          <ThemeToggle />
          <a className="button-link" href={cvUrl} download>
            <span className="hide-mobile text-black">Télécharger mon CV</span>
            <span className="show-mobile text-black">CV</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
