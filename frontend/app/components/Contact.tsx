"use client";

import { useState, type FormEvent } from "react";
import SectionHeader from "./SectionHeader";
import { SOCIAL_LINKS } from "../data";
import { sendContactMessage } from "../../lib/api";
import { useLang } from "../i18n/LanguageProvider";
import { messages } from "../i18n/dictionary";

type Status = "idle" | "submitting" | "sent" | "error";

export default function Contact() {
  const { lang } = useLang();
  const t = messages[lang].contact;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError(null);
    setFields({});

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
      setFields(result.fields ?? {});
      setStatus("error");
    }
  }

  return (
    <section className="contact shell">
      <SectionHeader
        id="contact"
        label={t.label}
        title={
          <>
            {t.headingLine1}
            <br />
            <span className="hdg-accent">{t.headingAccent}</span>
          </>
        }
      />
      <div className="g12">
        <div className="contact-copy">
          <p className="prose">{t.body}</p>
          <div className="social-list">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-row"
              >
                <span className="social-key">{t.socialKeys[icon]}</span>
                {label}
              </a>
            ))}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {status === "sent" ? (
            <p className="prose" role="status">
              {t.sentMsg}
            </p>
          ) : (
            <>
              <div className="form-pair">
                <div className={fields.name ? "field field-error" : "field"}>
                  <label className="field-label" htmlFor="cf-name">
                    {t.nameLabel}
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    className="field-input"
                    placeholder={t.namePlaceholder}
                    required
                    aria-invalid={Boolean(fields.name)}
                    aria-describedby={fields.name ? "cf-name-msg" : undefined}
                  />
                  {fields.name && (
                    <span className="field-msg" id="cf-name-msg">
                      {fields.name}
                    </span>
                  )}
                </div>
                <div className={fields.email ? "field field-error" : "field"}>
                  <label className="field-label" htmlFor="cf-email">
                    {t.emailLabel}
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    className="field-input"
                    placeholder={t.emailPlaceholder}
                    required
                    aria-invalid={Boolean(fields.email)}
                    aria-describedby={fields.email ? "cf-email-msg" : undefined}
                  />
                  {fields.email && (
                    <span className="field-msg" id="cf-email-msg">
                      {fields.email}
                    </span>
                  )}
                </div>
              </div>

              <div className={fields.subject ? "field field-error" : "field"}>
                <label className="field-label" htmlFor="cf-subject">
                  {t.subjectLabel}
                </label>
                <input
                  id="cf-subject"
                  name="subject"
                  type="text"
                  className="field-input"
                  placeholder={t.subjectPlaceholder}
                  aria-invalid={Boolean(fields.subject)}
                  aria-describedby={fields.subject ? "cf-subject-msg" : undefined}
                />
                {fields.subject && (
                  <span className="field-msg" id="cf-subject-msg">
                    {fields.subject}
                  </span>
                )}
              </div>

              <div className={fields.message ? "field field-error" : "field"}>
                <label className="field-label" htmlFor="cf-message">
                  {t.messageLabel}
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  className="field-input"
                  rows={5}
                  placeholder={t.messagePlaceholder}
                  required
                  aria-invalid={Boolean(fields.message)}
                  aria-describedby={fields.message ? "cf-message-msg" : undefined}
                />
                {fields.message && (
                  <span className="field-msg" id="cf-message-msg">
                    {fields.message}
                  </span>
                )}
              </div>

              {error && (
                <p className="form-err" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-full"
                disabled={status === "submitting"}
              >
                {status === "submitting" && <span className="btn-spinner" aria-hidden="true" />}
                {status === "submitting" ? t.submitting : t.submit}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
