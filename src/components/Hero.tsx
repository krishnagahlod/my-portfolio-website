"use client";

import { AnimatePresence, animate, motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { person } from "@/content";
import Portrait from "./Portrait";
import { IN_OUT, Lines, OUT } from "./motion";

// The loader plays once per full page load, not on every return to the home page.
let played = false;

function Loader() {
  const count = useMotionValue(0);
  const shown = useTransform(count, (v) => Math.round(v));
  useEffect(() => {
    const controls = animate(count, 100, { duration: 1.5, ease: IN_OUT });
    return () => controls.stop();
  }, [count]);
  return (
    <motion.div
      className="wrap fixed inset-0 z-[100] flex flex-col justify-between bg-black py-6 text-paper"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: IN_OUT }}
    >
      <p className="text-[0.95rem] font-medium tracking-tight">Krishna Gahlod</p>
      <div className="flex items-end justify-between">
        <p className="t-small text-dim">Portfolio, 2026</p>
        <motion.p className="t-mega tabular-nums" aria-hidden>
          {shown}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function MumbaiTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }).format(new Date());
    setTime(format());
    const id = setInterval(() => setTime(format()), 30000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ? `${time} in Mumbai` : "Mumbai"}</span>;
}

export default function Hero() {
  const [first] = useState(!played);
  const [loading, setLoading] = useState(first);
  useEffect(() => {
    if (!first) return;
    const id = setTimeout(() => {
      played = true;
      setLoading(false);
    }, 1750);
    return () => clearTimeout(id);
  }, [first]);
  const delay = first ? 2.05 : 0.25;

  // As the hero scrolls away, the headline and the portrait drift apart.
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const headY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section ref={ref} className="wrap relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-7 pt-28">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      {/* The figure stands on the rule above the meta row */}
      <motion.div
        className="absolute right-[var(--pad)] aspect-[1000/1190] max-md:top-20 max-md:w-[62vw] md:bottom-[5.25rem] md:h-[min(76svh,48vw)]"
        style={{ y: portraitY }}
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.3, ease: IN_OUT, delay: delay + 0.05 }}
      >
        <Portrait peekAfter={delay + 1.5} />
      </motion.div>

      {/* On phones the figure sits above the headline, so this keeps its room */}
      <div aria-hidden className="h-[calc(74vw-1rem)] shrink-0 md:hidden" />

      {/* Difference blending keeps the headline readable where it crosses the figure */}
      <motion.h1 className="t-mega pointer-events-none relative z-10 text-white mix-blend-difference" style={{ y: headY }}>
        <Lines onView={false} delay={delay} lines={["Krishna Gahlod", "builds AI products", "and ships them."]} />
      </motion.h1>

      {/* The short introduction: top left on wide screens, under the headline on phones */}
      <motion.p
        className="t-lead relative z-10 mt-6 max-w-[40ch] md:order-first md:mb-auto md:mt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: OUT, delay: delay + 0.45 }}
      >
        {person.intro}
      </motion.p>

      <motion.div
        className="rule t-small relative z-10 mt-9 grid grid-cols-2 gap-x-6 gap-y-3 bg-paper pt-5 md:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: OUT, delay: delay + 0.55 }}
      >
        <p className="flex items-start gap-2.5">
          <span aria-hidden className="live-dot mt-[0.45em] shrink-0" />
          <a href="#roles" className="link">
            {person.seeking}
          </a>
        </p>
        <p>Founder of Golash, CTO at Tarashio</p>
        <p>Chemical Engineering, IIT Bombay, class of 2027</p>
        <p className="md:text-right">
          <a href="#golash" className="link">
            Scroll to the work
          </a>
        </p>
      </motion.div>
    </section>
  );
}
