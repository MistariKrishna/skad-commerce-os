"use client";

import { useState } from "react";
import { capabilities, type Capability } from "@/lib/data";
import NavLink from "../NavLink";
import Appear, { MobileHead } from "../Appear";

const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";

const presets = [
  { label: "I have an idea", picks: ["Market Intelligence", "Brand Infrastructure", "Product", "E-commerce", "Content"] },
  { label: "I’m ready to launch", picks: ["E-commerce", "Content", "SEO/GEO", "Marketing"] },
  { label: "I’m already selling", picks: ["SEO/GEO", "Marketing", "CRM", "Automation", "Analytics", "Operations"] },
];

const groups: { key: Capability["stage"]; label: string; note: string }[] = [
  { key: "build", label: "Build", note: "Research, brand and product" },
  { key: "launch", label: "Launch", note: "Store and content" },
  { key: "grow", label: "Grow", note: "Demand, customers and operations" },
  { key: "every", label: "Across every stage", note: "Working behind everything" },
];

export default function PlatformMobile() {
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const order = capabilities.map((c) => c.title);
  const applyPreset = (picks: string[]) => setPicked(order.filter((t) => picks.includes(t)));
  const activePreset = presets.findIndex(
    (p) => p.picks.length === picked.length && p.picks.every((t) => picked.includes(t))
  );

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
    <section id="platform-m" className="bg-[#e3eaf6] py-20">
      <div className="wrap max-w-2xl">
        <MobileHead
          title="Pick what you need. We’ll bring the team."
          text="Twelve services across Build, Launch and Grow. Tick what you need, or start from where you are today."
        />

        {/* quick start */}
        <Appear className="mt-8">
          <p className="text-sm font-semibold text-[#0b1a3b]">Start from where you are</p>
          <div className="mt-3 grid gap-2">
            {presets.map((p, i) => {
              const on = activePreset === i;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPreset(p.picks)}
                  aria-pressed={on}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-left ring-1 transition-[background-color,color,scale] duration-300 active:scale-[0.98] ${
                    on ? "bg-[#0b1a3b] text-white ring-[#0b1a3b]" : "bg-white text-[#0b1a3b] ring-[#0b1a3b]/8"
                  }`}
                >
                  <span className="text-[15.5px] font-semibold">{p.label}</span>
                  <span className={`text-[13px] ${on ? "text-white/70" : "text-slate-500"}`}>{p.picks.length} services</span>
                </button>
              );
            })}
          </div>
          {count > 0 && (
            <button type="button" onClick={() => setPicked([])} className="mt-3 text-sm font-medium text-slate-500 underline underline-offset-4">
              Clear all
            </button>
          )}
        </Appear>

        {/* grouped list */}
        <div className="mt-8 space-y-8">
          {groups.map((g) => (
            <Appear key={g.key}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[18px] font-bold text-[#0b1a3b]">{g.label}</p>
                <p className="text-[13px] text-slate-500">{g.note}</p>
              </div>
              <div className="mt-3 space-y-2">
                {capabilities
                  .filter((c) => c.stage === g.key)
                  .map((c) => {
                    const on = picked.includes(c.title);
                    return (
                      <button
                        key={c.n}
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        onClick={() => toggle(c.title)}
                        className={`flex w-full items-start gap-3.5 rounded-xl p-4 text-left transition-[background-color,box-shadow] duration-300 ${
                          on ? "bg-[#eef4ff] ring-2 ring-[#1e5eeb]" : "bg-white ring-1 ring-[#0b1a3b]/8"
                        }`}
                      >
                        <span
                          className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${
                            on ? "border-[#1e5eeb] bg-[#1e5eeb]" : "border-slate-300 bg-white"
                          }`}
                          style={{ scale: on ? "1" : "0.92", transition: `scale 0.4s ${SPRING}, background-color 0.3s, border-color 0.3s` }}
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
                              style={{ strokeDasharray: 1, strokeDashoffset: on ? 0 : 1, transition: "stroke-dashoffset 0.35s ease-out 0.1s" }}
                            />
                          </svg>
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[16px] font-semibold text-[#0b1a3b]">{c.title}</span>
                          <span className="mt-0.5 block text-[13.5px] leading-snug text-slate-600">{c.description}</span>
                        </span>
                      </button>
                    );
                  })}
              </div>
            </Appear>
          ))}
        </div>

        {/* brief bar, pinned to the bottom of the screen while scrolling the list */}
        <div className="sticky bottom-4 z-20 mt-8">
          <div className="flex items-center gap-3 rounded-2xl bg-[#0b1a3b] p-3 pl-3.5 text-white shadow-[0_20px_40px_-16px_rgba(11,26,59,0.75)]">
            <span key={count} className="grid h-11 w-11 shrink-0 animate-pill-pop place-items-center rounded-full bg-white/10 text-lg font-bold tabular-nums">
              {count}
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[14.5px] font-semibold">{count ? `${count} ${count === 1 ? "service" : "services"} picked` : "Nothing picked yet"}</span>
              <span className="block text-[12.5px] text-white/60">{count ? "Your brief is ready to send" : "Tick what you need above"}</span>
            </span>
            <NavLink
              href="/enquire"
              onClick={send}
              className="shrink-0 rounded-xl bg-white px-4 py-2.5 text-[14px] font-semibold text-[#0b1a3b] transition-[scale] duration-200 active:scale-95"
            >
              {count ? "Send brief" : "Talk to us"}
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}