import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";

import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Snowfall } from "@/components/snowfall";
import { links, profile, site } from "@/data/portfolio";
import { displayUrl, getSiteUrl } from "@/lib/content";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

import "./globals.css";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = getSiteUrl();
const title = `${profile.name} - Portfolio`;
const description = site.description;
const githubHandle = displayUrl(links.github).split("/").pop();
// Social images need an absolute URL, so they're only advertised once the domain is known.
const socialImages = siteUrl
  ? [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name}, ${profile.role.toLowerCase()}` }]
  : undefined;

export const metadata: Metadata = {
  // Absolute URLs (canonical, social previews) only once the real domain is known.
  ...(siteUrl && {
    metadataBase: new URL(siteUrl),
    alternates: { canonical: "/" },
  }),
  title,
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: links.github }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    title,
    description,
    siteName: profile.name,
    firstName: profile.firstName,
    lastName: profile.lastName,
    username: githubHandle,
    images: socialImages,
    ...(siteUrl && { url: "/" }),
  },
  twitter: {
    card: socialImages ? "summary_large_image" : "summary",
    title,
    description,
    images: socialImages,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf0f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f11" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The inline script sets data-theme before React hydrates, hence suppressHydrationWarning.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body id="top" className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-20 rounded-full bg-ink px-4 py-2 text-[0.9375rem] text-paper transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <Snowfall />
        <RevealObserver />
      </body>
    </html>
  );
}
