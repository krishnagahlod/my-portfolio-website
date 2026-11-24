"use client";

import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * A screenshot that turns into a looping scroll-through of the live site.
 * The video is only fetched once it should play: while it is on screen and `play` is set.
 */
export default function Tour({ src, poster, alt, sizes, play = true, priority }: { src: string; poster: string; alt: string; sizes: string; play?: boolean; priority?: boolean }) {
  const holder = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(holder, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  // Phones and data-saver connections keep the still: each video is 1 to 2 MB.
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    setAllowed(window.matchMedia("(min-width: 768px)").matches && !saver);
  }, []);
  const on = play && inView && allowed && !reduce;

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (on) v.play().catch(() => {});
    else v.pause();
  }, [on]);

  return (
    <div ref={holder} className="absolute inset-0">
      <Image src={poster} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      {allowed && !reduce && (
        <video
          ref={video}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          onPlaying={() => setStarted(true)}
          className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700"
          style={{ opacity: started ? 1 : 0 }}
        />
      )}
    </div>
  );
}
