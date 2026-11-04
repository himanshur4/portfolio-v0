import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/**
 * Page section: the heading sits in a left margin column on wide screens (and
 * stays in view while the section scrolls), above the content on small ones.
 */
export function Section({ id, title, intro, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="page">
      <div className="section section-grid">
        <header className="section-head reveal">
          <h2
            id={headingId}
            className="text-[clamp(1.375rem,1.3rem+0.3vw,1.5rem)] leading-tight"
          >
            {title}
          </h2>
          {intro && <p className="mt-2 max-w-120 text-sm/6 text-muted">{intro}</p>}
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
