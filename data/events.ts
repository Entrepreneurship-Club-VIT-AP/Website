export type RegistrationFieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "textarea"
  | "select";

export type RegistrationField = {
  key: string;
  label: string;
  type: RegistrationFieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

export type ClubEvent = {
  slug: string;
  eventDate: string;
  registrationOpen?: boolean;
  title: string;
  icon: string;
  description: string;
  stats?: string;
  color: string;
  borderColor: string;
  details: string[];
  registrationFields: RegistrationField[];
  isActive?: boolean;
};

export const events: ClubEvent[] = [
  {
    slug: "entrepreneurial-ecosystem-higher-studies",
    eventDate: "2026-03-20",
    title: "Entrepreneurial Ecosystem in Higher Studies",
    icon: "🧭",
    description:
      "A webinar deep-diving into campus incubators, accelerators, funding networks, and mentorships. 100+ students left with a full startup roadmap from idea to funding.",
    stats: "100+ attendees",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/40",
    details: [
      "Learned how student startups can move from idea to incubation.",
      "Covered funding pathways and mentor access.",
      "Included practical guidance for first-time founders.",
    ],
    registrationFields: [
      {
        key: "phone",
        label: "Phone Number (Optional)",
        type: "tel",
        required: false,
        placeholder: "10-digit mobile number",
      },
    ],
    isActive: true,
  },
  {
    slug: "hult-prize-campus-round",
    eventDate: "2025-02-15",
    title: "Hult Prize Campus Round",
    icon: "🌍",
    description:
      "Part of the global Hult Prize Challenge, this event called on students to pitch sustainability-focused startups.",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/40",
    details: [
      "Teams presented sustainability-first startup concepts.",
      "Winners moved to higher competition rounds.",
    ],
    registrationFields: [
      {
        key: "phone",
        label: "Phone Number (Optional)",
        type: "tel",
        required: false,
        placeholder: "10-digit mobile number",
      },
    ],
    isActive: true,
  },
  {
    slug: "pitch-present-win",
    eventDate: "2025-01-22",
    title: "Pitch • Present • Win",
    icon: "💼",
    description:
      "A high-stakes pitch competition where student founders showcased startup ideas in front of industry experts.",
    stats: "Boosted confidence for 80% participants",
    color: "from-yellow-500/20 to-orange-500/20",
    registrationOpen: true,

    borderColor: "border-yellow-500/40",
    details: [
      "Competitive pitch format with expert judges.",
      "Cash prizes and networking opportunities.",
    ],
    registrationFields: [
      {
        key: "phone",
        label: "Phone Number (Optional)",
        type: "tel",
        required: false,
        placeholder: "10-digit mobile number",
      },
    ],
    isActive: true,
  },
  {
    slug: "marketing-seminar",
    eventDate: "2024-12-14",
    title: "Marketing Seminar",
    icon: "📣",
    description:
      "A hands-on seminar introducing branding, digital tools, and customer psychology tailored for startup growth.",
    color: "from-red-500/20 to-pink-500/20",
    borderColor: "border-red-500/40",
    details: [
      "Branding fundamentals",
      "Customer psychology",
      "Digital growth strategies",
    ],
    registrationFields: [
      {
        key: "phone",
        label: "Phone Number (Optional)",
        type: "tel",
        required: false,
        placeholder: "10-digit mobile number",
      },
    ],
    isActive: false,
  },
];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function formatEventDate(eventDate: string) {
  const [year, month, day] = eventDate.split("-").map(Number);
  if (!year || !month || !day) {
    return eventDate;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  const dayWithSuffix = `${day}${getDaySuffix(day)}`;
  const monthName = date.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  return `${dayWithSuffix} ${monthName} ${year}`;
}

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function getIndiaDateParts(input: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(input);

  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);

  return { year, month, day };
}

export function isRegistrationOpen(
  eventDate: string,
  isActive = true,
  now = new Date(),
  registrationOpen?: boolean,
) {
  if (typeof registrationOpen === "boolean") {
    return registrationOpen;
  }

  if (!isActive) {
    return false;
  }

  const [eventYear, eventMonth, eventDay] = eventDate.split("-").map(Number);
  if (!eventYear || !eventMonth || !eventDay) {
    return false;
  }

  const today = getIndiaDateParts(now);
  const todayNumber = today.year * 10000 + today.month * 100 + today.day;
  const eventNumber = eventYear * 10000 + eventMonth * 100 + eventDay;

  // Inclusive check: registration remains open on the event date itself.
  return todayNumber <= eventNumber;
}

function sanitizeSheetTabName(input: string) {
  const cleaned = input
    .replace(/[\[\]*?:/\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.slice(0, 90) || "Event Registrations";
}

export function getSheetTabName(eventSlugOrTitle: string) {
  const matchedEvent = getEventBySlug(eventSlugOrTitle);
  if (matchedEvent) {
    return sanitizeSheetTabName(matchedEvent.title);
  }
  return sanitizeSheetTabName(eventSlugOrTitle);
}
