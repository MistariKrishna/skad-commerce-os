import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  center?: boolean;
  dark?: boolean;
};

export default function SectionHeading({ eyebrow, title, center = false, dark = false }: Props) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${dark ? "text-accent" : "text-link"}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-semibold leading-[1.1] tracking-tight md:text-[40px] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}