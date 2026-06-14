# Bilingual Language Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the hbp-personal-site frontend bilingual (Vietnamese / English) with a globe-dropdown language switcher in the header.

**Architecture:** A client-side React Context (`LanguageProvider`) holds the active language and persists it to `localStorage`; a central `dictionary.ts` holds every translatable string keyed by locale. Text-rendering components become client components and read copy via a `useLang()` hook. No new dependencies, no routing changes — switching re-renders instantly.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript. Working dir: `hbp-personal-site/frontend`.

**Testing note:** This frontend has **no test harness** (confirmed: no jest/vitest config, `package.json` has only `dev`/`build`/`start`/`lint`). Per the spec, this change adds none. Standard TDD red/green steps are therefore replaced with `npm run lint` + `npm run build` as the per-task gate (the build is what catches server/client component boundary errors), plus a final manual toggle check. All commands run from `hbp-personal-site/frontend`.

---

## File structure

**Create:**
- `app/i18n/dictionary.ts` — `Lang` type, `Messages` type, `messages` record (vi/en), `LANG_LABELS`.
- `app/i18n/LanguageProvider.tsx` — context provider + `useLang()` hook.

**Modify:**
- `app/data.ts` — strip translatable content; keep only language-neutral data.
- `app/layout.tsx` — wrap children in `<LanguageProvider>`.
- `app/components/Nav.tsx` — globe dropdown + dictionary-driven labels.
- `app/components/Hero.tsx`, `Skills.tsx`, `Portfolio.tsx`, `CV.tsx`, `Contact.tsx`, `Footer.tsx` — `"use client"` + read copy via `useLang()`.
- `app/globals.css` — language-switcher styles.

**Out of scope (do not touch):** `PhoneMockup.tsx` (depicts in-app UI, not site chrome), the CV PDF link (`href="#"`), backend, SEO/`hreflang`. Leave any pre-existing unrelated working-tree changes alone.

---

### Task 1: Translation dictionary + types

**Files:**
- Create: `app/i18n/dictionary.ts`

- [ ] **Step 1: Create the dictionary file**

Create `app/i18n/dictionary.ts` with the full content below. The `vi` strings are lifted verbatim from the current components; the `en` strings are the authored translations.

```ts
// ============================================================
//  All translatable copy, keyed by locale.
//  Language-neutral data (URLs, tech names, chips) stays in data.ts.
// ============================================================

export type Lang = "vi" | "en";

export type TimelineEntry = {
  date: string;
  title: string;
  org: string;
  desc: string;
};

export type Messages = {
  nav: { skills: string; work: string; cv: string; contact: string };
  hero: {
    eyebrow: string;
    taglineLines: [string, string];
    bio: string;
    viewWork: string;
    getInTouch: string;
    stats: [string, string, string];
  };
  skills: {
    label: string;
    title: string;
    sub: string;
    groupLabels: [string, string, string, string];
  };
  portfolio: {
    label: string;
    title: string;
    sub: string;
    project: { subtitle: string; description: string; features: string[] };
    downloadApk: string;
    comingSoon: string;
  };
  cv: {
    label: string;
    title: string;
    colExperience: string;
    colEducation: string;
    downloadCv: string;
    experience: TimelineEntry[];
    education: TimelineEntry[];
  };
  contact: {
    label: string;
    headingLine1: string;
    headingAccent: string;
    body: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    sentMsg: string;
  };
  footer: { copy: string };
};

// Native-language names shown in the switcher dropdown (never translated).
export const LANG_LABELS: Record<Lang, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

export const messages: Record<Lang, Messages> = {
  vi: {
    nav: { skills: "Kỹ năng", work: "Sản phẩm", cv: "CV", contact: "Liên hệ" },
    hero: {
      eyebrow: "Kỹ sư phần mềm · Hà Nội",
      taglineLines: ["Xây dựng sản phẩm", "mọi người yêu thích."],
      bio:
        "Kỹ sư phần mềm với niềm đam mê xây dựng sản phẩm mobile & web. " +
        "Tập trung vào clean code, trải nghiệm người dùng và hiệu suất.",
      viewWork: "Xem sản phẩm",
      getInTouch: "Liên hệ ngay",
      stats: ["Năm kinh nghiệm", "Dự án hoàn thành", "Ứng dụng đã phát hành"],
    },
    skills: {
      label: "Kỹ Năng",
      title: "Tech Stack",
      sub: "Những công nghệ tôi sử dụng hàng ngày.",
      groupLabels: ["Ngôn ngữ", "Frontend & Mobile", "Backend & API", "Tools & DevOps"],
    },
    portfolio: {
      label: "Sản Phẩm",
      title: "Featured Work",
      sub: "Sản phẩm nổi bật tôi đã xây dựng.",
      project: {
        subtitle: "Ứng dụng học tiếng Nhật cho người mới bắt đầu",
        description:
          "Ứng dụng di động giúp người Việt học tiếng Nhật từ con số 0 — từ Hiragana, " +
          "Katakana đến từ vựng và Kanji JLPT N5. Bài học \"dạy rồi kiểm tra\" kết hợp thuật " +
          "toán lặp lại ngắt quãng (SuperMemo-2) để tối ưu việc ghi nhớ.",
        features: [
          "Học Hiragana, Katakana, Kanji và từ vựng N5",
          "Ôn tập flashcard theo thuật toán SM-2 (spaced repetition)",
          "Âm thanh và thứ tự nét viết động (KanjiVG)",
          "Streak, XP, thành tích và hoạt động offline",
        ],
      },
      downloadApk: "Tải về APK",
      comingSoon: "Tải về APK · Sắp ra mắt",
    },
    cv: {
      label: "Hồ Sơ",
      title: "Experience & Education",
      colExperience: "Kinh Nghiệm",
      colEducation: "Học Vấn",
      downloadCv: "Tải CV (PDF)",
      experience: [
        {
          date: "2023 — Nay",
          title: "Software Engineer",
          org: "[Tên Công Ty]",
          desc: "Phát triển ứng dụng mobile với Flutter, xây dựng backend API với Node.js, và triển khai quy trình CI/CD.",
        },
        {
          date: "2022 — 2023",
          title: "Junior Frontend Developer",
          org: "[Startup]",
          desc: "Xây dựng giao diện web với React và TypeScript, tối ưu hiệu suất frontend và trải nghiệm người dùng.",
        },
      ],
      education: [
        {
          date: "2022 — 2026",
          title: "Công nghệ thông tin",
          org: "ĐH Dân lập Phương Đông",
          desc: "4 năm theo đuổi CNTT, tốt nghiệp loại Giỏi — nơi nuôi dưỡng tình yêu với clean code và sản phẩm tử tế.",
        },
        {
          date: "2023",
          title: "Flutter Development",
          org: "Online Certificate",
          desc: "Chứng chỉ phát triển ứng dụng Flutter nâng cao từ Google.",
        },
      ],
    },
    contact: {
      label: "Liên Hệ",
      headingLine1: "Cùng xây dựng",
      headingAccent: "điều gì đó.",
      body:
        "Tôi luôn sẵn sàng thảo luận về các dự án mới, ý tưởng sáng tạo hoặc " +
        "cơ hội hợp tác. Hãy liên hệ với tôi.",
      nameLabel: "Tên của bạn",
      namePlaceholder: "Nguyễn Văn A",
      emailLabel: "Email",
      emailPlaceholder: "email@example.com",
      subjectLabel: "Chủ đề",
      subjectPlaceholder: "Dự án hợp tác...",
      messageLabel: "Tin nhắn",
      messagePlaceholder: "Xin chào Phúc, tôi muốn thảo luận về...",
      submit: "Gửi tin nhắn",
      submitting: "Đang gửi...",
      sentMsg: "Đã gửi! Tôi sẽ phản hồi sớm nhất có thể.",
    },
    footer: { copy: "© 2025 Hoàng Bảo Phúc. Xây dựng bằng cả tâm huyết." },
  },

  en: {
    nav: { skills: "Skills", work: "Work", cv: "CV", contact: "Contact" },
    hero: {
      eyebrow: "Software Engineer · Ha Noi",
      taglineLines: ["Building apps people", "love to use."],
      bio:
        "Software engineer with a passion for building mobile & web products. " +
        "Focused on clean code, user experience, and performance.",
      viewWork: "View work",
      getInTouch: "Get in touch",
      stats: ["Years of experience", "Projects completed", "App published"],
    },
    skills: {
      label: "Skills",
      title: "Tech Stack",
      sub: "Technologies I use every day.",
      groupLabels: ["Languages", "Frontend & Mobile", "Backend & API", "Tools & DevOps"],
    },
    portfolio: {
      label: "Portfolio",
      title: "Featured Work",
      sub: "Standout products I've built.",
      project: {
        subtitle: "A Japanese-learning app for beginners",
        description:
          "A mobile app that helps Vietnamese speakers learn Japanese from zero — from " +
          "Hiragana and Katakana to JLPT N5 vocabulary and Kanji. Teach-then-check lessons " +
          "combine with a spaced-repetition algorithm (SuperMemo-2) to maximize retention.",
        features: [
          "Learn Hiragana, Katakana, Kanji and N5 vocabulary",
          "Flashcard review with the SM-2 spaced-repetition algorithm",
          "Audio and animated stroke order (KanjiVG)",
          "Streaks, XP, achievements and offline support",
        ],
      },
      downloadApk: "Download APK",
      comingSoon: "Download APK · Coming soon",
    },
    cv: {
      label: "Resume",
      title: "Experience & Education",
      colExperience: "Experience",
      colEducation: "Education",
      downloadCv: "Download CV (PDF)",
      experience: [
        {
          date: "2023 — Present",
          title: "Software Engineer",
          org: "[Company Name]",
          desc: "Built mobile apps with Flutter, developed backend APIs with Node.js, and set up CI/CD pipelines.",
        },
        {
          date: "2022 — 2023",
          title: "Junior Frontend Developer",
          org: "[Startup]",
          desc: "Built web interfaces with React and TypeScript, optimizing frontend performance and user experience.",
        },
      ],
      education: [
        {
          date: "2022 — 2026",
          title: "Information Technology",
          org: "Phuong Dong University",
          desc: "Four years studying IT, graduating with distinction — where my love for clean code and well-crafted products grew.",
        },
        {
          date: "2023",
          title: "Flutter Development",
          org: "Online Certificate",
          desc: "Advanced Flutter app development certificate from Google.",
        },
      ],
    },
    contact: {
      label: "Contact",
      headingLine1: "Let's build",
      headingAccent: "something.",
      body:
        "I'm always open to discussing new projects, creative ideas, or opportunities " +
        "to collaborate. Feel free to reach out.",
      nameLabel: "Your name",
      namePlaceholder: "Jane Doe",
      emailLabel: "Email",
      emailPlaceholder: "email@example.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "A collaboration project...",
      messageLabel: "Message",
      messagePlaceholder: "Hi Phúc, I'd like to discuss...",
      submit: "Send message",
      submitting: "Sending...",
      sentMsg: "Sent! I'll get back to you as soon as I can.",
    },
    footer: { copy: "© 2025 Hoàng Bảo Phúc. Built with care." },
  },
};
```

- [ ] **Step 2: Type-check**

Run: `npm run lint`
Expected: no errors referencing `app/i18n/dictionary.ts`. (Lint passes; the file is not yet imported anywhere, which is fine.)

- [ ] **Step 3: Commit**

```bash
git add app/i18n/dictionary.ts
git commit -m "feat(i18n): add vi/en translation dictionary"
```

---

### Task 2: LanguageProvider + useLang hook, wired into layout

**Files:**
- Create: `app/i18n/LanguageProvider.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create the provider**

Create `app/i18n/LanguageProvider.tsx`:

```tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "./dictionary";

type LanguageContextValue = { lang: Lang; setLang: (lang: Lang) => void };

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "lang";

function isLang(value: unknown): value is Lang {
  return value === "vi" || value === "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Server + first client render use the VI default so markup matches and
  // there is no hydration mismatch; a remembered choice is applied on mount.
  const [lang, setLangState] = useState<Lang>("vi");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable (e.g. privacy mode) — keep the default.
    }
    if (isLang(stored)) setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(next: Lang) {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore — switching still works for the session, just isn't remembered.
    }
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
```

- [ ] **Step 2: Wrap children in layout**

In `app/layout.tsx`, import the provider and wrap the body content. Replace the `<body>` line:

```tsx
      <body>{children}</body>
```

with:

```tsx
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
```

Add the import after the existing `import "./globals.css";` line:

```tsx
import { LanguageProvider } from "./i18n/LanguageProvider";
```

(`<html lang="vi">` stays as-is — it is the server default and is updated client-side by the provider.)

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: build succeeds. (`layout.tsx` stays a server component; it may render a client component as a child.)

- [ ] **Step 4: Commit**

```bash
git add app/i18n/LanguageProvider.tsx app/layout.tsx
git commit -m "feat(i18n): add LanguageProvider context and wire into layout"
```

---

### Task 3: Strip translatable content from data.ts

**Files:**
- Modify: `app/data.ts`

- [ ] **Step 1: Replace data.ts with the language-neutral version**

Replace the entire contents of `app/data.ts` with:

```ts
// ============================================================
//  Language-neutral site data. Translatable copy lives in
//  app/i18n/dictionary.ts. (Backend stores contact submissions.)
// ============================================================

// Hero stat numbers; matching labels are in messages[lang].hero.stats (same order).
export const HERO_STAT_NUMS: [string, string, string] = ["3+", "10+", "1"];

// Skill tag items per group; matching group labels are in
// messages[lang].skills.groupLabels (same order).
export const SKILL_GROUP_ITEMS: string[][] = [
  ["JavaScript", "TypeScript", "Python", "Dart", "Java"],
  ["React", "Next.js", "Flutter", "Tailwind CSS", "HTML/CSS"],
  ["Node.js", "Express", "FastAPI", "REST API", "GraphQL"],
  ["Git", "Docker", "PostgreSQL", "Firebase", "Figma"],
];

export const SOCIAL_LINKS: { label: string; href: string; icon: "mail" | "github" | "linkedin" | "facebook" | "instagram" }[] = [
  { label: "phuchb04@gmail.com", href: "mailto:phuchb04@gmail.com", icon: "mail" },
  { label: "github.com/joey-hoagbp", href: "https://github.com/joey-hoagbp", icon: "github" },
  { label: "facebook.com/phuchb04", href: "https://www.facebook.com/phuchb04/", icon: "facebook" },
  { label: "instagram.com/hoaqbp_", href: "https://www.instagram.com/hoaqbp_/", icon: "instagram" },
];

// Language-neutral project metadata; translatable copy (subtitle, description,
// features) is in messages[lang].portfolio.project.
export const PROJECT_META: {
  title: string;
  chips: { label: string; accent?: boolean }[];
  apkUrl: string; // empty string → button shows "coming soon". Paste the .apk URL here.
} = {
  title: "Hajime",
  chips: [
    { label: "Mobile App", accent: true },
    { label: "React Native" },
    { label: "Spring Boot" },
    { label: "MongoDB" },
    { label: "Education" },
  ],
  apkUrl: "", // TODO: paste the .apk download URL here when the build is ready
};
```

This removes `SKILL_GROUPS`, `HERO_STATS`, `EXPERIENCE`, `EDUCATION`, `PROJECTS`, and the `TimelineEntry` / `Project` types (now superseded by the dictionary). Their consumers are rewritten in Tasks 4–8.

- [ ] **Step 2: Expect a broken build (consumers not yet updated)**

Run: `npm run build`
Expected: FAILS with type errors in `Hero.tsx`, `Skills.tsx`, `CV.tsx`, `Portfolio.tsx` (they still import the removed exports). This is expected — Tasks 4–8 fix each consumer. Do **not** commit a broken build alone; this task's commit happens together with Task 4 the first green build. Proceed to Task 4 before committing.

> Note for executor: Tasks 3–8 form one continuous edit. The repo only returns to a buildable state at the end of Task 8. Commit at each task boundary **only if `npm run build` passes**; otherwise carry the staged changes forward. (The component edits are independent of each other but all depend on Task 3.)

---

### Task 4: Hero component

**Files:**
- Modify: `app/components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero.tsx**

Replace the entire contents of `app/components/Hero.tsx` with:

```tsx
"use client";

import { HERO_STAT_NUMS } from "../data";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

// Static, hand-tuned syntax highlighting — kept as raw HTML so the exact
// indentation/line breaks from the design survive inside <pre>. No user input.
const CODE_HTML = `<span class="c-kw">const</span> <span class="c-fn">developer</span> = {
  <span class="c-prop">name</span>:  <span class="c-str">"Hoàng Bảo Phúc"</span>,
  <span class="c-prop">role</span>:  <span class="c-str">"Software Engineer"</span>,
  <span class="c-prop">city</span>:  <span class="c-str">"Hà Nội"</span>,
  <span class="c-prop">stack</span>: [<span class="c-str">"Flutter"</span>, <span class="c-str">"React"</span>,
          <span class="c-str">"Node.js"</span>, <span class="c-str">"Python"</span>],
  <span class="c-prop">open</span>:  <span class="c-bool">true</span>,
};`;

export default function Hero() {
  const { lang } = useLang();
  const t = messages[lang].hero;

  return (
    <section id="hero">
      <div className="hero-glow-orb" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-left reveal">
            <p className="hero-eyebrow">
              <span className="eyebrow-dash" />
              {t.eyebrow}
            </p>
            <h1 className="hero-name">
              Hoàng
              <br />
              <span className="name-dim">Bảo Phúc.</span>
            </h1>
            <p className="hero-tagline">
              {t.taglineLines[0]}
              <br />
              {t.taglineLines[1]}
            </p>
            <p className="hero-bio">{t.bio}</p>
            <div className="hero-btns">
              <a href="#portfolio" className="btn-primary">
                {t.viewWork}
              </a>
              <a href="#contact" className="btn-ghost">
                {t.getInTouch}
              </a>
            </div>
          </div>

          <div className="hero-right reveal reveal-d2">
            <div className="code-card">
              <div className="code-dots">
                <span />
                <span />
                <span />
              </div>
              <pre
                className="code-pre"
                dangerouslySetInnerHTML={{ __html: CODE_HTML }}
              />
            </div>
            <div className="hero-stats">
              {HERO_STAT_NUMS.map((num, i) => (
                <div key={num + i} className="stat-card">
                  <div className="stat-num">{num}</div>
                  <div className="stat-lbl">{t.stats[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit only if build passes**

Run: `npm run build`. If it passes, commit. If it still fails on *other* components (Skills/CV/Portfolio), that is expected — continue to Task 5 carrying staged changes:

```bash
git add app/data.ts app/components/Hero.tsx
```

---

### Task 5: Skills component

**Files:**
- Modify: `app/components/Skills.tsx`

- [ ] **Step 1: Rewrite Skills.tsx**

Replace the entire contents of `app/components/Skills.tsx` with:

```tsx
"use client";

import { SKILL_GROUP_ITEMS } from "../data";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

export default function Skills() {
  const { lang } = useLang();
  const t = messages[lang].skills;

  return (
    <section id="skills" className="section-bordered">
      <div className="container">
        <header className="section-hdr reveal">
          <p className="section-label">{t.label}</p>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-sub">{t.sub}</p>
        </header>
        <div className="skills-grid">
          {SKILL_GROUP_ITEMS.map((items, i) => (
            <div key={t.groupLabels[i]} className={`skill-group reveal reveal-d${(i % 3) + 1}`}>
              <p className="sg-label">{t.groupLabels[i]}</p>
              <div className="sg-tags">
                {items.map((s) => (
                  <span key={s} className="sg-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Stage (build may still fail on CV/Portfolio)**

```bash
git add app/components/Skills.tsx
```

---

### Task 6: Portfolio component

**Files:**
- Modify: `app/components/Portfolio.tsx`

- [ ] **Step 1: Rewrite Portfolio.tsx**

Replace the entire contents of `app/components/Portfolio.tsx` with:

```tsx
"use client";

import PhoneMockup from "./PhoneMockup";
import { DownloadIcon } from "./icons";
import { PROJECT_META } from "../data";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

export default function Portfolio() {
  const { lang } = useLang();
  const t = messages[lang].portfolio;

  return (
    <section id="portfolio" className="section-bordered">
      <div className="container">
        <header className="section-hdr reveal">
          <p className="section-label">{t.label}</p>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-sub">{t.sub}</p>
        </header>

        <div className="project-card reveal">
          <div className="project-info">
            <div className="proj-chips">
              {PROJECT_META.chips.map((chip) => (
                <span key={chip.label} className={chip.accent ? "chip chip-ac" : "chip"}>
                  {chip.label}
                </span>
              ))}
            </div>
            <h3 className="proj-title">{PROJECT_META.title}</h3>
            <p className="proj-subtitle">{t.project.subtitle}</p>
            <p className="proj-desc">{t.project.description}</p>
            <ul className="proj-features">
              {t.project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="proj-btns">
              {PROJECT_META.apkUrl ? (
                <a href={PROJECT_META.apkUrl} className="btn-primary" download>
                  <DownloadIcon />
                  {t.downloadApk}
                </a>
              ) : (
                <button className="btn-primary" disabled>
                  <DownloadIcon />
                  {t.comingSoon}
                </button>
              )}
            </div>
          </div>
          <div className="project-visual">
            <div className="pv-glow" />
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Stage (build may still fail on CV)**

```bash
git add app/components/Portfolio.tsx
```

---

### Task 7: CV component

**Files:**
- Modify: `app/components/CV.tsx`

- [ ] **Step 1: Rewrite CV.tsx**

Replace the entire contents of `app/components/CV.tsx` with:

```tsx
"use client";

import { DownloadIcon } from "./icons";
import { useLang } from "../i18n/LanguageProvider";
import { messages, type TimelineEntry } from "../i18n/dictionary";

function TLItem({ item, last }: { item: TimelineEntry; last: boolean }) {
  return (
    <div className="tl-item">
      <div className="tl-spine">
        <div className="tl-dot" />
        {!last && <div className="tl-line" />}
      </div>
      <div className="tl-body">
        <p className="tl-date">{item.date}</p>
        <p className="tl-title">{item.title}</p>
        <p className="tl-org">{item.org}</p>
        <p className="tl-desc">{item.desc}</p>
      </div>
    </div>
  );
}

export default function CV() {
  const { lang } = useLang();
  const t = messages[lang].cv;

  return (
    <section id="cv" className="section-bordered">
      <div className="container">
        <header className="section-hdr reveal">
          <p className="section-label">{t.label}</p>
          <h2 className="section-title">{t.title}</h2>
        </header>
        <div className="cv-cols">
          <div className="reveal">
            <p className="cv-col-ttl">{t.colExperience}</p>
            <div className="timeline">
              {t.experience.map((e, i) => (
                <TLItem key={`${e.title}-${e.date}`} item={e} last={i === t.experience.length - 1} />
              ))}
            </div>
          </div>
          <div className="reveal reveal-d1">
            <p className="cv-col-ttl">{t.colEducation}</p>
            <div className="timeline">
              {t.education.map((e, i) => (
                <TLItem key={`${e.title}-${e.date}`} item={e} last={i === t.education.length - 1} />
              ))}
            </div>
          </div>
        </div>
        <div className="cv-dl reveal">
          <a href="#" className="btn-ghost">
            <DownloadIcon />
            {t.downloadCv}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build (should now pass) and commit Tasks 3–7**

Run: `npm run build`
Expected: PASS — all consumers of the removed `data.ts` exports are now updated. (`Contact.tsx` and `Footer.tsx` still show Vietnamese hardcoded strings but compile fine; they are updated in Tasks 8–9.)

```bash
git add app/components/CV.tsx
git commit -m "feat(i18n): localize Hero, Skills, Portfolio, CV; split data.ts"
```

---

### Task 8: Contact component

**Files:**
- Modify: `app/components/Contact.tsx`

- [ ] **Step 1: Rewrite Contact.tsx**

Replace the entire contents of `app/components/Contact.tsx` with:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { SOCIAL_LINKS } from "../data";
import { SOCIAL_ICONS } from "./icons";
import { sendContactMessage } from "../../lib/api";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

type Status = "idle" | "submitting" | "sent" | "error";

export default function Contact() {
  const { lang } = useLang();
  const t = messages[lang].contact;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError(null);

    const result = await sendContactMessage({
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    });

    if (result.ok) {
      setStatus("sent");
    } else {
      setError(result.message);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-bordered">
      <div className="container">
        <div className="contact-layout">
          <div className="reveal">
            <p className="section-label">{t.label}</p>
            <h2 className="contact-hdg">
              {t.headingLine1}
              <br />
              <span className="hdg-accent">{t.headingAccent}</span>
            </h2>
            <p className="contact-body">{t.body}</p>
            <div className="soc-links">
              {SOCIAL_LINKS.map(({ label, href, icon }) => {
                const Icon = SOCIAL_ICONS[icon];
                return (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="soc-link"
                  >
                    <span className="soc-icon">
                      <Icon />
                    </span>
                    {label}
                  </a>
                );
              })}
            </div>
          </div>

          <form className="contact-form reveal reveal-d2" onSubmit={handleSubmit} noValidate>
            {status === "sent" ? (
              <div className="form-ok">
                <div className="form-ok-icon">✓</div>
                <p className="form-ok-msg">{t.sentMsg}</p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="fg">
                    <label className="fl" htmlFor="cf-name">
                      {t.nameLabel}
                    </label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      className="fi"
                      placeholder={t.namePlaceholder}
                      required
                    />
                  </div>
                  <div className="fg">
                    <label className="fl" htmlFor="cf-email">
                      {t.emailLabel}
                    </label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      className="fi"
                      placeholder={t.emailPlaceholder}
                      required
                    />
                  </div>
                </div>
                <div className="fg">
                  <label className="fl" htmlFor="cf-subject">
                    {t.subjectLabel}
                  </label>
                  <input
                    id="cf-subject"
                    name="subject"
                    type="text"
                    className="fi"
                    placeholder={t.subjectPlaceholder}
                  />
                </div>
                <div className="fg">
                  <label className="fl" htmlFor="cf-message">
                    {t.messageLabel}
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    className="fi"
                    rows={5}
                    placeholder={t.messagePlaceholder}
                    required
                  />
                </div>
                {error && (
                  <p className="form-err" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn-primary btn-full"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? t.submitting : t.submit}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
```

> Note: server-side validation errors from `sendContactMessage` (`result.message`) are not localized — that string comes from the backend. Out of scope for this plan.

- [ ] **Step 2: Verify build and commit**

Run: `npm run build`
Expected: PASS.

```bash
git add app/components/Contact.tsx
git commit -m "feat(i18n): localize Contact section"
```

---

### Task 9: Footer component

**Files:**
- Modify: `app/components/Footer.tsx`

- [ ] **Step 1: Rewrite Footer.tsx**

Replace the entire contents of `app/components/Footer.tsx` with:

```tsx
"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

export default function Footer() {
  const { lang } = useLang();
  const t = messages[lang].footer;

  return (
    <footer>
      <div className="container">
        <div className="footer-row">
          <span className="footer-copy">{t.copy}</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build and commit**

Run: `npm run build`
Expected: PASS.

```bash
git add app/components/Footer.tsx
git commit -m "feat(i18n): localize footer"
```

---

### Task 10: Nav globe dropdown switcher

**Files:**
- Modify: `app/components/Nav.tsx`

- [ ] **Step 1: Rewrite Nav.tsx**

Replace the entire contents of `app/components/Nav.tsx` with the version below. The switcher lives in a `.nav-right` wrapper *alongside* `.nav-links` (not inside it) so it stays visible on mobile, where `.nav-links` is hidden. The globe SVG is inlined to keep this task self-contained (and to avoid the unrelated working-tree changes in `icons.tsx`).

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n/LanguageProvider";
import { messages, LANG_LABELS, type Lang } from "../i18n/dictionary";

const LANGS: Lang[] = ["vi", "en"];

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLang();
  const nav = messages[lang].nav;
  const switchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (switchRef.current && !switchRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <nav className={scrolled ? "nav-scrolled" : ""}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          HBP<span className="logo-dot">.</span>
        </a>
        <div className="nav-right">
          <ul className="nav-links">
            <li>
              <a href="#skills">{nav.skills}</a>
            </li>
            <li>
              <a href="#portfolio">{nav.work}</a>
            </li>
            <li>
              <a href="#cv">{nav.cv}</a>
            </li>
            <li>
              <a href="#contact" className="nav-cta">
                {nav.contact}
              </a>
            </li>
          </ul>
          <div className="lang-switch" ref={switchRef}>
            <button
              type="button"
              className="lang-btn"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-label="Change language"
              onClick={() => setOpen((o) => !o)}
            >
              <GlobeIcon />
              {lang.toUpperCase()}
              <span className="lang-caret" aria-hidden="true">▾</span>
            </button>
            {open && (
              <ul className="lang-menu" role="listbox">
                {LANGS.map((l) => (
                  <li key={l} role="option" aria-selected={l === lang}>
                    <button
                      type="button"
                      className={l === lang ? "lang-opt lang-opt-active" : "lang-opt"}
                      onClick={() => {
                        setLang(l);
                        setOpen(false);
                      }}
                    >
                      {LANG_LABELS[l]}
                      {l === lang && (
                        <span className="lang-check" aria-hidden="true">
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Verify build and commit**

Run: `npm run build`
Expected: PASS.

```bash
git add app/components/Nav.tsx
git commit -m "feat(i18n): add globe language switcher to nav"
```

---

### Task 11: Switcher styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Append switcher styles**

Append the following block to the end of `app/globals.css` (after the existing responsive media queries). It uses the existing theme variables (`--accent` resolves to `#e85d3d` under the editorial theme).

```css
/* ── LANGUAGE SWITCHER ──────────────────────────────── */
.nav-right { display: flex; align-items: center; gap: 32px; }
.lang-switch { position: relative; }
.lang-btn {
  display: inline-flex; align-items: center; gap: 6px;
  background: transparent; border: 1px solid var(--border);
  color: var(--fg2); font-family: var(--font);
  font-size: 13px; font-weight: 600; letter-spacing: 0.02em;
  padding: 6px 12px; border-radius: 100px; cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.lang-btn:hover { color: var(--fg); border-color: var(--fg2); }
.lang-btn svg { width: 15px; height: 15px; }
.lang-caret { font-size: 10px; line-height: 1; }
.lang-menu {
  position: absolute; top: calc(100% + 10px); right: 0;
  min-width: 160px; list-style: none; margin: 0; padding: 6px;
  background: var(--bg3, #1a1a1e); border: 1px solid var(--border);
  border-radius: var(--r); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  z-index: 110;
}
.lang-opt {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  width: 100%; background: transparent; border: none;
  color: var(--fg2); font-family: var(--font); font-size: 14px; font-weight: 500;
  text-align: left; padding: 9px 12px; border-radius: 8px; cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.lang-opt:hover { background: var(--border); color: var(--fg); }
.lang-opt-active { color: var(--fg); }
.lang-check { color: var(--accent); font-size: 13px; }
```

- [ ] **Step 2: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: both PASS.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style(i18n): language switcher dropdown styling"
```

---

### Task 12: Manual verification

**No files changed — verification only.**

- [ ] **Step 1: Run the dev server**

Run: `npm run dev` (ensure `.env.local` exists; not required for this UI-only check).

- [ ] **Step 2: Walk the checklist in the browser at `http://localhost:3000`**

- [ ] Page loads in **Vietnamese** by default; nav shows `Kỹ năng / Sản phẩm / CV / Liên hệ` and a `🌐 VI ▾` button.
- [ ] Click the globe → menu shows `Tiếng Việt ✓` and `English`.
- [ ] Select **English** → every section re-renders in English instantly (hero, stats, skills labels, portfolio, CV experience/education, contact form labels + placeholders, footer); button now reads `🌐 EN ▾`.
- [ ] In DevTools, `document.documentElement.lang` is now `en`.
- [ ] **Reload** → page stays in English (persisted).
- [ ] Switch back to **Vietnamese** → reverts; reload → stays Vietnamese.
- [ ] Resize to mobile width (<600px) → nav links hide but the globe switcher remains visible and still works.
- [ ] Click outside the open menu → it closes.

- [ ] **Step 3: Final lint/build gate**

Run: `npm run lint && npm run build`
Expected: both PASS, no warnings introduced by this change.

This task has no commit (verification only). If any check fails, fix in the relevant task's file and re-commit there.
