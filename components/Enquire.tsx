"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  Factory,
  Gem,
  Lightbulb,
  Loader2,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Phone,
  Rocket,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { capabilities } from "@/lib/data";
import { SITE_EMAIL } from "@/lib/site";
import Appear from "./Appear";
import { hand } from "@/lib/fonts";

const SPRING = "cubic-bezier(0.34,1.4,0.64,1)";

const stageOptions: { value: string; icon: LucideIcon; hint: string }[] = [
  { value: "Idea", icon: Lightbulb, hint: "Just an idea for now" },
  { value: "Pre-launch", icon: Rocket, hint: "Product ready, not selling yet" },
  { value: "Already selling", icon: ShoppingBag, hint: "Selling, want to grow" },
  { value: "Established, going digital", icon: Building2, hint: "Running business, moving online" },
];

const businessOptions: { value: string; icon: LucideIcon }[] = [
  { value: "D2C brand", icon: ShoppingBag },
  { value: "Manufacturer / exporter", icon: Factory },
  { value: "Jeweller", icon: Gem },
  { value: "Service business", icon: Briefcase },
  { value: "Other", icon: MoreHorizontal },
];

const businessTypes = businessOptions.map((b) => b.value);

const contactOptions: { value: string; icon: LucideIcon }[] = [
  { value: "Email", icon: Mail },
  { value: "Phone", icon: Phone },
  { value: "WhatsApp", icon: MessageCircle },
];

type FormState = {
  stage: string;
  name: string;
  email: string;
  capabilities: string[];
  company: string;
  website: string;
  businessType: string;
  contactMethod: string;
  phone: string;
  message: string;
};

const initialState: FormState = {
  stage: "",
  name: "",
  email: "",
  capabilities: [],
  company: "",
  website: "",
  businessType: "",
  contactMethod: "Email",
  phone: "",
  message: "",
};

const STEPS = ["stage", "business", "services", "company", "you", "contact", "message"] as const;
type StepKey = (typeof STEPS)[number];

const QUESTIONS: Record<StepKey, { q: string; help?: string }> = {
  stage: { q: "Where is your business today?", help: "Pick the one that fits best." },
  business: { q: "What kind of business is it?" },
  services: { q: "What would you like help with?", help: "Pick as many as you like. You can change them later." },
  company: { q: "What’s your business called?", help: "Add your website too, if you have one." },
  you: { q: "Lovely. Who should we talk to?" },
  contact: { q: "How would you like us to reach you?" },
  message: { q: "Anything else we should know?", help: "Optional. A line or two about your idea is plenty." },
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const inputCls =
  "w-full rounded-2xl border border-[#0b1a3b]/12 bg-white px-5 py-4 text-[17px] text-[#0b1a3b] placeholder:text-slate-400 outline-none transition-[border-color,box-shadow] duration-300 focus:border-[#1e5eeb] focus:ring-4 focus:ring-[#1e5eeb]/15";

/* slides each question in from the direction you're moving */
function Slide({ dir, children }: { dir: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = el.animate(
      [
        { opacity: 0, transform: `translateX(${dir * 36}px)` },
        { opacity: 1, transform: "translateX(0)" },
      ],
      { duration: 420, easing: "cubic-bezier(0.2,0.7,0.2,1)" }
    );
    return () => a.cancel();
  }, [dir]);
  return <div ref={ref}>{children}</div>;
}

function Tile({
  active,
  onClick,
  icon: Icon,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative flex items-center gap-4 rounded-2xl p-4 text-left ring-1 transition-[background-color,box-shadow,translate,scale] duration-500 hover:-translate-y-0.5 active:scale-[0.98] ${
        active
          ? "bg-[#0b1a3b] text-white shadow-[0_14px_28px_-16px_rgba(11,26,59,0.8)] ring-[#0b1a3b]"
          : "bg-white text-[#0b1a3b] ring-[#0b1a3b]/10 hover:shadow-[0_12px_24px_-18px_rgba(30,94,235,0.6)] hover:ring-[#1e5eeb]/40"
      }`}
      style={{ transitionTimingFunction: SPRING }}
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
          active ? "bg-white/10 text-[#7cc4f5]" : "bg-[#eef3fb] text-[#1e5eeb]"
        }`}
      >
        <Icon size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] font-semibold leading-tight">{label}</span>
        {hint && (
          <span className={`mt-0.5 block text-[13px] ${active ? "text-white/60" : "text-slate-500"}`}>{hint}</span>
        )}
      </span>
      <span
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-[scale,opacity] duration-300 ${
          active ? "bg-[#7cc4f5] text-[#0b1a3b] opacity-100" : "opacity-0"
        }`}
        style={{ scale: active ? "1" : "0.5", transitionTimingFunction: SPRING }}
      >
        <Check size={13} strokeWidth={3} />
      </span>
    </button>
  );
}

export default function Enquire() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<FormState>(initialState);
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [sendError, setSendError] = useState("");
  const [trap, setTrap] = useState("");
  const autoTimer = useRef(0);

  /* ---------- handoffs from other sections ---------- */
  useEffect(() => {
    const applyBrief = (list: unknown) => {
      if (!Array.isArray(list)) return;
      const valid = list.filter((x): x is string => typeof x === "string");
      if (valid.length) setData((d) => ({ ...d, capabilities: valid }));
    };
    const applyBiz = (v: unknown) => {
      if (typeof v === "string" && businessTypes.includes(v)) setData((d) => ({ ...d, businessType: v }));
    };
    const applyIdea = (v: unknown) => {
      if (typeof v === "string" && v.trim()) setData((d) => ({ ...d, message: v.trim() }));
    };
    const r = requestAnimationFrame(() => {
      try {
        const brief = sessionStorage.getItem("skad-brief");
        if (brief) applyBrief(JSON.parse(brief));
        applyBiz(sessionStorage.getItem("skad-business"));
        applyIdea(sessionStorage.getItem("skad-idea"));
      } catch {
        /* ignore */
      }
    });
    const onBrief = (e: Event) => applyBrief((e as CustomEvent).detail);
    const onBiz = (e: Event) => applyBiz((e as CustomEvent).detail);
    const onIdea = (e: Event) => applyIdea((e as CustomEvent).detail);
    window.addEventListener("skad:brief", onBrief);
    window.addEventListener("skad:business", onBiz);
    window.addEventListener("skad:idea", onIdea);
    return () => {
      cancelAnimationFrame(r);
      window.clearTimeout(autoTimer.current);
      window.removeEventListener("skad:brief", onBrief);
      window.removeEventListener("skad:business", onBiz);
      window.removeEventListener("skad:idea", onIdea);
    };
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setData((d) => ({ ...d, [key]: value }));

  const errors: Record<StepKey, string> = {
    stage: data.stage ? "" : "Pick where your business is today.",
    business: data.businessType ? "" : "Pick the type of business.",
    services: data.capabilities.length ? "" : "Pick at least one service.",
    company: data.company.trim() ? "" : "Enter your business name.",
    you: !data.name.trim() ? "Enter your name." : !isEmail(data.email) ? "Enter a valid email address." : "",
    contact: data.contactMethod !== "Email" && !data.phone.trim() ? "Add a number so we can reach you." : "",
    message: "",
  };

  const step = STEPS[i];
  const last = i === STEPS.length - 1;
  const err = showErrors ? errors[step] : "";

  const go = (n: number) => {
    window.clearTimeout(autoTimer.current);
    setDir(n >= i ? 1 : -1);
    setShowErrors(false);
    setSendError("");
    setI(Math.max(0, Math.min(STEPS.length - 1, n)));
  };

  // choosing a tile moves on by itself after a beat
  const pickAndAdvance = (apply: () => void) => {
    apply();
    window.clearTimeout(autoTimer.current);
    autoTimer.current = window.setTimeout(() => go(i + 1), 320);
  };

  const send = async () => {
    setStatus("sending");
    setSendError("");
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: window.location.pathname, trap }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      try {
        sessionStorage.removeItem("skad-brief");
        sessionStorage.removeItem("skad-business");
        sessionStorage.removeItem("skad-idea");
      } catch {
        /* ignore */
      }
    } catch {
      setStatus("idle");
      setSendError(`We couldn’t send your brief. Please try again, or email us at ${SITE_EMAIL}.`);
    }
  };

  const next = () => {
    if (errors[step]) {
      setShowErrors(true);
      return;
    }
    if (last) void send();
    else go(i + 1);
  };

  const reset = () => {
    setData(initialState);
    setStatus("idle");
    setShowErrors(false);
    setDir(-1);
    setI(0);
  };

  const summary: { label: string; value: string; step: number }[] = [
    { label: "Stage", value: data.stage, step: 0 },
    { label: "Business", value: data.businessType, step: 1 },
    { label: "Services", value: data.capabilities.join(", "), step: 2 },
    { label: "Company", value: data.company, step: 3 },
    { label: "Name", value: data.name, step: 4 },
    {
      label: "Contact",
      value: data.contactMethod === "Email" ? data.email : data.phone ? `${data.contactMethod}: ${data.phone}` : "",
      step: 5,
    },
    { label: "Note", value: data.message, step: 6 },
  ].filter((s) => s.value);

  const progress = status === "done" ? 100 : ((i + 1) / STEPS.length) * 100;

  return (
    <section id="enquire" className="bg-[#e3eaf6] py-20 lg:py-32">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ---------- left ---------- */}
        <div className="lg:col-span-5">
          <Appear>
            <h2 className="text-balance text-[2.3rem] font-bold leading-[1.04] tracking-[-0.035em] text-[#0b1a3b] sm:text-[3rem]">
              Tell us what you’re building.
            </h2>
            <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-slate-600">
              Seven quick questions, about two minutes. We’ll use your answers to plan the first call around your
              business.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["No obligation", "A real person replies", "Change anything before you send"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-[#0b1a3b] ring-1 ring-[#0b1a3b]/6"
                >
                  <Check size={13} strokeWidth={3} className="text-[#1e5eeb]" />
                  {t}
                </span>
              ))}
            </div>
          </Appear>

          {/* live brief (desktop) */}
          <div className="mt-10 hidden lg:block">
            <p className={`${hand.className} text-[23px] text-[#1e5eeb]`}>your brief so far</p>
            <div className="mt-3 rounded-3xl bg-white p-2 ring-1 ring-[#0b1a3b]/6">
              {summary.length === 0 ? (
                <p className="px-4 py-5 text-[14.5px] text-slate-500">Your answers will appear here as you go.</p>
              ) : (
                <ul>
                  {summary.map((s) => (
                    <li key={s.label} className="animate-step-in">
                      <button
                        type="button"
                        onClick={() => status !== "done" && go(s.step)}
                        className="group flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-[#f4f8ff]"
                      >
                        <span className="w-20 shrink-0 pt-0.5 text-[12.5px] font-semibold text-slate-500">{s.label}</span>
                        <span className="min-w-0 flex-1 text-[14.5px] leading-snug text-[#0b1a3b] [overflow-wrap:anywhere]">
                          {s.value}
                        </span>
                        {status !== "done" && (
                          <Pencil size={14} className="mt-1 shrink-0 text-slate-300 transition-colors group-hover:text-[#1e5eeb]" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* ---------- right: the conversation ---------- */}
        <div className="min-w-0 lg:col-span-7">
          <Appear delay={100}>
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_40px_70px_-40px_rgba(11,26,59,0.5)] ring-1 ring-[#0b1a3b]/6">
              {/* progress */}
              <div className="h-1.5 bg-[#1e5eeb]/10">
                <div className="h-full rounded-r-full bg-[#1e5eeb]" style={{ width: `${progress}%`, transition: `width 0.6s ${SPRING}` }} />
              </div>

              <div className="p-6 sm:p-9">
                {status === "done" ? (
                  <Slide dir={1}>
                    <div className="py-6 text-center">
                      <span className="mx-auto grid h-16 w-16 animate-pill-pop place-items-center rounded-full bg-[#1e5eeb] text-white shadow-[0_14px_28px_-12px_rgba(30,94,235,0.9)]">
                        <Check size={30} strokeWidth={3} />
                      </span>
                      <h3 className="mt-6 text-[1.8rem] font-bold tracking-[-0.02em] text-[#0b1a3b]">
                        {`Thanks, ${data.name.trim().split(" ")[0]}!`}
                      </h3>
                      <p className="mx-auto mt-2 max-w-sm text-[15.5px] leading-relaxed text-slate-600">
                        {`Your brief is with our team. We’ll reply to ${data.email.trim()}.`}
                      </p>
                      <div className="mx-auto mt-6 max-w-sm space-y-1.5 rounded-2xl bg-[#f4f8ff] p-4 text-left text-[14px]">
                        {summary.slice(0, 4).map((s) => (
                          <p key={s.label} className="flex gap-3">
                            <span className="w-20 shrink-0 font-semibold text-slate-500">{s.label}</span>
                            <span className="text-[#0b1a3b] [overflow-wrap:anywhere]">{s.value}</span>
                          </p>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={reset}
                        className="mt-7 rounded-xl px-5 py-2.5 text-[14.5px] font-semibold text-[#1e5eeb] underline decoration-[#1e5eeb]/30 underline-offset-4"
                      >
                        Send another enquiry
                      </button>
                    </div>
                  </Slide>
                ) : (
                  <form
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      next();
                    }}
                  >
                    {/* spam trap */}
                    <input
                      type="text"
                      name="company_website"
                      value={trap}
                      onChange={(e) => setTrap(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute left-[-9999px] h-px w-px opacity-0"
                    />

                    <p className="text-[13px] font-semibold text-[#1e5eeb]">
                      Question {i + 1} of {STEPS.length}
                    </p>

                    <div className="min-h-[360px]">
                      <Slide key={i} dir={dir}>
                        <h3 className="mt-2 text-balance text-[1.6rem] font-bold leading-tight tracking-[-0.02em] text-[#0b1a3b] sm:text-[1.9rem]">
                          {QUESTIONS[step].q}
                        </h3>
                        {QUESTIONS[step].help && <p className="mt-2 text-[15px] text-slate-500">{QUESTIONS[step].help}</p>}

                        <div className="mt-7">
                          {step === "stage" && (
                            <div className="grid gap-3 sm:grid-cols-2">
                              {stageOptions.map((o) => (
                                <Tile
                                  key={o.value}
                                  icon={o.icon}
                                  label={o.value}
                                  hint={o.hint}
                                  active={data.stage === o.value}
                                  onClick={() => pickAndAdvance(() => update("stage", o.value))}
                                />
                              ))}
                            </div>
                          )}

                          {step === "business" && (
                            <div className="grid gap-3 sm:grid-cols-2">
                              {businessOptions.map((o) => (
                                <Tile
                                  key={o.value}
                                  icon={o.icon}
                                  label={o.value}
                                  active={data.businessType === o.value}
                                  onClick={() => pickAndAdvance(() => update("businessType", o.value))}
                                />
                              ))}
                            </div>
                          )}

                          {step === "services" && (
                            <div className="flex flex-wrap gap-2">
                              {capabilities.map((c) => {
                                const on = data.capabilities.includes(c.title);
                                return (
                                  <button
                                    key={c.n}
                                    type="button"
                                    aria-pressed={on}
                                    onClick={() =>
                                      update(
                                        "capabilities",
                                        on ? data.capabilities.filter((x) => x !== c.title) : [...data.capabilities, c.title]
                                      )
                                    }
                                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[14.5px] font-medium ring-1 transition-[background-color,color,scale] duration-300 active:scale-95 ${
                                      on
                                        ? "bg-[#0b1a3b] text-white ring-[#0b1a3b]"
                                        : "bg-white text-slate-700 ring-[#0b1a3b]/12 hover:ring-[#1e5eeb]/40"
                                    }`}
                                  >
                                    <span
                                      className="grid h-4 w-4 place-items-center"
                                      style={{ scale: on ? "1" : "0", width: on ? 16 : 0, transition: `scale 0.3s ${SPRING}, width 0.3s ease` }}
                                    >
                                      <Check size={13} strokeWidth={3} className="text-[#7cc4f5]" />
                                    </span>
                                    {c.title}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {step === "company" && (
                            <div className="space-y-3">
                              <input
                                autoFocus
                                className={inputCls}
                                placeholder="Business or brand name"
                                autoComplete="organization"
                                value={data.company}
                                onChange={(e) => update("company", e.target.value)}
                              />
                              <input
                                className={inputCls}
                                placeholder="Website (optional), e.g. yourbrand.com"
                                autoComplete="url"
                                value={data.website}
                                onChange={(e) => update("website", e.target.value)}
                              />
                            </div>
                          )}

                          {step === "you" && (
                            <div className="space-y-3">
                              <input
                                autoFocus
                                className={inputCls}
                                placeholder="Your full name"
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => update("name", e.target.value)}
                              />
                              <input
                                type="email"
                                className={inputCls}
                                placeholder="Work email, e.g. you@company.com"
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => update("email", e.target.value)}
                              />
                            </div>
                          )}

                          {step === "contact" && (
                            <div>
                              <div className="grid gap-3 sm:grid-cols-3">
                                {contactOptions.map((o) => (
                                  <Tile
                                    key={o.value}
                                    icon={o.icon}
                                    label={o.value}
                                    active={data.contactMethod === o.value}
                                    onClick={() => update("contactMethod", o.value)}
                                  />
                                ))}
                              </div>
                              <div
                                className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                                  data.contactMethod !== "Email" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                }`}
                              >
                                <div className="overflow-hidden">
                                  <input
                                    type="tel"
                                    className={`${inputCls} mt-3`}
                                    placeholder="+91 98765 43210"
                                    autoComplete="tel"
                                    value={data.phone}
                                    onChange={(e) => update("phone", e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {step === "message" && (
                            <textarea
                              autoFocus
                              rows={4}
                              className={`${inputCls} resize-none`}
                              placeholder="Tell us a little about what you’re building"
                              value={data.message}
                              onChange={(e) => update("message", e.target.value)}
                            />
                          )}
                        </div>

                        {err && (
                          <p role="alert" className="mt-4 animate-step-in text-[14px] font-medium text-rose-600">
                            {err}
                          </p>
                        )}
                      </Slide>
                    </div>

                    {sendError && (
                      <p role="alert" className="mt-2 rounded-xl bg-rose-50 px-4 py-3 text-[14px] leading-relaxed text-rose-700 ring-1 ring-rose-200">
                        {sendError}
                      </p>
                    )}

                    {/* footer */}
                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-dashed border-[#1e5eeb]/20 pt-6">
                      {i > 0 ? (
                        <button
                          type="button"
                          onClick={() => go(i - 1)}
                          className="inline-flex items-center gap-1.5 rounded-xl px-2 py-2 text-[15px] font-semibold text-slate-600 transition-colors hover:text-[#0b1a3b]"
                        >
                          <ArrowLeft size={16} /> Back
                        </button>
                      ) : (
                        <span />
                      )}

                      <div className="flex items-center gap-4">
                        <span className="hidden text-[13px] text-slate-400 sm:inline">
                          or press <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-sans text-[12px] text-slate-600">Enter</kbd>
                        </span>
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="group inline-flex items-center gap-2 rounded-xl bg-[#0b1a3b] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_-14px_rgba(11,26,59,0.8)] transition-[background-color,translate,scale] duration-500 ease-spring hover:-translate-y-0.5 hover:bg-[#1e5eeb] active:scale-[0.97] disabled:cursor-wait disabled:opacity-80"
                        >
                          {status === "sending" ? (
                            <>
                              <Loader2 size={17} className="animate-spin" /> Sending…
                            </>
                          ) : (
                            <>
                              {last ? "Send my brief" : "Continue"}
                              <ArrowRight size={16} className="transition-[translate] duration-500 ease-spring group-hover:translate-x-1" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="mt-5 text-[12.5px] leading-relaxed text-slate-500">
                      By sending this you agree to our{" "}
                      <a href="/privacy" className="font-medium text-[#1e5eeb] underline underline-offset-2">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Appear>
        </div>
      </div>
    </section>
  );
}