// ============================================================
//  All translatable copy, keyed by locale.
//  Language-neutral data (URLs, tech names, chips) stays in data.ts.
//  Dynamic portfolio data (skills, projects, cv entries) comes from the API.
// ============================================================

export type Lang = "vi" | "en";

export type Messages = {
  nav: {
    skills: string; work: string; experience: string; contact: string;
    menu: string; close: string; toLight: string; toDark: string;
  };
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
      alt: string;
    };
  };
  proof: {
    shipped: { label: string; value: string; note: string };
    now:     { label: string; value: string; note: string };
    source:  { label: string; value: string; note: string };
  };
  currently: { prefix: string };
  skills: {
    label: string;
    title: string;
    sub: string;
  };
  work: { title: string };
  portfolio: {
    label: string;
    title: string;
    sub: string;
    downloadApk: string;
    comingSoon: string;
    repo: string;
    demo: string;
    caseStudy: string;
  };
  device: {
    streak: string; charNote: string; hard: string; got: string;
    strokeLabel: string; kanjiReading: string; kanjiGloss: string;
  };
  experience: {
    label: string;
    title: string;
    sub: string;
    education: string;
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
    nav: {
      skills: "Kỹ năng", work: "Sản phẩm", experience: "Kinh nghiệm", contact: "Liên hệ",
      menu: "Mở menu", close: "Đóng menu",
      toLight: "Chuyển sang giao diện sáng", toDark: "Chuyển sang giao diện tối",
    },
    hero: {
      eyebrow: "Kỹ sư phần mềm · Hà Nội",
      taglineLines: ["Xây dựng sản phẩm", "mọi người yêu thích."],
      bio:
        "Backend là nghề chính — Java, Spring Boot, .NET. Tôi viết hệ thống chạy được thật, " +
        "rồi đóng gói nó thành sản phẩm người ta cài về máy.",
      viewWork: "Xem sản phẩm",
      getInTouch: "Liên hệ ngay",
      avatar: {
        name: "Hoàng Bảo Phúc",
        role: "Kỹ sư phần mềm",
        location: "Hà Nội, Việt Nam",
        alt: "Ảnh của Hoàng Bảo Phúc",
      },
    },
    proof: {
      shipped: { label: "Đã phát hành", value: "Hajime", note: "Android · APK cài được ngay · React Native + Spring Boot" },
      now:     { label: "Hiện tại", value: "Dr.JOY Việt Nam", note: "Kỹ sư backend · Java · Spring Boot · từ 3/2026" },
      source:  { label: "Mã nguồn", value: "joey-hoagbp", note: "github.com · 3 công ty trong 2 năm" },
    },
    currently: { prefix: "hiện tại" },
    skills: {
      label: "Kỹ Năng",
      title: "Tech Stack",
      sub: "Những công nghệ tôi sử dụng hàng ngày.",
    },
    work: { title: "Một sản phẩm, đã lên kệ." },
    portfolio: {
      label: "Sản Phẩm",
      title: "Featured Work",
      sub: "Sản phẩm nổi bật tôi đã xây dựng.",
      downloadApk: "Tải về APK",
      comingSoon: "Tải về APK · Sắp ra mắt",
      repo: "Mã nguồn",
      demo: "Bản demo",
      caseStudy: "Đọc case study",
    },
    device: {
      streak: "7 ngày",
      charNote: "hàng A · nguyên âm",
      hard: "Khó",
      got: "Nhớ rồi",
      strokeLabel: "THỨ TỰ NÉT · KANJI N5",
      kanjiReading: "NHẬT",
      kanjiGloss: "mặt trời, ngày — 4 nét\nにち · ひ",
    },
    experience: {
      label: "Kinh nghiệm · Experience",
      title: "Ba công ty, trước khi ra trường.",
      sub: "Bắt đầu đi làm từ năm hai. Backend ở cả ba nơi, hai ngôn ngữ, một lần rẽ qua frontend.",
      education: "Học vấn",
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
    nav: {
      skills: "Skills", work: "Work", experience: "Experience", contact: "Contact",
      menu: "Open menu", close: "Close menu",
      toLight: "Switch to light theme", toDark: "Switch to dark theme",
    },
    hero: {
      eyebrow: "Software Engineer · Ha Noi",
      taglineLines: ["Building apps people", "love to use."],
      bio:
        "Backend is the day job — Java, Spring Boot, .NET. I write systems that actually run, " +
        "then package them into something people install.",
      viewWork: "View work",
      getInTouch: "Get in touch",
      avatar: {
        name: "Hoàng Bảo Phúc",
        role: "Software Engineer",
        location: "Hà Nội, Vietnam",
        alt: "Photo of Hoàng Bảo Phúc",
      },
    },
    proof: {
      shipped: { label: "Shipped", value: "Hajime", note: "Android · installable APK · React Native + Spring Boot" },
      now:     { label: "Currently", value: "Dr.JOY Vietnam", note: "Backend engineer · Java · Spring Boot · since 3/2026" },
      source:  { label: "Source", value: "joey-hoagbp", note: "github.com · 3 companies in 2 years" },
    },
    currently: { prefix: "currently" },
    skills: {
      label: "Skills",
      title: "Tech Stack",
      sub: "Technologies I use every day.",
    },
    work: { title: "One product, actually shipped." },
    portfolio: {
      label: "Portfolio",
      title: "Featured Work",
      sub: "Standout products I've built.",
      downloadApk: "Download APK",
      comingSoon: "Download APK · Coming soon",
      repo: "Source",
      demo: "Live demo",
      caseStudy: "Read the case study",
    },
    device: {
      streak: "7 days",
      charNote: "A-row · vowel",
      hard: "Hard",
      got: "Got it",
      strokeLabel: "STROKE ORDER · N5 KANJI",
      kanjiReading: "NICHI",
      kanjiGloss: "sun, day — 4 strokes\nにち · ひ",
    },
    experience: {
      label: "Experience",
      title: "Three companies, before graduating.",
      sub: "Started working in second year. Backend at all three, two languages, one detour through frontend.",
      education: "Education",
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
