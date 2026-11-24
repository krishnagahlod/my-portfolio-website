"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

export const IN_OUT = [0.76, 0, 0.24, 1] as const;
export const OUT = [0.22, 1, 0.36, 1] as const;

/**
 * A click on a link, or the back button, cancels any glide in progress.
 * Without this the smooth scroller keeps heading for its old target and drags the next page down with it.
 */
function GlideGuard() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const settle = () => {
      lenis.stop();
      lenis.start();
    };
    const onClick = (e: Event) => {
      if (e.target instanceof Element && e.target.closest("a[href]")) settle();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", settle);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", settle);
    };
  }, [lenis]);
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      {!reduce && <ReactLenis root options={{ lerp: 0.09, anchors: true }} />}
      {!reduce && <GlideGuard />}
      {children}
    </MotionConfig>
  );
}

/** Each line rises out of its own mask. */
export function Lines({ lines, delay = 0, onView = true }: { lines: ReactNode[]; delay?: number; onView?: boolean }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%" }}
            {...(onView ? { whileInView: { y: 0 }, viewport: { once: true, margin: "0px 0px -12% 0px" } } : { animate: { y: 0 } })}
            transition={{ duration: 1, ease: OUT, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** Pulls its child toward the pointer. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const x = useSpring(0, { stiffness: 170, damping: 14, mass: 0.3 });
  const y = useSpring(0, { stiffness: 170, damping: 14, mass: 0.3 });
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div className={className} style={{ x, y }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </motion.div>
  );
}

/** Content drifts inside a clipped frame as it crosses the viewport. */
export function Parallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div className="h-full w-full" style={{ y, scale: 1.14 }}>
        {children}
      </motion.div>
    </div>
  );
}
