"use client";

import { Fragment } from "react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { SKILL_TIERS } from "../data";

export default function SkillTiers() {
  const { lang } = useLang();
  const t = messages[lang].skills;

  return (
    <section className="skills shell">
      <SectionHeader id="skills" label={t.label} title={t.title} aside={t.sub} />
      <div className="rule" />
      {SKILL_TIERS.map((tier, i) => {
        const n = tier.key.slice(-1);
        return (
          <Fragment key={tier.key}>
            <div className={`g12 tier-row tier-${n}`}>
              <p className="tier-label">{t[tier.key]}</p>
              <div className="tier-items">
                {tier.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            {i < SKILL_TIERS.length - 1 && <div className="rule" />}
          </Fragment>
        );
      })}
    </section>
  );
}
