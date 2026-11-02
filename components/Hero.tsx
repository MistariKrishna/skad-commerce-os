"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as RPointerEvent,
} from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import NavLink from "./NavLink";
import { hand } from "@/lib/fonts";

const BLUE = "#1e5eeb";
const NAVY = "#0b1a3b";
const PAPER = "#dfe9f9";
const GRID = "#c4d6f2";
const REST = 42; // where the divider settles (%)
const HOLD_MS = 5000; // how long each brand rests before auto-advancing
const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";

/* ---------------- data ---------------- */

type Shape = {
  t: "img" | "text" | "btn" | "nav" | "box" | "dot";
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  lines?: number;
  round?: boolean;
};

type NoteDef = { x: number; y: number; text: string; rot?: number };

export type Demo = {
  name: string;
  idea: string;
  ideaAt: { x: number; y: number };
  shot: string;
  shapes: Shape[];
  notes: NoteDef[];
};

export const demos: Demo[] = [
  {
    name: "Detara",
    idea: "Fine diamonds people can trust online",
    ideaAt: { x: 13, y: 48 },
    shot: "/images/brands/detara-homepage.webp",
    shapes: [
      { t: "box", x: 0, y: 0, w: 100, h: 4.5 },
      { t: "nav", x: 8, y: 13.5, w: 33, h: 3, lines: 5 },
      { t: "box", x: 45.5, y: 12, w: 9, h: 6, label: "logo" },
      { t: "nav", x: 59, y: 13.5, w: 27, h: 3, lines: 4 },
      { t: "dot", x: 88, y: 13.4, w: 2, h: 3.6 },
      { t: "text", x: 4, y: 22.5, w: 19, h: 1.6, lines: 1 },
      { t: "text", x: 4, y: 29, w: 33, h: 32, lines: 3 },
      { t: "text", x: 4, y: 66, w: 27, h: 4, lines: 1 },
      { t: "text", x: 4, y: 73, w: 29, h: 2.4, lines: 1 },
      { t: "btn", x: 4, y: 85, w: 18, h: 7, label: "shop" },
      { t: "btn", x: 23.5, y: 85, w: 22, h: 7, label: "design yours" },
      { t: "img", x: 40, y: 28, w: 57, h: 62 },
    ],
    notes: [
      { x: 56, y: 20, text: "logo centre, menu both sides", rot: -2 },
      { x: 60, y: 46, text: "real product photography", rot: -4 },
      { x: 25, y: 94, text: "two clear actions", rot: -2 },
    ],
  },
  {
    name: "Benavi",
    idea: "Jewellery for every occasion, sold online",
    ideaAt: { x: 14, y: 46 },
    shot: "/images/brands/benavi-homepage.webp",
    shapes: [
      { t: "box", x: 0, y: 0, w: 100, h: 3.7 },
      { t: "box", x: 8.8, y: 6.1, w: 15.5, h: 5, label: "search" },
      { t: "box", x: 44.5, y: 6.2, w: 11.2, h: 4.6, label: "logo" },
      { t: "dot", x: 86.2, y: 7.2, w: 1.5, h: 2.8 },
      { t: "dot", x: 89.5, y: 7.2, w: 1.5, h: 2.8 },
      { t: "nav", x: 16.3, y: 13.5, w: 67.5, h: 3, lines: 7 },
      { t: "box", x: 0, y: 18.1, w: 100, h: 70.3 },
      { t: "img", x: 0, y: 18.1, w: 49.7, h: 70.3 },
      { t: "text", x: 46.5, y: 33.3, w: 27.4, h: 25.4, lines: 2 },
      { t: "text", x: 49.4, y: 62.1, w: 21.5, h: 3, lines: 1 },
      { t: "btn", x: 49.6, y: 69, w: 21.1, h: 7.8, label: "shop now", round: true },
      { t: "img", x: 76.9, y: 37.7, w: 8, h: 36.7 },
      { t: "img", x: 87.1, y: 37.7, w: 8.3, h: 36.7 },
    ],
    notes: [
      { x: 25.5, y: 6.8, text: "search first", rot: -3 },
      { x: 57.5, y: 6.5, text: "logo dead centre", rot: -2 },
      { x: 4, y: 22, text: "festive campaign photo", rot: -3 },
      { x: 51, y: 79.5, text: "one big shop now", rot: -2 },
    ],
  },
  {
    name: "Case Suno",
    idea: "Help people with legal & official problems",
    ideaAt: { x: 28, y: 54 },
    shot: "/images/brands/casesuno-homepage.webp",
    shapes: [
      { t: "box", x: 4, y: 2, w: 92, h: 8 },
      { t: "box", x: 6, y: 3.8, w: 7, h: 4.4, label: "logo" },
      { t: "nav", x: 20, y: 4.6, w: 48, h: 3, lines: 8 },
      { t: "dot", x: 80, y: 4, w: 2.2, h: 4 },
      { t: "btn", x: 84, y: 3.5, w: 11, h: 5, label: "get started" },
      { t: "text", x: 8, y: 17.5, w: 27, h: 2.5, lines: 1 },
      { t: "text", x: 8, y: 24, w: 37, h: 23, lines: 3 },
      { t: "text", x: 8, y: 50, w: 37, h: 9, lines: 3 },
      { t: "nav", x: 8, y: 63, w: 35, h: 3, lines: 3 },
      { t: "nav", x: 8, y: 68, w: 12, h: 3, lines: 1 },
      { t: "btn", x: 8, y: 73.5, w: 17, h: 7.5, label: "chat on WhatsApp" },
      { t: "btn", x: 26, y: 73.5, w: 12, h: 7.5, label: "how it works" },
      { t: "img", x: 52, y: 12, w: 48, h: 88 },
      { t: "box", x: 55, y: 16, w: 13, h: 10, label: "bank notice" },
      { t: "box", x: 48, y: 33, w: 13, h: 12, label: "property" },
      { t: "box", x: 49, y: 50, w: 13, h: 10, label: "court / case" },
      { t: "box", x: 48, y: 67, w: 13, h: 12, label: "family" },
      { t: "box", x: 85, y: 16, w: 13, h: 9, label: "police" },
      { t: "box", x: 85, y: 35, w: 13, h: 12, label: "money" },
      { t: "box", x: 85, y: 59, w: 13, h: 12, label: "vehicle & RTO" },
    ],
    notes: [
      { x: 37, y: 16.5, text: "say it in their words", rot: -3 },
      { x: 63, y: 29, text: "every problem we solve", rot: -6 },
      { x: 62, y: 84, text: "a real person, not stock", rot: -4 },
      { x: 9, y: 85, text: "WhatsApp = easiest first step", rot: -2 },
    ],
  },
];

/* ---------------- finished site ---------------- */

export function SiteLayer({ d, visible, priority }: { d: Demo; visible: boolean; priority: boolean }) {
  return (
    <div
      aria-hidden={!visible}
      className={`absolute inset-0 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <Image
        src={d.shot}
        alt={`${d.name} website, built by SKAD`}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 700px, 100vw"
        className="object-cover object-top"
        draggable={false}
      />
    </div>
  );
}

/* ---------------- sketch ---------------- */

const dash = `0.18cqw dashed ${BLUE}`;

function ShapeEl({ s }: { s: Shape }) {
  const base: CSSProperties = { left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%`, height: `${s.h}%` };

  if (s.t === "img") {
    return (
      <div className="absolute" style={{ ...base, border: dash, borderRadius: "0.8cqw" }}>
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
          <line x1="0" y1="0" x2="100%" y2="100%" stroke={BLUE} strokeOpacity="0.45" strokeWidth="1" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke={BLUE} strokeOpacity="0.45" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (s.t === "box" || s.t === "btn") {
    return (
      <div
        className={`${hand.className} absolute grid place-items-center overflow-hidden text-center`}
        style={{
          ...base,
          border: dash,
          borderRadius: s.round ? "999px" : s.t === "btn" ? "0.6cqw" : "0.8cqw",
          background: s.t === "box" ? "rgba(223,233,249,0.94)" : "transparent",
          color: BLUE,
          fontSize: s.t === "btn" ? "1.8cqw" : "1.7cqw",
          lineHeight: 1,
        }}
      >
        {s.label}
      </div>
    );
  }

  if (s.t === "dot") {
    return <div className="absolute rounded-full" style={{ ...base, border: dash }} />;
  }

  if (s.t === "text") {
    const n = s.lines ?? 1;
    return (
      <div className="absolute flex flex-col justify-between" style={base}>
        {Array.from({ length: n }).map((_, i) => (
          <div
            key={i}
            style={{
              height: `${(100 / n) * 0.62}%`,
              width: n > 1 && i === n - 1 ? "72%" : "100%",
              background: BLUE,
              opacity: 0.38,
              borderRadius: "1cqw",
            }}
          />
        ))}
      </div>
    );
  }

  const n = s.lines ?? 3;
  return (
    <div className="absolute flex items-center justify-between" style={base}>
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          style={{ height: "0.9cqw", width: `${(100 / n) * 0.62}%`, background: BLUE, opacity: 0.38, borderRadius: "1cqw" }}
        />
      ))}
    </div>
  );
}

export function SketchLayer({ d }: { d: Demo }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: PAPER,
        backgroundImage: `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
        backgroundSize: "2.5cqw 2.5cqw",
      }}
    >
      {d.shapes.map((s, i) => (
        <ShapeEl key={i} s={s} />
      ))}

      {/* annotations: too small to read on phones, so only from 640px up */}
      {d.notes.map((n) => (
        <span
          key={n.text}
          className={`${hand.className} pointer-events-none absolute hidden whitespace-nowrap font-medium sm:block`}
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            color: BLUE,
            fontSize: "2.4cqw",
            lineHeight: 1,
            transform: `rotate(${n.rot ?? -3}deg)`,
            textShadow: `0 0 0.6cqw ${PAPER}, 0 0 0.6cqw ${PAPER}, 0 0 0.6cqw ${PAPER}`,
          }}
        >
          {n.text}
        </span>
      ))}

      <div
        className={`${hand.className} pointer-events-none absolute`}
        style={{
          left: `${d.ideaAt.x}%`,
          top: `${d.ideaAt.y}%`,
          width: "max(21cqw, 104px)",
          padding: "max(1.3cqw, 6px) max(1.5cqw, 8px)",
          background: "#fff3b0",
          color: NAVY,
          fontSize: "max(2.3cqw, 11px)",
          lineHeight: 1.1,
          transform: "rotate(-4deg)",
          boxShadow: "0 1cqw 2cqw rgba(11,26,59,0.22)",
        }}
      >
        {d.idea}
      </div>
    </div>
  );
}

/* ---------------- hero ---------------- */

type Box = { x: number; w: number };

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const barRef = useRef<HTMLSpanElement>(null);
  const anim = useRef(0);
  const dragging = useRef(false);
  const touched = useRef(false);
  const inView = useRef(true);
  const nudged = useRef(false);

  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(100);
  const [ready, setReady] = useState(false);
  const [hint, setHint] = useState(true);
  const [swept, setSwept] = useState(false);
  const [auto, setAuto] = useState(true);
  const [pop, setPop] = useState(0);
  const [tab, setTab] = useState<Box | null>(null);
  const [tabAnim, setTabAnim] = useState(false);

  /* the wipe: all state updates happen inside animation frames, never synchronously */
  const sweep = useCallback((delay: number) => {
    cancelAnimationFrame(anim.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = 100;
    const duration = 1500;
    const start = performance.now() + delay;
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    let first = true;
    const tick = (now: number) => {
      if (first) {
        first = false;
        setSwept(false);
      }
      if (reduce) {
        setPos(REST);
        setSwept(true);
        return;
      }
      const p = Math.min(Math.max((now - start) / duration, 0), 1);
      setPos(from + (REST - from) * ease(p));
      if (p < 1) anim.current = requestAnimationFrame(tick);
      else setSwept(true);
    };
    anim.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const r = requestAnimationFrame(() => setReady(true));
    sweep(700);
    return () => {
      cancelAnimationFrame(r);
      cancelAnimationFrame(anim.current);
    };
  }, [sweep]);

  /* pause auto-advance when the hero is off screen */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      inView.current = entries.some((e) => e.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* one-time handle nudge after the first sweep */
  useEffect(() => {
    if (!swept || nudged.current || touched.current) return;
    nudged.current = true;
    const h = handleRef.current;
    if (!h || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = h.animate(
      [
        { translate: "0 0" },
        { translate: "-10px 0" },
        { translate: "10px 0" },
        { translate: "-6px 0" },
        { translate: "4px 0" },
        { translate: "0 0" },
      ],
      { duration: 1100, delay: 300, easing: "ease-in-out" }
    );
    return () => a.cancel();
  }, [swept]);

  /* auto-advance to the next brand after each sweep */
  useEffect(() => {
    if (!swept || !auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bar = barRef.current; // captured once, used in cleanup
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      if (inView.current && !document.hidden && !dragging.current) acc += dt;
      const b = barRef.current;
      if (b) b.style.width = `${Math.min(100, (acc / HOLD_MS) * 100)}%`;
      if (acc >= HOLD_MS) {
        setActive((a) => (a + 1) % demos.length);
        setPos(100);
        sweep(0);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (bar) bar.style.width = "0%";
    };
  }, [swept, auto, active, sweep]);

  /* sliding tab pill */
  useEffect(() => {
    const measure = () => {
      const b = tabRefs.current[active];
      if (!b) return;
      setTab({ x: b.offsetLeft, w: b.offsetWidth });
      requestAnimationFrame(() => setTabAnim(true));
    };
    const r = requestAnimationFrame(measure);
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(r);
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  const takeOver = () => {
    touched.current = true;
    setAuto(false);
    setHint(false);
  };

  const choose = (i: number) => {
    takeOver();
    if (i === active) return;
    setActive(i);
    setPos(100);
    sweep(0);
  };

  const setFromX = (x: number) => {
    const el = canvasRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  };

  const onPointerDown = (e: RPointerEvent<HTMLDivElement>) => {
    cancelAnimationFrame(anim.current);
    setSwept(true);
    takeOver();
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromX(e.clientX);
  };

  const onPointerMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromX(e.clientX);
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 15 : 5;
    let next: number | null = null;
    if (e.key === "ArrowLeft") next = pos - step;
    if (e.key === "ArrowRight") next = pos + step;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    cancelAnimationFrame(anim.current);
    setSwept(true);
    takeOver();
    setPos(Math.min(100, Math.max(0, next)));
  };

  const demo = demos[active];

  // staggered entrance
  const enter = (delay: number) => ({
    className: `transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
      ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    }`,
    style: { transitionDelay: `${delay}ms` } as CSSProperties,
  });

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden bg-[#ccd9ee] pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
      {/* blueprint grid, fading out at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,94,235,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 75% 70% at 60% 45%, #000 35%, transparent 80%)",
        }}
      />

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
        {/* ---------- copy ---------- */}
        <div className="lg:col-span-5">
          <h1
            {...enter(0)}
            className={`${enter(0).className} text-balance text-[2.5rem] font-bold leading-[1.04] tracking-[-0.03em] text-[#0b1a3b] sm:text-[3.3rem] lg:text-[3.4rem] xl:text-[3.8rem]`}
          >
            You bring the idea. We build the brand, the store and the sales.
          </h1>
          <p {...enter(120)} className={`${enter(120).className} mt-6 max-w-md text-[17px] leading-relaxed text-slate-600`}>
            SKAD CommerceOS is a commerce services team. We’ve taken brands from first sketch to a running business,
            for founders, D2C brands and traditional businesses.
          </p>

          <div {...enter(240)} className={`${enter(240).className} mt-8 flex flex-wrap items-center gap-x-6 gap-y-4`}>
            <NavLink
              href="/enquire"
              onClick={() => setPop((v) => v + 1)}
              className="group inline-flex rounded-xl bg-[#1e5eeb] text-[15px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(30,94,235,0.85)] transition-[background-color,translate,scale,box-shadow] duration-700 ease-spring hover:-translate-y-1 hover:scale-[1.05] hover:bg-[#164bc2] hover:shadow-[0_20px_36px_-14px_rgba(30,94,235,0.9)] active:scale-[0.94] active:duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e5eeb]"
            >
              <span key={pop} className={`inline-flex items-center gap-2.5 px-6 py-3.5 ${pop > 0 ? "animate-rubber" : ""}`}>
                Tell us your idea
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-[translate,scale] duration-700 ease-spring group-hover:translate-x-1.5 group-hover:scale-110">
                  <ArrowRight size={14} />
                </span>
              </span>
            </NavLink>
            <NavLink
              href="/built-on"
              className="text-[15px] font-semibold text-[#0b1a3b] underline decoration-[#1e5eeb]/40 decoration-2 underline-offset-[6px] transition-colors hover:decoration-[#1e5eeb]"
            >
              See our work
            </NavLink>
          </div>

          <p {...enter(340)} className={`${enter(340).className} mt-8 text-sm text-slate-600`}>
            No obligation, just a conversation.
          </p>
        </div>

        {/* ---------- idea → website canvas ---------- */}
        <div {...enter(180)} className={`${enter(180).className} min-w-0 lg:col-span-7`}>
          <div className="mb-3 flex items-end justify-between px-1">
            <span className={`${hand.className} text-2xl leading-none text-[#1e5eeb]`}>the idea</span>
            <span className="text-sm font-medium text-[#0b1a3b]">the brand we built</span>
          </div>

          <div
            ref={canvasRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
            className="@container relative aspect-video w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl bg-[#0b1a3b] shadow-[0_30px_60px_-30px_rgba(11,26,59,0.5)] ring-1 ring-[#0b1a3b]/10"
          >
            {demos.map((d, i) => (
              <SiteLayer key={d.name} d={d} visible={i === active} priority={i === 0} />
            ))}

            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <SketchLayer d={demo} />
            </div>

            {/* divider */}
            <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
              <div className="absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(30,94,235,0.35),0_0_18px_rgba(11,26,59,0.35)]" />
              <div
                ref={handleRef}
                role="slider"
                tabIndex={0}
                aria-label="Compare the first sketch with the finished website"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                onKeyDown={onKeyDown}
                className="pointer-events-auto absolute left-0 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1e5eeb] shadow-[0_6px_20px_-6px_rgba(11,26,59,0.5)] ring-1 ring-[#1e5eeb]/25 transition-[scale] duration-500 ease-spring hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e5eeb]"
              >
                <ChevronLeft size={14} />
                <ChevronRight size={14} />
              </div>
              <span
                className={`${hand.className} absolute left-4 top-[calc(50%+26px)] whitespace-nowrap rounded bg-white/85 px-1.5 text-lg text-[#1e5eeb] transition-opacity duration-500 sm:text-xl ${
                  hint && swept ? "opacity-100" : "opacity-0"
                }`}
                style={{ transform: "rotate(-6deg)" }}
              >
                drag to compare
              </span>
            </div>
          </div>

          {/* brand tabs with sliding pill + auto-advance progress */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div
              role="group"
              aria-label="Choose a brand"
              className="relative flex w-fit items-center gap-1 rounded-full bg-white/70 p-1 shadow-[0_4px_14px_-8px_rgba(11,26,59,0.3)] ring-1 ring-[#0b1a3b]/5 backdrop-blur"
            >
              {tab && (
                <span
                  aria-hidden
                  className="absolute inset-y-1 left-0 overflow-hidden rounded-full bg-[#0b1a3b] shadow-[0_6px_14px_-8px_rgba(11,26,59,0.8)]"
                  style={{
                    width: tab.w,
                    transform: `translateX(${tab.x}px)`,
                    transition: tabAnim ? `transform 0.55s ${SPRING}, width 0.55s ${SPRING}` : "none",
                  }}
                >
                  {auto && (
                    <span className="absolute inset-x-3 bottom-1 h-[2px] overflow-hidden rounded-full bg-white/15">
                      <span ref={barRef} className="absolute inset-y-0 left-0 w-0 rounded-full bg-[#7cc4f5]" />
                    </span>
                  )}
                </span>
              )}
              {demos.map((d, i) => (
                <button
                  key={d.name}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => choose(i)}
                  className={`relative z-10 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    active === i ? "text-white" : "text-slate-600 hover:text-[#0b1a3b]"
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-600">Live websites made by SKAD CommerceOS teams.</p>
          </div>
        </div>
      </div>
    </section>
  );
}