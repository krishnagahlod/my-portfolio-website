"use client";

import Image from "next/image";
import { AnimatePresence, motion, useSpring } from "motion/react";
import { useState, type PointerEvent } from "react";
import { golashApps, projects } from "@/content";
import { PageLink } from "./Curtain";
import { CursorBadge, useCursorBadge } from "./Marks";
import Tour from "./Tour";
import { IN_OUT, Lines } from "./motion";

const deepOf = (slug: string) => projects.find((p) => p.slug === slug)?.deep;

export default function Golash() {
  const [active, setActive] = useState(0);
  const app = golashApps[active];

  // The panel leans toward the pointer while it plays the chosen app, and a click opens the app itself.
  const tiltX = useSpring(0, { stiffness: 140, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 140, damping: 18 });
  const badge = useCursorBadge();
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 9);
    tiltX.set(((e.clientY - r.top) / r.height - 0.5) * -7);
    badge.bind.onPointerMove(e);
  };
  const leave = () => {
    tiltX.set(0);
    tiltY.set(0);
    badge.bind.onPointerLeave();
  };

  return (
    <section id="golash" className="wrap bg-black py-[clamp(5rem,11vw,10rem)] text-paper">
      <div className="grid gap-x-8 gap-y-8 md:grid-cols-12">
        <h2 className="t-mega md:col-span-7">
          <Lines lines={["golash"]} />
        </h2>
        <div className="md:col-span-5 md:pt-4">
          <p className="t-big">The company I am building: five apps and seven free tools for Indian college students, now in soft launch. I design, build and run all of it.</p>
          <p className="t-small mt-6 flex flex-wrap gap-x-7 gap-y-2">
            <PageLink href="/work/golash" colour={deepOf("golash")} className="link">
              Read how Golash is built
            </PageLink>
            <a href="https://golash.in" target="_blank" rel="noopener noreferrer" className="link">
              Visit golash.in
            </a>
          </p>
        </div>
      </div>

      <div className="mt-[clamp(3rem,7vw,6rem)] grid items-start gap-x-8 gap-y-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <ul>
            {golashApps.map((a, i) => (
              <li key={a.name} className="rule">
                <button
                  type="button"
                  aria-pressed={i === active}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="flex w-full items-center gap-4 py-4 text-left transition-opacity duration-300"
                  style={{ opacity: i === active ? 1 : 0.42 }}
                >
                  <span
                    aria-hidden
                    className="h-3.5 w-3.5 shrink-0 transition-colors duration-300"
                    style={{ background: i === active ? a.color : "transparent", boxShadow: `inset 0 0 0 1.5px ${a.color}` }}
                  />
                  <span className="t-big font-medium">{a.name}</span>
                  {a.caseStudy && <span className="t-small ml-auto">Case study</span>}
                </button>
              </li>
            ))}
            <li className="rule" aria-hidden />
          </ul>

          <div className="mt-8 min-h-[13rem]" aria-live="polite">
            <p className="t-big font-medium">{app.tagline}</p>
            <p className="t-body mt-3 max-w-[44ch] text-dim">{app.what}</p>
            {app.stats && (
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                {app.stats.map((s) => (
                  <div key={s.label}>
                    <dd className="t-huge tabular-nums" style={{ color: app.color }}>
                      {s.value}
                    </dd>
                    <dt className="t-small mt-1 text-dim">{s.label}</dt>
                  </div>
                ))}
              </dl>
            )}
            <p className="t-small mt-6 flex flex-wrap gap-x-7 gap-y-2">
              {app.caseStudy && (
                <PageLink href={`/work/${app.caseStudy}`} colour={deepOf(app.caseStudy)} className="link">
                  Read the case study
                </PageLink>
              )}
              <a href={app.url} target="_blank" rel="noopener noreferrer" className="link">
                Open {app.name}
              </a>
            </p>
          </div>
        </div>

        <div
          className="relative md:sticky md:top-24 md:col-span-7"
          style={{ perspective: "1400px" }}
          onPointerMove={move}
          onPointerEnter={badge.bind.onPointerEnter}
          onPointerLeave={leave}
        >
          <motion.a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${app.name} in a new tab`}
            className="relative block aspect-[16/10] w-full overflow-hidden"
            style={{ rotateX: tiltX, rotateY: tiltY }}
            animate={{ backgroundColor: app.color }}
            whileHover={{ scale: 1.025 }}
            transition={{ duration: 0.5, ease: IN_OUT }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={app.name}
                className="absolute inset-[clamp(0.75rem,1.6vw,1.5rem)]"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ opacity: 0.999 }}
                transition={{ duration: 0.7, ease: IN_OUT }}
              >
                {app.tour ? (
                  <Tour src={app.tour} poster={app.shot} alt={`${app.name} home page`} sizes="(max-width: 768px) 100vw, 56vw" />
                ) : (
                  <Image src={app.shot} alt={`${app.name} home page`} fill sizes="(max-width: 768px) 100vw, 56vw" className="object-cover object-top" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.a>
          <CursorBadge x={badge.x} y={badge.y} on={badge.on}>
            Open the app
          </CursorBadge>
        </div>
      </div>
    </section>
  );
}
