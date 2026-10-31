import { ArrowRight, Check, Plus } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function WaysToWork() {
  return (
    <section id="ways" className="bg-white py-24 lg:py-32">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            center
            eyebrow="08 — Two ways to work with us"
            title={
              <>
                The infrastructure to operate.
                <br className="hidden sm:block" /> The expertise to execute.
              </>
            }
          />
        </Reveal>

        <div className="relative mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <Reveal className="h-full">
            <div className="group flex h-full flex-col rounded-2xl bg-ink p-8 text-white transition-transform duration-500 hover:-translate-y-1 lg:p-9">
              <span className="w-fit rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-accent">
                COMMERCEOS · INFRASTRUCTURE
              </span>
              <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-[28px]">Run your business on one connected system.</h3>
              <p className="mt-4 leading-relaxed text-slate-300">
                The technology and commerce infrastructure: twelve connected capabilities across Build, Launch and Grow,
                for teams that want to operate it themselves.
              </p>
              <ul className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                {["Twelve connected capabilities", "Build, Launch and Grow in one system", "AI and automation across every stage"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <Check size={14} className="text-accent" />
                    {t}
                  </li>
                ))}
              </ul>
              <a href="#platform" className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-link">
                Explore the platform
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          <span className="absolute left-1/2 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white shadow-md lg:grid">
            <Plus size={15} />
          </span>

          <Reveal delay={150} className="h-full">
            <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/[0.07] lg:p-9">
              <span className="w-fit rounded-full bg-blue-50 px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-link">
                COMMERCE LAB · EXECUTION
              </span>
              <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-[28px]">Prefer us to run it for you?</h3>
              <p className="mt-4 leading-relaxed text-slate-600">
                SKAD Commerce Lab executes on CommerceOS with AI and human teams — managed services on the same
                infrastructure, so the work stays connected.
              </p>
              <ul className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm text-slate-700">
                {["Managed execution on CommerceOS", "AI efficiency with human expertise", "Fifteen service capabilities"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <Check size={14} className="text-link" />
                    {t}
                  </li>
                ))}
              </ul>
              <a href="#enquire" className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-link">
                Explore Commerce Lab
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <p className="mt-6 text-center text-sm text-slate-500">
            Same infrastructure, two ways in. Many businesses start with Commerce Lab and take more in-house over time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}