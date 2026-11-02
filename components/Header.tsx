"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";
import NavLink from "./NavLink";

const links = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Built on CommerceOS", href: "/built-on" },
  { label: "Insights", href: "/method" },
];

type Pos = { left: number; width: number };

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState<Pos>({ left: 0, width: 0 });
  const [bounceKey, setBounceKey] = useState(0);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const selectedIndex = links.findIndex((l) => l.href === pathname);
  const selected = selectedIndex >= 0 ? selectedIndex : null;

  const target = hovered ?? selected;
  const visible = target !== null;
  const solid = target !== null && target === selected;

  const moveTo = (i: number) => {
    const el = linkRefs.current[i];
    if (el) setPos({ left: el.offsetLeft, width: el.offsetWidth });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // place the pill on the current route's link (on load, after fonts, on route change)
  useEffect(() => {
    const measureSelected = () => {
      const i = links.findIndex((l) => l.href === pathname);
      const el = i >= 0 ? linkRefs.current[i] : null;
      if (el) setPos({ left: el.offsetLeft, width: el.offsetWidth });
    };
    const raf = requestAnimationFrame(measureSelected);
    document.fonts?.ready.then(measureSelected);
    window.addEventListener("resize", measureSelected);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measureSelected);
    };
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleEnter = (i: number) => {
    setHovered(i);
    moveTo(i);
  };

  const handleLeave = () => {
    setHovered(null);
    if (selected !== null) moveTo(selected);
  };

  const handleSelect = (i: number) => {
    moveTo(i);
    setBounceKey((k) => k + 1);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={`relative mx-auto overflow-hidden rounded-2xl border border-white/70 backdrop-blur-2xl backdrop-saturate-[1.8] transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          scrolled
            ? "max-w-[1080px] bg-white/80 shadow-[0_12px_40px_-12px_rgba(15,40,90,0.35),inset_0_1px_0_0_rgba(255,255,255,0.9)]"
            : "max-w-[1200px] bg-white/[0.72] shadow-[0_10px_40px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.9)]"
        }`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/60 via-white/10 to-sky-100/20"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"
        />

        <div className="relative flex h-16 items-center justify-between gap-4 pl-4 pr-2.5 sm:pl-5">
          <Logo className="h-8 sm:h-9 lg:h-10" />

          <nav className="relative hidden items-center gap-0.5 lg:flex" aria-label="Primary" onMouseLeave={handleLeave}>
            <span
              aria-hidden
              className={`pointer-events-none absolute left-0 top-1/2 h-8 transition-[transform,width,opacity] duration-[420ms] ease-spring ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                width: pos.width,
                transform: `translate(${pos.left}px, -50%) scale(${visible ? 1 : 0.6})`,
              }}
            >
              <span
                key={bounceKey}
                className={`block h-full w-full rounded-full transition-[background-color,box-shadow] duration-300 ${
                  bounceKey > 0 ? "animate-pill-pop" : ""
                } ${
                  solid
                    ? "bg-blue-600 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_6px_16px_-6px_rgba(37,99,235,0.7)]"
                    : "bg-sky-500/10 shadow-[inset_0_0_0_1px_rgba(14,165,233,0.22),0_4px_14px_-6px_rgba(37,99,235,0.3)]"
                }`}
              />
            </span>

            {links.map((l, i) => {
              const onPill = target === i;
              const isSelected = selected === i;
              return (
                <NavLink
                  key={l.label}
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  href={l.href}
                  aria-current={isSelected ? "page" : undefined}
                  onMouseEnter={() => handleEnter(i)}
                  onFocus={() => handleEnter(i)}
                  onBlur={handleLeave}
                  onClick={() => handleSelect(i)}
                  className={`group relative z-10 rounded-full px-3 py-1.5 text-[13px] font-medium outline-none transition-colors duration-200 ${
                    onPill && isSelected ? "text-white" : onPill || isSelected ? "text-blue-700" : "text-slate-700"
                  }`}
                >
                  <span
                    key={isSelected ? `sel-${bounceKey}` : "idle"}
                    className={`inline-block group-hover:animate-rubber group-focus-visible:animate-rubber ${
                      isSelected && bounceKey > 0 ? "animate-rubber" : ""
                    }`}
                  >
                    {l.label}
                  </span>
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <NavLink
              href="/enquire"
              className="group hidden items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_6px_16px_-6px_rgba(37,99,235,0.6)] transition-[transform,box-shadow] duration-[420ms] ease-spring hover:-translate-y-0.5 hover:scale-[1.06] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_12px_26px_-8px_rgba(37,99,235,0.75)] active:scale-95 active:duration-100 sm:inline-flex"
            >
              Enquire
              <ArrowRight size={14} className="transition-transform duration-[420ms] ease-spring group-hover:translate-x-1" />
            </NavLink>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-800 transition-[transform,background-color] duration-[420ms] ease-spring hover:scale-110 hover:bg-white active:scale-90 active:duration-100 lg:hidden"
            >
             <span className="relative block h-4 w-5" aria-hidden>
  <span
    className="absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current transition-[translate,rotate] duration-500 ease-spring"
    style={{ translate: open ? "0 7px" : "0 0", rotate: open ? "45deg" : "0deg" }}
  />
  <span
    className="absolute left-0 top-[7px] h-[2px] rounded-full bg-current transition-[width,opacity] duration-300 ease-out"
    style={{ width: open ? "0px" : "14px", opacity: open ? 0 : 1 }}
  />
  <span
    className="absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current transition-[translate,rotate] duration-500 ease-spring"
    style={{ translate: open ? "0 -7px" : "0 0", rotate: open ? "-45deg" : "0deg" }}
  />
</span>
            </button>
          </div>
        </div>

        <div
          className={`relative grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] lg:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <nav className="flex flex-col gap-1 border-t border-slate-200/70 p-3" aria-label="Mobile">
              {links.map((l, i) => (
                <NavLink
                  key={l.label}
                  href={l.href}
                  aria-current={selected === i ? "page" : undefined}
                  onClick={() => handleSelect(i)}
                  style={{ transitionDelay: open ? `${50 + i * 30}ms` : "0ms" }}
                  className={`rounded-xl px-3 py-3 text-[15px] font-medium transition-all duration-[420ms] ease-spring hover:translate-x-1.5 active:scale-[0.96] ${
                    selected === i
                      ? "bg-blue-600 text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.6)]"
                      : "text-slate-700 hover:bg-sky-500/10 hover:text-blue-700"
                  } ${open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
                >
                  {l.label}
                </NavLink>
              ))}
              <NavLink
                href="/enquire"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition-transform duration-[420ms] ease-spring active:scale-95 sm:hidden"
              >
                Enquire about CommerceOS
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}