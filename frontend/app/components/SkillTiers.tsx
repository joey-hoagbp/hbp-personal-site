"use client";

import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { SKILLS } from "../data";

export default function SkillTiers() {
  const { lang } = useLang();
  const t = messages[lang].skills;

  return (
    <section className="skills shell">
      <SectionHeader id="skills" label={t.label} title={t.title} aside={t.sub} />
      <div className="rule" />
      <div className="skill-list">
        {SKILLS.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}
