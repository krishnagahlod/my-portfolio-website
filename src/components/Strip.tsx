"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

/**
 * A row of screens that runs to the edges of the window and scrolls sideways:
 * by touch, trackpad or keyboard, or by dragging with a mouse.
 */
export default function Strip({ label, children }: { label: string; children: ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);
  const from = useRef<{ x: number; left: number } | null>(null);

  // Screens further along the row are off screen, so the browser would only fetch them once they are dragged into view
  // and they would arrive late, as empty boxes. Fetch them all as the row approaches instead.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.querySelectorAll("img").forEach((img) => (img.loading = "eager"));
        io.disconnect();
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
    <div
      ref={scroller}
      role="group"
      aria-label={label}
      tabIndex={0}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      className="-mx-[var(--pad)] flex cursor-grab select-none gap-[clamp(1rem,2vw,2rem)] overflow-x-auto px-[var(--pad)] pb-5 [scrollbar-width:thin] active:cursor-grabbing"
    >
      {children}
    </div>
  );
}
