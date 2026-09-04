# Ấn Redesign — Implementation Spec

**Date:** 2026-09-02
**Project:** hbp-personal-site (frontend)
**Status:** Approved design — ready for implementation planning
**Design source:** Claude Design canvas “Ấn Portfolio” (5 artboards: Home VI dark, Home 390,
Home EN light, /work/hajime, Design system). Logo canvas: “Phúc Logo System”.

## Supersedes

This replaces `2026-07-30-dark-editorial-redesign-design.md` and its plan
`2026-07-30-dark-editorial-redesign.md`, which were approved but never implemented — the
shipped `globals.css` is still the mint + lime theme. That spec's aesthetic (Newsreader +
Work Sans, periwinkle accent, dot nav, keep Lenis) is **not** carried forward. Anything
below that contradicts it wins. Delete or mark the older pair as superseded in the same
commit so the repo does not carry two competing dark specs.

## Goal

Replace the mint + lime light theme with **Ấn**: dark-first, one vermilion seal-ink accent,
structure from hairline rules on a visible 12-column grid, no cards. Add a new identity
(seal mark + `phúc` wordmark), a real mobile layout, a light theme, and a pre-rendered case
study at `/work/hajime`.

This is a restyle **and** a restructure. Bilingual VI/EN, the contact-form backend flow and
all real content are preserved. No content is invented: every string comes from `data.ts`,
`dictionary.ts` or the backend profile, except the new copy listed in §9, which is drafted
from facts already in the repo.

## Decisions (locked)

| Area | Decision |
|------|----------|
| Default theme | **Dark.** Light is a retune, not an inversion. System preference flips it; an explicit toggle beats the system. |
| Accent | One. Vermilion seal ink. No gradients, no glows, no second accent. |
| Layout primitive | Hairline rules + whitespace. **The bordered card is removed**, including from the contact form — inputs are underlines. |
| Motion | One load sequence. Lenis, glow orb, parallax, magnetic buttons, scroll-reveal, count-up and the progress bar are all **deleted**. |
| Logo | Seal mark + `phúc` wordmark (see “Phúc Logo System” canvas). Wordmark ≥ 20px, seal below that. |
| Routing | `/work/hajime` becomes a pre-rendered route. Still `output: "export"` — no middleware, no route handlers. |
| Fonts | Archivo (display + UI), Literata (prose), JetBrains Mono (all metadata). Space Grotesk and Space Mono are dropped. |
| CSS organization | Single rewritten `globals.css`, token-driven. No CSS modules, no CSS-in-JS, no Tailwind. |

---

## 1. Token block

Dark is `:root` because dark is the shipped default. Light is defined twice — once for a
system preference with no explicit choice, once for an explicit choice — so the toggle wins
in both directions. **Every token is declared in the bare `:root` block first**; the other
two blocks only redefine.

```css
:root {
  /* ── surface ─────────────────────────────── */
  --ground:            #0D1015;
  --surface:           #141A22;   /* device stage, scrolled nav */
  --raised:            #1B222C;   /* chips, VI/EN active pill */
  --surface-alt:       #111620;   /* contact band, case-study CTA band */
  --rule:              #242C37;   /* section + row hairlines */
  --rule-faint:        #1F2732;   /* inside-block hairlines (system sheet, spec rows) */
  --grid-line:         #171E27;   /* the 12-column guides behind the hero */

  /* ── ink ─────────────────────────────────── */
  --ink:               #E8E4DC;   /* headlines, primary text */
  --ink-2:             #C7CDD6;   /* lede, list items, secondary UI */
  --muted:             #9AA2AE;   /* body prose */
  --faint:             #767F8D;   /* metadata — 4.74:1 on --ground */
  --placeholder:       #4E5765;   /* empty form fields */

  /* ── controls ────────────────────────────── */
  --control-border:        #303947;
  --control-border-hover:  #4A5563;

  /* ── accent ──────────────────────────────── */
  --seal:              #C8402C;   /* SHAPES ONLY — 3.8:1 on --ground */
  --seal-lit:          #E0674E;   /* seal-coloured TEXT — 5.7:1 on --ground */
  --seal-hover:        #D8543F;
  --seal-active:       #A9351F;
  --seal-disabled-bg:  #3A2723;
  --seal-disabled-ink: #7A6259;
  --on-seal:           #0D1015;   /* text on a seal fill */

  /* ── app mockup (theme-independent) ──────── */
  --app-shell:         #15131F;
  --app-screen-from:   #1E1B4B;
  --app-screen-to:     #0F0C29;

  /* ── type ────────────────────────────────── */
  --display: 'Archivo', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --body:    'Literata', Georgia, 'Times New Roman', serif;
  --mono:    'JetBrains Mono', 'Cascadia Mono', Consolas, monospace;

  /* ── space ───────────────────────────────── */
  --sp-1: 4px;   --sp-2: 8px;   --sp-3: 12px;  --sp-4: 16px;
  --sp-5: 22px;  --sp-6: 26px;  --sp-7: 34px;  --sp-8: 48px;
  --sp-9: 64px;  --sp-10: 80px; --sp-11: 96px; --sp-12: 118px;

  --page-margin:   80px;   /* redefined per breakpoint, §5 */
  --section-pad:   118px;  /* vertical, redefined per breakpoint */
  --gutter:        24px;
  --measure:       65ch;

  /* ── shape ───────────────────────────────── */
  --r-control: 4px;
  --r-chip:    3px;
  --r-mark:    9%;    /* seal plate, as a share of its own size */
  --r-phone:   29px;
  --hairline:  1px;
  --emphasis:  2px;   /* focused input underline, active-nav indicator */

  /* ── elevation (only the device mockups) ─── */
  --shadow-device: 0 30px 60px rgba(0, 0, 0, 0.5);

  /* ── focus ───────────────────────────────── */
  --focus-ring:   2px solid var(--ink);
  --focus-offset: 3px;

  /* ── motion ──────────────────────────────── */
  --ease:       cubic-bezier(0.2, 0.7, 0.2, 1);
  --dur-hover:  120ms;
  --dur-enter:  240ms;
  --dur-enter-lg: 260ms;
}

/* Light, when the OS asks for it and the visitor has not chosen. */
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) {
    --ground:            #FFFFFF;
    --surface:           #F4F5F7;
    --raised:            #F0F2F5;
    --surface-alt:       #F4F5F7;
    --rule:              #E1E5EA;
    --rule-faint:        #EFF1F4;
    --grid-line:         #F3F5F7;

    --ink:               #14181E;
    --ink-2:             #39424F;
    --muted:             #5C6675;
    --faint:             #6B7484;   /* 4.71:1 on --ground */
    --placeholder:       #A8B0BA;

    --control-border:        #D5DAE0;
    --control-border-hover:  #A8B0BA;

    --seal:              #BC4029;   /* 5.4:1 on white — clears text on its own */
    --seal-lit:          #BC4029;   /* light needs no separate tint */
    --seal-hover:        #A9351F;
    --seal-active:       #8E2C19;
    --seal-disabled-bg:  #F0DDD8;
    --seal-disabled-ink: #C09A90;
    --on-seal:           #FFFFFF;

    --shadow-device: 0 24px 52px rgba(20, 24, 30, 0.22);
  }
}

/* Light, chosen explicitly — must also win over a dark OS. */
:root[data-theme="light"] {
  /* identical body to the media block above */
}
```

**Rules that are not negotiable.**

- `--seal` is a **shape** colour. It never sets `color` on running text. Seal-coloured type
  takes `--seal-lit`. On dark this is the difference between 3.8:1 (fails) and 5.7:1
  (passes); on light both resolve to the same value and the rule costs nothing.
- `body` sets `background: var(--ground)` explicitly.
- `themeColor` in `app/layout.tsx` is driven from the active theme's `--ground`, not the
  hard-coded `#f4f6f3` it holds today.
- No component reads a literal hex. If a value is not in this block, it does not exist.

---

## 2. Type system

One stylesheet request, replacing the Space Grotesk / Space Mono link in `layout.tsx`:

```
https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..112,400..800&family=JetBrains+Mono:wght@400;500&family=Literata:opsz,wght@7..72,400&display=swap
```

Keep the two existing `preconnect` links. Weights above are exactly what is used — nothing
is requested speculatively. Width is applied with `font-stretch` (the `wdth` axis).

| Step | Family | Weight | wdth | Size (≥1200) | Size (<600) | line-height | letter-spacing |
|---|---|---|---|---|---|---|---|
| `display/xl` — hero name | Archivo | 800 | 108% | 126px | 52px | **1.0** | −0.038em |
| `display/lg` — section h2 | Archivo | 800 | 110% | 64px | 36px | 1.02 | −0.032em |
| `display/md` — proof value, work title | Archivo | 700 | 106% | 31px | 27px | 1.0 | −0.025em |
| `display/date` — experience dates | Archivo | 700 | 104% | 34px | 28px | 1.0 | −0.025em |
| `tier/1` — lead skills | Archivo | 700 | 106% | 38px | 28px | 1.1 | −0.028em |
| `lede` | Archivo | 400 | 100% | 26px | 19px | 1.35 | 0 |
| `tier/2` — fluent skills | Archivo | 500 | 100% | 21px | 17px | 1.3 | 0 |
| `ui` — buttons, nav | Archivo | 500/600 | 100% | 14.5px | 15px | 1.2 | 0 |
| `body` | Literata | 400 | — | 17px | 15.5px | 1.72 (mobile 1.75) | 0 |
| `body/sm` | Literata | 400 | — | 15px | 14.5px | 1.8 | 0 |
| `tier/3` — touched | Archivo | 400 | 100% | 15px | 14px | 1.5 | 0 |
| `meta` | JetBrains Mono | 400 | — | 11.5px | 11px | 1.75 | 0.04em |
| `meta/label` — eyebrows | JetBrains Mono | 500 | — | 11px | 10px | 1.2 | **0.19em**, uppercase |
| `meta/xs` — in-device labels | JetBrains Mono | 400 | — | 10.5px | 9px | 1.6 | 0.03em |

**Vietnamese sets the line-height floor.** `display/xl` holds at **1.0 and no tighter**.
`ả ệ ú ỗ` stack a second mark above the cap height; tuning to 0.9 against the English
setting clips them into the line above. The English headline runs ~82% of the Vietnamese
measure at the same size — size headline blocks from the Vietnamese, and let English sit
short. Prose measure is `--measure` (65ch) in both languages.

`text-wrap: balance` on every `display/*` step. `font-variant-numeric: tabular-nums` on the
experience dates and any figure column.

---

## 3. Component inventory

Behaviour columns are 1440 / 960 / 600 / 390.

| Component | Tokens consumed | States | Responsive behaviour |
|---|---|---|---|
| **`SiteNav`** | `--ground`, `--surface`, `--rule`, `--ink`, `--muted`, `--seal`, `--on-seal` | at-top (transparent, hairline bottom); scrolled (`--surface` at 88% + `backdrop-filter: blur(18px)`); link default/hover/active | 1440–960: full links + VI/EN + theme + CTA. 600 and below: wordmark + VI/EN + menu button only |
| **`MobileNavSheet`** | `--surface-alt`, `--rule`, `--rule-faint`, `--ink`, `--seal` | closed; open; per-row active (accent stroke at row start) | **<600 only.** Full-height sheet, 48px rows, close control top-right, CTA and VI/EN at the foot. Traps focus while open; Esc closes; body scroll locked |
| **`Wordmark`** | `--ink`, `--seal` | — | 24px desktop, 21px mobile. Never below 20px — below that use `SealMark` |
| **`SealMark`** | `--seal`, `--ground` | — | Sizes 16 / 24 / 32 / 62 / 96. The counter takes the **ground**, never white. Inner frame only at ≥48px |
| **`HeroGridRules`** | `--grid-line` | decorative, `aria-hidden` | Visible ≥960. Hidden below |
| **`Hero`** | display/xl, lede, body, `--seal` | — | 1440: copy span 7, portrait span 9–12, seal overlapping the portrait's lower-left. 960: same, xl at 96px. 600: portrait **above** the copy at 240px. 390: portrait 212px, actions stack full-width |
| **`ProofRow`** | `--rule`, display/md, meta | link hover on the Hajime item | 3-up with vertical hairlines ≥960; stacked with horizontal hairlines below |
| **`CurrentlyStrip`** | meta, `--seal`, `--faint` | — | Centred one-line ≥960; left-aligned and wrapping below. **No pulse animation** |
| **`SectionHeader`** | meta/label + `SealMark` 13px, display/lg, body | — | Label + h2 span 7, aside span 9–12 ≥960; stacked below, aside dropped at <600 |
| **`WorkFeature`** | body, tier chips, `--surface`, buttons | — | Copy span 5 / stage span 7–12 ≥960. Below: stage first (full-bleed to the page margin), copy after |
| **`DeviceFrame`** | `--app-shell`, `--app-screen-*`, `--shadow-device`, `--r-phone` | — | Two phones ≥960 (second offset +56px); one phone below |
| **`ExperienceList`** | `--rule`, display/date, `--seal-lit`, body/sm | — | 3 / 5 / 4 column split ≥960; single column below with the date on its own line |
| **`EducationRow`** | meta, `--rule` | — | Two side-by-side ≥960, stacked below |
| **`SkillTiers`** | tier/1, tier/2, tier/3, `--rule`, meta | — | Label span 3 / items span 9 ≥960; label above items below. **Tier is expressed in type size, not in a chip** |
| **`ContactSection`** | `--surface-alt`, display/lg, body, `--rule` | — | Copy span 5 / form span 8–12 ≥960; stacked below with the form first |
| **`ContactForm`** | `--control-border`, `--seal`, `--placeholder`, meta | rest; focus (2px `--seal` underline); filled; error (2px `--seal-lit` + message); submitting; sent | Name/Email side by side ≥600, stacked below. **Underlines, not boxes.** Inputs 48px min height on mobile |
| **`Footer`** | `SealMark` 28px, meta, `--rule` | — | Two-up ≥960; stacked below |
| **`ThemeToggle`** | `--muted` | dark icon / light icon | Icon-only in the nav at every width |
| **`LangToggle`** | `--raised`, `--ink`, `--faint` | VI active / EN active | Two-pill control in the nav; moves into the sheet at <600 |
| **`CaseHero`** | display/xl 112px, `--rule`, meta | — | Title span 7, fact table span 9–12 ≥960; stacked below |
| **`DeviceStrip`** | `DeviceFrame` | — | Three phones ≥1200 (outer two offset +44px); two at 960; one below |
| **`DecisionDiagram`** | `--rule`, `--control-border`, `--seal`, meta | — | Hairline nodes, mono labels, SVG arrows. ≥960 as drawn; below, the two lanes stack and the arrows rotate to vertical |
| **`StatusColumns`** | `--rule`, `--seal`, `--faint` | — | Two columns ≥960 (“Đã chạy” / “Chưa xong”); stacked below, shipped first |

Every component takes its copy from `dictionary.ts` (translatable) or `data.ts`
(language-neutral). No component holds a literal user-facing string.

---

## 4. What to delete

Remove in the same pass as the restyle — leaving them running under the new skin is the
failure mode.

- `components/SmoothScroll.tsx` (Lenis) and the `lenis` dependency
- `components/PointerEffects.tsx` (glow orb, magnetic buttons)
- `components/Parallax.tsx`
- `components/ScrollReveal.tsx` and every `.reveal` / `.reveal-d2` class
- `components/CountUp.tsx`
- `components/ScrollProgress.tsx`
- `components/AvatarCard.tsx` (folded into `Hero`)
- CSS: `.hero-glow-orb*`, `.hero-rule`, `@keyframes orbDrift`, `@keyframes availPulse`,
  `.magnetic`, all `.lenis*` rules, the `<noscript>` reveal override in `layout.tsx`
- The three-theme comment header in `globals.css` and any `data-theme` remnant that is not
  the new light/dark switch

**Keep** the `IntersectionObserver` scroll-spy in `Nav.tsx` — it sets nav state, not motion.

---

## 5. Breakpoints

| Range | Columns | Page margin | Section padding | Notable |
|---|---|---|---|---|
| ≥1200 | 12 | 80px | 118px | `display/xl` 126px; portrait spans 4 columns |
| 960–1199 | 12 | 48px | 104px | `display/xl` 96px; portrait spans 4 columns |
| 600–959 | 6 | 32px | 80px | Portrait moves **above** the copy at 240px; nav still shows links |
| <600 | 1 | 24px | 64px | `display/xl` 52px; nav becomes `MobileNavSheet`; **portrait stays**, 212px |

Two live bugs this must fix, called out because the current CSS does the opposite:

- `globals.css:657` — `@media (max-width:960px){ .hero-right{display:none} }` deletes the
  portrait. The portrait is kept at every width; it moves, it does not disappear.
- `globals.css:669` — `@media (max-width:600px){ .nav-links{display:none} }` deletes
  navigation with nothing in its place. `MobileNavSheet` is that replacement.

Touch targets are **48px minimum** below 960px, buttons and form fields included.

---

## 6. Motion

One sequence, on load, once. Nothing animates on scroll. Easing is `--ease` throughout.

| Start | Element | Movement | Duration |
|---|---|---|---|
| 0 ms | Seal | `scale(.94) → 1`, `opacity 0 → 1` | 240 ms |
| 80 ms | Hero eyebrow | `translateY(8px) → 0`, fade | 200 ms |
| 140 ms | Headline line 1 | `translateY(14px) → 0`, fade | 260 ms |
| 200 ms | Headline line 2 | `translateY(14px) → 0`, fade | 260 ms |
| 300 ms | Lede, bio, actions | opacity only | 240 ms |
| 380 ms | Portrait | **opacity only** | 240 ms |

The portrait is the LCP element — fade it, never translate it, and keep it preloaded as it
is today.

Hover is 120 ms, colour only, plus `translateY(-1px)` on filled buttons. Focus is
`--focus-ring` at `--focus-offset`, never removed.

```
@media (prefers-reduced-motion: reduce)
```
collapses every duration to 0 and renders each element at its final state. Because the
sequence is a CSS animation on load — not an observer — **the page is complete and readable
with JavaScript disabled**, which is what lets the `<noscript>` block go away.

---

## 7. What the static export forces

`next.config.mjs` keeps `output: "export"`. Cloudflare Pages serves `out/`. No SSR, no
route handlers, no middleware — see the deployment section of `CLAUDE.md`.

| Feature | Constraint | Implementation |
|---|---|---|
| Theme toggle | A React effect runs after paint, so the dark page flashes light on first load | Inline a tiny blocking script in `<head>` that reads `localStorage.theme` (falling back to `matchMedia`) and stamps `data-theme` on `<html>` **before** first paint. The React toggle then only writes |
| Language toggle | **Already correct — no work needed.** `LanguageProvider.tsx:36-38` syncs `document.documentElement.lang` on every change; the `lang="vi"` in `layout.tsx` is the SSR default and stays | Leave as-is. Do not "fix" this — an earlier draft of this spec wrongly called it a defect |
| `/work/hajime` | Needs to exist as a real URL | A static route at `app/work/hajime/page.tsx`. `output: "export"` pre-renders it; no `generateStaticParams` needed for a single fixed path. Cloudflare Pages serves `out/work/hajime/index.html` |
| Contact form | The only network call on the site | Client `fetch` to `POST ${NEXT_PUBLIC_API_BASE_URL}/api/contact`, exactly as `lib/api.ts` does now. Field errors come back as the 400 `fields` map — render them into the input error state from §3 |
| Portrait | `images.unoptimized` is set, so the file ships byte-for-byte | Keep the WebP and the preload. Do not introduce `next/image` optimization |
| Fonts | No self-hosting step exists | One Google Fonts stylesheet link (§2) plus the existing preconnects |

Nothing in this design needs a server. If a later change does, it is a `output: "export"`
decision first and a design decision second.

---

## 8. Files

**New**

```
app/work/hajime/page.tsx
app/components/SealMark.tsx          Wordmark.tsx        SiteNav.tsx
app/components/MobileNavSheet.tsx    ThemeToggle.tsx     ThemeProvider.tsx
app/components/ProofRow.tsx          SectionHeader.tsx   WorkFeature.tsx
app/components/DeviceFrame.tsx       SkillTiers.tsx
app/components/case/*.tsx            (CaseHero, DeviceStrip, DecisionDiagram, StatusColumns)
```

**Rewritten:** `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `Hero.tsx`,
`Contact.tsx`, `Footer.tsx`, `Currently.tsx`, `Skills.tsx`, `Work.tsx`, `CV.tsx`
(→ `Experience.tsx`), `app/icon.svg` (→ the seal).

**Deleted:** the eight components in §4.

---

## 9. New copy

Drafted from facts already in the repo. Goes into `dictionary.ts` under the existing keys or
new ones; nothing here is a claim that is not already true.

| Key | VI | EN |
|---|---|---|
| `hero.bio` | Backend là nghề chính — Java, Spring Boot, .NET. Tôi viết hệ thống chạy được thật, rồi đóng gói nó thành sản phẩm người ta cài về máy. | Backend is the day job — Java, Spring Boot, .NET. I write systems that actually run, then package them into something people install. |
| `proof.shipped` / `.now` / `.source` | Đã phát hành / Hiện tại / Mã nguồn | Shipped / Currently / Source |
| `work.title` | Một sản phẩm, đã lên kệ. | One product, actually shipped. |
| `experience.title` | Ba công ty, trước khi ra trường. | Three companies, before graduating. |
| `skills.title` | Không phải danh sách bằng nhau. | Not a flat list. |
| `skills.tier1/2/3` | Được trả tiền để làm / Thành thạo / Đã dùng qua | Paid to work in / Fluent / Have used |

The hero stats (`hero.stats`) are **removed** from `dictionary.ts` and replaced by
`ProofRow`. `"2+ yrs / Java·C# / 1 app shipped"` volunteers the weakness; the proof row
states three checkable facts instead.

Case-study copy lives in a new `dictionary.ts` section (`caseHajime.*`). The status block
must stay honest and match reality: 100 of a planned 700 vocabulary items, kana audio real
(Edge TTS), vocab and kanji audio not yet, FCM credentials unwired, session minutes still a
proxy.

---

## 10. Verification

There is no frontend test harness. The gate is unchanged and all four steps are required:

```bash
cd frontend
npm run lint
npm run build          # canonical — catches server/client boundary errors
```

Then in a browser, at 1440 / 960 / 600 / 390:

1. Dark and light both render, and the toggle wins over the OS setting in both directions.
2. No flash of the wrong theme on a hard reload.
3. Switching to EN still sets `<html lang="en">` (a regression check — this already works).
4. The portrait is visible at 390. The nav sheet opens, traps focus, and closes on Esc.
5. `/work/hajime` loads as a real URL and survives a hard refresh from `out/`.
6. The contact form posts, and a 400 renders per-field errors.
7. `prefers-reduced-motion: reduce` leaves the page complete and still.
8. Body text clears 4.5:1 in both themes and both languages.

Work directly on `main` per project convention. Update `CLAUDE.md` in the same pass — it
still documents three themes and an `#e85d3d` editorial accent that have not existed since
the mint redesign.
