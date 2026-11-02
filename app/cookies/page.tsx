import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalPage, { type Highlight, type LegalSection } from "@/components/legal/LegalPage";

import { SITE_EMAIL as EMAIL, LEGAL_UPDATED as UPDATED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookies | SKAD CommerceOS",
  description: "How the SKAD CommerceOS website uses cookies and browser storage.",
};

const highlights: Highlight[] = [
  { icon: "never", title: "No tracking", text: "We don’t follow you around the web." },
  { icon: "shield", title: "No ads", text: "No advertising cookies or pixels on this site." },
  { icon: "keep", title: "Nothing long-term", text: "The little we store clears when you close the tab." },
  { icon: "contact", title: "We’ll tell you first", text: "If this ever changes, this page changes first." },
];

const sections: LegalSection[] = [
  {
    id: "what-cookies-are",
    title: "What cookies are",
    icon: "cookie",
    body: (
      <p>
        Cookies are small files a website can save in your browser, for example to remember your settings or to track
        what you do. Browsers can also keep short-lived information in temporary storage while a page is open.
      </p>
    ),
  },
  {
    id: "what-we-use",
    title: "What we use",
    icon: "collect",
    body: (
      <>
        <p>
          Our website doesn’t set any tracking or advertising cookies. The only thing we keep is a small amount of
          temporary browser storage, used to carry your choices from one part of the page to another, for example the
          services you tick before sending an enquiry.
        </p>
        <ul>
          <li>it stays in your browser and isn’t shared with us until you send the form</li>
          <li>it’s cleared automatically when you close the tab</li>
        </ul>
      </>
    ),
  },
  {
    id: "what-we-dont-use",
    title: "What we don’t use",
    icon: "never",
    body: (
      <ul>
        <li>no analytics tools that track your visits</li>
        <li>no advertising or retargeting cookies</li>
        <li>no social media tracking pixels</li>
      </ul>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices",
    icon: "control",
    body: (
      <p>
        You can clear or block cookies and site storage any time in your browser’s settings. Our website will still work
        normally. You’d just need to make your selections again.
      </p>
    ),
  },
  {
    id: "updates",
    title: "Updates and questions",
    icon: "contact",
    body: (
      <p>
        If we ever add tools that use cookies, we’ll update this page first and change the date at the top. Any
        questions? Email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <>
      <Header />
      <LegalPage
        title="Cookies"
        updated={UPDATED}
        email={EMAIL}
        heroIcon="cookie"
        heroChips={["No tracking", "No ads", "Nothing long-term"]}
        highlights={highlights}
        intro={<p>Short version: we don’t track you. Here’s exactly what our website does and doesn’t store.</p>}
        sections={sections}
      />
      <Footer />
    </>
  );
}