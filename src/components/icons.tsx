import type { ReactNode, SVGProps } from "react";

import { cn } from "@/lib/cn";

/* Small line icons drawn on a 16px grid. All are decorative: the text next to
   them carries the meaning, so they're hidden from assistive technology. */

type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;

function Icon({ className, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowUpRight({ className, ...props }: IconProps) {
  return (
    <Icon className={cn("arrow arrow-ne size-[0.8em]", className)} {...props}>
      <path d="M5 11 11 5M6 5h5v5" />
    </Icon>
  );
}

export function ArrowDown({ className, ...props }: IconProps) {
  return (
    <Icon className={cn("arrow arrow-down size-[0.8em]", className)} {...props}>
      <path d="M8 3v10M4 9l4 4 4-4" />
    </Icon>
  );
}

export function ArrowUp({ className, ...props }: IconProps) {
  return (
    <Icon className={cn("arrow arrow-up size-[0.8em]", className)} {...props}>
      <path d="M8 13V3M4 7l4-4 4 4" />
    </Icon>
  );
}

export function CopyIcon({ className, ...props }: IconProps) {
  return (
    <Icon className={cn("size-[1em]", className)} {...props}>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" />
    </Icon>
  );
}

export function CheckIcon({ className, ...props }: IconProps) {
  return (
    <Icon className={cn("size-[1em]", className)} {...props}>
      <path d="m3 8.5 3 3 7-7" />
    </Icon>
  );
}

/** Half-filled circle; rotates half a turn in dark mode. */
export function ContrastIcon({ className, ...props }: IconProps) {
  return (
    <Icon className={cn("size-[1.15rem]", className)} {...props}>
      <circle cx="8" cy="8" r="5.75" />
      <path d="M8 2.25a5.75 5.75 0 0 1 0 11.5Z" fill="currentColor" stroke="none" />
    </Icon>
  );
}
