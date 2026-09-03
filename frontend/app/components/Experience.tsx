"use client";

import { Fragment } from "react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import type { TimelineItem } from "../../lib/api";

export default function Experience({
  experience,
  education,
}: {
  experience: TimelineItem[];
  education: TimelineItem[];
}) {
  const { lang } = useLang();
  const t = messages[lang].experience;

  return (
    <section className="experience shell">
      <SectionHeader id="experience" label={t.label} title={t.title} aside={t.sub} />
      <div className="rule" />
      {experience.map((e) => (
        <Fragment key={`${e.date[lang]}-${e.org[lang]}`}>
          <div className="g12 exp-row">
            <span className="exp-date">{e.date[lang]}</span>
            <div className="exp-role">
              <span className="exp-title">{e.title[lang]}</span>
              <span className="exp-org">{e.org[lang]}</span>
            </div>
            <p className="prose exp-desc">{e.desc[lang]}</p>
          </div>
          <div className="rule" />
        </Fragment>
      ))}
      <div className="g12 edu-row">
        <span className="meta">{t.education}</span>
        <div className="edu-items">
          {education.map((e) => (
            <span className="meta edu-item" key={e.org[lang]}>
              {e.date[lang]}<br /><span className="edu-title">{e.title[lang]}</span><br />{e.org[lang]}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
