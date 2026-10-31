import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const chips = [
  { label: "Brand agency", left: "4%", top: "4%", rotate: -3 },
  { label: "Web developer", left: "52%", top: "16%", rotate: 3 },
  { label: "Ad agency", left: "18%", top: "32%", rotate: -2 },
  { label: "Email tool", left: "60%", top: "44%", rotate: -3 },
  { label: "Spreadsheets", left: "2%", top: "58%", rotate: 2 },
  { label: "Photographer", left: "46%", top: "70%", rotate: 3 },
  { label: "Courier portal", left: "14%", top: "86%", rotate: -2 },
];

const rows = [
  { title: "Build", sub: "Insight, brand, product", bar: "bg-build" },
  { title: "Launch", sub: "Storefront, content", bar: "bg-launch" },
  { title: "Grow & Scale", sub: "Demand, customers, operations", bar: "bg-grow" },
  { title: "AI + Automation", sub: "Across every stage", bar: "bg-accent", outline: true },
];

export default function Problem() {
  return (
    <section id="problem" className="bg-mist py-24 lg:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeading eyebrow="02 — The problem" title={<>Too many disconnected tools. Too many moving parts.</>} />
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-slate-600">
            Most businesses stitch together separate agencies, freelancers and software to get to market. Every
            hand-off loses context, data sits in different places, and nobody sees the whole picture.
          </p>
          <ul className="mt-8 space-y-3.5">
            {[
              "Briefs are repeated to every new vendor.",
              "Customer, order and marketing data never meet.",
              "Growth stalls while teams coordinate instead of build.",
            ].map((t, i) => (
              <li key={t} className="flex items-baseline gap-3 text-[15px] text-slate-700">
                <span className="font-mono text-[10px] text-slate-400">{String.fromCharCode(65 + i)}</span>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          <Reveal delay={100} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-canvas p-5">
              <p className="font-mono text-[10px] tracking-[0.12em] text-slate-500">WITHOUT ONE SYSTEM</p>
              <div className="relative mt-4 h-64 flex-1">
                {chips.map((c, i) => (
                  <div
                    key={c.label}
                    className="absolute"
                    style={{ left: c.left, top: c.top, transform: `rotate(${c.rotate}deg)` }}
                  >
                    <span
                      className="block animate-float whitespace-nowrap rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] text-slate-700 shadow-sm"
                      style={{ animationDelay: `${i * 0.6}s`, animationDuration: `${5 + (i % 3)}s` }}
                    >
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500">
                Separate briefs · separate data · no shared view
              </p>
            </div>
          </Reveal>

          <Reveal delay={220} className="h-full">
            <div className="flex h-full flex-col rounded-2xl bg-ink p-5 text-white shadow-2xl shadow-ink/20">
              <p className="font-mono text-[10px] tracking-[0.12em] text-slate-400">WITH COMMERCEOS</p>
              <div className="mt-4 flex flex-1 flex-col gap-2.5">
                {rows.map((r) => (
                  <div
                    key={r.title}
                    className={`group flex items-center gap-3 rounded-lg p-3.5 transition-all duration-300 hover:translate-x-1 ${
                      r.outline ? "border border-white/10" : "bg-ink-3"
                    }`}
                  >
                    <span className={`h-5 w-[3px] rounded-full ${r.bar} transition-all duration-300 group-hover:h-7`} />
                    <div>
                      <p className="text-sm font-semibold">{r.title}</p>
                      <p className="text-xs text-slate-400">{r.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-400">
                One brief · one system · one view of the business
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}