# Ấn Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the mint + lime light theme with **Ấn** — dark-first, one vermilion seal-ink accent, hairline rules on a 12-column grid, a real mobile layout, a light theme, a new seal identity, and a pre-rendered case study at `/work/hajime`.

**Architecture:** Token-driven single stylesheet. The migration is incremental, not a big bang: Task 1 renames every existing token to `--legacy-*` and adds the new token block beside it, so the site keeps building and rendering while sections convert one at a time. Each later task converts one section, deletes the legacy CSS it replaces, and leaves the page in a coherent state. The final task removes what is left.

**Tech Stack:** Next.js 14 App Router (`output: "export"`), React 18.3, TypeScript 5.6, plain CSS with custom properties. No Tailwind, no CSS-in-JS, no test runner.

**Spec:** `docs/superpowers/specs/2026-09-02-an-redesign-spec.md`

## How tasks are verified (read this first)

**There is no test harness in this frontend, and this plan does not add one.** The spec fixes the gate, and adding Vitest here would be scope the spec did not authorise. So every task's "test" step is one of three concrete, checkable things — never "look at it and see if it seems fine":

1. `npm run lint` — must exit 0.
2. `npm run build` — must exit 0. This is the canonical gate; it catches server/client boundary errors that `dev` hides.
3. A **named browser assertion** with an exact expected value — a specific devtools expression and its result, or a specific pixel-level observation at a stated viewport width. Each task lists its own.

Run the dev server with `cd frontend && npm run dev` (`:3000`). Set the viewport with devtools device toolbar at exactly 1440, 960, 600 and 390 CSS px where a task asks for it.

## Global Constraints

- **Static export.** `next.config.mjs` keeps `output: "export"`. No SSR, no route handlers, no middleware, no `generateMetadata` that needs a request. Any browser API runs in a `"use client"` component behind `useEffect`.
- **Images stay unoptimized.** `images: { unoptimized: true }`. Do not introduce `next/image` optimization; keep the WebP portrait and its preload.
- **Colour discipline.** No component may contain a literal hex. Every colour is `var(--token)`. If a value is not in the token block, it does not exist.
- **`--seal` is a shape colour, never running text.** Seal-coloured type uses `--seal-lit`. On dark, `--seal` is 3.8:1 (fails body text) and `--seal-lit` is 5.7:1 (passes).
- **Vietnamese sets the line-height floor.** `display/xl` holds at `line-height: 1.0` and no tighter.
- **Copy lives in i18n.** No user-facing string is hard-coded in a component. Translatable copy goes in `app/i18n/dictionary.ts`; language-neutral data (URLs, tech names) in `app/data.ts`.
- **Touch targets ≥ 48px** below 960px, buttons and form fields included.
- **Commit identity** is the repo default (`Hoàng Bảo Phúc <phuchb04@gmail.com>`). Never pass `--author`, `--force` or `--no-verify`. Conventional Commits. Work directly on `main`.
- **Commit message trailer**, on every commit in this plan:
  ```
  Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01L849VnKa4jJTwffzVpkSdT
  ```

## Correction to the spec

Spec §7 claims `<html lang>` never follows the language switcher. **That is wrong.** `app/i18n/LanguageProvider.tsx:36-38` already does it:

```tsx
useEffect(() => {
  document.documentElement.lang = lang;
}, [lang]);
```

The `lang="vi"` in `layout.tsx` is the SSR default and is correct as-is. There is no task for this. **The spec has already been amended** (§7 and §10 check 3) so the error does not travel — Task 1 Step 9 only verifies the amendment is present.

## File structure

**New — `app/components/`**

| File | Responsibility |
|---|---|
| `SealMark.tsx` | The seal, one SVG, size-driven |
| `Wordmark.tsx` | The `phúc` wordmark with the detached accent |
| `ThemeProvider.tsx` | `data-theme` state + `useTheme()` |
| `ThemeToggle.tsx` | The nav's theme button |
| `LangToggle.tsx` | VI/EN pill pair, extracted out of `Nav.tsx` |
| `SiteNav.tsx` | Desktop nav shell, scroll state, scroll-spy |
| `MobileNavSheet.tsx` | The <600px sheet: focus trap, Esc, scroll lock |
| `SectionHeader.tsx` | Eyebrow + seal marker + h2 + optional aside |
| `ProofRow.tsx` | The three checkable facts under the hero |
| `WorkFeature.tsx` | Hajime block on the home page |
| `DeviceFrame.tsx` | Phone shell; screens are children |
| `SkillTiers.tsx` | Three ranked tiers |
| `Experience.tsx` | Replaces `CV.tsx` |

**New — `app/work/hajime/`**

| File | Responsibility |
|---|---|
| `page.tsx` | The route; composes the case blocks |
| `../../components/case/CaseHero.tsx` | Title + fact table |
| `../../components/case/DeviceStrip.tsx` | Three phones |
| `../../components/case/DecisionDiagram.tsx` | The dual-run SM-2 diagram |
| `../../components/case/StatusColumns.tsx` | Shipped / not shipped |

**Rewritten:** `globals.css`, `layout.tsx`, `page.tsx`, `Hero.tsx`, `Contact.tsx`, `Footer.tsx`, `Currently.tsx`, `Skills.tsx`, `Work.tsx`, `icon.svg`, `dictionary.ts`, `data.ts`.

**Deleted:** `SmoothScroll.tsx`, `PointerEffects.tsx`, `Parallax.tsx`, `ScrollReveal.tsx`, `CountUp.tsx`, `ScrollProgress.tsx`, `AvatarCard.tsx`, `PhoneMockup.tsx`, `CV.tsx`, `Nav.tsx`.

---

## Task 1: Token foundation and theme switching

Defines the whole visual vocabulary and gets dark/light working, without changing how the existing page looks. Legacy tokens are renamed so old and new can coexist through the migration.

**Files:**
- Modify: `frontend/app/globals.css` (rename legacy tokens, prepend the new block)
- Create: `frontend/app/components/ThemeProvider.tsx`
- Create: `frontend/app/components/ThemeToggle.tsx`
- Modify: `frontend/app/layout.tsx`
- Modify: `docs/superpowers/specs/2026-09-02-an-redesign-spec.md` (the §7 correction above)

**Interfaces:**
- Produces: `ThemeProvider({ children }: { children: ReactNode })`; `useTheme(): { theme: "dark" | "light"; toggle: () => void }`; `ThemeToggle()` — no props.
- Produces: every CSS custom property named in spec §1. All later tasks consume these.

- [ ] **Step 1: Rename every legacy token so the new block cannot collide**

Five of the old names (`--surface`, `--ink`, `--muted`, `--faint`, `--mono`) collide with new ones. Rename all eighteen at once:

```bash
cd frontend
sed -i -E 's/--(accent2|pop-ink|max-w|chipbg|border|surface|muted|faint|accent|grad|line|font|mono|gap|bg|ink|pop|r)\b/--legacy-\1/g' app/globals.css
grep -c -- '--legacy-' app/globals.css
```

Expected: a count above 200. The alternation is ordered longest-first so `--accent2` is not eaten by `--accent`, and `\b` stops `--r` from matching `--rule`.

- [ ] **Step 2: Verify the rename left no bare legacy token behind**

```bash
grep -nE '\-\-(bg|surface|ink|muted|faint|accent|pop|line|chipbg|border|font|mono|max-w|gap|grad)\b' app/globals.css | grep -v -- '--legacy-' | head
```

Expected: **no output.** Any line printed is a token the sed missed — fix it by hand before continuing.

- [ ] **Step 3: Prepend the new token block**

Insert at the very top of `app/globals.css`, above the existing header comment. Copy the full block from spec §1 verbatim — all three theme blocks. The `:root[data-theme="light"]` block repeats the same declarations as the media block; write them out, do not try to share them with a selector list (the media query must stay conditional).

Then add, immediately after the blocks:

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; scroll-padding-top: 90px; }
body {
  background: var(--ground);
  color: var(--ink);
  font-family: var(--display);
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
:focus-visible { outline: var(--focus-ring); outline-offset: var(--focus-offset); }
```

Delete the old `body { ... }` rule and the old reset that used `--legacy-bg` / `--legacy-ink` / `--legacy-font`. **The page will now render dark with mint-styled sections on it. That is the expected intermediate state for Tasks 1–8.**

- [ ] **Step 4: Add the font stylesheet beside the existing one**

In `app/layout.tsx`, keep the Space Grotesk link (legacy sections still need it) and add below it:

```tsx
<link
  href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..112,400..800&family=JetBrains+Mono:wght@400;500&family=Literata:opsz,wght@7..72,400&display=swap"
  rel="stylesheet"
/>
```

Task 11 removes the old link.

- [ ] **Step 5: Add the no-FOUC theme script**

In `app/layout.tsx`, inside `<head>`, **before** both stylesheet links:

```tsx
const THEME_INIT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;
```

```tsx
<script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
```

This is blocking on purpose — it must run before first paint or the dark page flashes light. Because it always stamps `data-theme`, the `prefers-color-scheme` block in the token CSS only governs the JavaScript-disabled case; both are required.

- [ ] **Step 6: Write `ThemeProvider.tsx`**

```tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";
type ThemeContextValue = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The inline head script already stamped data-theme before paint. Server and
  // first client render both assume "dark" so the markup matches; the real
  // value is read back on mount.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stamped = document.documentElement.getAttribute("data-theme");
    if (stamped === "light" || stamped === "dark") setTheme(stamped);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Private mode — the switch still works for this session.
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
```

- [ ] **Step 7: Write `ThemeToggle.tsx`**

```tsx
"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.4" />
          <path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
}
```

CSS in `globals.css`:

```css
.theme-toggle {
  width: 34px; height: 34px;
  display: inline-flex; align-items: center; justify-content: center;
  background: none; border: none; cursor: pointer;
  color: var(--muted);
  transition: color var(--dur-hover) var(--ease);
}
.theme-toggle:hover { color: var(--ink); }
.theme-toggle svg { width: 17px; height: 17px; }
@media (max-width: 959px) { .theme-toggle { width: 48px; height: 48px; } }
```

The label is Vietnamese because VI is the default locale; Task 3 moves it into `dictionary.ts` when the nav is rebuilt.

- [ ] **Step 8: Wrap the tree and mount the toggle**

In `app/layout.tsx`, wrap `LanguageProvider` in `ThemeProvider`:

```tsx
<ThemeProvider>
  <LanguageProvider>{children}</LanguageProvider>
</ThemeProvider>
```

Temporarily render `<ThemeToggle />` in `app/components/Nav.tsx`, inside `.nav-right`, immediately before the `.lang-switch` div, so the toggle is reachable this task. Task 3 replaces `Nav.tsx` wholesale.

- [ ] **Step 9: Verify the spec correction is present**

The spec was amended when this plan was written. Confirm it, so a stale checkout cannot send you off fixing something that already works:

```bash
grep -n "Already correct" docs/superpowers/specs/2026-09-02-an-redesign-spec.md
```

Expected: one hit, on the §7 "Language toggle" row. If there is no hit, you are on an older commit of the spec — do **not** touch `LanguageProvider.tsx`; re-read the "Correction to the spec" section at the top of this plan.

- [ ] **Step 10: Run the gate**

```bash
cd frontend && npm run lint && npm run build
```

Expected: both exit 0.

- [ ] **Step 11: Browser assertions**

Start `npm run dev`, open `:3000`, and in the console:

```js
getComputedStyle(document.documentElement).getPropertyValue('--ground').trim()
```
Expected: `#0D1015`.

Click the theme toggle, then re-run the same expression.
Expected: `#FFFFFF`.

```js
localStorage.getItem('theme')
```
Expected: `"light"`.

Hard-reload (Ctrl+Shift+R) and watch the first frame.
Expected: the page paints light immediately — **no dark flash**. Toggle back to dark, hard-reload again: paints dark immediately, no light flash.

Set the OS to light, clear `localStorage.theme`, reload.
Expected: light. Set the OS to dark, reload. Expected: dark.

- [ ] **Step 12: Commit**

```bash
git add frontend/app/globals.css frontend/app/layout.tsx \
        frontend/app/components/ThemeProvider.tsx \
        frontend/app/components/ThemeToggle.tsx \
        frontend/app/components/Nav.tsx
git commit
```

Message:

```
feat(theme): add Ấn design tokens and dark/light switching

Rename every existing custom property to --legacy-* so the new token
block can land beside it and the site keeps rendering while sections
migrate one at a time.

Theme is stamped on <html> by a blocking head script before first
paint, so neither theme flashes the other on load. ThemeProvider reads
that stamp back on mount and owns the toggle.
```

---

## Task 2: The identity — seal mark and wordmark

Every later task consumes these. Small, self-contained, and the favicon comes with it.

**Files:**
- Create: `frontend/app/components/SealMark.tsx`
- Create: `frontend/app/components/Wordmark.tsx`
- Modify: `frontend/app/globals.css` (wordmark rules)
- Replace: `frontend/app/icon.svg`

**Interfaces:**
- Consumes: `--seal`, `--ground` (Task 1).
- Produces: `SealMark({ size?: number; counter?: string; frame?: boolean; decorative?: boolean })` — `size` defaults to 32, `counter` defaults to `"var(--ground)"`, `frame` defaults to `size >= 48`, `decorative` defaults to `false`.
- Produces: `Wordmark({ size?: number })` — `size` defaults to 24.

- [ ] **Step 1: Write `SealMark.tsx`**

```tsx
export default function SealMark({
  size = 32,
  counter = "var(--ground)",
  frame,
  decorative = false,
}: {
  size?: number;
  counter?: string;
  frame?: boolean;
  decorative?: boolean;
}) {
  // The inner frame is a hairline; below 48px it fills in and muddies the mark.
  const showFrame = frame ?? size >= 48;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Hoàng Bảo Phúc"}
      aria-hidden={decorative || undefined}
      style={{ display: "block", flex: "none" }}
    >
      <rect x="3" y="3" width="94" height="94" rx="9" fill="var(--seal)" />
      {showFrame && (
        <rect
          x="9.5" y="9.5" width="81" height="81" rx="5"
          fill="none" stroke={counter} strokeOpacity="0.32" strokeWidth="1.7"
        />
      )}
      <path
        fill={counter}
        fillRule="evenodd"
        d="M28 24 H71 V57 H39 V78 H28 Z M39 35 H60 V46 H39 Z"
      />
    </svg>
  );
}
```

`counter` exists because the counter takes whatever surface the seal is stamped on. On `--ground` the default is right; on the device stage pass `counter="var(--surface)"`.

- [ ] **Step 2: Write `Wordmark.tsx`**

```tsx
export default function Wordmark({ size = 24 }: { size?: number }) {
  return (
    <span className="wordmark" style={{ fontSize: size }} role="img" aria-label="phúc">
      <span aria-hidden="true">
        ph
        <span className="wordmark-u">
          u
          <svg className="wordmark-accent" viewBox="0 0 24 22" aria-hidden="true">
            <path d="M6 19 L16 3 L20 5.5 L10 21.5 Z" />
          </svg>
        </span>
        c
      </span>
    </span>
  );
}
```

The accent is a drawn element, not the `ú` glyph, so the visible text spells `phuc`. `role="img"` plus `aria-label="phúc"` gives assistive tech the real name.

- [ ] **Step 3: Add the wordmark CSS**

```css
.wordmark {
  font-family: var(--display);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1;
  color: var(--ink);
  display: inline-block;
}
.wordmark-u { position: relative; display: inline-block; line-height: 1; }
.wordmark-accent {
  position: absolute;
  left: 50%;
  bottom: 0.80em;
  transform: translateX(-44%);
  width: 0.28em;
  height: auto;
  display: block;
}
.wordmark-accent path { fill: var(--seal); }
```

`bottom: 0.80em` is measured from the inline-block's own box with `line-height: 1`, which places the accent just clear of the `u`'s x-height. If it reads too high or low at 126px, adjust **only** this value and keep it in one place.

- [ ] **Step 4: Replace the favicon**

Overwrite `frontend/app/icon.svg`. It is served standalone, so it cannot use CSS variables — the hexes are literal here and this is the one sanctioned exception to the no-literals rule:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="3" y="3" width="94" height="94" rx="9" fill="#C8402C"/>
  <path fill="#0D1015" fill-rule="evenodd" d="M28 24 H71 V57 H39 V78 H28 Z M39 35 H60 V46 H39 Z"/>
</svg>
```

No inner frame — this renders at 16–32px.

- [ ] **Step 5: Mount both temporarily so they can be inspected**

In `app/components/Nav.tsx`, replace the contents of the `.nav-logo` anchor with `<Wordmark size={24} />`. Task 3 replaces this file.

- [ ] **Step 6: Run the gate**

```bash
cd frontend && npm run lint && npm run build
```

Expected: both exit 0.

- [ ] **Step 7: Browser assertions**

At `:3000`, in the console:

```js
const a = document.querySelector('.wordmark-accent');
const u = document.querySelector('.wordmark-u');
const ar = a.getBoundingClientRect(), ur = u.getBoundingClientRect();
[ar.bottom < ur.bottom, ar.bottom > ur.top, ar.left > ur.left - 4]
```
Expected: `[true, true, true]` — the accent sits inside the `u`'s horizontal span and above its baseline, not floating off.

Check the browser tab: the favicon is a solid vermilion square with a legible `P`. Toggle to light: the wordmark's accent stays vermilion and the letters go dark.

- [ ] **Step 8: Commit**

```bash
git add frontend/app/components/SealMark.tsx frontend/app/components/Wordmark.tsx \
        frontend/app/components/Nav.tsx frontend/app/globals.css frontend/app/icon.svg
git commit
```

Message:

```
feat(identity): add the seal mark and phúc wordmark

The seal's counter takes whatever surface it is stamped on, so it is a
prop rather than a fixed white. The wordmark's dấu sắc is drawn, not
typed — the text spells "phuc" and role/aria-label carry the real name.

Favicon becomes the seal without its inner frame, which fills in below 48px.
```

---

## Task 3: The shell — page grid, nav, mobile sheet

**Files:**
- Create: `frontend/app/components/SiteNav.tsx`, `MobileNavSheet.tsx`, `LangToggle.tsx`
- Delete: `frontend/app/components/Nav.tsx`
- Modify: `frontend/app/globals.css`, `frontend/app/page.tsx`, `frontend/app/i18n/dictionary.ts`

**Interfaces:**
- Consumes: `SealMark`, `Wordmark` (Task 2); `useTheme` (Task 1); `useLang`, `messages` (existing).
- Produces: `SiteNav()`, `MobileNavSheet({ open, onClose }: { open: boolean; onClose: () => void })`, `LangToggle({ layout?: "inline" | "sheet" })`.
- Produces CSS utilities every later task uses: `.shell`, `.g12`, `.rule`, `.eyebrow`, `.h2`, `.prose`, `.meta`, `.btn`, `.btn-ghost`.

- [ ] **Step 1: Add the layout utilities to `globals.css`**

```css
.shell { padding-inline: var(--page-margin); }
.g12 { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: var(--gutter); }
.rule { height: var(--hairline); background: var(--rule); }

.eyebrow {
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.19em; text-transform: uppercase; color: var(--seal-lit);
  display: flex; align-items: center; gap: 11px;
}
.h2 {
  font-family: var(--display); font-weight: 800; font-stretch: 110%;
  font-size: 64px; letter-spacing: -0.032em; line-height: 1.02;
  color: var(--ink); text-wrap: balance;
}
.prose {
  font-family: var(--body); font-size: 17px; line-height: 1.72;
  color: var(--muted); max-width: var(--measure);
}
.meta {
  font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.04em;
  color: var(--faint); line-height: 1.75;
}
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  background: var(--seal); color: var(--on-seal);
  font-family: var(--display); font-size: 14.5px; font-weight: 600;
  padding: 14px 28px; border: none; border-radius: var(--r-control);
  cursor: pointer; text-decoration: none;
  transition: background var(--dur-hover) var(--ease), transform var(--dur-hover) var(--ease);
}
.btn:hover { background: var(--seal-hover); transform: translateY(-1px); }
.btn:active { background: var(--seal-active); transform: none; }
.btn:disabled { background: var(--seal-disabled-bg); color: var(--seal-disabled-ink); cursor: default; transform: none; }
.btn-ghost {
  display: inline-flex; align-items: center; justify-content: center; gap: 9px;
  background: none; color: var(--ink-2);
  font-family: var(--display); font-size: 14.5px; font-weight: 500;
  padding: 14px 26px; border: var(--hairline) solid var(--control-border);
  border-radius: var(--r-control); cursor: pointer; text-decoration: none;
  transition: color var(--dur-hover) var(--ease), border-color var(--dur-hover) var(--ease);
}
.btn-ghost:hover { color: var(--ink); border-color: var(--control-border-hover); }
```

Add the breakpoint overrides for `--page-margin` and `--section-pad` (spec §5):

```css
@media (max-width: 1199px) { :root { --page-margin: 48px; --section-pad: 104px; } .h2 { font-size: 52px; } }
@media (max-width: 959px)  { :root { --page-margin: 32px; --section-pad: 80px; }
  .g12 { grid-template-columns: repeat(6, minmax(0, 1fr)); } .h2 { font-size: 44px; } }
@media (max-width: 599px)  { :root { --page-margin: 24px; --section-pad: 64px; }
  .g12 { grid-template-columns: 1fr; }
  .h2 { font-size: 36px; }
  .eyebrow { font-size: 10px; letter-spacing: 0.18em; }
  .prose { font-size: 15.5px; line-height: 1.75; }
  .btn, .btn-ghost { min-height: 48px; width: 100%; }
}
```

- [ ] **Step 2: Add the nav copy to `dictionary.ts`**

Extend the `Messages` type and both locale objects:

```ts
nav: {
  skills: string; work: string; experience: string; contact: string;
  menu: string; close: string; toLight: string; toDark: string;
};
```

VI: `{ skills: "Kỹ năng", work: "Sản phẩm", experience: "Kinh nghiệm", contact: "Liên hệ", menu: "Mở menu", close: "Đóng menu", toLight: "Chuyển sang giao diện sáng", toDark: "Chuyển sang giao diện tối" }`

EN: `{ skills: "Skills", work: "Work", experience: "Experience", contact: "Contact", menu: "Open menu", close: "Close menu", toLight: "Switch to light theme", toDark: "Switch to dark theme" }`

Then change `ThemeToggle.tsx` to read `messages[lang].nav.toLight / .toDark` via `useLang()` instead of the hard-coded Vietnamese from Task 1.

The `cv` key is renamed to `experience` throughout; update `Nav`'s old references as they are deleted.

- [ ] **Step 3: Write `LangToggle.tsx`**

```tsx
"use client";

import { useLang } from "../i18n/LanguageProvider";
import { LANG_LABELS, type Lang } from "../i18n/dictionary";

const LANGS: Lang[] = ["vi", "en"];

export default function LangToggle({ layout = "inline" }: { layout?: "inline" | "sheet" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={layout === "sheet" ? "lang-toggle lang-toggle-sheet" : "lang-toggle"}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className={l === lang ? "lang-opt lang-opt-active" : "lang-opt"}
          aria-pressed={l === lang}
          aria-label={LANG_LABELS[l]}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

```css
.lang-toggle { display: flex; align-items: center; gap: 2px; }
.lang-opt {
  font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.08em;
  color: var(--faint); background: none; border: none; cursor: pointer;
  padding: 5px 9px; border-radius: var(--r-chip);
  transition: color var(--dur-hover) var(--ease);
}
.lang-opt:hover { color: var(--ink); }
.lang-opt-active { color: var(--ink); background: var(--raised); }
.lang-toggle-sheet .lang-opt { padding: 8px 12px; font-size: 11px; min-height: 44px; }
@media (max-width: 959px) { .lang-opt { min-height: 44px; padding: 8px 11px; } }
```

This replaces the globe dropdown. Two visible pills, no menu — the spec calls for promoting the switch, and a dropdown hides it.

- [ ] **Step 4: Write `MobileNavSheet.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import Wordmark from "./Wordmark";
import LangToggle from "./LangToggle";

const LINKS = [
  { id: "skills", key: "skills" },
  { id: "portfolio", key: "work" },
  { id: "experience", key: "experience" },
] as const;

export default function MobileNavSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const t = messages[lang].nav;

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
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

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
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
        <a key={l.id} href={`#${l.id}`} className="sheet-link" onClick={onClose}>
          {t[l.key]}
        </a>
      ))}
      <a href="#contact" className="btn sheet-cta" onClick={onClose}>{t.contact}</a>
      <div className="sheet-foot"><LangToggle layout="sheet" /></div>
    </div>
  );
}
```

```css
.sheet {
  position: fixed; inset: 0; z-index: 200;
  background: var(--surface-alt);
  display: flex; flex-direction: column;
}
.sheet-head {
  height: 60px; padding-inline: var(--page-margin);
  display: flex; align-items: center; justify-content: space-between;
  border-bottom: var(--hairline) solid var(--rule);
}
.sheet-close {
  width: 48px; height: 48px; display: inline-flex; align-items: center; justify-content: center;
  background: none; color: var(--ink);
  border: var(--hairline) solid var(--control-border); border-radius: 5px; cursor: pointer;
}
.sheet-close svg { width: 16px; height: 16px; }
.sheet-link {
  padding: 15px var(--page-margin); min-height: 48px;
  display: flex; align-items: center;
  font-size: 17px; color: var(--ink); text-decoration: none;
  border-bottom: var(--hairline) solid var(--rule-faint);
}
.sheet-cta { margin: 16px var(--page-margin); }
.sheet-foot { padding: 0 var(--page-margin) 18px; }
@media (min-width: 600px) { .sheet { display: none; } }
```

- [ ] **Step 5: Write `SiteNav.tsx`**

Port the scroll-state and scroll-spy effects from the old `Nav.tsx:29-54` unchanged — they set nav state, not motion, and the spec keeps them. Section ids are `skills`, `portfolio`, `experience`, `contact`.

```tsx
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
```

```css
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
.nav-scrolled {
  background: color-mix(in srgb, var(--ground) 88%, transparent);
  backdrop-filter: blur(18px);
  border-bottom: var(--hairline) solid var(--rule);
}
.nav-inner {
  height: 78px; display: flex; align-items: center; justify-content: space-between;
}
.nav-logo { text-decoration: none; }
.nav-right { display: flex; align-items: center; gap: 24px; }
.nav-links { display: flex; align-items: center; gap: 30px; list-style: none; }
.nav-link {
  font-size: 14.5px; color: var(--muted); text-decoration: none;
  padding-bottom: 8px; border-bottom: var(--emphasis) solid transparent;
  transition: color var(--dur-hover) var(--ease);
}
.nav-link:hover { color: var(--ink); }
.nav-link-active { color: var(--ink); border-bottom-color: var(--seal); }
.nav-divider { width: 1px; height: 20px; background: var(--rule); }
.nav-cta { padding: 9px 20px; font-size: 13.5px; }
.nav-menu { display: none; }

@media (max-width: 599px) {
  .nav-inner { height: 60px; }
  .nav-links, .nav-divider, .nav-cta, .theme-toggle { display: none; }
  .nav-menu {
    display: inline-flex; align-items: center; justify-content: center;
    width: 48px; height: 48px; background: none; color: var(--ink);
    border: var(--hairline) solid var(--control-border);
    border-radius: 5px; cursor: pointer;
  }
  .nav-menu svg { width: 19px; height: 19px; }
}
```

The theme toggle hides below 600px only because it lives in the sheet's foot — add `<ThemeToggle />` beside `<LangToggle layout="sheet" />` in `.sheet-foot` so it stays reachable.

- [ ] **Step 6: Swap the nav in `page.tsx` and delete the old one**

Replace `import Nav from "./components/Nav"` with `import SiteNav from "./components/SiteNav"` and `<Nav />` with `<SiteNav />`, then `git rm frontend/app/components/Nav.tsx`.

- [ ] **Step 7: Run the gate**

```bash
cd frontend && npm run lint && npm run build
```

Expected: both exit 0. If the build fails with a `useLang must be used within a LanguageProvider` error, `SiteNav` is being rendered outside the provider — check `layout.tsx` from Task 1 Step 8.

- [ ] **Step 8: Browser assertions**

At 1440: nav shows wordmark, three links, VI/EN, theme icon, Liên hệ button. Scroll down 100px — the bar gains a blurred background and a bottom hairline. Scroll to the Skills section; the "Kỹ năng" link gains a vermilion underline.

At 390: links, divider, CTA and theme icon are gone; only wordmark, VI/EN and the menu button remain. In the console:

```js
document.querySelector('.nav-menu').getBoundingClientRect().height
```
Expected: `48`.

Click the menu button. The sheet covers the viewport. Then:

```js
document.activeElement.className
```
Expected: contains `sheet-close` — focus moved into the sheet.

```js
document.body.style.overflow
```
Expected: `"hidden"`.

Press Tab repeatedly past the last control: focus returns to the first, it does not escape to the page behind. Press Escape: the sheet closes, `document.body.style.overflow` is `""`, and focus is back on `.nav-menu`.

- [ ] **Step 9: Commit**

```bash
git add -A frontend/app
git commit
```

Message:

```
feat(nav): rebuild the shell, nav and mobile sheet

Below 600px the site had no navigation at all — globals.css deleted the
links with nothing in their place. MobileNavSheet is that replacement:
full-height, 48px rows, focus trapped, Escape closes, body scroll locked.

The VI/EN globe dropdown becomes two visible pills; a hidden switcher was
the point of the complaint.
```

---

## Task 4: Hero, proof row and the currently strip

**Files:**
- Rewrite: `frontend/app/components/Hero.tsx`, `Currently.tsx`
- Create: `frontend/app/components/ProofRow.tsx`
- Delete: `frontend/app/components/AvatarCard.tsx`, `Parallax.tsx`, `PointerEffects.tsx`
- Modify: `frontend/app/globals.css`, `page.tsx`, `dictionary.ts`, `data.ts`

**Interfaces:**
- Consumes: `SealMark` (Task 2); `.shell`, `.g12`, `.rule`, `.eyebrow`, `.prose`, `.meta`, `.btn`, `.btn-ghost` (Task 3).
- Produces: `Hero()`, `ProofRow()`, `Currently()` — none take props; all read i18n.

- [ ] **Step 1: Replace the hero stats with proof in `dictionary.ts`**

Delete `hero.stats` from the `Messages` type and both locales. Add:

```ts
proof: {
  shipped: { label: string; value: string; note: string };
  now:     { label: string; value: string; note: string };
  source:  { label: string; value: string; note: string };
};
```

VI:
```ts
proof: {
  shipped: { label: "Đã phát hành", value: "Hajime", note: "Android · APK cài được ngay · React Native + Spring Boot" },
  now:     { label: "Hiện tại", value: "Dr.JOY Việt Nam", note: "Kỹ sư backend · Java · Spring Boot · từ 3/2026" },
  source:  { label: "Mã nguồn", value: "joey-hoagbp", note: "github.com · 3 công ty trong 2 năm" },
},
```

EN:
```ts
proof: {
  shipped: { label: "Shipped", value: "Hajime", note: "Android · installable APK · React Native + Spring Boot" },
  now:     { label: "Currently", value: "Dr.JOY Vietnam", note: "Backend engineer · Java · Spring Boot · since 3/2026" },
  source:  { label: "Source", value: "joey-hoagbp", note: "github.com · 3 companies in 2 years" },
},
```

Also replace `hero.bio` in both locales with the §9 copy, and `hero.taglineLines` stays as-is.

- [ ] **Step 2: Rewrite `Hero.tsx`**

```tsx
"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { AVATAR_SRC } from "../data";
import SealMark from "./SealMark";

export default function Hero() {
  const { lang } = useLang();
  const t = messages[lang].hero;

  return (
    <section id="hero" className="hero shell">
      <div className="hero-grid-rules" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
      </div>

      <div className="g12 hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><SealMark size={12} decorative /> {t.eyebrow}</p>
          <h1 className="hero-name">
            Hoàng<br />Bảo Phúc
          </h1>
          <p className="hero-tagline">{t.taglineLines[0]} {t.taglineLines[1]}</p>
          <p className="prose hero-bio">{t.bio}</p>
          <div className="hero-actions">
            <a href="#portfolio" className="btn">
              {t.viewWork}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
            </a>
            <a href="#contact" className="btn-ghost">{t.getInTouch}</a>
          </div>
        </div>

        <div className="hero-portrait">
          <img src={AVATAR_SRC} alt={t.avatar.alt} width={420} height={525} />
          <span className="hero-seal"><SealMark size={96} /></span>
        </div>
      </div>
    </section>
  );
}
```

The arrow SVG needs sizing: add `.btn svg, .btn-ghost svg { width: 15px; height: 15px; flex: none; }` to the Task 3 button CSS.

- [ ] **Step 3: Add the hero CSS**

```css
.hero { padding-top: 104px; position: relative; }
.hero-grid-rules {
  position: absolute; inset: 0 var(--page-margin);
  display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: var(--gutter);
  pointer-events: none;
}
.hero-grid-rules span { border-left: var(--hairline) solid var(--grid-line); }
.hero-grid { align-items: center; position: relative; }
.hero-copy { grid-column: span 7; display: flex; flex-direction: column; gap: 26px; }
.hero-name {
  font-family: var(--display); font-weight: 800; font-stretch: 108%;
  font-size: 126px; letter-spacing: -0.038em; line-height: 1.0;
  color: var(--ink); text-wrap: balance;
}
.hero-tagline {
  font-family: var(--display); font-weight: 400; font-size: 26px;
  line-height: 1.35; color: var(--ink-2); max-width: 15ch;
}
.hero-bio { max-width: 46ch; }
.hero-actions { display: flex; align-items: center; gap: 14px; padding-top: 6px; }
.hero-portrait { grid-column: 9 / span 4; position: relative; }
.hero-portrait img {
  display: block; width: 100%; height: auto; aspect-ratio: 4 / 5;
  object-fit: cover; object-position: center top; background: var(--raised);
}
.hero-seal { position: absolute; left: -34px; bottom: -30px; }

@media (max-width: 1199px) { .hero-name { font-size: 96px; } }
@media (max-width: 959px) {
  .hero-grid-rules { display: none; }
  .hero-copy { grid-column: span 6; order: 2; }
  .hero-portrait { grid-column: span 6; order: 1; width: 240px; }
  .hero-name { font-size: 72px; }
  .hero-tagline { font-size: 22px; }
}
@media (max-width: 599px) {
  .hero { padding-top: 34px; }
  .hero-portrait { width: 212px; }
  .hero-seal { left: auto; right: -22px; bottom: -20px; }
  .hero-seal svg { width: 62px; height: 62px; }
  .hero-name { font-size: 52px; letter-spacing: -0.035em; line-height: 1.02; }
  .hero-tagline { font-size: 19px; max-width: none; }
  .hero-actions { flex-direction: column; align-items: stretch; }
}
```

**The portrait is never `display: none`.** It reorders above the copy at 960 and shrinks at 600 — deleting it is the bug this task fixes.

- [ ] **Step 4: Write `ProofRow.tsx`**

```tsx
"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { SOCIAL_LINKS } from "../data";
import { PROJECTS } from "../data";

export default function ProofRow() {
  const { lang } = useLang();
  const p = messages[lang].proof;
  const apk = PROJECTS[0]?.apkUrl;
  const github = SOCIAL_LINKS.find((l) => l.icon === "github")?.href;

  const items = [
    { ...p.shipped, href: apk },
    { ...p.now, href: undefined },
    { ...p.source, href: github },
  ];

  return (
    <section className="proof shell">
      <div className="rule" />
      <div className="g12 proof-row">
        {items.map((it) => (
          <div className="proof-item" key={it.label}>
            <span className="meta">{it.label}</span>
            {it.href ? (
              <a className="proof-value" href={it.href} target="_blank" rel="noreferrer">
                {it.value}
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--seal)" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
              </a>
            ) : (
              <span className="proof-value">{it.value}</span>
            )}
            <span className="meta">{it.note}</span>
          </div>
        ))}
      </div>
      <div className="rule" />
    </section>
  );
}
```

```css
.proof { padding-top: var(--sp-11); }
.proof-row { padding: 34px 0; }
.proof-item { grid-column: span 4; display: flex; flex-direction: column; gap: 9px; }
.proof-item + .proof-item { border-left: var(--hairline) solid var(--rule); padding-left: 32px; }
.proof-value {
  font-family: var(--display); font-weight: 700; font-stretch: 106%;
  font-size: 31px; letter-spacing: -0.025em; line-height: 1;
  color: var(--ink); text-decoration: none;
  display: inline-flex; align-items: center; gap: 12px;
}
.proof-value svg { width: 17px; height: 17px; flex: none; }
a.proof-value:hover { color: var(--seal-lit); }
@media (max-width: 959px) { .proof-item { grid-column: span 6; } }
@media (max-width: 599px) {
  .proof-row { padding: 0; }
  .proof-item { grid-column: span 1; padding: 22px 0; }
  .proof-item + .proof-item { border-left: none; padding-left: 0; border-top: var(--hairline) solid var(--rule); }
  .proof-value { font-size: 27px; }
}
```

- [ ] **Step 5: Rewrite `Currently.tsx`**

Keep reading `CURRENTLY` from `data.ts`, but drop the emoji (spec: no emoji) and the pulse animation. Replace the emoji field usage — in `data.ts`, change the `CURRENTLY` type to `{ text: Localized }[]` and delete the three `emoji` values.

```tsx
"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";
import { CURRENTLY } from "../data";

export default function Currently() {
  const { lang } = useLang();
  return (
    <section className="currently shell">
      <span className="currently-dot" aria-hidden="true" />
      <span className="currently-prefix">{messages[lang].currently.prefix}</span>
      {CURRENTLY.map((item, i) => (
        <span className="currently-item" key={item.text.en}>
          {i > 0 && <span className="currently-sep" aria-hidden="true">—</span>}
          {item.text[lang]}
        </span>
      ))}
    </section>
  );
}
```

```css
.currently {
  padding-block: 26px;
  display: flex; align-items: center; justify-content: center;
  flex-wrap: wrap; gap: 8px 16px;
  font-family: var(--mono); font-size: 12.5px; color: var(--faint); letter-spacing: 0.03em;
  border-bottom: var(--hairline) solid var(--rule);
}
.currently-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--seal); flex: none; }
.currently-prefix { color: var(--seal-lit); letter-spacing: 0.14em; text-transform: uppercase; font-size: 11px; }
.currently-item { display: inline-flex; align-items: center; gap: 16px; }
.currently-sep { color: var(--rule); }
@media (max-width: 599px) { .currently { justify-content: flex-start; font-size: 11.5px; } }
```

- [ ] **Step 6: Update `page.tsx` and delete the three components**

```tsx
<SiteNav />
<main>
  <Hero />
  <ProofRow />
  <Currently />
  <Skills groups={profile.techStacks} />
  <Work projects={PROJECTS} />
  <CV experience={profile.experiences} education={profile.education} />
  <Contact />
</main>
<Footer />
```

Remove `<ScrollProgress />`, `<PointerEffects />`, `<Parallax />`, `<ScrollReveal />` from the tree (the components themselves go in Task 9 except the three deleted here).

```bash
git rm frontend/app/components/AvatarCard.tsx frontend/app/components/Parallax.tsx frontend/app/components/PointerEffects.tsx
```

Delete the now-dead legacy CSS: every rule from `/* ── HERO ── */` through the end of `/* ── HERO AVATAR CARD ── */`, plus `.currently*` legacy rules and `@keyframes orbDrift` / `availPulse`.

- [ ] **Step 7: Run the gate**

```bash
cd frontend && npm run lint && npm run build
```

Expected: both exit 0.

- [ ] **Step 8: Browser assertions**

At 1440, console:

```js
const n = document.querySelector('.hero-name');
[getComputedStyle(n).fontSize, getComputedStyle(n).lineHeight]
```
Expected: `["126px", "126px"]` — line-height 1.0, the Vietnamese floor.

```js
document.querySelectorAll('.hero-grid-rules span').length
```
Expected: `12`.

At 390, console:

```js
const p = document.querySelector('.hero-portrait');
[getComputedStyle(p).display, p.getBoundingClientRect().width]
```
Expected: `["block", 212]` — **not** `"none"`.

```js
const c = document.querySelector('.hero-copy'), po = document.querySelector('.hero-portrait');
po.getBoundingClientRect().top < c.getBoundingClientRect().top
```
Expected: `true` — portrait above the copy.

Visually: no glow orb, no cursor-following light, the portrait does not drift on scroll. The `ả` in "Bảo" is fully visible, not clipped by the line above.

- [ ] **Step 9: Commit**

```bash
git add -A frontend/app
git commit
```

Message:

```
feat(hero): rebuild the hero with a proof row, keep the portrait on mobile

The three stats ended on "1 app shipped", which volunteered the weakness.
ProofRow states three checkable facts instead, two of them links.

The portrait now reorders above the copy at 960 and shrinks at 600 rather
than being deleted. Drops the glow orb, parallax and magnetic cursor.
```

---

## Task 5: Work section and the device frame

**Files:**
- Rewrite: `frontend/app/components/Work.tsx`
- Create: `frontend/app/components/WorkFeature.tsx`, `DeviceFrame.tsx`, `SectionHeader.tsx`
- Delete: `frontend/app/components/PhoneMockup.tsx`
- Modify: `globals.css`, `dictionary.ts`

**Interfaces:**
- Consumes: `SealMark`, `.g12`, `.h2`, `.prose`, `.meta`, `.btn`, `.btn-ghost`.
- Produces: `SectionHeader({ id, label, title, aside }: { id: string; label: string; title: ReactNode; aside?: string })`.
- Produces: `DeviceFrame({ children, offset }: { children: ReactNode; offset?: boolean })` — `offset` adds the 56px top nudge on the second phone.
- Produces: `WorkFeature({ project }: { project: Project })` — `Project` is the existing type from `lib/api.ts`.

- [ ] **Step 1: Write `SectionHeader.tsx`**

```tsx
import type { ReactNode } from "react";
import SealMark from "./SealMark";

export default function SectionHeader({
  id, label, title, aside,
}: { id: string; label: string; title: ReactNode; aside?: string }) {
  return (
    <div className="g12 section-header" id={id}>
      <div className="section-header-main">
        <p className="eyebrow"><SealMark size={13} decorative /> {label}</p>
        <h2 className="h2">{title}</h2>
      </div>
      {aside && <p className="prose section-header-aside">{aside}</p>}
    </div>
  );
}
```

```css
.section-header { align-items: end; margin-bottom: 60px; }
.section-header-main { grid-column: span 7; display: flex; flex-direction: column; gap: 22px; }
.section-header-aside { grid-column: 9 / span 4; font-size: 16px; }
@media (max-width: 959px) {
  .section-header-main { grid-column: span 6; }
  .section-header-aside { grid-column: span 6; }
}
@media (max-width: 599px) {
  .section-header { margin-bottom: 28px; }
  .section-header-main { grid-column: span 1; gap: 18px; }
  .section-header-aside { display: none; }
}
```

- [ ] **Step 2: Write `DeviceFrame.tsx`**

```tsx
import type { ReactNode } from "react";

export default function DeviceFrame({ children, offset = false }: { children: ReactNode; offset?: boolean }) {
  return (
    <div className={offset ? "device device-offset" : "device"}>
      <div className="device-screen">{children}</div>
    </div>
  );
}
```

```css
.device {
  width: 246px; height: 512px; flex: none;
  background: var(--app-shell); border-radius: var(--r-phone); padding: 8px;
  box-shadow: var(--shadow-device);
}
.device-offset { margin-top: 56px; }
.device-screen {
  height: 100%;
  background: linear-gradient(155deg, var(--app-screen-from) 0%, var(--app-screen-to) 100%);
  border-radius: 24px; padding: 20px 16px;
  display: flex; flex-direction: column; gap: 14px;
  font-family: var(--mono);
}
@media (max-width: 959px) { .device-offset { display: none; } }
@media (max-width: 599px) { .device { width: 214px; height: 446px; } }
```

No fake status bar and no fake keyboard — on a real device the OS draws those on top.

- [ ] **Step 3: Add the flashcard screen markup**

Inside `WorkFeature`, the first device's children. All colours here are the app's own screen palette, which is deliberately theme-independent; use `rgba(255,255,255,…)` for the in-screen greys and `var(--seal)` for the accent:

```tsx
<>
  <div className="ds-top">
    <span className="ds-app">HAJIME</span>
    <span className="ds-streak">{t.streak}</span>
  </div>
  <div className="ds-card">
    <span className="ds-char">あ</span>
    <span className="ds-roman">a</span>
    <span className="ds-note">{t.charNote}</span>
  </div>
  <div className="ds-progress">
    <div className="ds-progress-row"><span>Hiragana</span><span className="ds-pct">68%</span></div>
    <div className="ds-progress-bg"><span style={{ width: "68%" }} /></div>
  </div>
  <div className="ds-actions">
    <span className="ds-action">{t.hard}</span>
    <span className="ds-action ds-action-primary">{t.got}</span>
  </div>
</>
```

```css
.ds-top { display: flex; align-items: center; justify-content: space-between; }
.ds-app { font-size: 9px; letter-spacing: 0.16em; color: rgba(255,255,255,.36); }
.ds-streak {
  font-size: 9px; color: #F0A08A; padding: 3px 8px; border-radius: var(--r-pill, 100px);
  background: rgba(224,103,78,.18); border: 1px solid rgba(224,103,78,.32);
}
.ds-card {
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.10);
  border-radius: 14px; padding: 26px 14px; text-align: center;
  display: flex; flex-direction: column; gap: 7px;
}
.ds-char { font-size: 64px; line-height: 1; color: #fff; }
.ds-roman { font-size: 14px; color: rgba(255,255,255,.62); }
.ds-note { font-size: 9.5px; color: rgba(255,255,255,.30); }
.ds-progress { display: flex; flex-direction: column; gap: 6px; }
.ds-progress-row { display: flex; justify-content: space-between; font-size: 9px; letter-spacing: 0.09em; text-transform: uppercase; color: rgba(255,255,255,.32); }
.ds-pct { color: #F0A08A; text-transform: none; letter-spacing: 0; }
.ds-progress-bg { height: 4px; background: rgba(255,255,255,.08); border-radius: 2px; overflow: hidden; }
.ds-progress-bg span { display: block; height: 100%; background: var(--seal); }
.ds-actions { margin-top: auto; display: flex; gap: 7px; }
.ds-action { flex: 1; text-align: center; padding: 11px; border-radius: 9px; font-size: 9.5px; background: rgba(255,255,255,.07); color: rgba(255,255,255,.55); }
.ds-action-primary { background: var(--seal); color: var(--on-seal); }
```

Add `--r-pill: 100px;` to the token block if it is not already there.

- [ ] **Step 4: Add the stroke-order screen markup**

The second device's children:

```tsx
<>
  <span className="ds-app">{t.strokeLabel}</span>
  <div className="ds-kanji">
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <g stroke="rgba(255,255,255,.10)" strokeWidth="0.6" strokeDasharray="3 3"><path d="M50 6 V94 M6 50 H94" /></g>
      <g fill="none" stroke="#fff" strokeWidth="6.5" strokeLinecap="square">
        <path d="M28 16 V84" /><path d="M28 16 H72" /><path d="M72 16 V84" /><path d="M28 84 H72" /><path d="M28 50 H72" />
      </g>
      <circle cx="28" cy="16" r="5.5" fill="var(--seal)" />
      <text x="28" y="18.6" fill="#fff" fontFamily="monospace" fontSize="7" textAnchor="middle">1</text>
    </svg>
  </div>
  <div className="ds-gloss">
    <span className="ds-gloss-title">日 · {t.kanjiReading}</span>
    <span className="ds-gloss-body">{t.kanjiGloss}</span>
  </div>
</>
```

```css
.ds-kanji { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.09); border-radius: 14px; padding: 16px; display: flex; align-items: center; justify-content: center; }
.ds-kanji svg { width: 140px; height: 140px; }
.ds-gloss { display: flex; flex-direction: column; gap: 4px; }
.ds-gloss-title { font-size: 12px; color: #fff; }
.ds-gloss-body { font-size: 9.5px; color: rgba(255,255,255,.36); line-height: 1.6; white-space: pre-line; }
```

- [ ] **Step 5: Add the device copy to `dictionary.ts`**

```ts
device: {
  streak: string; charNote: string; hard: string; got: string;
  strokeLabel: string; kanjiReading: string; kanjiGloss: string;
};
```

VI: `{ streak: "7 ngày", charNote: "hàng A · nguyên âm", hard: "Khó", got: "Nhớ rồi", strokeLabel: "THỨ TỰ NÉT · KANJI N5", kanjiReading: "NHẬT", kanjiGloss: "mặt trời, ngày — 4 nét\nにち · ひ" }`

EN: `{ streak: "7 days", charNote: "A-row · vowel", hard: "Hard", got: "Got it", strokeLabel: "STROKE ORDER · N5 KANJI", kanjiReading: "NICHI", kanjiGloss: "sun, day — 4 strokes\nにち · ひ" }`

`kanjiGloss` carries a newline, which is why `.ds-gloss-body` sets `white-space: pre-line`.

- [ ] **Step 6: Write `WorkFeature.tsx` and rewrite `Work.tsx`**

`Work.tsx` renders `SectionHeader` (label `portfolio.label`, title `work.title` from §9, aside `portfolio.sub`) plus one `WorkFeature` per project. `WorkFeature` lays out copy in `grid-column: span 5` and the device stage in `grid-column: 7 / span 6`:

```css
.work-grid { align-items: center; }
.work-copy { grid-column: span 5; display: flex; flex-direction: column; gap: 24px; }
.work-title { font-family: var(--display); font-weight: 800; font-stretch: 106%; font-size: 52px; letter-spacing: -0.03em; line-height: 1; color: var(--ink); }
.work-title-row { display: flex; align-items: baseline; gap: 14px; }
.work-jp { color: var(--seal-lit); }
.work-features { list-style: none; display: flex; flex-direction: column; gap: 13px; }
.work-features li { display: flex; align-items: center; gap: 13px; font-size: 15px; color: var(--ink-2); }
.work-features svg { width: 11px; height: auto; flex: none; }
.work-features svg path { fill: var(--seal); }
.work-actions { display: flex; align-items: center; gap: 14px; padding-top: 8px; }
.work-stage {
  grid-column: 7 / span 6; background: var(--surface); height: 600px;
  display: flex; align-items: center; justify-content: center; gap: 26px; overflow: hidden;
}
@media (max-width: 959px) {
  .work-copy { grid-column: span 6; order: 2; }
  .work-stage { grid-column: span 6; order: 1; height: 520px; }
  .work-title { font-size: 42px; }
}
@media (max-width: 599px) {
  .work-copy, .work-stage { grid-column: span 1; }
  .work-stage { height: auto; padding: 28px 0; margin-inline: calc(var(--page-margin) * -1); }
  .work-title { font-size: 38px; }
  .work-actions { flex-direction: column; align-items: stretch; }
}
```

The feature bullets use the accent stroke, same path as the wordmark: `d="M6 19 L16 3 L20 5.5 L10 21.5 Z"` in `viewBox="0 0 24 22"`.

The second action is `Đọc case study` / `Read the case study`, an internal `<a href="/work/hajime">` — the route arrives in Task 10 and 404s until then. Add both strings to `portfolio` in `dictionary.ts` as `caseStudy`.

- [ ] **Step 7: Delete `PhoneMockup.tsx` and its legacy CSS**

```bash
git rm frontend/app/components/PhoneMockup.tsx
```

Delete the `/* ── WORK ── */` and `/* ── PHONE MOCKUP ── */` legacy blocks from `globals.css`.

- [ ] **Step 8: Run the gate**

```bash
cd frontend && npm run lint && npm run build
```

Expected: both exit 0.

- [ ] **Step 9: Browser assertions**

At 1440: two phones on the stage, the second nudged down 56px. Console:

```js
document.querySelectorAll('.device').length
```
Expected: `2`.

At 959:
```js
getComputedStyle(document.querySelector('.device-offset')).display
```
Expected: `"none"` — one phone.

At 390:
```js
const s = document.querySelector('.work-stage'), c = document.querySelector('.work-copy');
[s.getBoundingClientRect().top < c.getBoundingClientRect().top, Math.round(s.getBoundingClientRect().width)]
```
Expected: `[true, 390]` — stage first and full-bleed past the page margin.

Toggle to light: the phone screens keep their indigo gradient (they are the app's own palette), while the stage behind them becomes `--surface` light.

- [ ] **Step 10: Commit**

```bash
git add -A frontend/app && git commit
```

Message:

```
feat(work): rebuild the Work section around real device screens

Work becomes the spine of the page rather than section three of six: one
project at large size with two phone screens showing the actual app, and a
route into the case study.

The device screens keep the app's own indigo palette in both themes — they
are a picture of the product, not a themed surface.
```

---

## Task 6: Experience and education

**Files:**
- Create: `frontend/app/components/Experience.tsx`
- Delete: `frontend/app/components/CV.tsx`
- Modify: `globals.css`, `page.tsx`, `dictionary.ts`

**Interfaces:**
- Consumes: `SectionHeader` (Task 5); `TimelineEntry` from `lib/api.ts` (existing).
- Produces: `Experience({ experience, education }: { experience: TimelineEntry[]; education: TimelineEntry[] })` — same props `CV` took, so `page.tsx` changes only the component name.

- [ ] **Step 1: Add the section copy**

In `dictionary.ts`, rename the `cv` key to `experience` and give it:

VI: `{ label: "Kinh nghiệm · Experience", title: "Ba công ty, trước khi ra trường.", sub: "Bắt đầu đi làm từ năm hai. Backend ở cả ba nơi, hai ngôn ngữ, một lần rẽ qua frontend.", education: "Học vấn", downloadCv: "Tải CV (PDF)" }`

EN: `{ label: "Experience", title: "Three companies, before graduating.", sub: "Started working in second year. Backend at all three, two languages, one detour through frontend.", education: "Education", downloadCv: "Download CV (PDF)" }`

- [ ] **Step 2: Write `Experience.tsx`**

Rows are a 3 / 5 / 4 column split with a hairline above each. The date is the loud element:

```tsx
<section className="experience shell">
  <SectionHeader id="experience" label={t.label} title={t.title} aside={t.sub} />
  <div className="rule" />
  {experience.map((e) => (
    <Fragment key={`${e.date[lang]}-${e.org[lang]}`}>
      <div className="g12 exp-row">
        <span className="exp-date">{e.date[lang]}</span>
        <div className="exp-role">
          <span className="exp-title">{e.title[lang]}</span>
          <span className="exp-org">{e.org[lang]}</span>
        </div>
        <p className="prose exp-desc">{e.desc[lang]}</p>
      </div>
      <div className="rule" />
    </Fragment>
  ))}
  <div className="g12 edu-row">
    <span className="meta">{t.education}</span>
    <div className="edu-items">
      {education.map((e) => (
        <span className="meta edu-item" key={e.org[lang]}>
          {e.date[lang]}<br /><span className="edu-title">{e.title[lang]}</span><br />{e.org[lang]}
        </span>
      ))}
    </div>
  </div>
</section>
```

```css
.experience { padding-block: var(--section-pad); }
.exp-row { padding: 34px 0; align-items: baseline; }
.exp-date {
  grid-column: span 3;
  font-family: var(--display); font-weight: 700; font-stretch: 104%;
  font-size: 34px; letter-spacing: -0.025em; line-height: 1;
  color: var(--ink); font-variant-numeric: tabular-nums;
}
.exp-role { grid-column: span 5; display: flex; flex-direction: column; gap: 7px; }
.exp-title { font-size: 20px; font-weight: 600; color: var(--ink); }
.exp-org { font-size: 15px; color: var(--seal-lit); }
.exp-desc { grid-column: 9 / span 4; font-size: 15px; }
.edu-row { padding-top: 28px; }
.edu-row > .meta { grid-column: span 3; }
.edu-items { grid-column: span 9; display: flex; gap: 56px; }
.edu-title { color: var(--ink-2); }
@media (max-width: 959px) {
  .exp-date { grid-column: span 6; font-size: 30px; }
  .exp-role { grid-column: span 3; }
  .exp-desc { grid-column: span 3; }
  .edu-row > .meta, .edu-items { grid-column: span 6; }
}
@media (max-width: 599px) {
  .exp-row { padding: 22px 0; row-gap: 8px; }
  .exp-date, .exp-role, .exp-desc { grid-column: span 1; }
  .exp-date { font-size: 28px; }
  .exp-title { font-size: 17px; }
  .edu-row > .meta, .edu-items { grid-column: span 1; }
  .edu-items { flex-direction: column; gap: 14px; }
}
```

The dates come from the backend as pre-formatted strings (`"3/2026 — Nay"`); do not parse or reformat them.

- [ ] **Step 3: Swap in `page.tsx` and delete `CV.tsx`**

```bash
git rm frontend/app/components/CV.tsx
```

Delete the `/* ── CV / TIMELINE ── */` legacy block.

- [ ] **Step 4: Gate + assertions**

```bash
cd frontend && npm run lint && npm run build
```

At 1440, console:
```js
getComputedStyle(document.querySelector('.exp-date')).fontSize
```
Expected: `"34px"` — the dates are the loud element, not 11px metadata.

```js
document.querySelectorAll('.experience .rule').length
```
Expected: `4` — one above each of the three roles, one below the last.

At 390: each row stacks, date on its own line, and `.exp-desc` still renders.

- [ ] **Step 5: Commit**

```bash
git add -A frontend/app && git commit
```

Message:

```
feat(experience): give the work history a full-width band with large dates

Three companies before graduating is the strongest single signal on the
page and it was 13px text in a two-column grid below the fold. Dates are
now 34px on a hairline-separated row; education drops to metadata below.
```

---

## Task 7: Ranked skill tiers

**Files:**
- Create: `frontend/app/components/SkillTiers.tsx`
- Delete: `frontend/app/components/Skills.tsx`, `techIcons.tsx`
- Modify: `globals.css`, `page.tsx`, `data.ts`, `dictionary.ts`

**Interfaces:**
- Consumes: `SectionHeader`.
- Produces: `SkillTiers()` — no props. **Ranking is editorial, not backend data**, so the tiers live in `data.ts`, not in `profile.techStacks`.

- [ ] **Step 1: Add the tiers to `data.ts`**

The backend's `techStacks` groups by category (Frontend / Backend / Tools), which is exactly the flat, equal-weight structure the spec rejects. Add an editorial ranking instead:

```ts
export const SKILL_TIERS: { key: "tier1" | "tier2" | "tier3"; items: string[] }[] = [
  { key: "tier1", items: ["Java", "Spring Boot", "C# .NET", "MongoDB"] },
  { key: "tier2", items: ["TypeScript", "React", "Next.js", "REST API", "Docker", "Git"] },
  { key: "tier3", items: ["React Native", "Expo", "Tailwind", "Protobuf gRPC", "PHP Laravel", "Figma"] },
];
```

`page.tsx` stops passing `profile.techStacks` to this section. Leave `fetchProfile` and the `techStacks` field alone — the contract is unchanged, this page just no longer renders that field.

- [ ] **Step 2: Add the tier copy**

VI: `{ label: "Kỹ năng · Stack", title: "Không phải danh sách bằng nhau.", sub: "Xếp theo thứ tự thật: cái được trả tiền để làm, cái dùng thành thạo, cái đã chạm tới.", tier1: "Được trả tiền để làm", tier2: "Thành thạo", tier3: "Đã dùng qua" }`

EN: `{ label: "Skills · Stack", title: "Not a flat list.", sub: "Ranked honestly: what I'm paid to work in, what I'm fluent in, what I've touched.", tier1: "Paid to work in", tier2: "Fluent", tier3: "Have used" }`

- [ ] **Step 3: Write `SkillTiers.tsx` and its CSS**

Each tier is a hairline-separated row: label in `span 3`, items in `span 9`. **The tier is expressed in type size, not in a chip** — there are no pills here.

```css
.skills { padding-block: var(--section-pad); }
.tier-row { align-items: baseline; }
.tier-1 { padding: 34px 0; }
.tier-2 { padding: 30px 0; }
.tier-3 { padding: 26px 0; }
.tier-label { grid-column: span 3; }
.tier-1 .tier-label { color: var(--seal-lit); }
.tier-items { grid-column: span 9; display: flex; flex-wrap: wrap; }
.tier-1 .tier-items {
  gap: 14px 34px;
  font-family: var(--display); font-weight: 700; font-stretch: 106%;
  font-size: 38px; letter-spacing: -0.028em; line-height: 1.1; color: var(--ink);
}
.tier-2 .tier-items { gap: 11px 26px; font-size: 21px; font-weight: 500; color: var(--ink-2); }
.tier-3 .tier-items { gap: 9px 22px; font-size: 15px; color: var(--faint); }
@media (max-width: 959px) {
  .tier-label, .tier-items { grid-column: span 6; }
  .tier-1 .tier-items { font-size: 32px; }
}
@media (max-width: 599px) {
  .tier-label, .tier-items { grid-column: span 1; }
  .tier-row { row-gap: 14px; }
  .tier-1 .tier-items { font-size: 28px; gap: 8px 22px; }
  .tier-2 .tier-items { font-size: 17px; }
  .tier-3 .tier-items { font-size: 14px; }
}
```

- [ ] **Step 4: Delete the old skills components and CSS**

```bash
git rm frontend/app/components/Skills.tsx frontend/app/components/techIcons.tsx
```

Delete the `/* ── SKILLS ── */` legacy block. Check whether `react-icons` is still imported anywhere:

```bash
grep -rn "react-icons" frontend/app frontend/lib
```

If there are no hits, remove it from `package.json` dependencies and run `npm install`.

- [ ] **Step 5: Gate + assertions**

```bash
cd frontend && npm run lint && npm run build
```

Console at 1440:
```js
['.tier-1', '.tier-2', '.tier-3'].map(s =>
  getComputedStyle(document.querySelector(s + ' .tier-items')).fontSize)
```
Expected: `["38px", "21px", "15px"]` — the ranking is visible in the type.

```js
document.querySelectorAll('.tier-items span').length
```
Expected: `16`.

- [ ] **Step 6: Commit**

```bash
git add -A frontend/app frontend/package.json && git commit
```

Message:

```
feat(skills): rank the stack in three tiers instead of a flat chip wall

Twelve equal chips said nothing. The tier is expressed in type size —
38px for what he's paid to work in, down to 15px for what he's touched.

Ranking is editorial, so it lives in data.ts rather than the backend's
category grouping. The profile contract is unchanged.
```

---

## Task 8: Contact and footer

**Files:**
- Rewrite: `frontend/app/components/Contact.tsx`, `Footer.tsx`
- Modify: `globals.css`, `dictionary.ts`

**Interfaces:**
- Consumes: `SectionHeader`, `SealMark`, `sendContact` from `lib/api.ts` (existing).
- Produces: `Contact()`, `Footer()`.

- [ ] **Step 1: Rebuild the form as underlines**

Keep the existing submit logic in `Contact.tsx` exactly as it is — the `fetch`, the 400 `fields` map handling, the submitting and sent states. **Only the markup and CSS change.** Fields become underlines, and each gets a rendered error slot:

```css
.contact { padding-block: var(--section-pad); background: var(--surface-alt); }
.contact-copy { grid-column: span 5; display: flex; flex-direction: column; gap: 24px; }
.contact-form { grid-column: 8 / span 5; display: flex; flex-direction: column; gap: 26px; padding-top: 14px; }
.form-pair { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 26px; }
.field { display: flex; flex-direction: column; gap: 9px; }
.field-label { font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.04em; color: var(--faint); }
.field-input {
  background: none; border: none;
  border-bottom: var(--hairline) solid var(--control-border);
  padding: 0 0 11px; font-family: var(--display); font-size: 15px; color: var(--ink);
  transition: border-color var(--dur-hover) var(--ease);
}
.field-input::placeholder { color: var(--placeholder); }
.field-input:hover { border-bottom-color: var(--control-border-hover); }
.field-input:focus {
  outline: none;
  border-bottom: var(--emphasis) solid var(--seal);
  padding-bottom: 10px;
}
.field-input:focus-visible { outline: none; }
.field-error .field-input { border-bottom: var(--emphasis) solid var(--seal-lit); padding-bottom: 10px; }
.field-error .field-label { color: var(--seal-lit); }
.field-msg { font-family: var(--mono); font-size: 11px; color: var(--seal-lit); }
textarea.field-input { resize: vertical; min-height: 96px; }
.social-list { display: flex; flex-direction: column; padding-top: 12px; }
.social-row {
  display: flex; align-items: center; gap: 14px; padding: 13px 0;
  border-top: var(--hairline) solid var(--rule);
  font-size: 15px; color: var(--ink-2); text-decoration: none;
}
.social-row:last-child { border-bottom: var(--hairline) solid var(--rule); }
.social-row:hover { color: var(--ink); }
.social-key { font-family: var(--mono); font-size: 11.5px; color: var(--faint); width: 78px; flex: none; }
@media (max-width: 959px) {
  .contact-copy, .contact-form { grid-column: span 6; }
  .contact-form { order: 1; } .contact-copy { order: 2; }
}
@media (max-width: 599px) {
  .contact-copy, .contact-form { grid-column: span 1; }
  .form-pair { grid-template-columns: 1fr; gap: 22px; }
  .field-input { min-height: 44px; }
  .social-key { width: 70px; }
}
```

The focus and error rules reduce `padding-bottom` by 1px to compensate for the 1px→2px border, so the field does not jump.

- [ ] **Step 2: Render field errors**

The backend returns 400 with a `fields` map. Wherever the component already stores that, wrap each field in `<div className={errors.name ? "field field-error" : "field"}>` and render `{errors.name && <span className="field-msg">{errors.name}</span>}`. The message text comes from the backend verbatim — it is already Vietnamese.

Add `aria-invalid={Boolean(errors.name)}` and `aria-describedby` pointing at the message's `id` on each input.

- [ ] **Step 3: Rebuild the footer**

```css
.footer {
  padding: 38px var(--page-margin) 44px;
  border-top: var(--hairline) solid var(--rule);
  display: flex; align-items: center; justify-content: space-between; gap: 30px;
}
.footer-id { display: inline-flex; align-items: center; gap: 14px; }
@media (max-width: 599px) { .footer { flex-direction: column; align-items: flex-start; gap: 16px; } }
```

Left: `<SealMark size={28} />` plus copyright and location in `.meta`. Right: a `.meta` line. Add `footer.builtWith` to `dictionary.ts` — VI `"Next.js · Spring Boot · dựng bằng tay, không dùng mẫu"`, EN `"Next.js · Spring Boot · hand-built, not templated"`.

- [ ] **Step 4: Delete the legacy CSS**

Remove the `/* ── CONTACT ── */`, `/* ── FORM ── */` and `/* ── FOOTER ── */` legacy blocks.

- [ ] **Step 5: Gate + assertions**

```bash
cd frontend && npm run lint && npm run build
```

Start the backend (`cd backend && SERVER_PORT=8081 mvn spring-boot:run`) and point `frontend/.env.local` at it.

Submit the form empty. Expected: three `.field-msg` elements appear with the backend's Vietnamese messages, and the labels turn `--seal-lit`. Console:

```js
document.querySelector('.field-input').getAttribute('aria-invalid')
```
Expected: `"true"`.

Fill it in correctly and submit. Expected: the sent message renders and the button returns from its disabled state.

Console:
```js
getComputedStyle(document.querySelector('.field-input')).borderTopWidth
```
Expected: `"0px"` — underlines, not boxes.

- [ ] **Step 6: Commit**

```bash
git add -A frontend/app && git commit
```

Message:

```
feat(contact): rebuild the form as underlines and add a real error state

The no-card rule reaches the form: inputs are underlines, focus thickens
to a 2px seal rule, and a 400 renders the backend's per-field message
below the field it belongs to with aria-invalid and aria-describedby.

Submit logic is unchanged.
```

---

## Task 9: The load sequence, and deleting the motion stack

**Files:**
- Delete: `SmoothScroll.tsx`, `ScrollReveal.tsx`, `CountUp.tsx`, `ScrollProgress.tsx`
- Modify: `globals.css`, `layout.tsx`, `page.tsx`, `package.json`

- [ ] **Step 1: Delete the components and the dependency**

```bash
cd frontend
git rm app/components/SmoothScroll.tsx app/components/ScrollReveal.tsx \
       app/components/CountUp.tsx app/components/ScrollProgress.tsx
npm uninstall lenis
```

Remove their imports and usages from `layout.tsx` and `page.tsx`.

- [ ] **Step 2: Remove the noscript block**

In `layout.tsx`, delete:

```tsx
<noscript>
  <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
</noscript>
```

It exists because scroll-reveal parked elements at `opacity: 0`. Nothing does that any more — the page is complete with JavaScript off, which is the point.

- [ ] **Step 3: Delete every remaining reveal and Lenis rule**

```bash
grep -n 'reveal\|lenis\|magnetic\|scroll-progress' app/globals.css
```

Delete every rule the grep finds, plus the `.reveal`/`.reveal-d2` class names still on elements:

```bash
grep -rn 'className="[^"]*reveal' app/
```

Expected after both: no output.

- [ ] **Step 4: Add the load sequence**

```css
@keyframes an-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes an-rise-sm { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes an-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes an-stamp { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: none; } }

.hero .eyebrow svg { animation: an-stamp var(--dur-enter) var(--ease) both; }
.hero .eyebrow      { animation: an-rise-sm 200ms var(--ease) 80ms both; }
.hero-name          { animation: an-rise var(--dur-enter-lg) var(--ease) 140ms both; }
.hero-tagline       { animation: an-rise var(--dur-enter-lg) var(--ease) 200ms both; }
.hero-bio,
.hero-actions       { animation: an-fade var(--dur-enter) var(--ease) 300ms both; }
.hero-portrait      { animation: an-fade var(--dur-enter) var(--ease) 380ms both; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-delay: 0ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

The headline is one element, so lines 1 and 2 share the 140ms start rather than staggering separately — splitting the `<h1>` into two animated spans to gain 60ms is not worth the markup. Note this deviation from spec §6.

**The portrait fades and never translates** — it is the LCP element.

- [ ] **Step 5: Gate + assertions**

```bash
cd frontend && npm run lint && npm run build
```

```bash
grep -rn "lenis" frontend/app frontend/package.json
```
Expected: no output.

Reload with a throttled CPU (devtools Performance → 4× slowdown): the hero assembles once, top to bottom, and settles by roughly 620ms. Scroll the whole page — **nothing fades in on scroll**.

Enable "Emulate prefers-reduced-motion: reduce" in devtools Rendering, reload. Expected: the hero is fully visible in the first frame with no movement.

Disable JavaScript entirely and reload. Expected: the page renders complete — copy, portrait, all sections. Only the theme toggle, language toggle and mobile sheet are inert.

- [ ] **Step 6: Commit**

```bash
git add -A frontend && git commit
```

Message:

```
perf(motion): replace six motion systems with one load sequence

Deletes Lenis, scroll-reveal, count-up, the scroll progress bar and the
noscript reveal fallback. The hero now assembles once on load and
nothing animates on scroll.

Because nothing parks at opacity 0 any more, the page is complete with
JavaScript disabled.
```

---

## Task 10: The `/work/hajime` case study

**Files:**
- Create: `frontend/app/work/hajime/page.tsx`
- Create: `frontend/app/components/case/CaseHero.tsx`, `DeviceStrip.tsx`, `DecisionDiagram.tsx`, `StatusColumns.tsx`
- Modify: `globals.css`, `dictionary.ts`, `Work.tsx` (link target)

**Interfaces:**
- Consumes: `SiteNav`, `Footer`, `DeviceFrame`, `SealMark`, `.g12`, `.h2`, `.prose`, `.meta`, `.btn`, `.btn-ghost`.
- Produces: a static route at `/work/hajime`.

- [ ] **Step 1: Add `caseHajime` to `dictionary.ts`**

One nested object per block: `hero` (label, title, subtitle, facts), `problem` (label, title, body1, body2), `decision` (label, title, body1, body2, nodes, sharedTitle, sharedNote), `stack` (label), `status` (label, title, note, shippedLabel, notLabel, shipped[], notYet[]), `cta` (label, title, note, install, back).

The `status` arrays must stay honest and match the repo: shipped is kana with real Edge TTS audio, dual-run SM-2 kept in sync by shared test vectors, KanjiVG stroke order for N5, Google Sign-In with rotating refresh tokens and offline support. Not yet is 100 of 700 vocabulary items, audio for vocabulary and kanji, FCM credentials, and session minutes still a proxy.

- [ ] **Step 2: Write the route**

```tsx
import SiteNav from "../../components/SiteNav";
import Footer from "../../components/Footer";
import CaseHero from "../../components/case/CaseHero";
import DeviceStrip from "../../components/case/DeviceStrip";
import DecisionDiagram from "../../components/case/DecisionDiagram";
import StatusColumns from "../../components/case/StatusColumns";

export const metadata = {
  title: "Hajime — Hoàng Bảo Phúc",
  description: "Case study: dạy tiếng Nhật cho người Việt từ con số 0.",
};

export default function HajimePage() {
  return (
    <>
      <SiteNav />
      <main>
        <CaseHero />
        <DeviceStrip />
        {/* problem, decision, stack, status, cta */}
        <DecisionDiagram />
        <StatusColumns />
      </main>
      <Footer />
    </>
  );
}
```

`output: "export"` pre-renders this to `out/work/hajime/index.html`. No `generateStaticParams` is needed — the path is fixed.

`SiteNav`'s links are `#hash` anchors, which do not work from a sub-route. In `SiteNav`, take an optional `home?: boolean` prop defaulting to `true`; when false, render the links as `/#skills` etc. Pass `home={false}` here.

- [ ] **Step 3: Write `DecisionDiagram.tsx`**

Hairline nodes and mono labels — no stock flowchart look, no fills:

```css
.diagram { border: var(--hairline) solid var(--rule); padding: 52px 48px; }
.node {
  border: var(--hairline) solid var(--control-border); padding: 16px 18px;
  display: flex; flex-direction: column; gap: 6px; background: var(--ground);
}
.node-seal { border-color: var(--seal); }
.node b { font-family: var(--display); font-weight: 600; font-size: 15px; color: var(--ink); letter-spacing: -0.01em; }
.node span { font-family: var(--mono); font-size: 10.5px; color: var(--faint); line-height: 1.6; }
.diagram-split { display: grid; grid-template-columns: 190px 46px 1fr; align-items: center; padding-top: 26px; }
.diagram-lanes { display: flex; flex-direction: column; gap: 30px; }
.diagram-lane { display: grid; grid-template-columns: 1fr 46px 1fr; align-items: center; }
.diagram-shared {
  display: flex; align-items: center; gap: 20px;
  padding-top: 38px; margin-top: 34px; border-top: 1px dashed var(--control-border);
}
@media (max-width: 959px) {
  .diagram { padding: 32px 24px; }
  .diagram-split, .diagram-lane { grid-template-columns: 1fr; row-gap: 14px; }
  .diagram-arrow { transform: rotate(90deg); justify-self: center; }
}
```

The arrow is one inline SVG reused: `viewBox="0 0 46 16"`, `<path d="M0 8 H36" stroke="var(--control-border)" stroke-width="1.2"/><path d="M36 3 L44 8 L36 13 Z" fill="var(--control-border)"/>`, wrapped in `<span className="diagram-arrow">`.

The shared node carries `<SealMark size={26} />` plus the "both implementations run the same test vectors" line — that is the point of the diagram.

- [ ] **Step 4: Write `StatusColumns.tsx`**

Two columns, shipped left. Shipped items lead with the accent stroke; not-yet items lead with a flat 11px hairline dash — a visual distinction that does not rely on colour alone.

```css
.status-col { grid-column: span 6; display: flex; flex-direction: column; }
.status-col + .status-col { grid-column: 7 / span 6; }
.status-item {
  display: flex; gap: 14px; padding: 15px 0;
  border-top: var(--hairline) solid var(--rule); font-size: 15.5px;
}
.status-item:last-child { border-bottom: var(--hairline) solid var(--rule); }
.status-shipped .status-item { color: var(--ink-2); }
.status-notyet .status-item { color: var(--faint); }
.status-mark { flex: none; margin-top: 6px; width: 11px; }
.status-notyet .status-mark { height: 1px; background: var(--control-border); margin-top: 12px; }
@media (max-width: 959px) { .status-col, .status-col + .status-col { grid-column: span 6; } }
@media (max-width: 599px) { .status-col, .status-col + .status-col { grid-column: span 1; } }
```

- [ ] **Step 5: Point the home page at the route**

In `WorkFeature.tsx`, the secondary action becomes `<a href="/work/hajime" className="btn-ghost">`.

- [ ] **Step 6: Gate + assertions**

```bash
cd frontend && npm run lint && npm run build
ls out/work/hajime/index.html
```
Expected: the file exists. If it does not, the route is not being statically exported — check for a `"use client"` at the top of `page.tsx` (it must not be there; the metadata export requires a server component).

Serve the export and hard-refresh the deep link:

```bash
npx --yes serve out -l 4000
```
Open `http://localhost:4000/work/hajime` and press Ctrl+Shift+R. Expected: the page loads, not a 404.

At 390: the diagram's lanes stack and the arrows point downward. Console:
```js
getComputedStyle(document.querySelector('.diagram-arrow')).transform
```
Expected: a matrix, not `"none"` — the rotation applied.

Click the nav's "Sản phẩm" from this page. Expected: it navigates to `/#portfolio`, not a dead `#portfolio` on the case page.

- [ ] **Step 7: Commit**

```bash
git add -A frontend/app && git commit
```

Message:

```
feat(case): add the Hajime case study at /work/hajime

An interested reader previously had nowhere to click. This gives the
dual-run SM-2 decision a real diagram — client for latency, server as
source of truth, kept identical by shared test vectors — and an honest
status block that names what is not built.

Pre-rendered by output: export; the nav switches to /# anchors off-route.
```

---

## Task 11: Cleanup and the final gate

**Files:**
- Modify: `globals.css`, `layout.tsx`, `CLAUDE.md`

- [ ] **Step 1: Delete every remaining legacy token and rule**

```bash
cd frontend
grep -c -- '--legacy-' app/globals.css
```

Whatever the count, every one is now dead. Delete the rules that use them and the `--legacy-*` declarations themselves, then confirm:

```bash
grep -n -- '--legacy-' app/globals.css
```
Expected: no output.

- [ ] **Step 2: Drop the old font stylesheet**

Remove the Space Grotesk / Space Mono `<link>` from `layout.tsx`. Confirm nothing still asks for it:

```bash
grep -rn "Space Grotesk\|Space Mono" frontend/app
```
Expected: no output.

- [ ] **Step 3: Drive `themeColor` from the tokens**

In `layout.tsx`:

```tsx
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0D1015" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};
```

These two literals are unavoidable — the viewport export is not CSS. Add a comment tying them to `--ground` in both themes so they are updated together.

- [ ] **Step 4: Update `CLAUDE.md`**

Replace the Themes bullet, which still describes three themes and an accent that has not existed since the mint redesign:

> - **Themes:** two — dark (default) and light — switched by `data-theme` on `<html>`, stamped by a blocking head script before first paint and owned by `ThemeProvider`. Accent is the vermilion seal ink `#C8402C` (`#BC4029` on light). Design system: `docs/superpowers/specs/2026-09-02-an-redesign-spec.md`.

Add to the frontend section:

> - Routes: `/` and `/work/hajime`, both pre-rendered by `output: "export"`.
> - There is no motion library. One CSS load sequence in the hero; nothing animates on scroll.

- [ ] **Step 5: Full gate**

```bash
cd frontend && npm run lint && npm run build
```

Both exit 0. Then walk spec §10 end to end at 1440 / 960 / 600 / 390, both themes, both languages:

1. Dark and light both render; the toggle beats the OS in both directions.
2. No flash of the wrong theme on hard reload.
3. Switching to EN sets `document.documentElement.lang` to `en`.
4. The portrait is visible at 390; the sheet opens, traps focus, closes on Esc.
5. `/work/hajime` survives a hard refresh from `out/`.
6. The contact form posts; a 400 renders per-field errors.
7. `prefers-reduced-motion` leaves the page complete and still.
8. Spot-check contrast with devtools on `.prose`, `.meta` and `.exp-org` in both themes. Expected: ≥ 4.5:1 for all three. `.exp-org` uses `--seal-lit`, not `--seal` — if it reads 3.8:1, the wrong token is in use.

- [ ] **Step 6: Commit and push**

```bash
git add -A && git commit
git push origin main
```

Message:

```
chore(cleanup): remove the legacy theme and document the Ấn system

Deletes the last --legacy-* tokens and the Space Grotesk stylesheet,
drives themeColor from both themes' grounds, and corrects CLAUDE.md,
which still described three themes and an #e85d3d accent that have not
existed since the mint redesign.
```

---

## Self-review

**Spec coverage.** §1 tokens → Task 1. §2 type → Tasks 1, 3, and each section task. §3 components → Tasks 2–8, 10; every row in the spec's inventory table maps to a task. §4 deletions → Tasks 4, 5, 7, 9, 11. §5 breakpoints → Task 3 (the `--page-margin` / `--section-pad` overrides) plus per-component media queries. §6 motion → Task 9. §7 static export → Task 1 (theme script), Task 10 (route), Task 8 (form); the language row is the correction above. §8 files → the File structure table. §9 copy → Tasks 4, 5, 6, 7, 8, 10. §10 verification → Task 11 Step 5.

**Two deliberate deviations, both noted at the point of deviation:**

1. Spec §6 staggers headline lines 1 and 2 at 140ms and 200ms. Task 9 starts both at 140ms, because the headline is a single `<h1>` and splitting it into animated spans to gain 60ms is not worth the markup.
2. Spec §3 lists `SkillTiers` as consuming the backend's `techStacks`. Task 7 moves the ranking into `data.ts` instead, because ranking is editorial and the backend groups by category — the flat structure the spec rejects. The profile contract is untouched.

**One spec error corrected:** the `<html lang>` claim, handled in Task 1 Step 9.

**Type consistency.** `SealMark({size, counter, frame, decorative})` is used with those names in Tasks 3–10. `Wordmark({size})` in Tasks 2, 3. `useTheme()` returns `{theme, toggle}` in Tasks 1, 3. `SectionHeader({id, label, title, aside})` in Tasks 5, 6, 7. `DeviceFrame({children, offset})` in Tasks 5, 10. `Experience({experience, education})` matches the props `CV` took. `MobileNavSheet({open, onClose})` matches `SiteNav`'s call. `SiteNav({home})` is introduced in Task 10 and defaults to `true`, so Task 3's prop-less call stays valid.
