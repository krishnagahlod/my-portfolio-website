"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

/** A row of screens that scrolls sideways: by touch, trackpad or keyboard, or by dragging with a mouse. */
export default function Strip({ label, children }: { label: string; children: ReactNode }) {
  const from = useRef<{ x: number; left: number } | null>(null);
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
      role="group"
      aria-label={label}
      tabIndex={0}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      className="flex cursor-grab select-none gap-6 overflow-x-auto pb-4 [scrollbar-width:thin] active:cursor-grabbing"
    >
      {children}
    </div>
  );
}
