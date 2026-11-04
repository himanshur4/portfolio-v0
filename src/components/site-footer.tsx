import { cacheLife } from "next/cache";

import { profile } from "@/data/portfolio";
import { getCover } from "@/lib/content";

import { ArrowUp } from "./icons";

/** Rendered once and cached for a day, so the year rolls over without a redeploy. */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="page">
      <div className="reveal flex flex-col gap-5 border-t border-rule py-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="meta space-y-1">
          <p>
            © <CurrentYear /> {profile.name}
          </p>
          
        </div>
        <a href="#top" className="meta link link-quiet inline-flex items-center gap-[0.35em] self-start">
          Back to top
          <ArrowUp />
        </a>
      </div>
    </footer>
  );
}
