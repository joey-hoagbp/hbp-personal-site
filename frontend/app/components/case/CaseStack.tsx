"use client";

import { useLang } from "../../i18n/LanguageProvider";
import { messages } from "../../i18n/dictionary";
import { HAJIME_CASE_STACK } from "../../data";
import SealMark from "../SealMark";

export default function CaseStack() {
  const { lang } = useLang();
  const t = messages[lang].caseHajime.stack;

  return (
    <section className="case-stack shell">
      <p className="eyebrow"><SealMark size={12} decorative /> {t.label}</p>
      <ul className="case-stack-list">
        {HAJIME_CASE_STACK.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </section>
  );
}
