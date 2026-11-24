"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { wheel, type Project } from "@/content";
import Cover from "./Cover";
import { PageLink } from "./Curtain";
import { useLive } from "./Live";
import { CursorBadge, useCursorBadge } from "./Marks";

const STEP = 26; // degrees between titles on the drum
const RADIUS = "22vw";

function Title({ project, index, rot }: { project: Project; index: number; rot: MotionValue<number> }) {
  const at = index * STEP;
  const opacity = useTransform(rot, [at - 2 * STEP, at - STEP, at, at + STEP, at + 2 * STEP], [0, 0.26, 1, 0.26, 0]);
  return (
    <motion.div
      className="absolute left-0 top-1/2 -mt-[0.5em] whitespace-nowrap text-[clamp(3rem,6.6vw,8rem)] font-medium leading-none tracking-[-0.045em] [backface-visibility:hidden]"
      style={{ opacity, transform: `rotateX(${-at}deg) translateZ(${RADIUS})` }}
    >
      {project.name}
    </motion.div>
  );
}

export default function Wheel() {
  const ref = useRef<HTMLDivElement>(null);
  const n = wheel.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0, 1], [0, (n - 1) * STEP]);
  const rot = useSpring(raw, { stiffness: 140, damping: 26, mass: 0.5 });
  const background = useTransform(
    rot,
    wheel.map((_, i) => i * STEP),
    wheel.map((p) => p.deep),
  );
  const [active, setActive] = useState(0);
  useMotionValueEvent(raw, "change", (v) => setActive(Math.min(n - 1, Math.max(0, Math.round(v / STEP)))));
  const current = wheel[active];
  const badge = useCursorBadge();

  // The cover opens the live site in a window over the page.
  const live = useCursorBadge();
  const open = useLive();
  const embeds = current.live?.some((s) => s.embed);

  return (
    <section id="work" aria-label="Selected work">
      {/* Wide screens: scroll turns a drum of titles */}
      <motion.div ref={ref} className="wheel-desktop text-paper" style={{ backgroundColor: background, height: `${n * 90 + 30}vh` }}>
        <div className="wrap sticky top-0 grid h-screen grid-cols-12 items-center gap-x-8 overflow-hidden">
          <h2 className="t-small absolute left-[var(--pad)] top-24">Selected work</h2>

          <div className="relative col-span-7 h-full" style={{ perspective: "1400px" }} {...badge.bind}>
            <motion.div
              aria-hidden
              className="absolute inset-0 [transform-style:preserve-3d]"
              style={{ rotateX: rot }}
              transformTemplate={({ rotateX }) => `translateZ(-${RADIUS}) rotateX(${rotateX})`}
            >
              {wheel.map((p, i) => (
                <Title key={p.slug} project={p} index={i} rot={rot} />
              ))}
            </motion.div>
            {/* One link covers the drum, so a click anywhere opens the title in front */}
            <PageLink href={`/work/${current.slug}`} colour={current.deep} className="absolute inset-0 z-10" aria-label={`${current.name}: open the case study`} />
            <CursorBadge x={badge.x} y={badge.y} on={badge.on}>
              Open case study
            </CursorBadge>
          </div>

          <div className="col-span-5">
            <div className={`relative aspect-[16/11] w-full transition-transform duration-500 ${current.live ? "hover:scale-[1.03]" : ""}`} {...live.bind}>
              {wheel.map((p, i) => (
                <div
                  key={p.slug}
                  className="wheel-cover absolute inset-0 overflow-hidden"
                  data-state={i === active ? "active" : i < active ? "past" : "next"}
                  style={{ zIndex: i === active ? 2 : 1 }}
                >
                  <Cover project={p} sizes="40vw" play={i === active} />
                </div>
              ))}
              {current.live && (
                <>
                  <button
                    type="button"
                    className="absolute inset-0 z-10"
                    aria-label={embeds ? `Explore ${current.name} live` : `Open ${current.name} in a new tab`}
                    onClick={(e) => open({ title: current.name, sites: current.live!, poster: current.cover, ground: current.deep }, e.currentTarget)}
                  />
                  <CursorBadge x={live.x} y={live.y} on={live.on}>
                    {embeds ? "Explore live" : "Open the site"}
                  </CursorBadge>
                </>
              )}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-x-6" aria-live="polite">
              <div className="t-small">
                <p>{current.kind}</p>
                <p className="mt-1 opacity-70">
                  {current.role}, {current.when}
                </p>
              </div>
              <p className="t-small text-right">
                <PageLink href={`/work/${current.slug}`} colour={current.deep} className="link">
                  Open the case study
                </PageLink>
              </p>
            </div>
          </div>

          <p className="t-small absolute bottom-7 left-[var(--pad)] tabular-nums">
            {active + 1} of {n}
          </p>
        </div>
      </motion.div>

      {/* Phones and reduced motion: the same work as a plain list */}
      <div className="wheel-list wrap bg-black py-20 text-paper">
        <h2 className="t-small">Selected work</h2>
        <ul className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {wheel.map((p) => (
            <li key={p.slug}>
              <PageLink href={`/work/${p.slug}`} colour={p.deep} className="block">
                <div className="relative aspect-[16/11] overflow-hidden" style={{ background: p.deep }}>
                  <Cover project={p} sizes="100vw" play={false} />
                </div>
                <h3 className="t-huge mt-5">{p.name}</h3>
                <p className="t-small mt-2 text-dim">
                  {p.kind}, {p.when}
                </p>
              </PageLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
