"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import NavLink from "./NavLink";
import Reveal from "./Reveal";
import { hand } from "@/lib/fonts";

const BLUE = "#1e5eeb";
const SKY = "#2ba6f0";
const DROP = "cubic-bezier(0.34,1.35,0.64,1)";

const steps = [
  {
    name: "Insight",
    items: ["Market Intelligence"],
    outcome: "what to build, and for whom",
    caption: "We study your market, competitors and prices before anything is made.",
  },
  {
    name: "Foundation",
    items: ["Brand Infrastructure", "Product"],
    outcome: "a brand and range ready for market",
    caption: "Research becomes a brand, packaging and a product range ready to sell.",
  },
  {
    name: "Commerce",
    items: ["E-commerce", "Content"],
    outcome: "live, shoppable and well presented",
    caption: "We build the store, list on marketplaces and create the content that sells.",
  },
  {
    name: "Demand",
    items: ["SEO/GEO", "Marketing", "CRM"],
    outcome: "found, chosen and chosen again",
    caption: "Search, campaigns and CRM bring customers in, then bring them back.",
  },
  {
    name: "Run & learn",
    items: ["Analytics", "Operations"],
    outcome: "delivered reliably, measured clearly",
    caption: "Orders ship on time, and the numbers show what’s working.",
  },
];

/* stack geometry */
const PLATE = 210;
const GAP = 44;
const SPREAD = 74;
const TILT = 0.848; // sin(58deg): how far up each layer appears per unit of height
const CENTER_Y = 380; // px from top of the stage
const STAGE_H = 540;

/* timing */
const STEP_MS = 2200;
const CONNECT_MS = 3600;
const RESET_MS = 900;
const PHASES = 7; // 0–4 steps, 5 connect, 6 reset

function PlateArt({ i, on }: { i: number; on: boolean }) {
  const fg = on ? "#ffffff" : BLUE;
  const mid = on ? "rgba(255,255,255,0.55)" : "#9db7ea";
  const soft = on ? "rgba(255,255,255,0.22)" : "#e3ecfb";
  return (
    <svg viewBox="0 0 210 210" className="absolute inset-0 h-full w-full" aria-hidden>
      {i === 0 && (
        <>
          <circle cx="78" cy="84" r="34" fill="none" stroke={fg} strokeWidth="9" />
          <line x1="103" y1="109" x2="138" y2="144" stroke={fg} strokeWidth="11" strokeLinecap="round" />
          <rect x="138" y="62" width="15" height="40" rx="3" fill={mid} />
          <rect x="159" y="44" width="15" height="58" rx="3" fill={fg} />
          <rect x="180" y="72" width="15" height="30" rx="3" fill={mid} />
          <rect x="28" y="168" width="150" height="10" rx="5" fill={soft} />
        </>
      )}
      {i === 1 && (
        <>
          <circle cx="62" cy="70" r="32" fill={fg} />
          <rect x="112" y="50" width="70" height="14" rx="7" fill={fg} />
          <rect x="112" y="74" width="50" height="10" rx="5" fill={mid} />
          {[fg, mid, soft, fg].map((c, k) => (
            <rect key={k} x={28 + k * 42} y="128" width="34" height="34" rx="7" fill={c} />
          ))}
        </>
      )}
      {i === 2 && (
        <>
          <rect x="25" y="25" width="160" height="18" rx="6" fill={mid} />
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <rect x={25 + k * 57} y="58" width="46" height="58" rx="7" fill={k === 1 ? fg : soft} />
              <rect x={25 + k * 57} y="124" width="40" height="7" rx="3.5" fill={mid} />
            </g>
          ))}
          <rect x="25" y="152" width="74" height="24" rx="12" fill={fg} />
        </>
      )}
      {i === 3 && (
        <>
          <rect x="25" y="28" width="82" height="22" rx="11" fill={mid} />
          <rect x="25" y="58" width="56" height="22" rx="11" fill={soft} />
          <polyline
            points="25,165 60,145 90,152 120,114 150,100 182,60"
            fill="none"
            stroke={fg}
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="182" cy="60" r="10" fill={fg} />
        </>
      )}
      {i === 4 && (
        <>
          {[52, 102, 152].map((y, k) => (
            <g key={y}>
              <circle cx="42" cy={y} r="13" fill={fg} />
              <path
                d={`M35 ${y} l5 5 l9 -10`}
                fill="none"
                stroke={on ? BLUE : "#ffffff"}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="66" y={y - 6} width={120 - k * 22} height="12" rx="6" fill={mid} />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

export default function Connects() {
  const sectionRef = useRef<HTMLElement>(null);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(0);
  const [pop, setPop] = useState(0);

  // only animate while on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => setVisible(entries.some((e) => e.isIntersecting)), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // automatic timeline
  useEffect(() => {
    if (!visible) return;
    const dur = phase < 5 ? STEP_MS : phase === 5 ? CONNECT_MS : RESET_MS;
    const t = window.setTimeout(() => setPhase((p) => (p + 1) % PHASES), dur);
    return () => window.clearTimeout(t);
  }, [phase, visible]);

  // dots flowing down the beam during the "connected" phase
  useEffect(() => {
    if (phase !== 5) return;
    const beamH = SPREAD * 4 * TILT;
    const anims = dotsRef.current
      .filter((d): d is HTMLSpanElement => d !== null)
      .map((d, k) =>
        d.animate(
          [
            { transform: "translate(-50%, 0)", opacity: 0 },
            { opacity: 1, offset: 0.15 },
            { opacity: 1, offset: 0.85 },
            { transform: `translate(-50%, ${beamH}px)`, opacity: 0 },
          ],
          { duration: 1300, delay: 500 + k * 430, iterations: Infinity, easing: "cubic-bezier(0.45,0,0.55,1)" }
        )
      );
    return () => anims.forEach((a) => a.cancel());
  }, [phase]);

  const connected = phase === 5;
  const shown = Math.min(phase, 5);
  const current = shown < 5 ? steps[shown] : null;
  const gap = connected ? SPREAD : GAP;
  const topZ = 4 * SPREAD;

  return (
    <section id="how-it-works" ref={sectionRef} className="overflow-hidden bg-white py-24 lg:py-32">
      <div className="wrap">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="text-balance text-[2.2rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#0b1a3b] sm:text-[2.75rem] lg:col-span-7">
              Every step builds on the last.
            </h2>
            <p className="max-w-md text-[16px] leading-relaxed text-slate-600 lg:col-span-5">
              Five steps, stacked on the same foundation. Nothing is rebuilt as you grow, and what we learn flows
              straight back to the start.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
          {/* ---------- story panel ---------- */}
          <div className="order-2 lg:order-1">
            <p className="text-sm font-medium text-[#1e5eeb]">{current ? `Step ${shown + 1} of 5` : "All five, connected"}</p>
            <div key={shown} className="animate-step-in">
              <h3 className="mt-2 text-[2.6rem] font-bold leading-none tracking-[-0.035em] text-[#0b1a3b] sm:text-[3.4rem]">
                {current ? current.name : "One system"}
              </h3>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-slate-600">
                {current
                  ? current.caption
                  : "Each layer feeds the next, and what we learn from every sale flows back into research."}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(current ? current.items : steps.map((s) => s.name)).map((it) => (
                  <span
                    key={it}
                    className="rounded-full bg-[#eef3fb] px-3.5 py-1.5 text-sm font-medium text-[#0b1a3b] ring-1 ring-[#1e5eeb]/15"
                  >
                    {it}
                  </span>
                ))}
              </div>
              <p className={`${hand.className} mt-5 -rotate-1 text-[23px] leading-snug text-[#1e5eeb]`}>
                {current ? `result: ${current.outcome}` : "and round it goes"}
              </p>
            </div>

            {/* progress */}
            <div className="mt-8 flex max-w-sm gap-1.5" aria-hidden>
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const dur = i < 5 ? STEP_MS : CONNECT_MS;
                const full = phase !== 6 && phase > i;
                const running = phase === i;
                return (
                  <span key={i} className="relative h-1 flex-1 overflow-hidden rounded-full bg-[#1e5eeb]/12">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-[#1e5eeb]"
                      style={{
                        width: full || running ? "100%" : "0%",
                        transition: running && visible ? `width ${dur}ms linear` : "none",
                      }}
                    />
                  </span>
                );
              })}
            </div>
          </div>

          {/* ---------- 3D stack ---------- */}
          <div className="order-1 lg:order-2">
            <div
              className="relative overflow-hidden rounded-2xl bg-[#f4f8ff] ring-1 ring-[#0b1a3b]/6"
              style={{
                height: STAGE_H,
                backgroundImage:
                  "linear-gradient(rgba(30,94,235,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.055) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            >
              {/* note: sits inside the card so it can never be cut off */}
              <span
                className={`${hand.className} absolute left-7 top-7 z-10 max-w-[200px] text-[22px] leading-tight`}
                style={{
                  color: BLUE,
                  opacity: connected ? 1 : 0,
                  transform: `rotate(-3deg) translateY(${connected ? 0 : 8}px)`,
                  transition: `opacity 0.5s ease ${connected ? 900 : 0}ms, transform 0.6s ${DROP} ${connected ? 900 : 0}ms`,
                }}
              >
                what we learn flows back down to the start
              </span>

              {/* slightly smaller on 1024–1279px screens so labels never clip */}
              <div className="absolute inset-0 origin-center scale-[0.84] xl:scale-100">
                {/* ground shadow */}
                <div
                  aria-hidden
                  className="absolute left-1/2 h-16 w-80 -translate-x-1/2 rounded-full bg-[#0b1a3b]/15 blur-2xl"
                  style={{ top: CENTER_Y + 60 }}
                />

                {/* beam (behind the plates, visible through the gaps) */}
                <div
                  aria-hidden
                  className="absolute left-1/2 w-[3px] -translate-x-1/2 rounded-full"
                  style={{
                    top: CENTER_Y - topZ * TILT,
                    height: topZ * TILT,
                    background: `linear-gradient(${SKY}, ${BLUE})`,
                    opacity: connected ? 1 : 0,
                    transform: `translateX(-50%) scaleY(${connected ? 1 : 0})`,
                    transformOrigin: "top",
                    transition: `opacity 0.4s ease, transform 0.8s cubic-bezier(0.65,0,0.35,1) ${connected ? 350 : 0}ms`,
                    boxShadow: connected ? `0 0 18px 2px ${SKY}88` : "none",
                  }}
                >
                  {[0, 1, 2].map((k) => (
                    <span
                      key={k}
                      ref={(el) => {
                        dotsRef.current[k] = el;
                      }}
                      className="absolute left-1/2 top-0 h-2.5 w-2.5 rounded-full bg-white opacity-0 shadow-[0_0_10px_3px_rgba(43,166,240,0.9)]"
                    />
                  ))}
                </div>

                {/* the stack */}
                <div className="absolute inset-0" style={{ perspective: "1400px" }}>
                  <div
                    className="absolute left-1/2"
                    style={{
                      top: CENTER_Y,
                      width: PLATE,
                      height: PLATE,
                      transformStyle: "preserve-3d",
                      transform: "translate(-50%, -50%) rotateX(58deg) rotateZ(-40deg)",
                    }}
                  >
                    {steps.map((s, i) => {
                      const show = phase !== 6 && phase >= i;
                      const on = phase === i;
                      const z = show ? gap * i : gap * i + 170;
                      const delay = phase === 6 ? i * 70 : 0;
                      return (
                        <div
                          key={s.name}
                          className="absolute inset-0"
                          style={{
                            transformStyle: "preserve-3d",
                            transform: `translateZ(${z}px)`,
                            opacity: show ? 1 : 0,
                            transition: `transform 0.9s ${DROP} ${delay}ms, opacity 0.45s ease ${delay}ms`,
                          }}
                        >
                          {/* slab edge */}
                          <div
                            className="absolute inset-0 rounded-[24px]"
                            style={{
                              transform: "translateZ(-12px)",
                              background: on ? "#1546b8" : "#bccdeb",
                              transition: "background-color 0.5s ease",
                            }}
                          />
                          {/* top face */}
                          <div
                            className="absolute inset-0 overflow-hidden rounded-[24px]"
                            style={{
                              background: on ? BLUE : "#ffffff",
                              boxShadow: on
                                ? "inset 0 0 0 2px rgba(255,255,255,0.35)"
                                : "inset 0 0 0 2px rgba(30,94,235,0.18)",
                              transition: "background-color 0.5s ease, box-shadow 0.5s ease",
                            }}
                          >
                            <PlateArt i={i} on={on} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* side labels */}
                {steps.map((s, i) => {
                  const show = phase !== 6 && phase >= i;
                  const on = phase === i;
                  return (
                    <div
                      key={s.name}
                      className="absolute flex items-center gap-3 whitespace-nowrap"
                      style={{
                        left: "calc(50% + 160px)",
                        top: CENTER_Y - gap * i * TILT - 12,
                        opacity: show ? 1 : 0,
                        transform: `translateX(${show ? 0 : 12}px)`,
                        transition: `top 0.9s ${DROP}, opacity 0.4s ease ${show ? 250 : 0}ms, transform 0.6s ${DROP} ${show ? 250 : 0}ms`,
                      }}
                    >
                      <span className={`h-px w-6 ${on ? "bg-[#1e5eeb]" : "bg-[#1e5eeb]/30"}`} />
                      <span
                        className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold transition-colors duration-300 ${
                          on ? "bg-[#1e5eeb] text-white" : "bg-white text-[#1e5eeb] ring-1 ring-[#1e5eeb]/30"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={`text-sm font-semibold transition-colors duration-300 ${
                          on ? "text-[#0b1a3b]" : "text-slate-500"
                        }`}
                      >
                        {s.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* link to services */}
        <div className="mt-10 flex justify-center lg:justify-end">
          <NavLink
            href="/platform"
            onClick={() => setPop((p) => p + 1)}
            className="group inline-flex rounded-xl bg-[#0b1a3b] text-[15px] font-semibold text-white shadow-[0_12px_28px_-14px_rgba(11,26,59,0.8)] transition-[background-color,translate,scale,box-shadow] duration-700 ease-spring hover:-translate-y-1 hover:scale-[1.06] hover:bg-[#1e5eeb] hover:shadow-[0_20px_36px_-14px_rgba(30,94,235,0.85)] active:scale-[0.92] active:duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e5eeb]"
          >
            <span key={pop} className={`inline-flex items-center gap-2.5 px-6 py-3.5 ${pop > 0 ? "animate-rubber" : ""}`}>
              See all twelve services
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 transition-[translate,scale] duration-700 ease-spring group-hover:translate-x-1.5 group-hover:scale-110">
                <ArrowRight size={14} />
              </span>
            </span>
          </NavLink>
        </div>
      </div>
    </section>
  );
}