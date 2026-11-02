import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalPage, { type Highlight, type LegalSection } from "@/components/legal/LegalPage";
import { SITE_EMAIL as EMAIL, LEGAL_UPDATED as UPDATED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "How we make the SKAD CommerceOS website easy for everyone to use.",
  alternates: { canonical: "/accessibility" },
};

const highlights: Highlight[] = [
  { icon: "access", title: "Keyboard friendly", text: "Move around the site without a mouse." },
  { icon: "control", title: "Calmer motion", text: "Animations ease off if your device asks for less motion." },
  { icon: "file", title: "Readable everywhere", text: "Clear text that adapts to phones, tablets and desktops." },
  { icon: "contact", title: "Tell us what’s hard", text: "Your feedback shapes what we fix next." },
];

const sections: LegalSection[] = [
  {
    id: "our-aim",
    title: "Our aim",
    icon: "access",
    body: (
      <p>
        We want everyone to be able to use our website easily, whatever device, setting or ability. We follow the widely
        used Web Content Accessibility Guidelines (WCAG 2.1, level AA) as our guide, and keep improving as we go.
      </p>
    ),
  },
  {
    id: "built-in",
    title: "What’s built in",
    icon: "use",
    body: (
      <ul>
        <li>you can move through links, buttons and forms using a keyboard, with a visible focus outline</li>
        <li>if your device is set to reduce motion, our animations calm down or stop</li>
        <li>text is sized and coloured to be easy to read</li>
        <li>images and icons have text descriptions where they carry meaning</li>
        <li>the layout adapts to phones, tablets and desktops, and works when you zoom in</li>
        <li>forms explain clearly what’s missing if something needs fixing</li>
      </ul>
    ),
  },
  {
    id: "still-improving",
    title: "Still improving",
    icon: "file",
    body: (
      <>
        <p>We know a few parts can still be better, and we’re working on them:</p>
        <ul>
          <li>some interactive visuals, like the sketch-to-website slider, work best with a mouse or touch</li>
          <li>screenshots of client websites can’t describe every detail inside them</li>
          <li>a few handwritten-style notes are decorative and may be harder to read for some people</li>
        </ul>
        <p>Everything important is also written out in plain text nearby.</p>
      </>
    ),
  },
  {
    id: "tell-us",
    title: "Tell us what’s hard",
    icon: "contact",
    body: (
      <p>
        If anything on our website is difficult to use, or you need information in a different format, email us at{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Tell us the page and what happened, and we’ll get back to you as soon as
        we can.
      </p>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <LegalPage
        title="Accessibility"
        updated={UPDATED}
        email={EMAIL}
        heroIcon="access"
        heroChips={["Keyboard friendly", "Reduced motion", "Phone ready"]}
        highlights={highlights}
        intro={
          <p>
            We want our website to work well for everyone. Here’s what we’ve done, and how to tell us if something gets in
            your way.
          </p>
        }
        sections={sections}
      />
      <Footer />
    </>
  );
}