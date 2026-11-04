import Link from "next/link";

import { profile, sections } from "@/data/portfolio";
import { getContactLinks } from "@/lib/content";

import { ArrowUpRight } from "./icons";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const { resume } = getContactLinks();

  return (
    <header data-site-header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="page flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link
          href="/#top"
          className="text-base leading-none font-medium tracking-[-0.015em] text-ink transition-colors hover:text-accent"
        >
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-[0.8125rem]">
            {sections.map((section) => (
              <li key={section.id}>
                <Link href={`/#${section.id}`} className="link link-quiet text-ink-2 hover:text-ink">
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          {resume && (
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary hidden min-h-8 px-3 sm:inline-flex"
            >
              Resume
              <span className="sr-only"> (opens in a new tab)</span>
              <ArrowUpRight />
            </a>
          )}
          <ThemeToggle />
          <MobileNav items={sections} resume={resume} />
        </div>
      </div>
    </header>
  );
}
