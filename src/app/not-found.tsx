import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

const ways = [
  { text: "Home", href: "/" },
  { text: "Work", href: "/#work" },
  { text: "Experience", href: "/#experience" },
  { text: "Contact", href: "/#contact" },
];

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[100svh] flex-col justify-end pb-[clamp(3rem,7vw,6rem)] pt-32">
      <h1 className="t-mega">This page does not exist.</h1>
      <p className="t-lead mt-6 max-w-[40ch] text-mute">The address may be mistyped, or the page may have moved. Everything on the site starts from one of these.</p>
      <ul className="t-lead mt-8 flex flex-wrap gap-x-8 gap-y-3 font-medium">
        {ways.map((w) => (
          <li key={w.href}>
            <Link href={w.href} className="link">
              {w.text}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
