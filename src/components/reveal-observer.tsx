"use client";

import { useLayoutEffect } from "react";

/** On page load, wait for the hero to settle before revealing anything else in view. */
const FIRST_BATCH_DELAY_MS = 900;
const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;
/** Matches the failsafe delay in globals.css: by then, content is already showing. */
const LATE_START_MS = 3000;
const EASE_CALM = "cubic-bezier(0.16, 1, 0.3, 1)";

function reveal(element: Element, delay: number) {
  if (element.matches(".section")) {
    element.animate(
      { transform: ["scaleX(0)", "none"] },
      { duration: 2000, delay, easing: EASE_CALM, fill: "both", pseudoElement: "::before" },
    );
    return;
  }
  element.animate({ opacity: [0, 1] }, { duration: 1200, delay, easing: "ease-out", fill: "both" });
  element.animate(
    { transform: ["translateY(18px)", "none"] },
    { duration: 1400, delay, easing: EASE_CALM, fill: "backwards" },
  );
}

/**
 * Reveals `.reveal` blocks and draws `.section` rules, once each, as they come
 * into view. These run through the Web Animations API rather than classes or
 * inline styles, because this can fire before React has hydrated those elements
 * and changing their attributes would cause a hydration mismatch.
 */
export function RevealObserver() {
  useLayoutEffect(() => {
    const root = document.documentElement;

    // Scripts arrived late, or the visitor wants less motion: leave everything showing.
    if (
      performance.now() > LATE_START_MS ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      root.removeAttribute("data-motion");
      return;
    }
    // Also restores the attribute after React's development remount clears it.
    root.setAttribute("data-motion", "ready");

    const seen = new WeakSet<Element>();
    let firstBatch = true;
    const observer = new IntersectionObserver(
      (entries) => {
        const baseDelay = firstBatch ? FIRST_BATCH_DELAY_MS : 0;
        firstBatch = false;

        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            reveal(entry.target, baseDelay + Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS);
            observer.unobserve(entry.target);
          });
      },
      { rootMargin: "0px 0px -6% 0px" },
    );

    const observeNewElements = () => {
      document.querySelectorAll(".reveal, .section").forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        observer.observe(element);
      });
    };

    observeNewElements();
    // Client-side navigation (for example, from the 404 page) brings in new elements.
    const mutations = new MutationObserver(observeNewElements);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
