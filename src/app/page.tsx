import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { Hero } from "@/components/hero/hero";
import { ProblemSolvingSection } from "@/components/problem-solving-section";
import { SkillsSection } from "@/components/skills-section";
import { WorkSection } from "@/components/work/work-section";
import { profile, site } from "@/data/portfolio";
import { getContactLinks, getSiteUrl } from "@/lib/content";

// The whole page must come out of the build as static HTML; the build fails otherwise.
export const ensureStatic = "navigation";

/** Person structured data, built only from public, verifiable values. */
function personJsonLd() {
  const { email, github, linkedin } = getContactLinks();
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    description: site.description,
    ...(url && { url }),
    ...(email && { email: `mailto:${email}` }),
    sameAs: [github, linkedin].filter(Boolean),
  };
}

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <Hero />
      <ExperienceSection />
      <WorkSection />
      <SkillsSection />
      <ProblemSolvingSection />
      <ContactSection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
