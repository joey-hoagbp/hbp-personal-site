"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

export default function Footer() {
  const { lang } = useLang();
  const t = messages[lang].footer;

  return (
    <footer>
      <div className="container">
        <div className="footer-row">
          <span className="footer-copy">{t.copy}</span>
        </div>
      </div>
    </footer>
  );
}
