import Image from "next/image";
import type { Project } from "@/content";

/** A project's screenshot, or a typographic stand-in when it has none. */
export default function Cover({ project, sizes, priority }: { project: Project; sizes: string; priority?: boolean }) {
  if (project.cover) {
    return <Image src={project.cover} alt={`${project.name} screenshot`} fill sizes={sizes} priority={priority} className="object-cover object-top" />;
  }
  const ex = project.example;
  if (!ex) return null;
  return (
    <div className="flex h-full w-full flex-col justify-between gap-6 p-[clamp(1.25rem,2.4vw,2.5rem)] text-paper" style={{ background: "rgba(255,255,255,0.07)" }}>
      <div>
        <p className="t-small" style={{ color: project.bright }}>
          You type
        </p>
        <p className="t-big mt-3">{ex.prompt}</p>
      </div>
      <div>
        <p className="t-small" style={{ color: project.bright }}>
          It becomes rules you can test
        </p>
        <ul className="t-lead mt-3 grid grid-cols-2 gap-x-6 gap-y-1 tabular-nums">
          {ex.rules.map((r) => (
            <li key={r} className="rule pt-2">
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
