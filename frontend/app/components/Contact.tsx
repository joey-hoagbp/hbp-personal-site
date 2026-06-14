"use client";

import { useState, type FormEvent } from "react";
import { SOCIAL_LINKS } from "../data";
import { SOCIAL_ICONS } from "./icons";
import { sendContactMessage } from "../../lib/api";

type Status = "idle" | "submitting" | "sent" | "error";

export default function Contact() {
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
            <p className="section-label">Liên Hệ / Contact</p>
            <h2 className="contact-hdg">
              Cùng xây dựng
              <br />
              <span className="hdg-accent">điều gì đó.</span>
            </h2>
            <p className="contact-body">
              Tôi luôn sẵn sàng thảo luận về các dự án mới, ý tưởng sáng tạo hoặc
              cơ hội hợp tác. Hãy liên hệ với tôi.
            </p>
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
                <p className="form-ok-msg">Đã gửi! Tôi sẽ phản hồi sớm nhất có thể.</p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="fg">
                    <label className="fl" htmlFor="cf-name">
                      Tên của bạn
                    </label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      className="fi"
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>
                  <div className="fg">
                    <label className="fl" htmlFor="cf-email">
                      Email
                    </label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      className="fi"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="fg">
                  <label className="fl" htmlFor="cf-subject">
                    Chủ đề
                  </label>
                  <input
                    id="cf-subject"
                    name="subject"
                    type="text"
                    className="fi"
                    placeholder="Dự án hợp tác..."
                  />
                </div>
                <div className="fg">
                  <label className="fl" htmlFor="cf-message">
                    Tin nhắn
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    className="fi"
                    rows={5}
                    placeholder="Xin chào Phúc, tôi muốn thảo luận về..."
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
                  {status === "submitting" ? "Đang gửi..." : "Gửi tin nhắn"}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
