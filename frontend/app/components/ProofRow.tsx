"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { SOCIAL_LINKS } from "../data";
import { PROJECTS } from "../data";

export default function ProofRow() {
  const { lang } = useLang();
  const p = messages[lang].proof;
  const apk = PROJECTS[0]?.apkUrl;
  const github = SOCIAL_LINKS.find((l) => l.icon === "github")?.href;

  const items = [
    { ...p.shipped, href: apk },
    { ...p.now, href: undefined },
    { ...p.source, href: github },
  ];

  return (
    <section className="proof shell">
      <div className="rule" />
      <div className="g12 proof-row">
        {items.map((it) => (
          <div className="proof-item" key={it.label}>
            <span className="meta">{it.label}</span>
            {it.href ? (
              <a className="proof-value" href={it.href} target="_blank" rel="noreferrer">
                {it.value}
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--seal)" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
              </a>
            ) : (
              <span className="proof-value">{it.value}</span>
            )}
            <span className="meta">{it.note}</span>
          </div>
        ))}
      </div>
      <div className="rule" />
    </section>
  );
}
