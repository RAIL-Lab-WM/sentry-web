"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  MapPin,
  RotateCcw,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Officer = {
  id: number;
  name: string;
  distance: string;
  eta: string;
  status: "Available" | "Busy";
  note?: string;
};

const officers: Officer[] = [
  {
    id: 1,
    name: "Officer 12",
    distance: "3.1 mi",
    eta: "8 min",
    status: "Available",
  },
  {
    id: 2,
    name: "Officer 7",
    distance: "5.4 mi",
    eta: "14 min",
    status: "Available",
  },
  {
    id: 3,
    name: "Officer 18",
    distance: "2.2 mi",
    eta: "6 min",
    status: "Busy",
    note: "Current inspection underway",
  },
];

type ExperienceState =
  | "review"
  | "manual"
  | "recommended"
  | "dispatched"
  | "complete";

export function TryIt() {
  const [state, setState] = useState<ExperienceState>("review");
  const [selectedOfficer, setSelectedOfficer] = useState<number | null>(null);

  const recommendedOfficer = 1;

  const reset = () => {
    setState("review");
    setSelectedOfficer(null);
  };

  const askSentry = () => {
    setSelectedOfficer(recommendedOfficer);
    setTimeout(() => {
      setState("recommended");
    }, 450);
  };

  const dispatch = () => {
    setState("dispatched");
    setTimeout(() => {
      setState("complete");
    }, 1400);
  };

  return (
    <section id="try-it" className="relative overflow-hidden bg-ink-950 py-28 md:py-36">
      <div className="grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,black,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono-label text-xs uppercase text-blue-100">
            Try it out
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Make a field decision
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            A potential closure has just been detected. See how SENTRY can
            help decide who should respond.
          </p>
        </div>

        {/* Experience */}
        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-ink-950/10 bg-white shadow-2xl">
          <div className="grid min-h-[580px] lg:grid-cols-[0.9fr_1.1fr]">
            {/* Scenario */}
            <div className="border-b border-ink-950/8 bg-surface-panel p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between">
                <Badge variant="outline">Live scenario</Badge>

                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-xs text-ink-400 transition hover:text-ink-950"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>

              <div className="mt-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-ink-950">
                  Potential road closure
                </h3>
                <p className="mt-2 text-sm text-ink-600">
                  A new location has been flagged for review.
                </p>

                <div className="mt-8 rounded-2xl border border-ink-950/10 bg-white p-5">
                  <div className="flex items-center gap-2 text-sm text-ink-600">
                    <MapPin className="h-4 w-4" />
                    14th Avenue &amp; Church Street
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-ink-600">
                        Likelihood of closure
                      </span>
                      <span className="text-sm font-semibold text-ink-950">
                        82%
                      </span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-dim">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "82%" }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="font-mono-label text-[10px] uppercase text-ink-400">
                    Your task
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-800">
                    Choose an officer manually or use SENTRY for AI
                    dispatch.
                  </p>
                </div>
              </div>
            </div>

            {/* Decision area */}
            <div className="relative p-7 sm:p-10">
              <AnimatePresence mode="wait">
                {state === "review" && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <DecisionView
                      selectedOfficer={selectedOfficer}
                      onSelect={setSelectedOfficer}
                    />

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setState("manual")}
                        className="h-12"
                      >
                        Assign manually
                      </Button>

                      <Button size="lg" onClick={askSentry} className="h-12">
                        <Sparkles className="mr-2 h-4 w-4" />
                        SENTRY
                      </Button>
                    </div>
                  </motion.div>
                )}

                {state === "manual" && (
                  <motion.div
                    key="manual"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <p className="text-sm font-medium text-ink-950">
                        Choose an officer
                      </p>
                      <p className="mt-1 text-sm text-ink-600">
                        The command center remains in control of the
                        assignment.
                      </p>
                    </div>

                    <div className="mt-7">
                      <OfficerList
                        selectedOfficer={selectedOfficer}
                        onSelect={setSelectedOfficer}
                      />
                    </div>

                    <div className="mt-8 flex gap-3">
                      <Button variant="outline" onClick={() => setState("review")}>
                        Back
                      </Button>
                      <Button
                        disabled={!selectedOfficer}
                        onClick={dispatch}
                        className="flex-1"
                      >
                        Dispatch officer
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {state === "recommended" && (
                  <motion.div
                    key="recommended"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-ink-950">
                          SENTRY recommendation
                        </p>
                        <p className="text-sm text-ink-600">
                          Best fit for the current field situation
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <OfficerList
                        selectedOfficer={recommendedOfficer}
                        onSelect={() => {}}
                        recommended
                      />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="mt-6 rounded-2xl border border-ink-950/10 bg-surface-panel p-5"
                    >
                      <p className="text-sm font-medium text-ink-950">
                        Why Officer 12?
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">
                        Officer 12 is available and can reach the location
                        quickly without interrupting another active
                        inspection.
                      </p>
                    </motion.div>

                    <div className="mt-8 flex gap-3">
                      <Button variant="outline" onClick={() => setState("manual")}>
                        Choose manually
                      </Button>
                      <Button onClick={dispatch} className="flex-1">
                        Dispatch Officer 12
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {state === "dispatched" && (
                  <motion.div
                    key="dispatched"
                    className="flex min-h-[420px] items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0.85 }}
                        animate={{ scale: 1 }}
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-ink-950/10 bg-white shadow-sm"
                      >
                        <UserRound className="h-6 w-6 text-ink-800" />
                      </motion.div>

                      <div className="relative mx-auto my-7 h-16 w-px bg-line">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "100%" }}
                          transition={{ duration: 0.8 }}
                          className="absolute left-0 top-0 w-px bg-blue-600"
                        />
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                      >
                        <p className="text-lg font-semibold text-ink-950">
                          Assignment sent
                        </p>
                        <p className="mt-2 text-sm text-ink-600">
                          Officer 12 is responding to the inspection.
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {state === "complete" && (
                  <motion.div
                    key="complete"
                    className="flex min-h-[420px] items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="max-w-sm text-center">
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-600/10"
                      >
                        <CheckCircle2 className="h-9 w-9 text-green-600" />
                      </motion.div>

                      <h3 className="mt-7 text-2xl font-semibold text-ink-950">
                        Inspection complete
                      </h3>
                      <p className="mt-3 leading-relaxed text-ink-600">
                        The inspection result has been recorded and the
                        command center now has an updated view of the site.
                      </p>

                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="mt-7 flex items-center justify-between rounded-xl border border-ink-950/10 px-4 py-3 text-left"
                      >
                        <div>
                          <p className="text-sm font-medium text-ink-950">
                            Inspection record
                          </p>
                          <p className="text-xs text-ink-400">Status updated</p>
                        </div>
                        <Check className="h-4 w-4 text-green-600" />
                      </motion.div>

                      <Button variant="outline" onClick={reset} className="mt-8">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Try again
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DecisionView({
  selectedOfficer,
  onSelect,
}: {
  selectedOfficer: number | null;
  onSelect: (id: number) => void;
}) {
  return (
    <>
      <div>
        <p className="text-lg font-semibold text-ink-950">
          Available officers
        </p>
        <p className="mt-1 text-sm text-ink-600">
          Review the current field situation.
        </p>
      </div>

      <div className="mt-7">
        <OfficerList selectedOfficer={selectedOfficer} onSelect={onSelect} />
      </div>
    </>
  );
}

function OfficerList({
  selectedOfficer,
  onSelect,
  recommended = false,
}: {
  selectedOfficer: number | null;
  onSelect: (id: number) => void;
  recommended?: boolean;
}) {
  return (
    <div className="space-y-3">
      {officers.map((officer) => {
        const selected = selectedOfficer === officer.id;
        const isRecommended = recommended && officer.id === 1;

        return (
          <button
            key={officer.id}
            disabled={officer.status === "Busy" || recommended}
            onClick={() => onSelect(officer.id)}
            className={`w-full rounded-2xl border p-4 text-left transition ${
              selected
                ? "border-blue-600 bg-blue-600/5"
                : "border-ink-950/10 bg-white hover:bg-surface-panel"
            } ${officer.status === "Busy" ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  selected ? "bg-blue-600 text-white" : "bg-surface-panel text-ink-600"
                }`}
              >
                <UserRound className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-ink-950">
                    {officer.name}
                  </p>
                  {isRecommended && (
                    <Badge className="rounded-full bg-blue-600 text-white">
                      Recommended
                    </Badge>
                  )}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {officer.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock3 className="h-3 w-3" />
                    {officer.eta}
                  </span>
                </div>

                {officer.note && (
                  <p className="mt-1.5 text-xs text-ink-400">{officer.note}</p>
                )}
              </div>

              {selected && <CheckCircle2 className="h-5 w-5 text-blue-600" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
