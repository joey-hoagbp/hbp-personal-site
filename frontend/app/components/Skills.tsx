"use client";

import { SKILL_GROUP_ITEMS } from "../data";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

export default function Skills() {
  const { lang } = useLang();
  const t = messages[lang].skills;

  return (
    <section id="skills" className="section-bordered">
      <div className="container">
        <header className="section-hdr reveal">
          <p className="section-label">{t.label}</p>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-sub">{t.sub}</p>
        </header>
        <div className="skills-grid">
          {SKILL_GROUP_ITEMS.map((items, i) => (
            <div key={t.groupLabels[i]} className={`skill-group reveal reveal-d${(i % 3) + 1}`}>
              <p className="sg-label">{t.groupLabels[i]}</p>
              <div className="sg-tags">
                {items.map((s) => (
                  <span key={s} className="sg-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
