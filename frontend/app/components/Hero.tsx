"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import AvatarCard from "./AvatarCard";

export default function Hero() {
  const { lang } = useLang();
  const t = messages[lang].hero;

  return (
    <section id="hero">
      <div className="hero-glow-orb" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-left reveal">
            <p className="hero-eyebrow">
              <span className="eyebrow-dash" />
              {t.eyebrow}
            </p>
            <h1 className="hero-name">
              <span className="hero-word">Hoàng</span>
              <br />
              <span className="hero-word name-dim">Bảo Phúc.</span>
            </h1>
            <p className="hero-tagline">
              {t.taglineLines[0]}
              <br />
              {t.taglineLines[1]}
            </p>
            <p className="hero-bio">{t.bio}</p>
            <div className="hero-btns">
              <a href="#portfolio" className="btn-primary magnetic">
                {t.viewWork}
              </a>
              <a href="#contact" className="btn-ghost">
                {t.getInTouch}
              </a>
            </div>
          </div>

          <div className="hero-right reveal reveal-d2">
            <AvatarCard />
          </div>
        </div>
      </div>
    </section>
  );
}
