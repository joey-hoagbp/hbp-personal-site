"use client";

import { useLang } from "../../i18n/LanguageProvider";
import { messages } from "../../i18n/dictionary";
import { PROJECTS } from "../../data";
import SealMark from "../SealMark";

export default function CaseCta() {
  const { lang } = useLang();
  const t = messages[lang].caseHajime.cta;
  const apkUrl = PROJECTS[0]?.apkUrl;

  return (
    <section className="case-cta shell">
      <div className="g12">
        <div className="case-cta-inner">
          <p className="eyebrow"><SealMark size={12} decorative /> {t.label}</p>
          <h2 className="h2">{t.title}</h2>
          <p className="prose">{t.note}</p>
          <div className="case-cta-actions">
            {apkUrl && (
              <a href={apkUrl} className="btn" download="hajime-japanese.apk">{t.install}</a>
            )}
            <a href="/#portfolio" className="btn-ghost">{t.back}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
