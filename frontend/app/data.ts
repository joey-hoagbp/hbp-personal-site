// ============================================================
//  Site content. Kept in one place so copy is easy to edit.
//  (Backend stores contact submissions; everything here is static.)
// ============================================================

export const SKILL_GROUPS: { label: string; items: string[] }[] = [
  { label: "Ngôn ngữ / Languages", items: ["JavaScript", "TypeScript", "Python", "Dart", "Java"] },
  { label: "Frontend & Mobile", items: ["React", "Next.js", "Flutter", "Tailwind CSS", "HTML/CSS"] },
  { label: "Backend & API", items: ["Node.js", "Express", "FastAPI", "REST API", "GraphQL"] },
  { label: "Tools & DevOps", items: ["Git", "Docker", "PostgreSQL", "Firebase", "Figma"] },
];

export const HERO_STATS: { num: string; lbl: string }[] = [
  { num: "3+", lbl: "Năm kinh nghiệm" },
  { num: "10+", lbl: "Dự án hoàn thành" },
  { num: "1", lbl: "App published" },
];

export type TimelineEntry = {
  date: string;
  title: string;
  org: string;
  desc: string;
};

export const EXPERIENCE: TimelineEntry[] = [
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
];

export const EDUCATION: TimelineEntry[] = [
  {
    date: "2019 — 2023",
    title: "Kỹ sư Khoa học Máy tính",
    org: "ĐH Bách Khoa TP.HCM",
    desc: "Chuyên ngành Kỹ thuật Phần mềm. Tốt nghiệp loại Giỏi.",
  },
  {
    date: "2023",
    title: "Flutter Development",
    org: "Online Certificate",
    desc: "Chứng chỉ phát triển ứng dụng Flutter nâng cao từ Google.",
  },
];

export const SOCIAL_LINKS: { label: string; href: string; icon: "mail" | "github" | "linkedin" }[] = [
  { label: "phuc@example.com", href: "mailto:phuc@example.com", icon: "mail" },
  { label: "github.com/hbphuc", href: "https://github.com", icon: "github" },
  { label: "linkedin.com/in/hbphuc", href: "https://linkedin.com", icon: "linkedin" },
];
