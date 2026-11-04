"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { ArrowUpRight } from "./icons";

interface MobileNavProps {
  items: ReadonlyArray<{ id: string; label: string }>;
  resume?: string;
}

/** Disclosure menu for small screens. Hidden from `lg` up, where the inline nav shows. */
export function MobileNav({ items, resume }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 items-center gap-2 rounded-full px-3 font-mono text-xs tracking-[0.04em] text-ink transition-colors hover:bg-sunk"
      >
        <span>Menu</span>
        <span aria-hidden="true" className="relative block h-2.5 w-3.5">
          <span
            className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${
              open ? "top-1/2 rotate-45" : "top-0.5"
            }`}
          />
          <span
            className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${
              open ? "top-1/2 -rotate-45" : "bottom-0.5"
            }`}
          />
        </span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-rule bg-paper shadow-[0_18px_30px_-24px_rgb(var(--shadow)/0.45)]"
      >
        <nav aria-label="Primary" className="page py-3">
          <ul>
            {items.map((item) => (
              <li key={item.id} className="border-b border-rule last:border-b-0">
                <Link
                  href={`/#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center justify-between text-[1.0625rem] font-medium tracking-[-0.015em] text-ink transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {resume && (
              <li>
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center gap-2 text-[1.0625rem] font-medium tracking-[-0.015em] text-ink transition-colors hover:text-accent"
                >
                  Resume
                  <span className="sr-only"> (opens in a new tab)</span>
                  <ArrowUpRight className="text-[0.8125rem]" />
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
