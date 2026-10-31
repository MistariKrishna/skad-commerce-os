import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Key = "build" | "launch" | "grow";

const stages: {
  key: Key; n: string; label: string; title: string; text: string; link: string; caps: string; tint: string; dot: string;
}[] = [
  {
    key: "build", n: "01", label: "Build", title: "Create a solid foundation.",
    text: "Research the market, define the brand and shape the product before you spend on launch.",
    link: "Explore Build", caps: "Market Intelligence, Brand Infrastructure, Product", tint: "bg-indigo-50", dot: "bg-build",
  },
  {
    key: "launch", n: "02", label: "Launch", title: "Bring your business to market.",
    text: "Go live with a storefront, payments, marketplaces and the content that sells your range.",
    link: "Explore Launch", caps: "E-commerce, Content", tint: "bg-cyan-50", dot: "bg-launch",
  },
  {
    key: "grow", n: "03", label: "Grow", title: "Scale with connected systems.",
    text: "Find demand, keep customers and automate the operations that slow growth down.",
    link: "Explore Grow", caps: "SEO/GEO, Marketing, CRM, Automation, Analytics, Operations", tint: "bg-emerald-50", dot: "bg-grow",
  },
];

function Illustration({ type }: { type: Key }) {
  if (type === "build") {
    return (
      <div className="grid h-full grid-cols-2 gap-2.5">
        <div className="flex flex-col justify-between rounded-lg bg-white p-3 shadow-sm">
          <span className="text-4xl font-bold tracking-tight">Aa</span>
          <span className="font-mono text-[8px] leading-relaxed tracking-wider text-slate-500">
            POSITIONING ·<br />
            IDENTITY · RANGE
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex-1 rounded-md bg-ink transition-transform duration-500 group-hover:translate-x-1" />
          <div className="flex-1 rounded-md bg-build transition-transform delay-75 duration-500 group-hover:-translate-x-1" />
          <div className="flex-1 rounded-md bg-white shadow-sm transition-transform delay-150 duration-500 group-hover:translate-x-1" />
        </div>
      </div>
    );
  }
  if (type === "launch") {
    return (
      <div className="h-full overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="ml-2 h-2 w-1/2 rounded-full bg-slate-100" />
        </div>
        <div className="grid grid-cols-3 gap-2 p-2.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="transition-transform duration-500 group-hover:-translate-y-1"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="h-14 rounded bg-cyan-100/70" />
              <div className="mt-2 h-1 rounded bg-slate-200" />
              <div className="mt-1 h-1 w-1/2 rounded bg-launch" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-3 shadow-sm">
      <span className="font-mono text-[8px] tracking-wider text-slate-500">ILLUSTRATIVE · ONE VIEW OF THE BUSINESS</span>
      <svg viewBox="0 0 200 80" className="mt-2 w-full flex-1" preserveAspectRatio="none" aria-hidden>
        <polyline points="0,72 50,68 100,64 150,58 200,52" fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="4 4" />
        <polyline
          className="draw-line"
          pathLength={1}
          points="0,70 25,65 50,66 75,55 100,52 125,42 150,36 175,30 200,18"
          fill="none"
          stroke="#34d399"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="py-24 lg:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal>
            <SectionHeading eyebrow="01 — The journey" title="Three stages. One continuous system." />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[15px] leading-relaxed text-slate-600">
              Whether you are starting from an idea or modernising an established business, CommerceOS supports each
              stage with the same connected infrastructure — so nothing is rebuilt as you grow.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {stages.map((s, i) => (
            <Reveal key={s.key} delay={i * 120} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-900/[0.06]">
                <div className={`h-40 p-5 ${s.tint}`}>
                  <Illustration type={s.key} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-slate-500">
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                    {s.n} · {s.label.toUpperCase()}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{s.text}</p>
                  <a href="#platform" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-link">
                    {s.link}
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <p className="mt-auto border-t border-slate-100 pt-4 text-sm text-slate-600 [margin-top:max(1rem,auto)]">
                    <span className="font-semibold text-ink">Capabilities</span> · {s.caps}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}