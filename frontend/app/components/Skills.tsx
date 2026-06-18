"use client";

import type { CSSProperties } from "react";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { loc, type TechStackGroup } from "../../lib/api";
import { TECH_ICONS } from "./techIcons";

export default function Skills({ groups }: { groups: TechStackGroup[] }) {
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
          {groups.map((group, i) => (
            <div key={loc(group.label, lang)} className={`skill-group spotlight reveal reveal-d${(i % 3) + 1}`}>
              <p className="sg-label">{loc(group.label, lang)}</p>
              <div className="sg-tags">
                {group.items.map((s) => {
                  const tech = TECH_ICONS[s];
                  return (
                    <span
                      key={s}
                      className="sg-tag"
                      style={tech?.color ? ({ "--brand": tech.color } as CSSProperties) : undefined}
                    >
                      {tech && <tech.Icon className="sg-tag-icon" aria-hidden />}
                      {s}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
