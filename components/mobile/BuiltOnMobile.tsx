"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import NavLink from "../NavLink";
import Appear, { MobileHead } from "../Appear";
import { hand } from "@/lib/fonts";

// Use the same screenshot paths as your hero
const projects = [
  {
    name: "Detara",
    category: "Fine diamond jewellery",
    shot: "/images/brands/detara-homepage.webp",
    address: "detara",
    note: "design-your-own, built in",
    built: ["Luxury storefront", "Design-your-own jewellery flow", "Multi-currency pricing"],
  },
  {
    name: "Benavi",
    category: "Silver jewellery",
    shot: "/images/brands/benavi-homepage.webp",
    address: "benavi.in",
    note: "browse by occasion, theme, colour",
    built: ["Storefront with campaign banners", "Shop by occasion, theme and colour", "Search and account"],
  },
  {
    name: "Case Suno",
    category: "Case advisor platform",
    shot: "/images/brands/casesuno-homepage.webp",
    address: "casesuno",
    note: "WhatsApp first",
    built: ["Service website", "WhatsApp-first enquiries", "Request tracking for clients"],
  },
];

export default function BuiltOnMobile() {
  return (
    <section id="built-on-m" className="bg-white py-20">
      <div className="wrap max-w-2xl">
        <MobileHead
          title="Real brands, real work."
          text="Live websites built on CommerceOS, running today. Each one started as a brief, just like yours."
        />

        <div className="mt-10 space-y-10">
          {projects.map((p, i) => (
            <Appear key={p.name}>
              <article>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[1.6rem] font-bold tracking-[-0.03em] text-[#0b1a3b]">
                    <span className="mr-2 text-[15px] font-semibold text-[#1e5eeb]">0{i + 1}</span>
                    {p.name}
                  </h3>
                  <span className="text-[13px] text-slate-500">{p.category}</span>
                </div>

                <div className="mt-3 overflow-hidden rounded-2xl bg-white shadow-[0_24px_48px_-28px_rgba(11,26,59,0.55)] ring-1 ring-[#0b1a3b]/10">
                  <div className="flex h-9 items-center gap-1.5 border-b border-slate-200/80 bg-[#f6f8fc] px-3.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    <span className="mx-auto flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] text-slate-500 ring-1 ring-slate-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {p.address}
                    </span>
                    <span className="w-10" />
                  </div>
                  <div className="relative aspect-[16/10]">
                    <Image src={p.shot} alt={`${p.name} website`} fill sizes="(min-width: 672px) 672px, 100vw" className="object-cover object-top" />
                  </div>
                </div>

                <p className={`${hand.className} mt-3 -rotate-1 text-[21px] leading-tight text-[#1e5eeb]`}>{p.note}</p>

                <p className="mt-4 text-sm font-semibold text-[#0b1a3b]">What we built</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {p.built.map((b) => (
                    <span key={b} className="inline-flex items-center gap-1.5 rounded-full bg-[#eef3fb] px-3 py-1.5 text-[13px] text-[#0b1a3b] ring-1 ring-[#1e5eeb]/15">
                      <Check size={12} className="text-[#1e5eeb]" />
                      {b}
                    </span>
                  ))}
                </div>
              </article>
            </Appear>
          ))}
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