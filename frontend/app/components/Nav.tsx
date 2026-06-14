"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={scrolled ? "nav-scrolled" : ""}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          HBP<span className="logo-dot">.</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#portfolio">Work</a>
          </li>
          <li>
            <a href="#cv">CV</a>
          </li>
          <li>
            <a href="#contact" className="nav-cta">
              Liên hệ
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
