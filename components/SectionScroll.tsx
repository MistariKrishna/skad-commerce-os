"use client";

import { useEffect } from "react";
import { scrollToPath } from "./NavLink";

export default function SectionScroll({ path }: { path: string }) {
  useEffect(() => {
    if (path === "/") return;
    const raf = requestAnimationFrame(() => {
      scrollToPath(path, "instant");
    });
    return () => cancelAnimationFrame(raf);
  }, [path]);

  useEffect(() => {
    const onPop = () => {
      scrollToPath(window.location.pathname, "smooth");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return null;
}