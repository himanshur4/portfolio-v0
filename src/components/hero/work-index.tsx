import { featuredProjects } from "@/data/portfolio";

import { ArrowDown } from "../icons";

/**
 * A notebook-style contents list for wide screens: the featured projects,
 * reachable from the first screen.
 */
export function WorkIndex() {
  return (
    <nav aria-label="Selected work" className="hidden self-end lg:block">
      <p className="kicker rise-item">Selected work</p>
      <ol className="rise rise-item mt-3 border-t border-rule">
        {featuredProjects.map((project, index) => (
          <li key={project.slug} className="border-b border-rule">
            <a
              href={`#${project.slug}`}
              className="group flex items-baseline gap-3 py-2 transition-colors hover:text-accent"
            >
              <span className="meta w-5 shrink-0">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-[1.0625rem] leading-tight tracking-[-0.015em] underline decoration-transparent decoration-1 underline-offset-[0.22em] transition-[text-decoration-color] group-hover:decoration-current">
                {project.name}
              </span>
              <span className="meta ml-auto truncate text-right">{project.kind}</span>
              <ArrowDown className="self-center text-muted group-hover:text-accent" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
