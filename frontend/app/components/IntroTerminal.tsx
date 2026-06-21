"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AVATAR_SRC } from "../data";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

// Typing speeds (ms per character) and the pause after a segment finishes.
const CMD_MS = 34;
const OUT_MS = 14;
const CMD_PAUSE = 180;
const OUT_PAUSE = 360;

type Seg = { kind: "cmd" | "out"; text: string };

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduce;
}

export default function IntroTerminal() {
  const { lang } = useLang();
  const t = messages[lang].hero.terminal;
  const reduceMotion = usePrefersReducedMotion();

  // Flatten lines into command/output segments typed in order.
  const segs = useMemo<Seg[]>(
    () =>
      t.lines.flatMap((l) => [
        { kind: "cmd" as const, text: l.cmd },
        { kind: "out" as const, text: l.out },
      ]),
    [t.lines],
  );

  const [segIndex, setSegIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [imgOk, setImgOk] = useState(true);

  // Restart the animation whenever the language (and thus the lines) changes.
  useEffect(() => {
    setSegIndex(0);
    setCharCount(0);
  }, [lang]);

  useEffect(() => {
    if (reduceMotion) {
      setSegIndex(segs.length);
      return;
    }
    if (segIndex >= segs.length) return;

    const seg = segs[segIndex];
    if (charCount < seg.text.length) {
      const speed = seg.kind === "cmd" ? CMD_MS : OUT_MS;
      const id = setTimeout(() => setCharCount((c) => c + 1), speed);
      return () => clearTimeout(id);
    }
    const pause = seg.kind === "cmd" ? CMD_PAUSE : OUT_PAUSE;
    const id = setTimeout(() => {
      setSegIndex((i) => i + 1);
      setCharCount(0);
    }, pause);
    return () => clearTimeout(id);
  }, [segIndex, charCount, segs, reduceMotion]);

  const typingDone = segIndex >= segs.length;

  return (
    <div className="code-card intro-term">
      <div className="code-dots">
        <span />
        <span />
        <span />
        <span className="code-title">{t.title}</span>
      </div>

      <div className="term-id">
        <span className="term-avatar">
          <span className="term-avatar-mono" aria-hidden={imgOk}>
            HBP
          </span>
          {imgOk && (
            <Image
              className="term-avatar-img"
              src={AVATAR_SRC}
              alt={t.avatarAlt}
              fill
              sizes="44px"
              onError={() => setImgOk(false)}
            />
          )}
        </span>
        <span className="term-id-meta">
          <span className="term-id-name">{t.name}</span>
          <span className="term-id-status">
            <i className="term-dot" aria-hidden="true" />
            {t.status}
          </span>
        </span>
      </div>

      <pre className="code-pre term-body">
        {segs.map((seg, i) => {
          if (i > segIndex) return null;
          const text = i < segIndex ? seg.text : seg.text.slice(0, charCount);
          const active = !reduceMotion && i === segIndex && !typingDone;
          return (
            <div
              key={i}
              className={seg.kind === "cmd" ? "term-line term-cmd" : "term-line term-out"}
            >
              {seg.kind === "cmd" && <span className="term-prompt">$ </span>}
              {text}
              {active && <span className="code-caret term-caret" />}
            </div>
          );
        })}
        {typingDone && <span className="code-caret" />}
      </pre>
    </div>
  );
}
