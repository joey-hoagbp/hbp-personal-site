# Dark Editorial Redesign — Design Spec

**Date:** 2026-07-30
**Project:** hbp-personal-site (frontend)
**Status:** Approved design — ready for implementation planning

## Goal

Replace the current "Fresh mint + lime" light theme with the **dark editorial**
design imported from the Claude Design project `hbp-personal-site`
(`Personal Site.html`): near-black canvas, Newsreader serif + Work Sans,
periwinkle accent, and a six-section editorial layout.

This is a **restyle + restructure of the existing Next.js app**, not a rewrite.
Bilingual VI/EN, the contact-form backend flow, and all real content are
preserved.

## Source of truth

The imported design file defines the target aesthetic. It ships with
**placeholder content** (a fictional "NihonGo" app, "Company Name" employers,
`hello@baophuc.dev`, invented metrics like 40k downloads / 4.8 rating / 68%
retention). **None of that placeholder content is adopted.** Only the visual
system and layout structure are taken; every string comes from the real
`data.ts` / `dictionary.ts` / backend profile.

## Decisions (locked)

| Area | Decision |
|------|----------|
| Fidelity | Full redesign — adopt palette, type and all six sections; fold in the features the design file doesn't cover |
| VI/EN switcher | Kept, moved into the editorial top nav |
| Contact form | Kept, placed beside the big contact headline |
| Education | Kept, as a second timeline in the CV section |
| New copy | Drafted from real facts already in the repo; lives in `dictionary.ts` |
| Motion | Design's dot nav + progress bar + reveal timing; **keep** Lenis; **drop** magnetic / tilt / parallax / glow orb |
| CSS organization | Single rewritten `globals.css` — no CSS modules, no per-section files |

## Visual system

Design tokens replacing the current `:root` block in `globals.css`:

```
--bg:        #0d0d12                      /* near-black canvas */
--bg2:       #131319                      /* raised surface */
--ink:       #f2efe9                      /* warm off-white text */
--ink-dim:   #a9a5b3                      /* secondary text */
--line:      rgba(242,239,233,.14)        /* hairline borders */
--accent:    #8f88ff                      /* periwinkle */
--accent-dim:#6c63ff                      /* deeper periwinkle (selection, glow) */
```

Typography:

- `--serif: 'Newsreader', serif` — display names, section headlines, timeline
  dates, numerals. Italic is the signature: the hero surname, work title,
  contact headline and stat figures are all italic serif.
- `--font: 'Work Sans', sans-serif` — body copy at weight 300, UI at 400–500.
- **`--mono` (Space Mono) is retired entirely.** The design expresses micro-labels
  as tracked uppercase Work Sans (`11–13px`, `letter-spacing .08–.18em`), not
  monospace. Every `var(--mono)` usage is converted.

Both families carry a `vietnamese` Google Fonts subset, which is required —
Vietnamese is the default locale.

`layout.tsx` swaps the Space Grotesk / Space Mono `<link>` for Newsreader
(400,500 + italics) / Work Sans (300,400,500,600), and `viewport.themeColor`
becomes `#0d0d12`.

Carried over from the current stylesheet, restyled: the Lenis block, the
`prefers-reduced-motion` blocks, and the `::-webkit-scrollbar` rule.

## Page structure

```
<ScrollProgress/> <ScrollReveal/> <Nav/> <DotNav/>
<main>  Hero → Story → Skills → Work → CV → Contact  </main>
<Footer/>
```

Section ids stay `#hero #story #skills #portfolio #cv #contact` so existing nav
anchors, `SECTION_IDS` scroll-spy and deep links keep working.

### Nav

The design's `mix-blend-mode: difference` is **deliberately not adopted**. It
creates a stacking context that would make the language dropdown blend against
the page behind it and render wrong. Instead: Newsreader-italic "Bảo Phúc" mark
on the left; tracked-uppercase section links plus the globe/lang button on the
right. Existing scroll-spy, outside-click and Escape handling are unchanged.

### Hero

Eyebrow rule + label (`hero.eyebrow`), then the name at
`clamp(56px, 9vw, 140px)` — `Hoàng Bảo` on line one, italic `--ink-dim`
`Phúc.` on line two. Bio becomes `.hero-sub`. The three `hero.stats` render as
italic serif figures in accent over tracked uppercase labels.

The design has no hero CTAs. **Both existing CTAs are kept**, restyled as
underlined editorial links — losing every call to action above the fold would be
a real regression. Scroll cue anchors the bottom-left.

### Story (new section)

Two-column grid: `public/avatar.jpg` in a 4/5 portrait with the design's accent
corner brackets, beside the "About" label, dropcap paragraphs, and a three-cell
meta strip (Based in / Focus / Currently).

The `CURRENTLY` array in `data.ts` feeds the "Currently" cell, so that content
survives the deletion of the `Currently` strip component rather than being lost.

### Skills

The three `profile.techStacks` groups become numbered editorial rows
(`01 / 02 / 03`): italic serif numeral, serif headline (the group label), a
one-line description, and the tag pills.

Descriptions live in `dictionary.ts` as `skills.rows[]` and zip with the API
groups **by index**. If the backend ever returns a different group count, the
extra groups render without a description rather than crashing — no
description is ever shown against the wrong group.

Tech icons stay inside the tag pills. They are real assets the design file has
no knowledge of, and dropping them would lose information.

### Work

Hajime gets the design's full-bleed gradient band: "Featured Work" label, italic
serif title, description, feature list, chips, and the Download-APK CTA, beside
`PhoneMockup` restyled to the design's 290×590 device.

The design's `work-stats` row is **dropped** — those numbers (downloads, rating,
retention) do not exist for this project and will not be invented.

The remaining `PROJECTS` entries render below the featured band as minimal rows
in the skill-row idiom (index, title, chips, links), not as cards. The two
current entries are still `TODO(owner)` placeholders.

### CV

The design's single bordered timeline, run twice — Experience, then Education —
each under a tracked uppercase column label. Timeline items use the design's
form: italic serif accent date, title, org, description. The Download-CV button
is retained.

### Contact

Big italic serif headline (`headingLine1` + accent `headingAccent`), then two
columns: social links in the design's uppercase-underline style, and the form
beside them.

Inputs become bottom-border-only on the dark surface with the floating-label
behaviour adapted to the new palette. **`handleSubmit` and `sendContactMessage`
are untouched** — same payload, same endpoint, same error and success states.

### Footer

The design's form: `©` line and city, tracked uppercase micro type above a
hairline border. The back-to-top button is retained.

## File changes

**New**
- `app/components/Story.tsx`
- `app/components/DotNav.tsx`

**Deleted**
- `app/components/PointerEffects.tsx` (magnetic + tilt)
- `app/components/Parallax.tsx`
- `app/components/AvatarCard.tsx` (folded into `Story`)
- `app/components/Currently.tsx` (content moves to the story meta strip)
- `app/components/CountUp.tsx` (already dead — nothing imports it)

**Modified**
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `app/i18n/dictionary.ts`, `app/data.ts`
- `app/components/`: `Nav`, `Hero`, `Skills`, `Work`, `PhoneMockup`, `CV`,
  `Contact`, `Footer`, `ScrollProgress`, `ScrollReveal`

**Untouched**
- `lib/api.ts`, `app/i18n/LanguageProvider.tsx`, `app/components/icons.tsx`,
  `app/components/techIcons.tsx`
- The entire `backend/` module and the contact API contract

## New copy

Drafted in VI + EN, grounded only in facts already present in the repo:
backend developer (Java) at DrJoy since 3/2026, previously C#/.NET at Ominext,
built Hajime, Information Technology at Phuong Dong University, based in Hà Nội.

Two About paragraphs in an editorial register, and one description line per
skill row. All of it lands in `dictionary.ts` under new `about` and
`skills.rows` keys so the owner can edit it in one place.

## Verification

The frontend has no test harness. The gate is:

1. `npm run lint` — clean
2. `npm run build` — succeeds (catches server/client boundary errors, which
   matter here because several components are being restructured)
3. Browser pass in **both locales**, at desktop and ≤600px widths, confirming:
   - language switch re-renders every new string, including About and skill rows
   - contact form submits and shows both the success and error states
   - dot nav scrolls to each section and tracks the active one
   - `prefers-reduced-motion` leaves no content stuck invisible behind a reveal
   - Vietnamese diacritics render correctly in Newsreader and Work Sans

## Out of scope

- Any backend change
- Replacing the two `TODO(owner)` placeholder projects with real ones
- A real CV PDF behind the Download-CV button (still `href="#"`)
- Adding a mobile menu for the nav links (they hide below 600px today; that
  behaviour is unchanged)
