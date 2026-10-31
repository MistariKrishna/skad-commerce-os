import {
  Search,
  Box,
  Tag,
  ShoppingBag,
  Sparkles,
  Image as ImageIcon,
  Globe,
  Megaphone,
  Users,
  RefreshCw,
  Activity,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type Stage = "build" | "launch" | "grow";
export type Filter = "all" | Stage;
export type CapabilityStage = Stage | "every";

export type Capability = {
  n: string;
  title: string;
  description: string;
  stage: CapabilityStage;
  label: string;
  icon: LucideIcon;
};

export const capabilities: Capability[] = [
  { n: "01", title: "Market Intelligence", description: "Know the category, competitors and price points before you invest.", stage: "build", label: "Build", icon: Search },
  { n: "02", title: "Brand Infrastructure", description: "Positioning, identity and packaging as one reusable system.", stage: "build", label: "Build", icon: Box },
  { n: "03", title: "Product", description: "Product architecture, sourcing and a catalogue built to scale.", stage: "build", label: "Build", icon: Tag },
  { n: "04", title: "E-commerce", description: "Storefronts, checkout, payments, marketplaces and B2B ordering.", stage: "launch", label: "Launch", icon: ShoppingBag },
  { n: "05", title: "AI", description: "Research, creative, support and workflow agents across the system.", stage: "every", label: "All stages", icon: Sparkles },
  { n: "06", title: "Content", description: "Photography, video and copy, produced at catalogue scale.", stage: "launch", label: "Launch", icon: ImageIcon },
  { n: "07", title: "SEO/GEO", description: "Get found on Google and in AI answers.", stage: "grow", label: "Grow", icon: Globe },
  { n: "08", title: "Marketing", description: "Performance, social, influencer and launch campaigns.", stage: "grow", label: "Grow", icon: Megaphone },
  { n: "09", title: "CRM", description: "Customer data, segments, and email and WhatsApp journeys.", stage: "grow", label: "Grow", icon: Users },
  { n: "10", title: "Automation", description: "Order, inventory, lead and reporting workflows that run themselves.", stage: "grow", label: "Grow & Scale", icon: RefreshCw },
  { n: "11", title: "Analytics", description: "One view of sales, marketing and operations.", stage: "grow", label: "Grow & Scale", icon: Activity },
  { n: "12", title: "Operations", description: "Fulfilment, inventory, suppliers and international trade.", stage: "grow", label: "Grow & Scale", icon: Truck },
];

export const stageDot: Record<CapabilityStage, string> = {
  build: "bg-build",
  launch: "bg-launch",
  grow: "bg-grow",
  every: "bg-accent",
};

export const brands = ["DETARA", "BENAVI", "LUXORA GLOW", "RUPAARI", "ZEMO", "CASE SUNO"];