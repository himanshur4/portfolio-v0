import Image from "next/image";

import { profile } from "@/data/portfolio";
import { getCover } from "@/lib/content";

import { ContourArt } from "./contour-art";

/**
 * The banner: your photo once the file exists, the contour drawing until then.
 * The photo is shown exactly as it is, with no animation, overlay or filter.
 */
export function Cover() {
  const cover = getCover();

  return (
    <div className="cover">
      {cover ? (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          preload
          // Always the full-size file at high quality: anything smaller visibly softens fine detail.
          sizes="3840px"
          quality={95}
          // The desktop banner is much wider than a photo: keep the bottom, crop the top.
          className="object-cover md:object-bottom"
        />
      ) : (
        <>
          <ContourArt />
          {profile.coverCaption && (
            <span
              aria-hidden="true"
              className="absolute right-3 bottom-2 font-mono text-[0.625rem] tracking-[0.08em] whitespace-pre text-muted sm:right-4 sm:bottom-3 sm:text-[0.6875rem]"
            >
              {profile.coverCaption}
            </span>
          )}
        </>
      )}
    </div>
  );
}
