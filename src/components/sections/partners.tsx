"use client";

import { Reveal } from "@/components/reveal";
import { partners } from "@/lib/site-data";

export function Partners() {
  return (
    <section id="partners" className="bg-white py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="font-mono-label text-xs uppercase text-blue-600">
            Partners
          </p>
          <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl">
            Built with agencies and researchers in the field
          </h2>
        </Reveal>

        <div className="mt-16 grid divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
          {partners.map((partner, i) => (
            <Reveal
              key={partner.name}
              delay={(i % 3) * 0.06}
              className="flex flex-col justify-center gap-2 px-6 py-8 first:sm:pl-0 last:sm:pr-0"
            >
              <span className="font-mono-label text-[10px] uppercase text-ink-400">
                {partner.type}
              </span>
              <span className="text-xl font-semibold tracking-tight text-ink-950">
                {partner.name}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
