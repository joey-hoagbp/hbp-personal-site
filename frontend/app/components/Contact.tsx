"use client";

import { useState, type FormEvent } from "react";
import { SOCIAL_LINKS } from "../data";
import { SOCIAL_ICONS } from "./icons";
import { sendContactMessage } from "../../lib/api";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

type Status = "idle" | "submitting" | "sent" | "error";

export default function Contact() {
  const { lang } = useLang();
  const t = messages[lang].contact;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError(null);

    const result = await sendContactMessage({
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    });

    if (result.ok) {
      setStatus("sent");
    } else {
      setError(result.message);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-bordered">
      <div className="container">
        <div className="contact-layout">
          <div className="reveal">
            <p className="section-label">{t.label}</p>
            <h2 className="contact-hdg">
              {t.headingLine1}
              <br />
              <span className="hdg-accent">{t.headingAccent}</span>
            </h2>
            <p className="contact-body">{t.body}</p>
            <div className="soc-links">
              {SOCIAL_LINKS.map(({ label, href, icon }) => {
                const Icon = SOCIAL_ICONS[icon];
                return (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="soc-link"
                  >
                    <span className="soc-icon">
                      <Icon />
                    </span>
                    {label}
                  </a>
                );
              })}
            </div>
          </div>

          <form className="contact-form reveal reveal-d2" onSubmit={handleSubmit} noValidate>
            {status === "sent" ? (
              <div className="form-ok">
                <div className="form-ok-icon">✓</div>
                <p className="form-ok-msg">{t.sentMsg}</p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="fg">
                    <label className="fl" htmlFor="cf-name">
                      {t.nameLabel}
                    </label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      className="fi"
                      placeholder={t.namePlaceholder}
                      required
                    />
                  </div>
                  <div className="fg">
                    <label className="fl" htmlFor="cf-email">
                      {t.emailLabel}
                    </label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      className="fi"
                      placeholder={t.emailPlaceholder}
                      required
                    />
                  </div>
                </div>
                <div className="fg">
                  <label className="fl" htmlFor="cf-subject">
                    {t.subjectLabel}
                  </label>
                  <input
                    id="cf-subject"
                    name="subject"
                    type="text"
                    className="fi"
                    placeholder={t.subjectPlaceholder}
                  />
                </div>
                <div className="fg">
                  <label className="fl" htmlFor="cf-message">
                    {t.messageLabel}
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    className="fi"
                    rows={5}
                    placeholder={t.messagePlaceholder}
                    required
                  />
                </div>
                {error && (
                  <p className="form-err" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn-primary btn-full"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? t.submitting : t.submit}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
