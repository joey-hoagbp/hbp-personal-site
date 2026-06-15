# Plan: Move site content (tech stacks, projects, experience, education) into MongoDB

Date: 2026-06-15

## Goal

Today the portfolio's content is hardcoded in the frontend (`frontend/app/data.ts` for
language-neutral data, `frontend/app/i18n/dictionary.ts` for bilingual VI/EN copy). Move the
**tech stacks**, **projects**, **experience**, and **education** content into MongoDB
(`hbp_personal_site` DB, `mongodb://localhost:27017`), serve it from the Spring Boot backend, and
update the frontend to display it from the API. UI chrome (section labels/titles/subtitles, button
text, contact form copy, hero, footer) stays in `dictionary.ts` — only the four content domains move.

## Content to seed (authoritative — use exactly this)

All human-readable text is **bilingual**: stored as an embedded object `{ vi, en }` (a `Localized`
value). Tech item names are language-neutral plain strings.

### Tech stacks — collection `tech_stacks`, 3 ordered groups
1. order 0 — label `{ vi: "Frontend", en: "Frontend" }` — items: `JavaScript, TypeScript, ReactJS, NextJS, TailwindCSS`
2. order 1 — label `{ vi: "Backend & API", en: "Backend & API" }` — items: `C# (.NET), Java Spring Boot, REST API, Protobuf gRPC, MongoDB`
3. order 2 — label `{ vi: "Công cụ", en: "Tools" }` — items: `Git, Docker, Figma`

### Projects — collection `projects`, 1 document (the only current project)
- order 0, `current: true`, `title: "Hajime"`, `apkUrl: "/hajime-japanese.apk"`
- chips (ordered): `{Mobile App, accent:true}, {React Native}, {Spring Boot}, {MongoDB}, {Education}`
- subtitle:
  - vi: `Ứng dụng học tiếng Nhật cho người mới bắt đầu`
  - en: `A Japanese-learning app for beginners`
- description:
  - vi: `Ứng dụng di động giúp người Việt học tiếng Nhật từ con số 0 — từ Hiragana, Katakana đến từ vựng và Kanji JLPT N5. Bài học "dạy rồi kiểm tra" kết hợp thuật toán lặp lại ngắt quãng (SuperMemo-2) để tối ưu việc ghi nhớ.`
  - en: `A mobile app that helps Vietnamese speakers learn Japanese from zero — from Hiragana and Katakana to JLPT N5 vocabulary and Kanji. Teach-then-check lessons combine with a spaced-repetition algorithm (SuperMemo-2) to maximize retention.`
- features:
  - vi: `["Học Hiragana, Katakana, Kanji và từ vựng N5", "Ôn tập flashcard theo thuật toán SM-2 (spaced repetition)", "Âm thanh và thứ tự nét viết động (KanjiVG)", "Streak, XP, thành tích và hoạt động offline"]`
  - en: `["Learn Hiragana, Katakana, Kanji and N5 vocabulary", "Flashcard review with the SM-2 spaced-repetition algorithm", "Audio and animated stroke order (KanjiVG)", "Streaks, XP, achievements and offline support"]`

### Experience — collection `experiences`, 2 ordered (newest first)
1. order 0:
   - date `{ vi: "3/2026 — Nay", en: "3/2026 — Present" }`
   - title `{ vi: "Backend Developer (Java)", en: "Backend Developer (Java)" }`
   - org `{ vi: "DrJoy", en: "DrJoy" }`
   - desc `{ vi: "Phát triển backend với Java và Spring Boot.", en: "Backend development with Java and Spring Boot." }`
2. order 1:
   - date `{ vi: "11/2024 — 7/2025", en: "11/2024 — 7/2025" }`
   - title `{ vi: "Backend Developer (C#)", en: "Backend Developer (C#)" }`
   - org `{ vi: "Ominext", en: "Ominext" }`
   - desc `{ vi: "Phát triển backend với C# và .NET.", en: "Backend development with C# and .NET." }`

### Education — collection `education`, 2 ordered (newest first)
1. order 0:
   - date `{ vi: "2022 — 2026", en: "2022 — 2026" }`
   - title `{ vi: "Công nghệ thông tin", en: "Information Technology" }`
   - org `{ vi: "ĐH Dân lập Phương Đông", en: "Phuong Dong University" }`
   - desc `{ vi: "", en: "" }`
2. order 1:
   - date `{ vi: "2018 — 2022", en: "2018 — 2022" }`
   - title `{ vi: "Trung học phổ thông", en: "High School" }`
   - org `{ vi: "Trường PT Vùng Cao Việt Bắc", en: "Viet Bac Highland High School" }`
   - desc `{ vi: "", en: "" }`

Notes:
- The two experience descriptions are short factual lines derived from the role title (the user did
  not supply prose); `desc` is **optional** and renders only when non-empty.
- Education `desc` is intentionally empty and must not render an empty paragraph.
- Hero stats and footer are **out of scope** — leave `HERO_STAT_NUMS` and footer copy untouched.

## API shape

`GET /api/profile` returns a single aggregate document so the frontend fetches once:

```json
{
  "techStacks": [{ "label": {"vi":"…","en":"…"}, "items": ["…"] }],
  "projects":   [{ "title":"Hajime", "apkUrl":"…", "current":true,
                   "chips":[{"label":"…","accent":true}],
                   "subtitle":{"vi":"…","en":"…"}, "description":{"vi":"…","en":"…"},
                   "features":{"vi":["…"],"en":["…"]} }],
  "experiences":[{ "date":{…}, "title":{…}, "org":{…}, "desc":{…} }],
  "education":  [{ "date":{…}, "title":{…}, "org":{…}, "desc":{…} }]
}
```

All lists are ordered by the `order` field ascending. Endpoint is public (read-only), like the
existing open `GET /api/contact`.

---

## Task 1 — Backend: domain, repositories, seeder, GET /api/profile

**Scene:** `hbp-personal-site/backend` is Spring Boot 3.4, package `com.hbp.personalsite`, Maven
(global `mvn`, no wrapper). Existing feature package `contact` shows the conventions: a
`@Document` model with `@Id String id`, a `MongoRepository`, a `@Service`, a `@RestController` under
`/api/...`, DTOs as records. CORS for `/api/**` is already configured in `config/WebConfig.java`
(GET allowed). `application.yml` points at `mongodb://localhost:27017/hbp_personal_site`.

**Implement** a new feature package `com.hbp.personalsite.profile`:

1. **Embeddable `Localized`** — `record Localized(String vi, String en)` (or a small class). Used for
   all bilingual fields.
2. **Documents** (each `@Document` with `@Id String id` and an `int order`):
   - `TechStackGroup` (collection `tech_stacks`): `Localized label`, `List<String> items`.
   - `Project` (collection `projects`): `String title`, `String apkUrl`, `boolean current`,
     `List<Chip> chips` (embedded `record Chip(String label, boolean accent)`),
     `Localized subtitle`, `Localized description`,
     `LocalizedList features` where `LocalizedList` is `record LocalizedList(List<String> vi, List<String> en)`.
   - `Experience` (collection `experiences`): `Localized date, title, org, desc`.
   - `Education` (collection `education`): `Localized date, title, org, desc`.
3. **Repositories**: a `MongoRepository<…, String>` for each, exposing `findAllByOrderByOrderAsc()`.
4. **`ProfileService`**: aggregates all four (ordered) into a `ProfileResponse` record:
   `record ProfileResponse(List<TechStackGroup> techStacks, List<Project> projects,
   List<Experience> experiences, List<Education> education)`.
5. **`ProfileController`**: `@GetMapping("/api/profile")` returning `ProfileResponse`. Public/read-only.
6. **`ProfileSeeder` implements `CommandLineRunner`**: on startup, for each collection, **seed only if
   that collection's repository count is 0** (idempotent — never duplicate, never overwrite edits).
   Seed exactly the content in this plan. Mirror the Hajime "server-seeds content on first run"
   pattern. Keep the seed data in this class (or a small helper) as the source of truth.

**Tests (TDD):**
- A `ProfileControllerTest` (`@WebMvcTest(ProfileController.class)`, mock `ProfileService`) asserting
  `GET /api/profile` returns 200 and the JSON has `techStacks`, `projects`, `experiences`,
  `education` arrays with the bilingual shape (e.g. `$.techStacks[0].label.vi`,
  `$.experiences[0].org.en`). Follow the style of the existing `ContactControllerTest`.
- Do **not** introduce a DB-backed integration test (the project has no test Mongo harness; the
  existing suite is `@WebMvcTest` slice only). The seeder is exercised manually below.

**Verification (canonical gate):**
- `cd hbp-personal-site/backend && mvn test` — green (existing ContactController tests + new ones).
- Then **seed the live DB and confirm**: start the backend so the seeder runs against the local
  Mongo, hit the endpoint, and confirm the collections exist. Concretely:
  - `SERVER_PORT=8081 mvn spring-boot:run` in the background (port 8080 is taken on this machine).
  - `curl -s http://localhost:8081/api/profile` returns the four populated arrays.
  - `mongosh "mongodb://localhost:27017/hbp_personal_site" --quiet --eval "['tech_stacks','projects','experiences','education'].forEach(c=>print(c, db.getCollection(c).countDocuments()))"`
    shows counts `3, 1, 2, 2`.
  - Stop the background server afterward.
- Restarting the backend a second time must NOT duplicate documents (counts stay `3,1,2,2`).

**Commit** on `main` when green (message ends with the required Co-Authored-By trailer).

---

## Task 2 — Frontend: fetch profile from API and render it

**Scene:** `hbp-personal-site/frontend` is Next.js 14 App Router, TS, React 18. `app/page.tsx` is a
server component that composes client components `Skills`, `Portfolio`, `CV` (+ Nav/Hero/Contact/
Footer). Those three are `"use client"` and read the active locale via `useLang()` from
`app/i18n/LanguageProvider.tsx`, then pull copy from `messages[lang]` in `app/i18n/dictionary.ts`.
Language-neutral data lives in `app/data.ts`. API base + fetch helpers live in `lib/api.ts`
(`API_BASE` falls back to `http://localhost:8080`). There is **no frontend test harness**; the gate
is `npm run build` + `npm run lint`.

**Implement:**

1. **`lib/api.ts`** — add profile types and a fetcher:
   - `type Localized = { vi: string; en: string }` and a `loc(v: Localized, lang: Lang)` helper
     (import `Lang` type), or a tiny inline accessor — keep it simple and exported for reuse.
   - Types mirroring the API: `TechStackGroup`, `Chip`, `Project`, `TimelineItem`
     (`{ date; title; org; desc: Localized }`), and `Profile`
     (`{ techStacks; projects; experiences; education }`).
   - `async function fetchProfile(): Promise<Profile>` — `fetch(\`${API_BASE}/api/profile\`,
     { next: { revalidate: 300 } })`. On any error or non-OK response, **throw** (the caller in
     page.tsx handles fallback) — keep this function focused on fetching.
2. **`app/data.ts`** — replace `SKILL_GROUP_ITEMS` and `PROJECT_META` with a single exported
   `DEFAULT_PROFILE: Profile` containing exactly the plan's content (this is the offline fallback so
   the page always renders if the backend is down). Keep `SOCIAL_LINKS` and `HERO_STAT_NUMS` as they
   are. Remove the now-unused exports and fix all importers.
3. **`app/i18n/dictionary.ts`** — remove the data that is now dynamic:
   - `skills.groupLabels`, the whole `portfolio.project` object, `cv.experience`, `cv.education`,
     and the now-unused `TimelineEntry` type.
   - **Keep** UI chrome: `skills.{label,title,sub}`, `portfolio.{label,title,sub,downloadApk,comingSoon}`,
     `cv.{label,title,colExperience,colEducation,downloadCv}`, and everything for nav/hero/contact/footer.
   - Update the `Messages` type accordingly.
4. **`app/page.tsx`** — make it an `async` server component: `const profile = await fetchProfile().catch(() => DEFAULT_PROFILE)`.
   Pass the relevant slice to each component as a prop: `<Skills groups={profile.techStacks} />`,
   `<Portfolio project={profile.projects.find(p => p.current) ?? profile.projects[0]} />`,
   `<CV experience={profile.experiences} education={profile.education} />`.
   (Hero/Contact/Footer/Nav unchanged.)
5. **`Skills.tsx`** — accept `groups: TechStackGroup[]` prop; render group label via
   `loc(group.label, lang)` and items as tags. Drop the `SKILL_GROUP_ITEMS`/`groupLabels` usage.
   Keep the existing class names and reveal-delay pattern.
6. **`Portfolio.tsx`** — accept `project: Project` prop; render `project.title`, chips from
   `project.chips`, and `loc(project.subtitle, lang)`, `loc(project.description, lang)`,
   `project.features[lang]`. Keep the APK button logic (`apkUrl` empty → coming-soon) and PhoneMockup.
7. **`CV.tsx`** — accept `experience: TimelineItem[]` and `education: TimelineItem[]` props; the
   `TLItem` renders `loc(item.date,lang)`, `loc(item.title,lang)`, `loc(item.org,lang)`, and
   `loc(item.desc,lang)` **only when non-empty** (so empty education descriptions don't render an
   empty `<p>`). Keep the timeline/spine markup.

**Constraints:**
- Keep all existing CSS class names and DOM structure so the editorial theme styling is unchanged.
- Components stay `"use client"` and keep using `useLang()` for locale; data arrives via props.
- Do not change Hero stats, Contact, Nav, Footer, or themes.

**Verification (canonical gate):**
- `cd hbp-personal-site/frontend && npm run build` — succeeds (catches server/client boundary errors).
- `npm run lint` — clean.
- Manual: with the backend seeded and running on 8081 (set `NEXT_PUBLIC_API_BASE_URL=http://localhost:8081`
  in `.env.local`), `npm run dev` shows the new tech groups, the Hajime project, DrJoy/Ominext
  experience and the two schools, and the VI/EN switch flips all of it. With the backend down, the
  page still renders from `DEFAULT_PROFILE`.

**Commit** on `main` when the build + lint gate is green.

---

## Out of scope / explicitly unchanged
- Hero stat numbers and footer copy.
- Contact feature (model, controller, form) — untouched.
- Themes, Nav, PhoneMockup.
- No authentication gating added (the read-only profile endpoint is public, consistent with the
  existing open `GET /api/contact`).
