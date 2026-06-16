// ============================================================
//  Language-neutral site data. Translatable copy lives in
//  app/i18n/dictionary.ts. (Backend stores contact submissions.)
// ============================================================

import type { Profile } from "../lib/api";

// Hero stat numbers; matching labels are in messages[lang].hero.stats (same order).
export const HERO_STAT_NUMS: [string, string, string] = ["1+", "3+", "1"];

export const SOCIAL_LINKS: { label: string; href: string; icon: "mail" | "github" | "linkedin" | "facebook" | "instagram" }[] = [
  { label: "phuchb04@gmail.com", href: "mailto:phuchb04@gmail.com", icon: "mail" },
  { label: "github.com/joey-hoagbp", href: "https://github.com/joey-hoagbp", icon: "github" },
  { label: "facebook.com/phuchb04", href: "https://www.facebook.com/phuchb04/", icon: "facebook" },
  { label: "instagram.com/hoaqbp_", href: "https://www.instagram.com/hoaqbp_/", icon: "instagram" },
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
      apkUrl: "https://drive.google.com/uc?export=download&confirm=t&id=1NYWr2puf7vV0H8rhMyHnGcYhlRA8h7kX",
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
      title: { vi: "Backend Developer (Java)", en: "Backend Developer (Java)" },
      org: { vi: "DrJoy", en: "DrJoy" },
      desc: {
        vi: "Phát triển backend với Java và Spring Boot.",
        en: "Backend development with Java and Spring Boot.",
      },
    },
    {
      date: { vi: "11/2024 — 7/2025", en: "11/2024 — 7/2025" },
      title: { vi: "Backend Developer (C#)", en: "Backend Developer (C#)" },
      org: { vi: "Ominext", en: "Ominext" },
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
