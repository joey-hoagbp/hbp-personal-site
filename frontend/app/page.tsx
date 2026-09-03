import SiteNav from "./components/SiteNav";
import Hero from "./components/Hero";
import ProofRow from "./components/ProofRow";
import Currently from "./components/Currently";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import { fetchProfile } from "../lib/api";
import { DEFAULT_PROFILE, PROJECTS } from "./data";

export default async function Home() {
  const profile = await fetchProfile().catch(() => DEFAULT_PROFILE);

  return (
    <>
      <ScrollReveal />
      <SiteNav />
      <main>
        <Hero />
        <ProofRow />
        <Currently />
        <Skills groups={profile.techStacks} />
        <Work projects={PROJECTS} />
        <Experience experience={profile.experiences} education={profile.education} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
