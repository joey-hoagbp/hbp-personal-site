"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Vertical gap (px) kept above an anchored section so it clears the fixed nav. */
const NAV_OFFSET = -90;

/**
 * Adds inertial (momentum) scrolling via Lenis so the wheel/trackpad feel
 * glides instead of stepping. Same-page hash links are routed through Lenis
 * too, so nav jumps ease into place and land below the fixed nav rather than
 * under it. Honors prefers-reduced-motion by staying out of the way entirely
 * (native scroll + the CSS scroll-padding fallback take over). Renders nothing.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic — quick start, soft landing
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Glide to in-page sections instead of letting the browser jump.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const href = link?.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET });
      history.pushState(null, "", href);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
