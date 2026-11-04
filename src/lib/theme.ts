export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before the first paint: applies the saved choice, or the
 * system preference when nothing has been saved yet, so the page never flashes
 * the wrong theme. Only a manual choice is ever written to storage.
 *
 * It also sets data-motion: the signal that JavaScript is running, so the CSS may
 * hide content that RevealObserver will reveal.
 */
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement,s=null;try{s=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}var t=s==="light"||s==="dark"?s:window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.setAttribute("data-theme",t);d.setAttribute("data-motion","pending")})();`;
