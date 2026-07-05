"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { loc } from "../../lib/api";
import { CURRENTLY } from "../data";

export default function Currently() {
  const { lang } = useLang();
  const t = messages[lang].currently;

  return (
    <section className="currently">
      <div className="container currently-inner">
        <span className="currently-dot" aria-hidden="true" />
        <span className="currently-prefix">{t.prefix}</span>
        {CURRENTLY.map((item, i) => (
          <span className="currently-item" key={loc(item.text, lang)}>
            {i > 0 && <span className="currently-sep" aria-hidden="true">·</span>}
            <span aria-hidden="true">{item.emoji}</span>
            {loc(item.text, lang)}
          </span>
        ))}
      </div>
    </section>
  );
}
