"use client";

import { useEffect, useRef, useState } from "react";
import { Layers, Maximize2, Rocket, Search, Target, TrendingUp, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import { hand } from "@/lib/fonts";

const BLUE = "#1e5eeb";
const SKY = "#2ba6f0";
const SPRING = "cubic-bezier(0.34,1.56,0.64,1)";

const steps: { name: string; text: string; icon: LucideIcon }[] = [
  { name: "Discover", text: "Understand the market, the customer and where you stand today.", icon: Search },
  { name: "Define", text: "Agree the positioning, the range and a plan with clear priorities.", icon: Target },
  { name: "Build", text: "Create the brand, product and systems the business will run on.", icon: Layers },
  { name: "Launch", text: "Go live with the store, the content and the first campaigns.", icon: Rocket },
  { name: "Grow", text: "Build demand and retention, guided by what the data shows.", icon: TrendingUp },
  { name: "Scale", text: "Automate operations and expand into new channels and markets.", icon: Maximize2 },
];

/* desktop route: viewBox 1200 × 660, an even wave with markers on peaks and dips */
const VB_W = 1200;
const VB_H = 660;
const PEAK = 230;
const DIP = 430;
const X0 = 140;
const STEP_X = 184;
const POINTS = steps.map((_, i) => ({ x: X0 + i * STEP_X, y: i % 2 === 0 ? PEAK : DIP }));
const ROUTE = POINTS.reduce((d, pt, i) => {
  if (i === 0) return `M ${pt.x} ${pt.y}`;
  const prev = POINTS[i - 1];
  const h = STEP_X / 2;
  return `${d} C ${prev.x + h} ${prev.y}, ${pt.x - h} ${pt.y}, ${pt.x} ${pt.y}`;
}, "");
const LEAD_IN = `M 20 ${PEAK} L ${X0} ${PEAK}`;
const LAST = POINTS[POINTS.length - 1];
const LEAD_OUT = `M ${LAST.x} ${LAST.y} C ${LAST.x + 60} ${LAST.y}, ${LAST.x + 90} ${LAST.y - 40}, ${LAST.x + 110} ${LAST.y - 90}`;

const CARD_W = 264; // in viewBox units
const CARD_GAP = 40;

type Pt = { x: number; y: number };

export default function Method() {
  const routeRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  const mobRef = useRef<HTMLOListElement>(null);
  const samplesRef = useRef<Pt[]>([]);
  const [measured, setMeasured] = useState(false);
  const [p, setP] = useState(0);

  // sample the route once for the traveller dot
  useEffect(() => {
    const r = requestAnimationFrame(() => {
      const path = routeRef.current;
      if (!path) return;
      const L = path.getTotalLength();
      if (!L) return;
      samplesRef.current = Array.from({ length: 301 }, (_, k) => {
        const q = path.getPointAtLength((k / 300) * L);
        return { x: q.x, y: q.y };
      });
      setMeasured(true);
    });
    return () => cancelAnimationFrame(r);
  }, []);

  // scroll-linked progress
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const vh = window.innerHeight;
      const desk = deskRef.current;
      if (desk && desk.offsetParent !== null) {
        // starts when the route enters, done when its middle reaches the centre of the screen
        const r = desk.getBoundingClientRect();
        const start = vh * 0.8;
        const end = vh * 0.5 - r.height / 2;
        setP(Math.min(1, Math.max(0, (start - r.top) / (start - end))));
        return;
      }
      const mob = mobRef.current;
      if (!mob) return;
      const r = mob.getBoundingClientRect();
      const start = vh * 0.8;
      const end = vh * 0.65 - r.height;
      setP(Math.min(1, Math.max(0, (start - r.top) / (start - end))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    const first = requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(first);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // move the traveller dot
  useEffect(() => {
    const s = samplesRef.current;
    const g = dotRef.current;
    if (!s.length || !g) return;
    const q = s[Math.round(p * 300)];
    g.setAttribute("transform", `translate(${q.x.toFixed(1)} ${q.y.toFixed(1)})`);
  }, [p, measured]);

  // each segment is the same length, so step i sits at i / 5 of the route
  const reachedAt = (i: number) => p >= i / (steps.length - 1) - 0.01;
  const done = p >= 0.995;

  return (
    <section id="method" className="overflow-hidden bg-[#e3eaf6] py-24 lg:py-28">
      <div className="wrap">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="text-balance text-[2.2rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#0b1a3b] sm:text-[2.75rem] lg:col-span-7">
              From first call to full scale, one route.
            </h2>
            <p className="max-w-md text-[16px] leading-relaxed text-slate-600 lg:col-span-5">
              Six steps, in order. Here’s the route a project takes, from the first conversation to growing into new
              markets.
            </p>
          </div>
        </Reveal>

        {/* ---------- desktop route ---------- */}
        <div ref={deskRef} className="relative mt-8 hidden lg:block">
          <div className="relative w-full" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              {/* lead-in and lead-out */}
              <path d={LEAD_IN} fill="none" stroke={BLUE} strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 9" />
              <path
                d={LEAD_OUT}
                fill="none"
                stroke={BLUE}
                strokeOpacity={done ? 0.55 : 0.2}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1 9"
                style={{ transition: "stroke-opacity 0.5s ease" }}
              />

              {/* dotted road */}
              <path
                ref={routeRef}
                d={ROUTE}
                fill="none"
                stroke={BLUE}
                strokeOpacity="0.25"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="1 12"
              />
              {/* drawn progress */}
              <path
                d={ROUTE}
                fill="none"
                stroke={BLUE}
                strokeWidth="4.5"
                strokeLinecap="round"
                pathLength={1}
                style={{ strokeDasharray: 1, strokeDashoffset: 1 - p, transition: "stroke-dashoffset 0.15s linear" }}
              />

              {/* connectors + markers */}
              {POINTS.map((pt, i) => {
                const above = pt.y === PEAK;
                const reached = reachedAt(i);
                return (
                  <g key={i}>
                    <line
                      x1={pt.x}
                      y1={above ? pt.y - 16 : pt.y + 16}
                      x2={pt.x}
                      y2={above ? pt.y - CARD_GAP : pt.y + CARD_GAP}
                      stroke={BLUE}
                      strokeOpacity={reached ? 0.75 : 0.25}
                      strokeWidth="1.5"
                      strokeDasharray="3 4"
                      style={{ transition: "stroke-opacity 0.4s ease" }}
                    />
                    <g
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                        transform: `scale(${reached ? 1.12 : 0.9})`,
                        transition: `transform 0.55s ${SPRING}`,
                      }}
                    >
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="16"
                        fill={reached ? BLUE : "#ffffff"}
                        stroke={BLUE}
                        strokeWidth="2.5"
                        style={{ transition: "fill 0.3s ease" }}
                      />
                      <text
                        x={pt.x}
                        y={pt.y + 5}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="700"
                        fill={reached ? "#ffffff" : BLUE}
                        style={{ transition: "fill 0.3s ease" }}
                      >
                        {i + 1}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* traveller */}
              <g
                ref={dotRef}
                transform={`translate(${POINTS[0].x} ${POINTS[0].y})`}
                style={{ opacity: p > 0.01 && p < 0.99 ? 1 : 0, transition: "opacity 0.3s ease" }}
              >
                <circle r="18" fill={SKY} opacity="0.22" />
                <circle r="9" fill={SKY} />
                <circle r="3.5" fill="#ffffff" />
              </g>
            </svg>

            {/* step cards */}
            {steps.map((s, i) => {
              const pt = POINTS[i];
              const above = pt.y === PEAK;
              const reached = reachedAt(i);
              const Icon = s.icon;
              return (
                <div
                  key={s.name}
                  className="absolute"
                  style={{
                    width: `${(CARD_W / VB_W) * 100}%`,
                    left: `${(pt.x / VB_W) * 100}%`,
                    top: `${((above ? pt.y - CARD_GAP : pt.y + CARD_GAP) / VB_H) * 100}%`,
                    transform: `translate(-50%, ${above ? "-100%" : "0"})`,
                  }}
                >
                  <div
                    className={`rounded-xl bg-white p-4 ring-1 xl:p-5 ${
                      reached
                        ? "shadow-[0_20px_40px_-22px_rgba(30,94,235,0.65)] ring-2 ring-[#1e5eeb]"
                        : "shadow-[0_10px_24px_-20px_rgba(11,26,59,0.4)] ring-[#0b1a3b]/8"
                    }`}
                    style={{
                      opacity: reached ? 1 : 0.45,
                      transform: `translateY(${reached ? 0 : above ? 12 : -12}px) scale(${reached ? 1 : 0.96})`,
                      transition: `opacity 0.4s ease, transform 0.6s ${SPRING}, box-shadow 0.4s ease`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors duration-300 ${
                          reached ? "bg-[#1e5eeb] text-white" : "bg-[#eef3fb] text-[#1e5eeb]"
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <div>
                        <p className="text-[11px] font-medium leading-none text-slate-500">Step {i + 1}</p>
                        <p className="mt-1 text-[18px] font-bold leading-none tracking-[-0.01em] text-[#0b1a3b]">{s.name}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-[13.5px] leading-snug text-slate-600">{s.text}</p>
                  </div>
                </div>
              );
            })}

            {/* notes */}
            <span
              className={`${hand.className} absolute whitespace-nowrap text-[22px] leading-none text-[#1e5eeb]`}
              style={{ left: `${(18 / VB_W) * 100}%`, top: `${((PEAK + 22) / VB_H) * 100}%`, transform: "rotate(-5deg)" }}
            >
              start here
            </span>
            <span
              className={`${hand.className} absolute whitespace-nowrap text-[22px] leading-none`}
              style={{
                right: `${(8 / VB_W) * 100}%`,
                top: `${((LAST.y - 150) / VB_H) * 100}%`,
                color: BLUE,
                opacity: done ? 1 : 0,
                transform: `rotate(-4deg) translateY(${done ? 0 : 8}px)`,
                transition: `opacity 0.5s ease 0.2s, transform 0.6s ${SPRING} 0.2s`,
              }}
            >
              then we keep going
            </span>
          </div>
        </div>

        {/* ---------- mobile route ---------- */}
        <ol ref={mobRef} className="relative mt-12 space-y-5 lg:hidden">
          <span aria-hidden className="absolute bottom-8 left-[15px] top-8 w-[3px] rounded-full bg-[#1e5eeb]/15" />
          <span
            aria-hidden
            className="absolute bottom-8 left-[15px] top-8 w-[3px] origin-top rounded-full bg-[#1e5eeb]"
            style={{ transform: `scaleY(${p})`, transition: "transform 0.15s linear" }}
          />
          {steps.map((s, i) => {
            const reached = p >= (i + 0.2) / steps.length;
            const Icon = s.icon;
            return (
              <li key={s.name} className="relative pl-12">
                <span
                  aria-hidden
                  className={`absolute left-0 top-5 grid h-8 w-8 place-items-center rounded-full border-[2.5px] border-[#1e5eeb] text-xs font-bold ${
                    reached ? "bg-[#1e5eeb] text-white" : "bg-white text-[#1e5eeb]"
                  }`}
                  style={{ transform: `scale(${reached ? 1.08 : 0.9})`, transition: `transform 0.5s ${SPRING}, background-color 0.3s` }}
                >
                  {i + 1}
                </span>
                <div
                  className={`rounded-xl bg-white p-4 ring-1 ${reached ? "ring-2 ring-[#1e5eeb]" : "ring-[#0b1a3b]/8"}`}
                  style={{
                    opacity: reached ? 1 : 0.45,
                    transform: `translateX(${reached ? 0 : 10}px)`,
                    transition: `opacity 0.4s ease, transform 0.6s ${SPRING}`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eef3fb] text-[#1e5eeb]">
                      <Icon size={15} />
                    </span>
                    <p className="text-lg font-bold text-[#0b1a3b]">{s.name}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
                </div>
              </li>
            );
          })}
          <li className={`${hand.className} relative pl-12 text-xl text-[#1e5eeb]`}>then we keep going</li>
        </ol>
      </div>
    </section>
  );
}