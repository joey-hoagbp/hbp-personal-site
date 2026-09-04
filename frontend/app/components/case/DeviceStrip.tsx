"use client";

import { useLang } from "../../i18n/LanguageProvider";
import { messages } from "../../i18n/dictionary";
import DeviceFrame from "../DeviceFrame";

// Same real app screens shown on the homepage's Work section — the case
// study isn't a separate mockup, it's the same product. Reuses the
// device-screen CSS (`.ds-*`) already in globals.css; see the DeviceFrame
// interface note in the task brief.
export default function DeviceStrip() {
  const { lang } = useLang();
  const d = messages[lang].device;

  return (
    <section className="device-strip">
      <div className="device-strip-row">
        <DeviceFrame>
          <div className="ds-top">
            <span className="ds-app">HAJIME</span>
            <span className="ds-streak">{d.streak}</span>
          </div>
          <div className="ds-card">
            <span className="ds-char">あ</span>
            <span className="ds-roman">a</span>
            <span className="ds-note">{d.charNote}</span>
          </div>
          <div className="ds-progress">
            <div className="ds-progress-row"><span>Hiragana</span><span className="ds-pct">68%</span></div>
            <div className="ds-progress-bg"><span style={{ width: "68%" }} /></div>
          </div>
          <div className="ds-actions">
            <span className="ds-action">{d.hard}</span>
            <span className="ds-action ds-action-primary">{d.got}</span>
          </div>
        </DeviceFrame>

        <DeviceFrame offset>
          <span className="ds-app">{d.strokeLabel}</span>
          <div className="ds-kanji">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <g className="ds-kanji-grid" strokeWidth="0.6" strokeDasharray="3 3"><path d="M50 6 V94 M6 50 H94" /></g>
              <g className="ds-kanji-strokes" fill="none" strokeWidth="6.5" strokeLinecap="square">
                <path d="M28 16 V84" /><path d="M28 16 H72" /><path d="M72 16 V84" /><path d="M28 84 H72" /><path d="M28 50 H72" />
              </g>
              <circle cx="28" cy="16" r="5.5" fill="var(--seal)" />
              <text x="28" y="18.6" className="ds-kanji-num" fontFamily="monospace" fontSize="7" textAnchor="middle">1</text>
            </svg>
          </div>
          <div className="ds-gloss">
            <span className="ds-gloss-title">日 · {d.kanjiReading}</span>
            <span className="ds-gloss-body">{d.kanjiGloss}</span>
          </div>
        </DeviceFrame>
      </div>
    </section>
  );
}
