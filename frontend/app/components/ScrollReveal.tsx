"use client";

import { useEffect } from "react";

/**
 * Reveals elements carrying the `.reveal` class as they scroll into view,
 * mirroring the prototype's IntersectionObserver. Renders nothing.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const init = () =>
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    const raf = requestAnimationFrame(() => requestAnimationFrame(init));

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return null;
}
