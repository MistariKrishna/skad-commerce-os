"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function useSeen<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const r = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(r);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

export default function Appear({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, seen } = useSeen<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
        seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function MobileHead({ title, text }: { title: string; text: string }) {
  return (
    <Appear>
      <h2 className="text-balance text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1a3b] sm:text-[2.4rem]">
        {title}
      </h2>
      <p className="mt-4 text-[16px] leading-relaxed text-slate-600">{text}</p>
    </Appear>
  );
}