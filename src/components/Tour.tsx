"use client";

import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * A screenshot that turns into a looping video: a scroll-through of the live site, or the project's film.
 * The video is only fetched once it should play: while it is on screen and `play` is set.
 * A film is 16:9 and is shown whole on `ground`; with `sound` it also gets a sound button.
 */
export default function Tour({
  src,
  poster,
  alt,
  sizes,
  play = true,
  priority,
  film,
}: {
  src: string;
  poster: string;
  alt: string;
  sizes: string;
  play?: boolean;
  priority?: boolean;
  film?: { ground: string; name: string; sound?: boolean };
}) {
  const holder = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(holder, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [asked, setAsked] = useState(false); // the visitor pressed Play, which overrides data-saver and reduced motion

  // Data-saver connections keep the still: each video is 1 to 2.5 MB. Everyone else gets the video, but only while it is on screen.
  const [allowed, setAllowed] = useState<boolean | null>(null); // null until the browser has been asked
  useEffect(() => {
    const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    setAllowed(!saver);
  }, []);
  const shown = (allowed === true && !reduce) || asked;
  const on = play && inView && shown;

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (on) v.play().catch(() => {});
    else v.pause();
  }, [on]);

  const button = "t-small absolute bottom-4 right-4 bg-paper px-4 py-3 font-medium text-ink";

  return (
    <div ref={holder} className="absolute inset-0">
      <Image src={poster} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      {shown && (
        <video
          ref={video}
          src={src}
          muted={muted}
          loop
          playsInline
          preload="none"
          aria-hidden={!film?.sound}
          aria-label={film?.sound ? `A short film about ${film.name}` : undefined}
          tabIndex={-1}
          onPlaying={() => setStarted(true)}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${film ? "object-contain" : "object-cover object-top"}`}
          style={{ opacity: started ? 1 : 0, background: film?.ground }}
        />
      )}
      {film?.sound &&
        (shown ? (
          <button
            type="button"
            className={button}
            onClick={() => {
              // Turning the sound on starts the film again, so the music is heard from its first bar.
              if (muted && video.current) video.current.currentTime = 0;
              setMuted(!muted);
            }}
          >
            {muted ? "Play with sound" : "Mute"}
          </button>
        ) : allowed === null ? null : (
          <button type="button" className={button} onClick={() => setAsked(true)}>
            Play the film
          </button>
        ))}
    </div>
  );
}
