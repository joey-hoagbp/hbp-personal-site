# Hoàng Bảo Phúc — Personal Site

Bilingual (VI/EN) personal portfolio for a software engineer, implemented from a
[Claude Design](https://claude.ai/design) handoff. Shipped look: the **editorial**
theme with the **`#e85d3d`** red-orange accent (the variant chosen in the design).

| Layer    | Tech                                  |
| -------- | ------------------------------------- |
| Frontend | Next.js 14 (App Router, TypeScript)   |
| Backend  | Java Spring Boot 3.4 (REST)           |
| Database | MongoDB                               |

The site itself is a single page (Hero · Skills · Portfolio · CV · Contact ·
Footer). The one dynamic piece is the **contact form**, which posts to the backend
and is stored in MongoDB.

```
hbp-personal-site/
├── frontend/            # Next.js app
├── backend/             # Spring Boot API
├── docker-compose.yml   # MongoDB for local dev
└── _design_reference/   # original design handoff (not part of the app)
```

## Prerequisites

- Node.js 18+ and npm
- JDK 21+ and Maven (or use the bundled `mvnw` once generated)
- Docker (for MongoDB) — or a local/remote MongoDB instance

## 1. Start MongoDB

```bash
docker compose up -d        # MongoDB on localhost:27017, db "hbp_personal_site"
```

No Docker? Point the backend at any MongoDB by setting `MONGODB_URI`.

## 2. Run the backend (port 8080)

```bash
cd backend
mvn spring-boot:run
```

> **Heads-up:** on this machine, port `8080` is already taken (MiniTool
> ShadowMaker's `AgentService`). Run the backend on another port and point the
> frontend at it:
>
> ```powershell
> $env:SERVER_PORT = "8081"; mvn spring-boot:run
> # then set NEXT_PUBLIC_API_BASE_URL=http://localhost:8081 in frontend/.env.local
> ```

Configuration (all optional, with sensible defaults — see `application.yml`):

| Env var             | Default                                       | Purpose                         |
| ------------------- | --------------------------------------------- | ------------------------------- |
| `SERVER_PORT`       | `8080`                                        | Port the API listens on         |
| `MONGODB_URI`       | `mongodb://localhost:27017/hbp_personal_site` | MongoDB connection string       |
| `APP_CORS_ORIGINS`  | `http://localhost:3000`                       | Allowed frontend origin(s), CSV |

### API

| Method | Path           | Description                                      |
| ------ | -------------- | ------------------------------------------------ |
| `POST` | `/api/contact` | Store a contact submission. Returns `201`.       |
| `GET`  | `/api/contact` | List submissions, newest first.                  |
| `GET`  | `/actuator/health` | Health check.                                |

`POST /api/contact` body:

```json
{ "name": "Phuc", "email": "phuc@example.com", "subject": "Hello", "message": "..." }
```

`name`, `email`, `message` are required; `subject` is optional. Invalid input
returns `400` with a `fields` map of per-field error messages.

> **Note:** `GET /api/contact` is open for local development. Put it behind
> authentication (e.g. Spring Security) before deploying publicly.

## 3. Run the frontend (port 3000)

```bash
cd frontend
npm install
cp .env.local.example .env.local   # sets NEXT_PUBLIC_API_BASE_URL
npm run dev
```

Open http://localhost:3000. Submitting the contact form persists a document to
the `contact_messages` collection; verify with `GET http://localhost:8080/api/contact`.

## Tests

```bash
cd backend && mvn test     # ContactController slice test (no DB required)
```

## Deploying the frontend (Cloudflare Pages)

`frontend/next.config.mjs` sets `output: "export"`, so the frontend is a **pure
static site** — no SSR, no route handlers, no middleware. `npm run build` writes
plain HTML/JS to `frontend/out/`, which any static host serves as-is.

Cloudflare Pages project settings:

| Setting                 | Value           |
| ----------------------- | --------------- |
| Root directory          | `frontend`      |
| Build command           | `npm run build` |
| Build output directory  | `out`           |

> **Do not use `@cloudflare/next-on-pages`.** It is the adapter for Next.js apps
> that run server code on the Workers edge runtime; a static export has no server
> code for it to adapt. Its final release (`1.13.16`) also cannot install here:
> it pins `@cloudflare/workers-types@^4` while the `wrangler@^4` it pulls in pins
> `@cloudflare/workers-types@^5` (npm `ERESOLVE`), and it peer-requires
> `next >=14.3.0` while this app is on `next ~14.2`.

Set `NEXT_PUBLIC_API_BASE_URL` as a **build-time** environment variable in the
Pages dashboard — it is inlined at build time, and without it the built site
falls back to `http://localhost:8080` (`frontend/lib/api.ts`).

`amplify.yml` is kept from the earlier AWS Amplify deployment; it is not used by
Cloudflare Pages.

## Deploying the backend (Render)

Render has **no native Java runtime**, so the API deploys as a container using
`backend/Dockerfile` (multi-stage: Maven/Temurin 21 builds the jar, a JRE image
runs it). The build skips tests — run `mvn test` locally or in CI instead.

Render service settings:

| Setting            | Value                     |
| ------------------ | ------------------------- |
| Language / Runtime | `Docker`                  |
| Root Directory     | `backend`                 |
| Dockerfile Path    | `./Dockerfile`            |
| Health Check Path  | `/actuator/health`        |

`application.yml` binds `server.port` to `${PORT:8080}`, so the app listens on
the port Render injects (default `10000`). `SERVER_PORT` still overrides it
locally, since environment variables outrank the YAML file.

Required environment variables:

| Env var             | Value                                                        |
| ------------------- | ------------------------------------------------------------ |
| `MONGODB_URI`       | MongoDB Atlas SRV string — Render has no managed MongoDB      |
| `APP_CORS_ORIGINS`  | The exact Cloudflare Pages origin, e.g. `https://…pages.dev`  |

Optional (contact-form email notifications; all four are needed for mail to
actually send — see `ContactNotifier`): `APP_MAIL_ENABLED=true`, `MAIL_HOST`,
`MAIL_USERNAME`, `MAIL_PASSWORD`, `APP_MAIL_FROM`, `APP_MAIL_TO`.

In **Atlas → Network Access**, allowlist the CIDR ranges from the Render
service's **Connect → Outbound** tab. These ranges are shared per region and are
not static per service; a dedicated static IP is a paid Render add-on.

> **Before pointing a public frontend at this:** `GET /api/contact` returns every
> stored submission with no authentication (`ContactController`). Gate it, or
> the mailbox is world-readable.

## Notes on the design port

- The CSS is a faithful port of the prototype's stylesheet; all three themes
  (`minimal` / `glow` / `editorial`) remain defined, with `editorial` set as the
  default via `data-theme` on `<html>`.
- Fonts (Space Grotesk / Space Mono) load from Google Fonts using the exact URL
  from the prototype, so Vietnamese glyphs render identically.
- Scroll-reveal animations use an `IntersectionObserver` and respect
  `prefers-reduced-motion`; content stays visible if JavaScript is disabled.
- Placeholder content (company names in `[brackets]`, example email/GitHub/
  LinkedIn) is carried over from the design — replace it with real details in
  `frontend/app/data.ts` and `frontend/app/components/`.
