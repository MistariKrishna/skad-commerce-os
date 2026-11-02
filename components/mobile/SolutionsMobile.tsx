"use client";

import { ArrowRight, Briefcase, Factory, Gem, ShoppingBag, type LucideIcon } from "lucide-react";
import NavLink from "../NavLink";
import Appear, { MobileHead } from "../Appear";
import { hand } from "@/lib/fonts";

type Solution = {
  business: string;
  icon: LucideIcon;
  short: string;
  eyebrow: string;
  title: string;
  text: string;
  pains: string[];
  services: string[];
  cta: string;
};

const solutions: Solution[] = [
  {
    business: "D2C brand",
    icon: ShoppingBag,
    short: "D2C brand",
    eyebrow: "For founders and growing brands",
    title: "D2C brands",
    text: "Launch without hiring ten agencies, then grow with SEO, CRM and automation working from the same data.",
    pains: ["too many agencies, no one in charge", "ads bring buyers, but they don’t come back"],
    services: ["Brand Infrastructure", "E-commerce", "Marketing", "CRM"],
    cta: "Start as a D2C brand",
  },
  {
    business: "Manufacturer / exporter",
    icon: Factory,
    short: "Manufacturer",
    eyebrow: "For makers and traders",
    title: "Manufacturers & exporters",
    text: "Take a proven product range online, with B2B ordering, direct-to-consumer channels and international trade in one place.",
    pains: ["great product, no online presence", "orders still arrive by email and phone"],
    services: ["E-commerce", "Content", "Operations", "Automation"],
    cta: "Start as a manufacturer",
  },
  {
    business: "Jeweller",
    icon: Gem,
    short: "Jeweller",
    eyebrow: "For jewellers",
    title: "Jewellery & diamonds",
    text: "Catalogue, content and storefronts made for high-value, considered purchases, where trust comes before the sale.",
    pains: ["photos don’t show the sparkle", "buyers need trust before they pay"],
    services: ["Content", "E-commerce", "Brand Infrastructure", "Marketing"],
    cta: "Start as a jeweller",
  },
  {
    business: "Service business",
    icon: Briefcase,
    short: "Service firm",
    eyebrow: "For advisers and service firms",
    title: "Service businesses",
    text: "Turn expertise into a findable, bookable service, with leads captured, followed up and measured automatically.",
    pains: ["hard to find on Google", "leads slip through the cracks"],
    services: ["SEO/GEO", "CRM", "Automation", "Analytics"],
    cta: "Start as a service business",
  },
];

const pickBusiness = (biz: string) => {
  try {
    sessionStorage.setItem("skad-business", biz);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent("skad:business", { detail: biz }));
};

export default function SolutionsMobile() {
  const jump = (i: number) => document.getElementById(`sol-m-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="solutions-m" className="bg-[#e3eaf6] py-20">
      <div className="wrap max-w-2xl">
        <MobileHead
          title="Built around the way your business works."
          text="Pick the one that sounds like you. We’ll bring the services that matter to it."
        />

        {/* which one are you? */}
        <Appear className="mt-8">
          <p className="text-sm font-semibold text-[#0b1a3b]">Which one are you?</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => jump(i)}
                  className="flex flex-col items-start gap-3 rounded-2xl bg-white p-4 text-left ring-1 ring-[#0b1a3b]/8 transition-[scale,box-shadow] duration-300 active:scale-[0.97]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eef3fb] text-[#1e5eeb]">
                    <Icon size={18} />
                  </span>
                  <span className="text-[15px] font-semibold leading-tight text-[#0b1a3b]">{s.short}</span>
                </button>
              );
            })}
          </div>
        </Appear>

        {/* every audience, in full */}
        <div className="mt-10 space-y-5">
          {solutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <Appear key={s.title}>
                <article id={`sol-m-${i}`} className="scroll-mt-24 overflow-hidden rounded-3xl bg-[#0b1a3b] text-white shadow-[0_30px_60px_-35px_rgba(11,26,59,0.75)]">
                  <div
                    className="flex items-center gap-4 border-b border-dashed border-white/15 p-5"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(124,196,245,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,196,245,0.08) 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                    }}
                  >
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#7cc4f5]">
                      <Icon size={24} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] text-white/60">{s.eyebrow}</p>
                      <h3 className="text-[1.45rem] font-bold leading-tight tracking-[-0.02em]">{s.title}</h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[15.5px] leading-relaxed text-white/80">{s.text}</p>

                    <p className={`${hand.className} mt-5 text-[21px] text-[#7cc4f5]`}>sounds familiar?</p>
                    <ul className="mt-1 space-y-1">
                      {s.pains.map((p) => (
                        <li key={p} className={`${hand.className} -rotate-1 text-[21px] leading-snug text-white`}>
                          “{p}”
                        </li>
                      ))}
                    </ul>

                    <p className="mt-5 text-sm font-semibold">What we’ll bring</p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {s.services.map((sv) => (
                        <span key={sv} className="rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-medium ring-1 ring-white/15">
                          {sv}
                        </span>
                      ))}
                    </div>

                    <NavLink
                      href="/enquire"
                      onClick={() => pickBusiness(s.business)}
                      className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-5 py-3.5 text-[15px] font-semibold text-[#0b1a3b] transition-[scale] duration-200 active:scale-[0.97]"
                    >
                      {s.cta}
                      <ArrowRight size={15} />
                    </NavLink>
                  </div>
                </article>
              </Appear>
            );
          })}
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