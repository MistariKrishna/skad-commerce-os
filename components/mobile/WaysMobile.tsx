"use client";

import { ArrowRight, Check } from "lucide-react";
import NavLink from "../NavLink";
import Appear, { MobileHead } from "../Appear";
import { hand } from "@/lib/fonts";

const dayToDay = [
  "Store updates",
  "Product listings",
  "Content and photography",
  "Ads and campaigns",
  "Email and WhatsApp",
  "Order operations",
  "Reporting",
];

const options = [
  {
    dark: true,
    title: "We run it for you.",
    text: "Our team builds the business and keeps it running. You focus on your product and your customers.",
    we: ["Strategy and setup", ...dayToDay],
    you: ["Your product", "Your customers"],
    fit: ["Founders without an in-house team", "Businesses that want one partner for everything"],
    cta: "Talk to us about managed",
  },
  {
    dark: false,
    title: "We build it, your team runs it.",
    text: "We set everything up, train your people and stay on hand for support. Day-to-day running moves to your team.",
    we: ["Strategy and setup", "Training your team", "Support when you need it"],
    you: dayToDay,
    fit: ["Businesses with their own staff", "Teams that want to own the work in-house"],
    cta: "Talk to us about hand-over",
  },
];

export default function WaysMobile() {
  return (
    <section id="ways-m" className="bg-white py-20">
      <div className="wrap max-w-2xl">
        <MobileHead
          title="Two ways to work with us."
          text="Hand us the whole job, or let us build it and train your team to run it."
        />

        <div className="mt-10">
          {options.map((o, i) => {
            const d = o.dark;
            const chip = d
              ? "bg-white/10 text-white ring-white/15"
              : "bg-[#eef3fb] text-[#0b1a3b] ring-[#1e5eeb]/15";
            return (
              <div key={o.title}>
                {i === 1 && (
                  <p className={`${hand.className} py-5 text-center text-[24px] text-[#1e5eeb]`}>or</p>
                )}
                <Appear>
                  <article
                    className={`rounded-3xl p-5 ring-1 ${
                      d ? "bg-[#0b1a3b] text-white ring-[#0b1a3b] shadow-[0_30px_60px_-35px_rgba(11,26,59,0.8)]" : "bg-white text-[#0b1a3b] ring-[#0b1a3b]/10 shadow-[0_24px_48px_-32px_rgba(11,26,59,0.5)]"
                    }`}
                  >
                    <p className={`text-[13px] font-medium ${d ? "text-[#7cc4f5]" : "text-[#1e5eeb]"}`}>Option {i + 1}</p>
                    <h3 className="mt-1 text-[1.6rem] font-bold leading-tight tracking-[-0.03em]">{o.title}</h3>
                    <p className={`mt-3 text-[15.5px] leading-relaxed ${d ? "text-white/80" : "text-slate-600"}`}>{o.text}</p>

                    <p className="mt-5 text-sm font-semibold">We handle</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {o.we.map((t) => (
                        <span key={t} className={`rounded-full px-3 py-1.5 text-[13px] font-medium ring-1 ${chip}`}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 text-sm font-semibold">You handle</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {o.you.map((t) => (
                        <span
                          key={t}
                          className={`rounded-full px-3 py-1.5 text-[13px] font-medium ring-1 ${
                            d ? "bg-transparent text-white/80 ring-white/25" : "bg-[#1e5eeb] text-white ring-[#1e5eeb]"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <p className="mt-5 text-sm font-semibold">A good fit for</p>
                    <ul className="mt-2 space-y-2">
                      {o.fit.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[15px]">
                          <span className={`mt-[2px] grid h-5 w-5 shrink-0 place-items-center rounded-full ${d ? "bg-[#7cc4f5] text-[#0b1a3b]" : "bg-[#1e5eeb] text-white"}`}>
                            <Check size={12} strokeWidth={3} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <NavLink
                      href="/enquire"
                      className={`mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 text-[15px] font-semibold transition-[scale] duration-200 active:scale-[0.97] ${
                        d ? "bg-white text-[#0b1a3b]" : "bg-[#0b1a3b] text-white"
                      }`}
                    >
                      {o.cta}
                      <ArrowRight size={15} />
                    </NavLink>
                  </article>
                </Appear>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">You can start fully managed and take more in-house over time.</p>
      </div>
    </section>
  );
}