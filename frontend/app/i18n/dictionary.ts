// ============================================================
//  All translatable copy, keyed by locale.
//  Language-neutral data (URLs, tech names, chips) stays in data.ts.
//  Dynamic portfolio data (skills, projects, cv entries) comes from the API.
// ============================================================

export type Lang = "vi" | "en";

export type Messages = {
  nav: { skills: string; work: string; cv: string; contact: string };
  hero: {
    eyebrow: string;
    taglineLines: [string, string];
    bio: string;
    viewWork: string;
    getInTouch: string;
    avatar: {
      name: string;
      role: string;
      location: string;
      status: string;
      alt: string;
    };
  };
  skills: {
    label: string;
    title: string;
    sub: string;
  };
  portfolio: {
    label: string;
    title: string;
    sub: string;
    downloadApk: string;
    comingSoon: string;
  };
  cv: {
    label: string;
    title: string;
    colExperience: string;
    colEducation: string;
    downloadCv: string;
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
      avatar: {
        name: "Hoàng Bảo Phúc",
        role: "Kỹ sư phần mềm",
        location: "Hà Nội, Việt Nam",
        status: "Sẵn sàng nhận việc",
        alt: "Ảnh của Hoàng Bảo Phúc",
      },
    },
    skills: {
      label: "Kỹ Năng",
      title: "Tech Stack",
      sub: "Những công nghệ tôi sử dụng hàng ngày.",
    },
    portfolio: {
      label: "Sản Phẩm",
      title: "Featured Work",
      sub: "Sản phẩm nổi bật tôi đã xây dựng.",
      downloadApk: "Tải về APK",
      comingSoon: "Tải về APK · Sắp ra mắt",
    },
    cv: {
      label: "Hồ Sơ",
      title: "Experience & Education",
      colExperience: "Kinh Nghiệm",
      colEducation: "Học Vấn",
      downloadCv: "Tải CV (PDF)",
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
      avatar: {
        name: "Hoàng Bảo Phúc",
        role: "Software Engineer",
        location: "Hà Nội, Vietnam",
        status: "Open to work",
        alt: "Photo of Hoàng Bảo Phúc",
      },
    },
    skills: {
      label: "Skills",
      title: "Tech Stack",
      sub: "Technologies I use every day.",
    },
    portfolio: {
      label: "Portfolio",
      title: "Featured Work",
      sub: "Standout products I've built.",
      downloadApk: "Download APK",
      comingSoon: "Download APK · Coming soon",
    },
    cv: {
      label: "Resume",
      title: "Experience & Education",
      colExperience: "Experience",
      colEducation: "Education",
      downloadCv: "Download CV (PDF)",
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
