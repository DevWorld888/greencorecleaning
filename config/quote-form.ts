// Quote request form: the options for each field and the extra questions each
// service asks. Read by the form (to render fields) and by the validator (to
// know which extra fields are required).

export const propertyTypes = ["House", "Apartment or unit", "Townhouse", "Commercial premises"] as const;

/** Value of the suburb select when the visitor's suburb isn't listed. */
export const OTHER_SUBURB = "other";

export type ExtraFieldId =
  | "bedrooms"
  | "bathrooms"
  | "frequency"
  | "turnovers"
  | "vacateDate"
  | "projectType"
  | "completionDate"
  | "floorArea";

type ExtraField = { label: string; required: boolean; error?: string } & (
  | { kind: "select"; options: readonly string[] }
  | { kind: "date" }
);

export const extraFields: Record<ExtraFieldId, ExtraField> = {
  bedrooms: { label: "Bedrooms", kind: "select", options: ["1", "2", "3", "4", "5+"], required: true, error: "Please choose the number of bedrooms." },
  bathrooms: { label: "Bathrooms", kind: "select", options: ["1", "2", "3", "4+"], required: true, error: "Please choose the number of bathrooms." },
  frequency: {
    label: "How often?",
    kind: "select",
    options: ["Weekly", "Fortnightly", "Monthly", "One-off clean"],
    required: true,
    error: "Please choose how often you need cleaning.",
  },
  turnovers: {
    label: "Turnovers per month (approx.)",
    kind: "select",
    options: ["1–4", "5–10", "11–20", "More than 20"],
    required: true,
    error: "Please choose roughly how many turnovers you need.",
  },
  vacateDate: { label: "Vacate date", kind: "date", required: false },
  projectType: {
    label: "Project type",
    kind: "select",
    options: ["New build", "Renovation", "Commercial fit-out", "Other"],
    required: true,
    error: "Please choose the project type.",
  },
  completionDate: { label: "Required completion date", kind: "date", required: false },
  floorArea: {
    label: "Approximate floor area",
    kind: "select",
    options: ["Under 100 m²", "100–300 m²", "300–1,000 m²", "Over 1,000 m²"],
    required: true,
    error: "Please choose the approximate floor area.",
  },
};

/** Extra questions per service slug. Services not listed only use "Additional details". */
export const serviceExtraFields: Partial<Record<string, ExtraFieldId[]>> = {
  "regular-house-cleaning": ["bedrooms", "bathrooms", "frequency"],
  "airbnb-cleaning": ["bedrooms", "bathrooms", "turnovers"],
  "deep-cleaning": ["bedrooms", "bathrooms"],
  "end-of-lease-cleaning": ["bedrooms", "bathrooms", "vacateDate"],
  "builders-cleaning": ["projectType", "completionDate"],
  "commercial-cleaning": ["floorArea", "frequency"],
  "office-cleaning": ["floorArea", "frequency"],
};
