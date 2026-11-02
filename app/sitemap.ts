import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/cookies", priority: 0.2 },
    { path: "/accessibility", priority: 0.2 },
  ];
  return pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}