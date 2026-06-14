"use client";

import { DownloadIcon } from "./icons";
import { useLang } from "../i18n/LanguageProvider";
import { messages, type TimelineEntry } from "../i18n/dictionary";

function TLItem({ item, last }: { item: TimelineEntry; last: boolean }) {
  return (
    <div className="tl-item">
      <div className="tl-spine">
        <div className="tl-dot" />
        {!last && <div className="tl-line" />}
      </div>
      <div className="tl-body">
        <p className="tl-date">{item.date}</p>
        <p className="tl-title">{item.title}</p>
        <p className="tl-org">{item.org}</p>
        <p className="tl-desc">{item.desc}</p>
      </div>
    </div>
  );
}

export default function CV() {
  const { lang } = useLang();
  const t = messages[lang].cv;

  return (
    <section id="cv" className="section-bordered">
      <div className="container">
        <header className="section-hdr reveal">
          <p className="section-label">{t.label}</p>
          <h2 className="section-title">{t.title}</h2>
        </header>
        <div className="cv-cols">
          <div className="reveal">
            <p className="cv-col-ttl">{t.colExperience}</p>
            <div className="timeline">
              {t.experience.map((e, i) => (
                <TLItem key={`${e.title}-${e.date}`} item={e} last={i === t.experience.length - 1} />
              ))}
            </div>
          </div>
          <div className="reveal reveal-d1">
            <p className="cv-col-ttl">{t.colEducation}</p>
            <div className="timeline">
              {t.education.map((e, i) => (
                <TLItem key={`${e.title}-${e.date}`} item={e} last={i === t.education.length - 1} />
              ))}
            </div>
          </div>
        </div>
        <div className="cv-dl reveal">
          <a href="#" className="btn-ghost">
            <DownloadIcon />
            {t.downloadCv}
          </a>
        </div>
      </div>
    </section>
  );
}
