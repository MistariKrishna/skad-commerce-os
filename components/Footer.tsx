"use client";

import { useState } from "react";
import { ArrowRight, ArrowUp, Pin } from "lucide-react";
import Logo from "./Logo";
import NavLink from "./NavLink";
import { hand } from "@/lib/fonts";

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "Services",
    links: [
      ["Twelve services", "/platform"],
      ["How it connects", "/how-it-works"],
      ["Two ways to work", "/ways"],
      ["Our method", "/method"],
    ],
  },
  {
    title: "Who we help",
    links: [
      ["D2C brands", "/solutions"],
      ["Manufacturers & exporters", "/solutions"],
      ["Jewellery & diamonds", "/industries"],
      ["Service businesses", "/solutions"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Built on CommerceOS", "/built-on"],
      ["Start a project", "/enquire"],
    ],
  },
];

const legal: [string, string][] = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Cookies", "/cookies"],
  ["Accessibility", "/accessibility"],
];

export default function Footer() {
  const [idea, setIdea] = useState("");
  const [pinned, setPinned] = useState(false);
  const [pinKey, setPinKey] = useState(0);

  const pin = () => {
    const v = idea.trim();
    if (!v) return;
    try {
      sessionStorage.setItem("skad-idea", v);
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new CustomEvent("skad:idea", { detail: v }));
    setPinned(true);
    setPinKey((k) => k + 1);
  };

  const hasIdea = idea.trim().length > 0;

  return (
    <footer className="relative overflow-hidden bg-[#0b1a3b] text-white">
      {/* ================= CTA band ================= */}
      <div
        className="border-b border-dashed border-white/10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,196,245,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,196,245,0.06) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      >
        <div className="wrap grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <h2 className="text-balance text-[2.3rem] font-bold leading-[1.04] tracking-[-0.035em] sm:text-[3.2rem] lg:text-[3.6rem]">
              Every brand on this page started as a note.
            </h2>
            <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-white/75">
              Write yours down. We’ll take it from there, from research to the first orders.
            </p>
            <p className={`${hand.className} mt-8 hidden -rotate-2 items-center gap-2 text-[24px] text-[#7cc4f5] lg:flex`}>
              this is how every project starts
              <svg width="54" height="26" viewBox="0 0 54 26" fill="none" aria-hidden>
                <path d="M2 18 C 18 4, 34 4, 50 12" stroke="#7cc4f5" strokeWidth="2" strokeLinecap="round" />
                <path d="M42 5 L51 12 L42 19" stroke="#7cc4f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>
          </div>

          {/* sticky note */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {pinned && (
                <span
                  key={`pin${pinKey}`}
                  className="absolute -top-4 left-1/2 z-10 grid h-9 w-9 -translate-x-1/2 animate-pill-pop place-items-center rounded-full bg-[#e5484d] text-white shadow-[0_6px_14px_-4px_rgba(0,0,0,0.5)]"
                  aria-hidden
                >
                  <Pin size={16} />
                </span>
              )}
              <div
                key={`note${pinKey}`}
                className={`relative rounded-[4px] bg-[#fff3b0] p-6 text-[#0b1a3b] shadow-[0_30px_50px_-25px_rgba(0,0,0,0.6)] ${
                  pinKey > 0 ? "animate-rubber" : ""
                }`}
                style={{ rotate: "-2deg" }}
              >
                <label htmlFor="footer-idea" className={`${hand.className} block text-[22px] leading-none text-[#1e5eeb]`}>
                  your idea
                </label>
                <textarea
                  id="footer-idea"
                  value={idea}
                  maxLength={160}
                  rows={3}
                  onChange={(e) => {
                    setIdea(e.target.value);
                    if (pinned) setPinned(false);
                  }}
                  placeholder="my idea is…"
                  className={`${hand.className} mt-2 w-full resize-none bg-transparent text-[26px] leading-[1.25] text-[#0b1a3b] outline-none placeholder:text-[#0b1a3b]/35`}
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent 0 31px, rgba(11,26,59,0.12) 31px 32px)",
                    backgroundAttachment: "local",
                  }}
                />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs text-[#0b1a3b]/50">{idea.length}/160</span>
                  <NavLink
                    href="/enquire"
                    onClick={pin}
                    className="group inline-flex items-center gap-2 rounded-lg bg-[#0b1a3b] px-4 py-2.5 text-sm font-semibold text-white transition-[background-color,translate,scale] duration-700 ease-spring hover:-translate-y-0.5 hover:scale-[1.05] hover:bg-[#1e5eeb] active:scale-95 active:duration-100"
                  >
                    {hasIdea ? "Pin it to an enquiry" : "Start an enquiry"}
                    <ArrowRight size={14} className="transition-[translate] duration-700 ease-spring group-hover:translate-x-1" />
                  </NavLink>
                </div>
                {pinned && (
                  <p className={`${hand.className} mt-3 animate-step-in text-[19px] text-[#1e5eeb]`}>pinned to your enquiry</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= links ================= */}
      <div className="wrap py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo variant="white" className="h-10" />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/65">
              One team to build, launch and grow your business, from the first idea to repeat orders.
            </p>
            <NavLink
              href="/enquire"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#0b1a3b] transition-[background-color,translate,scale] duration-700 ease-spring hover:-translate-y-0.5 hover:scale-[1.04] hover:bg-[#dbeafe] active:scale-95 active:duration-100"
            >
              Start a project
              <ArrowRight size={14} className="transition-[translate] duration-700 ease-spring group-hover:translate-x-1" />
            </NavLink>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title} className="min-w-0">
                <p className="text-sm font-semibold text-white">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <NavLink
                        href={href}
                        className="group relative inline-block text-[14.5px] leading-snug text-white/65 transition-colors duration-300 hover:text-white"
                      >
                        {label}
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#7cc4f5] transition-transform duration-300 group-hover:scale-x-100"
                        />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* ================= bottom bar ================= */}
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/50">© 2026 SKAD CommerceOS</p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map(([label, href]) => (
              <a key={label} href={href} className="text-[13px] text-white/50 transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </div>

          <button
  type="button"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="group inline-flex w-fit items-center gap-2 rounded-full bg-white/10 py-2 pl-4 pr-2 text-[13px] font-semibold text-white ring-1 ring-white/10 transition-[background-color,translate,scale] duration-700 ease-spring hover:-translate-y-1 hover:scale-[1.05] hover:bg-white/15 active:scale-95 active:duration-100"
>
  Back to top
  <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#0b1a3b] transition-[translate] duration-700 ease-spring group-hover:-translate-y-0.5">
    <ArrowUp size={13} />
  </span>
</button>
        </div>
      </div>
    </footer>
  );
}