// ============================================================
//  All translatable copy, keyed by locale.
//  Language-neutral data (URLs, tech names, chips, skills, projects) stays in data.ts.
//  Only the Experience and Education timelines are fetched from the
//  backend profile API (see lib/api.ts), with data.ts's DEFAULT_PROFILE as
//  the offline fallback.
// ============================================================

import type { HajimeTourId, TechKey } from "../data";

export type Lang = "vi" | "en";

export type Messages = {
  nav: {
    skills: string; work: string; experience: string; education: string; contact: string;
    menu: string; close: string; toLight: string; toDark: string;
  };
  hero: {
    eyebrow: string;
    taglineLines: [string, string];
    bio: string;
    viewWork: string;
    getInTouch: string;
    avatar: {
      location: string;
      alt: string;
    };
  };
  proof: {
    shipped: { label: string; value: string };
    now:     { label: string; value: string };
    source:  { label: string; value: string };
  };
  skills: {
    label: string;
    // One gloss per technology, keyed by TechKey in data.ts.
    items: Record<TechKey, string>;
  };
  portfolio: {
    label: string;
    title: string;
    downloadApk: string;
    comingSoon: string;
    repo: string;
    demo: string;
    caseStudy: string;
  };
  device: {
    learnAlt: string; kanaAlt: string; checkAlt: string;
  };
  experience: {
    label: string;
  };
  education: {
    label: string;
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
    /** Display label for each social-link row's `.social-key` column — keyed
     * by the `SOCIAL_LINKS[].icon` discriminator (data.ts), not derived from
     * it, so renaming the discriminator can't silently change on-screen copy. */
    socialKeys: Record<"mail" | "github" | "linkedin" | "facebook" | "instagram", string>;
  };
  footer: { copy: string; builtWith: string };
  caseHajime: {
    hero: {
      label: string;
      title: string;
      subtitle: string;
      facts: { label: string; value: string }[];
    };
    problem: { label: string; title: string; body1: string; body2: string };
    decision: {
      label: string;
      title: string;
      body1: string;
      body2: string;
      nodes: {
        start: { title: string; body: string };
        client: { title: string; body: string };
        clientOut: { title: string; body: string };
        server: { title: string; body: string };
        serverOut: { title: string; body: string };
      };
      sharedTitle: string;
      sharedNote: string;
    };
    stack: { label: string };
    tour: {
      label: string;
      title: string;
      note: string;
      regionLabel: string;
      screens: Record<HajimeTourId, { name: string; caption: string }>;
    };
    status: {
      label: string;
      title: string;
      note: string;
      shippedLabel: string;
      notLabel: string;
      shipped: string[];
      notYet: string[];
    };
    cta: { label: string; title: string; note: string; install: string; back: string };
  };
};

// Native-language names shown in the switcher dropdown (never translated).
export const LANG_LABELS: Record<Lang, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

export const messages: Record<Lang, Messages> = {
  vi: {
    nav: {
      skills: "Kỹ năng", work: "Sản phẩm", experience: "Kinh nghiệm", education: "Học vấn", contact: "Liên hệ",
      menu: "Mở menu", close: "Đóng menu",
      toLight: "Chuyển sang giao diện sáng", toDark: "Chuyển sang giao diện tối",
    },
    hero: {
      eyebrow: "Kỹ sư phần mềm · Hà Nội",
      taglineLines: ["Làm sản phẩm bằng sự tận tâm", "và niềm tin rằng chi tiết nhỏ tạo nên khác biệt lớn."],
      bio:
        "Tôi không viết code chỉ để nó chạy — mỗi dòng đều nhắm đến một mục tiêu: " +
        "sản phẩm ổn định, đáng tin, và người dùng thực sự muốn quay lại.",
      viewWork: "Xem sản phẩm",
      getInTouch: "Liên hệ ngay",
      avatar: {
        location: "Hà Nội, Việt Nam",
        alt: "Ảnh của Hoàng Bảo Phúc",
      },
    },
    proof: {
      shipped: { label: "Đã phát hành", value: "Hajime" },
      now:     { label: "Hiện tại", value: "Dr.JOY Việt Nam" },
      source:  { label: "Mã nguồn", value: "joey-hoagbp" },
    },
    skills: {
      label: "Kỹ năng · Stack",
      items: {
        spring: "Dịch vụ REST, xác thực và tầng dữ liệu tôi viết mỗi ngày.",
        microservices: "Tách miền nghiệp vụ thành những service hỏng độc lập.",
        grpc: "Hợp đồng có kiểu cho các lời gọi giữa service.",
        mongo: "Mô hình tài liệu, aggregation và index đủ vững.",
      },
    },
    portfolio: {
      label: "Sản Phẩm",
      title: "Featured Work",
      downloadApk: "Tải về APK",
      comingSoon: "Tải về APK · Sắp ra mắt",
      repo: "Mã nguồn",
      demo: "Bản demo",
      caseStudy: "Đọc case study",
    },
    device: {
      learnAlt: "Tab Học của Hajime: lộ trình bài học, các bài đã xong và bài tiếp theo cùng Mochi",
      kanaAlt: "Tab Kana của Hajime: bảng Hiragana xếp theo hàng",
      checkAlt: "Một câu kiểm tra trong bài học Hajime, trả lời đúng cách đọc của な",
    },
    experience: {
      label: "Kinh nghiệm · Experience",
    },
    education: {
      label: "Học vấn · Education",
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
      socialKeys: {
        mail: "Email",
        github: "GitHub",
        linkedin: "LinkedIn",
        facebook: "Facebook",
        instagram: "Instagram",
      },
    },
    footer: {
      copy: "© 2026 Hoàng Bảo Phúc. Xây dựng bằng cả tâm huyết.",
      builtWith: "Next.js · Spring Boot · dựng bằng tay, không dùng mẫu",
    },
    caseHajime: {
      hero: {
        label: "Case Study",
        title: "Hajime: dạy tiếng Nhật cho người Việt từ con số 0.",
        subtitle:
          "Một ứng dụng di động, hai cỗ máy lặp lại ngắt quãng chạy song song — " +
          "client để phản hồi tức thì, server để làm nguồn sự thật.",
        facts: [
          { label: "Vai trò", value: "Full-stack, một mình" },
          { label: "Stack", value: "React Native · Spring Boot · MongoDB" },
          { label: "Trạng thái", value: "Đang phát triển" },
        ],
      },
      problem: {
        label: "Vấn Đề",
        title: "Học một bảng chữ cái mới, không quên nó vào tuần sau.",
        body1:
          "Người Việt học tiếng Nhật thường bắt đầu từ Hiragana và Katakana — nhưng phần lớn " +
          "ứng dụng chỉ dạy nhận diện, không dạy ghi nhớ dài hạn. Học xong buổi đầu, quên sau " +
          "ba ngày.",
        body2:
          "Hajime dạy theo lô ba bài kiểu \"dạy rồi kiểm tra\", rồi giao mỗi thẻ đã học cho " +
          "một lịch ôn tập lặp lại ngắt quãng (SM-2) — thời điểm ôn tiếp theo được tính, không đoán.",
      },
      decision: {
        label: "Quyết Định Kỹ Thuật",
        title: "SM-2 chạy hai lần — không phải một.",
        body1:
          "Chạy thuật toán chỉ trên server nghĩa là mỗi lần trả lời, người dùng phải đợi một " +
          "round-trip mạng mới thấy thẻ tiếp theo. Chạy chỉ trên client thì không còn nguồn sự " +
          "thật khi cài lại máy hoặc đổi thiết bị.",
        body2:
          "Giải pháp: chạy cả hai. Client tính ngay để phản hồi tức thì; server tính lại để làm " +
          "nguồn sự thật; cả hai được giữ đồng bộ bằng cùng một bộ test vector dùng chung.",
        nodes: {
          start: { title: "Trả lời thẻ", body: "đúng / sai · thời gian phản hồi" },
          client: { title: "SM-2 · Client", body: "tính ngay trên máy" },
          clientOut: { title: "Thẻ kế tiếp", body: "hiện ngay, không đợi mạng" },
          server: { title: "SM-2 · Server", body: "tính lại khi đồng bộ" },
          serverOut: { title: "Nguồn sự thật", body: "lịch ôn tập chính thức" },
        },
        sharedTitle: "Cùng một bộ test vector",
        sharedNote:
          "Cả hai cách triển khai SM-2 chạy qua cùng một bộ test vector dùng chung — " +
          "lệch một ngày cũng bị bắt lỗi.",
      },
      stack: { label: "Công Nghệ" },
      tour: {
        label: "Giao diện",
        title: "Từ đăng nhập đến chuỗi ngày — bảy màn hình.",
        note: "Ảnh chụp thật từ bản release, theo đúng thứ tự người học mới gặp chúng.",
        regionLabel: "Các màn hình của Hajime — cuộn ngang để xem hết",
        screens: {
          signin: { name: "Đăng nhập", caption: "Đăng nhập bằng Google — cách duy nhất để vào app." },
          learn: { name: "Học", caption: "Lộ trình bài học; Mochi chỉ bài tiếp theo." },
          teach: { name: "Dạy", caption: "Mỗi chữ mới được dạy trước, kèm âm thanh." },
          check: { name: "Kiểm tra", caption: "Rồi mới kiểm tra — xong bài, thẻ chuyển sang lịch ôn SM-2." },
          kana: { name: "Kana", caption: "Bảng Hiragana và Katakana, đếm số chữ đã thuộc." },
          streak: { name: "Chuỗi", caption: "Chuỗi ngày, bản đồ hoạt động, XP và thành tích." },
          you: { name: "Bạn", caption: "Mục tiêu hằng ngày, giờ nhắc, furigana và ngôn ngữ." },
        },
      },
      status: {
        label: "Tình Trạng",
        title: "Những gì đã chạy thật, và những gì chưa.",
        note: "Cập nhật thẳng thắn — không phải danh sách marketing.",
        shippedLabel: "Đã có",
        notLabel: "Chưa có",
        shipped: [
          "Âm thanh Hiragana / Katakana thật, tạo bằng Edge TTS",
          "SM-2 chạy song song client/server, giữ đồng bộ bằng test vector dùng chung",
          "Thứ tự nét viết Kanji N5, lấy từ KanjiVG",
          "Đăng nhập Google, refresh token tự xoay vòng, hoạt động offline",
          "Mở app tức thì: hiện dữ liệu phiên trước từ bộ nhớ đệm trong lúc backend miễn phí khởi động lại",
        ],
        notYet: [
          "Mới nạp sẵn 100/700 từ vựng",
          "Chưa có âm thanh cho từ vựng và Kanji",
          "Chưa cấu hình thông tin xác thực FCM (thông báo đẩy)",
          "Số phút học vẫn là ước tính, chưa đo thời gian thật",
        ],
      },
      cta: {
        label: "Tiếp Theo",
        title: "Cài thử, hoặc quay lại xem toàn bộ sản phẩm.",
        note: "APK Android, cài trực tiếp — không cần qua Play Store.",
        install: "Tải về APK",
        back: "Quay lại trang chủ",
      },
    },
  },

  en: {
    nav: {
      skills: "Skills", work: "Work", experience: "Experience", education: "Education", contact: "Contact",
      menu: "Open menu", close: "Close menu",
      toLight: "Switch to light theme", toDark: "Switch to dark theme",
    },
    hero: {
      eyebrow: "Software Engineer · Ha Noi",
      taglineLines: ["Built with care, believing", "small details make a big difference."],
      bio:
        "I don't write code just to make it run — every line serves one goal: " +
        "a product that's stable, trustworthy, and worth coming back to.",
      viewWork: "View work",
      getInTouch: "Get in touch",
      avatar: {
        location: "Hà Nội, Vietnam",
        alt: "Photo of Hoàng Bảo Phúc",
      },
    },
    proof: {
      shipped: { label: "Shipped", value: "Hajime" },
      now:     { label: "Currently", value: "Dr.JOY Vietnam" },
      source:  { label: "Source", value: "joey-hoagbp" },
    },
    skills: {
      label: "Skills · Stack",
      items: {
        spring: "REST services, auth and data layers I write day to day.",
        microservices: "Splitting a domain into services that fail on their own.",
        grpc: "Typed contracts for the calls services make to each other.",
        mongo: "Document modelling, aggregation and indexes that hold up.",
      },
    },
    portfolio: {
      label: "Portfolio",
      title: "Featured Work",
      downloadApk: "Download APK",
      comingSoon: "Download APK · Coming soon",
      repo: "Source",
      demo: "Live demo",
      caseStudy: "Read the case study",
    },
    device: {
      learnAlt: "Hajime's Learn tab: the lesson path, finished lessons and the next one with Mochi",
      kanaAlt: "Hajime's Kana tab: the Hiragana chart grouped by row",
      checkAlt: "A check question in a Hajime lesson, answered with the correct reading of な",
    },
    experience: {
      label: "Experience",
    },
    education: {
      label: "Education",
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
      socialKeys: {
        mail: "Email",
        github: "GitHub",
        linkedin: "LinkedIn",
        facebook: "Facebook",
        instagram: "Instagram",
      },
    },
    footer: {
      copy: "© 2026 Hoàng Bảo Phúc. Built with care.",
      builtWith: "Next.js · Spring Boot · hand-built, not templated",
    },
    caseHajime: {
      hero: {
        label: "Case Study",
        title: "Hajime: teaching Japanese to Vietnamese speakers from zero.",
        subtitle:
          "One mobile app, two spaced-repetition engines running in parallel — " +
          "client for instant feedback, server as the source of truth.",
        facts: [
          { label: "Role", value: "Solo full-stack" },
          { label: "Stack", value: "React Native · Spring Boot · MongoDB" },
          { label: "Status", value: "In active development" },
        ],
      },
      problem: {
        label: "Problem",
        title: "Learn a new alphabet, don't forget it next week.",
        body1:
          "Vietnamese learners of Japanese usually start with Hiragana and Katakana — but most " +
          "apps only teach recognition, not long-term retention. Learn it in one sitting, forget " +
          "it in three days.",
        body2:
          "Hajime teaches in batches of three with a teach-then-check pattern, then hands every " +
          "learned card to a spaced-repetition schedule (SM-2) — the next review time is " +
          "calculated, not guessed.",
      },
      decision: {
        label: "Technical Decision",
        title: "SM-2 runs twice — not once.",
        body1:
          "Running the algorithm only on the server means every answer waits on a network " +
          "round-trip before the next card appears. Running it only on the client leaves no " +
          "source of truth on reinstall or a new device.",
        body2:
          "The fix: run both. The client computes instantly for immediate feedback; the server " +
          "recomputes as the source of truth; both are kept in sync by one shared set of test " +
          "vectors.",
        nodes: {
          start: { title: "Card answered", body: "correct / again · response time" },
          client: { title: "SM-2 · Client", body: "computed on-device" },
          clientOut: { title: "Next card", body: "shown instantly, no network wait" },
          server: { title: "SM-2 · Server", body: "recomputed on sync" },
          serverOut: { title: "Source of truth", body: "the review schedule of record" },
        },
        sharedTitle: "One shared test-vector suite",
        sharedNote:
          "Both SM-2 implementations run against the same shared test vectors — " +
          "a one-day drift fails the suite.",
      },
      stack: { label: "Stack" },
      tour: {
        label: "Screens",
        title: "From sign-in to streak — seven screens.",
        note: "Real screenshots of the release build, in the order a new learner meets them.",
        regionLabel: "Hajime's screens — scroll sideways to see them all",
        screens: {
          signin: { name: "Sign in", caption: "Google Sign-In — the only way in." },
          learn: { name: "Learn", caption: "The lesson path, with Mochi pointing at the next one." },
          teach: { name: "Teach", caption: "Each new character is taught first, with its audio." },
          check: { name: "Check", caption: "Then checked — finish the lesson and its cards join the SM-2 schedule." },
          kana: { name: "Kana", caption: "Hiragana and Katakana charts, counting what you've mastered." },
          streak: { name: "Streak", caption: "Day streak, activity heatmap, XP and achievements." },
          you: { name: "You", caption: "Daily goal, reminder time, furigana and language." },
        },
      },
      status: {
        label: "Status",
        title: "What actually runs, and what doesn't yet.",
        note: "An honest update — not a marketing list.",
        shippedLabel: "Shipped",
        notLabel: "Not yet",
        shipped: [
          "Real Hiragana / Katakana audio, generated with Edge TTS",
          "Dual-run SM-2 (client + server), kept in sync by shared test vectors",
          "KanjiVG stroke order for JLPT N5 kanji",
          "Google Sign-In with rotating refresh tokens and offline support",
          "Instant launch: last session's data loads from a local cache while the free-tier backend wakes up",
        ],
        notYet: [
          "Only 100 of 700 vocabulary items seeded",
          "No audio yet for vocabulary or kanji",
          "FCM push credentials not configured",
          "Session-minutes tracking is still a proxy, not a real measurement",
        ],
      },
      cta: {
        label: "Next",
        title: "Try the install, or go back to the full portfolio.",
        note: "Android APK, direct install — no Play Store needed.",
        install: "Download APK",
        back: "Back to the homepage",
      },
    },
  },
};
