"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CommandScene } from "@/components/ops-scene";

const CAPTIONS = [
  "New closure detected",
  "Scoring & prioritizing sites",
  "Officer dispatched",
  "Inspection in progress",
  "Plan updated with new data",
];

const STEP_DURATION_MS = [2400, 2200, 2600, 2200, 2600];

export function LiveDispatch() {
  const [step, setStep] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timeout = setTimeout(() => {
      setStep((current) => (current + 1) % CAPTIONS.length);
    }, STEP_DURATION_MS[step]);
    return () => clearTimeout(timeout);
  }, [step, reducedMotion]);

  const activeStep = reducedMotion ? 2 : step;

  return (
    <div className="relative">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-ink-950/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-600">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          Live demo
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={activeStep}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25 }}
            className="text-[11px] font-medium text-ink-400"
          >
            {CAPTIONS[activeStep]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="h-[300px] sm:h-[340px] lg:h-[380px]">
        <CommandScene step={activeStep} />
      </div>
    </div>
  );
}
