# Portfolio Redesign — Design Spec

**Date:** 2026-07-05
**Project:** hbp-personal-site (frontend)
**Status:** Approved design — ready for implementation planning

## Goal

Redesign the personal portfolio from its current "editorial paper / orange"
look into a **playful-but-professional** site with a distinctive **"Fresh mint
+ lime"** identity, a restructured multi-project Work section, and a new
"Currently" personality strip. This is a **restyle + restructure of the existing
Next.js app**, not a rewrite. Bilingual VI/EN and the contact-form backend flow
are preserved.

## Motivation

The current site (shipped `editorial` theme, `#e85d3d` accent) reads as polished
but generic and templated. The owner wants: a fresh visual identity, more
personality, better content structure (multiple projects + a signature touch),
and motion that adds character rather than ambient richness.

## Decisions (locked)

| Area | Decision |
|------|----------|
| Aesthetic | Playful & creative, kept professional/hireable |
| Palette | "Fresh mint + lime" (see tokens below) |
| Type | Keep Space Grotesk (headings/body) + Space Mono (labels/mono) |
| Themes | Collapse the 3-theme machinery to this one committed look |
| Structure | Add "Currently" strip; convert Work to a multi-project grid |
| Signature | "Currently" status strip |
| Motion | Playful & characterful (springy/tilt/bouncy), reduced ambient |
| Projects | Hajime + 2–3 more (owner to provide; styled placeholders otherwise) |

## Visual system — "Fresh mint + lime"

Design tokens (replace the current `:root` / theme blocks in `globals.css`):

```
--bg:      #f4f6f3   /* off-white paper */
--surface: #ffffff   /* cards */
--ink:     #12140f   /* near-black text */
--muted:   #5a6157   /* secondary text */
--faint:   #8a9184   /* tertiary text */
--accent:  #0a8f5b   /* primary green */
--accent2: #16c47f   /* bright green (gradient partner) */
--pop:     #d8f5c0   /* lime pop surface */
--pop-ink: #eaffb0   /* lime text on dark buttons */
--line:    #dfe4dc   /* borders */
--chipbg:  #eaf0e8   /* chip / pill background */
```

- **Gradient** `linear-gradient(100deg, var(--accent), var(--accent2))` used
  sparingly on the name and select accents.
- **Lime pop** is the high-energy moment: reserve for the primary button ink
  (ink-black button with lime text) and one or two highlights. Do not overuse.
- Fonts stay: `--font: 'Space Grotesk'`, `--mono: 'Space Mono'`.
- Retire `minimal` / `glow` / `editorial` `data-theme` variants and the editorial
  numbered-section counter styling. Single committed theme; no theme switching.

## Structure & sections

Order: **Nav → Hero → Currently → Skills → Work → CV → Contact → Footer**

### Hero
Large name with green→lime gradient on part of it, playful mono eyebrow
(`✦ hi, i'm`), an availability dot ("available for work"), two CTAs (primary
"View my work", ghost "Say hi 👋"), and a small stat row (years, stack, shipped
app count). Keep the avatar/portrait on the right. A single soft accent orb
replaces the heavy ambient background.

### Currently (new)
A compact, live-feeling one-liner strip below the hero, e.g.
`currently: building <x> · @ DrJoy · learning <y>`. Content lives in `data.ts`
(language-neutral where possible) / `dictionary.ts` (translatable bits) so it is
trivial to edit. Styled as a mono strip with a pulsing dot. No backend.

### Skills
Restyled chip-card grid (Frontend / Backend & API / Tools) using new tokens.
Same data source (`profile.techStacks`).

### Work (restructured)
Convert the single featured-project card into a **multi-project grid** that holds
several entries. Hajime is featured/first. Each project entry: title, chips/tags,
short blurb, feature bullets (optional), links (APK/demo/repo). The data model in
`data.ts` already has a `projects` array — extend it to render all entries in a
grid rather than only the `current` one.

**Open content item:** owner has 2–3 more projects to add. Titles/links/blurbs to
be provided during implementation; until then, render clean styled placeholder
cards the owner fills into `data.ts` (and `dictionary.ts` for VI/EN copy).

### CV
Experience + Education timeline, restyled to new tokens. Same data.

### Contact
**Behavior unchanged** — still POSTs to the Spring Boot backend
(`POST /api/contact`), same validation and success/error states. Restyle only.

### Footer
Restyled; keep social links and back-to-top.

## Motion — playful & characterful

- Springy hover lifts and subtle 3D tilt on cards; magnetic primary buttons.
- Bouncy/staggered scroll-reveals for section content and timeline.
- Jaunty animated accent underline on nav/links.
- **Reduce ambient richness:** drop (or heavily simplify) the drifting ambient
  washes and the cursor-spotlight in favor of snappier, intentional
  micro-interactions. Smooth-scroll (Lenis) may stay if it still feels good.
- Full `prefers-reduced-motion` support: all decorative motion disabled, content
  never hidden behind transforms.

## Technical approach

- **Stack unchanged:** Next.js 14 App Router, React 18, TypeScript. Reuse the
  existing component structure in `frontend/app/components/`.
- **Scope of change:**
  - `globals.css` — replace token blocks; remove multi-theme + editorial framing;
    restyle every section to the new system; rework motion utilities.
  - `layout.tsx` — set the single committed theme (remove `data-theme` switching
    if present there).
  - Components — restyle Hero, Skills, Portfolio→Work (grid), CV, Contact, Footer;
    add a new `Currently` component.
  - `data.ts` — extend `projects` to render multiple; add "Currently" content.
  - `dictionary.ts` — add translatable copy for Currently + any new microcopy;
    keep VI default.
  - Trim now-unused motion components (AmbientBackground / PointerEffects /
    Parallax) as appropriate.
- **Bilingual VI/EN preserved** throughout; Vietnamese remains default.
- **Verification:** `npm run build` + `npm run lint` + manual browser check
  (no test harness in frontend). Work directly on `main`; commit + push when the
  build/lint gate is green (per project CLAUDE.md).

## Out of scope

- Backend changes (contact API stays as-is).
- New pages / routing (remains a single page).
- CMS / dynamic project loading (projects stay content-in-code).
- About/story section and interactive-toy easter egg (considered, not selected).

## Reference

Design was explored via the visual companion; the chosen full-site mock is
`.superpowers/brainstorm/<session>/content/full-site-themes.html` (theme "B ·
Fresh mint + lime").
