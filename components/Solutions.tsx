"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Briefcase, Factory, Gem, ShoppingBag, type LucideIcon } from "lucide-react";
import NavLink from "./NavLink";
import Reveal from "./Reveal";
import { hand } from "@/lib/fonts";

const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";
const TYPE_MS = 900; // typing dots before each message
const GAP_MS = 350; // pause between messages
const HOLD_MS = 3800; // time to read the finished chat
const TOTAL = 5; // messages per conversation

type Persona = {
  business: string; // must match a businessType in Enquire.tsx
  icon: LucideIcon;
  title: string;
  who: string;
  pains: [string, string];
  reply: string;
  services: string[];
  cta: string;
};

export const personas: Persona[] = [
  {
    business: "D2C brand",
    icon: ShoppingBag,
    title: "D2C brands",
    who: "Founders and growing brands",
    pains: ["I’m juggling too many agencies and no one’s in charge.", "Ads bring buyers, but they don’t come back."],
    reply: "Launch without hiring ten agencies, then grow with SEO, CRM and automation working from the same data.",
    services: ["Brand Infrastructure", "E-commerce", "Marketing", "CRM"],
    cta: "Start as a D2C brand",
  },
  {
    business: "Manufacturer / exporter",
    icon: Factory,
    title: "Manufacturers & exporters",
    who: "Makers and traders",
    pains: ["We make a great product, but we have no online presence.", "Orders still arrive by email and phone."],
    reply: "Take your proven range online, with B2B ordering, direct-to-consumer sales and international trade in one place.",
    services: ["E-commerce", "Content", "Operations", "Automation"],
    cta: "Start as a manufacturer",
  },
  {
    business: "Jeweller",
    icon: Gem,
    title: "Jewellery & diamonds",
    who: "Jewellers",
    pains: ["Our photos don’t show the sparkle.", "Buyers need to trust us before they pay this much online."],
    reply: "Catalogue, content and a storefront made for high-value, considered purchases, where trust comes first.",
    services: ["Content", "E-commerce", "Brand Infrastructure", "Marketing"],
    cta: "Start as a jeweller",
  },
  {
    business: "Service business",
    icon: Briefcase,
    title: "Service businesses",
    who: "Advisers and service firms",
    pains: ["People can’t find us on Google.", "Leads slip through the cracks."],
    reply: "Turn your expertise into a findable, bookable service, with leads captured and followed up automatically.",
    services: ["SEO/GEO", "CRM", "Automation", "Analytics"],
    cta: "Start as a service business",
  },
];

export const pickBusiness = (biz: string) => {
  try {
    sessionStorage.setItem("skad-business", biz);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent("skad:business", { detail: biz }));
};

export function TypingBubble({ side }: { side: "them" | "us" }) {
  return (
    <div className={`flex animate-pill-pop ${side === "us" ? "justify-end" : "justify-start"}`}>
      <span
        className={`inline-flex items-center gap-1 rounded-2xl px-4 py-3 ${
          side === "us" ? "rounded-br-md bg-[#1e5eeb]" : "rounded-bl-md bg-white ring-1 ring-[#0b1a3b]/8"
        }`}
        aria-label="typing"
      >
        {[0, 1, 2].map((k) => (
          <span
            key={k}
            className={`h-2 w-2 animate-bounce rounded-full ${side === "us" ? "bg-white/80" : "bg-slate-400"}`}
            style={{ animationDelay: `${k * 140}ms` }}
          />
        ))}
      </span>
    </div>
  );
}

export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const [p, setP] = useState(0); // persona
  const [step, setStep] = useState(0); // messages shown, 0–5
  const [typing, setTyping] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => setInView(entries.some((e) => e.isIntersecting)), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // the conversation timeline
  useEffect(() => {
    if (!inView || hovering) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    if (step < TOTAL) {
      timers.push(window.setTimeout(() => setTyping(true), reduce ? 0 : GAP_MS));
      timers.push(
        window.setTimeout(() => {
          setTyping(false);
          setStep((s) => s + 1);
        }, reduce ? 150 : GAP_MS + TYPE_MS)
      );
    } else {
      timers.push(
        window.setTimeout(() => {
          setP((x) => (x + 1) % personas.length);
          setStep(0);
        }, HOLD_MS)
      );
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [p, step, hovering, inView]);

  const choose = (i: number) => {
    setTyping(false);
    setP(i);
    setStep(0);
  };

  const s = personas[p];
  const Icon = s.icon;
  const typingSide: "them" | "us" = step < 2 ? "them" : "us";
  const progress = step / TOTAL;

  return (
    <section id="solutions" ref={sectionRef} className="bg-[#e3eaf6] py-24 lg:py-32">
      <div className="wrap">
        <div
          className="grid gap-12 lg:grid-cols-12 lg:gap-14"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* ---------- left: heading + people ---------- */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-balance text-[2.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#0b1a3b]">
                Built around the way your business works.
              </h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-slate-600">
                Real problems, plain answers. See how we’d help a business like yours.
              </p>
            </Reveal>

            <div className="mt-10 space-y-2">
              {personas.map((x, i) => {
                const on = i === p;
                const XIcon = x.icon;
                return (
                  <button
                    key={x.title}
                    type="button"
                    onClick={() => choose(i)}
                    aria-pressed={on}
                    className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl p-4 text-left transition-[background-color,box-shadow,translate] duration-500 ${
                      on
                        ? "bg-[#0b1a3b] shadow-[0_18px_36px_-20px_rgba(11,26,59,0.75)]"
                        : "bg-white ring-1 ring-[#0b1a3b]/6 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-18px_rgba(11,26,59,0.5)]"
                    }`}
                    style={{ transitionTimingFunction: SPRING }}
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors duration-500 ${
                        on ? "bg-white/10 text-[#7cc4f5]" : "bg-[#eef3fb] text-[#1e5eeb]"
                      }`}
                    >
                      <XIcon size={19} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[16px] font-bold transition-colors duration-500 ${on ? "text-white" : "text-[#0b1a3b]"}`}>
                        {x.title}
                      </span>
                      <span className={`block text-[13px] transition-colors duration-500 ${on ? "text-white/60" : "text-slate-500"}`}>
                        {on && typing && typingSide === "them" ? "typing…" : x.who}
                      </span>
                    </span>
                    <ArrowRight
                      size={16}
                      className={`shrink-0 transition-[translate,opacity,color] duration-500 ${
                        on ? "text-[#7cc4f5] opacity-100" : "-translate-x-1 text-slate-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                    {on && (
                      <span aria-hidden className="absolute inset-x-4 bottom-1.5 h-[3px] overflow-hidden rounded-full bg-white/15">
                        <span
                          className="absolute inset-y-0 left-0 rounded-full bg-[#7cc4f5]"
                          style={{ width: `${progress * 100}%`, transition: "width 0.6s ease" }}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm text-slate-600">
              Not quite any of these?{" "}
              <NavLink
                href="/enquire"
                className="font-semibold text-[#1e5eeb] underline decoration-[#1e5eeb]/30 underline-offset-4 hover:decoration-[#1e5eeb]"
              >
                Tell us about yours
              </NavLink>
            </p>
          </div>

          {/* ---------- right: the chat ---------- */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_40px_70px_-40px_rgba(11,26,59,0.55)] ring-1 ring-[#0b1a3b]/6">
              {/* header */}
              <div className="flex items-center justify-between border-b border-[#0b1a3b]/6 bg-[#0b1a3b] px-6 py-4 text-white">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[12px] font-bold tracking-[0.1em]">
                    SKAD
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold">Chat with the CommerceOS team</p>
                    <p className="flex items-center gap-1.5 text-[12px] text-white/60">
                      <span className="h-2 w-2 rounded-full bg-[#22c55e]" /> online
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white/80 transition-opacity duration-300 ${
                    hovering ? "opacity-100" : "opacity-0"
                  }`}
                >
                  paused
                </span>
              </div>

              {/* messages */}
              <div
                className="relative h-[500px] px-6 py-6"
                style={{
                  backgroundColor: "#f4f8ff",
                  backgroundImage:
                    "linear-gradient(rgba(30,94,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.05) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              >
                <div key={p} className="flex h-full animate-step-in flex-col justify-end gap-3">
                  {/* who's talking */}
                  <div className="mb-auto flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-medium text-slate-600 ring-1 ring-[#0b1a3b]/6">
                      <Icon size={13} className="text-[#1e5eeb]" />
                      A conversation with {s.who.toLowerCase()}
                    </span>
                  </div>

                  {/* 1–2: their problems */}
                  {s.pains.map(
                    (pain, k) =>
                      step > k && (
                        <div key={pain} className="flex animate-pill-pop justify-start">
                          <p className="max-w-[78%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[15px] leading-snug text-[#0b1a3b] shadow-[0_6px_14px_-10px_rgba(11,26,59,0.35)] ring-1 ring-[#0b1a3b]/6">
                            {pain}
                          </p>
                        </div>
                      )
                  )}

                  {/* 3: our answer */}
                  {step > 2 && (
                    <div className="flex animate-pill-pop justify-end">
                      <p className="max-w-[80%] rounded-2xl rounded-br-md bg-[#1e5eeb] px-4 py-3 text-[15px] leading-snug text-white shadow-[0_10px_20px_-12px_rgba(30,94,235,0.8)]">
                        <span className="font-semibold">We’ve got you. Here’s how we’d help: </span>
                        {s.reply}
                      </p>
                    </div>
                  )}

                  {/* 4: services */}
                  {step > 3 && (
                    <div className="flex animate-pill-pop justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-[#1e5eeb] px-4 py-3 text-white shadow-[0_10px_20px_-12px_rgba(30,94,235,0.8)]">
                        <p className="text-[14px] font-semibold">What we’d bring:</p>
                        <div className="mt-2 flex flex-wrap justify-end gap-1.5">
                          {s.services.map((sv) => (
                            <span key={sv} className="rounded-full bg-white/15 px-2.5 py-1 text-[12.5px] font-medium ring-1 ring-white/20">
                              {sv}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5: call to action */}
                  {step > 4 && (
                    <div className="flex animate-pill-pop justify-end">
                      <div className="flex items-center gap-4 rounded-2xl rounded-br-md bg-white px-4 py-3 shadow-[0_10px_24px_-14px_rgba(11,26,59,0.5)] ring-1 ring-[#0b1a3b]/8">
                        <span className={`${hand.className} text-[19px] text-[#1e5eeb]`}>sound like you?</span>
                        <NavLink
                          href="/enquire"
                          onClick={() => pickBusiness(s.business)}
                          className="group inline-flex items-center gap-2 rounded-xl bg-[#0b1a3b] px-4 py-2.5 text-[14px] font-semibold text-white transition-[background-color,translate,scale] duration-700 ease-spring hover:-translate-y-0.5 hover:scale-[1.04] hover:bg-[#1e5eeb] active:scale-95 active:duration-100"
                        >
                          {s.cta}
                          <ArrowRight size={14} className="transition-[translate] duration-700 ease-spring group-hover:translate-x-1" />
                        </NavLink>
                      </div>
                    </div>
                  )}

                  {/* typing */}
                  {typing && step < TOTAL && <TypingBubble side={typingSide} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}