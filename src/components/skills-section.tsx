import { skills } from "@/data/portfolio";

import { Section } from "./section";

export function SkillsSection() {
  return (
    <Section id="skills" title="Skills" intro="Grouped by what I use them for.">
      <dl className="border-t border-rule">
        {skills.map((group) => (
          <div
            key={group.label}
            className="reveal grid gap-1 border-b border-rule py-3.5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6"
          >
            <dt className="kicker pt-1">{group.label}</dt>
            <dd className="text-sm/6 text-ink">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
