"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, Check, MessageCircle, Search, ShoppingBag } from "lucide-react";
import NavLink from "../NavLink";
import { hand } from "@/lib/fonts";

const NAVY = "#0b1a3b";
const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";
const STEP_MS = 1600;
const HOLD_MS = 3400;

const steps = [
  { name: "Brand", stage: 0, line: "We create your brand: name, logo, colours and packaging." },
  { name: "Products", stage: 0, line: "We shape your range and set up a catalogue that sells." },
  { name: "Content", stage: 1, line: "We shoot the photos and write the words." },
  { name: "Store and payments", stage: 1, line: "We build your online store, with checkout and payments." },
  { name: "Marketing and SEO", stage: 2, line: "We get you found on Google and in front of buyers." },
  { name: "Orders and CRM", stage: 2, line: "We handle orders and bring customers back on WhatsApp and email." },
];
const stages = ["Build", "Launch", "Grow"];

/* dashed blueprint placeholder shown before a piece is built */
function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`relative grid place-items-center rounded-lg border-[1.5px] border-dashed border-[#1e5eeb]/45 bg-[#eef4ff] ${className}`}>
      <span className={`${hand.className} text-[15px] text-[#1e5eeb]/80`}>{label}</span>
    </div>
  );
}

/* a built piece pops in with a spring */
function Built({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`animate-pill-pop ${className}`}>{children}</div>;
}

export default function HeroMobile() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useRef(true);
  const [step, setStep] = useState(0); // 0 = sketch, 1–6 = pieces built
  const [auto, setAuto] = useState(true);
  const [ready, setReady] = useState(false);
  const [tick, setTick] = useState(0);
  const [pop, setPop] = useState(0);

  useEffect(() => {
    const r = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(r);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      inView.current = entries.some((e) => e.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* autoplay: sketch → six pieces → hold → reset */
  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const r = requestAnimationFrame(() => setStep(steps.length));
      return () => cancelAnimationFrame(r);
    }
    const dur = step === 0 ? 1100 : step < steps.length ? STEP_MS : HOLD_MS;
    const t = window.setTimeout(() => {
      if (!inView.current || document.hidden) {
        setTick((v) => v + 1); // check again shortly
        return;
      }
      setStep((s) => (s >= steps.length ? 0 : s + 1));
    }, dur);
    return () => window.clearTimeout(t);
  }, [step, auto, tick]);

  const jump = (i: number) => {
    setAuto(false);
    setStep(i + 1);
  };

  const replay = () => {
    setStep(0);
    setAuto(true);
  };

  const has = (n: number) => step >= n;
  const current = step === 0 ? null : steps[step - 1];
  const stageFill = (s: number) => {
    const inStage = steps.filter((x) => x.stage === s).length;
    const done = steps.slice(0, step).filter((x) => x.stage === s).length;
    return done / inStage;
  };

  const enter = (delay: number) => ({
    className: `transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
      ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    }`,
    style: { transitionDelay: `${delay}ms` } as CSSProperties,
  });

  return (
    <section ref={sectionRef} id="top-m" className="relative overflow-hidden bg-[#ccd9ee] pb-16 pt-28 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,94,235,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 90% 60% at 50% 55%, #000 35%, transparent 85%)",
        }}
      />

      <div className="wrap relative max-w-2xl">
        {/* ---------- copy ---------- */}
        <h1
          {...enter(0)}
          className={`${enter(0).className} text-balance text-[2.25rem] font-bold leading-[1.06] tracking-[-0.03em] text-[#0b1a3b] sm:text-[3rem]`}
        >
          You bring the idea. We build the brand, the store and the sales.
        </h1>
        <p {...enter(100)} className={`${enter(100).className} mt-5 text-[16px] leading-relaxed text-slate-600 sm:text-[17px]`}>
        SKAD Commerce OS is a commerce services team. One team takes your business from first sketch to steady
          orders.
        </p>

        <div {...enter(200)} className={`${enter(200).className} mt-7 flex flex-col items-center gap-4 sm:flex-row sm:gap-6`}>
          <NavLink
            href="/enquire"
            onClick={() => setPop((v) => v + 1)}
            className="flex w-full justify-center rounded-xl bg-[#1e5eeb] text-[15px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(30,94,235,0.85)] transition-[scale] duration-300 active:scale-[0.96] sm:w-auto"
          >
            <span key={pop} className={`inline-flex items-center gap-2.5 px-6 py-3.5 ${pop > 0 ? "animate-rubber" : ""}`}>
              Tell us your idea
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
                <ArrowRight size={14} />
              </span>
            </span>
          </NavLink>
          <NavLink
            href="/built-on"
            className="text-[15px] font-semibold text-[#0b1a3b] underline decoration-[#1e5eeb]/40 decoration-2 underline-offset-[6px]"
          >
            See our work
          </NavLink>
        </div>

        {/* ---------- the build ---------- */}
        <div {...enter(320)} className={`${enter(320).className} mt-12`}>
          <p className={`${hand.className} text-center text-[23px] text-[#1e5eeb]`}>watch your business get built</p>

          {/* phone */}
          <div className="relative mx-auto mt-4 w-[236px]">
            {/* floating: marketing */}
            {has(5) && (
              <div className="absolute -left-10 top-[22%] z-20 animate-pill-pop">
                <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-[0_12px_24px_-12px_rgba(11,26,59,0.55)] ring-1 ring-[#1e5eeb]/15">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#eef3fb] text-[#1e5eeb]">
                    <Search size={13} />
                  </span>
                  <span className="text-[12px] font-semibold leading-tight text-[#0b1a3b]">Found on Google</span>
                </div>
              </div>
            )}
            {/* floating: orders + CRM */}
            {has(6) && (
              <>
                <div className="absolute -right-10 top-[48%] z-20 animate-pill-pop">
                  <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-[0_12px_24px_-12px_rgba(11,26,59,0.55)] ring-1 ring-[#1e5eeb]/15">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1e5eeb] text-white">
                      <ShoppingBag size={13} />
                    </span>
                    <span className="text-[12px] font-semibold leading-tight text-[#0b1a3b]">New order</span>
                  </div>
                </div>
                <div className="absolute -left-9 bottom-[14%] z-20 animate-pill-pop" style={{ animationDelay: "250ms" }}>
                  <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-[0_12px_24px_-12px_rgba(11,26,59,0.55)] ring-1 ring-[#1e5eeb]/15">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#22c55e] text-white">
                      <MessageCircle size={13} />
                    </span>
                    <span className="text-[12px] font-semibold leading-tight text-[#0b1a3b]">Back on WhatsApp</span>
                  </div>
                </div>
              </>
            )}

            <div className="rounded-[2.3rem] bg-[#0b1a3b] p-[7px] shadow-[0_40px_60px_-30px_rgba(11,26,59,0.75)]">
              <div
                className="relative flex aspect-[9/17] flex-col gap-2.5 overflow-hidden rounded-[1.85rem] bg-white px-3 pb-3 pt-2.5"
                style={{
                  backgroundImage: step === 0 ? "linear-gradient(rgba(30,94,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.07) 1px, transparent 1px)" : "none",
                  backgroundSize: "14px 14px",
                }}
              >
                {/* status bar */}
                <div className="flex items-center justify-between px-1 text-[9px] font-semibold text-slate-400">
                  <span>9:41</span>
                  <span className="h-1.5 w-8 rounded-full bg-slate-200" />
                </div>

                {/* 1. brand */}
                {has(1) ? (
                  <Built className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <svg viewBox="0 0 40 40" className="h-6 w-6" aria-hidden>
                        <circle cx="20" cy="20" r="18" fill={NAVY} />
                        <path d="M20 10 L29 27 H11 Z" fill="#7cc4f5" />
                      </svg>
                      <span className="text-[12px] font-bold tracking-[0.06em] text-[#0b1a3b]">your brand</span>
                    </span>
                    <span className="relative grid h-6 w-6 place-items-center rounded-full bg-[#eef3fb] text-[#0b1a3b]">
                      <ShoppingBag size={12} />
                      {has(6) && (
                        <span className="absolute -right-1 -top-1 grid h-3.5 w-3.5 animate-pill-pop place-items-center rounded-full bg-[#e5484d] text-[8px] font-bold text-white">
                          1
                        </span>
                      )}
                    </span>
                  </Built>
                ) : (
                  <Placeholder label="logo" className="h-7" />
                )}

                {/* 3. content */}
                {has(3) ? (
                  <Built className="relative h-[30%] overflow-hidden rounded-xl bg-[#0b1a3b] p-3 text-white">
                    <p className="text-[9px] text-[#7cc4f5]">New collection</p>
                    <p className="mt-0.5 text-[13px] font-bold leading-tight">Made to be<br />noticed</p>
                    <span className="absolute -bottom-3 -right-3 h-16 w-16 rounded-full bg-[#1e5eeb]/60" />
                    <span className="absolute bottom-3 right-5 h-8 w-8 rounded-full border-[3px] border-[#f2c14e]" />
                  </Built>
                ) : (
                  <Placeholder label="photos" className="h-[30%]" />
                )}

                {/* 2. products */}
                <div className="grid flex-1 grid-cols-2 gap-2">
                  {[0, 1, 2, 3].map((k) =>
                    has(2) ? (
                      <div key={k} className="flex animate-pill-pop flex-col" style={{ animationDelay: `${k * 90}ms` }}>
                        <div className="flex-1 rounded-lg" style={{ background: ["#dbe8fb", "#fde9c8", "#e3ecfb", "#d6f0e3"][k] }} />
                        <div className="mt-1 h-1.5 w-3/4 rounded-full bg-slate-300" />
                        <div className="mt-1 h-1.5 w-1/3 rounded-full bg-[#1e5eeb]/60" />
                      </div>
                    ) : (
                      <Placeholder key={k} label={k === 0 ? "products" : ""} className="h-full" />
                    )
                  )}
                </div>

                {/* 4. store + payments */}
                {has(4) ? (
                  <Built className="grid h-9 place-items-center rounded-xl bg-[#1e5eeb] text-[12px] font-semibold text-white shadow-[0_8px_16px_-8px_rgba(30,94,235,0.9)]">
                    Add to cart
                  </Built>
                ) : (
                  <Placeholder label="button" className="h-9" />
                )}
              </div>
            </div>
          </div>

          {/* caption */}
          <div className="mt-6 min-h-[84px] text-center" aria-live="polite">
            <p key={`n${step}`} className="animate-step-in text-[13px] font-semibold text-[#1e5eeb]">
              {current ? `${current.name}, step ${step} of ${steps.length}` : "It starts as a sketch"}
            </p>
            <p key={`l${step}`} className="mx-auto mt-1.5 max-w-sm animate-step-in text-[17px] font-semibold leading-snug text-[#0b1a3b]">
              {current ? current.line : "Watch it come together, one service at a time."}
            </p>
          </div>

          {/* build → launch → grow */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {stages.map((s, i) => (
              <div key={s}>
                <div className="relative h-1.5 overflow-hidden rounded-full bg-[#1e5eeb]/15">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-[#1e5eeb]"
                    style={{ width: `${stageFill(i) * 100}%`, transition: `width 0.6s ${SPRING}` }}
                  />
                </div>
                <p className={`mt-1.5 text-center text-[12px] font-semibold ${stageFill(i) > 0 ? "text-[#0b1a3b]" : "text-slate-500"}`}>{s}</p>
              </div>
            ))}
          </div>

          {/* services checklist (tap to jump) */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            {steps.map((s, i) => {
              const done = step > i;
              const now = step === i + 1;
              return (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => jump(i)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-[background-color,box-shadow,scale] duration-300 active:scale-[0.97] ${
                    now
                      ? "bg-white text-[#0b1a3b] shadow-[0_8px_18px_-10px_rgba(30,94,235,0.7)] ring-2 ring-[#1e5eeb]"
                      : done
                        ? "bg-white text-[#0b1a3b] ring-1 ring-[#0b1a3b]/8"
                        : "bg-white/50 text-slate-500 ring-1 ring-[#0b1a3b]/5"
                  }`}
                >
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                      done ? "bg-[#1e5eeb] text-white" : "border-2 border-slate-300"
                    }`}
                    style={{ scale: done ? "1" : "0.9", transition: `scale 0.4s ${SPRING}, background-color 0.3s` }}
                  >
                    {done && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className="leading-tight">{s.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-center gap-5 text-[14px] font-semibold">
            {!auto && (
              <button type="button" onClick={replay} className="text-[#1e5eeb] underline decoration-[#1e5eeb]/30 underline-offset-4">
                Play again
              </button>
            )}
            <NavLink href="/platform" className="text-[#0b1a3b] underline decoration-[#1e5eeb]/40 decoration-2 underline-offset-[5px]">
              See all twelve services
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}