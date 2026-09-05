import SiteNav from "./components/SiteNav";
import Hero from "./components/Hero";
import ProofRow from "./components/ProofRow";
import Stack from "./components/Stack";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { fetchProfile } from "../lib/api";
import { DEFAULT_PROFILE, PROJECTS } from "./data";

export default async function Home() {
  const profile = await fetchProfile().catch(() => DEFAULT_PROFILE);

  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <ProofRow />
        <Stack />
        <Work projects={PROJECTS} />
        <Experience experience={profile.experiences} />
        <Education education={profile.education} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
