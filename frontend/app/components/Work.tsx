"use client";

import PhoneMockup from "./PhoneMockup";
import { DownloadIcon } from "./icons";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { loc, type Project } from "../../lib/api";

export default function Work({ projects }: { projects: Project[] }) {
  const { lang } = useLang();
  const t = messages[lang].portfolio;

  return (
    <section id="portfolio" className="section-bordered">
      <span className="section-rule reveal" aria-hidden="true" />
      <div className="container">
        <header className="section-hdr reveal">
          <p className="section-label">{t.label}</p>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-sub">{t.sub}</p>
        </header>

        <div className="work-grid">
          {projects.map((project, i) => {
            const featured = i === 0 || project.current;
            const revealClass = i === 0 ? "reveal" : `reveal reveal-d${Math.min(i, 3)}`;

            return (
              <div
                key={project.id ?? project.title}
                className={`work-card${featured ? " featured spotlight" : ""} ${revealClass}`}
              >
                <div className="work-info">
                  <div className="work-chips">
                    {project.chips.map((chip) => (
                      <span key={chip.label} className={chip.accent ? "chip chip-ac" : "chip"}>
                        {chip.label}
                      </span>
                    ))}
                  </div>
                  <h3 className="work-title">{project.title}</h3>
                  <p className="work-subtitle">{loc(project.subtitle, lang)}</p>
                  <p className="work-desc">{loc(project.description, lang)}</p>
                  <ul className="work-features">
                    {project.features[lang].map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <div className="work-links">
                    {project.apkUrl ? (
                      <a href={project.apkUrl} className="btn-primary" download="hajime-japanese.apk">
                        <DownloadIcon />
                        {t.downloadApk}
                      </a>
                    ) : featured ? (
                      <button className="btn-primary" disabled>
                        <DownloadIcon />
                        {t.comingSoon}
                      </button>
                    ) : null}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        className="btn-ghost"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.repo}
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        className="btn-ghost"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.demo}
                      </a>
                    )}
                  </div>
                </div>
                {featured && (
                  <div className="work-visual">
                    <div className="work-glow" />
                    <PhoneMockup />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
