"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { leadership, projects } from "@/content";
import { PageLink } from "./Curtain";
import Glyph from "./Glyph";
import { InView, Marks } from "./Marks";
import { Lines } from "./motion";

// Track width in vw: 4 pad + 40 intro + 4 panels of 58 + 4 gaps of 2 + 4 pad = 288. It travels 288 - 100.
const TRAVEL = "-188vw";

/** Vertical scrolling moves a row of posters sideways. Each role has its own colour pair, symbol and biggest number. */
export default function Leadership() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", TRAVEL]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="leadership" ref={ref} className="pin-section relative bg-black text-paper" style={{ height: "420vh" }}>
      <div className="pin-sticky sticky top-0 flex h-screen flex-col justify-center overflow-hidden max-lg:py-20">
        <motion.div className="pin-track flex w-max items-stretch gap-[2vw] px-[4vw]" style={{ x }}>
          <div className="flex w-[40vw] shrink-0 flex-col justify-center">
            <h2 className="t-huge">
              <Lines lines={["Positions of", "responsibility"]} />
            </h2>
            <p className="t-lead mt-6 max-w-[30ch] text-dim">Teams, networks and programmes I have run on campus alongside the product work.</p>
          </div>

          {leadership.map((role) => (
            <article
              key={role.title}
              className="tone grid h-[74vh] w-[58vw] shrink-0 gap-x-8 gap-y-6 p-[clamp(1.25rem,2.4vw,2.5rem)] sm:grid-cols-12 sm:grid-rows-[auto_1fr_auto]"
              style={{ "--deep": role.deep, "--bright": role.bright } as CSSProperties}
            >
              <div className="t-small flex flex-wrap gap-x-6 gap-y-1 font-medium sm:col-span-8">
                <p>{role.where}</p>
                <p className="opacity-70">{role.when}</p>
              </div>

              <Glyph name={role.glyph} className="w-24 sm:col-span-4 sm:row-span-2 sm:w-[min(100%,24vh)]" />

              <div className="sm:col-span-8 sm:self-center">
                <p className="text-[clamp(3.5rem,9vw,11rem)] font-medium leading-[0.9] tracking-[-0.05em] tabular-nums">{role.number}</p>
                <p className="t-lead mt-4 max-w-[34ch]">{role.numberLabel}</p>
              </div>

              <div className="sm:col-span-8 sm:self-end">
                <h3 className="t-big font-medium">{role.title}</h3>
                <p className="t-body mt-3 max-w-[54ch] opacity-80">{role.text}</p>
                {role.link && (
                  <PageLink href={role.link.href} colour={projects.find((p) => role.link?.href.endsWith(p.slug))?.deep} className="link t-small mt-3 inline-block font-medium">
                    {role.link.label}
                  </PageLink>
                )}
              </div>

              <InView className="sm:col-span-4 sm:self-end">
                <Marks
                  total={role.marks.total}
                  on={role.marks.on}
                  cols={role.marks.cols}
                  size={13}
                  gap={7}
                  shape={role.marks.square ? "square" : undefined}
                  label={role.marks.caption}
                />
                <p className="t-small mt-3 opacity-80">{role.marks.caption}</p>
              </InView>
            </article>
          ))}
        </motion.div>

        <div aria-hidden className="absolute inset-x-[4vw] bottom-8 h-px bg-white/15 max-lg:hidden">
          <motion.div className="h-full origin-left bg-paper" style={{ scaleX: bar }} />
        </div>
      </div>
    </section>
  );
}
