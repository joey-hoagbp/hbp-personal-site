import { HERO_STATS } from "../data";

// Static, hand-tuned syntax highlighting — kept as raw HTML so the exact
// indentation/line breaks from the design survive inside <pre>. No user input.
const CODE_HTML = `<span class="c-kw">const</span> <span class="c-fn">developer</span> = {
  <span class="c-prop">name</span>:  <span class="c-str">"Hoàng Bảo Phúc"</span>,
  <span class="c-prop">role</span>:  <span class="c-str">"Software Engineer"</span>,
  <span class="c-prop">city</span>:  <span class="c-str">"Hồ Chí Minh"</span>,
  <span class="c-prop">stack</span>: [<span class="c-str">"Flutter"</span>, <span class="c-str">"React"</span>,
          <span class="c-str">"Node.js"</span>, <span class="c-str">"Python"</span>],
  <span class="c-prop">open</span>:  <span class="c-bool">true</span>,
};`;

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-glow-orb" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-left reveal">
            <p className="hero-eyebrow">
              <span className="eyebrow-dash" />
              Software Engineer · Ho Chi Minh City
            </p>
            <h1 className="hero-name">
              Hoàng
              <br />
              <span className="name-dim">Bảo Phúc.</span>
            </h1>
            <p className="hero-tagline">
              Building apps people
              <br />
              love to use.
            </p>
            <p className="hero-bio">
              Kỹ sư phần mềm với niềm đam mê xây dựng sản phẩm mobile &amp; web.
              Tập trung vào clean code, trải nghiệm người dùng và hiệu suất.
            </p>
            <div className="hero-btns">
              <a href="#portfolio" className="btn-primary">
                Xem sản phẩm
              </a>
              <a href="#contact" className="btn-ghost">
                Liên hệ ngay
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
              {HERO_STATS.map(({ num, lbl }) => (
                <div key={lbl} className="stat-card">
                  <div className="stat-num">{num}</div>
                  <div className="stat-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
