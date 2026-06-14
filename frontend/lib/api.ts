// Talks to the Spring Boot backend. The base URL is configurable so the same
// build works in dev and prod; it falls back to the local backend port.
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; message: string; fields?: Record<string, string> };

/**
 * POSTs a contact-form submission to the backend.
 * Never throws — network/validation problems come back as { ok: false }.
 */
export async function sendContactMessage(
  payload: ContactPayload
): Promise<ContactResult> {
  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return { ok: true };
    }

    // The backend returns { error, fields: { field: message } } on 400.
    let fields: Record<string, string> | undefined;
    try {
      const body = await res.json();
      if (body && typeof body.fields === "object") {
        fields = body.fields as Record<string, string>;
      }
    } catch {
      // non-JSON error body — fall through to a generic message
    }

    return {
      ok: false,
      message:
        fields !== undefined
          ? "Vui lòng kiểm tra lại thông tin đã nhập."
          : `Không thể gửi (mã ${res.status}). Vui lòng thử lại.`,
      fields,
    };
  } catch {
    return {
      ok: false,
      message:
        "Không thể kết nối tới máy chủ. Kiểm tra kết nối hoặc thử lại sau.",
    };
  }
}
