"use client";

import { useLang } from "../i18n/LanguageProvider";
import { LANG_LABELS, type Lang } from "../i18n/dictionary";

const LANGS: Lang[] = ["vi", "en"];

export default function LangToggle({ layout = "inline" }: { layout?: "inline" | "sheet" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={layout === "sheet" ? "lang-toggle lang-toggle-sheet" : "lang-toggle"}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className={l === lang ? "lang-opt lang-opt-active" : "lang-opt"}
          aria-pressed={l === lang}
          aria-label={LANG_LABELS[l]}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
