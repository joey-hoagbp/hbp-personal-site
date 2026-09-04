"use client";

import { useLang } from "../../i18n/LanguageProvider";
import { messages } from "../../i18n/dictionary";
import SectionHeader from "../SectionHeader";

export default function StatusColumns() {
  const { lang } = useLang();
  const t = messages[lang].caseHajime.status;

  return (
    <section className="status shell">
      <SectionHeader id="status" label={t.label} title={t.title} aside={t.note} />
      <div className="g12 status-grid">
        <div className="status-col status-shipped">
          <span className="meta">{t.shippedLabel}</span>
          {t.shipped.map((item) => (
            <div className="status-item" key={item}>
              <span className="status-mark" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 11 11"><path d="M1 6 L4.2 9 L10 1.4" stroke="var(--seal-lit)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              {item}
            </div>
          ))}
        </div>
        <div className="status-col status-notyet">
          <span className="meta">{t.notLabel}</span>
          {t.notYet.map((item) => (
            <div className="status-item" key={item}>
              <span className="status-mark" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
