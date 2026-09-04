"use client";

import { useCallback, useEffect, useState } from "react";
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

export default function SiteNav({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const { lang } = useLang();
  const t = messages[lang].nav;
  const hrefFor = (id: string) => (home ? `#${id}` : `/#${id}`);

  // Stable identity: MobileNavSheet's focus-trap effect depends on this. An
  // inline arrow here would change identity on every SiteNav re-render (e.g.
  // pressing a language pill inside the open sheet, since useLang() lives
  // here), tearing the trap down and rebuilding it while the sheet is still
  // visibly open.
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Observe the enclosing <section>, not the id'd element itself: every
    // observed section's id now sits on SectionHeader's inner div (correct
    // for the #anchor jump landing on the title), which is short next to a
    // 600px+ device stage — it exits the mid-viewport band while the section
    // is still on screen, dropping the nav highlight early. closest("section")
    // walks up to the enclosing <section> in every case (Skills, Portfolio,
    // Experience and Contact all route their id through SectionHeader now),
    // and is a harmless no-op if a future section ever puts its id directly
    // on the <section> element instead.
    const idByElement = new Map<Element, string>();
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const section = el.closest("section") ?? el;
      idByElement.set(section, id);
    });
    if (idByElement.size === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target;
        const id = top && idByElement.get(top);
        if (id) setActive(id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    idByElement.forEach((_id, section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className={scrolled ? "nav nav-scrolled" : "nav"}>
        <div className="nav-inner shell">
          <a href={home ? "#hero" : "/#hero"} className="nav-logo" aria-label="phúc"><Wordmark size={24} /></a>

          <div className="nav-right">
            <ul className="nav-links">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a href={hrefFor(l.id)} className={active === l.id ? "nav-link nav-link-active" : "nav-link"}>
                    {t[l.key]}
                  </a>
                </li>
              ))}
            </ul>
            <span className="nav-divider" aria-hidden="true" />
            <LangToggle />
            <ThemeToggle />
            <a href={hrefFor("contact")} className="btn nav-cta">{t.contact}</a>
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
      <MobileNavSheet open={sheetOpen} onClose={closeSheet} home={home} />
    </>
  );
}
