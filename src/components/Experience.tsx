"use client";

import { useLenis } from "lenis/react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { experience } from "@/content";
import { InView, Marks } from "./Marks";
import { Lines } from "./motion";

function Caption({ children }: { children: ReactNode }) {
  return <p className="t-small opacity-70">{children}</p>;
}

/** Tarashio: the users it has reached, and two things the engine guarantees. */
function TrainingFigure() {
  return (
    <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      <div>
        <p className="t-mega tabular-nums">200+</p>
        <p className="t-small mt-3 max-w-[22ch] opacity-70">users on the app, with more onboarding every week</p>
      </div>
      <div className="grid gap-7">
        <div>
          <Caption>46 automated tests check each build against the spec</Caption>
          <div className="mt-4">
            <Marks total={46} on={46} cols={23} size={8} gap={4} label="46 automated tests" />
          </div>
        </div>
        <div>
          <Caption>A person&apos;s daily capacity grows from 3 task slots to 6</Caption>
          <div className="mt-4">
            <Marks total={6} on={3} cols={6} size={24} gap={8} shape="square" label="3 of 6 task slots filled" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Gnaan U: the four tools as one pipeline, and what the mapper did with a real batch. */
function PipelineFigure() {
  const steps = [
    { name: "Find", note: "12 stages, 4 quality gates" },
    { name: "Evaluate", note: "A 7-question rubric" },
    { name: "Map", note: "To textbook topics" },
    { name: "Illustrate", note: "5 image models compared" },
  ];
  return (
    <div>
      <Caption>Four tools, one pipeline from source material to classroom</Caption>
      <ol className="relative mt-6 grid grid-cols-4 gap-x-4">
        <li aria-hidden className="absolute left-0 right-[12%] top-[5px] h-px bg-current/25" />
        {steps.map((s) => (
          <li key={s.name} className="relative">
            <span aria-hidden className="block h-[11px] w-[11px] rounded-full bg-current" />
            <p className="t-lead mt-3 font-medium">{s.name}</p>
            <p className="t-small mt-1 opacity-70">{s.note}</p>
          </li>
        ))}
      </ol>
      <div className="mt-9">
        <Caption>51 of 69 methods mapped to topics automatically. The rest were reviewed or declined.</Caption>
        <div className="mt-4">
          <Marks total={69} on={51} cols={23} size={8} gap={4} label="51 of 69 methods mapped automatically" />
        </div>
      </div>
    </div>
  );
}

/** Accenture: the evaluation result as counted scenarios, and the agent layout as a diagram. */
function AgentsFigure() {
  const nodes = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    return { x: Math.round(130 + Math.cos(a) * 108), y: Math.round(80 + Math.sin(a) * 64) };
  });
  return (
    <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      <div>
        <Caption>Scenarios where every test case passed, out of 16</Caption>
        <div className="mt-5 grid gap-6">
          {[
            { label: "Before", on: 5, pct: "31%" },
            { label: "After", on: 10, pct: "63%" },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex items-baseline justify-between">
                <span className="t-small">{row.label}</span>
                <span className="t-huge tabular-nums">{row.pct}</span>
              </div>
              <div className="mt-3">
                <Marks total={16} on={row.on} cols={16} size={12} gap={5} label={`${row.on} of 16 scenarios passed cleanly ${row.label.toLowerCase()}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Caption>10 specialist agents behind one flat router</Caption>
        <svg viewBox="0 0 260 160" className="mt-3 w-full" role="img" aria-label="A router connected directly to ten agents">
          {nodes.map((n, i) => (
            <line key={i} x1="130" y1="80" x2={n.x} y2={n.y} pathLength={1} className="draw" stroke="currentColor" strokeWidth="1" style={{ "--i": i } as CSSProperties} />
          ))}
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="6" fill="var(--ground)" stroke="currentColor" strokeWidth="1.5" />
          ))}
          <circle cx="130" cy="80" r="14" fill="currentColor" />
        </svg>
        <p className="t-small mt-2">
          <span className="t-big font-medium tabular-nums">0.4 s</span> to hand a conversation to the right agent
        </p>
      </div>
    </div>
  );
}

/** EdMe: the screens designed, and the exam categories the roadmap grew into. */
function ScreensFigure() {
  return (
    <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      <div>
        <Caption>12 screens designed for the learner flow</Caption>
        <div className="mt-5">
          <Marks total={12} on={12} cols={6} size={34} gap={10} shape="phone" label="Twelve phone screens" />
        </div>
      </div>
      <div>
        <Caption>A roadmap from 1 exam category to 3</Caption>
        <ul className="t-lead mt-5 flex flex-wrap gap-2 font-medium">
          <li className="bg-[var(--accent)] px-4 py-2 text-[color:var(--ground)]">UPSC</li>
          <li className="px-4 py-2 shadow-[inset_0_0_0_1.5px_currentColor]">JEE</li>
          <li className="px-4 py-2 shadow-[inset_0_0_0_1.5px_currentColor]">NEET</li>
        </ul>
        <p className="t-small mt-7">
          <span className="t-huge block tabular-nums">5,000+</span>
          <span className="mt-2 block opacity-70">active learners on the app and website</span>
        </p>
      </div>
    </div>
  );
}

/** Hinduja Group: the benchmark as a grid, and the technology shortlist as a count. */
function BenchmarkFigure() {
  return (
    <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      <div>
        <Caption>8 conglomerates benchmarked on 10+ sustainability KPIs</Caption>
        <div className="mt-5" style={{ "--stagger": "9ms" } as CSSProperties}>
          <Marks total={80} on={80} cols={10} size={14} gap={8} label="A grid of 8 conglomerates by 10 KPIs" />
        </div>
      </div>
      <div>
        <Caption>15+ low-carbon technologies assessed, 8 shortlisted</Caption>
        <div className="mt-5">
          <Marks total={15} on={8} cols={15} size={12} gap={5} label="8 of 15 technologies shortlisted" />
        </div>
        <p className="t-lead mt-8 max-w-[24ch] font-medium">Letter of Recommendation from the Chief Sustainability Officer of the $40B+ group</p>
      </div>
    </div>
  );
}

const figures: Record<string, ReactNode> = {
  Tarashio: <TrainingFigure />,
  "Gnaan U": <PipelineFigure />,
  Accenture: <AgentsFigure />,
  EdMe: <ScreensFigure />,
  "Hinduja Group": <BenchmarkFigure />,
};

function Card({ index, total, progress, deep, bright, children }: { index: number; total: number; progress: MotionValue<number>; deep: string; bright: string; children: ReactNode }) {
  // Cards already in the stack shrink a little as later ones slide over them, so the pile reads as layers.
  const scale = useTransform(progress, [index / (total - 1), 1], [1, 1 - (total - 1 - index) * 0.03]);
  return (
    <div className="stack-card sticky top-0 flex h-screen items-center" style={{ "--ground": deep, "--accent": bright } as CSSProperties}>
      <motion.article
        className="relative w-full origin-top bg-[var(--ground)] text-paper lg:h-[min(80vh,46rem)]"
        style={{ scale, top: `${index * 0.7}rem` }}
      >
        {children}
      </motion.article>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const total = experience.length;
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(total - 1, Math.max(0, Math.round(v * (total - 1))))));

  // The index on the left jumps to a role. Each card owns one viewport height of scroll.
  const lenis = useLenis();
  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY + i * window.innerHeight;
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y });
  };

  // On phones the cards are a list that opens one at a time, so five roles do not take six screens.
  const [open, setOpen] = useState(0);
  const toggle = (i: number, card: Element | null) => {
    setOpen((o) => (o === i ? -1 : i));
    // The card that closes above would carry this one off screen, so the page follows it.
    if (card instanceof HTMLElement && window.matchMedia("(max-width: 1023px)").matches) requestAnimationFrame(() => requestAnimationFrame(() => lenis?.scrollTo(card, { offset: -64 })));
  };

  return (
    <section id="experience" className="wrap pt-[clamp(5rem,11vw,10rem)]">
      <h2 className="t-mega">
        <Lines lines={["Experience"]} />
      </h2>

      <div ref={ref} className="mt-[clamp(1rem,3vw,3rem)] lg:grid lg:grid-cols-12 lg:gap-x-8">
        <nav aria-label="Roles" className="max-lg:hidden lg:col-span-2">
          <ol className="sticky top-0 flex h-screen flex-col justify-center gap-1">
            {experience.map((job, i) => (
              <li key={job.company}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === active ? "step" : undefined}
                  className="t-small flex w-full items-center gap-3 py-2 text-left font-medium transition-opacity duration-300"
                  style={{ opacity: i === active ? 1 : 0.38 }}
                >
                  <span aria-hidden className="h-2 transition-[width] duration-500" style={{ width: i === active ? "2.25rem" : "0.5rem", background: job.deep }} />
                  {job.company}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="lg:col-span-10">
          {experience.map((job, i) => (
            <Card key={job.company} index={i} total={total} progress={scrollYProgress} deep={job.deep} bright={job.bright}>
              <div className="flex h-full flex-col justify-between gap-8 p-[clamp(1.25rem,2.4vw,2.5rem)]">
                <div className="grid grow items-center gap-x-12 gap-y-8 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <p className="accent t-small">{job.when}</p>
                    <h3 className="t-huge mt-3">
                      <button
                        type="button"
                        aria-expanded={open === i}
                        onClick={(e) => toggle(i, e.currentTarget.closest("article"))}
                        className="flex w-full items-center justify-between gap-4 text-left lg:pointer-events-none"
                      >
                        {job.company}
                        <span aria-hidden className="accent t-big transition-transform duration-500 lg:hidden" style={{ rotate: open === i ? "45deg" : "0deg" }}>
                          +
                        </span>
                      </button>
                    </h3>
                    <p className="t-lead mt-4 max-w-[30ch] font-medium">{job.role}</p>
                    <p className={"t-body mt-3 max-w-[40ch] opacity-70 " + (open === i ? "reveal" : "max-lg:hidden")}>{job.summary}</p>
                  </div>
                  <InView className={"accent lg:col-span-7 " + (open === i ? "reveal" : "max-lg:hidden")}>{figures[job.company]}</InView>
                </div>
                <ul className={"rule t-body grid gap-x-10 gap-y-2 pt-4 sm:grid-cols-2 " + (open === i ? "reveal" : "max-lg:hidden")}>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
