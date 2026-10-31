"use client";

import { useState } from "react";
import { capabilities, stageDot, type Filter } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const filters: { key: Filter; label: string; dot?: string }[] = [
  { key: "all", label: "All" },
  { key: "build", label: "Build", dot: "bg-build" },
  { key: "launch", label: "Launch", dot: "bg-launch" },
  { key: "grow", label: "Grow", dot: "bg-grow" },
];

export default function Platform() {
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <section id="platform" className="py-24 lg:py-32">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="03 — The platform"
              title={
                <>
                  Every capability a business needs,
                  <br className="hidden md:block" /> organised as one system.
                </>
              }
            />
            <p className="mt-4 text-[15px] text-slate-600">
              Twelve connected capabilities that support the full commerce journey.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div role="group" aria-label="Filter capabilities by stage" className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f.key)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      active
                        ? "border-ink bg-ink text-white shadow-lg shadow-ink/20"
                        : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300"
                    }`}
                  >
                    {f.dot && <span className={`h-1.5 w-1.5 rounded-full ${f.dot}`} />}
                    {f.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => {
            const match = filter === "all" || c.stage === filter || c.stage === "every";
            const dark = c.stage === "every";
            const Icon = c.icon;
            return (
              <Reveal key={c.n} delay={(i % 4) * 80} className="h-full">
                <article
                  aria-hidden={!match}
                  className={`group flex h-full flex-col rounded-2xl border p-5 transition-all duration-500 ${
                    dark ? "border-ink bg-ink text-white" : "border-slate-200/80 bg-white"
                  } ${
                    match
                      ? "opacity-100 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/[0.07]"
                      : "scale-[0.97] opacity-30 saturate-0"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`font-mono text-[11px] ${dark ? "text-slate-400" : "text-slate-500"}`}>{c.n}</span>
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 ${
                        dark ? "bg-accent/15 text-accent" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <Icon size={15} />
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{c.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>
                    {c.description}
                  </p>
                  <p className={`mt-auto flex items-center gap-2 pt-4 text-xs ${dark ? "text-slate-300" : "text-slate-500"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${stageDot[c.stage]}`} />
                    {c.label}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}