"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { ArrowRight, Briefcase, Factory, Gem, ShoppingBag, type LucideIcon } from "lucide-react";
import NavLink from "./NavLink";
import Reveal from "./Reveal";
import { hand } from "@/lib/fonts";

const SKY = "#7cc4f5";
const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";
const DURATION = 7000;
const RING_R = 27;
const RING_C = 2 * Math.PI * RING_R;

type Solution = {
  business: string; // must match a businessType in Enquire.tsx
  icon: LucideIcon;
  short: string;
  eyebrow: string;
  title: string;
  text: string;
  pains: string[];
  services: string[];
  cta: string;
  art: string[];
};

const solutions: Solution[] = [
  {
    business: "D2C brand",
    icon: ShoppingBag,
    short: "D2C",
    eyebrow: "For founders and growing brands",
    title: "D2C brands",
    text: "Launch without hiring ten agencies, then grow with SEO, CRM and automation working from the same data.",
    pains: ["too many agencies, no one in charge", "ads bring buyers, but they don’t come back"],
    services: ["Brand Infrastructure", "E-commerce", "Marketing", "CRM"],
    cta: "Start as a D2C brand",
    art: [
      "M60 30 h80 a12 12 0 0 1 12 12 v116 a12 12 0 0 1 -12 12 h-80 a12 12 0 0 1 -12 -12 v-116 a12 12 0 0 1 12 -12 z",
      "M66 56 h30 v30 h-30 z",
      "M104 56 h30 v30 h-30 z",
      "M66 94 h30 v30 h-30 z",
      "M104 94 h30 v30 h-30 z",
      "M84 144 h32",
      "M130 150 l30 -12 l30 12 v34 l-30 12 l-30 -12 z",
      "M130 150 l30 12 l30 -12",
      "M160 162 v34",
    ],
  },
  {
    business: "Manufacturer / exporter",
    icon: Factory,
    short: "Makers",
    eyebrow: "For makers and traders",
    title: "Manufacturers & exporters",
    text: "Take a proven product range online, with B2B ordering, direct-to-consumer channels and international trade in one place.",
    pains: ["great product, no online presence", "orders still arrive by email and phone"],
    services: ["E-commerce", "Content", "Operations", "Automation"],
    cta: "Start as a manufacturer",
    art: [
      "M14 172 h112",
      "M20 172 v-60 l28 20 v-20 l28 20 v-20 l28 20 v60",
      "M88 118 v-44 h14 v52",
      "M110 96 C 120 64, 142 62, 156 100",
      "M146 94 l10 8 l3 -12",
      "M132 140 a28 28 0 1 0 56 0 a28 28 0 1 0 -56 0",
      "M160 112 c -14 14, -14 42, 0 56",
      "M160 112 c 14 14, 14 42, 0 56",
      "M132 140 h56",
    ],
  },
  {
    business: "Jeweller",
    icon: Gem,
    short: "Jewellers",
    eyebrow: "For jewellers",
    title: "Jewellery & diamonds",
    text: "Catalogue, content and storefronts made for high-value, considered purchases, where trust comes before the sale.",
    pains: ["photos don’t show the sparkle", "buyers need trust before they pay"],
    services: ["Content", "E-commerce", "Brand Infrastructure", "Marketing"],
    cta: "Start as a jeweller",
    art: [
      "M40 80 l30 -32 h60 l30 32 l-60 80 z",
      "M40 80 h120",
      "M70 48 l20 32 l10 80",
      "M130 48 l-20 32 l-10 80",
      "M90 80 l10 -32 l10 32",
      "M172 22 v22 M161 33 h22",
      "M28 148 v16 M20 156 h16",
    ],
  },
  {
    business: "Service business",
    icon: Briefcase,
    short: "Services",
    eyebrow: "For advisers and service firms",
    title: "Service businesses",
    text: "Turn expertise into a findable, bookable service, with leads captured, followed up and measured automatically.",
    pains: ["hard to find on Google", "leads slip through the cracks"],
    services: ["SEO/GEO", "CRM", "Automation", "Analytics"],
    cta: "Start as a service business",
    art: [
      "M30 50 h100 a10 10 0 0 1 10 10 v80 a10 10 0 0 1 -10 10 h-100 a10 10 0 0 1 -10 -10 v-80 a10 10 0 0 1 10 -10 z",
      "M20 78 h120",
      "M55 40 v20",
      "M105 40 v20",
      "M58 112 l14 14 l28 -28",
      "M120 140 h56 a10 10 0 0 1 10 10 v26 a10 10 0 0 1 -10 10 h-30 l-14 12 v-12 h-12 a10 10 0 0 1 -10 -10 v-26 a10 10 0 0 1 10 -10 z",
      "M138 160 h30",
      "M138 170 h20",
    ],
  },
];

const n = solutions.length;
const GRID_BG = {
  backgroundImage:
    "linear-gradient(rgba(124,196,245,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,196,245,0.08) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const pickBusiness = (biz: string) => {
  try {
    sessionStorage.setItem("skad-business", biz);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent("skad:business", { detail: biz }));
};

/* line drawing that redraws itself each time it mounts */
function Art({ paths }: { paths: string[] }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anims = Array.from(svg.querySelectorAll("path")).map((p, k) =>
      p.animate([{ strokeDashoffset: "1" }, { strokeDashoffset: "0" }], {
        duration: 1000,
        delay: 250 + k * 100,
        easing: "cubic-bezier(0.65,0,0.35,1)",
        fill: "both",
      })
    );
    return () => anims.forEach((a) => a.cancel());
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 200 200" className="h-full w-full" fill="none" aria-hidden>
      {paths.map((d, k) => (
        <path
          key={k}
          d={d}
          stroke={SKY}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="0"
        />
      ))}
    </svg>
  );
}

function StartButton({ s, full = false }: { s: Solution; full?: boolean }) {
  return (
    <NavLink
      href="/enquire"
      onClick={() => pickBusiness(s.business)}
      className={`group items-center gap-2.5 rounded-xl bg-white px-5 py-3.5 text-[15px] font-semibold text-[#0b1a3b] transition-[translate,scale,background-color] duration-700 ease-spring hover:-translate-y-0.5 hover:scale-[1.04] hover:bg-[#dbeafe] active:scale-95 active:duration-100 ${
        full ? "flex w-full justify-center" : "inline-flex"
      }`}
    >
      {s.cta}
      <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0b1a3b] text-white transition-[translate] duration-700 ease-spring group-hover:translate-x-1">
        <ArrowRight size={13} />
      </span>
    </NavLink>
  );
}

function Pains({ items, baseDelay = 300 }: { items: string[]; baseDelay?: number }) {
  return (
    <>
      <p className={`${hand.className} text-[22px] leading-none`} style={{ color: SKY }}>
        sounds familiar?
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((p, k) => (
          <li
            key={p}
            className={`${hand.className} animate-step-in -rotate-1 text-[22px] leading-snug text-white`}
            style={{ animationDelay: `${baseDelay + k * 160}ms` }}
          >
            “{p}”
          </li>
        ))}
      </ul>
    </>
  );
}

function Services({ items, baseDelay = 450 }: { items: string[]; baseDelay?: number }) {
  return (
    <>
      <p className="text-sm font-semibold text-white">What we’ll bring</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((sv, k) => (
          <span
            key={sv}
            className="animate-step-in rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-medium text-white ring-1 ring-white/15"
            style={{ animationDelay: `${baseDelay + k * 70}ms` }}
          >
            {sv}
          </span>
        ))}
      </div>
    </>
  );
}

type Box = { x: number; y: number; w: number; h: number };

export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // auto-rotation state
  const inViewRef = useRef(false);
  const hoverRef = useRef(false);
  const touchedUntil = useRef(0);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ringRefs = useRef<(SVGCircleElement | null)[]>([]);
  const touchX = useRef<number | null>(null);
  const [mHint, setMHint] = useState(true);

  // desktop sliding highlight
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const measuredOnce = useRef(false);
  const [box, setBox] = useState<Box | null>(null);
  const [animateBox, setAnimateBox] = useState(false);

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

  // auto-advance + progress (desktop bar, mobile ring)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const paint = () => {
      const p = Math.min(1, acc / DURATION);
      barRefs.current.forEach((b, i) => {
        if (b) b.style.width = i === active ? `${p * 100}%` : "0%";
      });
      ringRefs.current.forEach((c, i) => {
        if (c) c.style.strokeDashoffset = String(i === active ? (1 - p) * RING_C : RING_C);
      });
    };
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const paused = reduce || hoverRef.current || !inViewRef.current || Date.now() < touchedUntil.current;
      if (!paused) acc += dt;
      paint();
      if (acc >= DURATION) {
        setActive((a) => (a + 1) % n);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  // desktop highlight position
  useEffect(() => {
    const measure = () => {
      const b = btnRefs.current[active];
      if (!b || b.offsetParent === null) return;
      setBox({ x: b.offsetLeft, y: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight });
      if (!measuredOnce.current) {
        measuredOnce.current = true;
        requestAnimationFrame(() => setAnimateBox(true));
      }
    };
    const r = requestAnimationFrame(measure);
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(r);
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  const markTouched = () => {
    touchedUntil.current = Date.now() + 10000;
    setMHint(false);
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    markTouched();
    touchX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const start = touchX.current;
    const end = e.changedTouches[0]?.clientX;
    touchX.current = null;
    if (start === null || end === undefined) return;
    const dx = end - start;
    if (Math.abs(dx) < 45) return;
    setActive((a) => (dx < 0 ? (a + 1) % n : (a - 1 + n) % n));
  };

  const s = solutions[active];
  const Icon = s.icon;

  return (
    <section id="solutions" ref={sectionRef} className="overflow-hidden bg-[#e3eaf6] py-24 lg:py-32">
      <div className="wrap">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="text-balance text-[2.2rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#0b1a3b] sm:text-[2.75rem] lg:col-span-7">
              Built around the way your business works.
            </h2>
            <p className="max-w-md text-[16px] leading-relaxed text-slate-600 lg:col-span-5">
              Pick the one that sounds like you. We’ll bring the services that matter to it.
            </p>
          </div>
        </Reveal>

        {/* =================== MOBILE / TABLET =================== */}
        <div className="lg:hidden">
          {/* icon selector with timer rings */}
          <div role="group" aria-label="Choose your type of business" className="mt-10 flex items-start justify-between gap-2">
            {solutions.map((item, i) => {
              const on = i === active;
              const ItemIcon = item.icon;
              return (
                <button
                  key={item.title}
                  type="button"
                  aria-pressed={on}
                  aria-label={item.title}
                  onClick={() => {
                    markTouched();
                    setActive(i);
                  }}
                  className="flex flex-1 flex-col items-center gap-2 outline-none"
                >
                  <span className="relative grid h-[60px] w-[60px] place-items-center">
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 60 60" aria-hidden>
                      <circle cx="30" cy="30" r={RING_R} fill="none" stroke="#1e5eeb" strokeOpacity="0.14" strokeWidth="3" />
                      <circle
                        ref={(el) => {
                          ringRefs.current[i] = el;
                        }}
                        cx="30"
                        cy="30"
                        r={RING_R}
                        fill="none"
                        stroke="#1e5eeb"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={RING_C}
                        strokeDashoffset={RING_C}
                      />
                    </svg>
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-full transition-[background-color,color,scale] duration-500 ease-spring ${
                        on ? "scale-100 bg-[#0b1a3b] text-white" : "scale-90 bg-white text-[#1e5eeb] ring-1 ring-[#1e5eeb]/15"
                      }`}
                    >
                      <ItemIcon size={19} />
                    </span>
                  </span>
                  <span
                    className={`text-center text-[12px] font-semibold leading-tight transition-colors duration-300 ${
                      on ? "text-[#0b1a3b]" : "text-slate-500"
                    }`}
                  >
                    {item.short}
                  </span>
                </button>
              );
            })}
          </div>

          {/* stacked cards: same footprint, so the page never jumps */}
          <div className="mt-6 grid" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {solutions.map((item, i) => {
              const on = i === active;
              const ItemIcon = item.icon;
              const offset = i < active ? -28 : 28;
              return (
                <article
                  key={item.title}
                  aria-hidden={!on}
                  className="overflow-hidden rounded-3xl bg-[#0b1a3b] text-white shadow-[0_30px_60px_-35px_rgba(11,26,59,0.75)]"
                  style={{
                    gridArea: "1 / 1",
                    opacity: on ? 1 : 0,
                    translate: on ? "0 0" : `${offset}px 0`,
                    scale: on ? "1" : "0.97",
                    visibility: on ? "visible" : "hidden",
                    pointerEvents: on ? "auto" : "none",
                    transition: `opacity 0.45s ease, translate 0.6s ${SPRING}, scale 0.6s ${SPRING}, visibility 0s linear ${on ? "0s" : "0.45s"}`,
                  }}
                >
                  {/* header band with drawing */}
                  <div className="relative flex h-40 items-center justify-center border-b border-dashed border-white/15" style={GRID_BG}>
                    <span className="absolute left-5 top-4 text-xs font-semibold tabular-nums text-white/60">
                      {i + 1} / {n}
                    </span>
                    <span
                      className={`${hand.className} absolute right-5 top-3 text-[19px] transition-opacity duration-500 ${
                        mHint ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ color: SKY }}
                    >
                      swipe for more
                    </span>
                    <div className="h-28 w-28">{on && <Art key={`m${active}`} paths={item.art} />}</div>
                  </div>

                  {/* body */}
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10">
                        <ItemIcon size={18} />
                      </span>
                      <p className="text-[13px] text-white/65">{item.eyebrow}</p>
                    </div>
                    <h3 className="mt-3 text-[1.85rem] font-bold leading-[1.08] tracking-[-0.03em]">{item.title}</h3>
                    <p className="mt-3 text-[15.5px] leading-relaxed text-white/80">{item.text}</p>

                    <div className="mt-6">{on && <Pains key={`p${active}`} items={item.pains} />}</div>

                    <div className="mt-6 border-t border-dashed border-white/15 pt-5">
                      {on && <Services key={`s${active}`} items={item.services} />}
                    </div>

                    <div className="mt-7">
                      <StartButton s={item} full />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            Not quite any of these?{" "}
            <NavLink
              href="/enquire"
              className="font-semibold text-[#1e5eeb] underline decoration-[#1e5eeb]/30 underline-offset-4"
            >
              Tell us about yours
            </NavLink>
          </p>
        </div>

        {/* ======================= DESKTOP ======================= */}
        <div
          className="hidden lg:block"
          onMouseEnter={() => {
            hoverRef.current = true;
          }}
          onMouseLeave={() => {
            hoverRef.current = false;
          }}
        >
          {/* selector */}
          <div
            role="group"
            aria-label="Choose your type of business"
            className="relative mt-12 grid grid-cols-4 gap-1.5 rounded-2xl bg-white p-1.5 shadow-[0_20px_40px_-30px_rgba(11,26,59,0.4)] ring-1 ring-[#0b1a3b]/6"
          >
            {box && (
              <span
                aria-hidden
                className="absolute left-0 top-0 rounded-xl bg-[#0b1a3b] shadow-[0_12px_24px_-12px_rgba(11,26,59,0.7)]"
                style={{
                  width: box.w,
                  height: box.h,
                  transform: `translate(${box.x}px, ${box.y}px)`,
                  transition: animateBox
                    ? `transform 0.55s ${SPRING}, width 0.55s ${SPRING}, height 0.55s ${SPRING}`
                    : "none",
                }}
              />
            )}
            {solutions.map((item, i) => {
              const on = i === active;
              const ItemIcon = item.icon;
              return (
                <button
                  key={item.title}
                  ref={(el) => {
                    btnRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`group relative z-10 flex items-center gap-3 rounded-xl p-4 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#1e5eeb] ${
                    on ? "" : "hover:bg-[#f4f8ff]"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-[background-color,color,scale,rotate] duration-500 ease-spring ${
                      on ? "bg-white/10 text-white" : "bg-[#eef3fb] text-[#1e5eeb] group-hover:-rotate-6 group-hover:scale-110"
                    }`}
                  >
                    <ItemIcon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-base font-bold leading-tight tracking-[-0.01em] transition-colors duration-300 ${
                        on ? "text-white" : "text-[#0b1a3b]"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className={`mt-0.5 block text-xs transition-colors duration-300 ${on ? "text-white/60" : "text-slate-500"}`}>
                      {item.eyebrow}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`absolute inset-x-4 bottom-1.5 h-[2px] overflow-hidden rounded-full transition-opacity duration-300 ${
                      on ? "bg-white/15 opacity-100" : "opacity-0"
                    }`}
                  >
                    <span
                      ref={(el) => {
                        barRefs.current[i] = el;
                      }}
                      className="absolute inset-y-0 left-0 w-0 rounded-full bg-[#7cc4f5]"
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* detail panel */}
          <div className="relative mt-3 overflow-hidden rounded-2xl bg-[#0b1a3b] text-white shadow-[0_40px_70px_-40px_rgba(11,26,59,0.7)]" style={GRID_BG}>
            <div key={active} className="grid grid-cols-[1.15fr_1fr_190px] gap-12 p-11">
              <div className="animate-step-in">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
                  <Icon size={20} />
                </span>
                <p className="mt-5 text-sm text-white/65">{s.eyebrow}</p>
                <h3 className="mt-1 text-[2.4rem] font-bold leading-[1.05] tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/80">{s.text}</p>
                <div className="mt-7">
                  <StartButton s={s} />
                </div>
              </div>

              <div className="animate-step-in" style={{ animationDelay: "120ms" }}>
                <Pains items={s.pains} />
                <div className="mt-8 border-t border-dashed border-white/15 pt-6">
                  <Services items={s.services} />
                </div>
              </div>

              <div className="flex items-center">
                <Art paths={s.art} />
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            Not quite any of these? Most businesses are a mix.{" "}
            <NavLink
              href="/enquire"
              className="font-semibold text-[#1e5eeb] underline decoration-[#1e5eeb]/30 underline-offset-4 hover:decoration-[#1e5eeb]"
            >
              Tell us about yours
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
}