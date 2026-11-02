
import type { Metadata } from "next";
import {
  Funnel_Display,
  Funnel_Sans,
  Martian_Mono,
} from "next/font/google";

import "./globals.css";

const SITE_URL = "https://skadcommerce.com";

const display = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel-display",
  display: "swap",
});

const body = Funnel_Sans({
  subsets: ["latin"],
  variable: "--font-funnel-sans",
  display: "swap",
});

const mono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: "SKAD Commerce OS",

  title: {
    default: "SKAD Commerce OS | Commerce, Built to Grow",
    template: "%s | SKAD Commerce OS",
  },

  description:
    "SKAD Commerce OS is a commerce services platform helping founders, D2C brands and traditional businesses build, launch, manage and grow their businesses.",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/images/logo/favicon.ico",
    apple: "/images/logo/apple-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "SKAD Commerce OS",
    title: "SKAD Commerce OS | Commerce, Built to Grow",
    description:
      "Build, launch, manage and grow your business with SKAD Commerce OS. Commerce services and solutions for founders, D2C brands and traditional businesses.",
  },

  twitter: {
    card: "summary",
    title: "SKAD Commerce OS | Commerce, Built to Grow",
    description:
      "A commerce services platform helping businesses build, launch and grow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="bg-canvas font-sans text-ink antialiased">
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://skadcommerce.com/#organization",
            name: "SKAD Commerce OS",
            url: "https://skadcommerce.com",
            parentOrganization: {
              "@type": "Organization",
              name: "SKAD GROUP",
            },
          },
          {
            "@type": "WebSite",
            "@id": "https://skadcommerce.com/#website",
            name: "SKAD Commerce OS",
            url: "https://skadcommerce.com",
            publisher: {
              "@id": "https://skadcommerce.com/#organization",
            },
          },
        ],
      }),
    }}
  />
  {children}
</body>
    </html>
  );
}
