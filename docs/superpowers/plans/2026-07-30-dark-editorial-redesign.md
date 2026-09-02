# Dark Editorial Redesign Implementation Plan

> **SUPERSEDED (2026-09-02).** Approved but never implemented — the shipped
> `globals.css` remained the mint + lime theme. Replaced by
> `specs/2026-09-02-an-redesign-spec.md` (direction "Ấn"). Kept for history only;
> do not implement from this file.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle and restructure the hbp-personal-site frontend onto the dark editorial design imported from the Claude Design project (`Personal Site.html`), preserving bilingual VI/EN, the contact-form backend flow, and all real content.

**Architecture:** Single-page Next.js 14 App Router site. `app/page.tsx` assembles section components from `app/components/`; all styling lives in one global stylesheet, `app/globals.css`, using plain class names (no CSS modules). This plan migrates that stylesheet section by section: Task 1 installs the new token/base/shell layer and moves every not-yet-ported rule into a clearly-marked `LEGACY` block at the bottom of the file; each later task adds its section's new CSS and deletes the corresponding legacy rules. The site is never left unstyled between tasks.

**Tech Stack:** Next.js 14 (App Router, `output: "export"`), React 18, TypeScript, Lenis (smooth scroll), Google Fonts (Newsreader + Work Sans).

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-07-30-dark-editorial-redesign-design.md`. Read it before Task 1.
- **Branch:** work directly on `main`. Do not create feature branches.
- **Commit trailer:** every commit message ends with `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- **Commit style:** Conventional Commits (`feat(scope): …`, `fix`, `refactor`, `style`, `docs`, `chore`).
- **Verification gate for every task:** `npm run lint` then `npm run build`, both from `frontend/`. There is no test harness in this project — these two commands plus the browser checks in the final task are the gate. Never commit with either failing.
- **Design tokens — exact values, do not adjust:**
  `--bg:#0d0d12` `--bg2:#131319` `--ink:#f2efe9` `--ink-dim:#a9a5b3`
  `--line:rgba(242,239,233,.14)` `--accent:#8f88ff` `--accent-dim:#6c63ff`
- **Fonts:** `--serif: 'Newsreader', Georgia, serif` and `--font: 'Work Sans', system-ui, sans-serif`. **`--mono` is retired** — no `var(--mono)` may remain anywhere in `globals.css` when the plan completes. Micro-labels use tracked uppercase Work Sans instead.
- **No invented content.** Every user-visible string comes from `app/i18n/dictionary.ts` or `app/data.ts`. The design file's placeholder content (NihonGo, "Company Name", `hello@baophuc.dev`, 40k downloads, 4.8 rating, 68% retention, "Ho Chi Minh City") is **not** adopted. The real city is **Hà Nội**.
- **Bilingual:** any new string must be added to **both** the `vi` and `en` objects in `dictionary.ts`, and to the `Messages` type. Vietnamese is the default locale.
- **Never touch:** `lib/api.ts`, `app/i18n/LanguageProvider.tsx`, `app/components/icons.tsx`, `app/components/techIcons.tsx`, or anything under `backend/`.
- **Reduced motion:** every animation or transform-based reveal added must have a `@media (prefers-reduced-motion: reduce)` counterpart that leaves content visible and static.

---

## File Structure

**Created**
| File | Responsibility |
|---|---|
| `app/components/DotNav.tsx` | Fixed right-edge dot navigation; anchor-based so Lenis handles the scroll |
| `app/components/Story.tsx` | New "About" section — portrait + dropcap copy + meta strip |

**Deleted**
| File | Reason |
|---|---|
| `app/components/PointerEffects.tsx` | Magnetic + tilt belong to the old visual language |
| `app/components/Parallax.tsx` | Same |
| `app/components/AvatarCard.tsx` | Folded into `Story.tsx` |
| `app/components/Currently.tsx` | Content moves into the story meta strip |
| `app/components/CountUp.tsx` | Already dead — nothing imports it |

**Modified**
| File | Change |
|---|---|
| `app/layout.tsx` | Font links, `themeColor` |
| `app/page.tsx` | Section order, dropped/added components |
| `app/globals.css` | Full migration to the new design system |
| `app/i18n/dictionary.ts` | New `about`, `skills.rows`, `footer.city`, `story` keys; `currently` key removed |
| `app/data.ts` | `CURRENTLY` comment updated to reflect its new home |
| `app/components/Nav.tsx` | Editorial mark + tracked links |
| `app/components/Hero.tsx` | Editorial hero |
| `app/components/Skills.tsx` | Numbered rows |
| `app/components/Work.tsx` | Featured band + minimal rows |
| `app/components/PhoneMockup.tsx` | 290×590 device |
| `app/components/CV.tsx` | Bordered timelines |
| `app/components/Contact.tsx` | Editorial headline + restyled form |
| `app/components/Footer.tsx` | Copy + city row |

**Unchanged (confirmed — no edit needed)**
`app/components/ScrollProgress.tsx` and `app/components/ScrollReveal.tsx`: both are restyled purely through CSS. `ScrollReveal` already applies the class `visible` (not the design file's `in`) and already handles `prefers-reduced-motion`; `ScrollProgress` already uses `transform: scaleX()`, which is better than the design file's `width` animation. `app/components/SmoothScroll.tsx`: already routes every `a[href^="#"]` click through `lenis.scrollTo`, which is why `DotNav` uses anchors rather than buttons.

---

### Task 1: Foundations — tokens, fonts, page shell

Installs the design system and the persistent chrome (nav, dot nav, progress bar, footer), removes the dead components, and quarantines all not-yet-ported CSS.

**Files:**
- Modify: `frontend/app/layout.tsx`
- Modify: `frontend/app/globals.css`
- Modify: `frontend/app/page.tsx`
- Modify: `frontend/app/i18n/dictionary.ts`
- Modify: `frontend/app/components/Nav.tsx`
- Modify: `frontend/app/components/Footer.tsx`
- Create: `frontend/app/components/DotNav.tsx`
- Delete: `frontend/app/components/PointerEffects.tsx`, `frontend/app/components/Parallax.tsx`, `frontend/app/components/CountUp.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: the CSS custom properties listed in Global Constraints; utility classes `.container`, `.section-label`, `.reveal` / `.reveal-d1..d4`; the `LEGACY` marker block in `globals.css` that Tasks 2–7 delete from. `dictionary.ts` gains `footer.city: string`.

- [ ] **Step 1: Swap the fonts and theme colour in `layout.tsx`**

Replace the Space Grotesk / Space Mono `<link>` (lines 33–36) with:

```tsx
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=Work+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
```

And change `themeColor` in the `viewport` export from `"#f4f6f3"` to `"#0d0d12"`.

Leave `<html lang="vi">`, the `preconnect` links, the `<noscript>` block, `SmoothScroll` and `LanguageProvider` exactly as they are.

- [ ] **Step 2: Replace the top of `globals.css` with the new design system**

Replace everything from the file's opening comment down to and including the `.section-bordered` rule (currently lines 1–52) with:

```css
/* ============================================================
   Personal site — Dark editorial.
   Imported from the Claude Design project `Personal Site.html`.
   Single committed theme: no [data-theme] switching.
   ============================================================ */

/* ── DESIGN TOKENS ─────────────────────────────────── */
:root {
  --bg:        #0d0d12;
  --bg2:       #131319;
  --ink:       #f2efe9;
  --ink-dim:   #a9a5b3;
  --line:      rgba(242, 239, 233, 0.14);
  --accent:    #8f88ff;
  --accent-dim:#6c63ff;
  --serif:     'Newsreader', Georgia, serif;
  --font:      'Work Sans', system-ui, sans-serif;
  --max-w:     1280px;
  --pad:       56px;
  --gap:       160px;
}

/* ── RESET & BASE ───────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; scroll-padding-top: 96px; }
body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font);
  font-weight: 300;
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
::selection { background: var(--accent-dim); color: #fff; }

/* ── LENIS (inertial smooth scroll) ─────────────────── */
/* Lenis drives scrolling from JS; let it own the scroll position so its
   easing doesn't fight the native `scroll-behavior: smooth` above. */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
.lenis.lenis-smooth iframe { pointer-events: none; }

/* ── LAYOUT PRIMITIVES ──────────────────────────────── */
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 var(--pad); }
main > section { position: relative; padding: var(--gap) 0; }
.section-bordered { border-top: 1px solid var(--line); }
.section-label {
  font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 24px;
}

/* ── SCROLL REVEAL ──────────────────────────────────── */
/* The design's signature easing — a long, calm settle. */
.reveal {
  opacity: 0; transform: translateY(36px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible { opacity: 1; transform: none; }
.reveal-d1 { transition-delay: 0.1s; }
.reveal-d2 { transition-delay: 0.2s; }
.reveal-d3 { transition-delay: 0.3s; }
.reveal-d4 { transition-delay: 0.4s; }

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  html { scroll-behavior: auto; }
}

/* ── SCROLL PROGRESS ────────────────────────────────── */
.scroll-progress {
  position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 100;
  background: var(--accent);
  transform: scaleX(0); transform-origin: 0 50%;
  will-change: transform;
}

/* ── NAV ────────────────────────────────────────────── */
nav.top { position: fixed; top: 0; left: 0; right: 0; z-index: 50; transition: background 0.3s, border-color 0.3s; }
nav.top.nav-scrolled {
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: blur(18px) saturate(140%);
  border-bottom: 1px solid var(--line);
}
.nav-inner {
  max-width: var(--max-w); margin: 0 auto; padding: 26px var(--pad);
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
}
.nav-mark {
  font-family: var(--serif); font-style: italic; font-size: 19px;
  letter-spacing: 0.02em; color: var(--ink); text-decoration: none;
}
.nav-right { display: flex; align-items: center; gap: 36px; }
.nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
.nav-links a {
  position: relative; font-size: 12px; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--ink-dim); text-decoration: none;
  transition: color 0.3s;
}
.nav-links a::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -6px; height: 1px;
  background: var(--accent); transform: scaleX(0); transform-origin: left;
  transition: transform 0.3s;
}
.nav-links a:hover, .nav-links a.active { color: var(--ink); }
.nav-links a:hover::after, .nav-links a.active::after { transform: scaleX(1); }

/* ── DOT NAV ────────────────────────────────────────── */
.dotnav {
  position: fixed; right: 32px; top: 50%; transform: translateY(-50%);
  display: flex; flex-direction: column; gap: 16px; z-index: 50;
}
.dotnav a {
  width: 7px; height: 7px; border-radius: 50%; background: var(--line);
  display: block; border: none; padding: 0;
  transition: background 0.3s, transform 0.3s;
}
.dotnav a:hover { background: var(--ink-dim); }
.dotnav a.active { background: var(--accent); transform: scale(1.6); }

@media (prefers-reduced-motion: reduce) {
  .dotnav a { transition: none; }
}

/* ── FOOTER ─────────────────────────────────────────── */
footer { border-top: 1px solid var(--line); padding: 40px 0; }
.footer-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.footer-copy, .footer-city {
  font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-dim);
}
.footer-top {
  width: 38px; height: 38px; border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent; border: 1px solid var(--line); color: var(--ink-dim);
  cursor: pointer; transition: color 0.3s, border-color 0.3s;
}
.footer-top svg { width: 15px; height: 15px; }
.footer-top:hover { color: var(--accent); border-color: var(--accent); }

/* ── SCROLLBAR ──────────────────────────────────────── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--line); border-radius: 2px; }

/* ── LANGUAGE SWITCHER ──────────────────────────────── */
.lang-switch { position: relative; }
.lang-btn {
  display: inline-flex; align-items: center; gap: 6px;
  background: transparent; border: 1px solid var(--line);
  color: var(--ink-dim); font-family: var(--font);
  font-size: 11px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 7px 13px; border-radius: 100px; cursor: pointer;
  transition: color 0.3s, border-color 0.3s;
}
.lang-btn:hover { color: var(--ink); border-color: var(--ink-dim); }
.lang-btn svg { width: 14px; height: 14px; }
.lang-caret { font-size: 9px; line-height: 1; }
.lang-menu {
  position: absolute; top: calc(100% + 10px); right: 0;
  min-width: 170px; list-style: none; margin: 0; padding: 6px;
  background: var(--bg2); border: 1px solid var(--line);
  border-radius: 10px; box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5);
  z-index: 110;
}
.lang-opt {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  width: 100%; background: transparent; border: none;
  color: var(--ink-dim); font-family: var(--font); font-size: 14px; font-weight: 300;
  text-align: left; padding: 9px 12px; border-radius: 7px; cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.lang-opt:hover { background: rgba(242, 239, 233, 0.06); color: var(--ink); }
.lang-opt-active { color: var(--ink); }
.lang-check { color: var(--accent); font-size: 13px; }

/* ── SHELL RESPONSIVE ───────────────────────────────── */
@media (max-width: 860px) {
  :root { --pad: 24px; --gap: 110px; }
  .nav-inner { padding: 20px var(--pad); }
  .nav-right { gap: 20px; }
  .dotnav { display: none; }
  .footer-row { flex-direction: column; align-items: flex-start; gap: 12px; }
}
@media (max-width: 600px) {
  .nav-links { display: none; }
}

/* ============================================================
   LEGACY — rules from the mint/lime design, still consumed by
   components not yet ported. Each redesign task deletes the
   block belonging to the section it ports. This marker and
   everything below it must be gone when the plan completes.
   ============================================================ */
```

Everything that was previously below line 52 stays in the file, unchanged, underneath that `LEGACY` marker. Do not delete it in this task — Hero, Story, Skills, Work, CV and Contact still depend on it.

Two rules must be **removed from the legacy block now**, because Task 1 replaces them and leaving duplicates would let the old ones win on specificity: the old `nav`/`.nav-inner`/`.nav-logo`/`.nav-links`/`.nav-cta` block (old lines 54–76), the old `footer`/`.footer-row`/`.footer-copy`/`.footer-nav` block (old lines 457–463), the old `.scroll-progress` rule (old lines 483–488), the old `.reveal` block (old lines 465–476), the old `.section-label` rule (old lines 213–216), the old `.container`/`.section-bordered` rules, the old `::-webkit-scrollbar` block (old lines 647–650), the old `.nav-links`/`.logo-dot` polish block (old lines 502–513), and the entire old `/* ── LANGUAGE SWITCHER ── */` block (old lines 672–702).

- [ ] **Step 3: Create `DotNav.tsx`**

Anchors, not buttons — `SmoothScroll.tsx` intercepts every `a[href^="#"]` click and routes it through `lenis.scrollTo` with the nav offset, so anchors get eased scrolling and correct nav clearance for free.

```tsx
"use client";

import { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

/** Section ids in page order — must match the `id` on each <section>. */
const SECTION_IDS = ["hero", "story", "skills", "portfolio", "cv", "contact"] as const;

/**
 * Fixed dot navigation down the right edge. Each dot is an anchor so
 * SmoothScroll's delegated handler eases the jump through Lenis; the active
 * dot tracks whichever section currently occupies the middle of the viewport.
 * Hidden below 860px by CSS.
 */
export default function DotNav() {
  const [active, setActive] = useState<string>("hero");
  const { lang } = useLang();
  const nav = messages[lang].nav;

  const labels: Record<string, string> = {
    hero: nav.home,
    story: nav.about,
    skills: nav.skills,
    portfolio: nav.work,
    cv: nav.cv,
    contact: nav.contact,
  };

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
    <nav className="dotnav" aria-label="Section navigation">
      {SECTION_IDS.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={active === id ? "active" : ""}
          aria-label={labels[id]}
          aria-current={active === id ? "true" : undefined}
        />
      ))}
    </nav>
  );
}
```

- [ ] **Step 4: Add the new dictionary keys**

In `app/i18n/dictionary.ts`, extend the `Messages` type's `nav` and `footer` members:

```ts
  nav: { home: string; about: string; skills: string; work: string; cv: string; contact: string };
```

```ts
  footer: { copy: string; city: string };
```

Then fill both locales. In `vi`:

```ts
    nav: { home: "Trang chủ", about: "Giới thiệu", skills: "Kỹ năng", work: "Sản phẩm", cv: "CV", contact: "Liên hệ" },
```
```ts
    footer: { copy: "© 2026 Hoàng Bảo Phúc", city: "Hà Nội, Việt Nam" },
```

In `en`:

```ts
    nav: { home: "Home", about: "About", skills: "Skills", work: "Work", cv: "CV", contact: "Contact" },
```
```ts
    footer: { copy: "© 2026 Hoàng Bảo Phúc", city: "Hà Nội, Vietnam" },
```

Leave every other key alone for now — later tasks add `about` and `skills.rows`.

- [ ] **Step 5: Restyle `Nav.tsx`**

Keep every existing hook (`scrolled`, `open`, `active`, the scroll-spy effect, the outside-click and Escape handlers, `switchRef`) exactly as written. Change only the markup: add `top` to the `<nav>` class, swap the logo for the serif mark, and drop the `nav-cta` treatment so Contact is an ordinary tracked link.

Update `SECTION_IDS` (line 19) to include the new story section:

```tsx
const SECTION_IDS = ["story", "skills", "portfolio", "cv", "contact"] as const;
```

Replace the returned JSX's opening `<nav>` and `.nav-logo` with:

```tsx
    <nav className={scrolled ? "top nav-scrolled" : "top"}>
      <div className="nav-inner">
        <a href="#hero" className="nav-mark">
          Bảo Phúc
        </a>
```

And replace the `<ul className="nav-links">` list items with:

```tsx
          <ul className="nav-links">
            <li>
              <a href="#story" className={active === "story" ? "active" : ""}>
                {nav.about}
              </a>
            </li>
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
              <a href="#contact" className={active === "contact" ? "active" : ""}>
                {nav.contact}
              </a>
            </li>
          </ul>
```

Leave the `lang-switch` block below it untouched.

- [ ] **Step 6: Restyle `Footer.tsx`**

Add the city span between the copy line and the back-to-top button:

```tsx
        <div className="footer-row">
          <span className="footer-copy">{t.copy}</span>
          <span className="footer-city">{t.city}</span>
          <button
            type="button"
            className="footer-top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
```

Everything else in the file stays as it is.

- [ ] **Step 7: Rewire `page.tsx` and delete the dead components**

Replace `app/page.tsx` with:

```tsx
import Nav from "./components/Nav";
import DotNav from "./components/DotNav";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Work from "./components/Work";
import CV from "./components/CV";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import ScrollProgress from "./components/ScrollProgress";
import { fetchProfile } from "../lib/api";
import { DEFAULT_PROFILE, PROJECTS } from "./data";

export default async function Home() {
  const profile = await fetchProfile().catch(() => DEFAULT_PROFILE);

  return (
    <>
      <ScrollProgress />
      <ScrollReveal />
      <Nav />
      <DotNav />
      <main>
        <Hero />
        <Skills groups={profile.techStacks} />
        <Work projects={PROJECTS} />
        <CV experience={profile.experiences} education={profile.education} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

`Story` is added to this file in Task 3, once the component exists.

Then delete the three now-unreferenced components:

```bash
cd frontend
rm app/components/PointerEffects.tsx app/components/Parallax.tsx app/components/CountUp.tsx
```

`Currently.tsx` and `AvatarCard.tsx` are **not** deleted yet — `Currently` is no longer rendered but `AvatarCard` is still imported by `Hero.tsx`; both go in Task 3 when `Story` absorbs them.

- [ ] **Step 8: Remove the orphaned pointer-effect CSS**

`.magnetic` and `.tilt` no longer have a driver. Delete these from the legacy block: the `/* Magnetic button + 3D tilt */` rules (old lines 491–498) and the `.magnetic, .tilt` reduced-motion line, plus the `[data-parallax]` rule (old line 479). Leave `.work-visual { perspective: 900px; }` for now — Task 5 removes it with the rest of the work CSS.

The `tilt` class name still appears in `PhoneMockup.tsx` and `AvatarCard.tsx`; that is harmless (an unstyled class) and those files are rewritten in Tasks 5 and 3.

- [ ] **Step 9: Verify**

```bash
cd frontend
npm run lint
npm run build
```

Expected: both succeed. `npm run dev` and load `http://localhost:3000` — the page background is near-black, the nav shows an italic "Bảo Phúc" with tracked uppercase links, the dot nav is visible on the right at desktop width, and the footer shows copy + city. The body sections still carry their old light-theme styling and will look wrong against the dark background — **that is expected at this point** and is fixed by Tasks 2–7.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -F - <<'EOF'
feat(design): dark editorial tokens, fonts and page shell

Install the imported design system: near-black canvas, Newsreader +
Work Sans, periwinkle accent. Restyle nav, footer and progress bar,
add the right-edge dot nav, and drop the magnetic/tilt/parallax
effects that belonged to the old visual language.

Not-yet-ported rules are quarantined under a LEGACY marker in
globals.css and removed section by section in follow-up commits.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
```

---

### Task 2: Hero

**Files:**
- Modify: `frontend/app/components/Hero.tsx`
- Modify: `frontend/app/globals.css`

**Interfaces:**
- Consumes: tokens and `.reveal` utilities from Task 1.
- Produces: nothing later tasks depend on. `AvatarCard` is still imported here at the end of this task; Task 3 removes that import.

- [ ] **Step 1: Add the hero CSS**

Insert immediately above the `LEGACY` marker in `globals.css`:

```css
/* ── HERO ───────────────────────────────────────────── */
#hero {
  min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
  padding-top: 120px; padding-bottom: 120px;
}
.hero-eyebrow {
  display: flex; align-items: center; gap: 12px;
  font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 28px;
}
.hero-eyebrow::before { content: ''; width: 34px; height: 1px; background: var(--accent); flex-shrink: 0; }
.hero-name {
  font-family: var(--serif); font-weight: 400;
  font-size: clamp(56px, 9vw, 140px); line-height: 0.98; letter-spacing: -0.01em;
}
.hero-name em { font-style: italic; color: var(--ink-dim); }
.hero-sub {
  margin-top: 36px; max-width: 640px;
  font-size: clamp(18px, 2vw, 23px); line-height: 1.6;
  color: var(--ink-dim); font-weight: 300;
}
.hero-links { margin-top: 40px; display: flex; gap: 36px; flex-wrap: wrap; }
.hero-links a {
  font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--ink); text-decoration: none;
  border-bottom: 1px solid var(--line); padding-bottom: 5px;
  transition: color 0.3s, border-color 0.3s;
}
.hero-links a:hover { color: var(--accent); border-color: var(--accent); }
.hero-foot { margin-top: 80px; display: flex; gap: 64px; flex-wrap: wrap; }
.hero-foot .n { font-family: var(--serif); font-style: italic; font-size: 34px; color: var(--accent); line-height: 1.1; }
.hero-foot .l {
  font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink-dim); margin-top: 4px;
}
.scrollcue {
  position: absolute; bottom: 48px; left: var(--pad);
  display: flex; align-items: center; gap: 14px;
  font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-dim);
}
.scrollcue .line {
  width: 1px; height: 40px;
  background: linear-gradient(var(--ink-dim), transparent);
  animation: scrollpulse 2s infinite;
}
@keyframes scrollpulse {
  0%   { transform: scaleY(0); transform-origin: top; }
  50%  { transform: scaleY(1); transform-origin: top; }
  51%  { transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

@media (max-width: 860px) {
  .hero-foot { margin-top: 56px; gap: 36px; }
  .scrollcue { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .scrollcue .line { animation: none; transform: scaleY(1); }
}
```

- [ ] **Step 2: Rewrite `Hero.tsx`**

```tsx
"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

export default function Hero() {
  const { lang } = useLang();
  const t = messages[lang].hero;

  return (
    <section id="hero">
      <div className="container">
        <p className="hero-eyebrow reveal">{t.eyebrow}</p>
        <h1 className="hero-name reveal">
          Hoàng Bảo
          <br />
          <em>Phúc.</em>
        </h1>
        <p className="hero-sub reveal reveal-d1">{t.bio}</p>
        <div className="hero-links reveal reveal-d2">
          <a href="#portfolio">{t.viewWork}</a>
          <a href="#contact">{t.getInTouch}</a>
        </div>
        <div className="hero-foot reveal reveal-d3">
          {t.stats.map((s) => (
            <div key={s.label}>
              <div className="n">{s.value}</div>
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="scrollcue" aria-hidden="true">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}
```

Note what this drops: the glow orb, the hero rule, the two-column grid, `AvatarCard` (the portrait moves to the Story section in Task 3), and the `taglineLines` copy — the design's hero pairs the name directly with the bio, and keeping both a tagline and a bio makes the block too heavy. `taglineLines` stays in `dictionary.ts` unused until Task 8 removes it.

- [ ] **Step 3: Delete the legacy hero CSS**

**Delete** from the legacy block: the `/* ── HERO ── */` section (old lines 78–138), the `/* ── CODE CARD ── */` section (old lines 165–184), the HERO polish block (old lines 515–536), the hero lines in the final reduced-motion block (`.hero-name .hero-word`, `.hero-glow-orb, .hero-rule, .eyebrow-dash`, `.hero-rule`, `.eyebrow-dash`), and the `.hero-grid` / `.hero-right` lines in the old `@media (max-width: 960px)` block.

**Keep** for now: the `/* ── BUTTONS ── */` block (old lines 140–163) — `btn-primary` and `btn-ghost` are still used by Work, CV and Contact, and go in Task 7. The `/* ── HERO AVATAR CARD ── */` block (old lines 186–209) — still used by `AvatarCard`, and goes in Task 3.

To be unambiguous, after this step these hero-era selectors must not appear anywhere in `globals.css`: `.hero-glow-orb-wrap`, `.hero-glow-orb`, `orbDrift`, `.hero-rule`, `heroRuleIn`, `.hero-right`, `.hero-avatar-parallax`, `.hero-grid`, `.hero-tagline`, `.hero-bio`, `.hero-btns`, `.hero-stats`, `.hero-stat`, `.hero-word`, `wordIn`, `.eyebrow-dash`, `dashIn`, `.code-card`, `.code-dots`, `.code-pre`, `.c-kw`, `.c-fn`, `.c-prop`, `.c-str`, `.c-bool`, `.code-title`, `.code-caret`, `caretBlink`, `availPulse`.

Note `.hero-eyebrow` **does** survive — Task 1's base layer and Step 1 above both define it fresh; make sure only the new rule remains.

- [ ] **Step 4: Verify**

```bash
cd frontend
npm run lint
npm run build
```

Expected: both succeed. In the browser the hero fills the viewport with a large serif name, italic dimmed "Phúc.", the bio, two underlined links, three italic accent stats, and an animated scroll cue bottom-left.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -F - <<'EOF'
feat(hero): editorial hero with serif display name

Replace the two-column hero (glow orb, avatar card, code card) with the
design's full-height typographic block: eyebrow rule, clamped serif
name, bio, underlined CTAs, italic stat figures and a scroll cue.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
```

---

### Task 3: Story section

**Files:**
- Create: `frontend/app/components/Story.tsx`
- Modify: `frontend/app/page.tsx`
- Modify: `frontend/app/i18n/dictionary.ts`
- Modify: `frontend/app/data.ts`
- Modify: `frontend/app/globals.css`
- Delete: `frontend/app/components/AvatarCard.tsx`, `frontend/app/components/Currently.tsx`

**Interfaces:**
- Consumes: `AVATAR_SRC` and `CURRENTLY` from `app/data.ts`; `loc()` from `lib/api.ts`.
- Produces: `messages[lang].story` with the shape
  `{ label: string; paragraphs: [string, string]; basedInLabel: string; basedIn: string; focusLabel: string; focus: string; currentlyLabel: string; portraitAlt: string }`.

- [ ] **Step 1: Add the `story` dictionary key**

Add to the `Messages` type, after `hero`:

```ts
  story: {
    label: string;
    paragraphs: [string, string];
    basedInLabel: string;
    basedIn: string;
    focusLabel: string;
    focus: string;
    currentlyLabel: string;
    portraitAlt: string;
  };
```

Delete the `currently: { prefix: string };` member from the type and the `currently` object from both locales — the strip is gone.

Add to `vi`, after the `hero` object:

```ts
    story: {
      label: "Giới thiệu",
      paragraphs: [
        "Tôi bắt đầu viết phần mềm để tự sửa những thứ làm mình khó chịu — một ứng dụng học tiếng Nhật khiến việc học giống như bài tập về nhà, một công cụ nội bộ chạy chậm hơn mức cần thiết. Rồi tôi nhận ra mình thích việc sửa ấy hơn gần như mọi thứ khác.",
        "Bây giờ tôi viết backend bằng Java và C#, nhưng thứ tôi quan tâm nhất vẫn là mười phần trăm cuối cùng: cái transition mượt đúng nhịp, cái trạng thái rỗng không trông trống rỗng, dòng chữ đọc lên như do một con người viết ra.",
      ],
      basedInLabel: "Đang ở",
      basedIn: "Hà Nội, Việt Nam",
      focusLabel: "Tập trung",
      focus: "Backend, kỹ thuật sản phẩm",
      currentlyLabel: "Hiện tại",
      portraitAlt: "Ảnh của Hoàng Bảo Phúc",
    },
```

Add to `en`, after the `hero` object:

```ts
    story: {
      label: "About",
      paragraphs: [
        "I started writing software to fix the things that annoyed me — a Japanese-learning app that made studying feel like homework, an internal tool slower than it had any need to be. Then I noticed I liked the fixing more than almost anything else.",
        "These days I write backends in Java and C#, but what I care about most is still the last ten percent: the transition that lands on the right beat, the empty state that doesn't feel empty, the copy that reads like a person wrote it.",
      ],
      basedInLabel: "Based in",
      basedIn: "Hà Nội, Vietnam",
      focusLabel: "Focus",
      focus: "Backend, product engineering",
      currentlyLabel: "Currently",
      portraitAlt: "Photo of Hoàng Bảo Phúc",
    },
```

- [ ] **Step 2: Update the `CURRENTLY` comment in `data.ts`**

Replace the comment on line 19 with:

```ts
// Feeds the "Currently" cell of the story meta strip — a small, human touch.
```

The array itself is unchanged.

- [ ] **Step 3: Add the story CSS**

Insert above the `LEGACY` marker:

```css
/* ── STORY ──────────────────────────────────────────── */
#story { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 80px; align-items: start; }
.story-portrait {
  position: relative; aspect-ratio: 4 / 5; overflow: hidden;
  border: 1px solid var(--line); border-radius: 2px;
  background: linear-gradient(155deg, #1b1a24, var(--bg));
  display: flex; align-items: center; justify-content: center;
}
.story-portrait-img { object-fit: cover; object-position: center top; }
.story-portrait-fallback {
  font-family: var(--serif); font-style: italic; font-size: 52px; color: var(--accent);
}
.frame-corner { position: absolute; width: 18px; height: 18px; border: 1px solid var(--accent); z-index: 1; }
.fc-tl { top: 16px; left: 16px; border-right: none; border-bottom: none; }
.fc-br { bottom: 16px; right: 16px; border-left: none; border-top: none; }
.story-copy p {
  font-family: var(--serif); font-weight: 400;
  font-size: clamp(22px, 2.4vw, 30px); line-height: 1.5; color: var(--ink);
}
.story-copy p + p { margin-top: 28px; }
.story-copy .dropcap {
  float: left; font-size: 88px; line-height: 0.8;
  padding: 8px 12px 0 0; font-style: italic; color: var(--accent);
}
.story-meta {
  grid-column: 2; margin-top: 48px;
  display: flex; gap: 48px; flex-wrap: wrap;
  font-size: 14px; color: var(--ink-dim);
}
.story-meta dt {
  font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink); font-weight: 500; margin-bottom: 6px;
}
.story-meta dd { margin: 0; }
.story-meta .story-now { display: flex; flex-direction: column; gap: 3px; }

@media (max-width: 860px) {
  #story { grid-template-columns: 1fr; gap: 48px; }
  .story-meta { grid-column: 1; gap: 28px; }
  .story-copy .dropcap { font-size: 64px; }
}
```

- [ ] **Step 4: Create `Story.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { AVATAR_SRC, CURRENTLY } from "../data";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { loc } from "../../lib/api";

export default function Story() {
  const { lang } = useLang();
  const t = messages[lang].story;
  const [imgOk, setImgOk] = useState(true);

  const [first, ...rest] = t.paragraphs[0];

  return (
    <section id="story" className="container section-bordered">
      <div className="story-portrait reveal">
        <span className="frame-corner fc-tl" aria-hidden="true" />
        <span className="frame-corner fc-br" aria-hidden="true" />
        {imgOk ? (
          <Image
            className="story-portrait-img"
            src={AVATAR_SRC}
            alt={t.portraitAlt}
            fill
            sizes="(max-width: 860px) 100vw, 440px"
            priority
            onError={() => setImgOk(false)}
          />
        ) : (
          <span className="story-portrait-fallback">HBP</span>
        )}
      </div>

      <div className="story-copy">
        <p className="section-label reveal">{t.label}</p>
        <div className="reveal reveal-d1">
          <p>
            <span className="dropcap">{first}</span>
            {rest.join("")}
          </p>
          <p>{t.paragraphs[1]}</p>
        </div>
      </div>

      <dl className="story-meta reveal reveal-d2">
        <div>
          <dt>{t.basedInLabel}</dt>
          <dd>{t.basedIn}</dd>
        </div>
        <div>
          <dt>{t.focusLabel}</dt>
          <dd>{t.focus}</dd>
        </div>
        <div>
          <dt>{t.currentlyLabel}</dt>
          <dd className="story-now">
            {CURRENTLY.map((item) => (
              <span key={loc(item.text, lang)}>
                <span aria-hidden="true">{item.emoji}</span> {loc(item.text, lang)}
              </span>
            ))}
          </dd>
        </div>
      </dl>
    </section>
  );
}
```

The dropcap splits the first paragraph's first character out with array destructuring, so it works for both locales ("T" in Vietnamese, "I" in English) without hardcoding a letter.

Note the `<section>` carries `container` directly rather than wrapping a child div — the grid is the section, matching the design file's `#story` rule. `main > section` from Task 1 supplies the vertical padding; `.container` supplies the max-width and horizontal padding.

- [ ] **Step 5: Add `Story` to `page.tsx`**

Add the import after `Hero`:

```tsx
import Story from "./components/Story";
```

And render it between `<Hero />` and `<Skills … />`:

```tsx
        <Hero />
        <Story />
        <Skills groups={profile.techStacks} />
```

- [ ] **Step 6: Delete the absorbed components and their CSS**

```bash
cd frontend
rm app/components/AvatarCard.tsx app/components/Currently.tsx
```

From the legacy block delete the `/* ── HERO AVATAR CARD ── */` section (old lines 186–209) and the `/* ── CURRENTLY ── */` section (old lines 223–247) including its `@media (prefers-reduced-motion)` rule for `.currently-dot`.

These selectors must no longer appear anywhere in `globals.css`: `.avatar-frame`, `.avatar-photo`, `.avatar-photo-img`, `.avatar-mono`, `.avatar-caption`, `.avatar-name`, `.avatar-role`, `.currently`, `.currently-inner`, `.currently-dot`, `.currently-prefix`, `.currently-item`, `.currently-sep`.

- [ ] **Step 7: Verify**

```bash
cd frontend
npm run lint
npm run build
```

Expected: both succeed. In the browser, the About section shows the portrait with accent corner brackets on the left, serif dropcap paragraphs on the right, and a three-cell meta strip beneath listing Based in / Focus / Currently, where Currently lists all three items from `CURRENTLY`. Switch to English and confirm the dropcap renders "I" and every string changes.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -F - <<'EOF'
feat(story): add editorial About section

New Story section pairs the portrait (accent corner brackets) with
dropcap serif copy and a Based in / Focus / Currently meta strip.
Absorbs AvatarCard and the Currently strip, whose CURRENTLY data now
feeds the meta strip's third cell.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
```

---

### Task 4: Skills rows

**Files:**
- Modify: `frontend/app/components/Skills.tsx`
- Modify: `frontend/app/i18n/dictionary.ts`
- Modify: `frontend/app/globals.css`

**Interfaces:**
- Consumes: `TechStackGroup[]` from `lib/api.ts` (`{ label: Localized; items: string[] }`), `TECH_ICONS` from `./techIcons`.
- Produces: `messages[lang].skills.rows: string[]` — one description per tech-stack group, zipped **by index**.

- [ ] **Step 1: Add `skills.rows` to the dictionary**

Extend the `Messages` type's `skills` member:

```ts
  skills: {
    label: string;
    title: string;
    sub: string;
    /** One description per techStacks group, matched by index. Extra groups render without one. */
    rows: string[];
  };
```

In `vi`, add to the `skills` object:

```ts
      rows: [
        "Giao diện chạy nhanh và dễ đọc — tôi dựng bằng code chứ không chỉ dừng ở Figma, vì cảm giác của một thao tác chỉ lộ ra khi bạn chạm vào nó thật.",
        "API và mô hình dữ liệu được viết để vẫn đơn giản khi lớn dần. Tôi thà xoá bớt code còn hơn thêm một cách lách.",
        "Những công cụ giữ cho việc chuyển từ máy tôi sang môi trường thật không có gì bất ngờ.",
      ],
```

In `en`:

```ts
      rows: [
        "Interfaces that stay fast and legible — I prototype in code rather than stopping at Figma, because how an interaction feels only shows up once you can touch it.",
        "APIs and data models written to stay simple as they grow. I'd rather delete code than add a workaround.",
        "The tooling that keeps the trip from my machine to a real environment free of surprises.",
      ],
```

- [ ] **Step 2: Add the skills CSS**

Insert above the `LEGACY` marker:

```css
/* ── SKILLS ─────────────────────────────────────────── */
.skill-row {
  display: grid; grid-template-columns: 80px 1fr 1.4fr; gap: 32px;
  padding: 40px 0; border-bottom: 1px solid var(--line); align-items: baseline;
}
.skill-row:first-of-type { border-top: 1px solid var(--line); }
.skill-row .num { font-family: var(--serif); font-style: italic; color: var(--ink-dim); font-size: 18px; }
.skill-row h3 { font-family: var(--serif); font-weight: 400; font-size: clamp(26px, 3vw, 38px); line-height: 1.1; }
.skill-row p { color: var(--ink-dim); font-size: 15px; line-height: 1.6; max-width: 440px; }
.skill-row .tags { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }
.skill-row .tags span {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--ink-dim); border: 1px solid var(--line);
  padding: 5px 11px; border-radius: 20px;
  transition: color 0.3s, border-color 0.3s;
}
.skill-row .tags span:hover { color: var(--ink); border-color: var(--ink-dim); }
.skill-row .tags svg { width: 13px; height: 13px; flex-shrink: 0; color: var(--brand, currentColor); }

@media (max-width: 860px) {
  .skill-row { grid-template-columns: 1fr; gap: 14px; padding: 32px 0; }
}
```

Note the tag icons now take their brand colour at rest rather than only on hover — on the dark canvas the brand marks read as deliberate accents rather than noise.

- [ ] **Step 3: Rewrite `Skills.tsx`**

```tsx
"use client";

import type { CSSProperties } from "react";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { loc, type TechStackGroup } from "../../lib/api";
import { TECH_ICONS } from "./techIcons";

export default function Skills({ groups }: { groups: TechStackGroup[] }) {
  const { lang } = useLang();
  const t = messages[lang].skills;

  return (
    <section id="skills" className="container section-bordered">
      <p className="section-label reveal">{t.label}</p>
      {groups.map((group, i) => (
        <div key={loc(group.label, lang)} className={`skill-row reveal reveal-d${Math.min(i + 1, 4)}`}>
          <div className="num">{String(i + 1).padStart(2, "0")}</div>
          <h3>{loc(group.label, lang)}</h3>
          <div>
            {t.rows[i] && <p>{t.rows[i]}</p>}
            <div className="tags">
              {group.items.map((s) => {
                const tech = TECH_ICONS[s];
                return (
                  <span
                    key={s}
                    style={tech?.color ? ({ "--brand": tech.color } as CSSProperties) : undefined}
                  >
                    {tech && <tech.Icon aria-hidden />}
                    {s}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
```

`t.rows[i] && …` is the guard that makes the by-index zip safe: if the backend ever returns more groups than there are descriptions, the extra rows render with just a headline and tags rather than crashing or showing someone else's description.

The `title` and `sub` keys are no longer rendered — the design's section header is the label alone. They stay in the dictionary until Task 8.

- [ ] **Step 4: Delete the legacy skills CSS**

From the legacy block remove the `/* ── SKILLS ── */` section (old lines 249–271), the `/* TECH STACK ── */` polish block (old lines 538–543), the `/* ── SECTION HEADERS ── */` block (old lines 211–221, but **keep nothing** — `.section-label` was already replaced in Task 1; delete `.section-hdr`, `.section-title`, `.section-sub`), and the `.skills-grid` line from the old `@media (max-width: 960px)` block.

These must no longer appear: `.skills-grid`, `.skill-group`, `.sg-label`, `.sg-tags`, `.sg-tag`, `.sg-tag-icon`, `.section-hdr`, `.section-title`, `.section-sub`.

`.section-title` and `.section-sub` are still referenced by `Work.tsx` and `CV.tsx`, which are rewritten in Tasks 5 and 6. Between this task and those, their headers render unstyled — acceptable, and resolved two tasks later.

- [ ] **Step 5: Verify**

```bash
cd frontend
npm run lint
npm run build
```

Expected: both succeed. In the browser the Skills section is three hairline-separated rows — italic `01`/`02`/`03`, a large serif group name, a description, and outlined uppercase tag pills with coloured brand icons.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -F - <<'EOF'
feat(skills): numbered editorial skill rows

Replace the two-column card grid with the design's hairline-separated
rows: italic serif numeral, serif group headline, a description line
per group (zipped by index, safe when counts differ) and outlined tag
pills that keep the brand tech icons.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
```

---

### Task 5: Featured work band

**Files:**
- Modify: `frontend/app/components/Work.tsx`
- Modify: `frontend/app/components/PhoneMockup.tsx`
- Modify: `frontend/app/globals.css`

**Interfaces:**
- Consumes: `Project[]` from `lib/api.ts`, `messages[lang].portfolio`, `DownloadIcon` from `./icons`.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Add the work CSS**

Insert above the `LEGACY` marker:

```css
/* ── FEATURED WORK ──────────────────────────────────── */
#portfolio {
  border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
  background: linear-gradient(180deg, var(--bg), #161421 55%, var(--bg));
}
.work-inner {
  max-width: var(--max-w); margin: 0 auto; padding: 0 var(--pad);
  display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: center;
}
.work-title {
  font-family: var(--serif); font-style: italic; font-weight: 400;
  font-size: clamp(38px, 5vw, 64px); line-height: 1.05; margin-bottom: 20px;
}
.work-desc { color: var(--ink-dim); font-size: 16px; line-height: 1.75; max-width: 480px; }
.work-chips { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 22px; }
.work-chips span {
  font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--ink-dim); border: 1px solid var(--line); padding: 5px 11px; border-radius: 20px;
}
.work-chips .chip-ac { color: var(--accent); border-color: var(--accent); }
.work-features { list-style: none; margin: 28px 0 0; display: flex; flex-direction: column; gap: 10px; }
.work-features li {
  display: flex; align-items: flex-start; gap: 12px;
  font-size: 15px; line-height: 1.6; color: var(--ink-dim);
}
.work-features li::before {
  content: ''; flex-shrink: 0; margin-top: 8px;
  width: 5px; height: 5px; border-radius: 50%; background: var(--accent);
}
.work-cta { margin-top: 40px; display: flex; gap: 32px; flex-wrap: wrap; }
.work-cta a {
  font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink); text-decoration: none;
  border-bottom: 1px solid var(--line); padding-bottom: 5px;
  transition: color 0.3s, border-color 0.3s;
}
.work-cta a:hover { color: var(--accent); border-color: var(--accent); }

/* Secondary projects — minimal rows in the skill-row idiom. */
.work-more { max-width: var(--max-w); margin: 90px auto 0; padding: 0 var(--pad); }
.work-row {
  display: grid; grid-template-columns: 80px 1fr auto; gap: 32px;
  padding: 32px 0; border-top: 1px solid var(--line); align-items: baseline;
}
.work-row .num { font-family: var(--serif); font-style: italic; color: var(--ink-dim); font-size: 18px; }
.work-row h3 { font-family: var(--serif); font-weight: 400; font-size: clamp(22px, 2.4vw, 30px); margin-bottom: 8px; }
.work-row p { color: var(--ink-dim); font-size: 15px; line-height: 1.6; max-width: 520px; margin-bottom: 14px; }
.work-row .work-chips { margin-bottom: 0; }
.work-row-links { display: flex; gap: 24px; flex-wrap: wrap; }
.work-row-links a {
  font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink-dim); text-decoration: none; border-bottom: 1px solid var(--line);
  padding-bottom: 4px; transition: color 0.3s, border-color 0.3s; white-space: nowrap;
}
.work-row-links a:hover { color: var(--accent); border-color: var(--accent); }

@media (max-width: 860px) {
  .work-inner { grid-template-columns: 1fr; gap: 56px; }
  .work-row { grid-template-columns: 1fr; gap: 12px; }
  .work-more { margin-top: 56px; }
}
```

- [ ] **Step 2: Add the phone CSS**

Insert directly beneath the work CSS:

```css
/* ── PHONE MOCKUP ───────────────────────────────────── */
.phone {
  width: 290px; height: 590px; margin: 0 auto; position: relative;
  background: #000; border: 1px solid #2a2836; border-radius: 42px; padding: 14px;
  box-shadow: 0 60px 120px -40px color-mix(in srgb, var(--accent-dim) 35%, transparent);
}
.phone .notch {
  position: absolute; top: 14px; left: 50%; transform: translateX(-50%);
  width: 90px; height: 22px; background: #000; border-radius: 12px; z-index: 2;
}
.phone .screen {
  width: 100%; height: 100%; border-radius: 30px; overflow: hidden;
  background: linear-gradient(160deg, #1a1830, var(--bg)); padding: 26px 20px;
}
.app-head { display: flex; justify-content: space-between; align-items: center; margin-top: 22px; }
.app-head .app-name { font-family: var(--serif); font-style: italic; font-size: 20px; }
.app-head .streak {
  font-size: 11px; color: var(--accent);
  border: 1px solid var(--accent); padding: 4px 9px; border-radius: 20px;
}
.flashcard {
  margin-top: 34px; text-align: center; padding: 30px 20px; border-radius: 16px;
  background: rgba(242, 239, 233, 0.05); border: 1px solid var(--line);
}
.flashcard .kana { font-family: var(--serif); font-size: 52px; line-height: 1; }
.flashcard .romaji {
  margin-top: 10px; font-size: 12px; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--ink-dim);
}
.flashcard .mean { margin-top: 4px; font-size: 13px; color: var(--ink-dim); }
.progress-track { margin-top: 26px; height: 4px; background: rgba(242, 239, 233, 0.1); border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--accent); }
.progress-lbl {
  margin-top: 10px; display: flex; justify-content: space-between;
  font-size: 10px; letter-spacing: 0.05em; text-transform: uppercase; color: var(--ink-dim);
}
.mini-grid { margin-top: 24px; display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
.mini-grid span { aspect-ratio: 1; border-radius: 3px; background: rgba(242, 239, 233, 0.08); display: block; }
.mini-grid span.on { background: var(--accent); }

@media (max-width: 860px) {
  .phone { transform: scale(0.85); transform-origin: top center; }
}
```

- [ ] **Step 3: Rewrite `PhoneMockup.tsx`**

The design file fills its mini-grid with `Math.random()`, which would produce a hydration mismatch in React and a different image on every render. Use a fixed pattern instead — it also reads as real progress rather than noise.

```tsx
/** Fixed 21-cell review-history pattern — deterministic so SSR and client agree. */
const GRID: boolean[] = [
  true, true, true, false, true, true, true,
  true, false, true, true, true, false, true,
  true, true, true, true, false, true, false,
];

export default function PhoneMockup() {
  return (
    <div className="phone">
      <div className="notch" />
      <div className="screen">
        <div className="app-head">
          <span className="app-name">hajime</span>
          <span className="streak">7 ngày</span>
        </div>
        <div className="flashcard">
          <div className="kana">あ</div>
          <div className="romaji">a</div>
          <div className="mean">hiragana · nguyên âm</div>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: "60%" }} />
        </div>
        <div className="progress-lbl">
          <span>Hiragana</span>
          <span>60%</span>
        </div>
        <div className="mini-grid" aria-hidden="true">
          {GRID.map((on, i) => (
            <span key={i} className={on ? "on" : undefined} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Rewrite `Work.tsx`**

```tsx
"use client";

import PhoneMockup from "./PhoneMockup";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { loc, type Project } from "../../lib/api";

export default function Work({ projects }: { projects: Project[] }) {
  const { lang } = useLang();
  const t = messages[lang].portfolio;
  const [featured, ...rest] = projects;

  if (!featured) return null;

  return (
    <section id="portfolio">
      <div className="work-inner">
        <div className="work-copy">
          <p className="section-label reveal">{t.label}</p>
          <h2 className="work-title reveal reveal-d1">{featured.title}</h2>
          <div className="work-chips reveal reveal-d1">
            {featured.chips.map((chip) => (
              <span key={chip.label} className={chip.accent ? "chip-ac" : undefined}>
                {chip.label}
              </span>
            ))}
          </div>
          <p className="work-desc reveal reveal-d2">{loc(featured.description, lang)}</p>
          <ul className="work-features reveal reveal-d3">
            {featured.features[lang].map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="work-cta reveal reveal-d4">
            {featured.apkUrl && (
              <a href={featured.apkUrl} download="hajime-japanese.apk">
                {t.downloadApk}
              </a>
            )}
            {featured.repoUrl && (
              <a href={featured.repoUrl} target="_blank" rel="noopener noreferrer">
                {t.repo}
              </a>
            )}
            {featured.demoUrl && (
              <a href={featured.demoUrl} target="_blank" rel="noopener noreferrer">
                {t.demo}
              </a>
            )}
          </div>
        </div>
        <div className="reveal reveal-d2">
          <PhoneMockup />
        </div>
      </div>

      {rest.length > 0 && (
        <div className="work-more">
          {rest.map((project, i) => (
            <div key={project.id ?? project.title} className="work-row reveal">
              <div className="num">{String(i + 2).padStart(2, "0")}</div>
              <div>
                <h3>{project.title}</h3>
                <p>{loc(project.description, lang)}</p>
                <div className="work-chips">
                  {project.chips.map((chip) => (
                    <span key={chip.label} className={chip.accent ? "chip-ac" : undefined}>
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="work-row-links">
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    {t.repo}
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    {t.demo}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
```

`DownloadIcon` is no longer imported — the design's CTAs are text links, not icon buttons. `icons.tsx` itself is untouched; `Contact.tsx` still uses `SOCIAL_ICONS` from it, and `CV.tsx` still uses `DownloadIcon` until Task 6.

The `subtitle` field is not rendered — the description carries the section. It remains on the `Project` type for the backend contract.

Note `#portfolio` does **not** get `.container`: the gradient band is full-bleed, and `.work-inner` supplies the max-width. `main > section` supplies the vertical padding.

- [ ] **Step 5: Delete the legacy work CSS**

From the legacy block remove the `/* ── WORK ── */` section (old lines 273–330), the `/* ── PHONE MOCKUP ── */` section (old lines 332–374), the `/* FEATURED WORK ── */` polish block (old lines 545–559), the work lines from the final reduced-motion block (`.work-glow`, `.work-card .work-features li`), the `.work-visual { perspective: 900px; }` line left over from Task 1, and the `.work-grid`/`.work-card.featured`/`.work-visual` lines from the old `@media (max-width: 960px)` block.

These must no longer appear: `.work-grid`, `.work-card`, `.work-info`, `.chip`, `.work-subtitle`, `.work-links`, `.work-visual`, `.work-glow`, `glowDrift`, `featIn`, `.phone-shell`, `.phone-notch`, `.phone-screen`, `.ps-topbar`, `.ps-appname`, `.ps-streak`, `.ps-flashcard`, `.ps-char`, `.ps-roman`, `.ps-vn`, `.ps-progress`, `.ps-prog-row`, `.ps-prog-lbl`, `.ps-prog-pct`, `.ps-prog-bg`, `.ps-prog-fill`, `.ps-chargrid`, `.ps-charcell`, `.ps-cjp`, `.ps-crom`.

Keep `.chip-ac`? No — the new `.work-chips .chip-ac` rule from Step 1 replaces it. Delete the old `.chip-ac` too.

- [ ] **Step 6: Verify**

```bash
cd frontend
npm run lint
npm run build
```

Expected: both succeed. In the browser the Work section is a full-bleed band with a subtle purple-tinted gradient: italic serif "Hajime" with chips, description and bulleted features on the left, the 290×590 phone with the flashcard and review grid on the right, and the two placeholder projects as numbered rows below. Reload several times and confirm the mini-grid pattern never changes and the console shows no hydration warning.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -F - <<'EOF'
feat(work): full-bleed featured work band

Replace the card grid with the design's gradient band: italic serif
title, chips, description and features beside a 290x590 phone mockup.
Secondary projects become minimal numbered rows.

The mockup's review grid uses a fixed pattern rather than the design
file's Math.random(), which would mismatch on hydration.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
```

---

### Task 6: CV timelines

**Files:**
- Modify: `frontend/app/components/CV.tsx`
- Modify: `frontend/app/globals.css`

**Interfaces:**
- Consumes: `TimelineItem[]` (`{ date, title, org, desc }`, all `Localized`) from `lib/api.ts`; `messages[lang].cv`; `DownloadIcon` from `./icons`.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Add the timeline CSS**

Insert above the `LEGACY` marker:

```css
/* ── CV / TIMELINE ──────────────────────────────────── */
.cv-col-ttl {
  font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--ink-dim); margin-bottom: 8px;
}
.cv-block + .cv-block { margin-top: 72px; }
.timeline { position: relative; margin-top: 40px; padding-left: 36px; border-left: 1px solid var(--line); }
.tl-item { position: relative; padding-bottom: 56px; }
.tl-item:last-child { padding-bottom: 0; }
.tl-item::before {
  content: ''; position: absolute; left: -41px; top: 7px;
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--bg); border: 1px solid var(--accent);
}
.tl-item .tl-date { font-family: var(--serif); font-style: italic; color: var(--accent); font-size: 15px; margin-bottom: 8px; }
.tl-item .tl-title { font-size: 22px; font-weight: 500; line-height: 1.3; }
.tl-item .tl-org { color: var(--ink-dim); font-size: 14px; margin-top: 2px; }
.tl-item .tl-desc { margin-top: 14px; color: var(--ink-dim); font-size: 15px; line-height: 1.7; max-width: 620px; }
.cv-dl { margin-top: 64px; }
.cv-dl a {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink); text-decoration: none;
  border-bottom: 1px solid var(--line); padding-bottom: 5px;
  transition: color 0.3s, border-color 0.3s;
}
.cv-dl a:hover { color: var(--accent); border-color: var(--accent); }
.cv-dl svg { width: 15px; height: 15px; }

@media (max-width: 860px) {
  .timeline { padding-left: 26px; }
  .tl-item::before { left: -31px; }
  .cv-block + .cv-block { margin-top: 56px; }
}
```

- [ ] **Step 2: Rewrite `CV.tsx`**

```tsx
"use client";

import { DownloadIcon } from "./icons";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { loc, type TimelineItem } from "../../lib/api";
import type { Lang } from "../../lib/api";

function Timeline({ items, lang }: { items: TimelineItem[]; lang: Lang }) {
  return (
    <div className="timeline">
      {items.map((item) => {
        const desc = loc(item.desc, lang);
        return (
          <div className="tl-item" key={`${loc(item.title, lang)}-${loc(item.date, lang)}`}>
            <p className="tl-date">{loc(item.date, lang)}</p>
            <h3 className="tl-title">{loc(item.title, lang)}</h3>
            <p className="tl-org">{loc(item.org, lang)}</p>
            {desc && <p className="tl-desc">{desc}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default function CV({
  experience,
  education,
}: {
  experience: TimelineItem[];
  education: TimelineItem[];
}) {
  const { lang } = useLang();
  const t = messages[lang].cv;

  return (
    <section id="cv" className="container section-bordered">
      <p className="section-label reveal">{t.label}</p>

      <div className="cv-block reveal">
        <p className="cv-col-ttl">{t.colExperience}</p>
        <Timeline items={experience} lang={lang} />
      </div>

      <div className="cv-block reveal">
        <p className="cv-col-ttl">{t.colEducation}</p>
        <Timeline items={education} lang={lang} />
      </div>

      <div className="cv-dl reveal">
        <a href="#">
          <DownloadIcon />
          {t.downloadCv}
        </a>
      </div>
    </section>
  );
}
```

The two-column layout becomes two stacked blocks — the design's timeline runs full width, and stacking keeps Education from being cramped into a half column. `t.title` is no longer rendered; it stays in the dictionary until Task 8.

- [ ] **Step 3: Delete the legacy CV CSS**

From the legacy block remove the `/* ── CV / TIMELINE ── */` section (old lines 376–401), the `/* CV TIMELINE ── */` polish block (old lines 561–574), the timeline lines from the final reduced-motion block (`.timeline .tl-line, .timeline .tl-dot`), and the `.cv-cols` line from the old `@media (max-width: 960px)` block.

These must no longer appear: `.cv-cols`, `.tl-spine`, `.tl-dot`, `.tl-line`, `.tl-body`, `drawLine`, `popDot`.

- [ ] **Step 4: Verify**

```bash
cd frontend
npm run lint
npm run build
```

Expected: both succeed. In the browser the CV section shows two stacked timelines under tracked "Experience" / "Education" labels, each with a hairline left rule, hollow accent-ringed dots and italic accent dates, followed by the Download CV link.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -F - <<'EOF'
feat(cv): bordered editorial timelines

Replace the two-column spine timeline with the design's single
bordered rail, run twice for Experience and Education so neither is
cramped into a half column. Italic accent dates, hollow ring markers.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
```

---

### Task 7: Contact + final CSS cleanup

**Files:**
- Modify: `frontend/app/components/Contact.tsx`
- Modify: `frontend/app/globals.css`

**Interfaces:**
- Consumes: `SOCIAL_LINKS` from `app/data.ts`, `SOCIAL_ICONS` from `./icons`, `sendContactMessage` from `lib/api.ts`.
- Produces: nothing.

- [ ] **Step 1: Add the contact CSS**

Insert above the `LEGACY` marker:

```css
/* ── CONTACT ────────────────────────────────────────── */
.contact-title {
  font-family: var(--serif); font-weight: 400; font-style: italic;
  font-size: clamp(40px, 6vw, 88px); line-height: 1.05; max-width: 900px;
}
.contact-title .accent { color: var(--accent); }
.contact-layout {
  margin-top: 72px; display: grid; grid-template-columns: 1fr 1fr;
  gap: 80px; align-items: start;
}
.contact-body { color: var(--ink-dim); font-size: 16px; line-height: 1.75; max-width: 420px; margin-bottom: 40px; }
.soc-links { display: flex; flex-direction: column; gap: 18px; }
.soc-link {
  display: inline-flex; align-items: center; gap: 14px; width: fit-content;
  font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--ink); text-decoration: none;
  border-bottom: 1px solid var(--line); padding-bottom: 6px;
  transition: color 0.3s, border-color 0.3s;
}
.soc-link:hover { color: var(--accent); border-color: var(--accent); }
.soc-link svg { width: 16px; height: 16px; flex-shrink: 0; }

/* ── FORM ───────────────────────────────────────────── */
.contact-form { display: flex; flex-direction: column; gap: 26px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; }
.fg { position: relative; }
.fi {
  width: 100%; background: transparent; border: none;
  border-bottom: 1px solid var(--line); border-radius: 0;
  padding: 10px 0; color: var(--ink);
  font-family: var(--font); font-weight: 300; font-size: 16px;
  outline: none; resize: none; transition: border-color 0.3s;
}
.fi:focus { border-bottom-color: var(--accent); }
.fl {
  position: absolute; left: 0; top: 10px;
  font-size: 16px; font-weight: 300; color: var(--ink-dim);
  pointer-events: none; transform-origin: left;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s;
}
.fi:focus + .fl,
.fi:not(:placeholder-shown) + .fl {
  transform: translateY(-22px) scale(0.72);
  color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase;
}
.form-err { font-size: 13px; color: #ff8a8a; }
.form-submit {
  align-self: flex-start; margin-top: 6px;
  display: inline-flex; align-items: center; gap: 10px;
  background: transparent; border: 1px solid var(--line); border-radius: 100px;
  color: var(--ink); font-family: var(--font);
  font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 14px 30px; cursor: pointer;
  transition: color 0.3s, border-color 0.3s;
}
.form-submit:hover:not(:disabled) { color: var(--accent); border-color: var(--accent); }
.form-submit:disabled { opacity: 0.5; cursor: default; }
.form-ok { display: flex; flex-direction: column; gap: 16px; padding: 48px 0; }
.form-ok-icon {
  width: 44px; height: 44px; border-radius: 50%;
  border: 1px solid var(--accent); color: var(--accent);
  display: flex; align-items: center; justify-content: center; font-size: 17px;
}
.form-ok-msg { color: var(--ink-dim); font-size: 16px; line-height: 1.7; }
.btn-spinner {
  width: 13px; height: 13px; border-radius: 50%;
  border: 2px solid var(--line); border-top-color: var(--accent);
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 860px) {
  .contact-layout { grid-template-columns: 1fr; gap: 56px; margin-top: 48px; }
  .form-row { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .fl { transition: none; }
  .btn-spinner { animation: none; }
}
```

The floating label keeps working because every input already carries `placeholder=" "`, which is what `:not(:placeholder-shown)` keys off. Do not remove those placeholder attributes.

- [ ] **Step 2: Rewrite the `Contact.tsx` JSX**

Keep the `Status` type, `SOCIAL_BRAND`, the `useState` hooks and `handleSubmit` **exactly as they are** — the backend contract does not change. Replace only the returned JSX:

```tsx
  return (
    <section id="contact" className="container section-bordered">
      <p className="section-label reveal">{t.label}</p>
      <h2 className="contact-title reveal reveal-d1">
        {t.headingLine1} <span className="accent">{t.headingAccent}</span>
      </h2>

      <div className="contact-layout">
        <div className="reveal reveal-d2">
          <p className="contact-body">{t.body}</p>
          <div className="soc-links">
            {SOCIAL_LINKS.map(({ label, href, icon }) => {
              const Icon = SOCIAL_ICONS[icon];
              return (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="soc-link"
                  style={{ "--brand": SOCIAL_BRAND[icon] } as CSSProperties}
                >
                  <Icon />
                  {label}
                </a>
              );
            })}
          </div>
        </div>

        <form className="contact-form reveal reveal-d3" onSubmit={handleSubmit} noValidate>
          {status === "sent" ? (
            <div className="form-ok">
              <div className="form-ok-icon">✓</div>
              <p className="form-ok-msg">{t.sentMsg}</p>
            </div>
          ) : (
            <>
              <div className="form-row">
                <div className="fg">
                  <input id="cf-name" name="name" type="text" className="fi" placeholder=" " required />
                  <label className="fl" htmlFor="cf-name">{t.nameLabel}</label>
                </div>
                <div className="fg">
                  <input id="cf-email" name="email" type="email" className="fi" placeholder=" " required />
                  <label className="fl" htmlFor="cf-email">{t.emailLabel}</label>
                </div>
              </div>
              <div className="fg">
                <input id="cf-subject" name="subject" type="text" className="fi" placeholder=" " />
                <label className="fl" htmlFor="cf-subject">{t.subjectLabel}</label>
              </div>
              <div className="fg">
                <textarea id="cf-message" name="message" className="fi" rows={4} placeholder=" " required />
                <label className="fl" htmlFor="cf-message">{t.messageLabel}</label>
              </div>
              {error && (
                <p className="form-err" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="form-submit" disabled={status === "submitting"}>
                {status === "submitting" && <span className="btn-spinner" aria-hidden="true" />}
                {status === "submitting" ? t.submitting : t.submit}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
```

The `SOCIAL_BRAND` map is now only used for the `--brand` custom property, which the new `.soc-link` rules don't consume — the design tints links with the accent on hover, not brand colours. Delete `SOCIAL_BRAND`, the `style` prop and the now-unused `CSSProperties` import; `npm run lint` will flag them otherwise.

So the final import line becomes:

```tsx
import { useState, type FormEvent } from "react";
```

and the anchor drops its `style` attribute.

- [ ] **Step 3: Delete every remaining legacy rule**

Delete the `LEGACY` marker comment and **everything below it**. At this point the only remaining legacy blocks should be `/* ── BUTTONS ── */`, `/* ── CONTACT ── */`, `/* ── FORM ── */`, the CONTACT polish block, the leftover `@media (max-width: 960px)` and `@media (max-width: 600px)` blocks, and the final reduced-motion block's remaining lines — all superseded.

- [ ] **Step 4: Confirm the migration is complete**

```bash
cd frontend
grep -n "LEGACY\|--mono\|Space Grotesk\|Space Mono\|#0a8f5b\|#f4f6f3\|btn-primary\|btn-ghost\|chipbg\|--surface\|--muted\|--faint" app/globals.css
grep -rn "btn-primary\|btn-ghost\|magnetic\|tilt\|data-parallax\|section-hdr\|section-title\|section-sub" app/
```

Expected: **no output from either command.** Any hit is a rule or class name that was supposed to be removed — fix it before continuing.

- [ ] **Step 5: Verify**

```bash
cd frontend
npm run lint
npm run build
```

Expected: both succeed. In the browser the Contact section shows the large italic serif headline with an accent second clause, social links as uppercase underlined rows on the left, and the underline-style form on the right. Type into a field and confirm the label floats up, shrinks and turns accent-coloured.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -F - <<'EOF'
feat(contact): editorial contact section; drop legacy stylesheet

Big italic serif headline over a two-column layout: uppercase social
links beside the contact form, restyled to underline-only inputs with
floating labels on the dark surface. Submit path is unchanged.

Removes the last of the mint/lime rules — globals.css is now entirely
the dark editorial system.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
```

---

### Task 8: Dictionary pruning, metadata and full verification

**Files:**
- Modify: `frontend/app/i18n/dictionary.ts`
- Modify: `frontend/app/layout.tsx`
- Modify: `hbp-personal-site/CLAUDE.md`

**Interfaces:**
- Consumes: everything above.
- Produces: the shipped site.

- [ ] **Step 1: Remove the now-unrendered dictionary keys**

These are no longer read by any component. Remove them from the `Messages` type and from **both** locale objects:

- `hero.taglineLines` (Task 2 dropped the tagline)
- `hero.avatar` (the whole object — `Story` uses `story.portraitAlt` instead)
- `skills.title`, `skills.sub` (Task 4 renders the label alone)
- `portfolio.title`, `portfolio.sub` (Task 5 renders the label alone)
- `portfolio.comingSoon` (Task 5 dropped the disabled-button state)
- `cv.title` (Task 6 renders the label alone)

Verify each really is unused before deleting:

```bash
cd frontend
grep -rn "taglineLines\|hero.avatar\|\.avatar\b\|skills.title\|skills.sub\|portfolio.title\|portfolio.sub\|comingSoon\|cv.title" app/ lib/
```

Expected: hits only inside `dictionary.ts` itself. If a component still reads one, keep that key.

- [ ] **Step 2: Update the page description**

In `layout.tsx`, the `metadata.description` still says "tại Hà Nội" — correct, keep it. No change needed unless it mentions a city other than Hà Nội. Confirm with:

```bash
grep -n "description" app/layout.tsx
```

- [ ] **Step 3: Update the project CLAUDE.md**

The "Themes" bullet under **Frontend** is stale — it describes three `data-theme` variants and an `editorial` / `#e85d3d` default that no longer exist. Replace that bullet with:

```markdown
- **Theme:** one committed dark editorial theme — near-black `#0d0d12`, accent
  `#8f88ff`, Newsreader (serif display) + Work Sans (body). No `data-theme`
  switching. Design spec:
  `docs/superpowers/specs/2026-07-30-dark-editorial-redesign-design.md`.
```

- [ ] **Step 4: Full verification pass**

```bash
cd frontend
npm run lint
npm run build
npm run dev
```

Then in the browser at `http://localhost:3000`, confirm each of these:

1. **Both locales.** Switch VI ↔ EN via the globe. Every section changes language, including the About paragraphs, the skill-row descriptions and the footer city. The dropcap renders correctly in both ("T" / "I").
2. **Diacritics.** "Hoàng Bảo Phúc", "Hà Nội", "Kỹ sư phần mềm" render with correct tone marks in both Newsreader (hero, story) and Work Sans (labels, body). If any glyph falls back to a default serif, the Google Fonts URL is missing a subset.
3. **Contact form.** With the backend running (`cd backend && SERVER_PORT=8081 mvn spring-boot:run`, and `NEXT_PUBLIC_API_BASE_URL=http://localhost:8081` in `frontend/.env.local`), submit a message and confirm the success panel. Then stop the backend and submit again to confirm the error message appears in `.form-err`.
4. **Dot nav.** At ≥861px, the dots track the section in view and clicking one eases to it, landing below the fixed nav.
5. **Mobile.** At 375px: dot nav hidden, nav links hidden, story stacks to one column, work band stacks, phone scales down, no horizontal scrollbar anywhere.
6. **Reduced motion.** In DevTools, emulate `prefers-reduced-motion: reduce` and hard-reload. Every section is visible immediately, the scroll cue is static, and nothing is stuck at `opacity: 0`.
7. **Console.** No hydration warnings, no 404s, no React key warnings.

- [ ] **Step 5: Commit and push**

```bash
git add -A
git commit -F - <<'EOF'
chore(i18n): prune unrendered copy keys; refresh CLAUDE.md theme notes

Drop the dictionary entries the editorial layout no longer renders
(hero tagline and avatar caption, section titles/subs, the coming-soon
button state) and update the project CLAUDE.md, whose theme bullet
still described the retired three-theme machinery.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
git push origin main
```

---

## Self-Review

**Spec coverage.** Tokens/typography → Task 1. Page structure and nav blend-mode decision → Task 1. Hero (with CTAs retained) → Task 2. Story, `CURRENTLY` reuse, `AvatarCard`/`Currently` deletion → Task 3. Skills by-index zip → Task 4. Work band, dropped fake stats, `PhoneMockup` → Task 5. CV two timelines → Task 6. Contact form preserved → Task 7. Deletions of `PointerEffects`/`Parallax`/`CountUp` → Task 1. Verification checklist → Task 8. "Untouched" files are never edited by any task. Out-of-scope items (backend, placeholder projects, CV PDF, mobile menu) appear in no task.

**Placeholder scan.** Every code step carries real code. The only "TODO" strings are the pre-existing `TODO(owner)` placeholder projects in `data.ts`, which the spec explicitly leaves out of scope.

**Type consistency.** `story` is defined in Task 3 Step 1 and consumed in Step 4 with matching field names. `skills.rows: string[]` is defined in Task 4 Step 1, consumed as `t.rows[i]` in Step 3. `footer.city` is defined and consumed in Task 1. `nav.home`/`nav.about` are added in Task 1 Step 4 and consumed by `DotNav` (Step 3) and `Nav` (Step 5). `SECTION_IDS` in `DotNav` includes `hero`; in `Nav` it does not — deliberate, since the nav has no Home link but the dot nav does. Keys deleted in Task 8 are each traced to the task that stopped rendering them.
