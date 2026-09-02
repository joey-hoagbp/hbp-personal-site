"use client";

import { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import Wordmark from "./Wordmark";
import LangToggle from "./LangToggle";
import ThemeToggle from "./ThemeToggle";
import MobileNavSheet from "./MobileNavSheet";

const SECTION_IDS = ["skills", "portfolio", "experience", "contact"] as const;
const LINKS = [
  { id: "skills", key: "skills" },
  { id: "portfolio", key: "work" },
  { id: "experience", key: "experience" },
] as const;

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const { lang } = useLang();
  const t = messages[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <>
      <nav className={scrolled ? "nav nav-scrolled" : "nav"}>
        <div className="nav-inner shell">
          <a href="#hero" className="nav-logo" aria-label="phúc"><Wordmark size={24} /></a>

          <div className="nav-right">
            <ul className="nav-links">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className={active === l.id ? "nav-link nav-link-active" : "nav-link"}>
                    {t[l.key]}
                  </a>
                </li>
              ))}
            </ul>
            <span className="nav-divider" aria-hidden="true" />
            <LangToggle />
            <ThemeToggle />
            <a href="#contact" className="btn nav-cta">{t.contact}</a>
            <button
              type="button"
              className="nav-menu"
              aria-label={t.menu}
              aria-expanded={sheetOpen}
              onClick={() => setSheetOpen(true)}
            >
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h11" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <MobileNavSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  );
}
