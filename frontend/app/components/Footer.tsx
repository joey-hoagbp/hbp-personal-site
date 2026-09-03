"use client";

import SealMark from "./SealMark";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

export default function Footer() {
  const { lang } = useLang();
  const t = messages[lang].footer;
  const location = messages[lang].hero.avatar.location;

  return (
    <footer className="footer">
      <div className="footer-id">
        <SealMark size={28} decorative />
        <span className="meta">
          {t.copy}
          <br />
          {location}
        </span>
      </div>
      <span className="meta">{t.builtWith}</span>
    </footer>
  );
}
