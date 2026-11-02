"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  Accessibility,
  Ban,
  BellOff,
  Building2,
  ChevronDown,
  Cookie,
  FileText,
  Inbox,
  Lock,
  Mail,
  Scale,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import Appear from "../Appear";
import { hand } from "@/lib/fonts";

const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";

const ICONS = {
  company: Building2,
  collect: Inbox,
  use: Sparkles,
  share: Share2,
  keep: Lock,
  rights: UserCheck,
  contact: Mail,
  shield: ShieldCheck,
  never: Ban,
  control: SlidersHorizontal,
  unsubscribe: BellOff,
  file: FileText,
  scale: Scale,
  cookie: Cookie,
  access: Accessibility,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICONS;
export type LegalSection = { id: string; title: string; icon: IconKey; body: ReactNode };
export type Highlight = { icon: IconKey; title: string; text: string };

type Props = {
  eyebrow?: string;
  title: string;
  updated: string;
  intro: ReactNode;
  email: string;
  heroIcon: IconKey;
  heroChips?: string[];
  highlights?: Highlight[];
  sections: LegalSection[];
};

const prose =
  "[&_p]:mt-4 [&_p]:text-[16px] [&_p]:leading-[1.75] [&_p]:text-slate-600 " +
  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-[16px] [&_ul]:leading-[1.7] [&_ul]:text-slate-600 " +
  "[&_li::marker]:text-[#1e5eeb] [&_strong]:font-semibold [&_strong]:text-[#0b1a3b] " +
  "[&_a]:font-medium [&_a]:text-[#1e5eeb] [&_a]:underline [&_a]:decoration-[#1e5eeb]/30 [&_a]:underline-offset-4 hover:[&_a]:decoration-[#1e5eeb]";

const ROW = 44; // table-of-contents row height incl. gap

export default function LegalPage({
  eyebrow = "Legal",
  title,
  updated,
  intro,
  email,
  heroIcon,
  heroChips = [],
  highlights = [],
  sections,
}: Props) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const ids = sections.map((s) => s.id).join("|");
  const activeIndex = Math.max(0, sections.findIndex((s) => s.id === active));
  const HeroIcon = ICONS[heroIcon];

  useEffect(() => {
    const r = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(r);
  }, []);

  // highlight the section being read
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    ids.split("|").forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);

  const goTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const enter = (delay: number) => ({
    className: `transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
      ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    }`,
    style: { transitionDelay: `${delay}ms` } as CSSProperties,
  });

  const tocList = (withPill: boolean) => (
    <div className="relative">
      {withPill && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-10 rounded-xl bg-[#0b1a3b] shadow-[0_8px_18px_-10px_rgba(11,26,59,0.7)]"
          style={{ transform: `translateY(${activeIndex * ROW}px)`, transition: `transform 0.5s ${SPRING}` }}
        />
      )}
      <ol className="relative space-y-1">
        {sections.map((s, i) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => goTo(s.id)}
                className={`flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-[14px] transition-colors duration-300 ${
                  withPill
                    ? on
                      ? "font-semibold text-white"
                      : "text-slate-600 hover:text-[#0b1a3b]"
                    : on
                      ? "bg-[#eef4ff] font-semibold text-[#0b1a3b]"
                      : "text-slate-600"
                }`}
              >
                <span className={`text-[12px] tabular-nums ${withPill && on ? "text-[#7cc4f5]" : "text-slate-400"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{s.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );

  return (
    <main className="bg-white">
      {/* ---------- header band ---------- */}
      <section className="relative overflow-hidden bg-[#e3eaf6] pb-24 pt-32 lg:pb-28 lg:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(30,94,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 85% 85% at 50% 40%, #000 30%, transparent 85%)",
          }}
        />
        <div className="wrap relative grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p {...enter(0)} className={`${enter(0).className} text-sm font-semibold text-[#1e5eeb]`}>
              {eyebrow}
            </p>
            <h1
              {...enter(80)}
              className={`${enter(80).className} mt-2 text-balance text-[2.5rem] font-bold leading-[1.04] tracking-[-0.035em] text-[#0b1a3b] sm:text-[3.2rem] lg:text-[3.8rem]`}
            >
              {title}
            </h1>
            <p {...enter(160)} className={`${enter(160).className} ${hand.className} mt-3 -rotate-1 text-[21px] text-[#1e5eeb]`}>
              last updated {updated}
            </p>
            <div {...enter(240)} className={`${enter(240).className} mt-6 max-w-xl text-[17px] leading-relaxed text-slate-600`}>
              {intro}
            </div>
          </div>

          {/* illustration (desktop) */}
          <div className="relative hidden h-[300px] lg:col-span-5 lg:block" aria-hidden>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inset-0 animate-pulse-ring rounded-[2.6rem] border-2 border-[#1e5eeb]/30" />
              <span className="absolute inset-0 animate-pulse-ring rounded-[2.6rem] border-2 border-[#1e5eeb]/20" style={{ animationDelay: "1.4s" }} />
              <div className="relative grid h-44 w-44 animate-scale-in place-items-center rounded-[2.6rem] bg-[#0b1a3b] shadow-[0_40px_60px_-30px_rgba(11,26,59,0.8)]">
                <HeroIcon size={76} strokeWidth={1.4} className="text-[#7cc4f5]" />
              </div>
            </div>
            {heroChips.map((c, i) => {
              const pos = [
                { left: "4%", top: "14%" },
                { right: "2%", top: "38%" },
                { left: "10%", bottom: "8%" },
              ][i % 3];
              return (
                <div key={c} className="absolute" style={pos}>
                  <div className="animate-step-in" style={{ animationDelay: `${500 + i * 180}ms` }}>
                    <div className="animate-float" style={{ animationDelay: `${i * 0.8}s` }}>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] font-semibold text-[#0b1a3b] shadow-[0_12px_24px_-14px_rgba(11,26,59,0.55)] ring-1 ring-[#1e5eeb]/15">
                        <span className="h-2 w-2 rounded-full bg-[#1e5eeb]" />
                        {c}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- at a glance ---------- */}
      {highlights.length > 0 && (
        <div className="wrap relative z-10 -mt-14">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => {
              const Icon = ICONS[h.icon];
              return (
                <Appear key={h.title} delay={i * 90}>
                  <div className="group h-full rounded-2xl bg-white p-5 shadow-[0_24px_44px_-30px_rgba(11,26,59,0.55)] ring-1 ring-[#0b1a3b]/6 transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_50px_-28px_rgba(30,94,235,0.45)]">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eef3fb] text-[#1e5eeb] transition-[background-color,color,rotate] duration-500 group-hover:-rotate-6 group-hover:bg-[#1e5eeb] group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <p className="mt-4 text-[17px] font-bold text-[#0b1a3b]">{h.title}</p>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-slate-600">{h.text}</p>
                  </div>
                </Appear>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------- body ---------- */}
      <div className="wrap grid gap-10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
        {/* table of contents */}
        <aside className="lg:col-span-3">
          <div className="rounded-2xl bg-[#f4f8ff] ring-1 ring-[#0b1a3b]/6 lg:hidden">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="flex w-full items-center justify-between px-4 py-3.5 text-[15px] font-semibold text-[#0b1a3b]"
            >
              On this page
              <ChevronDown size={18} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <div className="px-1 pb-3">{tocList(false)}</div>
              </div>
            </div>
          </div>

          <nav aria-label="On this page" className="sticky top-28 hidden lg:block">
            <p className="mb-3 px-3 text-[13px] font-semibold text-slate-500">On this page</p>
            {tocList(true)}
          </nav>
        </aside>

        {/* content */}
        <article className="min-w-0 lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => {
            const Icon = ICONS[s.icon];
            const on = active === s.id;
            return (
              <section
                key={s.id}
                id={s.id}
                className={`scroll-mt-28 ${i === 0 ? "" : "mt-12 border-t border-dashed border-[#1e5eeb]/20 pt-12"}`}
              >
                <Appear>
                  <div className="flex items-center gap-4">
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-[background-color,color,scale] duration-500 ${
                        on ? "bg-[#0b1a3b] text-white" : "bg-[#eef3fb] text-[#1e5eeb]"
                      }`}
                      style={{ scale: on ? "1.06" : "1", transitionTimingFunction: SPRING }}
                    >
                      <Icon size={21} />
                    </span>
                    <div>
                      <p className="text-[12.5px] font-semibold tabular-nums text-[#1e5eeb]">{String(i + 1).padStart(2, "0")}</p>
                      <h2 className="text-[1.55rem] font-bold leading-tight tracking-[-0.02em] text-[#0b1a3b] sm:text-[1.8rem]">{s.title}</h2>
                    </div>
                  </div>
                  <div className={prose}>{s.body}</div>
                </Appear>
              </section>
            );
          })}

          {/* contact card */}
          <Appear className="mt-16">
            <div className="relative overflow-hidden rounded-3xl bg-[#0b1a3b] p-6 text-white sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(124,196,245,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(124,196,245,0.07) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div className="relative">
                <p className="text-[21px] font-bold">Questions about this page?</p>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/70">
                  Write to us and a real person will reply. We’re happy to explain anything here in plain words.
                </p>
                <a
                  href={`mailto:${email}`}
                  className="mt-5 inline-flex items-center gap-2.5 rounded-xl bg-white px-5 py-3 text-[14.5px] font-semibold text-[#0b1a3b] transition-[background-color,translate,scale] duration-500 ease-spring hover:-translate-y-0.5 hover:bg-[#dbeafe] active:scale-[0.97]"
                >
                  <Mail size={16} />
                  {email}
                </a>
              </div>
            </div>
          </Appear>
        </article>
      </div>
    </main>
  );
}