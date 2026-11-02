"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Layers, Rocket, TrendingUp, type LucideIcon } from "lucide-react";
import NavLink from "../NavLink";
import Appear, { MobileHead, useSeen } from "../Appear";
import { hand } from "@/lib/fonts";

const BASE_TOP = 92; // px below the screen top where the first card pins
const TAB = 60; // height of each card's header strip (stays visible when covered)
const STAND = 14; // degrees an incoming card leans back before standing up
const SHRINK = 0.035; // how much a covered card scales down
const DIM = 0.3; // how dark a covered card's body gets
const EASE = 0.16; // smoothing

const stages: { name: string; icon: LucideIcon; fit: string; bring: string; deliver: string[] }[] = [
  {
    name: "Build",
    icon: Layers,
    fit: "Start here if you have an idea or a product, but no brand yet.",
    bring: "an idea, or a product you already make",
    deliver: ["Market, competitor and pricing research", "Brand name, identity and packaging", "Product range, sourcing and catalogue"],
  },
  {
    name: "Launch",
    icon: Rocket,
    fit: "Start here if your brand is ready but you’re not selling online yet.",
    bring: "your sign-off on the brand",
    deliver: ["Website, checkout and payments", "Marketplace and B2B ordering setup", "Product photography, video and copy"],
  },
  {
    name: "Grow",
    icon: TrendingUp,
    fit: "Start here if you’re already selling and want more orders, more often.",
    bring: "a business that’s already selling",
    deliver: [
      "SEO and visibility in AI search",
      "Ads, social and influencer campaigns",
      "Customer data, email and WhatsApp journeys",
      "Order, inventory and reporting automation",
      "Fulfilment, suppliers and international trade",
    ],
  },
];

function Ticks({ items }: { items: string[] }) {
  const { ref, seen } = useSeen<HTMLUListElement>(0.4);
  return (
    <ul ref={ref} className="mt-3 space-y-2">
      {items.map((d, j) => (
        <li key={d} className="flex items-start gap-2.5">
          <span className="mt-[2px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1e5eeb]/10">
            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" aria-hidden>
              <path
                d="M3 8.5l3.2 3L13 4.5"
                fill="none"
                stroke="#1e5eeb"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: seen ? 0 : 1,
                  transition: `stroke-dashoffset 0.45s ease-out ${200 + j * 100}ms`,
                }}
              />
            </svg>
          </span>
          <span className="text-[14px] leading-snug text-[#0b1a3b]">{d}</span>
        </li>
      ))}
    </ul>
  );
}

export default function JourneyMobile() {
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const n = stages.length;
    const stand = new Array(n).fill(0); // incoming lean, 0–1
    const cover = new Array(n).fill(0); // covered amount, 0–1
    let raf = 0;

    const frame = () => {
      const vh = window.innerHeight;
      let moving = false;
      for (let i = 0; i < n; i++) {
        const wrap = wrapRefs.current[i];
        const card = cardRefs.current[i];
        if (!wrap || !card) continue;
        const pin = BASE_TOP + i * TAB;
        const top = wrap.getBoundingClientRect().top;

        // incoming: leans back while below its pin point, stands up as it arrives
        const tStand = i === 0 ? 0 : Math.min(1, Math.max(0, (top - pin) / (vh * 0.45)));

        // covered: how far the next card has slid over this one
        let tCover = 0;
        const next = wrapRefs.current[i + 1];
        if (next) {
          const h = card.offsetHeight || 1;
          const nextTop = next.getBoundingClientRect().top;
          tCover = Math.min(1, Math.max(0, (pin + h - nextTop) / Math.max(1, h - TAB)));
        }

        stand[i] += (tStand - stand[i]) * EASE;
        cover[i] += (tCover - cover[i]) * EASE;
        if (Math.abs(tStand - stand[i]) > 0.001 || Math.abs(tCover - cover[i]) > 0.001) moving = true;

        card.style.transform = `perspective(1100px) rotateX(${(stand[i] * STAND).toFixed(2)}deg) scale(${(1 - cover[i] * SHRINK).toFixed(4)})`;
        const shade = shadeRefs.current[i];
        if (shade) shade.style.opacity = (cover[i] * DIM).toFixed(3);
      }
      raf = moving ? requestAnimationFrame(frame) : 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, []);

  const goTo = (i: number) => {
    const wrap = wrapRefs.current[i];
    if (!wrap) return;
    // scroll so this card sits at its pin point, uncovered
    const parentTop = (wrap.parentElement?.getBoundingClientRect().top ?? 0) + window.scrollY;
    const offset = wrap.offsetTop;
    window.scrollTo({ top: parentTop + offset - BASE_TOP - i * TAB, behavior: "smooth" });
  };

  return (
    <section id="journey-m" className="bg-[#e3eaf6] py-20">
      <div className="wrap max-w-2xl">
        <MobileHead
          title="Three stages, one team, no hand-offs."
          text="Start wherever your business is today. The same team carries the work through, so nothing gets lost between agencies."
        />

        <div className="relative mt-10">
          {stages.map((s, i) => {
            const Icon = s.icon;
            const last = i === stages.length - 1;
            return (
              <div
                key={s.name}
                ref={(el) => {
                  wrapRefs.current[i] = el;
                }}
                className={`sticky ${last ? "" : "mb-[22vh]"}`}
                style={{ top: BASE_TOP + i * TAB }}
              >
                <div
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="relative overflow-hidden rounded-3xl bg-white shadow-[0_-10px_30px_-22px_rgba(11,26,59,0.45),0_20px_40px_-30px_rgba(11,26,59,0.5)] ring-1 ring-[#0b1a3b]/8"
                  style={{ transformOrigin: "50% 100%", willChange: "transform" }}
                >
                  {/* tab strip: stays readable when covered */}
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className="flex w-full items-center justify-between gap-3 border-b border-dashed border-[#1e5eeb]/20 px-5 text-left"
                    style={{ height: TAB }}
                  >
                    <span className="flex items-baseline gap-2.5">
                      <span className="text-[13px] font-semibold text-[#1e5eeb]">0{i + 1}</span>
                      <span className="text-[1.5rem] font-bold leading-none tracking-[-0.03em] text-[#0b1a3b]">{s.name}</span>
                    </span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eef3fb] text-[#1e5eeb]">
                      <Icon size={17} />
                    </span>
                  </button>

                  {/* body */}
                  <div className="relative px-5 pb-5 pt-4">
                    <p className="text-[15px] leading-relaxed text-slate-600">{s.fit}</p>
                    <p className={`${hand.className} mt-2.5 -rotate-1 text-[20px] leading-snug text-[#1e5eeb]`}>you bring: {s.bring}</p>
                    <p className="mt-4 text-[13px] font-semibold text-[#0b1a3b]">What we deliver</p>
                    <Ticks items={s.deliver} />

                    {/* dims the body (not the tab) when covered */}
                    <div
                      ref={(el) => {
                        shadeRefs.current[i] = el;
                      }}
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-[#0b1a3b]"
                      style={{ opacity: 0 }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* not sure? */}
        <Appear className="mt-10">
          <div className="rounded-3xl bg-[#0b1a3b] p-5 text-white">
            <p className="text-[17px] font-semibold">Not sure which stage you’re at?</p>
            <p className="mt-1 text-[15px] text-white/70">Most clients aren’t. We’ll work it out together on the first call.</p>
            <NavLink
              href="/enquire"
              className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-5 py-3.5 text-[15px] font-semibold text-[#0b1a3b] transition-[scale] duration-200 active:scale-[0.97]"
            >
              Tell us where you are
              <ArrowRight size={15} />
            </NavLink>
          </div>
        </Appear>
      </div>
    </section>
  );
}