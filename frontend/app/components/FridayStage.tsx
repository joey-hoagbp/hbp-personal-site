"use client";

import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

// One More Friday's Work stage: Lucas and Mary facing each other across an
// empty gap, on the game's own NIGHT ink. Each is one 32x56 standing frame
// cut from the game's recoloured LPC sheets, integer-scaled with
// `image-rendering: pixelated` (see `.friday-*` in globals.css) — never
// resampled, the same rule the game holds itself to. LPC art is
// CC-BY-SA / OGA-BY, so the credits link is part of the stage, not optional.
export default function FridayStage() {
  const { lang } = useLang();
  const t = messages[lang].friday;

  return (
    <div className="work-stage friday-stage">
      <div className="friday-pair">
        <img className="friday-sprite" src="/one-more-friday/lucas.png" alt={t.lucasAlt} width={32} height={56} loading="lazy" />
        <img className="friday-sprite" src="/one-more-friday/mary.png" alt={t.maryAlt} width={32} height={56} loading="lazy" />
      </div>
      <a className="friday-credits" href="/one-more-friday/CREDITS.txt">{t.credits}</a>
    </div>
  );
}
