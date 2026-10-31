"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Camera,
  Check,
  Compass,
  GraduationCap,
  LifeBuoy,
  Megaphone,
  MessageCircle,
  Package,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";
import NavLink from "./NavLink";
import Reveal from "./Reveal";
import { hand } from "@/lib/fonts";

const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";
const AUTO_MS = 5200;
const ROW_H = 50; // board row height (640px and up)

type Task = { id: string; label: string; icon: LucideIcon; kind: "always" | "move" | "extra" };

// "always": CommerceOS team in both modes. "move": switches sides. "extra": only appears in hand-over mode.
const tasks: Task[] = [
  { id: "strategy", label: "Strategy and setup", icon: Compass, kind: "always" },
  { id: "store", label: "Store updates", icon: Store, kind: "move" },
  { id: "listings", label: "Product listings", icon: Package, kind: "move" },
  { id: "content", label: "Content and photography", icon: Camera, kind: "move" },
  { id: "ads", label: "Ads and campaigns", icon: Megaphone, kind: "move" },
  { id: "crm", label: "Email and WhatsApp", icon: MessageCircle, kind: "move" },
  { id: "ops", label: "Order operations", icon: Truck, kind: "move" },
  { id: "reports", label: "Reporting", icon: Activity, kind: "move" },
  { id: "training", label: "Training your team", icon: GraduationCap, kind: "extra" },
  { id: "support", label: "Support when you need it", icon: LifeBuoy, kind: "extra" },
];

const modes = [
  {
    toggle: "We run it for you",
    title: "We run it for you.",
    text: "Our team builds the business and keeps it running: the store, content, campaigns and operations. You focus on your product and your customers.",
    fit: ["Founders without an in-house team", "Businesses that want one partner for everything"],
    cta: "Talk to us about managed",
    note: "you’re free to focus on the business",
  },
  {
    toggle: "We build, you run",
    title: "We build it, your team runs it.",
    text: "We set everything up, train your people and stay on hand for support. Day-to-day running moves to your team.",
    fit: ["Businesses with their own staff", "Teams that want to own the work in-house"],
    cta: "Talk to us about hand-over",
    note: "your team runs the day-to-day",
  },
];

type Pos = { col: 0 | 1; row: number; visible: boolean };

const layoutFor = (mode: number): Record<string, Pos> => {
  const ours = tasks.filter((t) => t.kind === "always" || (mode === 0 ? t.kind === "move" : t.kind === "extra"));
  const yours = mode === 1 ? tasks.filter((t) => t.kind === "move") : [];
  const map: Record<string, Pos> = {};
  ours.forEach((t, i) => {
    map[t.id] = { col: 0, row: i, visible: true };
  });
  yours.forEach((t, i) => {
    map[t.id] = { col: 1, row: i, visible: true };
  });
  tasks
    .filter((t) => !map[t.id])
    .forEach((t, i) => {
      map[t.id] = { col: 0, row: ours.length + i, visible: false };
    });
  return map;
};

const ROWS = 8; // tallest board column (managed mode)

export default function WaysToWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const inViewRef = useRef(false);
  const touched = useRef(false);
  const [mode, setMode] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        inViewRef.current = entries.some((e) => e.isIntersecting);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // switch modes automatically until the visitor takes over
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (touched.current || !inViewRef.current) return;
      setMode((m) => (m === 0 ? 1 : 0));
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, []);

  const choose = (m: number) => {
    touched.current = true;
    setMode(m);
  };

  const layout = layoutFor(mode);
  const m = modes[mode];

  return (
    <section id="ways" ref={sectionRef} className="bg-white py-24 lg:py-32">
      <div className="wrap">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="text-balance text-[2.2rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#0b1a3b] sm:text-[2.75rem] lg:col-span-7">
              Two ways to work with us.
            </h2>
            <p className="max-w-md text-[16px] leading-relaxed text-slate-600 lg:col-span-5">
              Hand us the whole job, or let us build it and train your team to run it.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:mt-12 lg:grid-cols-12 lg:gap-12">
          {/* ---------- left: toggle + description ---------- */}
          <div className="min-w-0 lg:col-span-5">
            <div
              role="group"
              aria-label="Choose how to work with us"
              className="relative grid grid-cols-2 rounded-full bg-[#eef3fb] p-1 ring-1 ring-[#0b1a3b]/5"
            >
              <span
                aria-hidden
                className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[#0b1a3b] shadow-[0_6px_16px_-8px_rgba(11,26,59,0.7)]"
                style={{ transform: `translateX(${mode * 100}%)`, transition: `transform 0.55s ${SPRING}` }}
              />
              {modes.map((md, i) => (
                <button
                  key={md.toggle}
                  type="button"
                  aria-pressed={mode === i}
                  onClick={() => choose(i)}
                  className={`relative z-10 whitespace-nowrap rounded-full px-2 py-2.5 text-[13px] font-semibold transition-colors duration-300 sm:text-sm ${
                    mode === i ? "text-white" : "text-slate-600 hover:text-[#0b1a3b]"
                  }`}
                >
                  {md.toggle}
                </button>
              ))}
            </div>

            <div key={mode} className="mt-8">
              <h3 className="animate-step-in text-balance text-[1.85rem] font-bold leading-[1.1] tracking-[-0.03em] text-[#0b1a3b] sm:text-[2.3rem]">
                {m.title}
              </h3>
              <p className="mt-4 animate-step-in text-[15.5px] leading-relaxed text-slate-600 sm:text-[16px]" style={{ animationDelay: "80ms" }}>
                {m.text}
              </p>

              <p className="mt-6 animate-step-in text-sm font-semibold text-[#0b1a3b]" style={{ animationDelay: "140ms" }}>
                A good fit for
              </p>
              <ul className="mt-3 space-y-2.5">
                {m.fit.map((f, k) => (
                  <li
                    key={f}
                    className="flex animate-step-in items-start gap-2.5 text-[15px] text-[#0b1a3b]"
                    style={{ animationDelay: `${200 + k * 90}ms` }}
                  >
                    <span className="mt-[2px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1e5eeb] text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <NavLink
                href="/enquire"
                className="group mt-8 flex w-full animate-step-in items-center justify-center gap-2.5 rounded-xl bg-[#0b1a3b] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_-14px_rgba(11,26,59,0.8)] transition-[background-color,translate,scale] duration-700 ease-spring hover:-translate-y-1 hover:scale-[1.04] hover:bg-[#1e5eeb] active:scale-95 active:duration-100 sm:inline-flex sm:w-auto"
                style={{ animationDelay: "320ms" }}
              >
                {m.cta}
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 transition-[translate] duration-700 ease-spring group-hover:translate-x-1">
                  <ArrowRight size={13} />
                </span>
              </NavLink>
            </div>
          </div>

          {/* ---------- right ---------- */}
          <div className="min-w-0 lg:col-span-7">
            {/* ===== PHONES: one row per task with an Us / You switch ===== */}
            <div className="sm:hidden">
              <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-[#0b1a3b]/8 shadow-[0_20px_40px_-30px_rgba(11,26,59,0.45)]">
                <div className="flex items-center justify-between border-b border-dashed border-[#1e5eeb]/20 bg-[#f4f8ff] px-4 py-3">
                  <span className="text-[13px] font-semibold text-[#0b1a3b]">Who does it</span>
                  <span className="flex items-center gap-3 text-[12px] font-medium text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0b1a3b]" /> Us
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#1e5eeb]" /> You
                    </span>
                  </span>
                </div>

                <ul>
                  {tasks.map((t, i) => {
                    const pos = layout[t.id];
                    const ours = pos.col === 0;
                    const Icon = t.icon;
                    const delay = i * 55;
                    return (
                      <li
                        key={t.id}
                        aria-hidden={!pos.visible}
                        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                          pos.visible ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div
                            className="flex items-center gap-3 border-b border-dashed border-[#1e5eeb]/12 px-4 py-3"
                            style={{
                              opacity: pos.visible ? 1 : 0,
                              transition: `opacity 0.35s ease ${pos.visible ? 200 : 0}ms`,
                            }}
                          >
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eef3fb] text-[#1e5eeb]">
                              <Icon size={15} />
                            </span>
                            <span className="min-w-0 flex-1 text-[14px] font-medium leading-snug text-[#0b1a3b]">{t.label}</span>

                            {/* Us / You switch */}
                            <span className="relative grid h-8 w-[88px] shrink-0 grid-cols-2 rounded-full bg-[#eef3fb] p-0.5 text-[11.5px] font-semibold">
                              <span
                                aria-hidden
                                className="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full shadow-[0_4px_10px_-4px_rgba(11,26,59,0.6)]"
                                style={{
                                  transform: `translateX(${ours ? 0 : 100}%)`,
                                  background: ours ? "#0b1a3b" : "#1e5eeb",
                                  transition: `transform 0.6s ${SPRING} ${delay}ms, background-color 0.3s ease ${delay}ms`,
                                }}
                              />
                              <span
                                className={`relative z-10 grid place-items-center transition-colors duration-300 ${
                                  ours ? "text-white" : "text-slate-500"
                                }`}
                                style={{ transitionDelay: `${delay + 150}ms` }}
                              >
                                Us
                              </span>
                              <span
                                className={`relative z-10 grid place-items-center transition-colors duration-300 ${
                                  ours ? "text-slate-500" : "text-white"
                                }`}
                                style={{ transitionDelay: `${delay + 150}ms` }}
                              >
                                You
                              </span>
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <p key={`n${mode}`} className={`${hand.className} mt-4 animate-step-in -rotate-1 text-center text-[22px] text-[#1e5eeb]`}>
                {m.note}
              </p>
            </div>

            {/* ===== 640px AND UP: two-column board ===== */}
            <div className="hidden sm:block">
              <div
                className="rounded-2xl bg-[#f4f8ff] p-6 ring-1 ring-[#0b1a3b]/6"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(30,94,235,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.055) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-xl bg-[#0b1a3b] px-3 py-2.5 text-white">
                    <span className="h-2 w-2 rounded-full bg-[#7cc4f5]" />
                    <span className="text-sm font-semibold">CommerceOS team</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-[#0b1a3b] ring-1 ring-[#1e5eeb]/20">
                    <span className="h-2 w-2 rounded-full bg-[#1e5eeb]" />
                    <span className="text-sm font-semibold">Your team</span>
                  </div>
                </div>

                <div className="relative mt-3" style={{ height: ROWS * ROW_H }}>
                  <div aria-hidden className="absolute inset-y-0 left-0 w-[calc(50%-6px)] rounded-xl border border-dashed border-[#1e5eeb]/15" />
                  <div aria-hidden className="absolute inset-y-0 right-0 w-[calc(50%-6px)] rounded-xl border border-dashed border-[#1e5eeb]/15" />

                  <div
                    className="pointer-events-none absolute right-0 top-1/2 flex w-[calc(50%-6px)] -translate-y-1/2 justify-center px-4 text-center"
                    style={{ opacity: mode === 0 ? 1 : 0, transition: `opacity 0.4s ease ${mode === 0 ? 500 : 0}ms` }}
                  >
                    <span className={`${hand.className} -rotate-3 text-[24px] leading-snug text-[#1e5eeb]`}>
                      free to focus on the business
                    </span>
                  </div>

                  {tasks.map((t) => {
                    const pos = layout[t.id];
                    const ours = pos.col === 0;
                    const Icon = t.icon;
                    const delay = pos.row * 45;
                    return (
                      <div
                        key={t.id}
                        aria-hidden={!pos.visible}
                        className="absolute p-1"
                        style={{
                          left: ours ? "0%" : "calc(50% + 6px)",
                          top: pos.row * ROW_H,
                          width: "calc(50% - 6px)",
                          height: ROW_H,
                          opacity: pos.visible ? 1 : 0,
                          scale: pos.visible ? "1" : "0.85",
                          transition: `left 0.75s ${SPRING} ${delay}ms, top 0.75s ${SPRING} ${delay}ms, opacity 0.35s ease ${
                            pos.visible ? delay + 250 : 0
                          }ms, scale 0.5s ${SPRING} ${pos.visible ? delay + 250 : 0}ms`,
                        }}
                      >
                        <div
                          className={`flex h-full items-center gap-2.5 rounded-lg px-3 text-[13.5px] font-medium leading-tight transition-[background-color,color,box-shadow] duration-500 ${
                            ours
                              ? "bg-[#0b1a3b] text-white shadow-[0_8px_16px_-10px_rgba(11,26,59,0.7)]"
                              : "bg-white text-[#0b1a3b] shadow-[0_8px_16px_-12px_rgba(11,26,59,0.4)] ring-1 ring-[#1e5eeb]/20"
                          }`}
                          style={{ transitionDelay: `${delay + 200}ms` }}
                        >
                          <span
                            className={`grid h-7 w-7 shrink-0 place-items-center rounded-md transition-colors duration-500 ${
                              ours ? "bg-white/10 text-[#7cc4f5]" : "bg-[#eef3fb] text-[#1e5eeb]"
                            }`}
                          >
                            <Icon size={14} />
                          </span>
                          <span className="truncate">{t.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-sm text-slate-600 lg:text-left">
              You can start fully managed and take more in-house over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}