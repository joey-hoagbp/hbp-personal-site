"use client";

import PhoneMockup from "./PhoneMockup";
import { DownloadIcon } from "./icons";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { loc, type Project } from "../../lib/api";

export default function Portfolio({ project }: { project: Project }) {
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
              {project.chips.map((chip) => (
                <span key={chip.label} className={chip.accent ? "chip chip-ac" : "chip"}>
                  {chip.label}
                </span>
              ))}
            </div>
            <h3 className="proj-title">{project.title}</h3>
            <p className="proj-subtitle">{loc(project.subtitle, lang)}</p>
            <p className="proj-desc">{loc(project.description, lang)}</p>
            <ul className="proj-features">
              {project.features[lang].map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="proj-btns">
              {project.apkUrl ? (
                <a href={project.apkUrl} className="btn-primary" download="hajime-japanese.apk">
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
