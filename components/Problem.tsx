"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Code, Mail, Megaphone, Palette, Sheet, Truck, User, Check } from "lucide-react";
import { hand } from "@/lib/fonts";

const NAVY = "#0b1a3b";
const BLUE = "#1e5eeb";
const SKY = "#2ba6f0";
const SPRING = "cubic-bezier(0.34,1.56,0.64,1)";

/* canvas is 1000 × 625 units; 1 unit = 0.1cqw */
const YOU_A = { x: 500, y: 312 };
const YOU_B = { x: 180, y: 312 };
const HUB = { x: 650, y: 312 };

const vendors = [
  { from: "Brand agency", to: "Brand", icon: Palette, at: { x: 170, y: 110 }, rot: -6, angle: 257.1 },
  { from: "Web developer", to: "Store", icon: Code, at: { x: 830, y: 100 }, rot: 4, angle: 308.6 },
  { from: "Ad agency", to: "Marketing", icon: Megaphone, at: { x: 95, y: 330 }, rot: -3, angle: 0 },
  { from: "Photographer", to: "Content", icon: Camera, at: { x: 895, y: 320 }, rot: 5, angle: 51.4 },
  { from: "Email tool", to: "CRM", icon: Mail, at: { x: 185, y: 535 }, rot: -4, angle: 102.9 },
  { from: "Spreadsheets", to: "Analytics", icon: Sheet, at: { x: 500, y: 565 }, rot: 3, angle: 154.3 },
  { from: "Courier portal", to: "Operations", icon: Truck, at: { x: 820, y: 540 }, rot: -5, angle: 205.7 },
];

const docked = vendors.map((v) => {
  const a = (v.angle * Math.PI) / 180;
  return {
    x: Math.round((HUB.x + 250 * Math.cos(a)) * 100) / 100,
    y: Math.round((HUB.y + 205 * Math.sin(a)) * 100) / 100,
  };
});

const messy = [
  "M500 312 C 380 420, 420 120, 300 200 S 120 160, 170 110",
  "M500 312 C 640 160, 560 60, 700 180 S 900 40, 830 100",
  "M500 312 C 300 260, 360 470, 240 380 S 60 400, 95 330",
  "M500 312 C 700 420, 640 200, 780 260 S 960 380, 895 320",
  "M500 312 C 420 460, 260 360, 300 480 S 160 600, 185 535",
  "M500 312 C 620 400, 380 450, 520 500 S 440 600, 500 565",
  "M500 312 C 560 520, 720 380, 700 470 S 880 600, 820 540",
  "M170 110 C 400 40, 600 260, 830 100",
  "M95 330 C 300 500, 700 120, 895 320",
  "M185 535 C 400 400, 600 640, 820 540",
];

const complaints = [
  { x: 285, y: 222, text: "sending the brief again?", rot: -6 },
  { x: 548, y: 128, text: "ads don’t match the site", rot: 4 },
  { x: 268, y: 462, text: "which sheet is right?", rot: -3 },
  { x: 610, y: 448, text: "where’s that order?", rot: 5 },
];

const contrasts = [
  { problem: "You repeat the brief to every new vendor.", fix: "You brief one team, once." },
  { problem: "Customer, order and marketing data never meet.", fix: "One view of customers, orders and campaigns." },
  { problem: "Growth stalls while vendors coordinate.", fix: "The team that built it keeps growing it." },
];

const cq = (n: number) => `${n / 10}cqw`;

export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  const touched = useRef(false);
  const [seen, setSeen] = useState(false);
  const [withSkad, setWithSkad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const r = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(r);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // untangle automatically a moment after it comes into view
  useEffect(() => {
    if (!seen) return;
    const t = window.setTimeout(() => {
      if (!touched.current) setWithSkad(true);
    }, 2600);
    return () => window.clearTimeout(t);
  }, [seen]);

  const choose = (v: boolean) => {
    touched.current = true;
    setWithSkad(v);
  };

  const you = withSkad ? YOU_B : YOU_A;

  return (
    <section id="problem" ref={ref} className="bg-white py-24 lg:py-32">
      <div className="wrap">
        {/* heading + toggle */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-balance text-[2.2rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#0b1a3b] sm:text-[2.75rem]">
              Seven vendors, seven briefs, and nobody sees the whole picture.
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-slate-600">
              Most businesses stitch together agencies, freelancers and software to get to market. Every hand-off
              loses context. Here’s what changes with one team.
            </p>
          </div>

          <div
            role="group"
            aria-label="Compare working with separate vendors and one team"
            className="relative grid w-full max-w-sm shrink-0 grid-cols-2 rounded-full bg-[#eef3fb] p-1 ring-1 ring-[#0b1a3b]/5"
          >
            <span
              aria-hidden
              className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[#0b1a3b] shadow-[0_6px_16px_-8px_rgba(11,26,59,0.7)]"
              style={{ transform: `translateX(${withSkad ? 100 : 0}%)`, transition: `transform 0.55s ${SPRING}` }}
            />
            {[
              { v: false, label: "Seven vendors" },
              { v: true, label: "One SKAD team" },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                aria-pressed={withSkad === o.v}
                onClick={() => choose(o.v)}
                className={`relative z-10 rounded-full py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  withSkad === o.v ? "text-white" : "text-slate-600 hover:text-[#0b1a3b]"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* canvas */}
        <div
          className="@container relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#f4f8ff] shadow-[0_30px_60px_-35px_rgba(11,26,59,0.45)] ring-1 ring-[#0b1a3b]/8"
          style={{
            backgroundImage:
              "linear-gradient(rgba(30,94,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.06) 1px, transparent 1px)",
            backgroundSize: "2.5cqw 2.5cqw",
          }}
        >
          <svg viewBox="0 0 1000 625" className="absolute inset-0 h-full w-full" aria-hidden>
            {/* the tangle */}
            <g style={{ opacity: withSkad ? 0 : 1, transition: "opacity 0.5s ease" }}>
              {messy.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={i > 6 ? "#cbd5e1" : "#94a3b8"}
                  strokeWidth={i > 6 ? 1.4 : 1.8}
                  strokeDasharray="7 7"
                  strokeLinecap="round"
                >
                  <animate attributeName="stroke-dashoffset" from="0" to="-28" dur={`${1.4 + (i % 3) * 0.4}s`} repeatCount="indefinite" />
                </path>
              ))}
            </g>

            {/* one team */}
            {docked.map((p, i) => (
              <line
                key={i}
                x1={HUB.x}
                y1={HUB.y}
                x2={p.x}
                y2={p.y}
                stroke={BLUE}
                strokeOpacity="0.45"
                strokeWidth="2"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: withSkad ? 0 : 1,
                  transition: withSkad ? `stroke-dashoffset 0.6s ease-out ${750 + i * 70}ms` : "stroke-dashoffset 0.25s ease",
                }}
              />
            ))}
            <path
              d={`M${YOU_B.x + 55} ${HUB.y} L${HUB.x - 62} ${HUB.y}`}
              stroke={BLUE}
              strokeWidth="3.5"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: withSkad ? 0 : 1,
                transition: withSkad ? "stroke-dashoffset 0.7s ease-out 450ms" : "stroke-dashoffset 0.25s ease",
              }}
            />
          </svg>

          {/* handwritten complaints */}
          {complaints.map((c) => (
            <span
              key={c.text}
              className={`${hand.className} pointer-events-none absolute z-10 hidden whitespace-nowrap text-slate-600 sm:block`}
              style={{
                left: cq(c.x),
                top: cq(c.y),
                fontSize: "2.3cqw",
                lineHeight: 1,
                transform: `rotate(${c.rot}deg)`,
                opacity: withSkad ? 0 : 1,
                transition: "opacity 0.35s ease",
                textShadow: "0 0 0.6cqw #f4f8ff, 0 0 0.6cqw #f4f8ff, 0 0 0.6cqw #f4f8ff",
              }}
            >
              {c.text}
            </span>
          ))}
          <span
            className={`${hand.className} pointer-events-none absolute z-10 hidden whitespace-nowrap sm:block`}
            style={{
              left: cq(270),
              top: cq(250),
              fontSize: "2.5cqw",
              lineHeight: 1,
              color: BLUE,
              transform: `rotate(-4deg) translateY(${withSkad ? 0 : 1}cqw)`,
              opacity: withSkad ? 1 : 0,
              transition: `opacity 0.5s ease ${withSkad ? 900 : 0}ms, transform 0.6s ${SPRING} ${withSkad ? 900 : 0}ms`,
            }}
          >
            one brief, one team
          </span>

          {/* vendor → capability chips */}
          {vendors.map((v, i) => {
            const p = withSkad ? docked[i] : v.at;
            const Icon = v.icon;
            const delay = `${i * 60}ms`;
            return (
              <div
                key={v.from}
                className="absolute z-20"
                style={{
                  left: cq(p.x),
                  top: cq(p.y),
                  transform: `translate(-50%, -50%) rotate(${withSkad ? 0 : v.rot}deg)`,
                  transition: `left 0.9s ${SPRING} ${delay}, top 0.9s ${SPRING} ${delay}, transform 0.9s ${SPRING} ${delay}`,
                }}
              >
                <div
                  className={`flex items-center gap-[0.8cqw] whitespace-nowrap rounded-full bg-white px-[1.2cqw] py-[0.8cqw] ring-1 transition-[box-shadow,color] duration-500 ${
                    withSkad
                      ? "text-[#0b1a3b] shadow-[0_1cqw_2cqw_-1cqw_rgba(30,94,235,0.5)] ring-[#1e5eeb]/30"
                      : "text-slate-600 shadow-[0_0.8cqw_1.6cqw_-1cqw_rgba(11,26,59,0.35)] ring-slate-300"
                  }`}
                >
                  <span
                    className="grid shrink-0 place-items-center rounded-full transition-colors duration-500"
                    style={{
                      width: "3.2cqw",
                      height: "3.2cqw",
                      background: withSkad ? "#e3ecfb" : "#f1f5f9",
                      color: withSkad ? BLUE : "#64748b",
                    }}
                  >
                    <Icon style={{ width: "1.7cqw", height: "1.7cqw" }} />
                  </span>
                  <span className="hidden pr-[0.4cqw] sm:grid" style={{ fontSize: "1.55cqw" }}>
                    <span
                      className="transition-opacity duration-300"
                      style={{ gridArea: "1 / 1", opacity: withSkad ? 0 : 1 }}
                    >
                      {v.from}
                    </span>
                    <span
                      className="font-semibold transition-opacity duration-300"
                      style={{ gridArea: "1 / 1", opacity: withSkad ? 1 : 0, transitionDelay: withSkad ? "300ms" : "0ms" }}
                    >
                      {v.to}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}

          {/* SKAD hub */}
          <div
            className="absolute z-30"
            style={{
              left: cq(HUB.x),
              top: cq(HUB.y),
              transform: `translate(-50%, -50%) scale(${withSkad ? 1 : 0})`,
              transition: `transform 0.7s ${SPRING} ${withSkad ? 250 : 0}ms`,
            }}
          >
            {withSkad && <span className="absolute inset-0 animate-pulse-ring rounded-full border border-[#1e5eeb]/40" />}
            <div
              className="relative grid place-items-center rounded-full text-center shadow-[0_2cqw_4cqw_-1.5cqw_rgba(11,26,59,0.6)]"
              style={{ width: "13cqw", height: "13cqw", background: NAVY }}
            >
              <div className="leading-none">
                <p className="font-bold tracking-[0.12em] text-white" style={{ fontSize: "2.3cqw" }}>
                  SKAD
                </p>
                <p className="mt-[0.6cqw]" style={{ fontSize: "1.35cqw", color: SKY }}>
                  one team
                </p>
              </div>
            </div>
          </div>

          {/* you */}
          <div
            className="absolute z-30"
            style={{
              left: cq(you.x),
              top: cq(you.y),
              transform: "translate(-50%, -50%)",
              transition: `left 0.9s ${SPRING}`,
            }}
          >
            <div
              className={`flex items-center gap-[1cqw] rounded-full bg-white px-[1.6cqw] py-[1cqw] ring-2 transition-[box-shadow] duration-500 ${
                withSkad
                  ? "shadow-[0_1.2cqw_2.4cqw_-1cqw_rgba(30,94,235,0.5)] ring-[#1e5eeb]"
                  : "shadow-[0_1.2cqw_2.4cqw_-1cqw_rgba(11,26,59,0.4)] ring-slate-400"
              }`}
            >
              <span className="grid place-items-center rounded-full text-white" style={{ width: "3.6cqw", height: "3.6cqw", background: NAVY }}>
                <User style={{ width: "2cqw", height: "2cqw" }} />
              </span>
              <span className="pr-[0.4cqw] font-semibold text-[#0b1a3b]" style={{ fontSize: "1.9cqw" }}>
                You
              </span>
            </div>
          </div>
        </div>

               {/* problem → fix */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {contrasts.map((c, i) => {
            const delay = 700 + i * 140;
            return (
              <div key={c.problem} className="rounded-2xl bg-[#f4f8ff] p-6 ring-1 ring-[#0b1a3b]/6">
                <p className="text-[15px] leading-relaxed">
                  <span
                    className={`transition-colors duration-500 ${withSkad ? "text-slate-400" : "text-slate-700"}`}
                    style={{
                      backgroundImage: `linear-gradient(${BLUE}, ${BLUE})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "0 55%",
                      backgroundSize: withSkad ? "100% 2px" : "0% 2px",
                      WebkitBoxDecorationBreak: "clone",
                      boxDecorationBreak: "clone",
                      transition: `background-size 0.6s ease-out ${withSkad ? delay : 0}ms, color 0.5s ease ${withSkad ? delay : 0}ms`,
                    }}
                  >
                    {c.problem}
                  </span>
                </p>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    withSkad ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                  style={{ transitionDelay: withSkad ? `${delay + 250}ms` : "0ms" }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="mt-3 flex items-start gap-2.5 text-[16px] font-semibold leading-snug text-[#0b1a3b]"
                      style={{
                        opacity: withSkad ? 1 : 0,
                        transform: `translateY(${withSkad ? 0 : 6}px)`,
                        transition: `opacity 0.4s ease ${withSkad ? delay + 400 : 0}ms, transform 0.5s ${SPRING} ${withSkad ? delay + 400 : 0}ms`,
                      }}
                    >
                      <span className="mt-[1px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1e5eeb] text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {c.fix}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}