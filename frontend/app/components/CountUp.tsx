"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric value from 0 up to the integer found in `value`,
 * preserving any non-digit suffix/prefix (e.g. "3+" → counts to 3, keeps "+").
 * Fires once when scrolled into view; renders the final value instantly
 * under prefers-reduced-motion.
 */
export default function CountUp({
  value,
  durationMs = 900,
}: {
  value: string;
  durationMs?: number;
}) {
  const match = value.match(/(\d+)/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? value.slice(match.index! + match[1].length) : value;
  const prefix = match ? value.slice(0, match.index!) : "";

  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === 0) {
      setN(target);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }

    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          raf = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [target, durationMs]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
