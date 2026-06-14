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
