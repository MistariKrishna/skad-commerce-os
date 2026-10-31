import { ArrowRight, ShoppingBag, Factory, Gem, Briefcase } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const solutions = [
  {
    icon: ShoppingBag, eyebrow: "FOR FOUNDERS AND GROWING BRANDS", title: "D2C Brands",
    text: "Launch without hiring ten agencies, then grow with SEO/GEO, CRM and automation working from the same data.",
    link: "Solutions for D2C",
  },
  {
    icon: Factory, eyebrow: "FOR MAKERS AND TRADERS", title: "Manufacturers & Exporters",
    text: "Take a proven product range online — B2B ordering, direct-to-consumer channels and international trade operations in one place.",
    link: "Solutions for manufacturers",
  },
  {
    icon: Gem, eyebrow: "FOR JEWELLERS", title: "Jewellery & Diamonds",
    text: "Built by a group that runs jewellery brands itself — catalogue, content and storefronts made for high-value, considered purchases.",
    link: "Solutions for jewellery",
  },
  {
    icon: Briefcase, eyebrow: "FOR ADVISERS AND SERVICE FIRMS", title: "Service Businesses",
    text: "Turn expertise into a findable, bookable service — with leads captured, followed up and measured automatically.",
    link: "Solutions for services",
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 lg:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal>
            <SectionHeading eyebrow="07 — Solutions" title="Built around the way your business works." />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[15px] leading-relaxed text-slate-600">
              Start from your situation. We bring the capabilities that matter to it.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {solutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={(i % 2) * 120} className="h-full">
                <a
                  href="#enquire"
                  className="group flex h-full gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/[0.07] lg:p-7"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-ink transition-all duration-500 group-hover:bg-ink group-hover:text-accent">
                    <Icon size={17} />
                  </span>
                  <div className="flex flex-col">
                    <p className="font-mono text-[10px] tracking-[0.12em] text-slate-500">{s.eyebrow}</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{s.text}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-link">
                      {s.link}
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}