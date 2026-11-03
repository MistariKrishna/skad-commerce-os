export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export type Plan = {
  id: string;
  name: string;
  for: string;
  price: number;
  from?: boolean;
  popular?: boolean;
  highlights: string[];
  details: { title: string; items: string[] }[];
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "SKAD Starter",
    for: "Startups, local businesses and emerging brands",
    price: 24999,
    highlights: [
      "2 social media platforms",
      "12 posts and 2 reels a month",
      "Basic SEO and Search Console monitoring",
      "Website updates and maintenance",
      "Basic competitor overview",
      "Monthly activity report",
    ],
    details: [
      { title: "Social media", items: ["Content planning", "Caption writing and hashtag research", "Scheduling"] },
      { title: "SEO", items: ["Initial SEO review", "Keyword research", "Meta titles and descriptions", "Basic on-page optimisation"] },
      { title: "Website support", items: ["Minor content updates", "Basic maintenance", "Performance monitoring"] },
      { title: "Support", items: ["Email and WhatsApp communication"] },
    ],
  },
  {
    id: "growth",
    name: "SKAD Growth",
    for: "Growing businesses and D2C brands",
    price: 44999,
    popular: true,
    highlights: [
      "3 social media platforms",
      "16 posts and 8 reels a month",
      "SEO plus basic GEO and AEO",
      "Google Ads or Meta Ads management",
      "Basic CRM and email marketing",
      "WhatsApp enquiry automation",
    ],
    details: [
      { title: "Social media", items: ["Monthly content planning", "Creative design and captions", "Engagement monitoring"] },
      { title: "SEO and GEO", items: ["Keyword research", "On-page and technical SEO monitoring", "Search performance reporting"] },
      { title: "Advertising", items: ["One platform: Google or Meta", "Campaign setup and audience research", "Monthly ads report"] },
      { title: "Website and store", items: ["Maintenance and updates", "Catalogue support", "Conversion recommendations"] },
      { title: "CRM and WhatsApp", items: ["Lead management setup", "Customer segmentation", "Automated replies and follow-ups"] },
    ],
  },
  {
    id: "pro",
    name: "SKAD Business Pro",
    for: "Established brands, manufacturers and online stores",
    price: 74999,
    highlights: [
      "3 platforms, 20 posts and 12 reels a month",
      "Advanced SEO, GEO and AEO",
      "Google Ads and Meta Ads management",
      "Online store and catalogue management",
      "CRM, WhatsApp and one AI workflow",
      "Dashboard, monthly review and a designated contact",
    ],
    details: [
      { title: "Content", items: ["Monthly content calendar", "Creative development", "Campaign planning"] },
      { title: "Marketing", items: ["Google and Meta campaigns", "Retargeting where suitable", "Monthly performance reports"] },
      { title: "Branding support", items: ["Brand consistency review", "Creative direction", "Promotional campaign planning"] },
      { title: "E-commerce", items: ["Store management", "Listing optimisation", "Store performance monitoring"] },
      { title: "Automation", items: ["Lead follow-up workflows", "Order notifications where supported", "AI chatbot on a supported platform"] },
    ],
  },
  {
    id: "enterprise",
    name: "SKAD Enterprise",
    for: "Multi-brand businesses, exporters and larger teams",
    price: 120000,
    from: true,
    highlights: [
      "Fully custom scope",
      "Research, strategy and brand direction",
      "Marketplace and store management",
      "Custom dashboards and reporting",
      "AI, automation and operations workflows",
      "Designated account contact",
    ],
    details: [
      { title: "Strategy", items: ["Market and competitor research", "Brand positioning", "Digital business planning"] },
      { title: "Commerce", items: ["Marketplace account management", "Catalogue and listing management", "Store performance reporting"] },
      { title: "Operations", items: ["Order and inventory workflows", "Supplier workflows", "Process optimisation"] },
      { title: "Intelligence", items: ["Custom dashboards", "Sales and marketing analytics"] },
    ],
  },
];

export const compareRows: { label: string; values: [string, string, string, string] }[] = [
  { label: "Social platforms", values: ["2", "3", "3", "Custom"] },
  { label: "Posts per month", values: ["12", "16", "20", "Custom"] },
  { label: "Reels per month", values: ["2", "8", "12", "Custom"] },
  { label: "SEO", values: ["Basic", "Advanced", "Advanced", "Advanced"] },
  { label: "GEO and AEO", values: ["Add-on", "Basic", "Advanced", "Custom"] },
  { label: "Google Ads", values: ["Add-on", "Optional", "Included", "Included"] },
  { label: "Meta Ads", values: ["Add-on", "Optional", "Included", "Included"] },
  { label: "Website support", values: ["Basic", "Included", "Included", "Custom"] },
  { label: "E-commerce management", values: ["Add-on", "Basic", "Included", "Advanced"] },
  { label: "CRM", values: ["Add-on", "Basic", "Advanced", "Custom"] },
  { label: "WhatsApp automation", values: ["Add-on", "Basic", "Included", "Advanced"] },
  { label: "AI workflows", values: ["Add-on", "Add-on", "One workflow", "Custom"] },
  { label: "Reporting", values: ["Monthly report", "Monthly report", "Dashboard + review", "Custom"] },
  { label: "Account contact", values: ["Shared", "Shared", "Designated", "Designated"] },
];

export type Project = {
  id: string;
  name: string;
  summary: string;
  from: number;
  featured?: boolean;
  tiers?: { label: string; price: number }[];
  includes?: string[];
};

export const projects: Project[] = [
  {
    id: "websites",
    name: "Websites & online stores",
    summary: "From a clean business site to a full online store.",
    from: 24999,
    tiers: [
      { label: "Business website", price: 24999 },
      { label: "Professional business website", price: 34999 },
      { label: "E-commerce website", price: 59999 },
      { label: "Professional e-commerce", price: 89999 },
      { label: "Advanced e-commerce", price: 149999 },
    ],
  },
  {
    id: "launch",
    name: "Complete D2C Brand Launch",
    summary: "Everything to go from idea to selling online, with one team.",
    from: 224999,
    featured: true,
    includes: [
      "Market and competitor research",
      "Complete brand identity and packaging direction",
      "Professional e-commerce store",
      "Catalogue setup for up to 100 products",
      "Launch campaign plan",
      "60 days of support after launch",
    ],
  },
  {
    id: "brand",
    name: "Brand identity",
    summary: "A look and voice people remember.",
    from: 9999,
    tiers: [
      { label: "Logo design", price: 9999 },
      { label: "Packaging design", price: 9999 },
      { label: "Brand identity", price: 24999 },
      { label: "Brand strategy", price: 19999 },
      { label: "Complete brand identity", price: 49999 },
    ],
  },
];

export const services: { name: string; price: number; monthly?: boolean }[] = [
  { name: "Market research", price: 7999 },
  { name: "SEO audit", price: 4999 },
  { name: "Landing page", price: 4999 },
  { name: "AI chatbot", price: 14999 },
  { name: "WhatsApp automation", price: 7999 },
  { name: "CRM setup", price: 9999 },
  { name: "Business automation", price: 19999 },
  { name: "Analytics dashboard", price: 14999 },
  { name: "Marketplace setup", price: 7999 },
  { name: "Marketplace management", price: 14999, monthly: true },
  { name: "Product photography", price: 5000 },
  { name: "Website maintenance", price: 3999, monthly: true },
];

export const addOns: { name: string; price: number; monthly?: boolean }[] = [
  { name: "4 extra social posts", price: 2499 },
  { name: "4 extra reels", price: 4999 },
  { name: "Extra social platform", price: 3999, monthly: true },
  { name: "Extra ads platform", price: 4999, monthly: true },
  { name: "Extra landing page", price: 4999 },
  { name: "Blog article", price: 1999 },
  { name: "Extra AI workflow", price: 4999 },
  { name: "Extra SEO location", price: 3999, monthly: true },
];

export const terms: string[] = [
  "Prices exclude GST",
  "Ad spend and third-party subscriptions are billed separately",
  "Ads management covers up to ₹1,00,000 monthly ad spend; above that, 10% of spend",
  "Monthly plans are billed in advance, with a 3-month starting period",
  "One-time projects: 50% to start, 50% before launch",
  "You own your website, domain, ad accounts and data",
];