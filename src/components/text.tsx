import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/cn";

import { ArrowUpRight } from "./icons";

/**
 * A run of short items separated by middle dots. Lines wrap only between items,
 * and a separator stays with the item before it, so no line starts with a dot.
 * Screen readers hear commas instead of "dot".
 */
export function DotList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <p className={className}>
      {items.map((item, i) => (
        <Fragment key={item}>
          <span className="whitespace-nowrap">
            {item}
            {i < items.length - 1 && (
              <>
                <span className="sr-only">,</span>
                <span aria-hidden="true" className="pl-[0.55em] text-faint">
                  ·
                </span>
              </>
            )}
          </span>
          {i < items.length - 1 && " "}
        </Fragment>
      ))}
    </p>
  );
}

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Extra words for screen readers, appended after the visible label. */
  srContext?: string;
}

/** A link that leaves the site: opens in a new tab and says so. */
export function ExternalLink({ href, children, className, srContext }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("link inline-flex items-center gap-[0.3em]", className)}
    >
      <span>
        {children}
        {srContext && <span className="sr-only"> {srContext}</span>}
        <span className="sr-only"> (opens in a new tab)</span>
      </span>
      <ArrowUpRight />
    </a>
  );
}
