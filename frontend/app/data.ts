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

// The Stack section: one flat index, rendered at one weight — NOT a ranking
// (the ranked tiers were deliberately removed in 4d26919, the domain grouping
// in a646041). `key` binds a row to its one-line gloss in dictionary.ts
// (skills.items). `pigment` is an identity hue, not a rank: it names one of
// the --pig-* tokens in globals.css so the row can colour its own chip and
// hairline. Separate from the backend's category grouping
// (Frontend/Backend/Tools) in Profile.techStacks — deliberately not tied to
// that contract.
export type Pigment =
  | "vermilion" | "indigo" | "celadon" | "leaf" | "sky" | "amethyst" | "ochre";

export type TechKey = "spring" | "microservices" | "grpc" | "mongo";

export const STACK_ITEMS: { key: TechKey; name: string; pigment: Pigment }[] = [
  { key: "spring", name: "Java Spring Boot", pigment: "vermilion" },
  { key: "microservices", name: "Microservices", pigment: "indigo" },
  { key: "grpc", name: "Protobuf gRPC", pigment: "celadon" },
  { key: "mongo", name: "MongoDB", pigment: "leaf" },
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
      apkUrl: "https://github.com/joey-hoagbp/hbp-personal-site/releases/download/hajime-v1.1/hajime-japanese.apk",
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

// The Hajime case study's screen tour (/work/hajime), in the order a new
// learner meets them. Screenshots of the release build; each screen's name
// and caption live in dictionary.ts under caseHajime.tour.screens[id].
export type HajimeTourId = "signin" | "learn" | "teach" | "check" | "kana" | "streak" | "you";

export const HAJIME_TOUR: { id: HajimeTourId; src: string }[] = [
  { id: "signin", src: "/hajime/signin.webp" },
  { id: "learn", src: "/hajime/learn.webp" },
  { id: "teach", src: "/hajime/teach.webp" },
  { id: "check", src: "/hajime/check.webp" },
  { id: "kana", src: "/hajime/kana.webp" },
  { id: "streak", src: "/hajime/streak.webp" },
  // The account email on this screen is blurred before export.
  { id: "you", src: "/hajime/you.webp" },
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
    apkUrl: "https://github.com/joey-hoagbp/hbp-personal-site/releases/download/hajime-v1.1/hajime-japanese.apk",
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
    highlights: [
      {
        label: { vi: "Vấn đề", en: "The problem" },
        body: {
          vi:
            "Phần lớn ứng dụng dạy nhận diện kana, không dạy ghi nhớ lâu — học xong buổi đầu, " +
            "quên sau ba ngày. Hajime dạy theo lô ba bài \"dạy rồi kiểm tra\", rồi giao mỗi thẻ " +
            "đã học cho lịch ôn tập SM-2: thời điểm ôn tiếp theo được tính, không đoán.",
          en:
            "Most apps teach you to recognise kana, not to keep it — learn it in one sitting, " +
            "forget it in three days. Hajime teaches in batches of three, teach then check, and " +
            "hands every learned card to an SM-2 schedule: the next review is calculated, not guessed.",
        },
      },
      {
        label: { vi: "Quyết định kỹ thuật", en: "The technical decision" },
        body: {
          vi:
            "SM-2 chạy hai lần: trên điện thoại để thẻ tiếp theo hiện ngay, không đợi mạng; trên " +
            "server để làm nguồn sự thật khi cài lại hay đổi máy. Một bộ test vector dùng chung " +
            "giữ hai bên khớp nhau — lệch một ngày cũng bị bắt lỗi.",
          en:
            "SM-2 runs twice: on the phone, so the next card appears with no network wait; on the " +
            "server, as the source of truth across reinstalls and devices. One shared test-vector " +
            "suite keeps the two in step — a one-day drift fails it.",
        },
      },
    ],
  },
  {
    id: "one-more-friday",
    title: "One More Friday",
    current: true,
    chips: [
      { label: "Mobile Game", accent: true },
      { label: "Godot", accent: false },
      { label: "C#", accent: false },
      { label: "Pixel Art", accent: false },
    ],
    subtitle: {
      vi: "Game giải đố kể chuyện trên di động",
      en: "A narrative puzzle game for mobile",
    },
    description: {
      vi:
        "Game pixel art về hai người yêu nhau rồi dần đánh mất nhau — không vì một biến cố lớn, " +
        "mà vì những khoảnh khắc nhỏ họ để trôi qua. Mỗi lựa chọn âm thầm định hình hai chỉ số " +
        "ẩn, và chỉ một trong hai cái kết phải tự mình giành lấy.",
      en:
        "A pixel-art game about two people falling in love and slowly losing each other — not " +
        "through one dramatic moment, but through all the small ones they let slip by. Every " +
        "choice quietly shapes two hidden stats, and one of the two endings has to be earned.",
    },
    features: {
      vi: [
        "Bảy chương, mỗi chương một cơ chế chơi riêng",
        "Hội thoại phân nhánh tiếng Việt và tiếng Anh (Yarn Spinner)",
        "Hai chỉ số ẩn VOICE và TRUST — không bao giờ hiện thành số",
        "Godot 4 .NET (C#), lõi .NET thuần có unit test",
      ],
      en: [
        "Seven chapters, each with its own mechanic",
        "Branching dialogue in Vietnamese and English (Yarn Spinner)",
        "Hidden VOICE and TRUST stats — never shown as numbers",
        "Godot 4 .NET (C#) over a pure, unit-tested .NET core",
      ],
    },
  },
];
