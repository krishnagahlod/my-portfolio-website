"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { person } from "@/content";

/**
 * White text with difference blending stays readable over every section colour.
 * The bar slides away while the page moves down, so it never sits on top of what is being read, and returns on the way up.
 * On phones it returns as a solid strip, because blended text over body text cannot be read at that size.
 */
export default function Nav() {
  const [bar, setBar] = useState({ away: false, solid: false });
  useEffect(() => {
    let last = window.scrollY;
    // A reload or the Back button can open the page part of the way down, before any scroll event arrives.
    if (last > 120) setBar({ away: false, solid: true });
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      const next = { away: y > last && y > 120, solid: y > 120 };
      last = y;
      setBar((b) => (b.away === next.away && b.solid === next.solid ? b : next));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "wrap pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between py-2 text-white mix-blend-difference transition-transform duration-500 focus-within:translate-y-0 md:py-5" +
        (bar.away ? " -translate-y-full" : "") +
        (bar.solid ? " max-md:pointer-events-auto max-md:bg-paper max-md:text-ink max-md:mix-blend-normal max-md:shadow-[0_1px_0_rgb(0_0_0/0.12)]" : "")
      }
    >
      <Link href="/" aria-label="Krishna Gahlod, home" className="pointer-events-auto py-2 text-[0.95rem] font-medium tracking-tight">
        <span className="sm:hidden">KG</span>
        <span className="max-sm:hidden">Krishna Gahlod</span>
      </Link>
      <nav aria-label="Primary" className="pointer-events-auto flex items-center gap-4 text-[0.95rem] sm:gap-8">
        <Link href="/#work" className="link py-2">
          Work
        </Link>
        <Link href="/#experience" className="link py-2">
          Experience
        </Link>
        <Link href="/#contact" className="link py-2">
          Contact
        </Link>
        <a href={person.resume} target="_blank" rel="noopener" className="link py-2">
          Résumé
        </a>
      </nav>
    </header>
  );
}
