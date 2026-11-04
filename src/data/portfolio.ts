import type {
  EducationItem,
  ExperienceItem,
  FeaturedProject,
  Links,
  Practice,
  OtherProject,
  Profile,
  Site,
  SkillGroup,
} from "./types";

/*
 * Everything personal on the site lives in this file; components only render it.
 *
 * - A value that is empty or starts with "YOUR_" is treated as not configured
 *   and hidden, so placeholders never show up as broken links.
 * - Files referenced from /public (resume, avatar, cover) are linked only once
 *   the file actually exists there. Drop the file in and rebuild.
 */

export const site: Site = {
  // TODO: set the real domain once deployed (e.g. "https://himanshur4.vercel.app").
  // It turns on the canonical URL, sitemap entry and absolute social-preview URLs.
  // NEXT_PUBLIC_SITE_URL overrides it; on Vercel the production URL is used as a fallback.
  url: "YOUR_SITE_URL",
  description:
    "I build full-stack products and like understanding the systems behind them. Final-year CSE student at IIIT Ranchi, open to SDE / SWE roles.",
};

export const profile: Profile = {
  name: "Himanshu Raj",
  firstName: "Himanshu",
  lastName: "Raj",
  role: "Software Engineer",
  location: "Ranchi, India",
  headline:
    "I build full-stack products and like understanding the systems behind them.",
  intro:
    "Final-year B.Tech CSE student at IIIT Ranchi, previously a full-stack intern at CreditSea. Lately I’ve been building real-time apps and the services behind them.",
  availability: "Open to SDE / SWE roles",
  // Add a square-ish photo at public/avatar.jpg (or change the path). Initials show until then.
  avatar: { src: "/avatar1.png", alt: "Portrait of Himanshu Raj" },
  // Your cover photo: save it as public/cover.jpg (for a .png or .webp, change the path here).
  // Until that file exists, the generated contour drawing is shown instead.
  cover: { src: "/cover48.png", alt: "cover" },
  coverCaption: "himanshu.tech37@gmail.com",
};

export const links: Links = {
  email: "himanshu.tech37@gmail.com",
  github: "https://github.com/himanshur4",
  linkedin: "https://linkedin.com/in/himanshur4",
  // Put the PDF at public/Himanshu_Raj_Resume.pdf and every Resume link turns on.
  resume: "/Himanshu_Raj_Resume.pdf",
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "eventrail",
    name: "EventRail",
    period: "2026",
    kind: "Event streaming broker",
    description:
      "An event streaming broker I’m building in TypeScript using only Node’s standard library. Records go into partitioned, append-only logs on disk, with CRC-checked batches, an offset index and crash recovery for torn writes. Storage and topics are done and tested; networking and replication are next.",
    stack: ["TypeScript", "Node.js", "node:fs", "node:test"],
    source: "https://github.com/himanshur4/event-rail",
  },
  {
    slug: "chatter",
    name: "Chatter",
    period: "2026",
    kind: "Real-time chat",
    description:
      "A real-time chat app split into three services: users, chat and mail. Sign-in works with an email code, using Redis for expiry and rate limiting and a RabbitMQ worker to send the mail. Socket.IO delivers messages, typing indicators, online status and read receipts.",
    stack: [
      "Next.js",
      "TypeScript",
      "Express",
      "Socket.IO",
      "Prisma",
      "MongoDB",
      "Redis",
      "RabbitMQ",
      "Cloudinary",
      "AWS EC2",
      "Nginx",
    ],
    source: "https://github.com/himanshur4/chatter",
    demo: "https://chatter-t.me",
  },
  {
    slug: "lernix",
    name: "Lernix",
    period: "2025–26",
    kind: "Course platform",
    description:
      "An online course platform where educators publish courses and students pay to enroll and track their progress. Stripe handles payments, with enrollment confirmed by a signed webhook rather than the browser. Clerk manages sign-in and roles, and Redis caches the course list.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Express",
      "MongoDB",
      "Redis",
      "Clerk",
      "Stripe",
      "Cloudinary",
    ],
    source: "https://github.com/himanshur4/lernix-learning-platform",
    demo: "https://lernix-psi-two.vercel.app",
  },
  {
    slug: "vibecall",
    name: "VibeCall",
    period: "2025",
    kind: "Video calls & chat",
    description:
      "A language-exchange app where people find each other, send friend requests, then chat or start a one-to-one video call. The Express API owns accounts and the friend graph and signs the tokens for Stream, which runs the chat and video. Login uses a JWT in an httpOnly cookie.",
    stack: [
      "React",
      "Vite",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "Express",
      "MongoDB",
      "Stream Chat & Video",
    ],
    source: "https://github.com/himanshur4/VibeCall",
    demo: "https://vibe-call.vercel.app",
  },
  {
    slug: "khetmitra",
    name: "KhetMitra",
    period: "2026",
    kind: "Voice farm advisor",
    description:
      "A voice-first farm advisor that answers in Hindi or English. An agent loop pulls live weather, mandi prices, soil data and official advisories, and a guardrail removes any number no source supports. A daily check warns farmers before bad weather reaches their crops.",
    stack: [
      "Next.js",
      "TypeScript",
      "Vercel AI SDK",
      "Gemini",
      "PostgreSQL",
      "pgvector",
      "Prisma",
      "Sarvam AI",
      "Zod",
    ],
    source: "https://github.com/himanshur4/khet-mittar",
    demo: "https://khet-mittar.vercel.app",
  },
];

export const otherProjects: OtherProject[] = [
  {
    name: "ExpenseWise",
    period: "2025",
    description:
      "An expense tracker with a GraphQL API: Apollo Server on Express, Passport sessions stored in MongoDB, and Chart.js breakdowns by category.",
    stack: ["React", "Apollo Client", "GraphQL", "Passport", "MongoDB", "Chart.js"],
    source: "https://github.com/himanshur4/Expense-wise",
    // The Render demo (https://expense-wise-o97x.onrender.com) didn't respond on
    // 2026-10-24. Add it back as `demo` once it loads again.
  },
  {
    name: "TripNest",
    period: "2025",
    description:
      "A trip planner on Firebase: itineraries with day-by-day activities and cover photos, plus a Discover page that pairs Unsplash photos with descriptions written by Gemini.",
    stack: ["React", "Firebase Auth", "Firestore", "TanStack Query", "Cloudinary", "Gemini API"],
    source: "https://github.com/himanshur4/trip-nest",
    demo: "https://trip-nest-1.web.app",
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Full-stack developer intern",
    org: "CreditSea",
    location: "Remote",
    period: "Sep – Oct 2025",
    points: [
      "Designed and built a new notification model for push notifications.",
      "Developed REST APIs with cross-functional teams for a product serving 50,000+ daily users.",
      "Optimized database queries using pipelining.",
      "Improved the admin panel UI and resolved 20+ bugs across applications.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    institution: "Indian Institute of Information Technology Ranchi",
    degree: "B.Tech, Computer Science and Engineering",
    period: "2023 – 2027",
    detail: "CGPA 8.02 / 10",
  },
];

// Not shown on the site since the About section was removed; kept so the numbers aren't lost.
export const practice: Practice = {
  summary:
    "1,500+ problems solved and 100+ contests across LeetCode, Codeforces, CodeChef and GeeksforGeeks.",
  profiles: [
    { platform: "LeetCode", result: "Max rating 1841", href: "https://leetcode.com/u/rajhimanshu403" },
    { platform: "Codeforces", result: "Pupil", href: "https://codeforces.com/profile/himanshur4" },
    { platform: "CodeChef", result: "3★", href: "https://www.codechef.com/users/himanshur4" },
    { platform: "Codolio", result: "All platforms", href: "https://codolio.com/profile/rajhimanshu" },
  ],
};

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "C++", "Java", "Python", "SQL"] },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Redux", "Zustand", "TanStack Query"],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "Express", "GraphQL", "Socket.IO", "RabbitMQ"],
  },
  { label: "Data", items: ["MongoDB", "PostgreSQL", "Redis", "Prisma"] },
  { label: "Infrastructure & tools", items: ["AWS EC2", "Docker", "Nginx", "Linux", "Git"] },
];

/** In-page sections, in order. Used by the navigation. */
export const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
