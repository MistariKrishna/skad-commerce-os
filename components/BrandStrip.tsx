import { brands } from "@/lib/data";

export default function BrandStrip() {
  const loop = [...brands, ...brands];
  return (
    <section aria-label="Brands built on CommerceOS" className="border-b border-slate-200 bg-white">
      <div className="wrap flex flex-col items-start gap-4 py-7 md:flex-row md:items-center md:gap-10">
        <p className="shrink-0 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-slate-500">
          Infrastructure behind
          <br />
          SKAD’s own brands
        </p>
        <div
          className="group relative w-full overflow-hidden"
          style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
        >
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {loop.map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="px-10 text-sm font-semibold tracking-[0.18em] text-slate-500 transition-colors duration-300 hover:text-ink"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}