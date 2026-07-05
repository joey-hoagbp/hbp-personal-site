# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Each implementing subagent building UI should also use the **frontend-design** skill for visual execution.

**Goal:** Restyle and lightly restructure the existing Next.js portfolio into a playful-but-professional "Fresh mint + lime" identity, with a new "Currently" strip and a multi-project Work grid.

**Architecture:** Pure frontend change to `hbp-personal-site/frontend`. Rework the single global stylesheet (`app/globals.css`) token system, restyle each section component, add one new component (`Currently`), replace the single-project `Portfolio` with a multi-project `Work` grid sourced from content-in-code (`app/data.ts`), and trim the ambient/spotlight motion. Backend, routing, and the contact API flow are untouched.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript. Fonts: Space Grotesk + Space Mono (already loaded). No test framework in the frontend.

## Global Constraints

- **Palette tokens (exact):** `--bg:#f4f6f3` · `--surface:#ffffff` · `--ink:#12140f` · `--muted:#5a6157` · `--faint:#8a9184` · `--accent:#0a8f5b` · `--accent2:#16c47f` · `--pop:#d8f5c0` · `--pop-ink:#eaffb0` · `--line:#dfe4dc` · `--chipbg:#eaf0e8`.
- **Fonts:** `--font:'Space Grotesk', system-ui, sans-serif` · `--mono:'Space Mono', monospace`. Do not add new font links.
- **Single committed theme.** Remove `minimal`/`glow`/`editorial` `[data-theme]` variants and the editorial numbered-section counter styling. No theme switching.
- **Bilingual VI/EN preserved.** All user-facing copy goes through `app/i18n/dictionary.ts` (keyed `vi`/`en`); language-neutral data stays in `app/data.ts`. Vietnamese remains the default.
- **Accessibility:** every decorative animation must be disabled under `@media (prefers-reduced-motion: reduce)`, and content must never be left hidden behind a transform.
- **No backend changes.** Do not touch `backend/` or the `/api/contact` and `/api/profile` contracts. Skills and CV keep coming from `fetchProfile()`; only Work moves to content-in-code.
- **Verification gate (every task):** `cd frontend && npm run build && npm run lint` must pass, then a manual browser check of the affected section at `npm run dev` (:3000). There is no unit-test harness — build + lint + visual check IS the gate.
- **Git:** work directly on `main`; commit after each task. End commit messages with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`. Push only after the final task's gate is green.

---

### Task 1: Foundation — tokens, theme cleanup, drop ambient background

Establish the new palette and remove the multi-theme + ambient machinery so every later task builds on the committed look.

**Files:**
- Modify: `frontend/app/globals.css` (`:root` block lines ~7–33; ambient CSS ~455–509; editorial overrides ~223–258, 696–708; spotlight ~523–536)
- Modify: `frontend/app/layout.tsx` (`<html data-theme>` line 25; `viewport.themeColor` line 16; remove nothing else)
- Modify: `frontend/app/page.tsx` (remove `AmbientBackground` import line 12 + usage line 21)
- Delete: `frontend/app/components/AmbientBackground.tsx`

**Interfaces:**
- Produces: the CSS custom properties listed in Global Constraints, available on `:root` for all later tasks. `page.tsx` no longer renders `<AmbientBackground/>`.

- [ ] **Step 1: Replace the token block.** In `globals.css`, replace the `:root{…}`, `[data-theme="glow"]`, and `[data-theme="editorial"]` blocks with a single `:root` defining every token from Global Constraints, plus the existing structural tokens (`--border:var(--line)`, `--max-w:1200px`, `--gap:120px`, `--r:12px`). Set `body` `background:var(--bg); color:var(--ink);`.

```css
:root{
  --bg:#f4f6f3; --surface:#ffffff; --ink:#12140f; --muted:#5a6157;
  --faint:#8a9184; --accent:#0a8f5b; --accent2:#16c47f; --pop:#d8f5c0;
  --pop-ink:#eaffb0; --line:#dfe4dc; --chipbg:#eaf0e8;
  --border:var(--line);
  --font:'Space Grotesk',system-ui,sans-serif; --mono:'Space Mono',monospace;
  --max-w:1200px; --gap:120px; --r:14px;
  --grad:linear-gradient(100deg,var(--accent),var(--accent2));
}
```

- [ ] **Step 2: Strip theme-specific rules.** Delete every `[data-theme="glow"]` and `[data-theme="editorial"]` selector block throughout `globals.css` (including the editorial `counter-reset`/`counter-increment`/`::before` numbered-section rules and the `[data-theme="editorial"]` reveal rule near the bottom). Where an editorial override was the *intended* look (e.g. dark code card), fold its declarations into the base rule so nothing regresses visually.

- [ ] **Step 3: Remove ambient + spotlight CSS.** Delete the `.ambient*` rule group (the "AMBIENT BACKGROUND" section) and the `.spotlight`/`.spotlight::after` rules (the cursor glow). Leave `.magnetic` and `.tilt` rules intact.

- [ ] **Step 4: Update layout + page.** In `layout.tsx` change `<html lang="vi" data-theme="editorial">` to `<html lang="vi">` and set `themeColor:"#f4f6f3"`. In `page.tsx` remove the `AmbientBackground` import and its `<AmbientBackground />` render. Delete `AmbientBackground.tsx`.

- [ ] **Step 5: Gate.** Run `cd frontend && npm run build && npm run lint`. Expected: both pass. Then `npm run dev`, open :3000 — page renders on off-white `#f4f6f3` with green accents, no drifting washes, no console errors.

- [ ] **Step 6: Commit.**

```bash
git add frontend/app/globals.css frontend/app/layout.tsx frontend/app/page.tsx
git rm frontend/app/components/AmbientBackground.tsx
git commit -m "redesign: fresh mint+lime tokens, drop themes + ambient bg"
```

---

### Task 2: Nav + Hero restyle

Give the hero its playful identity (gradient name, availability dot, stat row) and restyle the nav to match. Keep all existing behavior (scroll-spy, language switcher, magnetic CTA, single hero orb).

**Files:**
- Modify: `frontend/app/globals.css` (NAV ~61–83, HERO ~85–143, BUTTONS ~145–166, hero polish ~564–586)
- Modify: `frontend/app/components/Hero.tsx`
- Modify: `frontend/app/i18n/dictionary.ts` (`hero` block, both locales)
- Reference (no change): `frontend/app/components/Nav.tsx`, `AvatarCard.tsx`, `PointerEffects.tsx`

**Interfaces:**
- Consumes: tokens from Task 1; `messages[lang].hero` shape from `dictionary.ts`.
- Produces: `messages.*.hero` gains `availability:string` and `stats:{value:string;label:string}[]`. `Hero.tsx` renders them. Later tasks don't depend on Hero.

- [ ] **Step 1: Extend hero copy.** In `dictionary.ts`, add to the `hero` type and both locale objects: `availability` (vi: `"Sẵn sàng cho công việc mới"`, en: `"Available for work"`) and `stats` — an array of exactly three `{value,label}` items (vi labels `"năm KN" / "ngôn ngữ chính" / "app đã ra mắt"`, en `"yrs exp" / "core langs" / "app shipped"`; values `"2+" / "Java·C#" / "1"`). Keep existing `eyebrow`, `taglineLines`, `bio`, `viewWork`, `getInTouch`, `avatar`.

- [ ] **Step 2: Update `Hero.tsx`.** Keep the `#hero`, orb wrapper, container/grid structure. Add: (a) an availability row (a `.hero-avail` with a pulsing dot span + `{t.availability}`) above or below the eyebrow; (b) after `.hero-btns`, a `.hero-stats` list rendering `t.stats.map(...)` as `.hero-stat` (`<b>{value}</b><span>{label}</span>`). Keep the two CTAs; the primary keeps `className="btn-primary magnetic"`.

- [ ] **Step 3: Restyle in `globals.css`.** Repaint nav, hero, and buttons with the new tokens (see design intent below). The name's second line (`.name-dim`) uses `background:var(--grad); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent`. Primary button = ink-black background with lime text: `background:var(--ink); color:var(--pop-ink)`. Add `.hero-avail` (mono, `--accent`, pulsing dot via existing `dotPulse`-style keyframe) and `.hero-stats`/`.hero-stat` (flex row; `b` in `--ink`, label in `--muted`). Keep `.hero-glow-orb` but recolor to `--accent`.

Design intent: confident, roomy hero. Big gradient name, small mono eyebrow with a `✦`, one soft green orb. Buttons feel tactile (ink+lime primary, ghost outline secondary). No page-wide glow.

- [ ] **Step 4: Gate.** `npm run build && npm run lint` pass. In browser: hero shows gradient name, availability dot pulses, three stats render, CTAs styled, magnetic hover still works, VI⇄EN toggle updates all new strings.

- [ ] **Step 5: Commit.**

```bash
git add frontend/app/globals.css frontend/app/components/Hero.tsx frontend/app/i18n/dictionary.ts
git commit -m "redesign: playful hero (gradient name, availability, stats) + nav"
```

---

### Task 3: "Currently" strip (signature element)

A compact, live-feeling status line under the hero. Content-in-code so it's trivial to edit.

**Files:**
- Create: `frontend/app/components/Currently.tsx`
- Modify: `frontend/app/data.ts` (add `CURRENTLY` constant)
- Modify: `frontend/app/i18n/dictionary.ts` (add `currently` block)
- Modify: `frontend/app/page.tsx` (render `<Currently/>` between `<Hero/>` and `<Skills/>`)
- Modify: `frontend/app/globals.css` (add `.currently*` styles)

**Interfaces:**
- Consumes: tokens from Task 1; `useLang()` + `messages`.
- Produces: `CURRENTLY: { emoji: string; text: Localized }[]` exported from `data.ts` (type `Localized` from `../lib/api`). `messages.*.currently = { prefix: string }`. `Currently.tsx` default-exports a client component taking no props.

- [ ] **Step 1: Add content.** In `data.ts`, add:

```ts
import type { Localized } from "../lib/api"; // reuse existing import if present
export const CURRENTLY: { emoji: string; text: Localized }[] = [
  { emoji: "⚙️", text: { vi: "xây dựng backend tại DrJoy", en: "building backend @ DrJoy" } },
  { emoji: "📚", text: { vi: "học sâu hơn về hệ thống phân tán", en: "learning distributed systems" } },
  { emoji: "🎧", text: { vi: "nghe lo-fi khi code", en: "coding to lo-fi" } },
];
```

In `dictionary.ts` add to the `Messages` type and both locales: `currently: { prefix: string }` (vi `"hiện tại"`, en `"currently"`).

- [ ] **Step 2: Build `Currently.tsx`.** Client component. Render a `<section class="currently">` (no `id`/nav entry) with a mono prefix chip (`{t.prefix}`), then `CURRENTLY.map` into `.currently-item` spans (`{emoji}` + `{loc(item.text, lang)}`) joined by a `·` separator, and a small pulsing accent dot. Import `loc` from `../../lib/api`.

- [ ] **Step 3: Wire into page.** In `page.tsx`, import and render `<Currently />` directly after `<Hero />`.

- [ ] **Step 4: Style.** Add `.currently` (centered mono strip, `--muted` text, `--chipbg` prefix pill with `--accent`), `.currently-item` (inline-flex, gap), and a `.currently-dot` reusing a pulse keyframe. Keep it one calm line on desktop; wrap gracefully on mobile.

- [ ] **Step 5: Gate.** `npm run build && npm run lint` pass. Browser: strip appears under hero, items render with emoji, VI⇄EN switches copy, wraps cleanly at 375px width.

- [ ] **Step 6: Commit.**

```bash
git add frontend/app/components/Currently.tsx frontend/app/data.ts frontend/app/i18n/dictionary.ts frontend/app/page.tsx frontend/app/globals.css
git commit -m "redesign: add Currently status strip"
```

---

### Task 4: Skills restyle

Repaint the existing skills grid; no structural/data change.

**Files:**
- Modify: `frontend/app/globals.css` (SKILLS ~260–279, tech-stack polish ~588–593, SECTION HEADERS ~213–220)
- Reference (no change): `frontend/app/components/Skills.tsx`

**Interfaces:**
- Consumes: tokens from Task 1. No new interface.

- [ ] **Step 1: Restyle.** Repaint `.skill-group` (`background:var(--surface)`, `border:1px solid var(--line)`, `--r` radius), `.sg-label` (mono, `--accent`), `.sg-tag` (`background:var(--chipbg)`, `--muted` text, pill). Hover: green border tint + `translateY(-3px)` lift (keep existing transform). Remove any leftover `[data-theme]` shadow rules. Restyle `.section-label` (mono `--accent`), `.section-title` (`--ink`), `.section-sub` (`--muted`). Since `Skills.tsx` still passes `.spotlight`, ensure removal of `.spotlight` CSS in Task 1 leaves it a harmless no-op (it does — plain class).

- [ ] **Step 2: Gate.** `npm run build && npm run lint` pass. Browser: three skill cards on paper surface, green labels, chips readable, hover lift works, icons brand-color on hover still functions.

- [ ] **Step 3: Commit.**

```bash
git add frontend/app/globals.css
git commit -m "redesign: restyle skills section"
```

---

### Task 5: Work — multi-project grid (content-in-code)

Replace the single-project `Portfolio` with a `Work` grid rendering all projects from `data.ts`. Hajime featured; scaffold styled placeholders for the owner's other projects.

**Files:**
- Create: `frontend/app/components/Work.tsx`
- Modify: `frontend/lib/api.ts` (extend `Project` type — optional fields only)
- Modify: `frontend/app/data.ts` (add `PROJECTS: Project[]`)
- Modify: `frontend/app/i18n/dictionary.ts` (`portfolio` block: keep, add `repo`/`demo`/`live` link labels)
- Modify: `frontend/app/page.tsx` (replace `<Portfolio .../>` with `<Work projects={PROJECTS} />`; drop the `profile.projects` lookup)
- Modify: `frontend/app/globals.css` (replace PORTFOLIO block ~281–320 + featured-work polish ~595–611 with `.work-grid`/`.work-card` styles; PhoneMockup styles may remain for the featured card)
- Delete: `frontend/app/components/Portfolio.tsx`

**Interfaces:**
- Consumes: tokens; `Project`, `loc`, `Localized` from `lib/api`; `messages[lang].portfolio`.
- Produces: `Project` type gains optional `id?:string`, `repoUrl?:string`, `demoUrl?:string`, `accent?:string`, and `apkUrl` becomes optional (`apkUrl?:string`). `PROJECTS: Project[]` exported from `data.ts`. `Work.tsx` default-exports a client component `Work({ projects }: { projects: Project[] })`.

- [ ] **Step 1: Extend the type.** In `lib/api.ts`, change `Project` so `apkUrl?: string;` and add `id?: string; repoUrl?: string; demoUrl?: string; accent?: string;`. (Optional additions keep backend JSON deserialization valid.) Keep `current`, `chips`, `subtitle`, `description`, `features`.

- [ ] **Step 2: Add project data.** In `data.ts`, add a `PROJECTS: Project[]` constant. First entry = Hajime (copy the existing Hajime object out of `DEFAULT_PROFILE.projects`, add `id:"hajime"`). Then add **two placeholder entries** the owner will fill, e.g.:

```ts
{
  id: "project-2", current: false, apkUrl: "",
  title: "Project name",
  chips: [{ label: "Web App", accent: true }, { label: "Next.js", accent: false }],
  subtitle: { vi: "Mô tả ngắn", en: "Short subtitle" },
  description: { vi: "TODO — mô tả dự án", en: "TODO — describe this project" },
  features: { vi: ["Tính năng 1", "Tính năng 2"], en: ["Feature 1", "Feature 2"] },
  repoUrl: "https://github.com/joey-hoagbp/…",
},
```

Add an HTML comment above the placeholders: `// TODO(owner): replace placeholder projects with real ones`. Leave `DEFAULT_PROFILE.projects` as-is (still one entry) so the backend contract/fallback is unchanged; `PROJECTS` is the render source.

- [ ] **Step 3: Add link labels.** In `dictionary.ts` `portfolio` block (both locales), add `repo` (vi `"Mã nguồn"` / en `"Source"`), `demo` (vi `"Bản demo"` / en `"Live demo"`). Keep `downloadApk`, `comingSoon`, `label`, `title`, `sub`.

- [ ] **Step 4: Build `Work.tsx`.** Client component. Section `id="portfolio"` (keep the nav anchor + scroll-spy id) with the existing `.section-hdr` header. Then a `.work-grid` mapping `projects`. Each `.work-card` shows: chips, title (with a trailing emoji if desired), subtitle, description, feature bullets, and a `.work-links` row rendering only the links that exist (`apkUrl` → download button with `DownloadIcon`; `repoUrl` → ghost link `t.repo`; `demoUrl` → ghost link `t.demo`). Featured entry (`current:true` or index 0) may span two columns and include `<PhoneMockup />`; others are compact cards. Reuse `loc()` for localized fields. Keep `.reveal` classes for scroll-in.

- [ ] **Step 5: Wire page.** In `page.tsx`: `import Work from "./components/Work"; import { PROJECTS } from "./data";` replace `<Portfolio project={…} />` with `<Work projects={PROJECTS} />`. Remove the now-unused `Portfolio` import. Delete `Portfolio.tsx`.

- [ ] **Step 6: Style.** Replace the `.project-*` CSS with `.work-grid` (responsive: `repeat(auto-fit,minmax(300px,1fr))`, featured card `grid-column:1/-1` or a 2-col span at ≥960px) and `.work-card` (surface, `--line` border, `--r` radius, hover lift + green border tint + subtle `.tilt`-compatible transform). Style `.work-links`. Keep `.chip`/`.chip-ac` recolored to tokens. Retain `.project-visual`/`.phone-*` styles for the featured card's phone mockup (recolor container border to `--line`).

- [ ] **Step 7: Gate.** `npm run build && npm run lint` pass. Browser: Work shows Hajime featured + two placeholder cards in a responsive grid; only present links render (no empty APK button on placeholders); nav "Work"/"Sản phẩm" still scroll-spies; VI⇄EN switches all copy; grid reflows to one column on mobile.

- [ ] **Step 8: Commit.**

```bash
git add frontend/app/components/Work.tsx frontend/lib/api.ts frontend/app/data.ts frontend/app/i18n/dictionary.ts frontend/app/page.tsx frontend/app/globals.css
git rm frontend/app/components/Portfolio.tsx
git commit -m "redesign: multi-project Work grid (content-in-code)"
```

---

### Task 6: CV restyle

Repaint the experience/education timeline; no data/structure change.

**Files:**
- Modify: `frontend/app/globals.css` (CV/TIMELINE ~366–383, timeline polish ~613–626)
- Reference (no change): `frontend/app/components/CV.tsx`

**Interfaces:** Consumes tokens. No new interface.

- [ ] **Step 1: Restyle.** Repaint `.cv-col-ttl` (mono `--accent`), `.tl-dot` (`--accent`), `.tl-line` (`--line`), `.tl-date` (`--faint`), `.tl-title` (`--ink`, hover→`--accent`), `.tl-org` (`--accent`), `.tl-desc` (`--muted`). Keep the draw-in line/pop-dot reveal keyframes (retune easing if desired for bounce). Restyle the `.cv-dl .btn-ghost`.

- [ ] **Step 2: Gate.** `npm run build && npm run lint` pass. Browser: timeline reads clearly on paper, dots/line animate in on scroll, hover highlights title, both columns correct in VI/EN.

- [ ] **Step 3: Commit.**

```bash
git add frontend/app/globals.css
git commit -m "redesign: restyle CV timeline"
```

---

### Task 7: Contact restyle

Repaint the contact section and form. **Do not change any form behavior, field names, validation, or the `sendContactMessage` call.**

**Files:**
- Modify: `frontend/app/globals.css` (CONTACT ~384–403, FORM ~405–432, floating-label polish ~628–657)
- Reference (no change): `frontend/app/components/Contact.tsx`

**Interfaces:** Consumes tokens. No behavior change.

- [ ] **Step 1: Restyle.** Repaint `.contact-hdg` (`--ink`), `.hdg-accent` (gradient text via `--grad`, matching hero), `.contact-body` (`--muted`), `.soc-link`/`.soc-icon` (surface, `--line`; keep the `--brand` hover reveal). Form: `.fi` (`background:var(--surface)`, `border:var(--line)`, focus ring `--accent`), floating `.fl` labels (keep the transform-on-focus behavior; the label's cover background must be `var(--bg)` to match the new page bg — update from the old `var(--bg)`/black value). Submit button = primary ink+lime style from Task 2; keep `.btn-spinner`. Style `.form-ok`/`.form-err` with tokens.

- [ ] **Step 2: Gate.** `npm run build && npm run lint` pass. Browser: form styled on paper; floating labels animate and their background masks the border cleanly; **submit a test message with backend running** (`SERVER_PORT=8081 mvn spring-boot:run` in `backend/`, and `NEXT_PUBLIC_API_BASE_URL=http://localhost:8081` in `frontend/.env.local`) → success state renders; empty submit → error state renders. VI⇄EN copy switches.

- [ ] **Step 3: Commit.**

```bash
git add frontend/app/globals.css
git commit -m "redesign: restyle contact section + form"
```

---

### Task 8: Footer, motion polish, and final pass

Restyle the footer, tune motion to feel "playful & characterful," remove the dead spotlight branch, and do the whole-page verification.

**Files:**
- Modify: `frontend/app/globals.css` (FOOTER ~434–440, SCROLL REVEAL ~442–453, section transitions ~683–708, scrollbar ~710–713, responsive ~715–732, lang switcher ~734–765)
- Modify: `frontend/app/components/PointerEffects.tsx` (remove the `.spotlight` branch)
- Reference (no change): `frontend/app/components/Footer.tsx`, `Nav.tsx`, `ScrollReveal.tsx`, `ScrollProgress.tsx`, `SmoothScroll.tsx`

**Interfaces:** Consumes tokens. `PointerEffects` keeps its magnetic + tilt + hero-orb behavior; only the spotlight code path is removed.

- [ ] **Step 1: Footer + chrome.** Restyle `footer`, `.footer-copy` (mono `--faint`), `.footer-nav a`, `.footer-top` button, the scroll-progress bar (`background:var(--accent)`), the webkit scrollbar thumb (`--line`/`--faint`), the section-rule accent line (`--grad`), and the language switcher menu (`--surface`/`--line`) with the new tokens.

- [ ] **Step 2: Springy motion.** Retune `.reveal` and section reveals for a characterful feel: e.g. `transition: opacity .6s ease, transform .6s cubic-bezier(.2,.9,.25,1.3)` (slight overshoot) and `translateY(24px)`. Keep the `.reveal-d1/d2/d3` stagger. Ensure the `@media (prefers-reduced-motion: reduce)` block still forces `.reveal{opacity:1;transform:none;transition:none}` and disables the new easing.

- [ ] **Step 3: Remove dead spotlight code.** In `PointerEffects.tsx`, delete the `const spot = …; if (spot){…}` block (the `.spotlight` handler). Keep magnetic, tilt, and hero-orb blocks and the reduced-motion guard. Leave the harmless `spotlight` class in `Skills.tsx`/`Portfolio`→now `Work` (already removed there) — no runtime effect.

- [ ] **Step 4: Full verification.** `cd frontend && npm run build && npm run lint` — both green. `npm run dev`, then walk the whole page top-to-bottom: nav scroll-spy, hero, currently strip, skills, work grid, cv, contact (submit once), footer back-to-top. Toggle VI⇄EN and confirm every section switches. Toggle OS "reduce motion" and reload — confirm content is fully visible and animations are calm. Check 375px, 768px, 1280px widths. No console errors.

- [ ] **Step 5: Commit + push.**

```bash
git add frontend/app/globals.css frontend/app/components/PointerEffects.tsx
git commit -m "redesign: footer, springy motion, remove spotlight; final pass"
git push origin main
```

---

## Self-Review

**Spec coverage:**
- Palette/tokens → Task 1. ✓
- Keep fonts → Global Constraints + Task 1. ✓
- Collapse themes / drop editorial framing → Task 1. ✓
- Hero (gradient name, availability, stats, single orb) → Task 2. ✓
- Currently strip → Task 3. ✓
- Skills restyle → Task 4. ✓
- Multi-project Work grid + placeholders → Task 5. ✓
- CV restyle → Task 6. ✓
- Contact restyle, behavior unchanged → Task 7. ✓
- Motion (springy/magnetic/tilt, reduced ambient, spotlight removed) → Tasks 1, 2, 8. ✓
- Bilingual VI/EN preserved → every copy-touching task. ✓
- reduced-motion support → Tasks 1, 8. ✓
- Verification build+lint+browser → every task's gate. ✓
- No backend changes → Global Constraints; Work sourced from `data.ts`. ✓

**Placeholder note:** The `PROJECTS` placeholder entries in Task 5 are intentional content stubs for the owner to fill (flagged with a `TODO(owner)` comment), not plan placeholders — their structure and types are fully specified.

**Type consistency:** `Project` optional-field additions (Task 5 Step 1) are consumed by `Work.tsx` (Step 4) and `data.ts` (Step 2) with matching names (`apkUrl?`, `repoUrl?`, `demoUrl?`, `id?`, `accent?`). `Localized` reused from `lib/api` in Tasks 3 & 5. `messages.*.hero.{availability,stats}` (Task 2) and `messages.*.currently.prefix` (Task 3) match their component consumers.
