"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { CURRENTLY } from "../data";

export default function Currently() {
  const { lang } = useLang();
  return (
    <section className="currently shell">
      <span className="currently-dot" aria-hidden="true" />
      <span className="currently-prefix">{messages[lang].currently.prefix}</span>
      {CURRENTLY.map((item, i) => (
        <span className="currently-item" key={item.text.en}>
          {i > 0 && <span className="currently-sep" aria-hidden="true">—</span>}
          {item.text[lang]}
        </span>
      ))}
    </section>
  );
}
