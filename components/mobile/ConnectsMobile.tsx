"use client";

import { Activity, ArrowRight, Layers, RefreshCw, Search, Store, TrendingUp, type LucideIcon } from "lucide-react";
import NavLink from "../NavLink";
import { MobileHead } from "../Appear";
import { hand } from "@/lib/fonts";

const steps: { name: string; icon: LucideIcon; items: string[]; caption: string; outcome: string }[] = [
  { name: "Insight", icon: Search, items: ["Market Intelligence"], caption: "We study your market, competitors and prices before anything is made.", outcome: "what to build, and for whom" },
  { name: "Foundation", icon: Layers, items: ["Brand Infrastructure", "Product"], caption: "Research becomes a brand, packaging and a product range ready to sell.", outcome: "a brand and range ready for market" },
  { name: "Commerce", icon: Store, items: ["E-commerce", "Content"], caption: "We build the store, list on marketplaces and create the content that sells.", outcome: "live, shoppable and well presented" },
  { name: "Demand", icon: TrendingUp, items: ["SEO/GEO", "Marketing", "CRM"], caption: "Search, campaigns and CRM bring customers in, then bring them back.", outcome: "found, chosen and chosen again" },
  { name: "Run & learn", icon: Activity, items: ["Analytics", "Operations"], caption: "Orders ship on time, and the numbers show what’s working.", outcome: "delivered reliably, measured clearly" },
];

export default function ConnectsMobile() {
  return (
    <section id="how-it-works-m" className="bg-white py-20">
      <div className="wrap max-w-2xl">
        <MobileHead
          title="Every step builds on the last."
          text="Five steps on the same foundation. Scroll to stack them up: nothing is rebuilt as you grow."
        />

        {/* cards stack on top of each other as you scroll */}
        <div className="relative mt-10">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="sticky" style={{ top: 92 + i * 14 }}>
                <article className="mb-5 rounded-2xl bg-white p-5 shadow-[0_-12px_30px_-18px_rgba(11,26,59,0.35),0_18px_36px_-24px_rgba(11,26,59,0.45)] ring-1 ring-[#0b1a3b]/8">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1e5eeb] text-[13px] font-bold text-white">{i + 1}</span>
                      <span className="text-[13px] font-medium text-slate-500">Step {i + 1} of 5</span>
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eef3fb] text-[#1e5eeb]">
                      <Icon size={18} />
                    </span>
                  </div>
                  <h3 className="mt-3 text-[1.6rem] font-bold tracking-[-0.03em] text-[#0b1a3b]">{s.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.caption}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <span key={it} className="rounded-full bg-[#eef3fb] px-3 py-1.5 text-[13px] font-medium text-[#0b1a3b] ring-1 ring-[#1e5eeb]/15">
                        {it}
                      </span>
                    ))}
                  </div>
                  <p className={`${hand.className} mt-3 -rotate-1 text-[20px] leading-snug text-[#1e5eeb]`}>result: {s.outcome}</p>
                </article>
              </div>
            );
          })}

          <div className="sticky" style={{ top: 92 + steps.length * 14 }}>
            <article className="rounded-2xl bg-[#0b1a3b] p-5 text-white shadow-[0_-12px_30px_-18px_rgba(11,26,59,0.5)]">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#7cc4f5]">
                <RefreshCw size={18} />
              </span>
              <h3 className="mt-3 text-[1.6rem] font-bold tracking-[-0.03em]">One system</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                Each step feeds the next, and what we learn from every sale flows back into research.
              </p>
              <p className={`${hand.className} mt-3 text-[21px] text-[#7cc4f5]`}>and round it goes</p>
            </article>
          </div>
        </div>

        <div className="mt-10">
          <NavLink
            href="/platform"
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#0b1a3b] px-6 py-3.5 text-[15px] font-semibold text-white transition-[scale] duration-200 active:scale-[0.97]"
          >
            See all twelve services
            <ArrowRight size={15} />
          </NavLink>
        </div>
      </div>
    </section>
  );
}