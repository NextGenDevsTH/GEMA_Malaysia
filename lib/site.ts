export const site = {
  name: "Pertubuhan Pemuda GEMA Malaysia",
  shortName: "GEMA",
  officialSiteUrl: "https://www.sigmagema.com",
  registerUrl: "/join-us",
  sourceNote:
    "Publicly verified information is limited, so this site is structured to expand cleanly as approved copy and assets are released.",
  brandLine: "Hope, leadership, and action for Malaysia's youth.",
};

export const rfp = {
  adDate: "1 July 2026",
  closingDate: "7 July 2026",
  electionDate: "7 July 2026",
  budgetRange: "RM1,000 - RM3,500",
  contactPerson: "Irshad",
  whatsapp: "019-2254383",
  email: "pusat@pemudagema.org",
  references: [
    "https://www.pemudagema.org/",
    "https://www.apple.com/",
    "https://www.kbs.gov.my/ms/rakanmuda?format=html#rmHero",
    "https://impact.my/",
  ],
} as const;

export const pillars = [
  "Leadership",
  "Volunteerism",
  "Education",
  "Community",
  "Environment",
  "Sports",
  "Youth Development",
  "Humanitarian Programs",
] as const;

export const impactStats = [
  { label: "Program pillars", value: "8", note: "Defined from the public brief" },
  { label: "Official join link", value: "Live", note: "kept inside the official site shell" },
  { label: "Public state contacts", value: "TBA", note: "not published in source" },
  { label: "Archive photos", value: "Ready", note: "gallery folder is wired to real files" },
] as const;

export const pages = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/history", label: "History" },
  { href: "/vision", label: "Vision" },
  { href: "/mission", label: "Mission" },
  { href: "/leadership", label: "Leadership" },
  { href: "/organization-structure", label: "Org Structure" },
  { href: "/state-chairpersons", label: "State Chairpersons" },
  { href: "/activities", label: "Activities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
] as const;

export const draftNotice =
  "Design-ready shell. TBA areas stay visible until approved copy is published.";

export const activities = [
  {
    slug: "leadership-lab",
    title: "Leadership Lab",
    category: "Leadership",
    state: "National",
    date: "TBA",
    location: "TBA",
    poster: "Program poster placeholder",
    summary:
      "A structured leadership-format slot for training, mentoring, and youth facilitation. Replace with the official event title and date when published.",
  },
  {
    slug: "volunteer-orientation",
    title: "Volunteer Orientation",
    category: "Volunteerism",
    state: "TBA",
    date: "TBA",
    location: "TBA",
    poster: "Program poster placeholder",
    summary:
      "A registration and onboarding slot for new volunteers. This archive card exists to support the CMS and search experience.",
  },
  {
    slug: "education-clinic",
    title: "Education Clinic",
    category: "Education",
    state: "TBA",
    date: "TBA",
    location: "TBA",
    poster: "Program poster placeholder",
    summary:
      "A learning-focused activity slot for tutoring, workshops, and education outreach. Official copy can replace this once supplied.",
  },
  {
    slug: "community-drive",
    title: "Community Drive",
    category: "Community",
    state: "TBA",
    date: "TBA",
    location: "TBA",
    poster: "Program poster placeholder",
    summary:
      "A community service slot designed for food aid, local support, and neighborhood engagement.",
  },
  {
    slug: "river-cleanup",
    title: "River Cleanup",
    category: "Environment",
    state: "TBA",
    date: "TBA",
    location: "TBA",
    poster: "Program poster placeholder",
    summary:
      "A conservation slot for environmental stewardship, field volunteering, and public participation.",
  },
  {
    slug: "youth-sports-day",
    title: "Youth Sports Day",
    category: "Sports",
    state: "TBA",
    date: "TBA",
    location: "TBA",
    poster: "Program poster placeholder",
    summary:
      "A sports and wellbeing slot that can host community games, fitness challenges, and youth connection.",
  },
  {
    slug: "response-support",
    title: "Humanitarian Response",
    category: "Humanitarian",
    state: "TBA",
    date: "TBA",
    location: "TBA",
    poster: "Program poster placeholder",
    summary:
      "A humanitarian response slot for relief coordination and rapid support campaigns.",
  },
  {
    slug: "state-roadshow",
    title: "State Roadshow",
    category: "Leadership",
    state: "TBA",
    date: "TBA",
    location: "TBA",
    poster: "Program poster placeholder",
    summary:
      "A field engagement slot for chapter growth, outreach, and local recruitment.",
  },
] as const;

export type Activity = (typeof activities)[number];

export const mediaCards = [
  {
    title: "Photos",
    description: "Gallery-first archive using only the real images found in /gallery.",
    href: "/media/photos",
  },
  {
    title: "Videos",
    description: "A curated video shelf ready for official uploads and campaign cuts.",
    href: "/media/videos",
  },
] as const;

export const historyTimeline = [
  {
    year: "Now",
    title: "Public shell established",
    description: "Core identity and public route are in place.",
  },
  {
    year: "Gap",
    title: "Verified content still limited",
    description: "Roster, history, and state data need approval.",
  },
  {
    year: "Next",
    title: "Content handoff",
    description: "Replace TBA with committee-approved copy.",
  },
] as const;

export const stateList = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Wilayah Persekutuan Kuala Lumpur",
  "Wilayah Persekutuan Labuan",
  "Wilayah Persekutuan Putrajaya",
] as const;

export const stateChairpersons = stateList.map((state) => ({
  state,
  chairperson: "TBA",
  website: null as string | null,
}));

export const leadershipRoles = [
  "President",
  "Deputy President",
  "Secretary General",
  "Treasurer",
  "Director, Youth Development",
  "Director, Volunteerism",
  "Director, Education",
  "Director, Community Programs",
  "Director, Environment",
  "Director, Sports",
  "Director, Media",
  "Director, State Coordination",
] as const;

export const contactPoints = [
  { label: "Central office", value: "TBA", helper: "Official address not publicly visible" },
  { label: "WhatsApp", value: `${rfp.whatsapp} (${rfp.contactPerson})`, helper: "Verified in the RFP PDF" },
  { label: "Email", value: rfp.email, helper: "Verified in the RFP PDF" },
  { label: "Social media", value: "Official page link pending", helper: "Use verified channels only" },
] as const;

export const rfpChecklist = [
  "UI/UX design",
  "Landing page",
  "Website development",
  "Admin panel",
  "Database",
  "CMS",
  "Testing",
  "Deployment",
  "Documentation",
  "Training",
] as const;

export const roles = [
  {
    title: "Admin",
    description: "Full access to all content modules, structure, permissions, and publishing.",
  },
  {
    title: "Media User",
    description: "Can upload, tag, and curate photos and videos, but cannot change roles.",
  },
  {
    title: "Banned User",
    description: "Blocked from publishing and content operations; retained for audit history.",
  },
] as const;

export const cmsModules = [
  {
    title: "Activity Management",
    bullets: ["Create programs", "Assign state and cluster", "Publish posters", "Track dates and locations"],
  },
  {
    title: "Media Management",
    bullets: ["Upload photos", "Categorize albums", "Create lightbox captions", "Publish video embeds"],
  },
  {
    title: "Contact Management",
    bullets: ["Central office", "State contacts", "Map links", "Social channels"],
  },
  {
    title: "Organization Structure",
    bullets: ["National hierarchy", "State chapters", "Role mapping", "Public tree"],
  },
  {
    title: "Role Management",
    bullets: ["Admin", "Media User", "Banned User", "Permission audit trail"],
  },
] as const;

export const socialLinks = [
  { label: "Official website", href: site.officialSiteUrl },
  { label: "Join registration", href: site.registerUrl },
] as const;
