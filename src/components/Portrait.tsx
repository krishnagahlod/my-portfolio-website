"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react";

const SRC = "/img/portrait.webp";
const lens = (inner: string, outer: string) => `radial-gradient(circle var(--r) at var(--mx) var(--my), ${inner} 52%, ${outer} 100%)`;

/**
 * The portrait is printed as halftone dots. A lens follows the pointer and shows the photograph underneath.
 * The dots are drawn once; the lens is two CSS masks driven by three variables, so moving it costs nothing.
 */
export default function Portrait({ peekAfter }: { peekAfter: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const spring = { stiffness: 150, damping: 22, mass: 0.5 };
  const r = useSpring(0, { stiffness: 110, damping: 20 });
  const mx = useSpring(0, spring);
  const my = useSpring(0, spring);
  const rPx = useTransform(r, (v) => `${Math.max(v, 0.01)}px`);
  const mxPx = useTransform(mx, (v) => `${v}px`);
  const myPx = useTransform(my, (v) => `${v}px`);

  useEffect(() => {
    const el = wrap.current;
    const c = canvas.current;
    if (!el || !c) return;
    const img = new window.Image();
    const draw = () => {
      if (!img.complete || !img.naturalWidth) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return; // the element is leaving the page
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = w * dpr;
      c.height = h * dpr;
      const cell = Math.max(3.4, w / 118);
      const rowH = cell * 0.866; // staggered rows pack the dots like a printed screen
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / rowH);
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      const ctx = c.getContext("2d");
      if (!octx || !ctx) return;
      octx.imageSmoothingQuality = "high";
      octx.drawImage(img, 0, 0, cols, rows);
      const px = octx.getImageData(0, 0, cols, rows).data;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000";
      ctx.beginPath();
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const dark = 1 - px[(y * cols + x) * 4] / 255;
          if (dark < 0.05) continue;
          const rad = Math.pow(dark, 0.8) * cell * 0.6;
          const cx = x * cell + (y % 2 ? cell : cell / 2);
          const cy = y * rowH + rowH / 2;
          ctx.moveTo(cx + rad, cy);
          ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        }
      }
      ctx.fill();
    };
    img.onload = draw;
    img.src = SRC;
    const ro = new ResizeObserver(draw);
    ro.observe(el);

    // Open the lens over the face once, so the interaction is discoverable.
    const open = setTimeout(() => {
      mx.jump(el.clientWidth * 0.5);
      my.jump(el.clientHeight * 0.24);
      r.set(el.clientWidth * 0.3);
    }, peekAfter * 1000);
    const close = setTimeout(() => r.set(0), peekAfter * 1000 + 1500);
    return () => {
      ro.disconnect();
      clearTimeout(open);
      clearTimeout(close);
    };
  }, [mx, my, r, peekAfter]);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
    r.set(rect.width * 0.3);
  };

  return (
    <motion.div
      ref={wrap}
      className="relative h-full w-full touch-pan-y"
      style={{ "--r": rPx, "--mx": mxPx, "--my": myPx } as unknown as CSSProperties}
      onPointerMove={move}
      onPointerDown={move}
      onPointerLeave={() => r.set(0)}
      onPointerCancel={() => r.set(0)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SRC}
        alt="Krishna Gahlod"
        className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
        style={{ maskImage: lens("#000", "transparent"), WebkitMaskImage: lens("#000", "transparent") }}
      />
      <canvas
        ref={canvas}
        aria-hidden
        className="absolute inset-0 h-full w-full"
        style={{ maskImage: lens("transparent", "#000"), WebkitMaskImage: lens("transparent", "#000") }}
      />
    </motion.div>
  );
}
