"use client";

import { useEffect, useRef, useState } from "react";

import { CheckIcon, CopyIcon } from "./icons";

type Status = "idle" | "copied" | "failed";

const ANNOUNCEMENTS: Record<Status, string> = {
  idle: "",
  copied: "Email address copied to the clipboard.",
  failed: "Couldn’t copy. Select the address to copy it instead.",
};

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  async function copy() {
    let next: Status = "failed";
    try {
      await navigator.clipboard.writeText(email);
      next = "copied";
    } catch {
      // Clipboard API missing or blocked; the status message explains the fallback.
    }
    setStatus(next);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setStatus("idle"), 2400);
  }

  return (
    <>
      <button type="button" onClick={copy} className="btn btn-secondary min-h-8 gap-1.5 px-3 text-xs">
        {status === "copied" ? <CheckIcon className="text-accent" /> : <CopyIcon />}
        {status === "copied" ? "Copied" : status === "failed" ? "Couldn’t copy" : "Copy address"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {ANNOUNCEMENTS[status]}
      </span>
    </>
  );
}
