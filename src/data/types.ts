/** Shapes for everything in `portfolio.ts`. */

/**
 * A link target: an absolute https URL, or a path to a file in /public
 * (for example "/Himanshu_Raj_Resume.pdf"). Values that are empty or start with
 * "YOUR_" count as "not configured" and are hidden on the site.
 */
export type Href = string;

export interface Site {
  /** Production origin, e.g. "https://himanshur4.vercel.app". Enables canonical URL and sitemap. */
  url: Href;
  /** Search and social-preview description (aim for under ~160 characters). */
  description: string;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  /** Short line under the name. */
  role: string;
  location: string;
  /** The opening statement in the hero. */
  headline: string;
  /** One or two sentences under the headline. */
  intro: string;
  /** Small status label in the hero. Remove it to hide the label. */
  availability?: string;
  /** Profile photo in /public. Until the file exists, initials are shown instead. */
  avatar: { src: Href; alt: string };
  /** Cover photo in /public. Until the file exists, the generated contour drawing is shown instead. */
  cover?: { src: Href; alt: string };
  /** Tiny caption printed on the contour drawing. */
  coverCaption?: string;
}

export interface Links {
  email: string;
  github: Href;
  linkedin: Href;
  /** A PDF in /public or an absolute URL. */
  resume: Href;
}

export interface FeaturedProject {
  slug: string;
  name: string;
  period: string;
  kind: string;
  /** Three or four lines: what it is and what's interesting about it. */
  description: string;
  stack: string[];
  source: Href;
  /** Only set this for a demo URL that is known to work. */
  demo?: Href;
}

export interface OtherProject {
  name: string;
  period: string;
  description: string;
  stack: string[];
  source: Href;
  demo?: Href;
}

export interface ExperienceItem {
  role: string;
  org: string;
  location: string;
  period: string;
  points: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  detail?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export type Platform = "LeetCode" | "Codeforces" | "AtCoder" | "CodeChef";

export interface PracticeProfile {
  platform: Platform;
  handle: string;
  href: Href;
  /** The site never shows a lower maximum than this. */
  maxRating: number;
}

export interface Practice {
  summary: string;
  profiles: PracticeProfile[];
}
