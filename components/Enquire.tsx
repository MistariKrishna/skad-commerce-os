"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, Pin } from "lucide-react";
import { capabilities } from "@/lib/data";
import Reveal from "./Reveal";
import { hand } from "@/lib/fonts";
import { SITE_EMAIL } from "@/lib/site";
const stageOptions = ["Idea", "Pre-launch", "Already selling", "Established, going digital"];
const businessTypes = ["D2C brand", "Manufacturer / exporter", "Jeweller", "Service business", "Other"];
const contactMethods = ["Email", "Phone", "WhatsApp"];
const stepTitles = ["Your stage", "Services", "Your business", "How to reach you"];

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
  stage: "Idea",
  name: "",
  email: "",
  capabilities: [],
  company: "",
  website: "",
  businessType: "D2C brand",
  contactMethod: "Email",
  phone: "",
  message: "",
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const inputCls =
  "w-full rounded-xl border border-[#0b1a3b]/12 bg-white px-4 py-3 text-[15px] text-[#0b1a3b] placeholder:text-slate-400 outline-none transition-[border-color,box-shadow] duration-300 focus:border-[#1e5eeb] focus:ring-4 focus:ring-[#1e5eeb]/15";

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#0b1a3b]">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-[13px] text-rose-600">{error}</span>}
    </label>
  );
}

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[14.5px] font-medium transition-[border-color,background-color,box-shadow,scale] duration-300 active:scale-[0.98] ${
        active
          ? "border-[#1e5eeb] bg-[#eef4ff] text-[#0b1a3b] shadow-[0_0_0_3px_rgba(30,94,235,0.12)]"
          : "border-[#0b1a3b]/12 bg-white text-slate-700 hover:border-[#1e5eeb]/40"
      }`}
    >
      <span
        className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border-2 transition-colors duration-300 ${
          active ? "border-[#1e5eeb]" : "border-slate-300"
        }`}
      >
        <span
          className="h-2 w-2 rounded-full bg-[#1e5eeb] transition-[scale] duration-300 ease-spring"
          style={{ scale: active ? "1" : "0" }}
        />
      </span>
      {children}
    </button>
  );
}

function BriefNote({ data, sent, pinKey }: { data: FormState; sent: boolean; pinKey: number }) {
  const rows: [string, string][] = [
    ["stage", data.stage],
    ["business", data.businessType],
  ];
  return (
    <div className="relative mx-auto max-w-md lg:mx-0">
      {sent && (
        <span
          key={`pin${pinKey}`}
          aria-hidden
          className="absolute -top-4 left-1/2 z-10 grid h-9 w-9 -translate-x-1/2 animate-pill-pop place-items-center rounded-full bg-[#e5484d] text-white shadow-[0_6px_14px_-4px_rgba(0,0,0,0.45)]"
        >
          <Pin size={16} />
        </span>
      )}
      <div
        className="relative rounded-[4px] bg-[#fff3b0] p-6 text-[#0b1a3b] shadow-[0_30px_50px_-28px_rgba(11,26,59,0.55)]"
        style={{ rotate: "-1.5deg" }}
        aria-live="polite"
      >
        <p className={`${hand.className} text-[24px] leading-none text-[#1e5eeb]`}>your brief</p>
        <dl className={`${hand.className} mt-4 space-y-2 text-[21px] leading-snug`}>
          {rows.map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <dt className="shrink-0 text-[#0b1a3b]/50">{k}:</dt>
              <dd key={v} className="animate-step-in">
                {v}
              </dd>
            </div>
          ))}
          <div className="flex gap-2">
            <dt className="shrink-0 text-[#0b1a3b]/50">services:</dt>
            <dd key={data.capabilities.join("|")} className="animate-step-in">
              {data.capabilities.length ? data.capabilities.join(", ") : "not picked yet"}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 text-[#0b1a3b]/50">idea:</dt>
            <dd className="line-clamp-3">{data.message.trim() || "…"}</dd>
          </div>
        </dl>
        {sent && (
          <span
            className="absolute bottom-5 right-5 animate-pill-pop rounded-md border-2 border-[#1e5eeb] px-2.5 py-0.5 text-sm font-bold uppercase tracking-[0.12em] text-[#1e5eeb]"
            style={{ rotate: "-8deg" }}
          >
            Sent
          </span>
        )}
      </div>
    </div>
  );
}

export default function Enquire() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initialState);
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [pinKey, setPinKey] = useState(0);
  const [sendError, setSendError] = useState("");
  const [trap, setTrap] = useState("");
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
      window.removeEventListener("skad:brief", onBrief);
      window.removeEventListener("skad:business", onBiz);
      window.removeEventListener("skad:idea", onIdea);
    };
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleCapability = (title: string) =>
    update(
      "capabilities",
      data.capabilities.includes(title) ? data.capabilities.filter((c) => c !== title) : [...data.capabilities, title]
    );

  const errors = {
    name: data.name.trim() ? "" : "Enter your name.",
    email: isEmail(data.email) ? "" : "Enter a valid email address.",
    capabilities: data.capabilities.length ? "" : "Pick at least one service.",
    company: data.company.trim() ? "" : "Enter your business name.",
    phone: data.contactMethod !== "Email" && !data.phone.trim() ? "Add a number so we can reach you." : "",
  };

  const stepValid = [!errors.name && !errors.email, !errors.capabilities, !errors.company, !errors.phone];

  const next = () => {
    if (!stepValid[step]) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => {
    setShowErrors(false);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    if (step < 3) {
      next();
      return;
    }
    if (!stepValid[3]) {
      setShowErrors(true);
      return;
    }
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
      setPinKey((k) => k + 1);
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

  const reset = () => {
    setData(initialState);
    setStep(0);
    setShowErrors(false);
    setStatus("idle");
  };

  const err = (msg: string) => (showErrors && msg ? msg : undefined);
  const sent = status === "done";

  return (
    <section id="enquire" className="bg-[#e3eaf6] py-24 lg:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* ---------- left: copy + live brief ---------- */}
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="text-balance text-[2.3rem] font-bold leading-[1.04] tracking-[-0.035em] text-[#0b1a3b] sm:text-[3rem]">
              Tell us what you’re building.
            </h2>
            <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-slate-600">
              Four quick steps. We’ll use your brief to plan the first call, so it starts with your business, not a
              sales pitch.
            </p>
            <ul className="mt-6 space-y-2.5">
              {["No obligation, just a conversation", "Change any answer before you send"].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-[15px] text-[#0b1a3b]">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1e5eeb] text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12 hidden lg:block">
            <BriefNote data={data} sent={sent} pinKey={pinKey} />
          </div>
        </div>

        {/* ---------- right: the form sheet ---------- */}
        <div className="min-w-0 lg:col-span-7">
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_70px_-40px_rgba(11,26,59,0.5)] ring-1 ring-[#0b1a3b]/6">
              {/* step tabs */}
              <div
                className="border-b border-dashed border-[#1e5eeb]/20 px-4 pt-4 sm:px-7 sm:pt-6"
                style={{
                  backgroundColor: "#f4f8ff",
                  backgroundImage:
                    "linear-gradient(rgba(30,94,235,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(30,94,235,0.055) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              >
                <div className="relative grid grid-cols-4">
                  {stepTitles.map((t, i) => {
                    const reachable = !sent && i <= step;
                    const on = i === step && !sent;
                    const done = sent || i < step;
                    return (
                      <button
                        key={t}
                        type="button"
                        disabled={!reachable}
                        onClick={() => reachable && setStep(i)}
                        className="flex min-w-0 flex-col items-start gap-1.5 pb-4 text-left disabled:cursor-default"
                      >
                        <span
                          className={`grid h-7 w-7 place-items-center rounded-full text-[12px] font-bold transition-colors duration-300 ${
                            done ? "bg-[#1e5eeb] text-white" : on ? "bg-[#0b1a3b] text-white" : "bg-white text-slate-400 ring-1 ring-slate-200"
                          }`}
                        >
                          {done ? <Check size={13} strokeWidth={3} /> : i + 1}
                        </span>
                        <span
                          className={`hidden truncate text-[13px] font-semibold sm:block ${
                            on ? "text-[#0b1a3b]" : done ? "text-slate-600" : "text-slate-400"
                          }`}
                        >
                          {t}
                        </span>
                      </button>
                    );
                  })}
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-[3px] w-1/4 rounded-full bg-[#1e5eeb]"
                    style={{
                      transform: `translateX(${(sent ? 3 : step) * 100}%)`,
                      transition: "transform 0.55s cubic-bezier(0.34,1.4,0.64,1)",
                    }}
                  />
                </div>
              </div>

              <div className="p-5 sm:p-8">
                {sent ? (
                  <div className="animate-step-in py-8 text-center">
                    <span className="mx-auto grid h-14 w-14 animate-pill-pop place-items-center rounded-full bg-[#1e5eeb] text-white">
                      <Check size={26} strokeWidth={3} />
                    </span>
                    <h3 className="mt-5 text-2xl font-bold text-[#0b1a3b]">{`Thanks, ${data.name.trim().split(" ")[0]}.`}</h3>
                    <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-slate-600">
                      {`Your brief is with our team. We’ll reply to ${data.email.trim()}.`}
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-7 rounded-xl border border-[#0b1a3b]/15 px-5 py-2.5 text-sm font-semibold text-[#0b1a3b] transition-colors hover:bg-[#f4f8ff]"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      void handleSubmit();
                    }}
                  >
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
                    <p className="text-sm font-medium text-[#1e5eeb] sm:hidden">
                      Step {step + 1} of 4: {stepTitles[step]}
                    </p>

                    <div key={step} className="mt-3 animate-step-in space-y-6 sm:mt-0">
                      {step === 0 && (
                        <>
                          <div>
                            <p className="mb-3 text-[15px] font-semibold text-[#0b1a3b]">Where is your business today?</p>
                            <div className="grid gap-2.5 sm:grid-cols-2">
                              {stageOptions.map((o) => (
                                <Choice key={o} active={data.stage === o} onClick={() => update("stage", o)}>
                                  {o}
                                </Choice>
                              ))}
                            </div>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Your name" error={err(errors.name)}>
                              <input
                                className={inputCls}
                                placeholder="Full name"
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => update("name", e.target.value)}
                              />
                            </Field>
                            <Field label="Work email" error={err(errors.email)}>
                              <input
                                type="email"
                                className={inputCls}
                                placeholder="you@company.com"
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => update("email", e.target.value)}
                              />
                            </Field>
                          </div>
                        </>
                      )}

                      {step === 1 && (
                        <div>
                          <p className="mb-3 text-[15px] font-semibold text-[#0b1a3b]">Which services do you need?</p>
                          <div className="flex flex-wrap gap-2">
                            {capabilities.map((c) => {
                              const on = data.capabilities.includes(c.title);
                              return (
                                <button
                                  key={c.n}
                                  type="button"
                                  aria-pressed={on}
                                  onClick={() => toggleCapability(c.title)}
                                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13.5px] font-medium transition-[border-color,background-color,color,scale] duration-300 active:scale-95 ${
                                    on
                                      ? "border-[#1e5eeb] bg-[#1e5eeb] text-white"
                                      : "border-[#0b1a3b]/12 bg-white text-slate-700 hover:border-[#1e5eeb]/40"
                                  }`}
                                >
                                  {on && <Check size={13} strokeWidth={3} />}
                                  {c.title}
                                </button>
                              );
                            })}
                          </div>
                          {err(errors.capabilities) && <p className="mt-3 text-[13px] text-rose-600">{errors.capabilities}</p>}
                          <p className="mt-4 text-[13px] text-slate-500">Not sure? Pick what feels closest. We’ll refine it together.</p>
                        </div>
                      )}

                      {step === 2 && (
                        <>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Business name" error={err(errors.company)}>
                              <input
                                className={inputCls}
                                placeholder="Company or brand"
                                autoComplete="organization"
                                value={data.company}
                                onChange={(e) => update("company", e.target.value)}
                              />
                            </Field>
                            <Field label="Website (optional)">
                              <input
                                className={inputCls}
                                placeholder="yourbrand.com"
                                autoComplete="url"
                                value={data.website}
                                onChange={(e) => update("website", e.target.value)}
                              />
                            </Field>
                          </div>
                          <div>
                            <p className="mb-3 text-[15px] font-semibold text-[#0b1a3b]">What kind of business is it?</p>
                            <div className="grid gap-2.5 sm:grid-cols-2">
                              {businessTypes.map((o) => (
                                <Choice key={o} active={data.businessType === o} onClick={() => update("businessType", o)}>
                                  {o}
                                </Choice>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {step === 3 && (
                        <>
                          <div>
                            <p className="mb-3 text-[15px] font-semibold text-[#0b1a3b]">How should we reach you?</p>
                            <div className="grid grid-cols-3 gap-2">
                              {contactMethods.map((o) => (
                                <Choice key={o} active={data.contactMethod === o} onClick={() => update("contactMethod", o)}>
                                  {o}
                                </Choice>
                              ))}
                            </div>
                          </div>
                          {data.contactMethod !== "Email" && (
                            <Field label="Phone number" error={err(errors.phone)}>
                              <input
                                type="tel"
                                className={inputCls}
                                placeholder="+91 98765 43210"
                                autoComplete="tel"
                                value={data.phone}
                                onChange={(e) => update("phone", e.target.value)}
                              />
                            </Field>
                          )}
                          <Field label="Your idea, in a line or two (optional)">
                            <textarea
                              rows={3}
                              className={`${inputCls} resize-none`}
                              placeholder="Tell us a little about what you’re building"
                              value={data.message}
                              onChange={(e) => update("message", e.target.value)}
                            />
                          </Field>
                        </>
                      )}
                    </div>
                          {sendError && (
  <p role="alert" className="mt-6 rounded-xl bg-rose-50 px-4 py-3 text-[14px] leading-relaxed text-rose-700 ring-1 ring-rose-200">
    {sendError}
  </p>
)}
                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
                      {step > 0 && (
                        <button
                          type="button"
                          onClick={back}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0b1a3b]/15 px-5 py-3.5 text-[15px] font-semibold text-[#0b1a3b] transition-colors hover:bg-[#f4f8ff]"
                        >
                          <ArrowLeft size={16} /> Back
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#0b1a3b] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_-14px_rgba(11,26,59,0.8)] transition-[background-color,translate,scale] duration-700 ease-spring hover:-translate-y-0.5 hover:bg-[#1e5eeb] active:scale-[0.97] active:duration-100 disabled:cursor-wait disabled:opacity-80"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 size={17} className="animate-spin" /> Sending…
                          </>
                        ) : (
                          <>
                            {step === 3 ? "Send my brief" : "Continue"}
                            <ArrowRight size={16} className="transition-[translate] duration-700 ease-spring group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
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
          </Reveal>

          {/* brief note on phones and tablets */}
          <div className="mt-10 lg:hidden">
            <BriefNote data={data} sent={sent} pinKey={pinKey} />
          </div>
        </div>
      </div>
    </section>
  );
}