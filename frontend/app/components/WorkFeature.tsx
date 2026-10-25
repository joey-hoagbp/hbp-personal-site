"use client";

import { CheckScreen, LearnScreen } from "./HajimeScreens";
import FridayStage from "./FridayStage";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { loc, type Project } from "../../lib/api";

function HajimeStage() {
  return (
    <div className="work-stage">
      <LearnScreen />
      <CheckScreen />
    </div>
  );
}

// Each project's visual, keyed by Project.id.
const STAGES: Record<string, () => JSX.Element> = {
  hajime: HajimeStage,
  "one-more-friday": FridayStage,
};

export default function WorkFeature({ project }: { project: Project }) {
  const { lang } = useLang();
  const t = messages[lang];
  const p = t.portfolio;
  const Stage = project.id ? STAGES[project.id] : undefined;

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
        {project.highlights && (
          <dl className="work-notes">
            {project.highlights.map(({ label, body }) => (
              <div key={label.en}>
                <dt className="meta">{loc(label, lang)}</dt>
                <dd>{loc(body, lang)}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="work-actions">
          {project.apkUrl ? (
            <a href={project.apkUrl} className="btn" download="hajime-japanese.apk">{p.downloadApk}</a>
          ) : (
            <button className="btn" disabled>{p.comingSoon}</button>
          )}
        </div>
      </div>

      {Stage && <Stage />}
    </div>
  );
}
