"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { CommandScene } from "@/components/ops-scene";

const steps = [
  {
    id: 0,
    label: "Detect",
    title: "AI detects potential road closures",
    description:
      "SENTRY ingests detections from an AI/ML pipeline. Each potential closure carries a confidence score indicating how likely the closure is to be real.",
  },
  {
    id: 1,
    label: "Plan",
    title: "Sites and officers view",
    description:
      "Detections, mandatory sites, officer availability, and travel time are viewed together for planning purposes.",
  },
  {
    id: 2,
    label: "Dispatch",
    title: "SENTRY selects the best officer",
    description:
      "An operator can assign someone manually, or let SENTRY compare every available officer and dispatch the best match automatically — not just the nearest one.",
  },
  {
    id: 3,
    label: "Inspect",
    title: "Every inspection is tracked",
    description:
      "Officers inspect in the field. Status, progress, and site history stay visible in real time.",
  },
  {
    id: 4,
    label: "Adapt",
    title: "The plan adapts as new data arrives",
    description:
      "New information updates the feed automatically.",
  },
];

export function Workflow() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;

    if (step === steps.length - 1) {
      const endTimer = setTimeout(() => {
        setPlaying(false);
      }, 1800);
      return () => clearTimeout(endTimer);
    }

    const timer = setTimeout(() => {
      setStep((current) => current + 1);
    }, 2400);
    return () => clearTimeout(timer);
  }, [step, playing]);

  const playWorkflow = () => {
    setStep(0);
    setPlaying(true);
  };

  const chooseStep = (index: number) => {
    setPlaying(false);
    setStep(index);
  };

  return (
    <section id="how-it-works" className="bg-white py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono-label text-xs uppercase text-blue-600">
            The workflow
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl">
            From detection to inspection
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            See how SENTRY turns a potential road closure into a coordinated
            field inspection.
          </p>

          <Button onClick={playWorkflow} size="lg" className="mt-8 rounded-full px-6">
            {playing ? "Playing workflow" : "▶ Play workflow"}
          </Button>
        </div>

        {/* Step navigation */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="hidden items-center justify-between sm:flex">
            {steps.map((item, index) => (
              <div key={item.id} className="flex flex-1 items-center">
                <button
                  onClick={() => chooseStep(index)}
                  className="group flex flex-col items-center gap-3"
                >
                  <motion.div
                    animate={{
                      scale: step === index ? 1.08 : 1,
                      opacity: step >= index ? 1 : 0.35,
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm font-semibold transition ${
                      step === index
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-ink-950/15 bg-white text-ink-950"
                    }`}
                  >
                    {index + 1}
                  </motion.div>
                  <span
                    className={`font-mono-label text-xs uppercase ${
                      step === index ? "text-ink-950" : "text-ink-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>

                {index < steps.length - 1 && (
                  <div className="mx-3 h-px flex-1 overflow-hidden bg-line">
                    <motion.div
                      className="h-full bg-blue-600"
                      animate={{ width: step > index ? "100%" : "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile step controls */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:hidden">
            {steps.map((item, index) => (
              <button
                key={item.id}
                onClick={() => chooseStep(index)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${
                  step === index
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-ink-950/15 bg-white text-ink-600"
                }`}
              >
                {index + 1}. {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main animation */}
        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-ink-950/10 bg-white shadow-xl">
          <div className="grid min-h-[520px] lg:grid-cols-[1.35fr_0.65fr]">
            {/* Real system, driven by the same steps */}
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-surface-panel p-4 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full min-h-[380px] w-full"
                >
                  <CommandScene step={step} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Explanation */}
            <div className="flex flex-col justify-between border-t border-ink-950/8 bg-white p-8 lg:border-l lg:border-t-0">
              <div>
                <p className="font-mono-label text-xs uppercase text-ink-400">
                  Step {step + 1} of {steps.length}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink-950">
                      {steps[step].title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-ink-600">
                      {steps[step].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <Button variant="ghost" disabled={step === 0} onClick={() => chooseStep(step - 1)}>
                  Back
                </Button>

                {step < steps.length - 1 ? (
                  <Button onClick={() => chooseStep(step + 1)}>Next</Button>
                ) : (
                  <Button onClick={playWorkflow}>Replay</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
