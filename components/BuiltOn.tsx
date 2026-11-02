"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import NavLink from "./NavLink";
import Reveal from "./Reveal";
import { hand } from "@/lib/fonts";

const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";
const DURATION = 6000;
const M_GAP = 16; // px gap between mobile cards

type Project = {
  name: string;
  category: string;
  shot: string;
  address: string;
  built: string[];
  note: { text: string; x: number; y: number; rot: number };
};

// Only list features that are visible on each live site.
const projects: Project[] = [
  {
    name: "Detara",
    category: "Fine diamond jewellery",
    shot: "/images/brands/detara-homepage.webp",
    address: "detara",
    built: ["Luxury storefront", "Design-your-own jewellery flow", "Multi-currency pricing"],
    note: { text: "design-your-own, built in", x: 50, y: 74, rot: -4 },
  },
  {
    name: "Benavi",
    category: "Silver jewellery",
    shot: "/images/brands/benavi-homepage.webp",
    address: "benavi.in",
    built: ["Storefront with campaign banners", "Shop by occasion, theme and colour", "Search and account"],
    note: { text: "browse by occasion, theme, colour", x: 46, y: 24, rot: -3 },
  },
  {
    name: "Case Suno",
    category: "Case advisor platform",
    shot: "/images/brands/casesuno-homepage.webp",
    address: "casesuno",
    built: ["Service website", "WhatsApp-first enquiries", "Request tracking for clients"],
    note: { text: "WhatsApp first", x: 27, y: 88, rot: -4 },
  },
];

const n = projects.length;

const deckPose = (k: number, fan: boolean) => {
  if (k === 0) return { transform: "translateY(0) scale(1) rotate(0deg)", z: 30, dim: 0 };
  if (k === 1)
    return { transform: `translateY(${fan ? -48 : -30}px) scale(0.93) rotate(${fan ? -2.6 : -1.8}deg)`, z: 20, dim: 0.35 };
  return { transform: `translateY(${fan ? -92 : -58}px) scale(0.86) rotate(${fan ? 2.6 : 1.8}deg)`, z: 10, dim: 0.55 };
};

function Chrome({ address, action }: { address: string; action?: boolean }) {
  return (
    <div className="flex h-9 items-center gap-1.5 border-b border-slate-200/80 bg-[#f6f8fc] px-3.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <span className="mx-auto flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] text-slate-500 ring-1 ring-slate-200">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {address}
      </span>
      {action ? (
        <span className="rounded-full bg-[#1e5eeb] px-2.5 py-0.5 text-[10.5px] font-semibold text-white shadow-[0_4px_10px_-4px_rgba(30,94,235,0.8)]">
          Click to view
        </span>
      ) : (
        <span className="w-12" />
      )}
    </div>
  );
}

function BuiltChips({ items, small = false }: { items: string[]; small?: boolean }) {
  return (
    <span className="mt-2.5 flex flex-wrap gap-2">
      {items.map((b) => (
        <span
          key={b}
          className={`inline-flex items-center gap-1.5 rounded-full bg-[#eef3fb] text-[#0b1a3b] ring-1 ring-[#1e5eeb]/15 ${
            small ? "px-2.5 py-1 text-[12px]" : "px-3 py-1.5 text-[13px]"
          }`}
        >
          <Check size={12} className="text-[#1e5eeb]" />
          {b}
        </span>
      ))}
    </span>
  );
}

export default function BuiltOn() {
  const sectionRef = useRef<HTMLElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hoverRef = useRef(false);
  const inViewRef = useRef(false);
  const introDone = useRef(false);
  const [active, setActive] = useState(0);
  const [pop, setPop] = useState(0);

  // discoverability cues
  const [fanIntro, setFanIntro] = useState(false);
  const [fanHover, setFanHover] = useState(false);
  const [hint, setHint] = useState(true);
  const [mHint, setMHint] = useState(true);

  // mobile carousel
  const scrollerRef = useRef<HTMLDivElement>(null);
  const mActiveRef = useRef(0);
  const touchedUntil = useRef(0);
  const [mActive, setMActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.some((e) => e.isIntersecting);
        inViewRef.current = vis;
        if (!vis || introDone.current) return;
        introDone.current = true;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;
        if (window.matchMedia("(min-width: 1024px)").matches) {
          // desktop: fan the deck out once, then settle
          timers.push(window.setTimeout(() => setFanIntro(true), 600));
          timers.push(window.setTimeout(() => setFanIntro(false), 1900));
        } else {
          // mobile: nudge the carousel sideways once
          const s = scrollerRef.current;
          if (!s) return;
          timers.push(
            window.setTimeout(() => {
              if (Date.now() < touchedUntil.current) return;
              s.scrollTo({ left: 80, behavior: "smooth" });
            }, 700)
          );
          timers.push(
            window.setTimeout(() => {
              if (Date.now() < touchedUntil.current) return;
              s.scrollTo({ left: 0, behavior: "smooth" });
            }, 1350)
          );
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  /* ---------- desktop: auto-advance with live progress bar ---------- */
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    barRefs.current.forEach((b) => {
      if (b) b.style.width = "0%";
    });
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      if (desktop && !hoverRef.current && inViewRef.current) acc += dt;
      const bar = barRefs.current[active];
      if (bar) bar.style.width = `${Math.min(100, (acc / DURATION) * 100)}%`;
      if (acc >= DURATION) {
        setActive((a) => (a + 1) % n);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const choose = (i: number) => {
    setHint(false);
    if (i !== active) setActive(i);
  };

  /* ---------- mobile: swipe carousel ---------- */
  const cardStep = () => {
    const el = scrollerRef.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth + M_GAP : 1;
  };

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * cardStep(), behavior: "smooth" });
  };

  const onMobileScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const i = Math.min(n - 1, Math.max(0, Math.round(el.scrollLeft / cardStep())));
    if (i !== mActiveRef.current) {
      mActiveRef.current = i;
      setMActive(i);
    }
  };

  const markTouched = () => {
    touchedUntil.current = Date.now() + 9000;
    setMHint(false);
  };

   useEffect(() => {
    const id = window.setInterval(() => {
      if (window.matchMedia("(min-width: 1024px)").matches) return;
      if (!inViewRef.current || Date.now() < touchedUntil.current) return;
      const el = scrollerRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>("[data-card]");
      const step = card ? card.offsetWidth + M_GAP : 1;
      el.scrollTo({ left: ((mActiveRef.current + 1) % n) * step, behavior: "smooth" });
    }, DURATION);
    return () => window.clearInterval(id);
  }, []);

  const current = projects[active];
  const fan = fanIntro || fanHover;

  const ctaButton = (full: boolean) => (
    <NavLink
      href="/enquire"
      onClick={() => setPop((v) => v + 1)}
      className={`group rounded-xl bg-[#0b1a3b] text-[15px] font-semibold text-white shadow-[0_12px_28px_-14px_rgba(11,26,59,0.8)] transition-[background-color,translate,scale,box-shadow] duration-700 ease-spring hover:-translate-y-1 hover:scale-[1.05] hover:bg-[#1e5eeb] hover:shadow-[0_20px_36px_-14px_rgba(30,94,235,0.85)] active:scale-[0.94] active:duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e5eeb] ${
        full ? "flex w-full justify-center" : "inline-flex"
      }`}
    >
      <span key={pop} className={`inline-flex items-center gap-2.5 px-6 py-3.5 ${pop > 0 ? "animate-rubber" : ""}`}>
        Start a project like these
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 transition-[translate,scale] duration-700 ease-spring group-hover:translate-x-1.5 group-hover:scale-110">
          <ArrowRight size={14} />
        </span>
      </span>
    </NavLink>
  );

  return (
    <section id="built-on" ref={sectionRef} className="overflow-hidden bg-white py-24 lg:py-32">
      <div className="wrap">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="text-balance text-[2.2rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#0b1a3b] sm:text-[2.75rem] lg:col-span-7">
              Real brands, real work.
            </h2>
            <p className="max-w-md text-[16px] leading-relaxed text-slate-600 lg:col-span-5">
              Live websites built on CommerceOS, running today. Each one started as a brief, just like yours.
            </p>
          </div>
        </Reveal>

        {/* =============== MOBILE / TABLET: swipe carousel =============== */}
        <div className="mt-10 lg:hidden">
          {/* swipe cue */}
          <div className="mb-3 flex items-end justify-between px-0.5">
            <span className="text-sm font-medium tabular-nums text-slate-500">
              {mActive + 1} / {n}
            </span>
            <span
              className={`${hand.className} flex items-center gap-1.5 text-[21px] leading-none text-[#1e5eeb] transition-opacity duration-500 ${
                mHint ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!mHint}
            >
              swipe to see all {n}
              <svg width="34" height="16" viewBox="0 0 34 16" fill="none" aria-hidden>
                <path d="M2 9 C 10 4, 20 4, 30 8" stroke="#1e5eeb" strokeWidth="2" strokeLinecap="round" />
                <path d="M24 3 L31 8 L24 13" stroke="#1e5eeb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div
            ref={scrollerRef}
            onScroll={onMobileScroll}
            onTouchStart={markTouched}
            onPointerDown={markTouched}
            className="-mx-6 flex snap-x snap-mandatory overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ gap: M_GAP, scrollPaddingInline: "1.5rem" }}
          >
            {projects.map((p, i) => {
              const on = i === mActive;
              return (
                <article
                  key={p.name}
                  data-card
                  className="w-[84vw] max-w-[440px] shrink-0 snap-center"
                  style={{
                    transform: `scale(${on ? 1 : 0.94})`,
                    opacity: on ? 1 : 0.6,
                    transition: `transform 0.6s ${SPRING}, opacity 0.4s ease`,
                  }}
                >
                  <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_48px_-28px_rgba(11,26,59,0.55)] ring-1 ring-[#0b1a3b]/10">
                    <Chrome address={p.address} />
                    <div className="relative aspect-[16/10]">
                      <Image src={p.shot} alt={`${p.name} website`} fill sizes="84vw" className="object-cover object-top" />
                    </div>
                  </div>

                  <p className={`${hand.className} mt-3 -rotate-1 px-1 text-[21px] leading-tight text-[#1e5eeb]`}>
                    {p.note.text}
                  </p>

                  <div className="mt-3 px-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-2xl font-bold tracking-[-0.03em] text-[#0b1a3b]">{p.name}</h3>
                      <span className="text-[13px] text-slate-500">{p.category}</span>
                    </div>
                    <BuiltChips items={p.built} small />
                  </div>
                </article>
              );
            })}
            <span aria-hidden className="w-1 shrink-0" />
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  markTouched();
                  goTo(i);
                }}
                aria-label={`Show ${p.name}`}
                className="grid h-6 place-items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    i === mActive ? "w-7 bg-[#1e5eeb]" : "w-1.5 bg-[#1e5eeb]/25"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="mt-8">{ctaButton(true)}</div>
        </div>

        {/* =============== DESKTOP: list + browser deck =============== */}
        <div
          className="mt-14 hidden items-center gap-10 lg:grid lg:grid-cols-12"
          onMouseEnter={() => {
            hoverRef.current = true;
          }}
          onMouseLeave={() => {
            hoverRef.current = false;
          }}
        >
          {/* project list */}
          <div className="lg:col-span-5">
            <ul className="divide-y divide-dashed divide-[#1e5eeb]/25 border-y border-dashed border-[#1e5eeb]/25">
              {projects.map((p, i) => {
                const on = i === active;
                return (
                  <li key={p.name}>
                    <button
                      type="button"
                      onClick={() => choose(i)}
                      aria-pressed={on}
                      className="group w-full py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#1e5eeb]"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span
                          className={`text-[1.75rem] font-bold leading-none tracking-[-0.03em] transition-colors duration-500 ${
                            on ? "text-[#0b1a3b]" : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        >
                          {p.name}
                        </span>
                        <span className="text-sm text-slate-500">{p.category}</span>
                      </div>

                      <span className="relative mt-4 block h-[3px] overflow-hidden rounded-full bg-[#1e5eeb]/10">
                        <span
                          ref={(el) => {
                            barRefs.current[i] = el;
                          }}
                          className="absolute inset-y-0 left-0 w-0 rounded-full bg-[#1e5eeb]"
                        />
                      </span>

                      <span
                        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                          on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span
                            className={`block pt-4 transition-[opacity,translate] duration-500 ${
                              on ? "translate-y-0 opacity-100 delay-150" : "-translate-y-2 opacity-0"
                            }`}
                          >
                            <span className="text-sm font-semibold text-[#0b1a3b]">What we built</span>
                            <BuiltChips items={p.built} />
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">{ctaButton(false)}</div>
          </div>

          {/* browser deck */}
          <div className="lg:col-span-7">
            <div
              className="relative"
              style={{ aspectRatio: "16 / 11" }}
              onMouseEnter={() => setFanHover(true)}
              onMouseLeave={() => setFanHover(false)}
            >
              {/* "click to flip" cue */}
              <div
                className={`pointer-events-none absolute -top-12 right-2 z-50 flex items-end gap-1 transition-[opacity,translate] duration-500 ${
                  hint ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
                aria-hidden
              >
                <span className={`${hand.className} -rotate-3 text-[22px] leading-none text-[#1e5eeb]`}>
                  {n} live sites, click to flip
                </span>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-[-22px]">
                  <path d="M6 4 C 22 6, 30 16, 26 32" stroke="#1e5eeb" strokeWidth="2" strokeLinecap="round" />
                  <path d="M20 27 L26 34 L32 27" stroke="#1e5eeb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {projects.map((p, i) => {
                const k = (i - active + n) % n;
                const pose = deckPose(k, fan);
                const front = k === 0;
                const dimStyle = { ["--dim" as string]: pose.dim } as CSSProperties;
                return (
                  <div
                    key={p.name}
                    role={front ? undefined : "button"}
                    tabIndex={front ? -1 : 0}
                    aria-label={front ? undefined : `Show ${p.name}`}
                    onClick={() => choose(i)}
                    onKeyDown={(e) => {
                      if (!front && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        choose(i);
                      }
                    }}
                    className={`group absolute inset-x-0 bottom-0 overflow-hidden rounded-2xl bg-white ring-1 ring-[#0b1a3b]/10 ${
                      front ? "" : "cursor-pointer hover:-translate-y-2.5 hover:ring-2 hover:ring-[#1e5eeb]/50"
                    }`}
                    style={{
                      aspectRatio: "16 / 10",
                      zIndex: pose.z,
                      transform: pose.transform,
                      transformOrigin: "50% 0%",
                      transition: `transform 0.85s ${SPRING}, translate 0.5s ${SPRING}, box-shadow 0.5s ease`,
                      boxShadow: front
                        ? "0 40px 70px -35px rgba(11,26,59,0.55)"
                        : "0 20px 40px -30px rgba(11,26,59,0.4)",
                    }}
                  >
                    <Chrome address={p.address} action={!front} />
                    <div className="relative h-[calc(100%-2.25rem)] overflow-hidden">
                      <Image
                        src={p.shot}
                        alt={`${p.name} website`}
                        fill
                        sizes="(min-width: 1024px) 680px, 100vw"
                        className={`object-cover object-top transition-transform duration-[1.2s] ease-out ${
                          front ? "scale-100" : "scale-[1.03]"
                        }`}
                      />
                      <div
                        className={`pointer-events-none absolute inset-0 bg-white opacity-[var(--dim)] transition-opacity duration-500 ${
                          front ? "" : "group-hover:opacity-10"
                        }`}
                        style={dimStyle}
                      />
                    </div>
                  </div>
                );
              })}

              {/* handwritten note on the front window */}
              <div
                key={active}
                className="pointer-events-none absolute z-40 animate-step-in"
                style={{
                  left: `${current.note.x}%`,
                  top: `calc(${(current.note.y * 10) / 11}% + 2.25rem * ${10 / 11})`,
                  animationDelay: "450ms",
                }}
              >
                <span
                  className={`${hand.className} block whitespace-nowrap rounded-lg bg-white/95 px-3 py-1 text-[22px] leading-tight text-[#1e5eeb] shadow-[0_10px_24px_-12px_rgba(11,26,59,0.45)] ring-1 ring-[#1e5eeb]/20`}
                  style={{ transform: `rotate(${current.note.rot}deg)` }}
                >
                  {current.note.text}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-2" aria-hidden>
              {projects.map((p, i) => (
                <span
                  key={p.name}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-7 bg-[#1e5eeb]" : "w-1.5 bg-[#1e5eeb]/25"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}