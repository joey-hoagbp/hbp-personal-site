"use client";

import { HERO_STAT_NUMS } from "../data";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

// Static, hand-tuned syntax highlighting — kept as raw HTML so the exact
// indentation/line breaks from the design survive inside <pre>. No user input.
const CODE_HTML = `<span class="c-kw">const</span> <span class="c-fn">developer</span> = {
  <span class="c-prop">name</span>:  <span class="c-str">"Hoàng Bảo Phúc"</span>,
  <span class="c-prop">role</span>:  <span class="c-str">"Software Engineer"</span>,
  <span class="c-prop">city</span>:  <span class="c-str">"Hà Nội"</span>,
  <span class="c-prop">stack</span>: [<span class="c-str">"Java"</span>, <span class="c-str">"C#"</span>,
          <span class="c-str">"React"</span>, <span class="c-str">"MongoDB"</span>],
  <span class="c-prop">open</span>:  <span class="c-bool">true</span>,
};`;

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
              Hoàng
              <br />
              <span className="name-dim">Bảo Phúc.</span>
            </h1>
            <p className="hero-tagline">
              {t.taglineLines[0]}
              <br />
              {t.taglineLines[1]}
            </p>
            <p className="hero-bio">{t.bio}</p>
            <div className="hero-btns">
              <a href="#portfolio" className="btn-primary">
                {t.viewWork}
              </a>
              <a href="#contact" className="btn-ghost">
                {t.getInTouch}
              </a>
            </div>
          </div>

          <div className="hero-right reveal reveal-d2">
            <div className="code-card">
              <div className="code-dots">
                <span />
                <span />
                <span />
              </div>
              <pre
                className="code-pre"
                dangerouslySetInnerHTML={{ __html: CODE_HTML }}
              />
            </div>
            <div className="hero-stats">
              {HERO_STAT_NUMS.map((num, i) => (
                <div key={num} className="stat-card">
                  <div className="stat-num">{num}</div>
                  <div className="stat-lbl">{t.stats[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
