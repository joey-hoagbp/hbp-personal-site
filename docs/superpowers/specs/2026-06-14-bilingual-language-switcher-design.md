# Bilingual Language Switcher — Design

**Date:** 2026-06-14
**Project:** hbp-personal-site / frontend (Next.js 14 App Router)
**Status:** Approved

## Goal

Make the portfolio site bilingual (Vietnamese / English) with a language switcher
in the header. The site is currently Vietnamese-first with some English mixed in
and all copy hardcoded across components. Visitors can switch language at any time;
the choice is remembered.

## Decisions

- **Default language:** Vietnamese. A manual switch is remembered in
  `localStorage` and restored on the next visit.
- **Switcher UI:** A globe dropdown in the nav (`🌐 VI ▾` → `Tiếng Việt ✓` /
  `English`).
- **No new dependencies.** Custom React Context + a dictionary object, not
  `next-intl` or i18next.

## Approach

Client-side language Context + a central translation dictionary. Switching
re-renders the page instantly with no reload and no routing changes.

Alternatives rejected:

- **`next-intl` with `/vi` `/en` routes** — restructures routing for SEO that a
  single-page personal portfolio does not need (YAGNI).
- **Cookie + server components** — every toggle forces a full page reload (janky).

Trade-off accepted: the text-rendering components become `"use client"`. For a
static portfolio this is costless — content still renders into the DOM and the
components are small.

## Architecture

### New files

- `app/i18n/dictionary.ts`
  - `export type Lang = "vi" | "en"`
  - `export const messages: Record<Lang, Messages>` — every translatable string,
    grouped by section: `nav`, `hero`, `skills`, `portfolio`, `cv`, `contact`,
    `footer`. The `vi` side is lifted verbatim from today's hardcoded strings; the
    `en` side is authored as part of this work.
  - Also holds the translatable structured data (see Data split): hero stat
    labels, skill group labels, experience/education entries, project copy.

- `app/i18n/LanguageProvider.tsx` (`"use client"`)
  - React Context providing `{ lang, setLang }`.
  - On mount, reads `localStorage.getItem("lang")`; falls back to `"vi"` for any
    missing/invalid value.
  - `setLang` writes `localStorage` and updates `document.documentElement.lang`.
  - `export function useLang()` — throws if used outside the provider.

### Data split (`app/data.ts`)

Language-neutral data stays in `data.ts`:

- `SOCIAL_LINKS` (emails / URLs / icon keys)
- skill **item** names (`"React"`, `"Node.js"`, …)
- project `chips`, `apkUrl`

Translatable data moves into `dictionary.ts` (per locale):

- skill **group** labels (the dual `"Ngôn ngữ / Languages"` collapses to one
  language each)
- `HERO_STATS` labels (the numbers stay neutral; only `lbl` translates)
- all `EXPERIENCE` / `EDUCATION` entries (`date`, `title`, `org`, `desc`)
- project `subtitle`, `description`, `features`
- the existing dual section labels (`"Kỹ Năng / Skills"` → `"Kỹ Năng"` / `"Skills"`)

### Component changes

- `app/layout.tsx` — wrap `{children}` in `<LanguageProvider>`. `<html lang>`
  starts `"vi"` (server render) and is updated client-side on switch.
- `app/components/Nav.tsx` — add the globe dropdown; nav link labels come from the
  dictionary. Already a client component.
- `app/components/{Hero,Skills,Portfolio,CV,Contact,Footer}.tsx` — become
  `"use client"` and read copy via `useLang()` + `messages[lang]`.
- `app/globals.css` — styles for the globe dropdown, matching the editorial theme
  (accent `#e85d3d`).

## Data flow

1. Server renders the page in Vietnamese (the default), so there is no flash of
   missing content.
2. `LanguageProvider` mounts, reads the remembered language, and re-renders if it
   differs from the default.
3. Selecting a language in the dropdown calls `setLang`, which updates context
   (instant re-render), `localStorage`, and `document.documentElement.lang`.

## Edge cases

- **No/invalid `localStorage` value** → default to `"vi"`.
- **`localStorage` unavailable** (privacy mode) → fall back to in-memory state;
  switching still works for the session, just isn't remembered.
- **`<html lang>` accuracy** — kept in sync so screen readers and the browser get
  the right language.

## Testing

The frontend has no test harness today, and this change adds none (out of scope).
Verification:

- `npm run lint` — clean
- `npm run build` — succeeds (catches the server/client component boundary issues)
- Manual: load site (VI), switch to EN (all sections translate, `<html lang>`
  becomes `en`), reload (stays EN), switch back to VI.

## Out of scope

- A CV PDF per language (the `Tải CV (PDF)` link currently points at `#`).
- Locale-based URLs / SEO `hreflang`.
- Persisting language server-side or per-account.
- Any backend change.
