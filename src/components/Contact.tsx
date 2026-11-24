"use client";

import { useState } from "react";
import { person } from "@/content";
import { MumbaiTime } from "./Hero";
import { Lines } from "./motion";

const links: { label: string; text: string; href: string; external?: boolean; download?: boolean }[] = [
  { label: "Email", text: "Write me a message", href: `mailto:${person.email}` },
  { label: "LinkedIn", text: "Connect with me", href: person.linkedin, external: true },
  { label: "GitHub", text: "Read the code", href: person.github, external: true },
  ...person.resumes.map((r) => ({ label: r.name, text: "Download the PDF", href: r.file, download: true })),
];

/**
 * The closing section sits under the page and is uncovered as the content above scrolls away.
 * The email address is a filled bar, the one bright block on the black ground, so it is hard to miss.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <section aria-label="Contact" className="wrap relative z-0 flex min-h-[100svh] flex-col bg-black pb-6 pt-28 text-paper lg:sticky lg:bottom-0 lg:h-screen">
      <div className="t-small flex flex-wrap justify-between gap-x-8 gap-y-2">
        <p className="flex items-center gap-3">
          <span aria-hidden className="live-dot" />
          {person.seeking}
        </p>
        <p className="text-dim">
          <MumbaiTime />
        </p>
      </div>

      {/* The question sits top left and the ways to answer it bottom right */}
      <div className="grid grow gap-x-8 gap-y-10 pt-[clamp(2rem,6vh,4.5rem)] lg:grid-cols-12">
        <h2 className="t-huge lg:col-span-7">
          <Lines lines={["Have a role, a project", "or an idea? Write to me."]} />
        </h2>

        <div className="lg:col-span-5 lg:self-end">
          <button
            type="button"
            onClick={copy}
            className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-1 bg-paper px-[clamp(1rem,1.6vw,1.5rem)] py-[clamp(1.1rem,1.6vw,1.5rem)] text-left text-ink transition-colors duration-300 hover:bg-white"
          >
            <span className="text-[clamp(1.15rem,2.1vw,2rem)] font-medium tracking-[-0.03em]">{person.email}</span>
            <span className="t-small font-medium">{copied ? "Copied" : "Copy address"}</span>
          </button>
          <p className="sr-only" aria-live="polite">
            {copied ? "Email address copied to your clipboard." : ""}
          </p>

          <ul className="t-lead mt-3">
            {links.map((l) => (
              <li key={l.label} className="rule">
                <a
                  href={l.href}
                  download={l.download}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group -mx-3 flex items-baseline justify-between gap-6 px-3 py-3 transition-colors duration-300 hover:bg-paper hover:text-ink"
                >
                  <span className="font-medium">{l.label}</span>
                  <span className="t-body text-dim transition-colors duration-300 group-hover:text-ink">{l.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="rule t-small mt-[clamp(2rem,4vw,3.5rem)] flex flex-wrap justify-between gap-3 pt-4 text-dim">
        <p>Krishna Gahlod, 2026</p>
        <p>IIT Bombay, Mumbai, India</p>
      </footer>
    </section>
  );
}
