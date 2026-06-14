import { EDUCATION, EXPERIENCE, type TimelineEntry } from "../data";
import { DownloadIcon } from "./icons";

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
  return (
    <section id="cv" className="section-bordered">
      <div className="container">
        <header className="section-hdr reveal">
          <p className="section-label">Hồ Sơ / Resume</p>
          <h2 className="section-title">Experience &amp; Education</h2>
        </header>
        <div className="cv-cols">
          <div className="reveal">
            <p className="cv-col-ttl">Kinh Nghiệm</p>
            <div className="timeline">
              {EXPERIENCE.map((e, i) => (
                <TLItem key={`${e.title}-${e.date}`} item={e} last={i === EXPERIENCE.length - 1} />
              ))}
            </div>
          </div>
          <div className="reveal reveal-d1">
            <p className="cv-col-ttl">Học Vấn</p>
            <div className="timeline">
              {EDUCATION.map((e, i) => (
                <TLItem key={`${e.title}-${e.date}`} item={e} last={i === EDUCATION.length - 1} />
              ))}
            </div>
          </div>
        </div>
        <div className="cv-dl reveal">
          <a href="#" className="btn-ghost">
            <DownloadIcon />
            Tải CV (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
