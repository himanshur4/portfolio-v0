"use client";

import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  radius: number;
  /** Fall speed in pixels per second. */
  speed: number;
  swayPhase: number;
  alpha: number;
}

// Light dots in dark mode, dark dots in light mode.
const COLOUR_ON_DARK = "255 255 255";
const COLOUR_ON_LIGHT = "22 27 34";
const MAX_FLAKES = 30;
const MIN_FLAKES = 9;
const PIXELS_PER_FLAKE = 45000;
const SWAY_PX = 10;
const SWAY_RATE = 0.35;

function makeFlake(width: number, height: number): Flake {
  const depth = Math.random(); // nearer dots are larger, faster and more visible
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.6 + depth * 0.8,
    speed: 6 + depth * 10,
    swayPhase: Math.random() * Math.PI * 2,
    alpha: 0.2 + depth * 0.3,
  };
}

/** A few small, slow dots over the whole page. Off when the visitor prefers reduced motion. */
export function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let flakes: Flake[] = [];
    let frame = 0;
    let lastTime = 0;
    let width = 0;
    let height = 0;
    let colour = COLOUR_ON_LIGHT;

    const readColour = () => {
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      colour = dark ? COLOUR_ON_DARK : COLOUR_ON_LIGHT;
    };

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.round(
        Math.min(MAX_FLAKES, Math.max(MIN_FLAKES, (width * height) / PIXELS_PER_FLAKE)),
      );
      flakes = flakes.slice(0, count);
      while (flakes.length < count) flakes.push(makeFlake(width, height));
    };

    const draw = (time: number) => {
      // A background tab pauses animation frames; don't jump when it resumes.
      const seconds = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      context.clearRect(0, 0, width, height);

      for (const flake of flakes) {
        flake.y += flake.speed * seconds;
        if (flake.y - flake.radius > height) {
          flake.y = -flake.radius;
          flake.x = Math.random() * width;
        }
        const x = flake.x + Math.sin(time * 0.001 * SWAY_RATE + flake.swayPhase) * SWAY_PX;
        context.beginPath();
        context.arc(x, flake.y, flake.radius, 0, Math.PI * 2);
        context.fillStyle = `rgb(${colour} / ${flake.alpha})`;
        context.fill();
      }
      frame = requestAnimationFrame(draw);
    };

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      cancelAnimationFrame(frame);
      context.clearRect(0, 0, width, height);
      if (!motion.matches) {
        lastTime = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };

    const themeObserver = new MutationObserver(readColour);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    motion.addEventListener("change", syncMotion);

    readColour();
    resize();
    syncMotion();

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      sizeObserver.disconnect();
      motion.removeEventListener("change", syncMotion);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="snow pointer-events-none fixed inset-0 z-30 size-full print:hidden"
    />
  );
}
