import HomePage from "@/components/HomePage";
import { SITE_DESCRIPTION, SITE_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["SKAD Commerce OS", "CommerceOS", "SKAD Commerce"],
      url: SITE_URL,
      logo: `/images/logo/favicon.ico`,
      email: SITE_EMAIL,
      description: SITE_DESCRIPTION,
      // sameAs: ["https://www.linkedin.com/company/…", "https://www.instagram.com/…"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePage />
    </>
  );
}