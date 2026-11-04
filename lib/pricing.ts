export type Billing = "monthly" | "annual";

export type Plan = {
  id: string;
  step: string;
  name: string;
  note: string; // handwritten annotation above the card
  description: string;
  monthly: number; // price when billed monthly
  annual: number; // per-month price when billed yearly
  popular?: boolean;
  lead?: string;
  features: string[];
  cta: string;
};

export const ANNUAL_SAVING_LABEL = "save 20%";

export const plans: Plan[] = [
  {
    id: "starter",
    step: "01",
    name: "Starter",
    note: "start selling",
    description: "For new brands ready to sell online under their own name.",
    monthly: 14,
    annual: 11,
    features: [
      "Online store on your own domain",
      "Up to 50 products",
      "Payments and shipping set up",
      "Mobile-ready templates",
      "Basic SEO and analytics",
      "Email support",
    ],
    cta: "Choose Starter",
  },
  {
    id: "growth",
    step: "02",
    name: "Growth",
    note: "most brands land here",
    description: "For growing brands that want more sales from every visitor.",
    monthly: 34,
    annual: 27,
    popular: true,
    lead: "Everything in Starter, plus:",
    features: [
      "Up to 150 products",
      "Abandoned cart recovery",
      "WhatsApp and email order updates",
      "Discount codes and email marketing",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Choose Growth",
  },
    {
    id: "pro",
    step: "03",
    name: "Pro",
    note: "set up and scale",
    description: "Everything to run and scale your store, with setup done for you.",
    monthly: 79,
    annual: 63,
    lead: "Everything in Growth, plus:",
    features: [
      "Store set up for you by our team",
      "AI chatbot for customer questions",
      "AI product descriptions and insights",
      "CRM and marketing automations",
      "Advanced SEO and GEO tools",
      "Custom analytics dashboard",
    ],
    cta: "Choose Pro",
  },
];

export const pricingNotes = ["Prices in USD", "Taxes may apply", "Cancel any time", "Change plans whenever you like"];