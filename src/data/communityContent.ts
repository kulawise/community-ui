// Edit the values below to update what's shown on the community site.
// Numbers here are placeholders until real figures are available — keep them
// honest; drop a stat entirely rather than leave a fabricated number live.

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Impact", href: "/impact" },
  // { label: "Stories", href: "/#stories" },
  // { label: "Partners", href: "/#partners" },
];

export const LIVE_IMPACT_STATS = [
  { value: "12", label: "Circles Launched" },
  { value: "5", label: "Cities Active" },
  { value: "85%", label: "Habit Consistency" },
];

export type SDGGoal = {
  goal: string;
  title: string;
  colorClass: string;
  icon: string;
  description: string;
};

// colorClass must be the full, literal "bg-sdg-..." string — Tailwind's
// scanner only generates CSS for class names it can find as literal text in
// source files. Deriving a class at runtime (e.g. via .replace()) means
// Tailwind never sees the resulting string and silently drops the style.
// Keep this list in sync with SDG_DETAIL_CARDS below — the home page teaser
// and the /impact page should always reference the same 4 goals.
export const SDG_TEASER_GOALS: SDGGoal[] = [
  {
    goal: "Goal 1",
    title: "No Poverty",
    colorClass: "bg-sdg-no-poverty",
    icon: "savings",
    description:
      "Building sustainable income pathways through helping wellness & health professionals monetize the value they provide.",
  },
  {
    goal: "Goal 3",
    title: "Good Health and Well-being",
    colorClass: "bg-sdg-good-health",
    icon: "favorite",
    description:
      "Our primary focus: helping members build daily habits that prevent illness before it starts.",
  },
  {
    goal: "Goal 12",
    title: "Responsible Consumption",
    colorClass: "bg-sdg-responsible-consumption",
    icon: "recycling",
    description:
      "Pantry-aware shopping lists that help members reduce over-purchasing and household food waste.",
  },
  {
    goal: "Goal 17",
    title: "Partnerships for the Goals",
    colorClass: "bg-sdg-partnerships",
    icon: "handshake",
    description:
      "Building partnerships with insurers and lenders so a verified habit record can unlock real financial benefits.",
  },
];

export type StoryCard = {
  category: string;
  categoryColorClass: string;
  icon: string;
  title: string;
  description: string;
  image: string;
};

export const STORY_CARDS: StoryCard[] = [
  {
    category: "Community First",
    categoryColorClass: "text-sdg-good-health",
    icon: "groups",
    title: "Building Consistency in Lagos",
    description:
      "How a Lagos Circle turned daily check-ins into a habit that stuck for its members.",
    image: "/images/gym-pic.jpg",
  },
  {
    category: "Strength & Mind",
    categoryColorClass: "text-primary",
    icon: "fitness_center",
    title: "Kula Circle: Downtown Peak",
    description:
      "A journey of mental resilience and physical transformation within one of our most active circles.",
    image: "/images/dumbbells-fitness.jpg",
  },
  {
    category: "Tracking Progress",
    categoryColorClass: "text-sdg-zero-hunger",
    icon: "monitoring",
    title: "Small Habits, Real Change",
    description:
      "Discover how Kula members are turning small, repeatable habits into lasting progress.",
    image: "/images/health-metrics.jpg",
  },
];

export const B2B_CALLOUTS = [
  {
    title: "Wellness Businesses",
    description:
      "Integrate Kulawise into your existing gym, studio, or corporate wellness program.",
    ctaLabel: "Apply to Join",
    href: "tel:+2349069597307",
    image: null,
  },
  {
    title: "Strategic Partners",
    description:
      "Collaborate with us on community health and sustainability initiatives across our markets.",
    ctaLabel: "Partner with Us",
    href: "mailto:hello@kulawise.com",
    image: null,
  },
];

export type SDGDetailCard = {
  goal: string;
  title: string;
  colorClass: string;
  icon: string;
  target: string;
  action: string;
  image: string | null;
};

export const SDG_DETAIL_CARDS: SDGDetailCard[] = [
  {
    goal: "Goal 3",
    title: "Good Health and Well-being",
    colorClass: "bg-sdg-good-health",
    icon: "favorite",
    target: "Strengthen the prevention and treatment of non-communicable diseases.",
    action:
      "We use habit tracking and local Circles to make preventative wellness accessible day to day, reducing reliance on reactive, after-the-fact healthcare.",
    image: "/images/young-woman-training-gym.jpg",
  },
  {
    goal: "Goal 1",
    title: "No Poverty",
    colorClass: "bg-sdg-no-poverty",
    icon: "savings",
    target: "Build sustainable income pathways through wellness and health work.",
    action:
      "We help wellness and health professionals — coaches, gyms, nutritionists, run clubs — monetize the value they already provide by running paid programs through Kulawise Circles.",
    image: null,
  },
  {
    goal: "Goal 12",
    title: "Responsible Consumption",
    colorClass: "bg-sdg-responsible-consumption",
    icon: "recycling",
    target: "Substantially reduce waste generation through prevention and reduction.",
    action:
      "Pantry-aware shopping lists sync with what members already have, reducing over-purchasing and household food waste.",
    image: null,
  },
  {
    goal: "Goal 17",
    title: "Partnerships for the Goals",
    colorClass: "bg-sdg-partnerships",
    icon: "handshake",
    target: "Enhance the Global Partnership for Sustainable Development.",
    action:
      "We're working toward partnerships with regional insurers and lenders so a verified habit record can unlock better health financing terms.",
    image: null,
  },
];

export const IMPACT_METHODOLOGY = [
  {
    icon: "analytics",
    title: "Real-time Verification",
    description:
      "Habit and activity logs are recorded as they happen, not self-reported after the fact.",
  },
  {
    icon: "checklist_rtl",
    title: "UN Standard Alignment",
    description:
      "Our impact framing is mapped to the relevant UN Sustainable Development Goals, not invented categories.",
  },
];
