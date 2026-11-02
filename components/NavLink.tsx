"use client";

import type { ComponentProps, MouseEvent } from "react";

const ROUTES: Record<string, string> = {
  "/": "top",
  "/platform": "platform",
  "/solutions": "solutions",
  "/industries": "solutions",
  "/how-it-works": "how-it-works",
  "/built-on": "built-on",
  "/method": "method",
  "/enquire": "enquire",
  "/ways": "ways",
};

export function scrollToPath(path: string, behavior: ScrollBehavior = "smooth"): boolean {
  const id = ROUTES[path];
  if (!id) return false;
  if (id === "top") {
    window.scrollTo({ top: 0, behavior });
    return true;
  }
  let el = document.getElementById(id);
  // if the desktop section is hidden (phones/tablets), use its mobile version
  if (!el || el.offsetParent === null) {
    const alt = document.getElementById(`${id}-m`);
    if (alt && alt.offsetParent !== null) el = alt;
  }
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

type NavLinkProps = ComponentProps<"a"> & { href: string };

export default function NavLink({ href, onClick, ...rest }: NavLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (scrollToPath(href)) {
      e.preventDefault();
      if (window.location.pathname !== href) window.history.pushState(null, "", href);
    }
  };

  return <a href={href} {...rest} onClick={handleClick} />;
}