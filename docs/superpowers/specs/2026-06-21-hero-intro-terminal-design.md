# Hero intro terminal — design

**Date:** 2026-06-21
**Status:** Approved

## Goal

Replace the hero right column (the static `developer.ts` syntax-highlighted code
card **and** the three stat cards) with a single, livelier panel that is still
about Phúc: an **avatar + animated terminal** that "introduces" him line by line.

The three stat cards (`1+` / `3+` / `1`) are removed entirely.

## What it looks like

A single terminal card reusing the existing `.code-card` chrome (traffic-light
dots, dark editor styling under the `editorial` theme):

- **Header**: a round avatar, the name "Hoàng Bảo Phúc", and a green "open to
  work" status dot.
- **Body**: terminal lines that type out one at a time — each `$ command`
  followed by its output, with a blinking caret trailing the active line.

Example (EN):

```
$ whoami
Hoàng Bảo Phúc — Software Engineer
$ cat location.txt
Hà Nội, Vietnam
$ ls ~/stack
Java · C# · React · Spring Boot · MongoDB
$ ./hajime --status
✓ shipped: a Japanese-learning app
```

## Behavior

- **Typewriter on mount**: commands type at ~34ms/char, output at ~14ms/char,
  short pause between segments, blinking caret on the active line and a steady
  caret once finished.
- **Bilingual**: all lines come from the i18n dictionary, so the terminal types
  Vietnamese or English to match the language toggle and re-types when switched.
- **`prefers-reduced-motion`**: renders every line instantly (no typing), keeping
  only the blinking caret at the end.

## Implementation

- **New client component** `app/components/IntroTerminal.tsx` — owns the typing
  state and the avatar fallback. Hero's right column renders `<IntroTerminal />`
  instead of the code card + stats.
- **Avatar** at `frontend/public/avatar.jpg`, referenced through a new
  `AVATAR_SRC` constant in `data.ts`. A styled "HBP" monogram sits behind the
  image as a fallback, so a missing file never breaks the build or layout.
- **i18n**: add a `hero.terminal` entry to both `vi` and `en` in `dictionary.ts`
  (`title`, `name`, `status`, `avatarAlt`, `lines: {cmd, out}[]`) and update the
  `Messages` type. Remove the now-unused `hero.stats`.
- **Dead code removal**: delete `CODE_HTML` and the stat-card markup from
  `Hero.tsx`, the `CountUp` import from `Hero.tsx`, `HERO_STAT_NUMS` from
  `data.ts`, and the hero-stats CSS blocks. `CountUp.tsx` stays (generic reusable
  component, not feature-specific).
- **CSS** in `globals.css`: terminal header (avatar, monogram, name, status dot),
  typed-line styling (prompt/command/output), and a reduced-motion rule. Reuses
  `.code-card` / `.code-dots`.

## Verification

`npm run build` + `npm run lint`, plus a manual browser check of the typing
animation in both languages and the monogram fallback when no photo is present.
