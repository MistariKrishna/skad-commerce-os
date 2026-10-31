import { ArrowRight, Camera } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function Badge({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[9px] tracking-[0.1em] ${
        dark ? "bg-black/40 text-slate-400" : "bg-white text-slate-500 shadow-sm"
      }`}
    >
      <Camera size={10} />
      {children}
    </span>
  );
}

const side = [
  { name: "BENAVI", category: "SILVER JEWELLERY" },
  { name: "LUXORA GLOW", category: "BEAUTY AND PERSONAL CARE" },
];

const small = [
  { name: "RUPAARI", sub: "Sarees and Indian fashion", tag: "PHOTO", dark: false },
  { name: "ZEMO", sub: "Fashion", tag: "PHOTO", dark: true },
  { name: "CASE SUNO", sub: "Case advisor platform", tag: "SCREEN", dark: false },
];

export default function BuiltOn() {
  return (
    <section id="built-on" className="bg-white py-24 lg:py-32">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading eyebrow="06 — Built on CommerceOS" title="Real brands. Real work." />
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">
              CommerceOS is the infrastructure behind SKAD’s own brands — across jewellery, beauty, fashion and services.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <a href="#built-on" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-link">
              View case studies
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.45fr_1fr]">
          <Reveal className="h-full">
            <a
              href="#built-on"
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow duration-500 hover:shadow-2xl hover:shadow-slate-900/10"
            >
              <div className="relative h-64 overflow-hidden bg-ink sm:h-80 lg:flex-1">
                <div className="stripes-dark absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-4 left-4">
                  <Badge dark>APPROVED DETARA PHOTOGRAPHY REQUIRED</Badge>
                </div>
              </div>
              <div className="p-6">
                <p className="font-mono text-[10px] tracking-[0.12em] text-slate-500">FINE DIAMOND JEWELLERY</p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-bold tracking-[0.12em]">DETARA</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-link">
                    Read the case study
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
                  A fine diamond jewellery brand from the SKAD Group, built and run on CommerceOS infrastructure.
                </p>
              </div>
            </a>
          </Reveal>

          <div className="grid gap-4">
            {side.map((b, i) => (
              <Reveal key={b.name} delay={120 + i * 100} className="h-full">
                <a
                  href="#built-on"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow duration-500 hover:shadow-xl hover:shadow-slate-900/[0.07]"
                >
                  <div className="relative h-32 overflow-hidden bg-slate-200/60">
                    <div className="stripes-light absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute bottom-3 left-3">
                      <Badge>APPROVED {b.name} PHOTOGRAPHY REQUIRED</Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-[10px] tracking-[0.12em] text-slate-500">{b.category}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <h3 className="text-lg font-bold tracking-[0.12em]">{b.name}</h3>
                      <ArrowRight size={15} className="text-link transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {small.map((b, i) => (
            <Reveal key={b.name} delay={i * 100}>
              <a
                href="#built-on"
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/[0.06]"
              >
                <div
                  className={`relative h-14 w-16 shrink-0 overflow-hidden rounded-lg ${
                    b.dark ? "stripes-dark bg-ink" : "stripes-light bg-slate-200/60"
                  }`}
                >
                  <span
                    className={`absolute bottom-1 left-1 rounded px-1 font-mono text-[7px] ${
                      b.dark ? "bg-black/40 text-slate-400" : "bg-white text-slate-500"
                    }`}
                  >
                    {b.tag}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-[0.12em]">{b.name}</h3>
                  <p className="text-xs text-slate-500">{b.sub}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}