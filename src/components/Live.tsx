"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { LiveSite } from "@/content";
import { IN_OUT } from "./motion";

/** What a trigger offers: the live sites of one project, and which one to show first. */
export type LiveOffer = { title: string; sites: LiveSite[]; index?: number; poster?: string; ground: string };
type Session = LiveOffer & { from?: DOMRect };

const LiveContext = createContext<(offer: LiveOffer, from?: Element | null) => void>(() => {});
export const useLive = () => useContext(LiveContext);

// The window flies out of the element that opened it. The margin must match the window's inset classes below.
function flight(from?: DOMRect) {
  if (!from) return { opacity: 0, scale: 0.96 };
  const w = window.innerWidth;
  const h = window.innerHeight;
  const margin = w < 768 ? 0 : 0.03;
  return {
    opacity: 1,
    x: from.left + from.width / 2 - w / 2,
    y: from.top + from.height / 2 - h / 2,
    scaleX: from.width / (w * (1 - 2 * margin)),
    scaleY: from.height / (h * (1 - 2 * margin)),
  };
}

/**
 * Opens a project's live site in a window over the page, so a visitor can use the real product without leaving.
 * A native dialog keeps focus inside it and closes on Escape.
 */
export function LiveProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closer = useRef<HTMLButtonElement>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const open = useCallback((offer: LiveOffer, from?: Element | null) => {
    const first = offer.index ?? Math.max(0, offer.sites.findIndex((s) => s.embed));
    const site = offer.sites[first];
    // A site that refuses to be framed opens in its own tab instead.
    if (!site.embed) {
      window.open(site.url, "_blank", "noopener,noreferrer");
      return;
    }
    setIndex(first);
    setLoaded(false);
    setSession({ ...offer, from: from?.getBoundingClientRect() });
  }, []);

  useEffect(() => {
    if (!session || !dialog.current || dialog.current.open) return;
    dialog.current.showModal();
    closer.current?.focus();
  }, [session]);

  const close = () => setSession(null);
  const show = (i: number) => {
    setIndex(i);
    setLoaded(false);
  };
  const site = session?.sites[index];
  const poster = site?.poster ?? session?.poster;

  return (
    <LiveContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        data-lenis-prevent
        aria-label={session ? `${session.title}, live` : undefined}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={close}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-paper backdrop:bg-transparent"
      >
        <AnimatePresence onExitComplete={() => dialog.current?.close()}>
          {session && site && (
            <motion.div
              key="veil"
              className="absolute inset-0 bg-black/85"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          {session && site && (
            <motion.div
              key="window"
              className="absolute inset-0 flex flex-col overflow-hidden md:inset-x-[3vw] md:inset-y-[3vh]"
              style={{ background: session.ground }}
              initial={flight(session.from)}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1, scaleX: 1, scaleY: 1 }}
              exit={{ ...flight(session.from), opacity: 0 }}
              transition={{ duration: 0.75, ease: IN_OUT }}
            >
              <motion.header
                className="t-small flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                <p className="font-medium">{session.title}</p>
                {session.sites.length > 1 && (
                  <div role="group" aria-label="Sites in this project" className="flex flex-wrap">
                    {session.sites.map((s, i) =>
                      s.embed ? (
                        <button
                          key={s.url}
                          type="button"
                          aria-pressed={i === index}
                          onClick={() => show(i)}
                          className="px-3 py-1.5 transition-colors duration-300"
                          style={i === index ? { background: "#eaeaea", color: "#000" } : undefined}
                        >
                          {s.label}
                        </button>
                      ) : (
                        <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 opacity-60 transition-opacity duration-300 hover:opacity-100">
                          {s.label}, in a new tab
                        </a>
                      ),
                    )}
                  </div>
                )}
                <p className="ml-auto flex items-center gap-2.5 max-md:hidden">
                  <span aria-hidden className="live-dot" />
                  Live at {new URL(site.url).host}
                </p>
                <a href={site.url} target="_blank" rel="noopener noreferrer" className="link max-md:ml-auto">
                  Open in a new tab
                </a>
                <button ref={closer} type="button" onClick={close} className="bg-paper px-3 py-1.5 font-medium text-ink">
                  Close
                </button>
              </motion.header>

              <div className="relative grow bg-white">
                <iframe
                  key={site.url}
                  src={site.url}
                  title={`${session.title}: ${site.label}, live`}
                  allow={site.allow}
                  // The frame can run and open its own pop-ups, but it cannot navigate this page away.
                  sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-downloads allow-popups allow-popups-to-escape-sandbox"
                  onLoad={() => setLoaded(true)}
                  className="absolute inset-0 h-full w-full border-0"
                />
                <AnimatePresence>
                  {!loaded && (
                    <motion.div key={site.url} className="absolute inset-0 flex items-end bg-black" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                      {poster && <Image src={poster} alt="" fill sizes="94vw" className="object-cover object-top opacity-60" />}
                      <p className="t-lead relative p-6">Loading the live site</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </LiveContext.Provider>
  );
}

/** A button that opens the live window, or a plain block when the project has nothing that can be framed. */
export function LiveTrigger({ offer, className, children }: { offer?: LiveOffer | null; className?: string; children: ReactNode }) {
  const open = useLive();
  if (!offer) return <div className={className}>{children}</div>;
  return (
    <button type="button" className={className} onClick={(e) => open(offer, e.currentTarget)}>
      {children}
    </button>
  );
}
