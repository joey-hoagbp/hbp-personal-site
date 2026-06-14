"use client";

import PhoneMockup from "./PhoneMockup";
import { DownloadIcon } from "./icons";
import { PROJECT_META } from "../data";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

export default function Portfolio() {
  const { lang } = useLang();
  const t = messages[lang].portfolio;

  return (
    <section id="portfolio" className="section-bordered">
      <div className="container">
        <header className="section-hdr reveal">
          <p className="section-label">{t.label}</p>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-sub">{t.sub}</p>
        </header>

        <div className="project-card reveal">
          <div className="project-info">
            <div className="proj-chips">
              {PROJECT_META.chips.map((chip) => (
                <span key={chip.label} className={chip.accent ? "chip chip-ac" : "chip"}>
                  {chip.label}
                </span>
              ))}
            </div>
            <h3 className="proj-title">{PROJECT_META.title}</h3>
            <p className="proj-subtitle">{t.project.subtitle}</p>
            <p className="proj-desc">{t.project.description}</p>
            <ul className="proj-features">
              {t.project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="proj-btns">
              {PROJECT_META.apkUrl ? (
                <a href={PROJECT_META.apkUrl} className="btn-primary" download="hajime-japanese.apk">
                  <DownloadIcon />
                  {t.downloadApk}
                </a>
              ) : (
                <button className="btn-primary" disabled>
                  <DownloadIcon />
                  {t.comingSoon}
                </button>
              )}
            </div>
          </div>
          <div className="project-visual">
            <div className="pv-glow" />
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
