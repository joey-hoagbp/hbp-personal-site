"use client";

import { Fragment } from "react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { STACK_GROUPS } from "../data";

export default function Stack() {
  const { lang } = useLang();
  const t = messages[lang].skills;

  return (
    <section className="skills shell">
      <SectionHeader id="skills" label={t.label} title={t.title} aside={t.sub} />
      <div className="rule" />
      {STACK_GROUPS.map((group, i) => (
        <Fragment key={group.key}>
          <div className={`g12 stack-group stack-${group.key === "groupCore" ? "core" : "api"}`}>
            <p className="stack-label">{t[group.key]}</p>
            <ul className="stack-items">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {i < STACK_GROUPS.length - 1 && <div className="rule" />}
        </Fragment>
      ))}
    </section>
  );
}
