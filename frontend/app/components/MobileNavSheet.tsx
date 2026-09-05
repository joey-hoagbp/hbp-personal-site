"use client";

import { useEffect, useRef } from "react";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import Wordmark from "./Wordmark";
import LangToggle from "./LangToggle";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { id: "skills", key: "skills" },
  { id: "portfolio", key: "work" },
  { id: "experience", key: "experience" },
  { id: "education", key: "education" },
] as const;

export default function MobileNavSheet({
  open, onClose, home = true,
}: { open: boolean; onClose: () => void; home?: boolean }) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const t = messages[lang].nav;
  const hrefFor = (id: string) => (home ? `#${id}` : `/#${id}`);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("button, a")?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !sheetRef.current) return;
      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    // The sheet is CSS-hidden at >=768px (globals.css collapses the bar's
    // links into it below that) but stays mounted; without this, a mouse-only
    // user who resizes past that breakpoint while it's open is left with body
    // scroll locked and a focus trap armed on an invisible dialog, with no
    // visible control to escape it.
    const mql = window.matchMedia("(min-width: 768px)");
    function onViewportChange(e: MediaQueryListEvent | MediaQueryList) {
      if (e.matches) onClose();
    }
    onViewportChange(mql);
    mql.addEventListener("change", onViewportChange);

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mql.removeEventListener("change", onViewportChange);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="sheet" ref={sheetRef} role="dialog" aria-modal="true" aria-label={t.menu}>
      <div className="sheet-head">
        <Wordmark size={21} />
        <button type="button" className="sheet-close" onClick={onClose} aria-label={t.close}>
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      {LINKS.map((l) => (
        <a key={l.id} href={hrefFor(l.id)} className="sheet-link" onClick={onClose}>
          {t[l.key]}
        </a>
      ))}
      <a href={hrefFor("contact")} className="btn sheet-cta" onClick={onClose}>{t.contact}</a>
      <div className="sheet-foot">
        <LangToggle layout="sheet" />
        <ThemeToggle />
      </div>
    </div>
  );
}
