import type { CSSProperties, ReactNode } from "react";

// A point on a circle around the centre, rounded so the server and every browser print the same numbers.
const at = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(60 + r * Math.sin(a)).toFixed(1)},${(60 - r * Math.cos(a)).toFixed(1)}`;
};
const turns = (n: number) => Array.from({ length: n }, (_, i) => (i * 360) / n);
const nth = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * One symbol for each role and activity, drawn on a 120 unit square in the current text colour.
 * Details are knocked out in the ground colour, and the g- classes in globals.css move the parts.
 */
const shapes = {
  // Systems: a rack of servers with status lights
  servers: [14, 47, 80].map((y, i) => (
    <g key={y}>
      <rect x="10" y={y} width="100" height="26" rx="13" />
      <circle className="knock g-blink" cx="92" cy={y + 13} r="5" style={nth(i)} />
    </g>
  )),
  // Sustainability: a leaf
  leaf: (
    <g className="g-sway">
      <path d="M60 114C16 88 18 34 60 6c42 28 44 82 0 108Z" />
      <path className="knock-line" d="M60 114V46M60 90 43 73M60 90l17-17M60 68 48 56M60 68l12-12" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  // Yoga: the sun of a sun salutation
  sun: (
    <>
      <circle cx="60" cy="60" r="24" />
      <g className="g-spin" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
        {turns(12).map((d) => (
          <line key={d} x1="60" y1="8" x2="60" y2="22" transform={`rotate(${d} 60 60)`} />
        ))}
      </g>
    </>
  ),
  // Mentoring: students in orbit around a mentor
  orbit: (
    <>
      <circle cx="60" cy="60" r="24" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="currentColor" strokeWidth="2" />
      <g className="g-spin">
        {turns(3).map((d) => (
          <circle key={d} cx="60" cy="12" r="9" transform={`rotate(${d} 60 60)`} />
        ))}
      </g>
    </>
  ),
  // Sprinting: speed
  chevrons: (
    <g className="g-dash" fill="none" stroke="currentColor" strokeWidth="14">
      {[10, 42, 74].map((x) => (
        <path key={x} d={`M${x} 20l30 40-30 40`} />
      ))}
    </g>
  ),
  // An award
  star: <polygon className="g-spin" points={turns(16).map((d, i) => at(i % 2 ? 22 : 56, d)).join(" ")} />,
  // Returns
  bars: [
    [14, 44],
    [47, 70],
    [80, 100],
  ].map(([x, h], i) => <rect key={x} className="g-rise" x={x} y={110 - h} width="26" height={h} style={nth(i)} />),
  // Teaching
  book: (
    <g className="g-pulse">
      <path d="M55 30C44 21 26 19 10 24v74c16-5 34-3 45 6Z" />
      <path d="M65 30c11-9 29-11 45-6v74c-16-5-34-3-45 6Z" />
    </g>
  ),
  // Science
  atom: (
    <>
      <g className="g-spin" fill="none" stroke="currentColor" strokeWidth="5">
        {[0, 60, 120].map((d) => (
          <ellipse key={d} cx="60" cy="60" rx="54" ry="20" transform={`rotate(${d} 60 60)`} />
        ))}
      </g>
      <circle cx="60" cy="60" r="9" />
    </>
  ),
  // Vision, the design event
  eye: (
    <>
      <path d="M4 60Q60 0 116 60 60 120 4 60Z" />
      <circle className="knock" cx="60" cy="60" r="21" />
      <circle className="g-pulse" cx="60" cy="60" r="10" />
    </>
  ),
  // Medals
  medal: (
    <g className="g-pulse">
      <path d="M30 4h24l14 40-14 14ZM90 4H66L52 44l14 14Z" />
      <circle cx="60" cy="80" r="32" />
      <circle className="knock-line" cx="60" cy="80" r="19" strokeWidth="4" />
    </g>
  ),
} satisfies Record<string, ReactNode>;

export type GlyphName = keyof typeof shapes;

export default function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="currentColor" aria-hidden className={`glyph overflow-visible ${className ?? ""}`}>
      {shapes[name]}
    </svg>
  );
}
