"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import DeviceFrame from "./DeviceFrame";

// Real screenshots of the Hajime app, previewed wherever the product shows up
// (the homepage Work section and the /work/hajime case study). Captured from
// a release build over adb, with the Android status and nav bars painted out
// so the DeviceFrame reads as the phone. Each screen owns its own
// DeviceFrame, so a call site renders exactly the subset it wants by
// importing only the named export(s) it needs — no boolean props. Which
// screens get a vertical offset is a layout concern of the call site (see
// `.device-strip-row` in globals.css), not something threaded back in here.

function Screenshot({ src, alt }: { src: string; alt: string }) {
  return <img className="device-shot" src={src} alt={alt} width={540} height={1170} loading="lazy" />;
}

// The Learn tab: the lesson path, with finished lessons, the current one
// and Mochi's "start" prompt.
export function LearnScreen() {
  const { lang } = useLang();
  return (
    <DeviceFrame>
      <Screenshot src="/hajime/learn.webp" alt={messages[lang].device.learnAlt} />
    </DeviceFrame>
  );
}

// The Kana tab: the hiragana chart, grouped by row.
export function KanaScreen() {
  const { lang } = useLang();
  return (
    <DeviceFrame>
      <Screenshot src="/hajime/kana.webp" alt={messages[lang].device.kanaAlt} />
    </DeviceFrame>
  );
}

// The "check" half of a teach-then-check lesson, answered correctly.
export function CheckScreen() {
  const { lang } = useLang();
  return (
    <DeviceFrame offset>
      <Screenshot src="/hajime/check.webp" alt={messages[lang].device.checkAlt} />
    </DeviceFrame>
  );
}
