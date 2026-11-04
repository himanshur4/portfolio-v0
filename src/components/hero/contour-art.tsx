import { CONTOUR_PATHS, CONTOUR_SUMMIT, CONTOUR_VIEWBOX } from "./contours";

/**
 * The default cover: an original contour drawing (see ./contours.ts). Colours
 * come from CSS tokens, so it redraws itself for each theme. Every fifth line is
 * an "index contour", drawn a little heavier as on survey maps.
 */
export function ContourArt() {
  return (
    <svg
      className="cover-art"
      viewBox={CONTOUR_VIEWBOX}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {CONTOUR_PATHS.map((path, i) => (
          <path
            key={i}
            d={path.d}
            className={path.index ? "contour-index" : undefined}
            strokeWidth={path.index ? 1.35 : 0.85}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      {/* Summit mark, in the one warm colour the site allows itself. */}
      <path
        d={`M${CONTOUR_SUMMIT.x} ${CONTOUR_SUMMIT.y - 9}l8 14h-16z`}
        fill="var(--clay)"
        opacity={0.85}
      />
    </svg>
  );
}
