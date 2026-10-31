import Image from "next/image";
import NavLink from "./NavLink";

type LogoProps = {
  variant?: "default" | "white";
  className?: string;
};

const sources = {
  default: "/images/logo/commerceos-logo.svg",
  white: "/images/logo/commerceos-white-logo.svg",
};

export default function Logo({ variant = "default", className = "h-10" }: LogoProps) {
  const isWhite = variant === "white";

  return (
    <NavLink
      href="/"
      aria-label="SKAD CommerceOS home"
      className="flex shrink-0 items-center transition-opacity duration-300 hover:opacity-85"
    >
      <Image
        src={sources[variant]}
        alt="SKAD CommerceOS"
        width={146}
        height={40}
        unoptimized
        priority={!isWhite}
        className={`w-auto ${isWhite ? "" : "mix-blend-multiply"} ${className}`}
      />
    </NavLink>
  );
}