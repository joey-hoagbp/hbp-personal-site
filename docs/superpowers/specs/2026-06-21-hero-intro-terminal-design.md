# Hero avatar card — design

**Date:** 2026-06-21
**Status:** Implemented

## Goal

Replace the hero right column (the static `developer.ts` syntax-highlighted code
card and the three stat cards) with an **avatar-first** panel: the photo is the
focal point, supported by light personal info, and it must sit comfortably in the
site's light editorial theme.

> **Revision note:** the first build of this used a dark animated "intro
> terminal." It was rejected — too busy and it clashed with the light theme. The
> shipped design is the editorial avatar card below.

## What it looks like

An **editorial offset frame** — a classic magazine device that makes the portrait
the hero:

- A portrait photo (`aspect-ratio: 4/5`, `object-fit: cover`) in a light card.
- A **solid accent block** (`--accent` `#e85d3d`) sits behind the photo, nudged
  14px down-and-right, giving depth without a heavy drop shadow. On hover it eases
  toward the photo (14px → 8px).
- An **"Open to work"** status pill (mono, pulsing green dot) over the bottom-left
  of the photo, on a blurred light backdrop.
- A **mono credit caption** below: `— HOÀNG BẢO PHÚC` (uppercase, tracked) and a
  muted `role · location` line.

Everything derives from the existing editorial tokens (`--bg2`, `--fg`, `--fg2`,
`--accent`, `--border`, `--r`, `--mono`); no new palette.

## Behavior

- **Bilingual** — name, role, location, status and alt text come from
  `hero.avatar` in the i18n dictionary (vi/en) and switch with the language toggle.
- **Avatar fallback** — if `avatar.jpg` is missing, an "HBP" monogram shows in its
  place (via `onError`), so the layout never breaks.
- **`prefers-reduced-motion`** — the status-dot pulse and the hover transition are
  disabled.

## Implementation

- **Component** `app/components/AvatarCard.tsx` (client; owns the image fallback).
  Hero's right column renders `<AvatarCard />`.
- **Avatar** at `frontend/public/avatar.jpg`, referenced via `AVATAR_SRC` in
  `data.ts`. Rendered with `next/image` (`fill`).
- **Static export**: `next.config.mjs` sets `images: { unoptimized: true }` —
  `output: "export"` cannot run the Image Optimization API.
- **i18n**: `hero.avatar` (`name`, `role`, `location`, `status`, `alt`) in both
  locales; `Messages` type updated. The old `hero.stats` / `hero.terminal` removed.
- **Removed**: the `developer.ts` code card, the stat cards, `HERO_STAT_NUMS`, and
  the `CountUp` usage in Hero. (`CountUp.tsx` kept — generic reusable component.)
- **CSS** in `globals.css`: the `.avatar-*` block (frame, accent, photo, status
  pill, caption) plus a reduced-motion rule. Reuses the editorial tokens.

## Verification

`npm run build` + `npm run lint` (both clean), plus a browser check of the photo,
the offset frame, the hover, the monogram fallback, and both languages.
