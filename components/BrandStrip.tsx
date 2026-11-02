import Image from "next/image";

// Adjust the file paths to match your logo files
const logos = [
  { name: "Detara", src: "/images/brands/logos/detara-logo.svg" },
  { name: "Benavi", src: "/images/brands/logos/benavi-logo.svg" },
  { name: "Luxora Glow", src: "/images/brands/logos/luxora-glow-logo.svg" },
  { name: "Rupaari", src: "/images/brands/logos/rupaari-logo.svg" },
  // { name: "Zemo", src: "/images/brands/logos/zemo-logo.svg" },
  { name: "Case Suno", src: "/images/brands/logos/case-suno-logo.svg" },
];

export default function BrandStrip() {
  const loop = [...logos, ...logos];

  return (
    <section aria-label="Brands built on CommerceOS" className="border-b border-slate-200 bg-white">
      <div className="wrap flex flex-col items-start gap-5 py-8 md:flex-row md:items-center md:gap-12">
        <p className="shrink-0 text-[13px] font-semibold leading-snug text-slate-500">
          Brands built on
          <br className="hidden md:block" /> CommerceOS
        </p>

        <div
          className="group relative w-full overflow-hidden"
          style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
        >
          <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
            {loop.map((l, i) => (
              <li key={`${l.name}-${i}`} className="px-8 sm:px-10" aria-hidden={i >= logos.length}>
                <Image
                  src={l.src}
                  alt={i < logos.length ? l.name : ""}
                  width={160}
                  height={48}
                  unoptimized
                  className="h-8 w-auto object-contain opacity-55 brightness-0 transition-[opacity,translate] duration-300 hover:-translate-y-0.5 hover:opacity-90 sm:h-9"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}