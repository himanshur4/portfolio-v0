import { education, experience } from "@/data/portfolio";

import { Section } from "./section";

export function ExperienceSection() {
  if (experience.length === 0 && education.length === 0) return null;

  return (
    <Section id="experience" title="Experience">
      {experience.length > 0 && (
        <>
          <h3 className="kicker reveal">Work</h3>
          <ol className="mt-3 border-t border-rule">
            {experience.map((item) => (
              <li
                key={`${item.org}-${item.period}`}
                className="reveal grid gap-1.5 border-b border-rule py-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
              >
                <p className="meta pt-0.5">{item.period}</p>
                <div>
                  <h4 className="text-[1.0625rem] leading-snug">
                    {item.role}
                    <span className="text-muted"> · </span>
                    {item.org}
                  </h4>
                  <p className="meta mt-0.5">{item.location}</p>
                  <ul className="bullets mt-3 max-w-152 text-sm/6 text-ink-2">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      {education.length > 0 && (
        <>
          <h3 className="kicker reveal mt-10">Education</h3>
          <ol className="mt-3 border-t border-rule">
            {education.map((item) => (
              <li
                key={item.institution}
                className="reveal grid gap-1.5 border-b border-rule py-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
              >
                <p className="meta pt-0.5">{item.period}</p>
                <div>
                  <h4 className="text-[1.0625rem] leading-snug">{item.degree}</h4>
                  <p className="mt-0.5 text-sm/6 text-ink-2">{item.institution}</p>
                  {item.detail && <p className="meta mt-1">{item.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </>
      )}
    </Section>
  );
}
