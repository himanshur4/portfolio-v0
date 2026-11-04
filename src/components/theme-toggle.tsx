"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";

import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

import { ContrastIcon } from "./icons";

const DARK_QUERY = "(prefers-color-scheme: dark)";

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function subscribe(onChange: () => void) {
  // The attribute on <html> is the source of truth; anything that changes it re-renders us.
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // Until the visitor picks a theme, keep following the system setting.
  const media = window.matchMedia(DARK_QUERY);
  const onSystemChange = () => {
    if (!readStored()) applyTheme(systemTheme());
  };
  media.addEventListener("change", onSystemChange);

  // Keep other open tabs in step.
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) applyTheme(readStored() ?? systemTheme());
  };
  window.addEventListener("storage", onStorage);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

// The server can't know the theme; `null` renders a neutral button until hydration.
const getServerSnapshot = (): Theme | null => null;

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // React's development remount resets <html> attributes; put the theme back before paint.
  useLayoutEffect(() => {
    applyTheme(readStored() ?? systemTheme());
  }, []);

  function toggle() {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the switch still works for this visit.
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && typeof document.startViewTransition === "function") {
      document.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === null ? undefined : theme === "dark"}
      aria-label="Dark theme"
      title="Toggle dark theme"
      className="icon-btn"
    >
      <ContrastIcon className="transition-transform duration-700 ease-out dark:rotate-180" />
    </button>
  );
}
