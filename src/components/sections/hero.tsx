"use client";

import { motion, type Variants } from "motion/react";
import HowItWorks from "@/components/HowItWorks";
import { LiveDispatch } from "@/components/live-dispatch";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative bg-white pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-10">
          <div>
            <motion.p
              initial="hidden"
              animate="show"
              custom={0}
              variants={fadeUp}
              className="font-mono-label mb-4 text-xs font-semibold uppercase text-blue-600"
            >
              AI-powered road inspection
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="show"
              custom={0.1}
              variants={fadeUp}
              className="text-5xl font-semibold tracking-tight text-ink-950 lg:text-6xl"
            >
              Smarter road closure
              <br />
              inspections.
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              custom={0.22}
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg text-ink-600"
            >
              SENTRY helps agencies detect potential closures, optimize
              officer assignments, and coordinate inspections in real time.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              custom={0.34}
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button className="rounded-full bg-ink-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-ink-800">
                Get started
              </button>

              <HowItWorks />
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            custom={0.3}
            variants={fadeUp}
          >
            <LiveDispatch />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
