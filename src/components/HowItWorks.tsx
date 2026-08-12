"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CommandScene } from "@/components/ops-scene";

type Step = {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 0,
    eyebrow: "01 — DETECT",
    title: "AI detects potential road closures",
    description:
      "SENTRY ingests detections from an AI/ML pipeline. Each potential closure carries a confidence score, since the underlying detection is uncertain.",
  },
  {
    id: 1,
    eyebrow: "02 — PLAN",
    title: "Sites and officers are scored together",
    description:
      "SENTRY combines detections with mandatory inspection sites, officer availability, location, and travel time, then runs optimization to decide what gets inspected.",
  },
  {
    id: 2,
    eyebrow: "03 — DISPATCH",
    title: "The right officer is assigned",
    description:
      "SENTRY recommends efficient assignments and routes — minimizing travel while making sure mandatory sites are covered and high-confidence closures are prioritized.",
  },
  {
    id: 3,
    eyebrow: "04 — INSPECT",
    title: "Every inspection is tracked",
    description:
      "Officers complete inspections in the field while SENTRY keeps status, progress, and site history visible across the operation in real time.",
  },
  {
    id: 4,
    eyebrow: "05 — ADAPT",
    title: "The plan adapts as new data arrives",
    description:
      "As new closure information comes in, SENTRY updates its recommendations and adjusts the inspection plan — no manual replanning required.",
  },
];

export default function HowItWorks() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();

  const next = () => {
    setStep((current) => {
      if (current < steps.length - 1) {
        setDirection(1);
        return current + 1;
      }
      return current;
    });
  };

  const previous = () => {
    setStep((current) => {
      if (current > 0) {
        setDirection(-1);
        return current - 1;
      }
      return current;
    });
  };

  const openModal = () => {
    setStep(0);
    setDirection(1);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <>
      <motion.button
        onClick={openModal}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group inline-flex items-center gap-2 rounded-full border border-ink-950/15 bg-white px-5 py-3 text-sm font-medium text-ink-950 shadow-sm transition-colors hover:border-ink-950/30"
      >
        How it works
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          →
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-ink-950/60 backdrop-blur-md"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="how-it-works-title"
              initial={
                reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 20 }
              }
              animate={
                reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
              }
              exit={
                reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-ink-950/8 px-6 py-5 sm:px-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
                    Product walkthrough
                  </p>
                  <h2
                    id="how-it-works-title"
                    className="mt-1 text-xl font-semibold tracking-tight text-ink-950"
                  >
                    How SENTRY works
                  </h2>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-panel text-ink-600 transition hover:bg-ink-950/10 hover:text-ink-950"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid min-h-0 flex-1 overflow-auto lg:grid-cols-[1fr_360px]">
                <div className="relative min-h-[400px] overflow-hidden bg-surface-panel p-4 sm:p-8">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      initial={{ opacity: 0, x: reducedMotion ? 0 : direction * 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: reducedMotion ? 0 : direction * -40 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="relative h-full min-h-[370px]"
                    >
                      <CommandScene step={step} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex flex-col justify-between border-t border-ink-950/8 bg-white p-6 sm:p-8 lg:border-l lg:border-t-0">
                  <div>
                    <div className="mb-8 flex items-center gap-2">
                      {steps.map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setDirection(index > step ? 1 : -1);
                            setStep(index);
                          }}
                          aria-label={`Go to step ${index + 1}`}
                          className="group"
                        >
                          <motion.div
                            animate={{
                              width: index === step ? 32 : 8,
                              opacity: index === step ? 1 : 0.3,
                            }}
                            className="h-1.5 rounded-full bg-ink-950"
                          />
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="font-mono-label text-xs font-bold text-blue-600">
                          {steps[step].eyebrow}
                        </p>
                        <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink-950">
                          {steps[step].title}
                        </h3>
                        <p className="mt-4 text-sm leading-6 text-ink-600">
                          {steps[step].description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="mt-10">
                    <div className="mb-5 flex items-center justify-between text-xs text-ink-400">
                      <span>Step {step + 1} of {steps.length}</span>
                      <span>Use ← → to navigate</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={previous}
                        disabled={step === 0}
                        className="flex-1 rounded-xl border border-ink-950/12 px-4 py-3 text-sm font-medium text-ink-800 transition hover:bg-surface-panel disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Back
                      </button>

                      {step < steps.length - 1 ? (
                        <button
                          onClick={next}
                          className="flex-[1.5] rounded-xl bg-ink-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-ink-800"
                        >
                          Next →
                        </button>
                      ) : (
                        <button
                          onClick={() => setOpen(false)}
                          className="flex-[1.5] rounded-xl bg-ink-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-ink-800"
                        >
                          Get started →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
