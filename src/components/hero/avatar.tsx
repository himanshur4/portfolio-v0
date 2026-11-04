import Image from "next/image";

import { profile } from "@/data/portfolio";

/** Rounded-square profile photo, or initials until a photo is added to /public. */
export function Avatar({ src }: { src?: string }) {
  const initials = `${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`;

  return (
    <div className="avatar">
      {src ? (
        <Image
          src={src}
          alt={profile.avatar.alt}
          fill
          sizes="(min-width: 640px) 132px, 96px"
          loading="eager"
          className="object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="grid size-full place-items-center bg-accent-soft text-[clamp(1.5rem,1.2rem+1.3vw,2.125rem)] font-medium tracking-[-0.02em] text-accent"
        >
          {initials}
        </span>
      )}
    </div>
  );
}
