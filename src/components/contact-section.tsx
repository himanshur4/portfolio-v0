import type { ReactNode } from "react";

import { links, profile } from "@/data/portfolio";
import { displayUrl, getContactLinks, isConfigured } from "@/lib/content";

import { CopyEmailButton } from "./copy-email-button";
import { Section } from "./section";
import { ExternalLink } from "./text";

export function ContactSection() {
  const { email, github, linkedin, resume } = getContactLinks();
  // The resume row stays visible either way; until the file exists it's plain text.
  const resumeConfigured = isConfigured(links.resume);

  return (
    <Section id="contact" title="Contact">
      <p className="reveal max-w-xl text-ink-2">
        {profile.availability
          ? "I’m looking for SDE / SWE and full-stack roles. Email is the quickest way to reach me."
          : "Email is the quickest way to reach me."}
      </p>

      {email && (
        <div className="reveal mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          <a
            href={`mailto:${email}`}
            className="link text-[clamp(1.125rem,1.04rem+0.4vw,1.375rem)] leading-tight font-medium tracking-[-0.015em] wrap-anywhere"
          >
            {email}
          </a>
          <CopyEmailButton email={email} />
        </div>
      )}

      <dl className="reveal mt-8 grid border-t border-rule sm:grid-cols-2 sm:gap-x-10">
        {github && (
          <ContactRow label="GitHub">
            <ExternalLink href={github}>{displayUrl(github)}</ExternalLink>
          </ContactRow>
        )}
        {linkedin && (
          <ContactRow label="LinkedIn">
            <ExternalLink href={linkedin}>{displayUrl(linkedin)}</ExternalLink>
          </ContactRow>
        )}
        {resumeConfigured && (
          <ContactRow label="Resume">
            {resume ? (
              <ExternalLink href={resume} srContext="(PDF)">
                View PDF
              </ExternalLink>
            ) : (
              <span className="text-muted">Available on request</span>
            )}
          </ContactRow>
        )}
        <ContactRow label="Based in">
          <span className="text-ink-2">{profile.location}</span>
        </ContactRow>
      </dl>
    </Section>
  );
}

function ContactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3 text-[0.8125rem]">
      <dt className="kicker">{label}</dt>
      <dd className="min-w-0 text-right">{children}</dd>
    </div>
  );
}
