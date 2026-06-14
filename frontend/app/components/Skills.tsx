import { SKILL_GROUPS } from "../data";

export default function Skills() {
  return (
    <section id="skills" className="section-bordered">
      <div className="container">
        <header className="section-hdr reveal">
          <p className="section-label">Kỹ Năng / Skills</p>
          <h2 className="section-title">Tech Stack</h2>
          <p className="section-sub">Những công nghệ tôi sử dụng hàng ngày.</p>
        </header>
        <div className="skills-grid">
          {SKILL_GROUPS.map((g, i) => (
            <div key={g.label} className={`skill-group reveal reveal-d${(i % 3) + 1}`}>
              <p className="sg-label">{g.label}</p>
              <div className="sg-tags">
                {g.items.map((s) => (
                  <span key={s} className="sg-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
