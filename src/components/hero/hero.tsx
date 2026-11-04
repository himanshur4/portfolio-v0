import { profile } from "@/data/portfolio";
import { getAvatarSrc, getContactLinks } from "@/lib/content";

import { ArrowDown, ArrowUpRight } from "../icons";
import { ExternalLink } from "../text";
import { Avatar } from "./avatar";
import { Cover } from "./cover";
import { WorkIndex } from "./work-index";

/** Profile header: cover, avatar and the first things a recruiter needs. */
export function Hero() {
  const { email, github, linkedin, resume } = getContactLinks();

  return (
    <section aria-labelledby="hero-name" className="page pt-4 pb-10 sm:pt-6 sm:pb-14">
      <Cover />

      <div className="flex items-start justify-between gap-3 px-3 sm:px-6">
        <Avatar src={getAvatarSrc()} />
        <div className="rise flex flex-wrap justify-end gap-2 pt-3 sm:pt-4">
          {resume && (
            <a href={resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Resume
              <span className="sr-only"> (PDF, opens in a new tab)</span>
              <ArrowUpRight />
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className={`btn ${resume ? "btn-secondary" : "btn-primary"}`}>
              Email me
            </a>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-x-16 px-1 sm:mt-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="rise">
          <h1
            id="hero-name"
            className="text-[clamp(2.25rem,1.75rem+2.4vw,3.5rem)] leading-none tracking-[-0.035em]"
          >
            {profile.name}
          </h1>
          <p className="meta mt-2.5">
            {profile.role}
            <span aria-hidden="true" className="px-2 text-faint">
              ·
            </span>
            <span className="sr-only">, </span>
            {profile.location}
          </p>
          <p className="mt-5 max-w-[34ch] text-[clamp(1.125rem,1.02rem+0.45vw,1.375rem)] leading-[1.28] tracking-[-0.015em] text-balance text-ink">
            {profile.headline}
          </p>
          <p className="mt-3 max-w-152 text-ink-2">{profile.intro}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            {profile.availability && (
              <p className="meta flex items-center gap-2.5 text-ink-2">
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-clay" />
                {profile.availability}
              </p>
            )}
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem]">
              {/* On wide screens the project index beside this column replaces this link. */}
              <li className="lg:hidden">
                <a href="#projects" className="link inline-flex items-center gap-[0.3em]">
                  Projects
                  <ArrowDown />
                </a>
              </li>
              {github && (
                <li>
                  <ExternalLink href={github}>GitHub</ExternalLink>
                </li>
              )}
              {linkedin && (
                <li>
                  <ExternalLink href={linkedin}>LinkedIn</ExternalLink>
                </li>
              )}
            </ul>
          </div>
        </div>

        <WorkIndex />
      </div>
    </section>
  );
}
