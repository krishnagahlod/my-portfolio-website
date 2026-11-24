import Link from "next/link";
import { person } from "@/content";

// White text with difference blending stays readable over every section colour.
export default function Nav() {
  return (
    <header className="wrap pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between py-5 text-white mix-blend-difference">
      <Link href="/" className="pointer-events-auto py-2 text-[0.95rem] font-medium tracking-tight">
        Krishna Gahlod
      </Link>
      <nav aria-label="Primary" className="pointer-events-auto flex items-center gap-5 text-[0.95rem] sm:gap-8">
        <Link href="/#work" className="link py-2">
          Work
        </Link>
        <Link href="/#experience" className="link py-2 max-sm:hidden">
          Experience
        </Link>
        <Link href="/#contact" className="link py-2">
          Contact
        </Link>
        <a href={person.resume} download className="link py-2">
          Résumé
        </a>
      </nav>
    </header>
  );
}
