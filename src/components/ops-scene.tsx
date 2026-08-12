"use client";

import { AnimatePresence, motion } from "motion/react";

/* ===============================================================
   COMMAND DASHBOARD — mirrors the real SENTRY Command view:
   shift sidebar, live map with officer routes, pending-detections
   queue, and a shift timeline scrubber. Driven purely by `step`
   (0 detect, 1 plan, 2 dispatch, 3 inspect, 4 adapt) so it can be
   reused both in the guided walkthrough modal and as an ambient,
   auto-playing demo elsewhere on the page.
   =============================================================== */

const NAV_ITEMS = ["Command", "Officer", "Sites", "Report"];

export function CommandScene({ step }: { step: number }) {
  const freddyEnRoute = step === 2;
  const freddyArrived = step >= 3;
  const knownCovered = step >= 3 ? 3 : 2;
  const optionalDetected = step === 4 ? 3 : 2;

  return (
    <div className="flex h-full min-h-[370px] flex-col overflow-hidden rounded-2xl border border-ink-950/10 bg-white shadow-xl">
      {/* Top bar */}
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-ink-950/8 px-3">
        <div className="flex items-center gap-1 rounded-full bg-surface-panel p-0.5">
          {NAV_ITEMS.map((item) => (
            <span
              key={item}
              className={`rounded-full px-2 py-0.5 text-[8px] font-medium ${
                item === "Command"
                  ? "bg-white text-ink-950 shadow-sm"
                  : "text-ink-400"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-[8px] font-medium text-ink-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
          LIVE
          <span className="text-ink-400">12:35 PM</span>
        </div>
      </div>

      {/* Main row */}
      <div className="flex min-h-0 flex-1">
        {/* Left: shift overview */}
        <div className="hidden w-[104px] shrink-0 flex-col border-r border-ink-950/8 p-2 sm:flex">
          <div className="flex items-center justify-between">
            <span className="text-[7px] font-semibold uppercase tracking-wide text-ink-400">
              Shift
            </span>
            <span className="rounded-full bg-green-600/10 px-1.5 py-0.5 text-[6.5px] font-semibold text-green-600">
              On shift
            </span>
          </div>

          <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-panel">
            <div className="h-full w-[8%] rounded-full bg-blue-600" />
          </div>

          <div className="mt-3 space-y-2.5">
            <OfficerRow
              initials="FD"
              color="blue"
              status={freddyArrived ? "On site · M3" : freddyEnRoute ? "En route → M3" : "Standing by"}
              progress={freddyArrived ? 100 : freddyEnRoute ? 65 : 6}
            />
            <OfficerRow initials="MR" color="green" status="En route → M5" progress={30} />
          </div>

          <div className="mt-auto space-y-1.5 border-t border-ink-950/8 pt-2">
            <div>
              <div className="text-[7px] uppercase text-ink-400">Known sites</div>
              <div className="text-[11px] font-semibold text-ink-950">
                {knownCovered}
                <span className="text-ink-400">/14</span>
              </div>
            </div>
            <div>
              <div className="text-[7px] uppercase text-ink-400">Optional</div>
              <div className="text-[11px] font-semibold text-blue-600">
                {optionalDetected} detected
              </div>
            </div>
          </div>
        </div>

        {/* Center: map */}
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <CityMap step={step} />
        </div>

        {/* Right: pending queue */}
        <div className="hidden w-[168px] shrink-0 flex-col gap-2 overflow-hidden border-l border-ink-950/8 bg-white p-2 md:flex">
          <div className="flex items-center gap-1.5 text-[8px] font-semibold text-ink-950">
            Pending
            <span className="rounded-full bg-ink-950/8 px-1.5 py-0.5 text-[7px]">
              {step >= 3 ? (step === 4 ? 2 : 1) : 2}
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {step === 4 && (
              <motion.div
                key="a15"
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                <PendingCard id="A15" confidence={83} segment="13512" traffic="21 mph slow" nearest="2 min · Rivera" isNew />
              </motion.div>
            )}

            <motion.div key="a13" layout>
              <PendingCard
                id="A13"
                confidence={79}
                segment="13376"
                traffic="18 mph slow"
                nearest="3 min · Freddy"
                assigned={step >= 2 && step < 3}
                resolved={step >= 3}
                animateConfidence={step === 0}
              />
            </motion.div>

            <motion.div key="a10" layout>
              <PendingCard id="A10" confidence={75} segment="13407" traffic="14 mph slow" nearest="6 min · Freddy" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom: shift timeline */}
      {/* <div className="flex h-7 shrink-0 items-center gap-2 border-t border-ink-950/8 px-3 text-[7px] text-ink-400">
        <span className="hidden shrink-0 sm:inline">08:00 – 17:00</span>
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-surface-panel">
          <div className="h-full w-[8%] rounded-full bg-blue-600" />
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-blue-600 px-2 py-0.5 font-semibold text-white">
          <svg width="6" height="6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Play
        </span>
      </div> */}
    </div>
  );
}

function OfficerRow({
  initials,
  color,
  status,
  progress,
}: {
  initials: string;
  color: "blue" | "green";
  status: string;
  progress: number;
}) {
  const ring = color === "blue" ? "bg-blue-100 text-blue-700" : "bg-green-600/10 text-green-700";
  const bar = color === "blue" ? "bg-blue-600" : "bg-green-600";

  return (
    <div>
      <div className="flex items-center gap-1.5">
        <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[6px] font-semibold ${ring}`}>
          {initials}
        </span>
        <span className="truncate text-[7.5px] font-medium text-ink-800">{status}</span>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-surface-panel">
        <motion.div
          className={`h-full rounded-full ${bar}`}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function PendingCard({
  id,
  confidence,
  segment,
  traffic,
  nearest,
  assigned = false,
  resolved = false,
  isNew = false,
  animateConfidence = false,
}: {
  id: string;
  confidence: number;
  segment: string;
  traffic: string;
  nearest: string;
  assigned?: boolean;
  resolved?: boolean;
  isNew?: boolean;
  animateConfidence?: boolean;
}) {
  if (resolved) {
    return (
      <div className="flex items-center gap-1.5 rounded-lg border border-line bg-surface-dim px-2 py-1.5 opacity-60">
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-600 text-[6px] text-white">
          ✓
        </span>
        <span className="text-[7.5px] font-medium text-ink-600">{id} · resolved</span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border p-2 ${
        isNew ? "border-red-500/40 bg-red-50/40" : "border-line bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-ink-950">{id}</span>
        <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[6.5px] font-medium text-amber-700">
          Optional
        </span>
      </div>
      <div className="mt-1 text-[7px] font-medium text-amber-600">
        AI confidence{" "}
        <motion.span
          initial={animateConfidence ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {confidence}%
        </motion.span>
      </div>
      <div className="mt-1 text-[7.5px] font-semibold text-ink-800">Unpermitted closure</div>
      <div className="text-[6.5px] text-ink-400">Road segment {segment}</div>

      <div className="mt-1.5 flex gap-1">
        <div className="flex-1 rounded-md bg-surface-panel px-1.5 py-1">
          <div className="text-[6px] uppercase text-ink-400">Traffic</div>
          <div className="text-[6.5px] font-medium text-ink-800">{traffic}</div>
        </div>
        <div className="flex-1 rounded-md bg-surface-panel px-1.5 py-1">
          <div className="text-[6px] uppercase text-ink-400">Nearest</div>
          <div className="text-[6.5px] font-medium text-ink-800">{nearest}</div>
        </div>
      </div>

      <div
        className={`mt-1.5 flex items-center justify-between rounded-md px-1.5 py-1 text-[6.5px] font-medium ${
          assigned ? "bg-blue-600 text-white" : "border border-line text-ink-400"
        }`}
      >
        {assigned ? "Assigned · Freddy" : "Assign officer…"}
        {!assigned && <span>▾</span>}
      </div>
    </div>
  );
}

/* ===============================================================
   CITY MAP
   =============================================================== */

function CityMap({ step }: { step: number }) {
  return (
    <svg
      viewBox="0 0 640 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <rect width="640" height="500" fill="#EFE8DB" />

      {/* parks */}
      <g fill="#D3E2C4">
        <ellipse cx="520" cy="120" rx="80" ry="60" />
        <ellipse cx="120" cy="440" rx="60" ry="40" />
        <ellipse cx="270" cy="440" rx="40" ry="30" />
      </g>

      {/* river */}
      <path
        d="M0 40 C 90 70 60 160 140 220 C 220 280 200 380 260 460"
        fill="none"
        stroke="#BFD7E3"
        strokeWidth="26"
        strokeLinecap="round"
      />

      {/* highways */}
      <g fill="none" stroke="#E4A94B" strokeWidth="3" strokeLinecap="round">
        <path d="M20 460 C 160 400 260 420 340 340 S 520 160 620 90" />
        <path d="M40 60 C 140 140 180 220 260 260 S 420 300 600 380" />
      </g>

      {/* streets */}
      <g fill="none" stroke="#FBF8F1" strokeWidth="3" strokeLinecap="round" opacity={0.9}>
        <path d="M60 60 L 580 440" />
        <path d="M80 420 L 520 60" />
        <path d="M20 220 L 620 260" />
        <path d="M260 20 L 300 480" />
      </g>

      {/* Freddy's known-site loop */}
      <motion.path
        d="M150 300 C 110 260 130 190 190 150 C 230 120 280 130 300 170 C 320 210 290 240 330 260"
        fill="none"
        stroke="#2563EB"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {/* Rivera's known-site loop */}
      <path
        d="M330 260 C 380 230 420 260 440 220 C 460 180 430 140 460 100"
        fill="none"
        stroke="#16A34A"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* numbered known-site pins */}
      <Pin x={190} y={150} n={11} color="blue" />
      <Pin x={300} y={170} n={13} color="blue" />
      <Pin x={330} y={260} n={8} color="blue" />
      <Pin x={150} y={300} n={9} color="blue" />
      <Pin x={460} y={100} n={7} color="green" />
      <Pin x={440} y={220} n={12} color="green" />

      {/* pending detections */}
      <AlertDot x={410} y={195} pulse={step === 0 || step === 1} />
      <AlertDot x={470} y={250} pulse={step === 4} dim={step < 4} />

      {/* Freddy officer marker */}
      <motion.g
        animate={
          step === 2
            ? { x: [150, 220, 300], y: [300, 230, 175] }
            : step >= 3
              ? { x: 300, y: 175 }
              : { x: 150, y: 300 }
        }
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <circle r="9" fill="#2563EB" stroke="white" strokeWidth="2" />
        {step >= 3 ? (
          <text textAnchor="middle" dy="3" fontSize="9" fill="white">
            ✓
          </text>
        ) : (
          <text textAnchor="middle" dy="3" fontSize="7" fill="white">
            FD
          </text>
        )}
      </motion.g>

      {/* Rivera officer marker */}
      <g transform="translate(460 100)">
        <circle r="9" fill="#16A34A" stroke="white" strokeWidth="2" />
        <text textAnchor="middle" dy="3" fontSize="7" fill="white">
          MR
        </text>
      </g>
    </svg>
  );
}

function Pin({ x, y, n, color }: { x: number; y: number; n: number; color: "blue" | "green" }) {
  const fill = color === "blue" ? "#2563EB" : "#16A34A";
  return (
    <g transform={`translate(${x} ${y - 14})`}>
      <circle r="8" fill={fill} stroke="white" strokeWidth="1.5" />
      <text textAnchor="middle" dy="3" fontSize="7.5" fill="white" fontWeight="600">
        {n}
      </text>
    </g>
  );
}

function AlertDot({ x, y, pulse, dim }: { x: number; y: number; pulse: boolean; dim?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={dim ? 0.35 : 1}>
      {pulse && (
        <motion.circle
          fill="#F97316"
          initial={{ r: 6, opacity: 0.4 }}
          animate={{ r: [6, 16, 6], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <circle r="6" fill="#F97316" stroke="white" strokeWidth="1.5" />
      <text textAnchor="middle" dy="2.5" fontSize="7" fill="white" fontWeight="700">
        !
      </text>
    </g>
  );
}
