"use client";

import { Fragment } from "react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import type { TimelineItem } from "../../lib/api";

export default function Education({ education }: { education: TimelineItem[] }) {
  const { lang } = useLang();
  const t = messages[lang].education;

  return (
    <section className="education shell">
      <SectionHeader id="education" label={t.label} />
      <div className="rule" />
      {education.map((e) => (
        <Fragment key={`${e.date[lang]}-${e.org[lang]}`}>
          <div className="g12 tl-row">
            <span className="tl-date">{e.date[lang]}</span>
            <div className="tl-role">
              <span className="tl-title">{e.title[lang]}</span>
              <span className="tl-org">{e.org[lang]}</span>
            </div>
            {e.desc[lang] && <p className="prose tl-desc">{e.desc[lang]}</p>}
          </div>
          <div className="rule" />
        </Fragment>
      ))}
    </section>
  );
}
