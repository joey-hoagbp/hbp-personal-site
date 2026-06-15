"use client";

import { DownloadIcon } from "./icons";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { loc, type TimelineItem } from "../../lib/api";
import type { Lang } from "../../lib/api";

function TLItem({ item, last, lang }: { item: TimelineItem; last: boolean; lang: Lang }) {
  const desc = loc(item.desc, lang);
  return (
    <div className="tl-item">
      <div className="tl-spine">
        <div className="tl-dot" />
        {!last && <div className="tl-line" />}
      </div>
      <div className="tl-body">
        <p className="tl-date">{loc(item.date, lang)}</p>
        <p className="tl-title">{loc(item.title, lang)}</p>
        <p className="tl-org">{loc(item.org, lang)}</p>
        {desc && <p className="tl-desc">{desc}</p>}
      </div>
    </div>
  );
}

export default function CV({
  experience,
  education,
}: {
  experience: TimelineItem[];
  education: TimelineItem[];
}) {
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
              {experience.map((e, i) => (
                <TLItem
                  key={`${loc(e.title, lang)}-${loc(e.date, lang)}`}
                  item={e}
                  last={i === experience.length - 1}
                  lang={lang}
                />
              ))}
            </div>
          </div>
          <div className="reveal reveal-d1">
            <p className="cv-col-ttl">{t.colEducation}</p>
            <div className="timeline">
              {education.map((e, i) => (
                <TLItem
                  key={`${loc(e.title, lang)}-${loc(e.date, lang)}`}
                  item={e}
                  last={i === education.length - 1}
                  lang={lang}
                />
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
