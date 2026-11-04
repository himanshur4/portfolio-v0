import type { FeaturedProject } from "@/data/types";
import { availableHref } from "@/lib/content";

import { DotList, ExternalLink } from "../text";

export function ProjectEntry({ project, index }: { project: FeaturedProject; index: number }) {
  const headingId = `project-${project.slug}`;
  const demo = availableHref(project.demo);
  const source = availableHref(project.source);

  return (
    <article id={project.slug} aria-labelledby={headingId}>
      <div className="reveal">
        <p className="meta">
          <span className="text-ink">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden="true" className="px-2 text-faint">
            ·
          </span>
          <span className="sr-only">, </span>
          {project.period}
          <span aria-hidden="true" className="px-2 text-faint">
            ·
          </span>
          <span className="sr-only">, </span>
          {project.kind}
        </p>
        <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
          <h3 id={headingId} className="text-[1.375rem] leading-tight">
            {project.name}
          </h3>
          {(demo || source) && (
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[0.8125rem]">
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
          )}
        </div>
        <p className="mt-2.5 max-w-152 text-ink-2">{project.description}</p>
        <DotList items={project.stack} className="mt-3 font-mono text-xs/5 text-muted" />
      </div>
    </article>
  );
}
