/**
 * Illustrative contribution dataset.
 *
 * IMPORTANT — none of this is real. No user, no partner, no verified gesture.
 * These entries exist only to show the *shape* of what the constellation will
 * carry once a real source is connected. Keep `status` on every record so the
 * UI can always label provenance honestly.
 */

export type ContributionKind = "offer" | "need";

export type ContributionCategory =
  | "Mentorship"
  | "Knowledge"
  | "Care"
  | "Time"
  | "Expertise"
  | "Material";

export type Presence = "remote" | "in-person" | "hybrid";

export interface ContributionRecord {
  /** Opaque, non-identifying reference. Never a person's name. */
  ref: string;
  kind: ContributionKind;
  category: ContributionCategory;
  /** Short, anonymised formulation of the gesture. */
  summary: string;
  territory: string;
  languages: string[];
  /** Rhythm for offers, urgency for needs. */
  availability: string;
  presence: Presence;
  status: "illustrative";
  /** Normalised map position in percent, for the constellation canvas. */
  x: number;
  y: number;
}

export const CONTRIBUTION_CATEGORIES: ContributionCategory[] = [
  "Mentorship",
  "Knowledge",
  "Care",
  "Time",
  "Expertise",
  "Material",
];

export const ILLUSTRATIVE_CONTRIBUTIONS: ContributionRecord[] = [
  {
    ref: "N-0114",
    kind: "offer",
    category: "Mentorship",
    summary: "Monthly career listening for self-taught designers",
    territory: "Lisbon, Portugal",
    languages: ["PT", "EN"],
    availability: "Monthly",
    presence: "remote",
    status: "illustrative",
    x: 42,
    y: 38,
  },
  {
    ref: "N-0207",
    kind: "need",
    category: "Expertise",
    summary: "Legal reading of a cooperative statute",
    territory: "Dakar, Senegal",
    languages: ["FR", "WO"],
    availability: "Within a month",
    presence: "remote",
    status: "illustrative",
    x: 39,
    y: 55,
  },
  {
    ref: "N-0312",
    kind: "offer",
    category: "Knowledge",
    summary: "Open workshop on fog-harvesting mesh geometry",
    territory: "Nairobi, Kenya",
    languages: ["EN", "SW"],
    availability: "Occasional",
    presence: "hybrid",
    status: "illustrative",
    x: 57,
    y: 60,
  },
  {
    ref: "N-0388",
    kind: "need",
    category: "Care",
    summary: "Weekly relief for a full-time family caregiver",
    territory: "Naples, Italy",
    languages: ["IT"],
    availability: "This week",
    presence: "in-person",
    status: "illustrative",
    x: 50,
    y: 40,
  },
  {
    ref: "N-0421",
    kind: "offer",
    category: "Time",
    summary: "Two hours of quiet listening, evenings",
    territory: "Montréal, Canada",
    languages: ["FR", "EN"],
    availability: "Weekly",
    presence: "remote",
    status: "illustrative",
    x: 24,
    y: 33,
  },
  {
    ref: "N-0509",
    kind: "need",
    category: "Knowledge",
    summary: "Arabic-language tutoring for a displaced student",
    territory: "Amman, Jordan",
    languages: ["AR", "EN"],
    availability: "No rush",
    presence: "remote",
    status: "illustrative",
    x: 58,
    y: 44,
  },
  {
    ref: "N-0566",
    kind: "offer",
    category: "Material",
    summary: "Shared workshop space and hand tools, weekends",
    territory: "Medellín, Colombia",
    languages: ["ES"],
    availability: "Ongoing",
    presence: "in-person",
    status: "illustrative",
    x: 28,
    y: 58,
  },
  {
    ref: "N-0618",
    kind: "need",
    category: "Mentorship",
    summary: "Guidance from someone who has rebuilt after a closure",
    territory: "Osaka, Japan",
    languages: ["JA", "EN"],
    availability: "Within a month",
    presence: "remote",
    status: "illustrative",
    x: 82,
    y: 41,
  },
  {
    ref: "N-0703",
    kind: "offer",
    category: "Expertise",
    summary: "Structural review of low-cost community housing plans",
    territory: "Chennai, India",
    languages: ["TA", "EN"],
    availability: "Occasional",
    presence: "remote",
    status: "illustrative",
    x: 70,
    y: 52,
  },
  {
    ref: "N-0774",
    kind: "need",
    category: "Time",
    summary: "Regular call for an isolated elder in a rural valley",
    territory: "Cusco, Peru",
    languages: ["ES", "QU"],
    availability: "Urgent",
    presence: "remote",
    status: "illustrative",
    x: 27,
    y: 66,
  },
  {
    ref: "N-0812",
    kind: "offer",
    category: "Care",
    summary: "Accompaniment to medical appointments",
    territory: "Reykjavík, Iceland",
    languages: ["IS", "EN"],
    availability: "Weekly",
    presence: "in-person",
    status: "illustrative",
    x: 40,
    y: 24,
  },
  {
    ref: "N-0897",
    kind: "need",
    category: "Material",
    summary: "Transport for a mobile literacy library",
    territory: "Oran, Algeria",
    languages: ["AR", "FR"],
    availability: "This week",
    presence: "in-person",
    status: "illustrative",
    x: 46,
    y: 43,
  },
  {
    ref: "N-0931",
    kind: "offer",
    category: "Knowledge",
    summary: "Field manual on seed saving, freely translatable",
    territory: "Melbourne, Australia",
    languages: ["EN"],
    availability: "One-off",
    presence: "remote",
    status: "illustrative",
    x: 86,
    y: 72,
  },
  {
    ref: "N-0988",
    kind: "need",
    category: "Expertise",
    summary: "Administrative help with an asylum file",
    territory: "Hamburg, Germany",
    languages: ["DE", "AR"],
    availability: "Urgent",
    presence: "hybrid",
    status: "illustrative",
    x: 49,
    y: 32,
  },
];
