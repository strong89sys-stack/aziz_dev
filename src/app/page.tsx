import { Footer } from "@/components/portfolio/footer";
import { Hero } from "@/components/portfolio/hero";
import { MainHeader } from "@/components/portfolio/main-header";
import { About } from "@/components/portfolio/about";
import { Contact } from "@/components/portfolio/contact";
import { ExperienceTimeline } from "@/components/portfolio/experience-timeline";
import { Projects } from "@/components/portfolio/projects";
import { getPortfolioData } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <>
      <div className="grid-noise" aria-hidden="true" />
      <MainHeader cvUrl={data.profile.cvUrl} />
      <main>
        <Hero profile={data.profile} projectCount={data.projects.length} />
        <About profile={data.profile} skills={data.skills} />
        <Projects projects={data.projects} />
        <ExperienceTimeline experiences={data.experiences} />
        <Contact profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
    </>
  );
}
