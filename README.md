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
