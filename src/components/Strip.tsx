"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

/**
 * A row of screens that runs to the edges of the window and scrolls sideways:
 * by the arrows, by touch, trackpad or keyboard, or by dragging with a mouse.
 */
export default function Strip({ label, children }: { label: string; children: ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);
  const from = useRef<{ x: number; left: number } | null>(null);
  // Which ways the row can still move. An arrow shows only when it leads somewhere.
  const [more, setMore] = useState({ back: false, on: false });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    // Screens further along the row are off screen, so the browser would only fetch them once they are dragged into view
    // and they would arrive late, as empty boxes. Fetch them all as the row approaches instead.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.querySelectorAll("img").forEach((img) => (img.loading = "eager"));
        io.disconnect();
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);

    const measure = () => {
      const back = el.scrollLeft > 8;
      const on = el.scrollLeft + el.clientWidth < el.scrollWidth - 8;
      setMore((m) => (m.back === back && m.on === on ? m : { back, on }));
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      io.disconnect();
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    from.current = { x: e.clientX, left: e.currentTarget.scrollLeft };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (from.current) e.currentTarget.scrollLeft = from.current.left - (e.clientX - from.current.x);
  };
  const up = () => {
    from.current = null;
  };

  return (
    <div className="relative -mx-[var(--pad)]">
      <div
        ref={scroller}
        role="group"
        aria-label={label}
        tabIndex={0}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        className="flex cursor-grab select-none gap-[clamp(1rem,2vw,2rem)] overflow-x-auto px-[var(--pad)] pb-5 [scrollbar-width:thin] active:cursor-grabbing"
      >
        {children}
      </div>
      {([-1, 1] as const).map((dir) => (
        <button
          key={dir}
          type="button"
          onClick={() => step(dir)}
          hidden={dir < 0 ? !more.back : !more.on}
          aria-label={dir < 0 ? "Earlier screens" : "More screens"}
          className={
            "absolute top-[calc(50%-0.625rem)] grid h-12 w-12 -translate-y-1/2 place-items-center bg-black text-paper transition-opacity duration-300 hover:opacity-75 " +
            (dir < 0 ? "left-[var(--pad)]" : "right-[var(--pad)]")
          }
        >
          <svg viewBox="0 0 24 24" aria-hidden className={"h-5 w-5" + (dir < 0 ? " rotate-180" : "")} fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      ))}
    </div>
  );
}
