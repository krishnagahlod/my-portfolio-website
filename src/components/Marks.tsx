"use client";

import { motion, useInView, useSpring, type MotionValue } from "motion/react";
import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";

/** Sets data-in once its content scrolls into view, which starts the CSS mark and line animations. */
export function InView({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return (
    <div ref={ref} data-in={inView} className={className}>
      {children}
    </div>
  );
}

/** A count drawn as marks: `on` of `total` are filled. */
export function Marks({
  total,
  on,
  cols,
  size = 10,
  gap = 6,
  shape,
  label,
}: {
  total: number;
  on: number;
  cols: number;
  size?: number;
  gap?: number;
  shape?: "square" | "phone";
  label: string;
}) {
  return (
    <div role="img" aria-label={label} className="marks" data-shape={shape} style={{ "--cols": cols, "--s": `${size}px`, "--gap": `${gap}px` } as CSSProperties}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className="mark" data-on={i < on ? "" : undefined} style={{ "--i": i } as CSSProperties} />
      ))}
    </div>
  );
}

/** A round label that follows the pointer inside the element the bindings are spread on. */
export function useCursorBadge() {
  const x = useSpring(0, { stiffness: 260, damping: 26, mass: 0.4 });
  const y = useSpring(0, { stiffness: 260, damping: 26, mass: 0.4 });
  const [on, setOn] = useState(false);
  const bind = {
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    },
    onPointerEnter: () => setOn(true),
    onPointerLeave: () => setOn(false),
  };
  return { x, y, on, bind };
}

export function CursorBadge({ x, y, on, children }: { x: MotionValue<number>; y: MotionValue<number>; on: boolean; children: ReactNode }) {
  return (
    <motion.div aria-hidden className="cursor-badge pointer-events-none absolute left-0 top-0 z-30" style={{ x, y }}>
      <motion.div
        className="t-small -ml-14 -mt-14 flex h-28 w-28 items-center justify-center rounded-full bg-paper text-center font-medium leading-tight text-ink"
        initial={false}
        animate={{ scale: on ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
