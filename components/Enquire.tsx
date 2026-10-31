"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { capabilities } from "@/lib/data";
import Reveal from "./Reveal";

const stageOptions = ["Idea", "Pre-launch", "Already selling", "Established, going digital"];
const businessTypes = ["D2C brand", "Manufacturer / exporter", "Jeweller", "Service business", "Other"];
const contactMethods = ["Email", "Phone", "WhatsApp"];
const stepTitles = ["YOUR STAGE", "CAPABILITIES", "YOUR BUSINESS", "BEST WAY TO REACH YOU"];

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
  "w-full rounded-lg border border-white/10 bg-ink px-3.5 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-accent focus:ring-2 focus:ring-accent/25";

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-slate-300">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-rose-400">{error}</span>}
    </label>
  );
}

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border px-3.5 py-3 text-left text-sm transition-all duration-300 ${
        active
          ? "border-accent bg-accent/10 text-white shadow-[0_0_0_1px_rgba(34,211,238,0.3)]"
          : "border-white/10 bg-ink text-slate-300 hover:border-white/25 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export default function Enquire() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initialState);
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleCapability = (title: string) =>
    update(
      "capabilities",
      data.capabilities.includes(title) ? data.capabilities.filter((c) => c !== title) : [...data.capabilities, title]
    );

  const errors = {
    name: data.name.trim() ? "" : "Please enter your name.",
    email: isEmail(data.email) ? "" : "Enter a valid email address.",
    capabilities: data.capabilities.length ? "" : "Pick at least one capability.",
    company: data.company.trim() ? "" : "Please enter your business name.",
    phone: data.contactMethod !== "Email" && !data.phone.trim() ? "Add a number so we can reach you." : "",
  };

  const stepValid = [
    !errors.name && !errors.email,
    !errors.capabilities,
    !errors.company,
    !errors.phone,
  ];

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

  const handleSubmit = () => {
    if (step < 3) {
      next();
      return;
    }
    if (!stepValid[3]) {
      setShowErrors(true);
      return;
    }
    setStatus("sending");
    // TODO: replace with a real request, e.g. fetch("/api/enquire", { method: "POST", body: JSON.stringify(data) })
    window.setTimeout(() => setStatus("done"), 1200);
  };

  const reset = () => {
    setData(initialState);
    setStep(0);
    setShowErrors(false);
    setStatus("idle");
  };

  const err = (msg: string) => (showErrors && msg ? msg : undefined);

  return (
    <section id="enquire" className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="wrap relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.14em] text-accent">ENQUIRE</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[56px]">
            Tell us what you’re
            <br /> building.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-slate-300">
            Let’s understand your business and explore how CommerceOS can help you move forward.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-slate-200">
            {["Teams in India and the UK", "A reply within [RESPONSE TIME]", "No obligation — just a conversation"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <Check size={14} className="text-accent" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-2xl border border-white/10 bg-ink-2 p-6 shadow-2xl shadow-black/40 sm:p-7">
            {status === "done" ? (
              <div className="animate-step-in py-10 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check size={26} />
                </span>
                <h3 className="mt-5 text-2xl font-bold">{`Thanks, ${data.name.trim().split(" ")[0]}.`}</h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                  {`We've received your enquiry and will reply to ${data.email.trim()}.`}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-7 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[10px] tracking-[0.12em] text-slate-400">
                    STEP {step + 1} OF 4 · {stepTitles[step]}
                  </p>
                  <div className="flex gap-1.5" aria-hidden>
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className={`h-[3px] rounded-full transition-all duration-500 ${
                          i <= step ? "w-6 bg-accent" : "w-4 bg-white/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div key={step} className="mt-5 animate-step-in space-y-5">
                  {step === 0 && (
                    <>
                      <div>
                        <p className="mb-2.5 text-sm font-medium">Where is your business today?</p>
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
                      <p className="mb-2.5 text-sm font-medium">Which capabilities do you need?</p>
                      <div className="flex flex-wrap gap-2">
                        {capabilities.map((c) => {
                          const active = data.capabilities.includes(c.title);
                          return (
                            <button
                              key={c.n}
                              type="button"
                              aria-pressed={active}
                              onClick={() => toggleCapability(c.title)}
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs transition-all duration-300 ${
                                active
                                  ? "border-accent bg-accent/10 text-white"
                                  : "border-white/10 text-slate-300 hover:border-white/25 hover:text-white"
                              }`}
                            >
                              {active && <Check size={12} className="text-accent" />}
                              {c.title}
                            </button>
                          );
                        })}
                      </div>
                      {err(errors.capabilities) && (
                        <p className="mt-2 text-xs text-rose-400">{errors.capabilities}</p>
                      )}
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
                        <p className="mb-2.5 text-sm font-medium">What kind of business is it?</p>
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
                        <p className="mb-2.5 text-sm font-medium">How should we reach you?</p>
                        <div className="grid grid-cols-3 gap-2.5">
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
                      <Field label="Anything else? (optional)">
                        <textarea
                          rows={3}
                          className={`${inputCls} resize-none`}
                          placeholder="Tell us a little about what you're building"
                          value={data.message}
                          onChange={(e) => update("message", e.target.value)}
                        />
                      </Field>
                    </>
                  )}
                </div>

                <div className="mt-6 flex gap-3">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={back}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3.5 text-sm font-semibold transition-colors hover:bg-white/5"
                    >
                      <ArrowLeft size={15} /> Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 disabled:cursor-wait disabled:opacity-80"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        {step === 0 ? "Enquire about CommerceOS" : step === 3 ? "Send enquiry" : "Continue"}
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
                  {step === 0 && "Next: the capabilities you need, your business and the best way to reach you. "}
                  By continuing you agree to our{" "}
                  <a href="#" className="text-accent underline underline-offset-2">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}