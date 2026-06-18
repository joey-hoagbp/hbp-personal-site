"use client";

import { useEffect } from "react";

/**
 * Mounted once. Wires three cursor-driven, class-based effects via delegated
 * pointer listeners (no per-component state):
 *   .spotlight — sets --mx/--my on the hovered card for a radial glow overlay
 *   .magnetic  — translates the element a fraction toward the cursor
 *   .tilt      — applies a small perspective rotateX/rotateY from cursor position
 * All effects are disabled under prefers-reduced-motion. Renders nothing.
 */
export default function PointerEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const MAGNET = 0.18; // fraction of cursor offset the button follows
    const TILT_MAX = 8; // degrees

    const onPointerMove = (e: PointerEvent) => {
      const t = e.target as Element | null;

      const spot = t?.closest<HTMLElement>(".spotlight");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const mag = t?.closest<HTMLElement>(".magnetic");
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        mag.style.transform = `translate(${dx * MAGNET}px, ${dy * MAGNET}px)`;
      }

      const tilt = t?.closest<HTMLElement>(".tilt");
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `rotateY(${px * TILT_MAX}deg) rotateX(${-py * TILT_MAX}deg)`;
      }
    };

    // Reset transform when leaving a magnetic/tilt element.
    const onPointerOut = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const reset = t?.closest<HTMLElement>(".magnetic, .tilt");
      if (reset && !reset.contains(e.relatedTarget as Node | null)) {
        reset.style.transform = "";
      }
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return null;
}
