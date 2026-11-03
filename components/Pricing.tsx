"use client";

import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Plus } from "lucide-react";
import NavLink from "./NavLink";
import Appear from "./Appear";
import { hand } from "@/lib/fonts";
import { addOns, compareRows, inr, plans, projects, services, terms, type Plan, type Project } from "@/lib/pricing";

const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";

/* puts a note into the enquiry form's message (same handoff as the footer note) */
const pick = (text: string) => {
  try {
    sessionStorage.setItem("skad-idea", text);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent("skad:idea", { detail: text }));
};

function PlanCard({ plan, open, onToggle }: { plan: Plan; open: boolean; onToggle: () => void }) {
  const dark = !!plan.popular;
  const sub = dark ? "text-white/65" : "text-slate-500";
  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl p-6 ring-1 transition-[translate,box-shadow] duration-500 hover:-translate-y-1 ${
        dark
          ? "bg-[#0b1a3b] text-white shadow-[0_30px_60px_-30px_rgba(11,26,59,0.75)] ring-[#0b1a3b]"
          : "bg-white text-[#0b1a3b] shadow-[0_20px_40px_-32px_rgba(11,26,59,0.5)] ring-[#0b1a3b]/8 hover:shadow-[0_26px_48px_-30px_rgba(30,94,235,0.45)]"
      }`}
      style={{ transitionTimingFunction: SPRING }}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-[#1e5eeb] px-3 py-1 text-[12px] font-semibold text-white shadow-[0_6px_14px_-6px_rgba(30,94,235,0.9)]">
          Most popular
        </span>
      )}

      <p className="text-[16px] font-bold">{plan.name}</p>
      <p className={`mt-1 text-[13.5px] leading-snug ${sub}`}>{plan.for}</p>

      <p className="mt-6 flex flex-wrap items-baseline gap-x-1.5">
        {plan.from && <span className={`text-[13px] ${sub}`}>from</span>}
        <span className="text-[2.1rem] font-bold leading-none tracking-[-0.03em]">{inr(plan.price)}</span>
        <span className={`text-[14px] ${sub}`}>/month</span>
      </p>
      <p className={`mt-1.5 text-[12.5px] ${sub}`}>+ GST, billed monthly</p>

      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-[14px] leading-snug">
            <span
              className={`mt-[2px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full ${
                dark ? "bg-[#7cc4f5] text-[#0b1a3b]" : "bg-[#1e5eeb] text-white"
              }`}
            >
              <Check size={11} strokeWidth={3} />
            </span>
            {h}
          </li>
        ))}
      </ul>

      {/* everything included */}
      <div className={`mt-6 border-t border-dashed pt-4 ${dark ? "border-white/15" : "border-[#1e5eeb]/20"}`}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className={`flex w-full items-center justify-between text-[14px] font-semibold ${dark ? "text-white" : "text-[#0b1a3b]"}`}
        >
          Everything included
          <ChevronDown size={17} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
        <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div className="space-y-4 pt-4">
              {plan.details.map((d) => (
                <div key={d.title}>
                  <p className={`text-[12.5px] font-semibold ${dark ? "text-[#7cc4f5]" : "text-[#1e5eeb]"}`}>{d.title}</p>
                  <ul className={`mt-1.5 space-y-1 text-[13.5px] leading-snug ${dark ? "text-white/80" : "text-slate-600"}`}>
                    {d.items.map((it) => (
                      <li key={it}>· {it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <NavLink
        href="/enquire"
        onClick={() =>
          pick(`I’m interested in the ${plan.name} plan (${plan.from ? "from " : ""}${inr(plan.price)}/month).`)
        }
        className={`group mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[15px] font-semibold transition-[background-color,translate,scale] duration-500 ease-spring hover:-translate-y-0.5 active:scale-[0.97] ${
          dark ? "bg-white text-[#0b1a3b] hover:bg-[#dbeafe]" : "bg-[#0b1a3b] text-white hover:bg-[#1e5eeb]"
        }`}
      >
        {plan.from ? "Talk to us" : `Choose ${plan.name.replace("SKAD ", "")}`}
        <ArrowRight size={15} className="transition-[translate] duration-500 ease-spring group-hover:translate-x-1" />
      </NavLink>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const dark = !!p.featured;
  const sub = dark ? "text-white/70" : "text-slate-600";
  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl p-6 ring-1 transition-[translate] duration-500 hover:-translate-y-1 ${
        dark
          ? "bg-[#0b1a3b] text-white shadow-[0_30px_60px_-30px_rgba(11,26,59,0.75)] ring-[#0b1a3b]"
          : "bg-white text-[#0b1a3b] shadow-[0_20px_40px_-32px_rgba(11,26,59,0.5)] ring-[#0b1a3b]/8"
      }`}
      style={{ transitionTimingFunction: SPRING }}
    >
      {dark && (
        <span className="absolute -top-3 left-6 rounded-full bg-[#1e5eeb] px-3 py-1 text-[12px] font-semibold text-white">
          Best value
        </span>
      )}
      <p className="text-[18px] font-bold">{p.name}</p>
      <p className={`mt-1 text-[14px] leading-snug ${sub}`}>{p.summary}</p>
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className={`text-[13px] ${sub}`}>from</span>
        <span className="text-[2rem] font-bold leading-none tracking-[-0.03em]">{inr(p.from)}</span>
      </p>
      <p className={`mt-1.5 text-[12.5px] ${sub}`}>+ GST, one-time</p>

      <div className="mt-6 flex-1">
        {p.tiers && (
          <ul className={`divide-y divide-dashed ${dark ? "divide-white/15" : "divide-[#1e5eeb]/15"}`}>
            {p.tiers.map((t) => (
              <li key={t.label} className="flex items-center justify-between gap-3 py-2.5 text-[14px]">
                <span className={dark ? "text-white/85" : "text-slate-700"}>{t.label}</span>
                <span className="font-semibold tabular-nums">{inr(t.price)}</span>
              </li>
            ))}
          </ul>
        )}
        {p.includes && (
          <ul className="space-y-2.5">
            {p.includes.map((it) => (
              <li key={it} className="flex items-start gap-2.5 text-[14px] leading-snug">
                <span className="mt-[2px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[#7cc4f5] text-[#0b1a3b]">
                  <Check size={11} strokeWidth={3} />
                </span>
                {it}
              </li>
            ))}
          </ul>
        )}
      </div>

      <NavLink
        href="/enquire"
        onClick={() => pick(`I’m interested in: ${p.name} (from ${inr(p.from)}).`)}
        className={`group mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[15px] font-semibold transition-[background-color,translate,scale] duration-500 ease-spring hover:-translate-y-0.5 active:scale-[0.97] ${
          dark ? "bg-white text-[#0b1a3b] hover:bg-[#dbeafe]" : "bg-[#0b1a3b] text-white hover:bg-[#1e5eeb]"
        }`}
      >
        Get a quote
        <ArrowRight size={15} className="transition-[translate] duration-500 ease-spring group-hover:translate-x-1" />
      </NavLink>
    </div>
  );
}

export default function Pricing() {
  const [mode, setMode] = useState<"monthly" | "projects">("monthly");
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [compare, setCompare] = useState(false);

  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  return (
    <section id="pricing" className="bg-[#eef3fb] py-20 lg:py-32">
      <div className="wrap">
        {/* heading */}
        <Appear>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="text-balance text-[2.1rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#0b1a3b] sm:text-[2.75rem]">
                Simple, honest pricing.
              </h2>
              <p className={`${hand.className} mt-2 -rotate-1 text-[22px] text-[#1e5eeb]`}>no surprises, no hidden fees</p>
            </div>
            <p className="max-w-md text-[16px] leading-relaxed text-slate-600 lg:col-span-5">
              Monthly plans that grow with you, and one-time projects to get you started. Pick a starting point; we’ll
              shape the details on the first call.
            </p>
          </div>
        </Appear>

        {/* mode switch */}
        <div className="mt-10 flex justify-center">
          <div
            role="group"
            aria-label="Pricing type"
            className="relative grid w-full max-w-md grid-cols-2 rounded-full bg-white p-1 shadow-[0_8px_20px_-14px_rgba(11,26,59,0.45)] ring-1 ring-[#0b1a3b]/6"
          >
            <span
              aria-hidden
              className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[#0b1a3b]"
              style={{ transform: `translateX(${mode === "monthly" ? 0 : 100}%)`, transition: `transform 0.5s ${SPRING}` }}
            />
            {(["monthly", "projects"] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`relative z-10 rounded-full py-2.5 text-[14px] font-semibold transition-colors duration-300 ${
                  mode === m ? "text-white" : "text-slate-600 hover:text-[#0b1a3b]"
                }`}
              >
                {m === "monthly" ? "Monthly plans" : "One-time projects"}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- monthly ---------- */}
        {mode === "monthly" && (
          <div key="monthly" className="animate-step-in">
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {plans.map((p) => (
                <PlanCard key={p.id} plan={p} open={!!open[p.id]} onToggle={() => toggle(p.id)} />
              ))}
            </div>

            {/* comparison (desktop) */}
            <div className="mt-8 hidden lg:block">
              <button
                type="button"
                onClick={() => setCompare((c) => !c)}
                aria-expanded={compare}
                className="mx-auto flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-[#0b1a3b] ring-1 ring-[#0b1a3b]/8 transition-colors hover:bg-[#f6f9ff]"
              >
                {compare ? "Hide comparison" : "Compare all plans"}
                <ChevronDown size={16} className={`transition-transform duration-300 ${compare ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${compare ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="mt-6 overflow-hidden rounded-2xl bg-white ring-1 ring-[#0b1a3b]/8">
                    <table className="w-full text-left text-[14px]">
                      <thead>
                        <tr className="bg-[#0b1a3b] text-white">
                          <th className="px-5 py-3.5 font-semibold">Feature</th>
                          {plans.map((p) => (
                            <th key={p.id} className="px-5 py-3.5 font-semibold">
                              {p.name.replace("SKAD ", "")}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {compareRows.map((r, i) => (
                          <tr key={r.label} className={i % 2 ? "bg-[#f6f9ff]" : "bg-white"}>
                            <td className="px-5 py-3 font-medium text-[#0b1a3b]">{r.label}</td>
                            {r.values.map((v, k) => (
                              <td key={k} className="px-5 py-3 text-slate-600">
                                {v === "Included" ? (
                                  <span className="inline-flex items-center gap-1.5 font-medium text-[#1e5eeb]">
                                    <Check size={14} strokeWidth={3} /> Included
                                  </span>
                                ) : (
                                  v
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------- one-time ---------- */}
        {mode === "projects" && (
          <div key="projects" className="animate-step-in">
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>

            <div className="mt-12">
              <p className="text-[17px] font-bold text-[#0b1a3b]">Popular one-time services</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3.5 ring-1 ring-[#0b1a3b]/6"
                  >
                    <span className="text-[14px] text-slate-700">{s.name}</span>
                    <span className="shrink-0 text-[14px] font-semibold text-[#0b1a3b]">
                      <span className="mr-1 text-[12px] font-normal text-slate-500">from</span>
                      {inr(s.price)}
                      {s.monthly && <span className="text-[12px] font-normal text-slate-500">/mo</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- add-ons + good to know ---------- */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Appear>
            <div className="h-full rounded-3xl bg-white p-6 ring-1 ring-[#0b1a3b]/8">
              <p className="flex items-center gap-2 text-[17px] font-bold text-[#0b1a3b]">
                <Plus size={18} className="text-[#1e5eeb]" /> Add-ons
              </p>
              <p className="mt-1 text-[14px] text-slate-600">Add to any plan when you need a little more.</p>
              <ul className="mt-4 divide-y divide-dashed divide-[#1e5eeb]/15">
                {addOns.map((a) => (
                  <li key={a.name} className="flex items-center justify-between gap-3 py-2.5 text-[14px]">
                    <span className="text-slate-700">{a.name}</span>
                    <span className="font-semibold text-[#0b1a3b]">
                      {inr(a.price)}
                      {a.monthly && <span className="text-[12px] font-normal text-slate-500">/mo</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Appear>

          <Appear delay={100}>
            <div className="h-full rounded-3xl bg-[#0b1a3b] p-6 text-white">
              <p className="text-[17px] font-bold">Good to know</p>
              <ul className="mt-4 space-y-3">
                {terms.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[14px] leading-snug text-white/85">
                    <span className="mt-[2px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[#7cc4f5] text-[#0b1a3b]">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Appear>
        </div>

        {/* ---------- rate card ---------- */}
        <Appear className="mt-8">
          <div className="flex flex-col items-start gap-4 rounded-3xl bg-white p-6 ring-1 ring-[#0b1a3b]/8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[17px] font-bold text-[#0b1a3b]">Need something specific?</p>
              <p className="mt-1 text-[14.5px] text-slate-600">
                We have more than 80 individual services. Ask for the full rate card, or tell us what you need.
              </p>
            </div>
            <NavLink
              href="/enquire"
              onClick={() => pick("Please send me the full SKAD Commerce OS rate card.")}
              className="group flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1e5eeb] px-5 py-3.5 text-[15px] font-semibold text-white transition-[background-color,translate,scale] duration-500 ease-spring hover:-translate-y-0.5 hover:bg-[#164bc2] active:scale-[0.97] sm:w-auto"
            >
              Request the full rate card
              <ArrowRight size={15} className="transition-[translate] duration-500 ease-spring group-hover:translate-x-1" />
            </NavLink>
          </div>
        </Appear>
      </div>
    </section>
  );
}