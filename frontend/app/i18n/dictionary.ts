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
    footer: { copy: "© 2026 Hoàng Bảo Phúc. Xây dựng bằng cả tâm huyết." },
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
    footer: { copy: "© 2026 Hoàng Bảo Phúc. Built with care." },
  },
};
