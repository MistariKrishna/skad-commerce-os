import { ArrowRight, RotateCw, Sparkles, RefreshCw } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const steps = [
  { n: 1, title: "Insight", items: ["Market Intelligence"], caption: "What should we build, and for whom?", dot: "bg-build" },
  { n: 2, title: "Foundation", items: ["Brand Infrastructure", "Product"], caption: "A brand and range ready for market.", dot: "bg-build" },
  { n: 3, title: "Commerce", items: ["E-commerce", "Content"], caption: "Live, shoppable and well presented.", dot: "bg-launch" },
  { n: 4, title: "Demand", items: ["SEO/GEO", "Marketing", "CRM"], caption: "Found, chosen and chosen again.", dot: "bg-grow" },
  { n: 5, title: "Run & learn", items: ["Analytics", "Operations"], caption: "Delivered reliably, measured clearly.", dot: "bg-grow" },
];

const dashStyle = {
  backgroundImage: "repeating-linear-gradient(90deg, rgba(34,211,238,0.35) 0 6px, transparent 6px 12px)",
};

export default function Connects() {
  return (
    <section id="how-it-works" className="bg-white py-24 lg:py-32">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading eyebrow="04 — How it connects" title="One connected ecosystem. Twelve capabilities." />
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
              Each capability hands its work to the next — so insight shapes the brand, the brand shapes the store, and
              every sale informs the next decision.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <a
              href="#platform"
              className="group inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink/25"
            >
              Explore the platform
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="mt-12 rounded-2xl border border-slate-200 bg-canvas p-6 lg:p-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 110} className="relative">
                  <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-slate-500">
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                    STEP {s.n}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                  <div className="mt-3 space-y-2.5 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 transition-shadow duration-300 hover:shadow-md">
                    {s.items.map((it) => (
                      <p key={it}>{it}</p>
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">{s.caption}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight size={16} className="absolute -right-5 top-16 hidden text-slate-300 lg:block" />
                  )}
                </Reveal>
              ))}
            </div>

            <p className="mt-6 flex items-center gap-2 text-xs text-slate-500 lg:justify-end">
              <RotateCw size={13} className="text-grow" />
              Analytics feeds back into Market Intelligence — the system keeps learning.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                { icon: Sparkles, title: "05 · AI", sub: "Research, creative and support, at every step" },
                { icon: RefreshCw, title: "10 · Automation", sub: "Workflows that connect every hand-off" },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="group flex items-center gap-4 rounded-xl bg-ink p-4 text-white">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent transition-transform duration-500 group-hover:rotate-180">
                    <Icon size={16} />
                  </span>
                  <div className="shrink-0">
                    <p className="font-semibold">{title}</p>
                    <p className="text-xs text-slate-400">{sub}</p>
                  </div>
                  <span className="hidden h-px flex-1 animate-dash sm:block" style={dashStyle} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}