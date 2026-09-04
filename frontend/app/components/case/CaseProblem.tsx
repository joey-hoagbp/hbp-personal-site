"use client";

import { useLang } from "../../i18n/LanguageProvider";
import { messages } from "../../i18n/dictionary";
import SealMark from "../SealMark";

export default function CaseProblem() {
  const { lang } = useLang();
  const t = messages[lang].caseHajime.problem;

  return (
    <section className="case-section shell">
      <div className="g12">
        <div className="case-section-main">
          <p className="eyebrow"><SealMark size={12} decorative /> {t.label}</p>
          <h2 className="h2">{t.title}</h2>
        </div>
        <div className="case-section-body">
          <p className="prose">{t.body1}</p>
          <p className="prose">{t.body2}</p>
        </div>
      </div>
    </section>
  );
}
