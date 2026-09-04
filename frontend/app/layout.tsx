import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { ThemeProvider } from "./components/ThemeProvider";

const THEME_INIT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export const metadata: Metadata = {
  title: "Hoàng Bảo Phúc — Software Engineer",
  description:
    "Kỹ sư phần mềm tại Hà Nội — xây dựng sản phẩm mobile & web. " +
    "Software engineer building apps people love to use.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // These two literals are the one sanctioned exception to "no hex outside
  // globals.css" — the viewport export is metadata, not CSS, and can't read
  // a custom property. They must be kept in sync with --ground in
  // globals.css: dark's :root (#0D1015) and light's :root[data-theme="light"]
  // (#FFFFFF).
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0D1015" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Hero portrait is the page's LCP element — <img> has no `priority` prop
            to emit this, so it's preloaded explicitly here. Ruling F6. */}
        <link rel="preload" as="image" href="/phuc-reeves.webp" fetchPriority="high" />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..112,400..800&family=JetBrains+Mono:wght@400;500&family=Literata:opsz,wght@7..72,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
