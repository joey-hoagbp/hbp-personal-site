"use client";

import { KanaScreen, KanjiScreen } from "./HajimeScreens";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { loc, type Project } from "../../lib/api";

export default function WorkFeature({ project }: { project: Project }) {
  const { lang } = useLang();
  const t = messages[lang];
  const p = t.portfolio;

  return (
    <div className="g12 work-grid">
      <div className="work-copy">
        <div className="work-title-row">
          <h3 className="work-title">{project.title}</h3>
          {project.titleNative && (
            <span className="work-jp" aria-hidden="true">{project.titleNative}</span>
          )}
        </div>
        <p className="meta">{loc(project.subtitle, lang)}</p>
        <p className="prose">{loc(project.description, lang)}</p>
        <ul className="work-features">
          {project.features[lang].map((feature) => (
            <li key={feature}>
              <svg viewBox="0 0 24 22" aria-hidden="true"><path d="M6 19 L16 3 L20 5.5 L10 21.5 Z" /></svg>
              {feature}
            </li>
          ))}
        </ul>
        <div className="work-actions">
          {project.apkUrl ? (
            <a href={project.apkUrl} className="btn" download="hajime-japanese.apk">{p.downloadApk}</a>
          ) : (
            <button className="btn" disabled>{p.comingSoon}</button>
          )}
          <a href="/work/hajime" className="btn-ghost">{p.caseStudy}</a>
        </div>
      </div>

      <div className="work-stage">
        <KanaScreen />
        <KanjiScreen />
      </div>
    </div>
  );
}
