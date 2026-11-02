import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalPage, { type Highlight, type LegalSection } from "@/components/legal/LegalPage";

const EMAIL = "skadcommerceos@gmail.com";
const UPDATED = "2 November 2026";

export const metadata: Metadata = {
  title: "Privacy Policy | SKAD CommerceOS",
  description: "How SKAD CommerceOS collects, uses and protects your personal information.",
};

const highlights: Highlight[] = [
  { icon: "never", title: "Never sold", text: "We don’t sell or rent your information. Ever." },
  { icon: "file", title: "Only what we need", text: "Just enough to reply to you and do the work." },
  { icon: "control", title: "You’re in control", text: "See, change or delete your details any time." },
  { icon: "unsubscribe", title: "Easy to opt out", text: "Every marketing email has an unsubscribe link." },
];

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    icon: "company",
    body: (
      <p>
        This website is run by <strong>SkadCommerceOS</strong> (“SKAD CommerceOS”, “we”, “us”), a commerce services team
        that helps businesses around the world build, launch and grow online. We’re responsible for the personal
        information collected through this site.
      </p>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    icon: "collect",
    body: (
      <>
        <p>When you send an enquiry or email us, we collect:</p>
        <ul>
          <li>your name, email and, if you share it, your phone number</li>
          <li>your business name, website and type of business</li>
          <li>the services you’re interested in and anything you write in your message</li>
        </ul>
        <p>
          The systems that host our site may also record basic technical details, such as your IP address and browser,
          to keep the site secure. We don’t use analytics or advertising trackers right now.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    icon: "use",
    body: (
      <>
        <ul>
          <li>to reply to your enquiry and plan your first call</li>
          <li>to deliver our services if you become a client</li>
          <li>to send you updates and offers, if you’ve agreed to receive them</li>
          <li>to keep our website secure and meet our legal obligations</li>
        </ul>
        <p>
          We only use your information with your consent, to take steps towards working together, for our reasonable
          business needs, or where the law requires it. You can unsubscribe from marketing at any time.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    icon: "share",
    body: (
      <>
        <p>
          Only with trusted service providers that help us run our business, such as our email and website hosting
          providers, and with authorities if the law requires it. We never sell your information.
        </p>
        <p>
          As we work globally, these providers may store information in other countries. When they do, we make sure it
          stays protected.
        </p>
      </>
    ),
  },
  {
    id: "keeping-it-safe",
    title: "Keeping it safe",
    icon: "keep",
    body: (
      <>
        <p>
          We limit who can access your information and use secure, reputable providers. We keep it only as long as we
          need it:
        </p>
        <ul>
          <li>enquiries that don’t become projects are usually deleted within 24 months</li>
          <li>client records are kept only as long as the law requires, for example for tax</li>
          <li>marketing details are kept until you unsubscribe</li>
        </ul>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    icon: "rights",
    body: (
      <>
        <p>
          Wherever you are, you can ask us to see, correct or delete your information, or to stop using it for marketing.
          Just email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we’ll reply within 30 days.
        </p>
        <p>
          If you’re unhappy with how we’ve handled your information, please tell us first. You can also contact the data
          protection authority where you live.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact and updates",
    icon: "contact",
    body: (
      <p>
        For any question about your information, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. If we update this policy,
        we’ll change the date at the top of this page.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <LegalPage
        title="Privacy Policy"
        updated={UPDATED}
        email={EMAIL}
        heroIcon="shield"
        heroChips={["Never sold", "Only what’s needed", "You’re in control"]}
        highlights={highlights}
        intro={
          <p>
            We collect only what we need to reply to you and work with you. Here’s exactly what that means, in plain
            words.
          </p>
        }
        sections={sections}
      />
      <Footer />
    </>
  );
}