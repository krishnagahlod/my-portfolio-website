import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Glyph from "@/components/Glyph";
import Golash from "@/components/Golash";
import Hero from "@/components/Hero";
import Leadership from "@/components/Leadership";
import Roles from "@/components/Roles";
import Wheel from "@/components/Wheel";
import { Lines } from "@/components/motion";
import { education, groups, highlights, person, toolkit } from "@/content";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Tells search engines that this site is about one person, and which profiles are the same person.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  url: "https://krishna-gahlod.golash.in",
  affiliation: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Bombay" },
  sameAs: [person.linkedin, person.github],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Everything above the contact section slides over it, so it needs its own ground */}
      <div className="relative z-10 bg-paper">
        <Hero />
        <Golash />
        <Wheel />
        <Experience />
        <Roles />
        <Leadership />

        <section className="py-[clamp(5rem,11vw,10rem)]">
          <div className="wrap flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <h2 className="t-mega">
              <Lines lines={["Outside the build"]} />
            </h2>
            <p className="t-lead max-w-[30ch] text-mute">Sport, campus life, community work and markets. The colour tells you which.</p>
          </div>

          {/* A quilt of tiles: the group sets the colour, and each tile turns over under the pointer */}
          <ul className="wrap mt-[clamp(2.5rem,6vw,5rem)] grid sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <li
                key={h.text}
                className="tone tile flex flex-col justify-between gap-6 p-[clamp(1.25rem,1.8vw,1.75rem)] sm:min-h-[22rem] sm:gap-10"
                style={{ "--deep": groups[h.group].deep, "--bright": groups[h.group].bright } as CSSProperties}
              >
                <div className="flex items-start justify-between gap-4">
                  <Glyph name={h.glyph} className="w-14 sm:w-20" />
                  <p className="t-small font-medium">{h.group}</p>
                </div>
                <div>
                  <p className="text-[clamp(2.25rem,3.6vw,3.75rem)] font-medium leading-none tracking-[-0.04em] tabular-nums">{h.n}</p>
                  <p className="t-body mt-3">{h.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="wrap mt-[clamp(4rem,8vw,7rem)] grid gap-x-8 gap-y-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="t-small text-mute">Education</h3>
              <p className="t-big mt-4 font-medium">{education.school}</p>
              <p className="t-body mt-2 text-mute">{education.degree}</p>
              <p className="t-body text-mute">{education.minor}</p>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <h3 className="t-small text-mute">Toolkit</h3>
              <dl className="t-body mt-4">
                {toolkit.map((t) => (
                  <div key={t.group} className="rule grid grid-cols-4 gap-x-4 py-3">
                    <dt className="col-span-1 font-medium">{t.group}</dt>
                    <dd className="col-span-3 text-mute">{t.items}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </div>

      {/* The contact section is pinned under the page, so links jump to this marker at the end of the content */}
      <div id="contact" aria-hidden />
      <Contact />
    </>
  );
}
