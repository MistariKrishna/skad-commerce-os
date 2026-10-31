import { Search, Target, Layers, ArrowUp, TrendingUp, Maximize2 } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const steps = [
  { icon: Search, title: "Discover", text: "Understand the market, the customer and where you stand today." },
  { icon: Target, title: "Define", text: "Agree the positioning, the range and a plan with clear priorities." },
  { icon: Layers, title: "Build", text: "Create the brand, product and systems the business will run on." },
  { icon: ArrowUp, title: "Launch", text: "Go live with the store, the content and the first campaigns." },
  { icon: TrendingUp, title: "Grow", text: "Build demand and retention, guided by what the data shows." },
  { icon: Maximize2, title: "Scale", text: "Automate operations and expand into new channels and markets." },
];

export default function Method() {
  return (
    <section id="method" className="py-24 lg:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal>
            <SectionHeading eyebrow="05 — Our method" title="From idea to scale, in six clear steps." />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[15px] leading-relaxed text-slate-600">
              The same method SKAD uses across the group, with the twelve capabilities mapped to each step.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 100} className="group relative">
                <div className="relative flex items-center">
                  <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-ink transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <Icon size={15} />
                  </span>
                  {i < steps.length - 1 && (
                    <span className="absolute left-10 right-[-1.5rem] top-1/2 hidden h-px bg-slate-200 lg:block">
                      <span
                        className="grow-line block h-full bg-ink/40"
                        style={{ transitionDelay: `${300 + i * 150}ms` }}
                      />
                    </span>
                  )}
                </div>
                <p className="mt-4 font-mono text-[11px] text-slate-500">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{s.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}