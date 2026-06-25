"use client";

import { useEffect } from "react";

/**
 * Drives lightweight scroll parallax for every [data-parallax] element via a
 * single passive scroll listener coalesced through requestAnimationFrame —
 * the same shape as ScrollProgress. Each element's document offset is measured
 * once on mount and on resize, so the per-frame write only does arithmetic and
 * a transform write (no layout reads, no thrash).
 *
 * data-parallax="0.12" = move at 12% of the element's distance from viewport
 * centre. Targets must own no other transform (this overwrites `transform`).
 * Disabled and reset under prefers-reduced-motion. Renders nothing.
 */
export default function Parallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items: { el: HTMLElement; speed: number; base: number }[] = [];

    const measure = () => {
      items.length = 0;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax ?? "0");
        if (!speed) return;
        // Document-space centre of the element, measured once (layout read here only).
        const r = el.getBoundingClientRect();
        const base = r.top + window.scrollY + r.height / 2;
        items.push({ el, speed, base });
      });
    };

    let ticking = false;
    const update = () => {
      ticking = false;
      const viewportCentre = window.scrollY + window.innerHeight / 2;
      for (const it of items) {
        const offset = (viewportCentre - it.base) * it.speed;
        it.el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
