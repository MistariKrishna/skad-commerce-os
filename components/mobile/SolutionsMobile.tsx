"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { ArrowRight } from "lucide-react";
import NavLink from "../NavLink";
import { MobileHead, useSeen } from "../Appear";
import { personas, pickBusiness } from "../Solutions";
import { capabilities } from "@/lib/data";
import { hand } from "@/lib/fonts";

const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";

const SHORT: Record<string, string> = {
  "D2C brand": "D2C",
  "Manufacturer / exporter": "Maker",
  Jeweller: "Jeweller",
  "Service business": "Services",
};

const describe = (title: string) => capabilities.find((c) => c.title === title)?.description ?? "";

export default function SolutionsMobile() {
  const { ref: machineRef, seen } = useSeen<HTMLDivElement>(0.3);
  const ticketRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const [p, setP] = useState(0);

  // the ticket feeds out of the slot whenever it changes
  useEffect(() => {
    const el = ticketRef.current;
    if (!seen || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = el.animate(
      [
        { transform: "translateY(-102%)" },
        { transform: "translateY(2%)", offset: 0.82 },
        { transform: "translateY(0)" },
      ],
      { duration: 1000, easing: "cubic-bezier(0.3,0.7,0.2,1)", fill: "both" }
    );
    return () => a.cancel();
  }, [p, seen]);

  const choose = (i: number) => setP((i + personas.length) % personas.length);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) choose(p + (dx < 0 ? 1 : -1));
  };

  const s = personas[p];
  const Icon = s.icon;

  return (
    <section id="solutions-m" className="bg-[#e3eaf6] py-20">
      {/* ticket animations */}
      <style>{`
        @keyframes tk-strike { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes tk-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes tk-line { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .tk-strike { transform-origin: left center; transform: scaleX(0); animation: tk-strike 0.5s cubic-bezier(0.6,0,0.2,1) forwards; }
        .tk-in { opacity: 0; animation: tk-in 0.5s cubic-bezier(0.2,0.7,0.2,1) forwards; }
        .tk-line { transform-origin: top center; transform: scaleY(0); animation: tk-line 0.9s cubic-bezier(0.6,0,0.2,1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .tk-strike, .tk-in, .tk-line { animation: none; transform: none; opacity: 1; }
        }
      `}</style>

      <div className="wrap max-w-xl">
        <MobileHead
          title="Built around the way your business works."
          text="Pick the one that sounds like you, and we’ll print your route."
        />

        {/* business picker */}
        <div
          role="tablist"
          aria-label="Choose your business"
          className="relative mt-8 grid grid-cols-4 rounded-2xl bg-white p-1 shadow-[0_10px_24px_-18px_rgba(11,26,59,0.5)] ring-1 ring-[#0b1a3b]/6"
        >
          <span
            aria-hidden
            className="absolute inset-y-1 left-1 rounded-xl bg-[#0b1a3b]"
            style={{
              width: "calc((100% - 0.5rem) / 4)",
              transform: `translateX(${p * 100}%)`,
              transition: `transform 0.55s ${SPRING}`,
            }}
          />
          {personas.map((x, i) => {
            const on = i === p;
            const XIcon = x.icon;
            return (
              <button
                key={x.title}
                type="button"
                role="tab"
                aria-selected={on}
                aria-label={x.title}
                onClick={() => choose(i)}
                className={`relative z-10 flex flex-col items-center gap-1.5 rounded-xl py-3 transition-colors duration-300 ${
                  on ? "text-white" : "text-slate-500"
                }`}
              >
                <XIcon size={19} className={on ? "text-[#7cc4f5]" : "text-[#1e5eeb]"} />
                <span className="text-[11.5px] font-semibold">{SHORT[x.business] ?? x.title}</span>
              </button>
            );
          })}
        </div>

        {/* the machine */}
        <div ref={machineRef} className="mt-8">
          {/* slot */}
          <div className="relative z-10 mx-1 h-4 rounded-full bg-[#0b1a3b] shadow-[0_8px_16px_-8px_rgba(11,26,59,0.8)]">
            <span className="absolute inset-x-6 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-black/50" />
          </div>

          {/* ticket feed */}
          <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className="-mt-2 touch-pan-y overflow-hidden px-3 pb-6">
            {seen ? (
              <div
                key={p}
                ref={ticketRef}
                className="relative rounded-b-[26px] rounded-t-md bg-white shadow-[0_30px_50px_-30px_rgba(11,26,59,0.55)]"
              >
                {/* top: the problem */}
                <div className="px-5 pb-6 pt-7">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#eef3fb] text-[#1e5eeb]">
                        <Icon size={22} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[12.5px] text-slate-500">{s.who}</p>
                        <h3 className="text-[1.3rem] font-bold leading-tight tracking-[-0.02em] text-[#0b1a3b]">{s.title}</h3>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-md bg-[#0b1a3b] px-2 py-1 font-mono text-[10.5px] font-semibold tracking-[0.12em] text-[#7cc4f5]">
                      No. 0{p + 1}
                    </span>
                  </div>

                  <p className={`${hand.className} mt-6 text-[19px] text-slate-500`}>sounds familiar?</p>
                  <ul className="mt-1 space-y-2">
                    {s.pains.map((pain, k) => (
                      <li key={pain} className={`${hand.className} relative w-fit text-[20px] leading-snug text-[#0b1a3b]`}>
                        “{pain}”
                        <span
                          aria-hidden
                          className="tk-strike absolute left-0 right-0 top-[55%] h-[2.5px] rounded-full bg-[#1e5eeb]"
                          style={{ animationDelay: `${1.1 + k * 0.3}s` }}
                        />
                      </li>
                    ))}
                  </ul>

                  <p
                    className="tk-in mt-5 rounded-2xl bg-[#1e5eeb] px-4 py-3 text-[14.5px] leading-snug text-white"
                    style={{ animationDelay: "1.8s" }}
                  >
                    <span className="font-semibold">We’ve got you. </span>
                    {s.reply}
                  </p>
                </div>

                {/* perforation */}
                <div aria-hidden className="relative">
                  <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#e3eaf6]" />
                  <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#e3eaf6]" />
                  <div className="mx-5 border-t-2 border-dashed border-[#1e5eeb]/25" />
                </div>

                {/* bottom: the route */}
                <div className="px-5 pb-6 pt-6">
                  <p className={`${hand.className} text-[21px] text-[#1e5eeb]`}>your route</p>
                  <ol className="relative mt-3 space-y-4 pl-8">
                    <span
                      aria-hidden
                      className="tk-line absolute bottom-2 left-[9px] top-2 w-[2px] rounded-full bg-[#1e5eeb]/35"
                      style={{ animationDelay: "2.1s" }}
                    />
                    {s.services.map((sv, k) => (
                      <li key={sv} className="tk-in relative" style={{ animationDelay: `${2.2 + k * 0.22}s` }}>
                        <span
                          aria-hidden
                          className="absolute -left-8 top-[3px] grid h-[20px] w-[20px] place-items-center rounded-full bg-white ring-2 ring-[#1e5eeb]"
                        >
                          <span className="h-2 w-2 rounded-full bg-[#1e5eeb]" />
                        </span>
                        <p className="text-[15px] font-semibold text-[#0b1a3b]">{sv}</p>
                        <p className="text-[13px] leading-snug text-slate-500">{describe(sv)}</p>
                      </li>
                    ))}
                  </ol>

                  <div className="tk-in mt-7" style={{ animationDelay: `${2.3 + s.services.length * 0.22}s` }}>
                    <NavLink
                      href="/enquire"
                      onClick={() => pickBusiness(s.business)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b1a3b] px-5 py-4 text-[15px] font-semibold text-white transition-[scale] duration-200 active:scale-[0.97]"
                    >
                      {s.cta}
                      <ArrowRight size={15} />
                    </NavLink>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[640px]" aria-hidden />
            )}
          </div>
        </div>

        {/* dots + hint */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            {personas.map((x, i) => (
              <button
                key={x.title}
                type="button"
                aria-label={`Show ${x.title}`}
                onClick={() => choose(i)}
                className={`h-2 rounded-full transition-[width,background-color] duration-500 ${i === p ? "w-6 bg-[#1e5eeb]" : "w-2 bg-[#0b1a3b]/20"}`}
                style={{ transitionTimingFunction: SPRING }}
              />
            ))}
          </div>
          <span className={`${hand.className} text-[17px] text-slate-500`}>swipe to print another</span>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Not quite any of these?{" "}
          <NavLink href="/enquire" className="font-semibold text-[#1e5eeb] underline decoration-[#1e5eeb]/30 underline-offset-4">
            Tell us about yours
          </NavLink>
        </p>
      </div>
    </section>
  );
}