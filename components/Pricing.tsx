"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight, Check } from "lucide-react";
import NavLink from "./NavLink";
import Appear, { useSeen } from "./Appear";
import { hand } from "@/lib/fonts";
import { ANNUAL_SAVING_LABEL, plans, pricingNotes, type Billing, type Plan } from "@/lib/pricing";

const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";
const BLUE = "#1e5eeb";

// staircase offsets on desktop: Starter lowest, Pro highest
const STEP_OFFSET = ["lg:pt-[120px]", "lg:pt-[60px]", "lg:pt-0"];

const pick = (text: string) => {
  try {
    sessionStorage.setItem("skad-idea", text);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent("skad:idea", { detail: text }));
};

/* odometer: each digit rolls to its new value *//* odometer: each digit rolls to its new value (hidden from copy and screen readers) */
export function Rolling({ value }: { value: number }) {
  const digits = String(value).split("");
  return (
    <span className="inline-flex select-none" aria-hidden>
      {digits.map((d, i) => (
        <span
          key={`${digits.length}-${i}`}
          className="relative inline-block overflow-hidden"
          style={{ height: "1em", lineHeight: 1 }}
        >
          {/* invisible spacer keeps the width of the real digit */}
          <span className="invisible">{d}</span>
          <span
            className="absolute inset-x-0 top-0 flex flex-col"
            style={{
              transform: `translateY(-${Number(d) * 10}%)`,
              transition: `transform 0.9s cubic-bezier(0.34,1.4,0.64,1) ${i * 70}ms`,
            }}
          >
            {Array.from({ length: 10 }).map((_, n) => (
              <span key={n} className="block text-center" style={{ height: "1em", lineHeight: 1 }}>
                {n}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const dark = !!plan.popular;
  const price = billing === "annual" ? plan.annual : plan.monthly;
  const yearly = plan.annual * 12;
  const saved = plan.monthly * 12 - yearly;
  const sub = dark ? "text-white/60" : "text-slate-500";

  return (
    <div
      className={`group relative flex flex-col rounded-[28px] p-7 transition-[translate,box-shadow] duration-500 hover:-translate-y-1.5 ${
        dark
          ? "bg-[#0b1a3b] text-white shadow-[0_45px_80px_-40px_rgba(11,26,59,0.85)] lg:scale-[1.03]"
          : "bg-white text-[#0b1a3b] shadow-[0_24px_50px_-38px_rgba(11,26,59,0.55)] ring-1 ring-[#0b1a3b]/8 hover:shadow-[0_30px_60px_-36px_rgba(30,94,235,0.5)]"
      }`}
      style={{ transitionTimingFunction: SPRING }}
    >
      {/* glow on the popular plan */}
      {dark && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[28px]"
          style={{ background: "radial-gradient(120% 60% at 50% 0%, rgba(43,166,240,0.22), transparent 60%)" }}
        />
      )}

      <div className="relative flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.12em] ${
            dark ? "bg-white/10 text-[#7cc4f5]" : "bg-[#eef3fb] text-[#1e5eeb]"
          }`}
        >
          STEP {plan.step}
        </span>
        {plan.popular && (
          <span className="rounded-full bg-[#1e5eeb] px-3 py-1 text-[12px] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(30,94,235,0.9)]">
            Most popular
          </span>
        )}
      </div>

      <p className="relative mt-5 text-[22px] font-bold tracking-[-0.02em]">{plan.name}</p>
      <p className={`relative mt-1.5 min-h-[42px] text-[14px] leading-snug ${sub}`}>{plan.description}</p>

      {/* price */}
      <div className="relative mt-6 flex items-end gap-1.5">
        <span className="flex items-start text-[3.1rem] font-bold leading-none tracking-[-0.04em]">
          <span className="mr-0.5 mt-1.5 text-[1.5rem]">$</span>
          <Rolling value={price} />
          <span className="sr-only">{`$${price}`}</span>
        </span>
        <span className={`pb-1.5 text-[14px] ${sub}`}>/month</span>
      </div>
      <p className={`relative mt-2 h-5 text-[13px] ${sub}`}>
        {billing === "annual" ? (
          <>
            {`Billed $${yearly} yearly · `}
            <span className={dark ? "text-[#7cc4f5]" : "text-[#1e5eeb]"}>{`you save $${saved}`}</span>
          </>
        ) : (
          "Billed monthly"
        )}
      </p>

      <NavLink
        href="/enquire"
        onClick={() =>
          pick(
            `I’m interested in the Commerce OS ${plan.name} plan (${
              billing === "annual" ? `$${plan.annual}/mo billed yearly` : `$${plan.monthly}/mo`
            }).`
          )
        }
        className={`group/cta relative mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[15px] font-semibold transition-[background-color,translate,scale] duration-500 ease-spring hover:-translate-y-0.5 active:scale-[0.97] ${
          dark ? "bg-[#1e5eeb] text-white hover:bg-[#3b74f0]" : "bg-[#0b1a3b] text-white hover:bg-[#1e5eeb]"
        }`}
      >
        {plan.cta}
        <ArrowRight size={15} className="transition-[translate] duration-500 ease-spring group-hover/cta:translate-x-1" />
      </NavLink>

      <div className={`relative mt-7 border-t border-dashed pt-6 ${dark ? "border-white/15" : "border-[#1e5eeb]/20"}`}>
        {plan.lead && <p className={`mb-3.5 text-[13px] font-semibold ${dark ? "text-white/80" : "text-[#0b1a3b]"}`}>{plan.lead}</p>}
        <ul className="space-y-3">
          {plan.features.map((f) => (
            <li key={f} className={`flex items-start gap-2.5 text-[14px] leading-snug ${dark ? "text-white/85" : "text-slate-700"}`}>
              <Check size={16} strokeWidth={2.75} className={`mt-[1px] shrink-0 ${dark ? "text-[#7cc4f5]" : "text-[#1e5eeb]"}`} />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("annual");
  const { ref: stairsRef, seen } = useSeen<HTMLDivElement>(0.2);
  const annual = billing === "annual";

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#e3eaf6] py-20 lg:py-32">
      {/* blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,94,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 55%, #000 35%, transparent 85%)",
        }}
      />

      <div className="wrap relative">
        {/* heading + switch */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Appear className="lg:col-span-7">
            <h2 className="text-balance text-[2.3rem] font-bold leading-[1.04] tracking-[-0.035em] text-[#0b1a3b] sm:text-[3.1rem]">
              Pricing that grows with you.
            </h2>
            <p className="mt-4 max-w-lg text-[16.5px] leading-relaxed text-slate-600">
              Three simple steps. Start where you are, and move up when your business does. No setup fees, no surprises.
            </p>
          </Appear>

          <Appear delay={100} className="lg:col-span-5 lg:flex lg:justify-end">
            <div className="relative inline-flex items-center gap-4">
              <span className={`text-[15px] font-semibold transition-colors ${annual ? "text-slate-400" : "text-[#0b1a3b]"}`}>
                Monthly
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={annual}
                aria-label="Bill annually"
                onClick={() => setBilling(annual ? "monthly" : "annual")}
                className={`relative h-9 w-16 rounded-full p-1 transition-colors duration-300 ${annual ? "bg-[#1e5eeb]" : "bg-[#0b1a3b]/20"}`}
              >
                <span
                  className="block h-7 w-7 rounded-full bg-white shadow-[0_4px_10px_-3px_rgba(11,26,59,0.5)]"
                  style={{ transform: `translateX(${annual ? 28 : 0}px)`, transition: `transform 0.5s ${SPRING}` }}
                />
              </button>
              <span className={`text-[15px] font-semibold transition-colors ${annual ? "text-[#0b1a3b]" : "text-slate-400"}`}>
                Annual
              </span>

              {/* sticky-note saving */}
              <span
                className={`${hand.className} absolute -right-4 -top-12 whitespace-nowrap px-3 py-1.5 text-[17px] text-[#0b1a3b] sm:-right-10`}
                style={{
                  background: "#fff3b0",
                  boxShadow: "0 10px 18px -10px rgba(11,26,59,0.35)",
                  rotate: "4deg",
                  scale: annual ? "1" : "0.6",
                  opacity: annual ? 1 : 0,
                  transition: `scale 0.55s ${SPRING}, opacity 0.3s ease`,
                }}
              >
                {ANNUAL_SAVING_LABEL}!
              </span>
            </div>
          </Appear>
        </div>

        {/* staircase */}
        <div ref={stairsRef} className="relative mt-16 lg:mt-20">
          {/* rising route (desktop) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M 2 96 C 25 92, 30 70, 50 62 S 78 30, 98 6" fill="none" stroke={BLUE} strokeOpacity="0.25" strokeWidth="2" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
            <path
              d="M 2 96 C 25 92, 30 70, 50 62 S 78 30, 98 6"
              fill="none"
              stroke={BLUE}
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: seen ? 0 : 1, transition: "stroke-dashoffset 2.2s cubic-bezier(0.6,0,0.2,1) 0.3s" } as CSSProperties}
            />
          </svg>

          <div className="relative grid gap-10 lg:grid-cols-3 lg:items-start lg:gap-6">
            {plans.map((p, i) => (
              <div key={p.id} className={`relative pl-9 lg:pl-0 ${STEP_OFFSET[i]}`}>
                {/* mobile timeline */}
                <span aria-hidden className="absolute bottom-[-40px] left-[11px] top-3 border-l-2 border-dashed border-[#1e5eeb]/30 lg:hidden" style={{ display: i === plans.length - 1 ? "none" : undefined }} />
                <span aria-hidden className="absolute left-[4px] top-2 grid h-4 w-4 place-items-center rounded-full bg-[#1e5eeb] ring-4 ring-[#e3eaf6] lg:hidden" />

                <p
                  className={`${hand.className} mb-3 text-[22px] leading-none text-[#1e5eeb] lg:mb-4 lg:pl-3`}
                  style={{
                    rotate: "-3deg",
                    opacity: seen ? 1 : 0,
                    translate: seen ? "0 0" : "0 8px",
                    transition: `opacity 0.5s ease ${0.6 + i * 0.35}s, translate 0.6s ${SPRING} ${0.6 + i * 0.35}s`,
                  }}
                >
                  {p.note}
                </p>

                <div
                  style={{
                    opacity: seen ? 1 : 0,
                    translate: seen ? "0 0" : "0 28px",
                    transition: `opacity 0.6s ease ${0.15 + i * 0.18}s, translate 0.8s ${SPRING} ${0.15 + i * 0.18}s`,
                  }}
                >
                  <PlanCard plan={p} billing={billing} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* notes */}
        <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px] text-slate-500">
          {pricingNotes.map((n) => (
            <li key={n} className="flex items-center gap-1.5">
              <Check size={14} strokeWidth={3} className="text-[#1e5eeb]" />
              {n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}