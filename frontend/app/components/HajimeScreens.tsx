"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import DeviceFrame from "./DeviceFrame";

// The two real Hajime app screens previewed wherever the product shows up
// (the homepage Work section and the /work/hajime case study). Kept as one
// source so the mock content — copy, the 68% figure, the kanji stroke paths
// and its numbered marker — can't drift between call sites. Each screen owns
// its own DeviceFrame, so a call site renders exactly the subset it wants by
// importing only the named export(s) it needs — no boolean props.

export function KanaScreen() {
  const { lang } = useLang();
  const d = messages[lang].device;

  return (
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
  );
}

export function KanjiScreen() {
  const { lang } = useLang();
  const d = messages[lang].device;

  return (
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
  );
}
