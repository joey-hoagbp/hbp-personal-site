"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import SectionHeader from "./SectionHeader";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { STACK_ITEMS } from "../data";

/**
 * The Stack index — the one section that carries colour beyond the seal and
 * the one thing on the site that animates on scroll (see globals.css, SKILLS).
 * Each technology owns a pigment, shown at rest as its chip and its hairline,
 * and a one-line gloss on the right-hand rail (dictionary.ts, skills.items).
 *
 * The reveal is two flags, deliberately:
 *   stack-armed  applies the hidden state, and is set only after mount — so
 *                the pre-rendered export ships finished and the section stays
 *                complete with JavaScript disabled.
 *   stack-in     runs the staggered draw-in, once. IntersectionObserver fires
 *                its first callback on observe(), so a section already in view
 *                gets both flags in the same tick and never flashes hidden.
 */
export default function Stack() {
  const { lang } = useLang();
  const t = messages[lang].skills;

  const sectionRef = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`skills shell${armed ? " stack-armed" : ""}${shown ? " stack-in" : ""}`}
    >
      <SectionHeader id="skills" label={t.label} />
      <div className="rule" />
      <ul className="stack-items">
        {STACK_ITEMS.map((item, i) => (
          <li
            key={item.key}
            className={`pig-${item.pigment}`}
            style={{ "--i": i } as CSSProperties}
          >
            <span className="stack-chip" aria-hidden="true" />
            <span className="stack-name">{item.name}</span>
            <span className="stack-desc">{t.items[item.key]}</span>
          </li>
        ))}
      </ul>
      {/* Closes the index the way Experience closes its rows — without it the
          last row hangs open now that there is no second group below it. */}
      <div className="rule" />
    </section>
  );
}
