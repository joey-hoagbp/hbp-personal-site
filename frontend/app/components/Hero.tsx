"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { AVATAR_SRC } from "../data";
import SealMark from "./SealMark";

export default function Hero() {
  const { lang } = useLang();
  const t = messages[lang].hero;

  return (
    <section id="hero" className="hero shell">
      <div className="hero-grid-rules" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
      </div>

      <div className="g12 hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><SealMark size={12} decorative /> {t.eyebrow}</p>
          <h1 className="hero-name">
            Hoàng<br />Bảo Phúc
          </h1>
          <p className="hero-tagline">{t.taglineLines[0]} {t.taglineLines[1]}</p>
          <p className="prose hero-bio">{t.bio}</p>
          <div className="hero-actions">
            <a href="#portfolio" className="btn">
              {t.viewWork}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
            </a>
            <a href="#contact" className="btn-ghost">{t.getInTouch}</a>
          </div>
        </div>

        <div className="hero-portrait">
          <img src={AVATAR_SRC} alt={t.avatar.alt} width={420} height={525} />
          <span className="hero-seal"><SealMark size={96} decorative /></span>
        </div>
      </div>
    </section>
  );
}
