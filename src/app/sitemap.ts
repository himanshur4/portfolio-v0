import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/content";

/** One page, listed once the real domain is configured (see `site.url`). */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return siteUrl ? [{ url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 }] : [];
}
