"use client";

import { useMemo, useState } from "react";
import { Lock } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { Slider } from "@/components/ui/slider";

type Detection = {
  id: string;
  label: string;
  confidence: number;
  x: number;
  y: number;
};

type Officer = {
  id: string;
  name: string;
  x: number;
  y: number;
};

const DETECTIONS: Detection[] = [
  { id: "D1", label: "Elm Ave", confidence: 91, x: 90, y: 45 },
  { id: "D2", label: "River Rd", confidence: 83, x: 420, y: 30 },
  { id: "D3", label: "Main St", confidence: 79, x: 260, y: 95 },
  { id: "D4", label: "Oak Blvd", confidence: 68, x: 540, y: 130 },
  { id: "D5", label: "5th St", confidence: 58, x: 150, y: 155 },
];

const OFFICERS: Officer[] = [
  { id: "FD", name: "Officer Freddy", x: 60, y: 165 },
  { id: "MR", name: "Officer Rivera", x: 220, y: 165 },
  { id: "TS", name: "Officer Tran", x: 400, y: 165 },
  { id: "KP", name: "Officer Kapoor", x: 580, y: 165 },
];

// Two short routes already solved this morning — fixed, not affected by the sliders.
const MANDATORY_ROUTES = [
  "M 30 178 C 130 178 170 152 250 150",
  "M 470 22 C 520 55 555 88 600 128",
];
const MANDATORY_SITES = [
  { x: 250, y: 150 },
  { x: 600, y: 128 },
];

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function etaMinutes(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.max(2, Math.round(distance(a, b) / 40));
}

export function TryIt() {
  const [threshold, setThreshold] = useState(75);
  const [officerCount, setOfficerCount] = useState(2);
  const [dispatchMode, setDispatchMode] = useState<Record<string, "ai" | "manual">>({});
  const [manualOfficer, setManualOfficer] = useState<Record<string, string>>({});

  const activeOfficers = useMemo(() => OFFICERS.slice(0, officerCount), [officerCount]);

  const sortedDetections = useMemo(
    () => [...DETECTIONS].sort((a, b) => b.confidence - a.confidence),
    []
  );

  const inQueue = DETECTIONS.filter((d) => d.confidence >= threshold);

  function nearestOfficer(d: Detection): Officer {
    return activeOfficers.reduce((closest, o) =>
      distance(d, o) < distance(d, closest) ? o : closest
    , activeOfficers[0]);
  }

  function assignedOfficer(d: Detection): Officer {
    const mode = dispatchMode[d.id] ?? "ai";
    if (mode === "manual") {
      const chosen = activeOfficers.find((o) => o.id === manualOfficer[d.id]);
      if (chosen) return chosen;
    }
    return nearestOfficer(d);
  }

  const avgResponse = inQueue.length
    ? Math.round(
        inQueue.reduce((sum, d) => sum + etaMinutes(d, assignedOfficer(d)), 0) / inQueue.length
      )
    : null;

  return (
    <section id="try-it" className="bg-surface-dim py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="font-mono-label text-xs uppercase text-blue-600">
            Try it yourself
          </p>
          <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl">
            Tune the inputs. Watch SENTRY respond.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600">
            Mandatory routes are already optimized and scheduled for the day.
            Move the sliders to see which new closures make the cut — then
            choose whether SENTRY dispatches the best officer automatically,
            or you pick one yourself.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-8">
          {/* Controls */}
          <div className="h-fit rounded-2xl border border-line bg-white p-6">
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-sm font-semibold text-ink-950">
                  Confidence threshold
                </label>
                <span className="font-mono text-sm font-medium text-blue-600">
                  {threshold}%
                </span>
              </div>
              <Slider
                value={[threshold]}
                onValueChange={([v]) => setThreshold(v)}
                min={50}
                max={95}
                step={1}
                className="mt-4 [&_[data-slot=slider-range]]:bg-blue-600 [&_[data-slot=slider-thumb]]:border-blue-600"
              />
              <p className="mt-2 text-xs leading-relaxed text-ink-400">
                Only closures at or above this confidence enter the pending
                queue. Lower it to catch more, at the cost of noise.
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <label className="text-sm font-semibold text-ink-950">
                  Officers on shift
                </label>
                <span className="font-mono text-sm font-medium text-blue-600">
                  {officerCount}
                </span>
              </div>
              <Slider
                value={[officerCount]}
                onValueChange={([v]) => setOfficerCount(v)}
                min={1}
                max={4}
                step={1}
                className="mt-4 [&_[data-slot=slider-range]]:bg-blue-600 [&_[data-slot=slider-thumb]]:border-blue-600"
              />
              <p className="mt-2 text-xs leading-relaxed text-ink-400">
                More officers on shift means closer coverage and faster
                average response.
              </p>
            </div>
          </div>

          {/* Live panel */}
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-xl">
            <div className="grid grid-cols-2 divide-x divide-line border-b border-line">
              <StatTile
                label="Meets threshold"
                value={
                  <>
                    {inQueue.length}
                    <span className="text-ink-400">/{DETECTIONS.length}</span>
                  </>
                }
              />
              <StatTile
                label="Avg. response time"
                value={
                  avgResponse === null ? (
                    <span className="text-ink-400">—</span>
                  ) : (
                    <>
                      {avgResponse}
                      <span className="text-ink-400"> min</span>
                    </>
                  )
                }
              />
            </div>

            <div className="relative h-[220px] overflow-hidden bg-surface-dim">
              <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-line bg-white/90 px-2.5 py-1 text-[10px] font-medium text-ink-600 shadow-sm backdrop-blur">
                <Lock size={10} strokeWidth={2} />
                Mandatory routes scheduled at 8:00 AM
              </div>
              <MiniMap
                detections={DETECTIONS}
                officers={OFFICERS}
                threshold={threshold}
                officerCount={officerCount}
                assignedOfficer={assignedOfficer}
                dispatchMode={dispatchMode}
              />
            </div>

            <div className="divide-y divide-line">
              {sortedDetections.map((d) => {
                const meets = d.confidence >= threshold;
                const mode = dispatchMode[d.id] ?? "ai";
                const officer = meets ? assignedOfficer(d) : null;

                return (
                  <motion.div key={d.id} layout className="px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <motion.span
                          animate={{ backgroundColor: meets ? "#EF4444" : "#CBD5E1" }}
                          className="h-2 w-2 shrink-0 rounded-full"
                        />
                        <span className="truncate text-sm font-medium text-ink-800">
                          {d.label}
                        </span>
                        <span className="font-mono text-xs text-ink-400">
                          {d.confidence}%
                        </span>
                      </div>
                      <motion.span
                        animate={{ color: meets ? "#1D4ED8" : "#94A3B8" }}
                        className="font-mono-label shrink-0 text-[10px] uppercase"
                      >
                        {meets ? "In queue" : "Below threshold"}
                      </motion.span>
                    </div>

                    {meets && officer && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.2 }}
                        className="mt-2.5 flex flex-wrap items-center gap-2.5 pl-4"
                      >
                        <div className="inline-flex rounded-full bg-surface-panel p-0.5 text-[11px] font-medium">
                          <button
                            onClick={() =>
                              setDispatchMode((m) => ({ ...m, [d.id]: "ai" }))
                            }
                            className={`rounded-full px-2.5 py-1 transition-colors ${
                              mode === "ai" ? "bg-white text-ink-950 shadow-sm" : "text-ink-400"
                            }`}
                          >
                            AI dispatch
                          </button>
                          <button
                            onClick={() =>
                              setDispatchMode((m) => ({ ...m, [d.id]: "manual" }))
                            }
                            className={`rounded-full px-2.5 py-1 transition-colors ${
                              mode === "manual" ? "bg-white text-ink-950 shadow-sm" : "text-ink-400"
                            }`}
                          >
                            Manual
                          </button>
                        </div>

                        {mode === "ai" ? (
                          <span className="text-xs text-ink-600">
                            → {officer.name} · {etaMinutes(d, officer)} min ETA
                            <span className="text-ink-400"> (nearest available)</span>
                          </span>
                        ) : (
                          <select
                            value={officer.id}
                            onChange={(e) =>
                              setManualOfficer((m) => ({ ...m, [d.id]: e.target.value }))
                            }
                            className="rounded-md border border-line bg-white px-2 py-1 text-xs text-ink-800"
                          >
                            {activeOfficers.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.name} · {etaMinutes(d, o)} min ETA
                              </option>
                            ))}
                          </select>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatTile({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="px-5 py-4">
      <div className="font-mono-label text-[10px] uppercase text-ink-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-ink-950">{value}</div>
    </div>
  );
}

function MiniMap({
  detections,
  officers,
  threshold,
  officerCount,
  assignedOfficer,
  dispatchMode,
}: {
  detections: Detection[];
  officers: Officer[];
  threshold: number;
  officerCount: number;
  assignedOfficer: (d: Detection) => Officer;
  dispatchMode: Record<string, "ai" | "manual">;
}) {
  return (
    <svg viewBox="0 0 640 191" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <rect width="640" height="191" fill="#EFE8DB" />
      <g fill="#D3E2C4">
        <ellipse cx="540" cy="35" rx="70" ry="25" />
        <ellipse cx="90" cy="165" rx="55" ry="18" />
      </g>
      <path
        d="M0 10 C 90 25 60 70 160 90 C 260 110 240 150 300 185"
        fill="none"
        stroke="#BFD7E3"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <g fill="none" stroke="#FBF8F1" strokeWidth="2.5" strokeLinecap="round" opacity={0.9}>
        <path d="M40 15 L 600 175" />
        <path d="M60 165 L 540 15" />
        <path d="M10 85 L 630 100" />
      </g>

      {/* Mandatory routes — fixed, scheduled this morning */}
      <g fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round">
        {MANDATORY_ROUTES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {MANDATORY_SITES.map((s) => (
        <rect
          key={`${s.x}-${s.y}`}
          x={s.x - 4}
          y={s.y - 4}
          width="8"
          height="8"
          fill="#64748B"
          stroke="white"
          strokeWidth="1"
        />
      ))}

      {/* Dispatch lines for closures that meet threshold */}
      {detections
        .filter((d) => d.confidence >= threshold)
        .map((d) => {
          const officer = assignedOfficer(d);
          const mode = dispatchMode[d.id] ?? "ai";
          return (
            <motion.line
              key={`${d.id}-${officer.id}-${mode}`}
              x1={officer.x}
              y1={officer.y}
              x2={d.x}
              y2={d.y}
              stroke="#2563EB"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          );
        })}

      {detections.map((d) => {
        const meets = d.confidence >= threshold;
        return (
          <g key={d.id} transform={`translate(${d.x} ${d.y})`}>
            {meets && (
              <motion.circle
                fill="#F97316"
                initial={{ r: 6, opacity: 0.4 }}
                animate={{ r: [6, 15, 6], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <motion.circle
              r="6"
              animate={{ fill: meets ? "#F97316" : "#CBD5E1", opacity: meets ? 1 : 0.6 }}
              stroke="white"
              strokeWidth="1.5"
            />
          </g>
        );
      })}

      {officers.map((o, i) => {
        const active = i < officerCount;
        return (
          <motion.g
            key={o.id}
            transform={`translate(${o.x} ${o.y})`}
            animate={{ opacity: active ? 1 : 0.25 }}
          >
            <circle r="9" fill={active ? "#2563EB" : "#94A3B8"} stroke="white" strokeWidth="2" />
            <text textAnchor="middle" dy="3" fontSize="7" fill="white" fontWeight="600">
              {o.id}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
