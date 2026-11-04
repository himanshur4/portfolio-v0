import { featuredProjects, otherProjects } from "@/data/portfolio";
import { availableHref } from "@/lib/content";

import { Section } from "../section";
import { DotList, ExternalLink } from "../text";
import { ProjectEntry } from "./project-entry";

/** How many projects show before "Show more". */
const VISIBLE_PROJECTS = 2;

export function WorkSection() {
  const hiddenProjects = featuredProjects.slice(VISIBLE_PROJECTS);

  return (
    <Section id="work" title="Selected work">
      <div className="grid gap-8">
        {featuredProjects.slice(0, VISIBLE_PROJECTS).map((project, index) => (
          <div key={project.slug} className={index > 0 ? "border-t border-rule pt-8" : undefined}>
            <ProjectEntry project={project} index={index} />
          </div>
        ))}
      </div>

      {(hiddenProjects.length > 0 || otherProjects.length > 0) && (
        <details className="reveal group mt-8">
          <summary className="btn btn-secondary w-fit cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Show more projects</span>
            <span className="hidden group-open:inline">Show less</span>
          </summary>

          <div className="mt-8 grid gap-8">
            {hiddenProjects.map((project, index) => (
              <div key={project.slug} className="border-t border-rule pt-8">
                <ProjectEntry project={project} index={index + VISIBLE_PROJECTS} />
              </div>
            ))}
          </div>

          {otherProjects.length > 0 && (
            <div className="mt-12">
              <h3 className="kicker reveal">Also built</h3>
              <ul className="mt-3 grid border-t border-rule md:grid-cols-2">
                {otherProjects.map((project) => {
                  const demo = availableHref(project.demo);
                  const source = availableHref(project.source);
                  return (
                    <li
                      key={project.name}
                      className="reveal border-b border-rule py-5 md:px-6 md:odd:border-r md:odd:pl-0 md:even:pr-0"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h4 className="text-[1.0625rem] leading-tight">{project.name}</h4>
                        <span className="meta">{project.period}</span>
                      </div>
                      <p className="mt-1.5 text-sm/6 text-ink-2">{project.description}</p>
                      <DotList items={project.stack} className="mt-2 font-mono text-xs/5 text-muted" />
                      <ul className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-[0.8125rem]">
                        {demo && (
                          <li>
                            <ExternalLink href={demo} srContext={`of ${project.name}`}>
                              Live demo
                            </ExternalLink>
                          </li>
                        )}
                        {source && (
                          <li>
                            <ExternalLink href={source} srContext={`code for ${project.name} on GitHub`}>
                              Source
                            </ExternalLink>
                          </li>
                        )}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </details>
      )}
    </Section>
  );
}
