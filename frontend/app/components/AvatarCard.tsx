"use client";

import Image from "next/image";
import { useState } from "react";
import { AVATAR_SRC } from "../data";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

export default function AvatarCard() {
  const { lang } = useLang();
  const a = messages[lang].hero.avatar;
  const [imgOk, setImgOk] = useState(true);

  return (
    <figure className="avatar-card">
      <div className="avatar-frame">
        <div className="avatar-photo">
          {imgOk ? (
            <Image
              className="avatar-photo-img"
              src={AVATAR_SRC}
              alt={a.alt}
              fill
              sizes="(max-width: 880px) 100vw, 420px"
              priority
              onError={() => setImgOk(false)}
            />
          ) : (
            <span className="avatar-mono">HBP</span>
          )}
        </div>
      </div>
      <figcaption className="avatar-caption">
        <span className="avatar-name">— {a.name}</span>
        <span className="avatar-role">
          {a.role} · {a.location}
        </span>
      </figcaption>
    </figure>
  );
}
