# CLAUDE.md — hbp-personal-site

Guidance for Claude Code when working in this repository. (The parent `phuc-world/CLAUDE.md` describes the workspace; this file is authoritative for this project.)

## What this is

A single-page **bilingual (VI/EN)** personal portfolio. The one dynamic piece is a contact form that POSTs to the backend and persists to MongoDB. This is its own git repo (independent of `HajimeJapanese/` and of the `phuc-world` workspace).

Layout: `frontend/` (Next.js) · `backend/` (Spring Boot) · `docker-compose.yml` (local MongoDB) · `_design_reference/` (original design handoff, not part of the app) · `docs/superpowers/` (specs + plans).

## Working agreements

- **Execution: go subagent-driven by default.** When an implementation plan is ready, start subagent-driven execution (one fresh subagent per task, review between tasks) — do **not** ask the user to choose between subagent-driven and inline execution.
- Plans and specs live under `docs/superpowers/plans/` and `docs/superpowers/specs/` (`YYYY-MM-DD-<topic>.md`).
- Default branch is `main`; create a feature branch before committing feature work.
- End commit messages with: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

## Frontend (`frontend/`)

Next.js 14 App Router, TypeScript, React 18. The whole page is assembled in `app/page.tsx` from `app/components/`.

- **Content & i18n:** language-neutral data (links, tech names, project metadata) is in `app/data.ts`; all translatable copy is in `app/i18n/dictionary.ts` keyed by locale (`vi`/`en`). Language state is a client Context in `app/i18n/LanguageProvider.tsx`; components read it via `useLang()`. Default language is **Vietnamese**, persisted to `localStorage` (`"lang"`); the switcher is a globe dropdown in `Nav.tsx`.
- **Themes:** three CSS themes (`minimal`/`glow`/`editorial`) exist; **`editorial` with accent `#e85d3d`** is the shipped default, set via `data-theme` on `<html>`.

```bash
cd frontend
npm install
cp .env.local.example .env.local          # sets NEXT_PUBLIC_API_BASE_URL
npm run dev                               # :3000
npm run build                             # canonical gate — catches server/client boundary errors
npm run lint
```

There is **no test harness** in the frontend; verification is `npm run build` + `npm run lint` + manual browser check. When running the backend on a non-default port, set `NEXT_PUBLIC_API_BASE_URL` in `frontend/.env.local` to match.

## Backend (`backend/`)

Spring Boot 3.4, package `com.hbp.personalsite` (`contact`, `config`, `common`). Maven (no wrapper — use a global `mvn`).

```bash
cd backend
mvn spring-boot:run                       # :8080 by default
SERVER_PORT=8081 mvn spring-boot:run      # :8080 is taken on this machine (MiniTool ShadowMaker)
mvn test                                  # ContactController slice test, no DB needed
```

API: `POST /api/contact` (store, returns 201; `name`/`email`/`message` required, `subject` optional, invalid → 400 with a `fields` map), `GET /api/contact` (list, newest first — currently open, gate before public deploy), `GET /actuator/health`. Env: `SERVER_PORT`, `MONGODB_URI` (default `mongodb://localhost:27017/hbp_personal_site`), `APP_CORS_ORIGINS` (default `http://localhost:3000`).
