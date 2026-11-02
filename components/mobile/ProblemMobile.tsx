"use client";

import { ArrowDown, Camera, Check, Code, Mail, Megaphone, Palette, Sheet, Truck } from "lucide-react";
import Appear, { MobileHead, useSeen } from "../Appear";
import { hand } from "@/lib/fonts";

const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";
const BLUE = "#1e5eeb";

const vendors = [
  { from: "Brand agency", to: "Brand", icon: Palette, gripe: "sending the brief again?" },
  { from: "Web developer", to: "Store", icon: Code },
  { from: "Ad agency", to: "Marketing", icon: Megaphone, gripe: "ads don’t match the site" },
  { from: "Photographer", to: "Content", icon: Camera },
  { from: "Email tool", to: "CRM", icon: Mail },
  { from: "Spreadsheets", to: "Analytics", icon: Sheet, gripe: "which sheet is right?" },
  { from: "Courier portal", to: "Operations", icon: Truck, gripe: "where’s that order?" },
];

const contrasts = [
  { problem: "You repeat the brief to every new vendor.", fix: "You brief one team, once." },
  { problem: "Customer, order and marketing data never meet.", fix: "One view of customers, orders and campaigns." },
  { problem: "Growth stalls while vendors coordinate.", fix: "The team that built it keeps growing it." },
];

function Contrast({ problem, fix }: { problem: string; fix: string }) {
  const { ref, seen } = useSeen<HTMLDivElement>(0.7);
  return (
    <div ref={ref} className="rounded-2xl bg-[#f4f8ff] p-5 ring-1 ring-[#0b1a3b]/6">
      <p className="text-[15px] leading-relaxed">
        <span
          className={`transition-colors duration-500 ${seen ? "text-slate-400" : "text-slate-700"}`}
          style={{
            backgroundImage: `linear-gradient(${BLUE}, ${BLUE})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 55%",
            backgroundSize: seen ? "100% 2px" : "0% 2px",
            WebkitBoxDecorationBreak: "clone",
            boxDecorationBreak: "clone",
            transition: "background-size 0.6s ease-out 0.2s, color 0.5s ease 0.2s",
          }}
        >
          {problem}
        </span>
      </p>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ${seen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        style={{ transitionDelay: "500ms" }}
      >
        <div className="overflow-hidden">
          <p
            className="mt-3 flex items-start gap-2.5 text-[16px] font-semibold leading-snug text-[#0b1a3b]"
            style={{ opacity: seen ? 1 : 0, transition: "opacity 0.4s ease 0.7s" }}
          >
            <span className="mt-[1px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1e5eeb] text-white">
              <Check size={12} strokeWidth={3} />
            </span>
            {fix}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProblemMobile() {
  // destructure so `seen` is plain state, not read off an object holding a ref
  const { ref: beforeRef, seen: beforeSeen } = useSeen<HTMLDivElement>(0.2);
  const { ref: afterRef, seen: afterSeen } = useSeen<HTMLDivElement>(0.3);

  return (
    <section id="problem-m" className="bg-white py-20">
      <div className="wrap max-w-2xl">
        <MobileHead
          title="Seven vendors, seven briefs, and nobody sees the whole picture."
          text="Most businesses stitch together agencies, freelancers and software to get to market. Every hand-off loses context."
        />

        {/* before */}
        <div ref={beforeRef} className="mt-10 rounded-2xl bg-[#f4f8ff] p-5 ring-1 ring-[#0b1a3b]/6">
          <p className="text-sm font-semibold text-slate-500">Today: seven separate vendors</p>
          <ul className="mt-4 space-y-2.5">
            {vendors.map((v, i) => {
              const Icon = v.icon;
              return (
                <li
                  key={v.from}
                  className="rounded-xl bg-white px-3.5 py-3 shadow-[0_6px_14px_-10px_rgba(11,26,59,0.35)] ring-1 ring-slate-200"
                  style={{
                    opacity: beforeSeen ? 1 : 0,
                    translate: beforeSeen ? "0 0" : `${i % 2 ? 18 : -18}px 0`,
                    rotate: `${i % 2 ? 1.2 : -1.2}deg`,
                    transition: `opacity 0.5s ease ${i * 80}ms, translate 0.7s ${SPRING} ${i * 80}ms`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500">
                      <Icon size={15} />
                    </span>
                    <span className="text-[15px] font-medium text-slate-700">{v.from}</span>
                  </div>
                  {v.gripe && (
                    <p className={`${hand.className} mt-1 pl-11 text-[18px] leading-snug text-slate-500`}>“{v.gripe}”</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* arrow */}
        <div className="flex flex-col items-center gap-2 py-6">
          <span className={`${hand.className} text-[22px] text-[#1e5eeb]`}>now, with one team</span>
          <span className="grid h-10 w-10 animate-bounce place-items-center rounded-full bg-[#1e5eeb] text-white">
            <ArrowDown size={18} />
          </span>
        </div>

        {/* after */}
        <div ref={afterRef} className="rounded-2xl bg-[#0b1a3b] p-5 text-white shadow-[0_30px_60px_-35px_rgba(11,26,59,0.8)]">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-[13px] font-bold tracking-[0.1em]">
              SKAD
            </span>
            <div>
              <p className="text-[20px] font-bold tracking-[-0.02em]">One SKAD team</p>
              <p className="text-[13px] text-white/60">Every vendor’s job, under one roof</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {vendors.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.to}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 ring-1 ring-white/10"
                  style={{
                    opacity: afterSeen ? 1 : 0,
                    scale: afterSeen ? "1" : "0.85",
                    transition: `opacity 0.4s ease ${200 + i * 90}ms, scale 0.55s ${SPRING} ${200 + i * 90}ms`,
                  }}
                >
                  <Icon size={15} className="shrink-0 text-[#7cc4f5]" />
                  <span className="min-w-0 flex-1 text-[14px] font-medium">{v.to}</span>
                  <Check size={14} className="shrink-0 text-[#7cc4f5]" />
                </div>
              );
            })}
          </div>
          <p className={`${hand.className} mt-5 text-center text-[22px] text-[#7cc4f5]`}>one brief, one team</p>
        </div>

        {/* problem → fix */}
        <div className="mt-8 space-y-3">
          {contrasts.map((c, i) => (
            <Appear key={c.problem} delay={i * 60}>
              <Contrast problem={c.problem} fix={c.fix} />
            </Appear>
          ))}
        </div>
      </div>
    </section>
  );
}