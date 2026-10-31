"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { MessageCircle, Package, Search, ShoppingBag, Check } from "lucide-react";
import NavLink from "./NavLink";
import { hand } from "@/lib/fonts";

/* ---------------- content ---------------- */

const stages = [
  {
    name: "Build",
    short: "Research, brand, product",
    fit: "Start here if you have an idea or a product, but no brand yet.",
    bring: "an idea, or a product you already make",
    caption: "A brand you can build a business on.",
    deliver: [
      "Market, competitor and pricing research",
      "Brand name, identity and packaging",
      "Product range, sourcing and catalogue",
    ],
  },
  {
    name: "Launch",
    short: "Store, listings, content",
    fit: "Start here if your brand is ready but you’re not selling online yet.",
    bring: "your sign-off on the brand",
    caption: "Your store goes live, ready to take orders.",
    deliver: [
      "Website, checkout and payments",
      "Marketplace and B2B ordering setup",
      "Product photography, video and copy",
    ],
  },
  {
    name: "Grow",
    short: "Demand, customers, operations",
    fit: "Start here if you’re already selling and want more orders, more often.",
    bring: "a business that’s already selling",
    caption: "More orders, from customers who come back.",
    deliver: [
      "SEO and visibility in AI search",
      "Ads, social and influencer campaigns",
      "Customer data, email and WhatsApp journeys",
      "Order, inventory and reporting automation",
      "Fulfilment, suppliers and international trade",
    ],
  },
];

const NAVY = "#0b1a3b";
const BLUE = "#1e5eeb";
const SKY = "#2ba6f0";

/* ---------------- animation helper ---------------- */

function Pop({
  on,
  delay = 0,
  from = "translate-y-3 scale-95",
  className = "",
  style,
  children,
}: {
  on: boolean;
  delay?: number;
  from?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={`transition-[opacity,translate,scale] duration-500 ease-bounce-out ${
        on ? "translate-x-0 translate-y-0 scale-100 opacity-100" : `opacity-0 ${from}`
      } ${className}`}
      style={{ ...style, transitionDelay: on ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function SceneNote({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <Pop on={on} delay={900} from="translate-y-2" className="pointer-events-none absolute right-[4cqw] top-[1.2cqw] z-10">
      <span className={`${hand.className} block -rotate-3 text-[2.6cqw] leading-none`} style={{ color: BLUE }}>
        {children}
      </span>
    </Pop>
  );
}

/* ---------------- scenes ---------------- */

function BuildScene({ on }: { on: boolean }) {
  const swatches = [NAVY, BLUE, SKY, "#f2c14e"];
  return (
    <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-[2.4cqw] p-[5cqw]">
      <SceneNote on={on}>brand board, v1</SceneNote>

      <Pop on={on} delay={80} className="flex flex-col justify-between rounded-[2cqw] p-[3cqw] text-white" style={{ background: NAVY }}>
        <svg viewBox="0 0 40 40" style={{ width: "8cqw", height: "8cqw" }} aria-hidden>
          <circle cx="20" cy="20" r="15" fill="none" stroke="white" strokeWidth="3" />
          <path d="M20 11 L28 26 H12 Z" fill={SKY} />
        </svg>
        <span className="font-semibold" style={{ fontSize: "2.3cqw", letterSpacing: "0.04em" }}>
          your brand
        </span>
      </Pop>

      <Pop on={on} delay={180} className="flex flex-col rounded-[2cqw] bg-white p-[2.6cqw] ring-1 ring-[#0b1a3b]/8">
        <span className="text-slate-500" style={{ fontSize: "1.7cqw" }}>
          Colours
        </span>
        <div className="mt-auto grid grid-cols-2 gap-[1.2cqw]">
          {swatches.map((c, k) => (
            <Pop key={c} on={on} delay={380 + k * 90} from="scale-50" className="aspect-[1.6] rounded-[1.2cqw]" style={{ background: c }} />
          ))}
        </div>
      </Pop>

      <Pop on={on} delay={280} className="flex flex-col rounded-[2cqw] bg-white p-[2.6cqw] ring-1 ring-[#0b1a3b]/8">
        <span className="font-bold leading-none" style={{ fontSize: "9cqw", color: NAVY, letterSpacing: "-0.04em" }}>
          Aa
        </span>
        <div className="mt-auto space-y-[1cqw]">
          <div className="h-[1.4cqw] w-[80%] rounded-full" style={{ background: NAVY }} />
          <div className="h-[0.9cqw] w-full rounded-full bg-slate-300" />
          <div className="h-[0.9cqw] w-[70%] rounded-full bg-slate-300" />
        </div>
      </Pop>

      <Pop on={on} delay={420} className="col-span-2 grid place-items-center rounded-[2cqw] bg-[#e7eefa]">
        <div className="relative" style={{ width: "30cqw" }}>
          <Pop on={on} delay={620} from="-translate-y-4" className="rounded-t-[0.8cqw]" style={{ height: "3cqw", background: BLUE }} />
          <div className="relative grid place-items-center rounded-b-[0.8cqw] shadow-[0_1.5cqw_3cqw_-1cqw_rgba(11,26,59,0.5)]" style={{ height: "15cqw", background: NAVY }}>
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2" style={{ width: "2.2cqw", background: SKY, opacity: 0.9 }} />
            <span className="relative rounded-[0.6cqw] px-[1.4cqw] py-[0.6cqw] font-semibold text-white" style={{ fontSize: "2cqw", background: NAVY }}>
              your brand
            </span>
          </div>
        </div>
      </Pop>

      <Pop
        on={on}
        delay={520}
        className="relative grid place-items-center overflow-hidden rounded-[2cqw]"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, #d6e3f8 0 1cqw, #eef4fd 1cqw 2cqw)" }}
      >
        <span className={`${hand.className} rounded bg-white/80 px-[1cqw] text-[2.4cqw]`} style={{ color: BLUE }}>
          mood
        </span>
      </Pop>
    </div>
  );
}

function LaunchScene({ on }: { on: boolean }) {
  return (
    <div className="absolute inset-0 p-[5cqw]">
      <SceneNote on={on}>going live</SceneNote>

      <Pop on={on} delay={60} className="flex h-full flex-col overflow-hidden rounded-[2cqw] bg-white shadow-[0_2cqw_4cqw_-2cqw_rgba(11,26,59,0.35)] ring-1 ring-[#0b1a3b]/10">
        <div className="flex items-center gap-[1cqw] border-b border-slate-200/80 px-[2.4cqw] py-[1.6cqw]">
          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-slate-300" />
          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-slate-300" />
          <span className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-slate-300" />
          <span className="ml-[1.6cqw] flex items-center rounded-full bg-slate-100 px-[1.6cqw] py-[0.6cqw] font-mono text-slate-600" style={{ fontSize: "1.7cqw" }}>
            <span
              className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-[#1e5eeb] pr-[0.3cqw] align-bottom"
              style={{
                width: on ? "13.5ch" : "0ch",
                transition: on ? "width 0.9s steps(13) 300ms" : "none",
              }}
            >
              yourbrand.com
            </span>
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-[2cqw] p-[2.4cqw]">
          <Pop on={on} delay={1250} className="flex items-center justify-between rounded-[1.4cqw] px-[3cqw] py-[2.4cqw]" style={{ background: NAVY }}>
            <div>
              <p className="font-semibold text-white" style={{ fontSize: "2.8cqw" }}>
                New collection
              </p>
              <span className="mt-[1cqw] inline-block rounded-full px-[1.8cqw] py-[0.6cqw] font-semibold" style={{ fontSize: "1.5cqw", background: SKY, color: NAVY }}>
                Shop now
              </span>
            </div>
            <div className="rounded-[1cqw] bg-white/10" style={{ width: "16cqw", height: "9cqw" }} />
          </Pop>

          <div className="grid flex-1 grid-cols-3 gap-[1.8cqw]">
            {[0, 1, 2].map((k) => (
              <Pop key={k} on={on} delay={1400 + k * 110} from="translate-y-5" className="flex flex-col">
                <div className="flex-1 rounded-[1.2cqw] bg-[#e7eefa]" />
                <div className="mt-[1cqw] h-[1cqw] w-[80%] rounded-full bg-slate-300" />
                <div className="mt-[0.8cqw] h-[1cqw] w-[40%] rounded-full" style={{ background: BLUE, opacity: 0.6 }} />
              </Pop>
            ))}
          </div>
        </div>
      </Pop>

      <Pop
        on={on}
        delay={2000}
        from="translate-x-8"
        className="absolute bottom-[8cqw] right-[3cqw] flex items-center gap-[1.4cqw] rounded-[1.6cqw] bg-white px-[2cqw] py-[1.5cqw] shadow-[0_2cqw_4cqw_-1.5cqw_rgba(11,26,59,0.45)] ring-1 ring-[#0b1a3b]/8"
      >
        <span className="grid place-items-center rounded-full text-white" style={{ width: "3.6cqw", height: "3.6cqw", background: BLUE }}>
          <Check style={{ width: "2cqw", height: "2cqw" }} />
        </span>
        <span>
          <span className="block font-semibold" style={{ fontSize: "1.9cqw", color: NAVY }}>
            Order placed
          </span>
          <span className="block text-slate-500" style={{ fontSize: "1.5cqw" }}>
            Paid by UPI
          </span>
        </span>
      </Pop>
    </div>
  );
}

function GrowScene({ on }: { on: boolean }) {
  const bars = [28, 34, 31, 42, 39, 50, 48, 58, 56, 67, 74, 86];
  const updates = [
    { icon: ShoppingBag, text: "New order received" },
    { icon: MessageCircle, text: "Repeat customer on WhatsApp" },
    { icon: Search, text: "Product ranked on Google" },
    { icon: Package, text: "Stock reordered automatically" },
  ];
  const line = "M0 34 L9 32 L18 33 L27 28 L36 29 L45 23 L54 24 L63 17 L72 18 L81 11 L90 9 L100 4";

  return (
    <div className="absolute inset-0 grid grid-cols-[1.3fr_1fr] gap-[2.4cqw] p-[5cqw]">
      <SceneNote on={on}>orders coming in</SceneNote>

      <Pop on={on} delay={60} className="flex flex-col rounded-[2cqw] bg-white p-[3cqw] shadow-[0_2cqw_4cqw_-2cqw_rgba(11,26,59,0.3)] ring-1 ring-[#0b1a3b]/8">
        <span className="font-semibold" style={{ fontSize: "2cqw", color: NAVY }}>
          Orders
        </span>
        <svg viewBox="0 0 100 40" className="mt-[2cqw] w-full" aria-hidden>
          <path
            d={`${line} L100 40 L0 40 Z`}
            fill={BLUE}
            style={{ opacity: on ? 0.12 : 0, transition: `opacity 0.8s ease ${on ? 1100 : 0}ms` }}
          />
          <path
            d={line}
            fill="none"
            stroke={BLUE}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: on ? 0 : 1,
              transition: on ? "stroke-dashoffset 1.4s cubic-bezier(0.65,0,0.35,1) 250ms" : "none",
            }}
          />
        </svg>
        <div className="mt-auto flex h-[30%] items-end gap-[0.9cqw]">
          {bars.map((h, k) => (
            <div
              key={k}
              className="flex-1 origin-bottom rounded-t-[0.5cqw]"
              style={{
                height: `${h}%`,
                background: k === bars.length - 1 ? BLUE : "#c8d8f4",
                transform: `scaleY(${on ? 1 : 0})`,
                transition: on ? `transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${400 + k * 60}ms` : "none",
              }}
            />
          ))}
        </div>
      </Pop>

      <div className="flex flex-col justify-center gap-[1.6cqw]">
        {updates.map(({ icon: Icon, text }, k) => (
          <Pop
            key={text}
            on={on}
            delay={700 + k * 260}
            from="translate-x-8"
            className="flex items-center gap-[1.4cqw] rounded-[1.6cqw] bg-white px-[1.8cqw] py-[1.5cqw] shadow-[0_1.5cqw_3cqw_-1.5cqw_rgba(11,26,59,0.35)] ring-1 ring-[#0b1a3b]/8"
          >
            <span className="grid shrink-0 place-items-center rounded-full" style={{ width: "3.6cqw", height: "3.6cqw", background: "#e7eefa", color: BLUE }}>
              <Icon style={{ width: "1.9cqw", height: "1.9cqw" }} />
            </span>
            <span className="font-medium leading-tight" style={{ fontSize: "1.7cqw", color: NAVY }}>
              {text}
            </span>
          </Pop>
        ))}
      </div>
    </div>
  );
}

const scenes = [BuildScene, LaunchScene, GrowScene];

/* ---------------- section ---------------- */

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const [seen, setSeen] = useState(false);

  // scroll-driven progress on desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el || !mq.matches) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    const onMode = () => {
      setDesktop(mq.matches);
      onScroll();
    };
    const first = requestAnimationFrame(onMode);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onMode);
    return () => {
      cancelAnimationFrame(first);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onMode);
    };
  }, []);

  // start scene animations only once the section is on screen
  useEffect(() => {
    const el = sectionRef.current;
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = Math.min(stages.length - 1, Math.floor(progress * stages.length));

  const go = (i: number) => {
    const el = sectionRef.current;
    if (desktop && el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const total = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + total * ((i + 0.5) / stages.length), behavior: "smooth" });
    } else {
      setProgress((i + 0.999) / stages.length);
    }
  };

  const fill = (i: number) =>
    desktop ? Math.min(1, Math.max(0, progress * stages.length - i)) : i <= active ? 1 : 0;

  return (
    <section id="journey" ref={sectionRef} className="relative bg-[#e3eaf6] lg:h-[300vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center lg:overflow-hidden">
        <div className="wrap w-full py-24 lg:py-0 lg:pt-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-8">
            {/* heading */}
            <div className="lg:col-start-1 lg:row-start-1">
              <h2 className="text-balance text-[2.2rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#0b1a3b] sm:text-[2.75rem]">
                Three stages, one team, no hand-offs.
              </h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-slate-600">
                Start wherever your business is today. The same team carries the work through, so nothing gets lost
                between agencies.
              </p>
            </div>

            {/* scene card */}
            <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <div
                className="@container relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#f4f8ff] shadow-[0_30px_60px_-30px_rgba(11,26,59,0.5)] ring-1 ring-[#0b1a3b]/8"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(30,94,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.06) 1px, transparent 1px)",
                  backgroundSize: "2.5cqw 2.5cqw",
                }}
              >
                {scenes.map((Scene, i) => (
                  <div
                    key={i}
                    aria-hidden={active !== i}
                    className={`absolute inset-0 transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                      active === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                    }`}
                  >
                    <Scene on={seen && active === i} />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p key={active} className="animate-step-in text-[15px] font-medium text-[#0b1a3b]">
                  {stages[active].caption}
                </p>
                <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
                  {stages.map((s, i) => (
                    <span
                      key={s.name}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === active ? "w-6 bg-[#1e5eeb]" : "w-1.5 bg-[#1e5eeb]/25"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* stage list */}
            <div className="lg:col-start-1 lg:row-start-2">
              <div className="space-y-1">
                {stages.map((s, i) => {
                  const isActive = active === i;
                  return (
                    <div key={s.name} className="relative pl-6">
                      <span aria-hidden className="absolute bottom-2 left-0 top-2 w-[2px] rounded-full bg-[#1e5eeb]/15" />
                      <span
                        aria-hidden
                        className="absolute bottom-2 left-0 top-2 w-[2px] origin-top rounded-full bg-[#1e5eeb]"
                        style={{
                          transform: `scaleY(${fill(i)})`,
                          transition: desktop ? "none" : "transform 0.6s ease",
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => go(i)}
                        aria-expanded={isActive}
                        className="group flex w-full items-baseline gap-3 py-2.5 text-left"
                      >
                        <span
                          className={`text-sm font-medium tabular-nums transition-colors duration-500 ${
                            isActive ? "text-[#1e5eeb]" : "text-slate-400"
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={`text-[1.9rem] font-bold leading-none tracking-[-0.03em] transition-colors duration-500 ${
                            isActive ? "text-[#0b1a3b]" : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        >
                          {s.name}
                        </span>
                        <span
                          className={`ml-auto hidden text-sm text-slate-500 transition-opacity duration-300 sm:block ${
                            isActive ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          {s.short}
                        </span>
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div
                            className={`pb-5 pt-1 transition-[opacity,translate] duration-500 ${
                              isActive ? "translate-y-0 opacity-100 delay-150" : "-translate-y-2 opacity-0"
                            }`}
                          >
                            <p className="text-[15px] leading-relaxed text-slate-600">{s.fit}</p>
                            <p className={`${hand.className} mt-3 -rotate-1 text-[21px] leading-snug text-[#1e5eeb]`}>
                              you bring: {s.bring}
                            </p>
                            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                              {s.deliver.map((d, j) => (
                                <li key={d} className="flex items-start gap-2.5">
                                  <span className="mt-[2px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[#1e5eeb]/10">
                                    <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" aria-hidden>
                                      <path
                                        d="M3 8.5l3.2 3L13 4.5"
                                        fill="none"
                                        stroke={BLUE}
                                        strokeWidth="2.4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        pathLength={1}
                                        style={{
                                          strokeDasharray: 1,
                                          strokeDashoffset: isActive && seen ? 0 : 1,
                                          transition: isActive
                                            ? `stroke-dashoffset 0.45s ease-out ${350 + j * 110}ms`
                                            : "none",
                                        }}
                                      />
                                    </svg>
                                  </span>
                                  <span className="text-[14px] leading-snug text-[#0b1a3b]">{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 text-sm text-slate-600">
                Not sure which stage you’re at? Most clients aren’t.{" "}
                <NavLink
                  href="/enquire"
                  className="font-semibold text-[#1e5eeb] underline decoration-[#1e5eeb]/30 underline-offset-4 hover:decoration-[#1e5eeb]"
                >
                  Tell us where you are
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}