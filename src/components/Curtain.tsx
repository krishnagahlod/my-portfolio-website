"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import { createContext, useContext, useEffect, useRef, useState, type ComponentProps, type ReactNode, type RefObject } from "react";
import { IN_OUT } from "./motion";

type Curtain = { go: (href: string, colour?: string) => void; colour: RefObject<string> };
const CurtainContext = createContext<Curtain>({ go: () => {}, colour: { current: "#000" } });
export const useCurtain = () => useContext(CurtainContext);

/**
 * Page changes inside the site. A curtain in the destination's colour rises, the route changes under it,
 * and the new page's own curtain (template.tsx) lifts away in the same colour.
 */
export function CurtainProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const colour = useRef("#000");
  const [leaving, setLeaving] = useState<{ href: string; colour: string } | null>(null);

  const go = (href: string, to = "#000") => {
    if (leaving || href === pathname) return;
    colour.current = to;
    setLeaving({ href, colour: to });
  };

  // Arrived: start the new page at its top and drop the cover.
  useEffect(() => {
    if (!leaving) return;
    lenis?.scrollTo(0, { immediate: true, force: true });
    setLeaving(null);
    // Only a change of page should run this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // If the route never changes, fall back to an ordinary page load instead of leaving the cover up.
  useEffect(() => {
    if (!leaving) return;
    const id = setTimeout(() => window.location.assign(leaving.href), 7000);
    return () => clearTimeout(id);
  }, [leaving]);

  return (
    <CurtainContext.Provider value={{ go, colour }}>
      {children}
      {leaving && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[95] origin-bottom"
          style={{ background: leaving.colour }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.55, ease: IN_OUT }}
          onAnimationComplete={() => router.push(leaving.href)}
        />
      )}
    </CurtainContext.Provider>
  );
}

/** An internal link that plays the curtain. Modified clicks (a new tab and so on) behave like any other link. */
export function PageLink({ href, colour, ...rest }: { href: string; colour?: string } & Omit<ComponentProps<typeof Link>, "href" | "onClick">) {
  const { go } = useCurtain();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        go(href, colour);
      }}
    />
  );
}
