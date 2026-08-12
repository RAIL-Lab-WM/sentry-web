"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { AlertTriangle, Check, Route, UserRound } from "lucide-react";

const steps = [
  {
    id: 0,
    number: "01",
    short: "New alert",
    title: "A potential closure appears",
    description:
      "New information identifies a location that may need an inspection.",
  },
  {
    id: 1,
    number: "02",
    short: "Evaluate",
    title: "SENTRY evaluates the options",
    description:
      "It considers existing inspections, available officers, travel time, and the importance of the new alert.",
  },
  {
    id: 2,
    number: "03",
    short: "Respond",
    title: "A field response is recommended",
    description:
      "SENTRY recommends who should respond and how the new inspection fits into the existing plan.",
  },
  {
    id: 3,
    number: "04",
    short: "Verify",
    title: "The inspection is completed",
    description:
      "The result is recorded and the team keeps a current view of field activity.",
  },
];

export function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(steps.length - 1, Math.floor(value * steps.length));
    setActiveStep(index);
  });

  return (
    <section id="how-it-works" ref={containerRef} className="relative bg-white">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 pt-28 sm:pt-36 md:px-10">
        <div className="max-w-xl">
          <p className="font-mono-label text-xs uppercase text-blue-600">
            The workflow
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl">
            From a potential closure to an inspection
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            See how SENTRY turns new information into a coordinated field
            response.
          </p>
        </div>
      </div>

      {/* Desktop scroll experience */}
      <div className="relative mx-auto hidden max-w-6xl grid-cols-[0.8fr_1.4fr] gap-16 px-6 pb-32 pt-20 md:px-10 lg:grid">
        <div>
          {steps.map((step, index) => (
            <div key={step.id} className="flex min-h-[70vh] items-center">
              <StepCopy
                step={step}
                active={activeStep === index}
                complete={activeStep > index}
              />
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="sticky top-24 flex h-[calc(100vh-8rem)] items-center">
            <WorkflowVisual step={activeStep} />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="mx-auto space-y-16 px-6 pb-24 pt-14 lg:hidden">
        {steps.map((step, index) => (
          <div key={step.id}>
            <StepCopy step={step} active complete={false} />
            <div className="mt-8">
              <WorkflowVisual step={index} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StepCopy({
  step,
  active,
  complete,
}: {
  step: (typeof steps)[number];
  active: boolean;
  complete: boolean;
}) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.3, y: active ? 0 : 8 }}
      transition={{ duration: 0.35 }}
      className="max-w-md"
    >
      <div className="flex items-center gap-4">
        <motion.div
          animate={{ scale: active ? 1 : 0.9 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border bg-white font-mono text-sm font-medium text-ink-950"
        >
          {complete ? <Check className="h-4 w-4" /> : step.number}
        </motion.div>
        <span className="font-mono-label text-xs uppercase text-ink-400">
          {step.short}
        </span>
      </div>

      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink-950">
        {step.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-ink-600">
        {step.description}
      </p>
    </motion.div>
  );
}

function WorkflowVisual({ step }: { step: number }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ink-950/10 bg-surface-panel shadow-xl">
      <div className="absolute inset-x-0 top-0 z-20 flex h-14 items-center border-b bg-white/90 px-5 backdrop-blur">
        <div className="font-semibold tracking-tight text-ink-950">SENTRY</div>
        <div className="ml-auto flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-600" />
          <span className="text-xs text-ink-400">Live operations</span>
        </div>
      </div>

      <MapBackground />

      <SiteMarker x="19%" y="26%" label="Inspection A" />
      <SiteMarker x="72%" y="72%" label="Inspection B" />

      <OfficerMarker x="21%" y="69%" label="Officer 1" muted={step >= 1} />

      <motion.div
        className="absolute"
        initial={false}
        animate={{
          left: step >= 3 ? "61%" : "67%",
          top: step >= 3 ? "43%" : "63%",
        }}
        transition={{ duration: reducedMotion ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <OfficerMarker x="0" y="0" label="Officer 2" selected={step >= 1} />
      </motion.div>

      <motion.div
        className="absolute left-[58%] top-[37%]"
        initial={false}
        animate={{ scale: step === 0 ? 1 : 0.95 }}
      >
        <PotentialClosure step={step} />
      </motion.div>

      <AnimatePresence>
        {step === 1 && (
          <>
            <EvaluationChip x="25%" y="39%" delay={0}>
              Travel time
            </EvaluationChip>
            <EvaluationChip x="56%" y="22%" delay={0.1}>
              Alert priority
            </EvaluationChip>
            <EvaluationChip x="51%" y="73%" delay={0.2}>
              Officer availability
            </EvaluationChip>
            <EvaluationChip x="13%" y="54%" delay={0.3}>
              Existing work
            </EvaluationChip>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 800 600"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M545 385 C500 340 470 310 455 260"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              className="text-blue-600"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 1, ease: "easeInOut" }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-6 right-6 w-[260px] rounded-2xl border bg-white/95 p-4 shadow-lg backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/10">
                <Route className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-ink-400">Recommended response</p>
                <p className="mt-0.5 text-sm font-semibold text-ink-950">
                  Officer 2 → New inspection
                </p>
              </div>
            </div>
            <div className="mt-4 border-t pt-3 text-xs text-ink-400">
              Fits the current field plan
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-6 right-6 w-[240px] rounded-2xl border bg-white/95 p-4 shadow-lg backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600/10">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-950">
                  Inspection completed
                </p>
                <p className="mt-0.5 text-xs text-ink-400">
                  Field result recorded
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-5 left-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="rounded-full border bg-white/90 px-3 py-1.5 text-xs font-medium text-ink-800 shadow-sm backdrop-blur"
          >
            {step === 0 && "New potential closure"}
            {step === 1 && "Evaluating field conditions"}
            {step === 2 && "Response recommended"}
            {step === 3 && "Inspection verified"}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PotentialClosure({ step }: { step: number }) {
  return (
    <div className="relative">
      {step === 0 && (
        <motion.div
          className="absolute -inset-4 rounded-full bg-red-500/20"
          animate={{ scale: [0.8, 1.6, 0.8], opacity: [0.7, 0, 0.7] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
        />
      )}

      <motion.div
        animate={{
          backgroundColor: step === 3 ? "rgb(22 163 74)" : "rgb(239 68 68)",
        }}
        className="relative flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg"
      >
        {step === 3 ? <Check className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        className="absolute left-1/2 top-14 -translate-x-1/2 whitespace-nowrap rounded-lg border bg-white px-3 py-2 shadow-sm"
      >
        <p className="text-xs font-semibold text-ink-950">
          {step === 3 ? "Inspected" : "Potential closure"}
        </p>
        {step < 3 && (
          <p className="mt-0.5 text-[10px] text-ink-400">New alert</p>
        )}
      </motion.div>
    </div>
  );
}

function OfficerMarker({
  x,
  y,
  label,
  selected,
  muted,
}: {
  x: string;
  y: string;
  label: string;
  selected?: boolean;
  muted?: boolean;
}) {
  return (
    <motion.div
      style={{ left: x, top: y }}
      animate={{ opacity: muted ? 0.45 : 1, scale: selected ? 1.08 : 1 }}
      className="absolute"
    >
      {selected && (
        <motion.div
          layoutId="selected-officer"
          className="absolute -inset-2 rounded-full border-2 border-blue-600/30"
        />
      )}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-md">
        <UserRound className="h-4 w-4 text-ink-800" />
      </div>
      <div className="absolute left-1/2 top-12 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/90 px-2 py-1 text-[10px] text-ink-600 shadow-sm">
        {label}
      </div>
    </motion.div>
  );
}

function SiteMarker({ x, y, label }: { x: string; y: string; label: string }) {
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <div className="h-3 w-3 rounded-full border-2 border-white bg-slate-400 shadow" />
      <span className="absolute left-4 top-[-2px] whitespace-nowrap text-[10px] font-medium text-ink-400">
        {label}
      </span>
    </div>
  );
}

function EvaluationChip({
  x,
  y,
  delay,
  children,
}: {
  x: string;
  y: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.85, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay }}
      className="absolute rounded-full border bg-white/95 px-3 py-1.5 text-[10px] font-medium text-ink-800 shadow-sm backdrop-blur"
    >
      {children}
    </motion.div>
  );
}

function MapBackground() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 600" preserveAspectRatio="none">
      <rect width="800" height="600" fill="#EFE8DB" />

      <g fill="#E3DAC5">
        <rect x="60" y="110" width="150" height="90" rx="12" />
        <rect x="270" y="90" width="160" height="100" rx="12" />
        <rect x="520" y="100" width="190" height="100" rx="12" />
        <rect x="80" y="310" width="170" height="120" rx="12" />
        <rect x="340" y="300" width="140" height="110" rx="12" />
        <rect x="580" y="330" width="150" height="100" rx="12" />
      </g>

      <g fill="none" stroke="#FBF8F1" strokeLinecap="round">
        <path d="M0 245 C160 220 270 280 410 230 S650 170 800 215" strokeWidth="28" />
        <path d="M250 0 C260 150 230 250 310 390 S440 510 475 600" strokeWidth="28" />
        <path d="M535 0 C500 150 570 240 525 360 S570 500 660 600" strokeWidth="28" />
        <path d="M0 510 C180 450 300 500 445 470 S650 440 800 500" strokeWidth="28" />
      </g>

      <g fill="none" stroke="#FBF8F1" strokeLinecap="round" strokeWidth="12" opacity="0.8">
        <path d="M70 40 L730 560" />
        <path d="M100 560 L700 40" />
      </g>
    </svg>
  );
}
