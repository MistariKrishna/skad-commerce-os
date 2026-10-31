"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { capabilities, type Capability } from "@/lib/data";
import NavLink from "./NavLink";
import Reveal from "./Reveal";
import { hand } from "@/lib/fonts";

const SPRING = "cubic-bezier(0.34,1.56,0.64,1)";

const stageLabel: Record<Capability["stage"], string> = {
  build: "Build",
  launch: "Launch",
  grow: "Grow",
  every: "Every stage",
};

const presets = [
  { label: "I have an idea", picks: ["Market Intelligence", "Brand Infrastructure", "Product", "E-commerce", "Content"] },
  { label: "I’m ready to launch", picks: ["E-commerce", "Content", "SEO/GEO", "Marketing"] },
  { label: "I’m already selling", picks: ["SEO/GEO", "Marketing", "CRM", "Automation", "Analytics", "Operations"] },
];

const groups: { key: Capability["stage"]; label: string }[] = [
  { key: "build", label: "Build" },
  { key: "launch", label: "Launch" },
  { key: "grow", label: "Grow" },
];

const summaryFor = (n: number) => {
  if (n === 0) return "Nothing picked yet.";
  if (n <= 2) return "A focused start.";
  if (n <= 5) return "A solid launch team.";
  if (n <= 9) return "Most of the team.";
  return "The whole team.";
};

export default function Platform() {
  const [picked, setPicked] = useState<string[]>([]);
  const [delays, setDelays] = useState<Record<string, number>>({});

  const toggle = (title: string) => {
    setDelays({});
    setPicked((p) => (p.includes(title) ? p.filter((t) => t !== title) : [...p, title]));
  };

  const applyPreset = (picks: string[]) => {
    const order = capabilities.map((c) => c.title);
    const changed = order.filter((t) => picks.includes(t) !== picked.includes(t));
    const next: Record<string, number> = {};
    changed.forEach((t, k) => {
      next[t] = k * 70;
    });
    setDelays(next);
    setPicked(order.filter((t) => picks.includes(t)));
  };

  const clear = () => {
    const next: Record<string, number> = {};
    capabilities
      .filter((c) => picked.includes(c.title))
      .forEach((c, k) => {
        next[c.title] = k * 50;
      });
    setDelays(next);
    setPicked([]);
  };

  const send = () => {
    try {
      sessionStorage.setItem("skad-brief", JSON.stringify(picked));
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new CustomEvent("skad:brief", { detail: picked }));
  };

  const count = picked.length;

  return (
    <section id="platform" className="bg-[#e3eaf6] py-24 lg:py-32">
      <div className="wrap">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="text-balance text-[2.2rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#0b1a3b] sm:text-[2.75rem] lg:col-span-7">
              Pick what you need. We’ll bring the team.
            </h2>
            <p className="max-w-md text-[16px] leading-relaxed text-slate-600 lg:col-span-5">
              Twelve services across Build, Launch and Grow. Choose any mix, and we’ll shape a plan around it on the
              first call.
            </p>
          </div>
        </Reveal>

        {/* quick start */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-slate-600">Quick start:</span>
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(p.picks)}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0b1a3b] ring-1 ring-[#0b1a3b]/10 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-10px_rgba(11,26,59,0.45)] active:scale-95"
              style={{ transitionTimingFunction: SPRING }}
            >
              {p.label}
            </button>
          ))}
          {count > 0 && (
            <button
              type="button"
              onClick={clear}
              className="animate-step-in rounded-full px-3 py-2 text-sm font-medium text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-[#0b1a3b]"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* service list */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-35px_rgba(11,26,59,0.45)] ring-1 ring-[#0b1a3b]/6 lg:col-span-8">
            <div className="grid md:grid-cols-2">
              {capabilities.map((c, i) => {
                const on = picked.includes(c.title);
                const d = delays[c.title] ?? 0;
                return (
                  <button
                    key={c.n}
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => toggle(c.title)}
                    className={`group relative flex w-full items-start gap-4 overflow-hidden border-b border-dashed border-[#1e5eeb]/20 px-6 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1e5eeb] ${
                      i % 2 === 0 ? "md:border-r" : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-left bg-[#eef4ff]"
                      style={{ transform: `scaleX(${on ? 1 : 0})`, transition: `transform 0.55s ${SPRING} ${d}ms` }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-[3px] origin-top bg-[#1e5eeb]"
                      style={{ transform: `scaleY(${on ? 1 : 0})`, transition: `transform 0.45s ${SPRING} ${d + (on ? 120 : 0)}ms` }}
                    />

                    <span
                      className={`relative mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${
                        on ? "border-[#1e5eeb] bg-[#1e5eeb]" : "border-slate-300 bg-white group-hover:border-[#1e5eeb]/60"
                      }`}
                      style={{
                        transform: `scale(${on ? 1 : 0.9})`,
                        transition: `transform 0.4s ${SPRING} ${d}ms, background-color 0.3s ease ${d}ms, border-color 0.3s ease ${d}ms`,
                      }}
                    >
                      <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden>
                        <path
                          d="M3 8.5l3.2 3L13 4.5"
                          fill="none"
                          stroke="white"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          pathLength={1}
                          style={{
                            strokeDasharray: 1,
                            strokeDashoffset: on ? 0 : 1,
                            transition: `stroke-dashoffset 0.35s ease-out ${d + (on ? 140 : 0)}ms`,
                          }}
                        />
                      </svg>
                    </span>

                    <span
                      className="relative min-w-0 flex-1"
                      style={{ transform: `translateX(${on ? 4 : 0}px)`, transition: `transform 0.5s ${SPRING} ${d}ms` }}
                    >
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-[18px] font-semibold tracking-[-0.01em] text-[#0b1a3b]">{c.title}</span>
                        <span className="shrink-0 text-xs font-medium text-slate-500">{stageLabel[c.stage]}</span>
                      </span>
                      <span className="mt-1 block text-[14px] leading-relaxed text-slate-600">{c.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* your brief */}
          <div className="lg:col-span-4">
            <aside className="lg:sticky lg:top-28" aria-live="polite">
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-35px_rgba(11,26,59,0.45)] ring-1 ring-[#0b1a3b]/6">
                <div
                  className="border-b border-dashed border-[#1e5eeb]/25 px-6 py-5"
                  style={{
                    backgroundColor: "#f4f8ff",
                    backgroundImage:
                      "linear-gradient(rgba(30,94,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.06) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                >
                  <p className={`${hand.className} -rotate-1 text-[26px] leading-none text-[#1e5eeb]`}>your brief</p>
                  <p className="mt-3 flex items-baseline gap-2">
                    <span key={count} className="inline-block animate-pill-pop text-4xl font-bold tabular-nums text-[#0b1a3b]">
                      {count}
                    </span>
                    <span className="text-sm text-slate-600">{count === 1 ? "service" : "services"} of 12</span>
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{summaryFor(count)}</p>
                </div>

                <div className="px-6 py-5">
                  <div className="space-y-2.5">
                    {groups.map((g) => {
                      const total = capabilities.filter((c) => c.stage === g.key).length;
                      const have = capabilities.filter((c) => c.stage === g.key && picked.includes(c.title)).length;
                      return (
                        <div key={g.key} className="flex items-center gap-3">
                          <span className="w-14 text-xs font-medium text-slate-600">{g.label}</span>
                          <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[#1e5eeb]/10">
                            <span
                              className="absolute inset-y-0 left-0 rounded-full bg-[#1e5eeb]"
                              style={{ width: `${(have / total) * 100}%`, transition: `width 0.6s ${SPRING}` }}
                            />
                          </span>
                          <span className="w-8 text-right text-xs tabular-nums text-slate-500">
                            {have}/{total}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 flex min-h-[3rem] flex-wrap gap-2">
                    {count === 0 ? (
                      <p className={`${hand.className} text-xl text-slate-500`}>tick what you need</p>
                    ) : (
                      capabilities
                        .filter((c) => picked.includes(c.title))
                        .map((c) => {
                          const Icon = c.icon;
                          return (
                            <span
                              key={c.n}
                              className="inline-flex animate-step-in items-center gap-1.5 rounded-full bg-[#eef4ff] py-1 pl-2 pr-1 text-[13px] font-medium text-[#0b1a3b] ring-1 ring-[#1e5eeb]/20"
                            >
                              <Icon size={13} className="text-[#1e5eeb]" />
                              {c.title}
                              <button
                                type="button"
                                onClick={() => toggle(c.title)}
                                aria-label={`Remove ${c.title}`}
                                className="grid h-5 w-5 place-items-center rounded-full text-slate-500 transition-colors hover:bg-white hover:text-[#0b1a3b]"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          );
                        })
                    )}
                  </div>
                </div>

                <div className="border-t border-dashed border-[#1e5eeb]/25 px-6 py-5">
                  <NavLink
                    href="/enquire"
                    onClick={send}
                    className="flex w-full items-center justify-center rounded-lg bg-[#1e5eeb] px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(30,94,235,0.8)] transition-[background-color,transform] duration-200 hover:bg-[#164bc2] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e5eeb]"
                  >
                    {count ? "Send this brief" : "Talk to us first"}
                  </NavLink>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    We’ll use it to plan your first call. No obligation.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}