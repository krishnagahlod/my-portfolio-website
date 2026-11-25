import { existsSync } from "node:fs";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Cover from "@/components/Cover";
import { PageLink } from "@/components/Curtain";
import { LiveTrigger } from "@/components/Live";
import Strip from "@/components/Strip";
import { Lines, Parallax } from "@/components/motion";
import { golashApps, projects } from "@/content";

// Only the projects listed in the content file exist; any other address is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const path = "/work/" + project.slug;
  // Each project has its own preview picture in public/og. One added later without a picture falls back to the home preview.
  const picture = existsSync("public/og/" + project.slug + ".jpg") ? "/og/" + project.slug + ".jpg" : "/og/home.jpg";
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: {
      title: project.name + " | Krishna Gahlod",
      description: project.summary,
      url: path,
      type: "article",
      siteName: "Krishna Gahlod",
      images: [{ url: picture, width: 1200, height: 630, alt: project.name + ": " + project.kind }],
    },
  };
}

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rule grid gap-x-8 gap-y-6 py-[clamp(2.5rem,5vw,4.5rem)] md:grid-cols-12">
      <h2 className="t-big md:sticky md:top-24 md:col-span-4 md:self-start">{title}</h2>
      <div className="md:col-span-8">{children}</div>
    </section>
  );
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  // The live window is offered when at least one of the project's sites can be shown in a frame.
  const offer = project.live?.some((s) => s.embed) ? { title: project.name, sites: project.live, poster: project.cover, ground: project.deep } : null;

  return (
    <article>
      <header className="wrap pb-[clamp(2rem,4vw,3.5rem)] pt-[clamp(8rem,16vw,13rem)] text-paper" style={{ background: project.deep }}>
        <p className="t-small" style={{ color: project.bright }}>
          {project.kind}
        </p>
        <h1 className="t-mega mt-4">
          <Lines onView={false} delay={0.45} lines={[project.name]} />
        </h1>
        <p className="t-big mt-8 max-w-[34ch]">{project.summary}</p>

        <dl className="rule t-small mt-[clamp(2.5rem,5vw,4.5rem)] grid grid-cols-2 gap-x-6 gap-y-6 pt-5 md:grid-cols-12">
          <div className="md:col-span-3">
            <dt style={{ color: project.bright }}>Role</dt>
            <dd className="t-body mt-1">{project.role}</dd>
          </div>
          <div className="md:col-span-2">
            <dt style={{ color: project.bright }}>When</dt>
            <dd className="t-body mt-1">{project.when}</dd>
            {project.stage && <dd className="t-body opacity-70">{project.stage.label}</dd>}
          </div>
          <div className="col-span-2 md:col-span-4">
            <dt style={{ color: project.bright }}>Built with</dt>
            <dd className="t-body mt-1">{project.stack.join(", ")}</dd>
          </div>
          <div className="col-span-2 md:col-span-3">
            <dt style={{ color: project.bright }}>See it</dt>
            <dd className="t-body mt-1 grid gap-1">
              {project.live ? (
                project.live.map((l, i) =>
                  l.embed && offer ? (
                    <LiveTrigger key={l.url} offer={{ ...offer, index: i }} className="link justify-self-start text-left">
                      Explore {l.label} live
                    </LiveTrigger>
                  ) : (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="link justify-self-start">
                      {l.label}
                    </a>
                  ),
                )
              ) : (
                <span>Not hosted publicly</span>
              )}
            </dd>
          </div>
        </dl>
      </header>

      <div className="wrap pb-[clamp(3rem,6vw,5rem)]" style={{ background: project.deep }}>
        {project.film ? (
          // A film is shown whole (the parallax would crop its edges) and keeps its own sound button, so the live link sits beside it.
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Cover project={project} sizes="100vw" priority sound />
            {offer && (
              <LiveTrigger offer={offer} className="t-small absolute bottom-4 left-4 flex items-center gap-3 bg-paper px-4 py-3 font-medium text-ink">
                <span aria-hidden className="live-dot" />
                Explore it live
              </LiveTrigger>
            )}
          </div>
        ) : project.cover ? (
          <LiveTrigger offer={offer} className="group relative block w-full text-left">
            <Parallax className="relative aspect-[16/9] w-full">
              <div className="relative h-full w-full">
                <Cover project={project} sizes="100vw" priority />
              </div>
            </Parallax>
            {offer && (
              <span className="t-small absolute bottom-4 left-4 flex items-center gap-3 bg-paper px-4 py-3 font-medium text-ink transition-transform duration-500 group-hover:-translate-y-1.5">
                <span aria-hidden className="live-dot" />
                Explore it live
              </span>
            )}
          </LiveTrigger>
        ) : (
          <div className="relative w-full md:aspect-[16/7]">
            <Cover project={project} sizes="100vw" />
          </div>
        )}
      </div>

      <div className="wrap pb-[clamp(4rem,9vw,8rem)]">
        <Row title="The problem">
          <p className="t-big max-w-[38ch]">{project.problem}</p>
        </Row>

        <Row title="What I built">
          <div className="t-lead grid max-w-[62ch] gap-5">
            {project.built.map((b) => (
              <p key={b}>{b}</p>
            ))}
          </div>
        </Row>

        <Row title="How it works">
          <ol>
            {project.how.map((step, i) => (
              <li key={step.title} className={`grid grid-cols-12 gap-x-6 gap-y-1 py-5 ${i > 0 ? "rule" : "pt-0"}`}>
                <span className="t-small col-span-2 pt-1 tabular-nums text-mute sm:col-span-1">{i + 1}</span>
                <h3 className="t-lead col-span-10 font-medium sm:col-span-4">{step.title}</h3>
                <p className="t-body col-span-10 col-start-3 text-mute sm:col-span-7 sm:col-start-auto">{step.text}</p>
              </li>
            ))}
          </ol>
        </Row>

        <Row title="In numbers">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10">
            {project.numbers.map((n) => (
              <div key={n.label}>
                <dd className="t-mega tabular-nums">{n.value}</dd>
                <dt className="t-body mt-2 max-w-[24ch] text-mute">{n.label}</dt>
              </div>
            ))}
          </dl>
        </Row>

        {project.stage && (
          <Row title="Where it stands">
            <p className="t-lead max-w-[62ch]">{project.stage.text}</p>
          </Row>
        )}

        {project.slug === "golash" && (
          <Row title="The five apps">
            <ul>
              {golashApps.map((a, i) => (
                <li key={a.name} className={`grid grid-cols-12 items-baseline gap-x-6 gap-y-1 py-5 ${i > 0 ? "rule" : "pt-0"}`}>
                  <p className="t-lead col-span-12 flex items-center gap-3 font-medium sm:col-span-4">
                    <span aria-hidden className="h-3 w-3 shrink-0" style={{ background: a.color }} />
                    {a.name}
                  </p>
                  <p className="t-body col-span-12 text-mute sm:col-span-5">{a.what}</p>
                  <p className="t-small col-span-12 sm:col-span-3 sm:text-right">
                    {a.caseStudy ? (
                      <PageLink href={`/work/${a.caseStudy}`} colour={projects.find((p) => p.slug === a.caseStudy)?.deep} className="link">
                        Read the case study
                      </PageLink>
                    ) : (
                      <a href={a.url} target="_blank" rel="noopener noreferrer" className="link">
                        Open {a.name}
                      </a>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </Row>
        )}

        {/* Screens run the full width of the page: phones stand upright, wide screens keep their own shape */}
        {project.gallery && (
          <section className="rule py-[clamp(2.5rem,5vw,4.5rem)]">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
              <h2 className="t-big">Screens</h2>
              {project.gallery.length > 1 && <p className="t-small text-mute">{project.gallery.length} screens. Use the arrows, or drag sideways.</p>}
            </div>
            <div className="mt-[clamp(1.5rem,3vw,2.5rem)]">
              <Strip label={`${project.name} screens`}>
                {project.gallery.map((g, i, all) => (
                  <figure key={g.src} className={`shrink-0 ${g.phone ? "w-[clamp(12.5rem,19vw,17rem)]" : all.length > 1 ? "w-[min(86%,62rem)]" : "w-full max-w-[62rem]"}`}>
                    {g.phone ? (
                      <div className="relative aspect-[600/1309] drop-shadow-[0_14px_22px_rgba(0,0,0,0.18)]">
                        <Image src={g.src} alt={g.caption} fill sizes="(max-width: 768px) 60vw, 19vw" draggable={false} className="object-contain" />
                      </div>
                    ) : (
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                        <Image src={g.src} alt={g.caption} fill sizes="(max-width: 768px) 100vw, 62rem" draggable={false} className="object-cover object-top" />
                      </div>
                    )}
                    <figcaption className="t-small mt-4 flex justify-between gap-4 text-mute">
                      <span>{g.caption}</span>
                      {all.length > 1 && (
                        <span className="shrink-0 tabular-nums">
                          {i + 1} of {all.length}
                        </span>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </Strip>
            </div>
          </section>
        )}
      </div>

      <PageLink href={`/work/${next.slug}`} colour={next.deep} className="wrap block bg-black py-[clamp(4rem,9vw,8rem)] text-paper">
        <p className="t-small text-dim">Next project</p>
        <p className="t-mega mt-4">
          <Lines lines={[next.name]} />
        </p>
        <p className="t-lead mt-5 max-w-[44ch] text-dim">{next.summary}</p>
      </PageLink>
    </article>
  );
}
