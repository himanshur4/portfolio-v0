import fs from "node:fs";
import path from "node:path";

import { links, profile, site } from "@/data/portfolio";

/*
 * Server-only helpers that turn the raw config into what the page can safely show.
 * They run while the page is prerendered, so a file added to /public appears on
 * the next build (or the next refresh in `next dev`).
 */

/** True for a real value; false for empty strings and "YOUR_…" placeholders. */
export function isConfigured(value: string | undefined | null): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed !== "" && !/^YOUR_/i.test(trimmed);
}

/** Whether a "/path" exists in /public. */
function publicFileExists(publicPath: string): boolean {
  const relative = decodeURIComponent(publicPath).replace(/^\/+/, "");
  return fs.existsSync(path.join(process.cwd(), "public", relative));
}

/**
 * Returns the href if it can be linked: absolute URLs as configured, local
 * paths only when the file is really there.
 */
export function availableHref(href: string | undefined): string | undefined {
  if (!isConfigured(href)) return undefined;
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("/")) return publicFileExists(href) ? href : undefined;
  return undefined;
}

export interface ContactLinks {
  email?: string;
  github?: string;
  linkedin?: string;
  resume?: string;
}

/** Contact routes that are configured and reachable. */
export function getContactLinks(): ContactLinks {
  return {
    email: isConfigured(links.email) ? links.email : undefined,
    github: availableHref(links.github),
    linkedin: availableHref(links.linkedin),
    resume: availableHref(links.resume),
  };
}

export function getAvatarSrc(): string | undefined {
  return availableHref(profile.avatar.src);
}

export function getCover(): { src: string; alt: string } | undefined {
  const src = availableHref(profile.cover?.src);
  return src && profile.cover ? { src, alt: profile.cover.alt } : undefined;
}

/**
 * The public origin of the site, or undefined when it isn't known yet.
 * Order: NEXT_PUBLIC_SITE_URL, then `site.url`, then Vercel's production URL.
 */
export function getSiteUrl(): string | undefined {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    site.url,
    process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
  ];
  for (const candidate of candidates) {
    if (isConfigured(candidate) && /^https?:\/\//i.test(candidate)) {
      return candidate.replace(/\/+$/, "");
    }
  }
  return undefined;
}

/** "https://github.com/himanshur4" -> "github.com/himanshur4" */
export function displayUrl(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/+$/, "");
}
