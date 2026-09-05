// ============================================================
//  Language-neutral site data. Translatable copy lives in
//  app/i18n/dictionary.ts. (Backend stores contact submissions.)
// ============================================================

import type { Localized, Profile, Project } from "../lib/api";

// Hero portrait. Drop a photo at frontend/public/phuc-reeves.webp (or change
// this path). WebP, not PNG: the static export sets images.unoptimized, so
// whatever is here ships to the browser byte-for-byte. This is the page's LCP
// image — its <link rel="preload"> lives in app/layout.tsx, not on the <img>.
export const AVATAR_SRC = "/phuc-reeves.webp";

// Current employer, linked from the proof row's "Hiện tại / Currently" item.
export const EMPLOYER_URL = "https://www.facebook.com/DrJOYvietnam/";

export const SOCIAL_LINKS: { label: string; href: string; icon: "mail" | "github" | "linkedin" | "facebook" | "instagram" }[] = [
  { label: "phuchb04@gmail.com", href: "mailto:phuchb04@gmail.com", icon: "mail" },
  { label: "github.com/joey-hoagbp", href: "https://github.com/joey-hoagbp", icon: "github" },
  { label: "facebook.com/hoaqbp", href: "https://www.facebook.com/hoaqbp", icon: "facebook" },
  { label: "instagram.com/phuc.hoang1510", href: "https://www.instagram.com/phuc.hoang1510", icon: "instagram" },
];

// The Stack section: two domain groups, rendered at one weight. The grouping is
// by domain (what the service is built from vs. how it reaches a user), NOT a
// skill ranking — the ranked tiers were deliberately removed in 4d26919. The
// groups are unlabelled: only the rule between them marks the split, so the
// rows run the full width of the shell.
// `key` binds a row to its one-line gloss in dictionary.ts (skills.items).
// `pigment` is likewise an identity hue, not a rank: it names one of the
// --pig-* tokens in globals.css so the row can colour its own chip and hairline.
// Separate from the backend's category grouping (Frontend/Backend/Tools) in
// Profile.techStacks — deliberately not tied to that contract.
export type Pigment =
  | "vermilion" | "indigo" | "celadon" | "leaf" | "sky" | "amethyst" | "ochre";

export type TechKey =
  | "spring" | "microservices" | "grpc" | "mongo" | "react" | "next" | "rest";

export const STACK_GROUPS: {
  key: "core" | "api";
  items: { key: TechKey; name: string; pigment: Pigment }[];
}[] = [
  {
    key: "core",
    items: [
      { key: "spring", name: "Java Spring Boot", pigment: "vermilion" },
      { key: "microservices", name: "Microservices", pigment: "indigo" },
      { key: "grpc", name: "Protobuf gRPC", pigment: "celadon" },
      { key: "mongo", name: "MongoDB", pigment: "leaf" },
    ],
  },
  {
    key: "api",
    items: [
      { key: "react", name: "ReactJS", pigment: "sky" },
      { key: "next", name: "NextJS", pigment: "amethyst" },
      { key: "rest", name: "REST API", pigment: "ochre" },
    ],
  },
];

/**
 * Offline fallback — used when the backend is unreachable.
 * Content must exactly match what the backend seeds into MongoDB.
 */
export const DEFAULT_PROFILE: Profile = {
  techStacks: [
    {
      label: { vi: "Frontend", en: "Frontend" },
      items: ["JavaScript", "TypeScript", "ReactJS", "NextJS", "TailwindCSS"],
    },
    {
      label: { vi: "Backend & API", en: "Backend & API" },
      items: ["C# (.NET)", "Java Spring Boot", "REST API", "Protobuf gRPC", "MongoDB"],
    },
    {
      label: { vi: "Công cụ", en: "Tools" },
      items: ["Git", "Docker", "Figma"],
    },
  ],
  projects: [
    {
      title: "Hajime",
      apkUrl: "https://github.com/joey-hoagbp/hbp-personal-site/releases/download/hajime-v1.0/hajime-japanese.apk",
      current: true,
      chips: [
        { label: "Mobile App", accent: true },
        { label: "React Native", accent: false },
        { label: "Spring Boot", accent: false },
        { label: "MongoDB", accent: false },
        { label: "Education", accent: false },
      ],
      subtitle: {
        vi: "Ứng dụng học tiếng Nhật cho người mới bắt đầu",
        en: "A Japanese-learning app for beginners",
      },
      description: {
        vi:
          "Ứng dụng di động giúp người Việt học tiếng Nhật từ con số 0 — từ Hiragana, " +
          "Katakana đến từ vựng và Kanji JLPT N5. Bài học \"dạy rồi kiểm tra\" kết hợp thuật " +
          "toán lặp lại ngắt quãng (SuperMemo-2) để tối ưu việc ghi nhớ.",
        en:
          "A mobile app that helps Vietnamese speakers learn Japanese from zero — from " +
          "Hiragana and Katakana to JLPT N5 vocabulary and Kanji. Teach-then-check lessons " +
          "combine with a spaced-repetition algorithm (SuperMemo-2) to maximize retention.",
      },
      features: {
        vi: [
          "Học Hiragana, Katakana, Kanji và từ vựng N5",
          "Ôn tập flashcard theo thuật toán SM-2 (spaced repetition)",
          "Âm thanh và thứ tự nét viết động (KanjiVG)",
          "Streak, XP, thành tích và hoạt động offline",
        ],
        en: [
          "Learn Hiragana, Katakana, Kanji and N5 vocabulary",
          "Flashcard review with the SM-2 spaced-repetition algorithm",
          "Audio and animated stroke order (KanjiVG)",
          "Streaks, XP, achievements and offline support",
        ],
      },
    },
  ],
  experiences: [
    {
      date: { vi: "3/2026 — Nay", en: "3/2026 — Present" },
      title: { vi: "Kỹ sư phần mềm", en: "Software engineer" },
      org: { vi: "Dr.JOY Việt Nam", en: "Dr.JOY Vietnam" },
      desc: {
        vi: "Phát triển backend với Java và Spring Boot.",
        en: "Backend development with Java and Spring Boot.",
      },
    },
    {
      date: { vi: "8/2025 — 11/2025", en: "8/2025 — 11/2025" },
      title: { vi: "Kỹ sư phần mềm", en: "Software engineer" },
      org: { vi: "Haposoft", en: "Haposoft" },
      desc: {
        vi: "Phát triển web với NextJS và PHP Laravel.",
        en: "Web development with Next.js and PHP Laravel.",
      },
    },
    {
      date: { vi: "8/2024 — 7/2025", en: "8/2024 — 7/2025" },
      title: { vi: "Kỹ sư phần mềm", en: "Software engineer" },
      org: { vi: "OmiGroup", en: "OmiGroup" },
      desc: {
        vi: "Phát triển backend với C# và .NET.",
        en: "Backend development with C# and .NET.",
      },
    },
  ],
  education: [
    {
      date: { vi: "2022 — 2026", en: "2022 — 2026" },
      title: { vi: "Công nghệ thông tin", en: "Information Technology" },
      org: { vi: "ĐH Dân lập Phương Đông", en: "Phuong Dong University" },
      desc: { vi: "", en: "" },
    },
    {
      date: { vi: "2018 — 2022", en: "2018 — 2022" },
      title: { vi: "Trung học phổ thông", en: "High School" },
      org: { vi: "Trường PT Vùng Cao Việt Bắc", en: "Viet Bac Highland High School" },
      desc: { vi: "", en: "" },
    },
  ],
};

// Tech names for the Hajime case study's "stack" strip (/work/hajime).
// Language-neutral — same list in both locales, so it lives here, not in
// dictionary.ts.
export const HAJIME_CASE_STACK: string[] = [
  "React Native",
  "Expo",
  "Java",
  "Spring Boot",
  "MongoDB",
  "Edge TTS",
  "KanjiVG",
  "Google Sign-In",
  "JWT",
];

/**
 * Content-in-code project list rendered by the Work section — the owner adds
 * projects here (zero backend changes needed). Distinct from
 * `DEFAULT_PROFILE.projects`, which stays a single-entry offline fallback for
 * the backend-driven profile contract.
 */
export const PROJECTS: Project[] = [
  {
    id: "hajime",
    title: "Hajime",
    titleNative: "はじめ",
    apkUrl: "https://github.com/joey-hoagbp/hbp-personal-site/releases/download/hajime-v1.0/hajime-japanese.apk",
    current: true,
    chips: [
      { label: "Mobile App", accent: true },
      { label: "React Native", accent: false },
      { label: "Spring Boot", accent: false },
      { label: "MongoDB", accent: false },
      { label: "Education", accent: false },
    ],
    subtitle: {
      vi: "Ứng dụng học tiếng Nhật cho người mới bắt đầu",
      en: "A Japanese-learning app for beginners",
    },
    description: {
      vi:
        "Ứng dụng di động giúp người Việt học tiếng Nhật từ con số 0 — từ Hiragana, " +
        "Katakana đến từ vựng và Kanji JLPT N5. Bài học \"dạy rồi kiểm tra\" kết hợp thuật " +
        "toán lặp lại ngắt quãng (SuperMemo-2) để tối ưu việc ghi nhớ.",
      en:
        "A mobile app that helps Vietnamese speakers learn Japanese from zero — from " +
        "Hiragana and Katakana to JLPT N5 vocabulary and Kanji. Teach-then-check lessons " +
        "combine with a spaced-repetition algorithm (SuperMemo-2) to maximize retention.",
    },
    features: {
      vi: [
        "Học Hiragana, Katakana, Kanji và từ vựng N5",
        "Ôn tập flashcard theo thuật toán SM-2 (spaced repetition)",
        "Âm thanh và thứ tự nét viết động (KanjiVG)",
        "Streak, XP, thành tích và hoạt động offline",
      ],
      en: [
        "Learn Hiragana, Katakana, Kanji and N5 vocabulary",
        "Flashcard review with the SM-2 spaced-repetition algorithm",
        "Audio and animated stroke order (KanjiVG)",
        "Streaks, XP, achievements and offline support",
      ],
    },
  },
];
