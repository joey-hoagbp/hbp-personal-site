"use client";

import SectionHeader from "./SectionHeader";
import WorkFeature from "./WorkFeature";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import type { Project } from "../../lib/api";

export default function Work({ projects }: { projects: Project[] }) {
  const { lang } = useLang();
  const t = messages[lang];

  return (
    <section className="work shell">
      <SectionHeader id="portfolio" label={t.portfolio.label} />
      <div className="rule" />
      {projects.map((project) => (
        <WorkFeature key={project.id ?? project.title} project={project} />
      ))}
    </section>
  );
}
