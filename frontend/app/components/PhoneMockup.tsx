const GRID_CHARS: [string, string][] = [
  ["い", "i"],
  ["う", "u"],
  ["え", "e"],
  ["お", "o"],
];

export default function PhoneMockup() {
  return (
    <div className="phone-shell tilt">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="ps-topbar">
          <span className="ps-appname">HAJIME</span>
          <span className="ps-streak">7 ngày</span>
        </div>
        <div className="ps-flashcard">
          <span className="ps-char">あ</span>
          <span className="ps-roman">a</span>
          <span className="ps-vn">chữ &ldquo;a&rdquo; trong hiragana</span>
        </div>
        <div className="ps-progress">
          <div className="ps-prog-row">
            <span className="ps-prog-lbl">Hiragana</span>
            <span className="ps-prog-pct">60%</span>
          </div>
          <div className="ps-prog-bg">
            <div className="ps-prog-fill" style={{ width: "60%" }} />
          </div>
        </div>
        <div className="ps-chargrid">
          {GRID_CHARS.map(([ch, rom]) => (
            <div key={ch} className="ps-charcell">
              <span className="ps-cjp">{ch}</span>
              <span className="ps-crom">{rom}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
