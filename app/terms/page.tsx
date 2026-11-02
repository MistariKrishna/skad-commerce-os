import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalPage, { type Highlight, type LegalSection } from "@/components/legal/LegalPage";
import { SITE_EMAIL as EMAIL, LEGAL_UPDATED as UPDATED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Simple guidelines for using the SKAD CommerceOS website.",
  alternates: { canonical: "/terms" },
};

const highlights: Highlight[] = [
  { icon: "file", title: "Use it freely", text: "Browse, read and send us an enquiry any time." },
  { icon: "never", title: "Please don’t misuse it", text: "No copying, hacking or spam, thanks." },
  { icon: "scale", title: "General information", text: "Our content is guidance, not advice for your business." },
  { icon: "contact", title: "Projects agreed together", text: "Every project’s details are agreed in writing." },
];

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    icon: "company",
    body: (
      <p>
        This website is run by <strong>SkadCommerceOS</strong>. These are simple guidelines for using it. If you work
        with us on a project, we’ll agree the details of that work together separately.
      </p>
    ),
  },
  {
    id: "using-the-site",
    title: "Using our website",
    icon: "use",
    body: (
      <>
        <p>You’re welcome to browse, read and contact us through this site. We just ask that you don’t:</p>
        <ul>
          <li>copy or republish our content or design without asking</li>
          <li>try to hack, overload or break the site</li>
          <li>send spam or false information through our forms</li>
        </ul>
      </>
    ),
  },
  {
    id: "enquiries",
    title: "Enquiries and quotes",
    icon: "collect",
    body: (
      <p>
        Sending an enquiry doesn’t commit you to anything. Any quote we share is a starting point for a conversation.
        Once we agree on the details, we’ll put them in writing together. How we look after the details you send us is
        explained in our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: "content",
    title: "Our content and other brands",
    icon: "shield",
    body: (
      <>
        <p>
          The text, design and graphics on this site are ours. You’re welcome to share links to our pages, but please ask
          before reusing our content.
        </p>
        <p>
          The names, logos and screenshots of brands shown here, such as Detara, Benavi and Case Suno, belong to their
          owners.
        </p>
      </>
    ),
  },
  {
    id: "information",
    title: "Information on this site",
    icon: "file",
    body: (
      <p>
        We keep everything here as accurate and up to date as we can, but it’s general information, not advice for your
        specific business. Our services and examples may change over time. Some links lead to other websites, which have
        their own terms.
      </p>
    ),
  },
  {
    id: "updates",
    title: "Updates and questions",
    icon: "contact",
    body: (
      <p>
        We may update these terms from time to time, and we’ll change the date at the top of this page when we do. Any
        questions? Email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <LegalPage
        title="Terms of Use"
        updated={UPDATED}
        email={EMAIL}
        heroIcon="scale"
        heroChips={["Plain words", "Website use only", "No surprises"]}
        highlights={highlights}
        intro={<p>A few simple guidelines for using our website, in plain words.</p>}
        sections={sections}
      />
      <Footer />
    </>
  );
}