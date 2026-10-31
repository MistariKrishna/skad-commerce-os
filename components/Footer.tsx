import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import NavLink from "./NavLink";

const columns = [
  { title: "PLATFORM", links: [["Overview", "/platform"], ["Twelve capabilities", "/platform"], ["How it connects", "/how-it-works"], ["Commerce Lab", "/ways"]] },
  { title: "SOLUTIONS", links: [["D2C brands", "/solutions"], ["Manufacturers & exporters", "/solutions"], ["Jewellery & diamonds", "/industries"], ["Service businesses", "/solutions"]] },
  { title: "COMPANY", links: [["How it works", "/method"], ["Built on CommerceOS", "/built-on"], ["Insights", "/method"], ["About", "/"]] },
  { title: "CONTACT", links: [["Enquire", "/enquire"], ["Partner enquiry", "/enquire"], ["Careers", "/enquire"]] },
];

const legal = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Cookies", "/cookies"],
  ["Accessibility", "/accessibility"],
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink text-white">
      <div className="wrap py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <Logo variant="white" className="h-10" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              One connected system. Twelve capabilities. From idea to scale.
            </p>
            <p className="mt-5 font-mono text-xs tracking-[0.2em] text-slate-400">BUILD • LAUNCH • GROW</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] tracking-[0.14em] text-slate-500">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <NavLink href={href} className="text-sm text-slate-300 transition-colors duration-300 hover:text-accent">
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 SKAD CommerceOS</p>
          <div className="flex flex-wrap gap-5">
            {legal.map(([label, href]) => (
              <a key={label} href={href} className="transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </div>
          {/* Replace "/" with the SKAD Group website URL */}
          <a href="https://www.skadgroup.org" className="group inline-flex items-center gap-1.5 text-slate-300 transition-colors hover:text-white">
            <span className="font-mono tracking-[0.14em]">A SKAD GROUP</span> platform
            <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}