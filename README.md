# Himanshu Raj — portfolio

A one-page portfolio: selected projects, experience, skills and contact details.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm run build        # production build; `npm start` serves it
```

## Editing content

Everything personal lives in [`src/data/portfolio.ts`](src/data/portfolio.ts), typed by
[`src/data/types.ts`](src/data/types.ts). Components only render it.

- A value that's empty or starts with `YOUR_` counts as "not configured" and is hidden, so placeholders never
  show up as broken links.
- Files in `public/` are linked only once they exist, so the site never links to a missing file:
  - **Resume**: add `public/Himanshu_Raj_Resume.pdf`. The Resume buttons in the header, hero, mobile menu
    and contact section appear on the next build. Until then, the contact section says "Available on request".
  - **Photo**: add `public/avatar.jpg` (square works best; it's cropped to a rounded square). Until then the
    avatar shows initials.
  - **Cover**: add `public/cover.jpg` to use your own photo in the banner. A wide landscape image works best
    (about 2000px across), since the banner crops the top and bottom. For a `.png` or `.webp`, change the path in
    `profile.cover`. Until the file exists, the generated contour drawing is shown.
- **Domain**: set `site.url` (or the `NEXT_PUBLIC_SITE_URL` environment variable). That turns on the canonical
  URL, the sitemap entry and the social preview image. On Vercel, the production URL is used if neither is set.
- **Demo links**: only add a `demo` URL after checking that it loads.

The social preview image is a static file, `public/og.png`. If the name or headline changes, replace it.

## Structure

```
src/app/          layout (fonts, metadata, theme script), page, 404, robots, sitemap, icons
src/components/   page sections; theme-toggle, mobile-nav, copy-email-button, snowfall and reveal-observer are the only client components
src/data/         content and its types
src/lib/          helpers: placeholder and file checks, site URL, theme constants
public/og.png     social preview image
```

## Notes

- **Theme**: follows the system setting until a visitor picks light or dark; the choice is saved in
  `localStorage` and applied by an inline script before the first paint, so there's no flash.
- **Motion**: a slow load-in and fade-ups while scrolling (`src/app/globals.css`,
  `reveal-observer.tsx`), all switched off under `prefers-reduced-motion`. Content never waits for an animation:
  if JavaScript fails, everything still appears within a few seconds.
- **Rendering**: the page is fully prerendered; `ensureStatic = "navigation"` in `src/app/page.tsx` fails the
  build if anything turns dynamic. The footer year is cached for a day.
- **Default cover**: `src/components/hero/contours.ts` was generated from seeded noise and marching squares.
  It's decorative and isn't a real map.
