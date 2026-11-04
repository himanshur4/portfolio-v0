import { practice } from "@/data/portfolio";
import { availableHref } from "@/lib/content";
import { getMaxRating } from "@/lib/cp-ratings";

import { Section } from "./section";
import { ExternalLink } from "./text";

export async function ProblemSolvingSection() {
  const profiles = practice.profiles.filter((profile) => availableHref(profile.href));
  const maxRatings = await Promise.all(profiles.map((profile) => getMaxRating(profile)));

  return (
    <Section id="problem-solving" title="Problem solving">
      <p className="reveal max-w-xl text-ink-2">{practice.summary}</p>

      <dl className="mt-5 border-t border-rule">
        {profiles.map((profile, index) => (
          <div
            key={profile.platform}
            className="reveal grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 border-b border-rule py-3.5 sm:grid-cols-[8rem_minmax(0,1fr)_auto]"
          >
            <dt className="kicker">{profile.platform}</dt>
            <dd className="text-sm/6 text-ink max-sm:col-span-2 max-sm:row-start-2">
              Max rating {maxRatings[index]}
            </dd>
            <dd className="text-[0.8125rem]">
              <ExternalLink href={profile.href} srContext={`on ${profile.platform}`}>
                {profile.handle}
              </ExternalLink>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
