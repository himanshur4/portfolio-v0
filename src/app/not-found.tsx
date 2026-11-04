import type { Metadata } from "next";
import Link from "next/link";

import { Cover } from "@/components/hero/cover";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="page pt-6 pb-20 focus:outline-none">
      <Cover />
      <div className="rise px-1 pt-10 sm:px-6">
        <p className="kicker">404</p>
        <h1 className="mt-2 text-[clamp(1.75rem,1.5rem+1.2vw,2.25rem)] leading-tight">
          This page isn’t here.
        </h1>
        <p className="mt-3 max-w-136 text-ink-2">
          The link may be old or mistyped. Everything on this site lives on one page.
        </p>
        <p className="mt-6">
          <Link href="/" className="btn btn-primary">
            Back to the home page
          </Link>
        </p>
      </div>
    </main>
  );
}
