"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import NavLink from "../NavLink";
import { MobileHead } from "../Appear";
import { Rolling } from "../Pricing";
import { hand } from "@/lib/fonts";
import { ANNUAL_SAVING_LABEL, plans, pricingNotes, type Billing } from "@/lib/pricing";

const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";
const STEP_HEIGHTS = [68, 96, 124];
const START = Math.max(0, plans.findIndex((p) => p.popular));

const pick = (text: string) => {
  try {
    sessionStorage.setItem("skad-idea", text);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent("skad:idea", { detail: text }));
};

export default function PricingMobile() {
  const [billing, setBilling] = useState<Billing>("annual");
  const [active, setActive] = useState(START);
  const cardRef = useRef<HTMLDivElement>(null);
  const dirRef = useRef(1);
  const firstRef = useRef(true);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const annual = billing === "annual";
  const plan = plans[active];
  const dark = !!plan.popular;
  const price = annual ? plan.annual : plan.monthly;
  const yearly = plan.annual * 12;
  const saved = plan.monthly * 12 - yearly;
  const sub = dark ? "text-white/60" : "text-slate-500";

  const select = (i: number) => {
    if (i === active || i < 0 || i >= plans.length) return;
    dirRef.current = i > active ? 1 : -1;
    setActive(i);
  };

  // slide the card in from the direction of travel
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    const el = cardRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = el.animate(
      [
        { opacity: 0, transform: `translateX(${dirRef.current * 44}px)` },
        { opacity: 1, transform: "translateX(0)" },
      ],
      { duration: 420, easing: "cubic-bezier(0.2,0.7,0.2,1)" }
    );
    return () => a.cancel();
  }, [active]);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) select(active + (dx < 0 ? 1 : -1));
  };

  return (
    <section id="pricing-m" className="relative overflow-hidden bg-[#e3eaf6] py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,94,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.07) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, #000 30%, transparent 85%)",
        }}
      />

      <div className="wrap relative max-w-xl">
        <MobileHead
          title="Pricing that grows with you."
          text="Three simple steps. Start where you are, and move up when your business does."
        />

        {/* billing switch */}
        <div className="mt-8 flex justify-center">
          <div className="relative inline-flex items-center gap-3.5">
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
            <span
              className={`${hand.className} absolute -right-3 -top-11 whitespace-nowrap px-2.5 py-1 text-[16px] text-[#0b1a3b]`}
              style={{
                background: "#fff3b0",
                boxShadow: "0 10px 18px -10px rgba(11,26,59,0.35)",
                rotate: "5deg",
                scale: annual ? "1" : "0.6",
                opacity: annual ? 1 : 0,
                transition: `scale 0.55s ${SPRING}, opacity 0.3s ease`,
              }}
            >
              {ANNUAL_SAVING_LABEL}!
            </span>
          </div>
        </div>

        {/* staircase selector */}
        <div role="tablist" aria-label="Choose a plan" className="mt-10 flex items-end gap-2.5">
          {plans.map((p, i) => {
            const on = i === active;
            const v = annual ? p.annual : p.monthly;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => select(i)}
                className={`relative flex flex-1 flex-col justify-between rounded-2xl px-3 pb-3 pt-2.5 text-left transition-[background-color,box-shadow,translate] duration-500 ${
                  on
                    ? "-translate-y-1.5 bg-[#0b1a3b] text-white shadow-[0_18px_30px_-16px_rgba(11,26,59,0.8)]"
                    : "bg-white text-[#0b1a3b] ring-1 ring-[#0b1a3b]/8"
                }`}
                style={{ height: STEP_HEIGHTS[i], transitionTimingFunction: SPRING }}
              >
                {p.popular && (
                  <span className="absolute -top-2.5 right-2 rounded-full bg-[#1e5eeb] px-2 py-0.5 text-[10.5px] font-semibold text-white">
                    popular
                  </span>
                )}
                <span className={`font-mono text-[10px] font-semibold tracking-[0.14em] ${on ? "text-[#7cc4f5]" : "text-[#1e5eeb]"}`}>
                  {p.step}
                </span>
                <span>
                  <span className="block text-[14px] font-bold leading-tight">{p.name}</span>
                  <span className={`flex items-baseline text-[13px] font-semibold ${on ? "text-white/75" : "text-slate-500"}`}>
                    $<Rolling value={v} />
                    <span className="ml-0.5 text-[11px] font-normal">/mo</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* selected plan */}
        <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className="mt-5 touch-pan-y">
          <div
            ref={cardRef}
            className={`relative overflow-hidden rounded-[28px] p-6 ${
              dark
                ? "bg-[#0b1a3b] text-white shadow-[0_40px_70px_-40px_rgba(11,26,59,0.85)]"
                : "bg-white text-[#0b1a3b] shadow-[0_24px_50px_-38px_rgba(11,26,59,0.55)] ring-1 ring-[#0b1a3b]/8"
            }`}
          >
            {dark && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(120% 55% at 50% 0%, rgba(43,166,240,0.22), transparent 60%)" }}
              />
            )}

            <div className="relative">
              <p className={`${hand.className} text-[20px] leading-none ${dark ? "text-[#7cc4f5]" : "text-[#1e5eeb]"}`} style={{ rotate: "-2deg" }}>
                {plan.note}
              </p>
              <p className="mt-3 text-[24px] font-bold tracking-[-0.02em]">{plan.name}</p>
              <p className={`mt-1 text-[14.5px] leading-snug ${sub}`}>{plan.description}</p>

              <div className="mt-5 flex items-end gap-1.5">
                <span className="flex items-start text-[3rem] font-bold leading-none tracking-[-0.04em]">
                  <span className="mr-0.5 mt-1.5 text-[1.4rem]">$</span>
                  <Rolling value={price} />
                  <span className="sr-only">{`$${price}`}</span>
                </span>
                <span className={`pb-1.5 text-[14px] ${sub}`}>/month</span>
              </div>
              <p className={`mt-2 text-[13px] ${sub}`}>
                {annual ? (
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
                      annual ? `$${plan.annual}/mo billed yearly` : `$${plan.monthly}/mo`
                    }).`
                  )
                }
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-[15.5px] font-semibold transition-[background-color,scale] duration-300 active:scale-[0.97] ${
                  dark ? "bg-[#1e5eeb] text-white" : "bg-[#0b1a3b] text-white"
                }`}
              >
                {plan.cta}
                <ArrowRight size={16} />
              </NavLink>

              <div className={`mt-6 border-t border-dashed pt-5 ${dark ? "border-white/15" : "border-[#1e5eeb]/20"}`}>
                {plan.lead && <p className={`mb-3 text-[13px] font-semibold ${dark ? "text-white/80" : "text-[#0b1a3b]"}`}>{plan.lead}</p>}
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-[14.5px] leading-snug ${dark ? "text-white/85" : "text-slate-700"}`}>
                      <Check size={16} strokeWidth={2.75} className={`mt-[1px] shrink-0 ${dark ? "text-[#7cc4f5]" : "text-[#1e5eeb]"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* position dots + swipe hint */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            {plans.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Show ${p.name}`}
                onClick={() => select(i)}
                className={`h-2 rounded-full transition-[width,background-color] duration-500 ${i === active ? "w-6 bg-[#1e5eeb]" : "w-2 bg-[#0b1a3b]/20"}`}
                style={{ transitionTimingFunction: SPRING }}
              />
            ))}
          </div>
          <span className={`${hand.className} text-[17px] text-slate-500`}>swipe to compare</span>
        </div>

        {/* notes */}
        <ul className="mt-10 grid grid-cols-2 gap-2">
          {pricingNotes.map((n) => (
            <li
              key={n}
              className="flex items-center gap-1.5 rounded-xl bg-white/70 px-3 py-2.5 text-[13px] text-slate-600 ring-1 ring-[#0b1a3b]/6"
            >
              <Check size={14} strokeWidth={3} className="shrink-0 text-[#1e5eeb]" />
              {n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}