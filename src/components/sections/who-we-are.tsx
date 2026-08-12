import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { principalInvestigator, nsfGrant } from "@/lib/site-data";

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="bg-white py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="font-mono-label text-xs uppercase text-blue-600">
            Who we are
          </p>
          <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl">
            Building AI for real-world decisions.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600">
            SENTRY brings together researchers in AI, optimization, and
            transportation to build decision-support tools for real-world
            field operations.
          </p>
        </Reveal>

        {/* University collaboration */}
        <Reveal delay={0.1} className="mt-12 flex items-center gap-10 border-t border-line pt-8">
          <span className="font-mono-label shrink-0 text-[10px] uppercase text-ink-400">
            Research collaboration
          </span>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            <div className="relative h-8 w-40">
              <Image
                src={nsfGrant.logos.williamAndMary}
                alt="William & Mary"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="relative h-7 w-36">
              <Image
                src={nsfGrant.logos.vanderbilt}
                alt="Vanderbilt University"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
        </Reveal>

        {/* Lead PI */}
        <Reveal delay={0.2} className="mt-6">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <div className="grid gap-8 md:grid-cols-[160px_1fr] md:items-center">
              <Image
                src={principalInvestigator.photo}
                alt={principalInvestigator.name}
                width={200}
                height={200}
                className="h-32 w-32 rounded-2xl object-cover md:h-40 md:w-40"
              />

              <div>
                <p className="font-mono-label text-[10px] uppercase text-blue-600">
                  {principalInvestigator.role}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink-950">
                  {principalInvestigator.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">
                  {principalInvestigator.title}
                </p>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-600">
                  {principalInvestigator.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {principalInvestigator.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-line bg-surface-panel px-3 py-1 text-xs font-medium text-ink-600"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
