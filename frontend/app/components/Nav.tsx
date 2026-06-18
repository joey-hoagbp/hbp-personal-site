"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n/LanguageProvider";
import { messages, LANG_LABELS, type Lang } from "../i18n/dictionary";

const LANGS: Lang[] = ["vi", "en"];

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </svg>
  );
}

const SECTION_IDS = ["skills", "portfolio", "cv", "contact"] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { lang, setLang } = useLang();
  const nav = messages[lang].nav;
  const switchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (switchRef.current && !switchRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <nav className={scrolled ? "nav-scrolled" : ""}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          HBP<span className="logo-dot">.</span>
        </a>
        <div className="nav-right">
          <ul className="nav-links">
            <li>
              <a href="#skills" className={active === "skills" ? "active" : ""}>
                {nav.skills}
              </a>
            </li>
            <li>
              <a href="#portfolio" className={active === "portfolio" ? "active" : ""}>
                {nav.work}
              </a>
            </li>
            <li>
              <a href="#cv" className={active === "cv" ? "active" : ""}>
                {nav.cv}
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-cta">
                {nav.contact}
              </a>
            </li>
          </ul>
          <div className="lang-switch" ref={switchRef}>
            <button
              type="button"
              className="lang-btn"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-label="Change language"
              onClick={() => setOpen((o) => !o)}
            >
              <GlobeIcon />
              {lang.toUpperCase()}
              <span className="lang-caret" aria-hidden="true">▾</span>
            </button>
            {open && (
              <ul className="lang-menu" role="listbox">
                {LANGS.map((l) => (
                  <li key={l} role="option" aria-selected={l === lang}>
                    <button
                      type="button"
                      className={l === lang ? "lang-opt lang-opt-active" : "lang-opt"}
                      onClick={() => {
                        setLang(l);
                        setOpen(false);
                      }}
                    >
                      {LANG_LABELS[l]}
                      {l === lang && (
                        <span className="lang-check" aria-hidden="true">
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
