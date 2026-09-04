"use client";

import { useLang } from "../../i18n/LanguageProvider";
import { messages } from "../../i18n/dictionary";
import SealMark from "../SealMark";

export default function CaseHero() {
  const { lang } = useLang();
  const t = messages[lang].caseHajime.hero;

  return (
    <section className="case-hero shell">
      <div className="g12">
        <div className="case-hero-main">
          <p className="eyebrow"><SealMark size={12} decorative /> {t.label}</p>
          <h1 className="h2">{t.title}</h1>
        </div>
        <p className="prose case-hero-subtitle">{t.subtitle}</p>
        <div className="case-hero-facts">
          {t.facts.map((fact) => (
            <div className="case-fact" key={fact.label}>
              <span className="meta">{fact.label}</span>
              <span className="case-fact-value">{fact.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
