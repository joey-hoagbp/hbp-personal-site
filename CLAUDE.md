# CLAUDE.md — hbp-personal-site

Guidance for Claude Code when working in this repository. (The parent `phuc-world/CLAUDE.md` describes the workspace; this file is authoritative for this project.)

## What this is

A single-page **bilingual (VI/EN)** personal portfolio. The one dynamic piece is a contact form that POSTs to the backend and persists to MongoDB. This is its own git repo (independent of `HajimeJapanese/` and of the `phuc-world` workspace).

Layout: `frontend/` (Next.js) · `backend/` (Spring Boot) · `docker-compose.yml` (local MongoDB) · `_design_reference/` (original design handoff, not part of the app) · `docs/superpowers/` (specs + plans).

## Working agreements

- **Execution: go subagent-driven by default.** When an implementation plan is ready, start subagent-driven execution (one fresh subagent per task, review between tasks) — do **not** ask the user to choose between subagent-driven and inline execution.
- Plans and specs live under `docs/superpowers/plans/` and `docs/superpowers/specs/` (`YYYY-MM-DD-<topic>.md`).
- **Work directly on `main`** — do not create feature branches. Commit straight onto `main` and `git push origin main` when done (run the lint + build gate first).
- End commit messages with: `Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>`.

## Frontend (`frontend/`)

Next.js 14 App Router, TypeScript, React 18. The whole page is assembled in `app/page.tsx` from `app/components/`.

- **Content & i18n:** language-neutral data (links, tech names, project metadata) is in `app/data.ts`; all translatable copy is in `app/i18n/dictionary.ts` keyed by locale (`vi`/`en`). Language state is a client Context in `app/i18n/LanguageProvider.tsx`; components read it via `useLang()`. Default language is **Vietnamese**, persisted to `localStorage` (`"lang"`); the switcher is `LangToggle.tsx`, a two-pill VI/EN control rendered by `SiteNav.tsx` (`Nav.tsx` no longer exists). It stays visible in the nav bar at every width, and a second copy renders at the foot of `MobileNavSheet.tsx` for reachability while the sheet is open below 600px.
- **Themes:** two — dark (default) and light — switched by `data-theme` on `<html>`, stamped by a blocking head script before first paint and owned by `ThemeProvider`. Accent is the vermilion seal ink `#C8402C` (`#BC4029` on light). The only colours beyond it are the Stack section's seven pigments. Design system: `docs/superpowers/specs/2026-09-02-an-redesign-spec.md`.
- Routes: `/` and `/work/hajime`, both pre-rendered by `output: "export"`.
- There is no motion library. One CSS load sequence in the hero. **The Stack section is the
  one documented exception to the accent and motion rules:** it carries seven `--pig-*` hues
  (one identity colour per technology, all AA on both grounds) beyond the seal, and one
  scroll-triggered staggered reveal driven by an `IntersectionObserver` inside `Stack.tsx`.
  The reveal's hidden state hangs off a `stack-armed` class set only after mount, so the
  static export still ships the section complete. Nothing else on the site animates on
  scroll, and no other section takes a second colour — keep it that way.

```bash
cd frontend
npm install
cp .env.local.example .env.local          # sets NEXT_PUBLIC_API_BASE_URL
npm run dev                               # :3000
npm run build                             # canonical gate — catches server/client boundary errors
npm run lint
```

There is **no test harness** in the frontend; verification is `npm run build` + `npm run lint` + manual browser check. When running the backend on a non-default port, set `NEXT_PUBLIC_API_BASE_URL` in `frontend/.env.local` to match.

### Deployment

The backend deploys to **Render** as a Docker service (Render has no native Java runtime): runtime `Docker`, root directory `backend`, Dockerfile path `./Dockerfile`, health check `/actuator/health`. `backend/Dockerfile` is multi-stage — Maven/Temurin 21 builds the jar (`-DskipTests`; tests are a local/CI gate), a JRE image runs it. `server.port` is `${PORT:8080}` so Render's injected `PORT` wins while `SERVER_PORT` still works locally. Render has no managed MongoDB — `MONGODB_URI` points at Atlas, and Atlas Network Access must allowlist the CIDR ranges from the service's **Connect → Outbound** tab. `APP_CORS_ORIGINS` must be the exact Pages origin. **`GET /api/contact` is still unauthenticated** — gate it before the public frontend points at a live backend.

The frontend deploys to **Cloudflare Pages** as a static site — root directory `frontend`, build command `npm run build`, build output directory `out`. `next.config.mjs` sets `output: "export"`, so there is **no server-side code**: never introduce `@cloudflare/next-on-pages`, edge runtime routes, route handlers or middleware without first dropping the static export. (`next-on-pages@1.13.16`, its final release, cannot even install: it pins `@cloudflare/workers-types@^4` against `wrangler@^4`'s `^5`, and peer-requires `next >=14.3.0` vs. this app's `~14.2`.) `NEXT_PUBLIC_API_BASE_URL` must be set as a build-time env var in the Pages dashboard; otherwise the build inlines the `http://localhost:8080` fallback from `lib/api.ts`. `amplify.yml` is a leftover from the earlier AWS Amplify deployment.

## Backend (`backend/`)

Spring Boot 3.4, package `com.hbp.personalsite` (`contact`, `config`, `common`). Maven (no wrapper — use a global `mvn`).

```bash
cd backend
mvn spring-boot:run                       # :8080 by default
SERVER_PORT=8081 mvn spring-boot:run      # :8080 is taken on this machine (MiniTool ShadowMaker)
mvn test                                  # ContactController slice test, no DB needed
```

API: `POST /api/contact` (store, returns 201; `name`/`email`/`message` required, `subject` optional, invalid → 400 with a `fields` map), `GET /api/contact` (list, newest first — currently open, gate before public deploy), `GET /actuator/health`. Env: `SERVER_PORT`, `MONGODB_URI` (default `mongodb://localhost:27017/hbp_personal_site`), `APP_CORS_ORIGINS` (default `http://localhost:3000`).
