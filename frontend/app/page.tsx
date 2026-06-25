import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import CV from "./components/CV";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import ScrollProgress from "./components/ScrollProgress";
import PointerEffects from "./components/PointerEffects";
import Parallax from "./components/Parallax";
import AmbientBackground from "./components/AmbientBackground";
import { fetchProfile } from "../lib/api";
import { DEFAULT_PROFILE } from "./data";

export default async function Home() {
  const profile = await fetchProfile().catch(() => DEFAULT_PROFILE);

  return (
    <>
      <AmbientBackground />
      <ScrollProgress />
      <PointerEffects />
      <Parallax />
      <ScrollReveal />
      <Nav />
      <main>
        <Hero />
        <Skills groups={profile.techStacks} />
        <Portfolio project={profile.projects.find((p) => p.current) ?? profile.projects[0]} />
        <CV experience={profile.experiences} education={profile.education} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
