import { moreResumes, roles } from "@/content";
import { Lines } from "./motion";

/** The two roles I would like most, each with its strongest evidence and the résumé written for it, then the résumés for other roles. */
export default function Roles() {
  return (
    <section id="roles" className="wrap scroll-mt-24 pb-[clamp(5rem,11vw,10rem)]">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <h2 className="t-mega">
          <Lines lines={["Hiring for one", "of these?"]} />
        </h2>
        <p className="t-lead max-w-[32ch] text-mute">The two roles I would like most, with the evidence for each. I am open to others as well.</p>
      </div>

      <div className="mt-[clamp(2.5rem,6vw,5rem)] grid gap-[clamp(1rem,2vw,2rem)] lg:grid-cols-2">
        {roles.map((role) => (
          <article key={role.title} className="flex flex-col gap-10 bg-black p-[clamp(1.25rem,2.4vw,2.5rem)] text-paper">
            <div>
              <h3 className="t-huge">{role.title}</h3>
              <p className="t-lead mt-5 max-w-[40ch] text-dim">{role.fit}</p>
            </div>
            <ul>
              {role.proof.map((p) => (
                <li key={p.n} className="rule grid grid-cols-12 items-baseline gap-x-6 gap-y-1 py-4">
                  <p className="t-big col-span-12 font-medium tabular-nums sm:col-span-4">{p.n}</p>
                  <p className="t-body col-span-12 text-dim sm:col-span-8">{p.text}</p>
                </li>
              ))}
            </ul>
            <a
              href={role.resume.file}
              download
              className="mt-auto flex items-center justify-between gap-6 bg-paper px-[clamp(1rem,1.6vw,1.5rem)] py-[clamp(1rem,1.4vw,1.3rem)] font-medium text-ink transition-colors duration-300 hover:bg-white"
            >
              <span className="t-lead">Download the {role.resume.name}</span>
              <span className="t-small">PDF</span>
            </a>
          </article>
        ))}
      </div>

      <p className="t-lead mt-[clamp(1.5rem,3vw,2.5rem)] flex flex-wrap items-baseline gap-x-8 gap-y-3">
        <span className="text-mute">Hiring for something else? There is a résumé for that too.</span>
        {moreResumes.map((r) => (
          <a key={r.file} href={r.file} download className="link font-medium">
            {r.name} (PDF)
          </a>
        ))}
      </p>
    </section>
  );
}
