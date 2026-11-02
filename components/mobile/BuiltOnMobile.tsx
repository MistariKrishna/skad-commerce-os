"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import NavLink from "../NavLink";
import Appear, { MobileHead } from "../Appear";

const STICK_TOP = 96; // px from the top of the screen where cards pin
const TILT = 8; // degrees a covered card leans back
const SHRINK = 0.06; // how much a covered card scales down
const DIM = 0.28; // how dark a covered card gets
const DRIFT = 14; // px the screenshot drifts inside its window
const EASE = 0.16; // smoothing (higher = snappier)

// Same screenshot paths as your hero
const projects = [
  {
    name: "Detara",
    category: "Fine diamond jewellery",
    shot: "/images/brands/detara-homepage.webp",
    built: "A luxury storefront with a design-your-own jewellery flow.",
  },
  {
    name: "Benavi",
    category: "Silver jewellery",
    shot: "/images/brands/benavi-homepage.webp",
    built: "A storefront with campaign banners and shop-by-occasion browsing.",
  },
  {
    name: "Case Suno",
    category: "Case advisor platform",
    shot: "/images/brands/casesuno-homepage.webp",
    built: "A clear service website with WhatsApp-first enquiries.",
  },
];

export default function BuiltOnMobile() {
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const n = projects.length;
    const cover = new Array(n).fill(0); // eased "covered" amount, 0–1
    const drift = new Array(n).fill(0); // eased screenshot drift, -1 to 1
    let raf = 0;

    const targets = () => {
      const vh = window.innerHeight;
      const tCover = new Array(n).fill(0);
      const tDrift = new Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        const card = cardRefs.current[i];
        const wrap = wrapRefs.current[i];
        if (!card || !wrap) continue;
        if (i < n - 1) {
          const next = wrapRefs.current[i + 1];
          if (next) {
            const h = card.offsetHeight || 1;
            const nextTop = next.getBoundingClientRect().top;
            tCover[i] = Math.min(1, Math.max(0, (STICK_TOP + h - nextTop) / h));
          }
        }
        const r = wrap.getBoundingClientRect();
        const centre = r.top + r.height / 2;
        tDrift[i] = Math.min(1, Math.max(-1, (centre - vh / 2) / vh));
      }
      return { tCover, tDrift };
    };

    const frame = () => {
      const { tCover, tDrift } = targets();
      let moving = false;
      for (let i = 0; i < n; i++) {
        cover[i] += (tCover[i] - cover[i]) * EASE;
        drift[i] += (tDrift[i] - drift[i]) * EASE;
        if (Math.abs(tCover[i] - cover[i]) > 0.001 || Math.abs(tDrift[i] - drift[i]) > 0.001) moving = true;

        const card = cardRefs.current[i];
        const shade = shadeRefs.current[i];
        const img = imgRefs.current[i];
        const p = cover[i];
        if (card) {
          card.style.transform = `perspective(1200px) rotateX(${(p * TILT).toFixed(2)}deg) scale(${(1 - p * SHRINK).toFixed(4)}) translate3d(0, ${(-p * 10).toFixed(1)}px, 0)`;
        }
        if (shade) shade.style.opacity = (p * DIM).toFixed(3);
        if (img) img.style.transform = `translate3d(0, ${(drift[i] * DRIFT).toFixed(1)}px, 0) scale(1.08)`;
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

  return (
    <section id="built-on-m" className="bg-white py-20">
      <div className="wrap max-w-2xl">
        <MobileHead
          title="Real brands, real work."
          text="Live websites built on CommerceOS, running today. Each one started as a brief, just like yours."
        />

        <div className="mt-10">
          {projects.map((p, i) => {
            const last = i === projects.length - 1;
            return (
              <div
                key={p.name}
                ref={(el) => {
                  wrapRefs.current[i] = el;
                }}
                className={`sticky ${last ? "" : "mb-[26vh]"}`}
                style={{ top: STICK_TOP }}
              >
                <Appear>
                  <div
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="relative overflow-hidden rounded-3xl bg-white p-3 shadow-[0_-12px_36px_-24px_rgba(11,26,59,0.4),0_22px_44px_-30px_rgba(11,26,59,0.5)] ring-1 ring-[#0b1a3b]/8"
                    style={{ transformOrigin: "50% 0%", willChange: "transform" }}
                  >
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#0b1a3b]">
                      <div
                        ref={(el) => {
                          imgRefs.current[i] = el;
                        }}
                        className="absolute inset-0"
                        style={{ transform: "scale(1.08)", willChange: "transform" }}
                      >
                        <Image
                          src={p.shot}
                          alt={`${p.name} website`}
                          fill
                          sizes="(min-width: 672px) 672px, 100vw"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>

                    <div className="px-2 pb-2 pt-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-[1.35rem] font-bold tracking-[-0.02em] text-[#0b1a3b]">
                          <span className="mr-2 text-[14px] font-semibold text-[#1e5eeb]">0{i + 1}</span>
                          {p.name}
                        </h3>
                        <span className="text-[13px] text-slate-500">{p.category}</span>
                      </div>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{p.built}</p>
                    </div>

                    {/* gentle dimming as the card is covered */}
                    <div
                      ref={(el) => {
                        shadeRefs.current[i] = el;
                      }}
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-3xl bg-[#0b1a3b]"
                      style={{ opacity: 0 }}
                    />
                  </div>
                </Appear>
              </div>
            );
          })}
        </div>

        <Appear className="mt-12">
          <NavLink
            href="/enquire"
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#0b1a3b] px-6 py-3.5 text-[15px] font-semibold text-white transition-[scale] duration-200 active:scale-[0.97]"
          >
            Start a project like these
            <ArrowRight size={15} />
          </NavLink>
        </Appear>
      </div>
    </section>
  );
}