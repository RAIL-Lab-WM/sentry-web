"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";

const faqs = [
  {
    question: "How are potential closures identified?",
    answer:
    "SENTRY uses machine learning to identify locations where a road closure may be present. Each detection indicates how likely the closure is to be real, giving operators useful context when reviewing new alerts.",
  },
  {
    question: "How are officers assigned to inspections?",
    answer:
      "Operators can assign an officer manually or use SENTRY to recommend an assignment based on the current inspection plan and available field resources.",
  },
  {
    question: "Who makes the final decision?",
    answer:
      "Agency staff remain in control. SENTRY provides recommendations to support planning and dispatch, while operators decide how and when those recommendations are used.",
  },
  {
    question: "How does SENTRY handle data privacy?",
    answer:
      "SENTRY is designed with agency data and operational privacy in mind, with access and use of information governed by the agency's requirements.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface-dim py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="font-mono-label text-xs uppercase text-blue-600">
            Good to know
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl">
            Questions, answered.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 max-w-3xl border-y border-line divide-y divide-line">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-lg font-semibold tracking-tight text-ink-950">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-950/15 text-ink-950"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 text-base leading-relaxed text-ink-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
